// components/Header.tsx
"use client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";


export default function Header() {
  const { cartItems } = useCart();

  // カートに入ってる商品の個数を足し合わせる
  const totalCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const pathname = usePathname();
  const params = useParams(); // URLからパラメータを取得

  // 現在のテーブルIDを取得（もしテーブル外のページなら undefined になる）
  const tableId = params.id as string;

  // 「現在のページがトップページ（/）かどうか」を判定 トップページならカートカゴを消す
  const isHomePage = pathname === "/";

  return (
    <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-zinc-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* ロゴ部分 */}
        <Link href={tableId ? `/table/${tableId}` : "/"}>
          <div className="text-2xl font-black text-black tracking-tighter cursor-pointer uppercase">
            Digital Menu
          </div>
        </Link>

        {/* カートボタン */}
        {/* カートボタン：トップページ「以外」の時だけ表示する */}
        {!isHomePage && (
          <Link href={`/table/${tableId}/cart`}>
            <button className="relative p-2 hover:bg-zinc-100 rounded-lg transition-all active:scale-95">
              <ShoppingCart
                size={30}
                strokeWidth={1.5}
                className="text-black"
              />
              {totalCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">
                  {totalCount}
                </span>
              )}
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}
