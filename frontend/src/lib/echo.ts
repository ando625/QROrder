// frontend/src/lib/echo.ts

"use client";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo;
  }
}

// ブラウザでしか動かない
if (typeof window !== "undefined") {
  window.Pusher = Pusher;

  // すでにEchoが作られていたら作り直さない
  // （HotReloadで二重に作られるのを防ぐ）
  if (!window.Echo) {
    window.Echo = new Echo({
      broadcaster: "reverb",
      key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
      wsHost: process.env.NEXT_PUBLIC_REVERB_HOST || "localhost",
      wsPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT) || 8080,
      wssPort: 443,
      forceTLS: false,
      enabledTransports: ["ws"],
    });
  }
}

// window.Echo を返す。サーバー側はダミー
const echo =
  typeof window !== "undefined"
    ? window.Echo
    : ({
        channel: () => ({ listen: () => ({}) }),
        leaveChannel: () => {},
      } as any);

export default echo;
