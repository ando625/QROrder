//frontend/src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function LoginPage() {
  // useAuthフックを使ってログイン機能を呼び出す
  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/admin/orders", // ログイン後は管理者画面へ
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 命令：「ログインを実行して！エラーがあれば教えてね」
    login({ email, password, setErrors });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6">
      <div className="w-full max-w-[400px]">
        {/* ロゴエリア */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">
            Admin Login
          </h1>
          <p className="text-zinc-400 text-[10px] tracking-[0.3em] uppercase font-bold">
            Digital Menu Management
          </p>
        </div>

        {/* ログインフォーム */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 pl-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-50 border-none px-4 py-4 rounded-none focus:ring-2 focus:ring-black transition-all text-sm"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 pl-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-50 border-none px-4 py-4 rounded-none focus:ring-2 focus:ring-black transition-all text-sm"
              placeholder="••••••••"
              required
            />
            {/* エラーメッセージ（魔法の警告） */}
            {errors.email && (
              <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-wider">
                {errors.email}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-5 font-black uppercase tracking-[0.3em] text-xs hover:bg-zinc-800 transition-all active:scale-[0.98] mt-4"
          >
            Sign In
          </button>
        </form>

        {/* 戻るリンク */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest hover:text-black transition-colors"
          >
            ← Back to Top
          </Link>
        </div>
      </div>

      
    </div>
  );
}
