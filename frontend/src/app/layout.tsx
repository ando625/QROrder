// app/layout.tsx

"use client";
import "./globals.css"; 
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import AdminHeader from "@/components/AdminHeader";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  
  //各ページの判定
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  const isLoginPage = pathname === "/login";

  //ログイン専用のシンプルヘッダー（ナビゲーションなし）
  const LoginHeader = (
    <header className="sticky top-0 z-30 bg-zinc-950 text-white border-b border-zinc-800 px-6 py-4">
      <Link href="/login">
        <div className="text-2xl font-black">
          DIGITAL MENU{" "}
          <span className="text-sm bg-white text-black px-1 ml-1 rounded">
            admin
          </span>
        </div>
      </Link>
    </header>
  );


  return (
    <html lang="ja">
      <body className="antialiased bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <CartProvider>
          {/* 3パターンの出し分け */}
          {isLoginPage ? (
            LoginHeader // ログイン画面ならシンプル版
          ) : isAdminPage ? (
            <AdminHeader /> // 管理者画面ならフル機能版
          ) : (
            <Header /> // お客さん画面なら通常版
          )}

          <main className="flex-1">{children}</main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
