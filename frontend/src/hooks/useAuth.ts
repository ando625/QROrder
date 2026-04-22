"use client";

import axios from "@/lib/axios";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";

export const useAuth = ({ middleware, redirectIfAuthenticated }: any = {}) => {
  const router = useRouter();
  const params = useParams();

  // 現在のログインユーザーを取得する
  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", () => axios.get("/api/user").then((res) => res.data));

  // CSRF対策の合言葉を取得する関数
  const csrf = () => axios.get("/sanctum/csrf-cookie");

  // ログインを実行する関数
  const login = async ({ setErrors, ...props }: any) => {
    setErrors([]);
    await csrf();

    axios
      .post("/login", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        setErrors(error.response.data.errors);
      });
  };

  // ログアウトを実行する関数
  const logout = async () => {
    if (!error) {
      await axios.post("/logout").then(() => mutate());
    }
    window.location.pathname = "/login";
  };

  // 認証状態に応じてリダイレクトさせる
  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);
    if (middleware === "auth" && error) logout();
  }, [user, error]);

  return {
    user,
    login,
    logout,
  };
};
