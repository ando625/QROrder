"use client";

import Link from "next/link";
import { LayoutList, CalendarDays, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function AdminHeader() {
  const { logout } = useAuth(); // useAuthからログアウト機能を呼び出す

  return (
    // 🌟 背景を「黒（zinc-950）」、文字を「白」に反転
    <header className="sticky top-0 z-30 bg-zinc-950 text-white border-b border-zinc-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* ロゴ：アプリ名の色を「白」に反転 */}
        <Link href="/admin/orders">
          <div className="text-2xl font-black  cursor-pointer ">
            DIGITAL MENU{" "}
            <span className="text-[10px] bg-white text-black px-1 ml-1 rounded">
              admin
            </span>
          </div>
        </Link>

        {/* 右側のナビゲーション */}
        <div className="flex items-center gap-2">
          {/* 注文一覧タグ */}
          <Link href="/admin/orders">
            <button className="flex flex-col items-center p-2 hover:bg-zinc-800 rounded-lg transition-all text-[10px] font-bold uppercase">
              <LayoutList size={24} strokeWidth={1.5} className="mb-1" />
              Orders
            </button>
          </Link>

          {/* 月日別一覧（売上管理など） */}
          <Link href="/admin/sales">
            <button className="flex flex-col items-center p-2 hover:bg-zinc-800 rounded-lg transition-all text-[10px] font-bold uppercase">
              <CalendarDays size={24} strokeWidth={1.5} className="mb-1" />
              Sales
            </button>
          </Link>

          {/* 境界線 */}
          <div className="w-[1px] h-8 bg-zinc-800 mx-2" />

          {/* ログアウトボタン */}
          <button
            onClick={logout}
            className="flex flex-col items-center p-2 hover:bg-red-900/30 hover:text-red-400 rounded-lg transition-all text-[10px] font-bold uppercase"
          >
            <LogOut size={24} strokeWidth={1.5} className="mb-1" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
