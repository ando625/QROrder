"use client";

import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import axios from "@/lib/axios";
import { useParams } from "next/navigation";



export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, totalPrice,clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const params = useParams();
  const tableId = params.id as string;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (cartItems.length === 0) return <p className="p-8">カートは空です。</p>;



  //注文内容をバックエンドに送る
  const handleOrder = async () => {
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/orders", {
        table_number: tableId,
        items: cartItems.map(item => ({
          menu_id: item.id,
          quantity: item.quantity,
          price: item.price,
          option: item.selectedOption || null,
        })),
      });

      alert("注文を送信しました");
      clearCart();
    } catch (error) {
      console.error("注文エラー", error);
    } finally {
      setIsSubmitting(false);
    }
  };




  return (
    <div className="max-w-xl mx-auto p-6">
      {cartItems.map((item) => (
        <div
          key={`${item.id}-${item.selectedOption}`}
          className="flex items-center justify-between py-4 border-b"
        >
          <div>
            <h3 className="font-bold">{item.name}</h3>
            <p className="text-sm text-zinc-500">{item.selectedOption}</p>
          </div>

          <div className="flex items-center gap-3">
            {/* 個数変更ボタン */}
            <button
              onClick={() => updateQuantity(item.id, item.selectedOption, -1)}
              className="w-8 h-8 bg-zinc-100 rounded-full"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.selectedOption, 1)}
              className="w-8 h-8 bg-zinc-100 rounded-full"
            >
              +
            </button>

            {/* 削除ボタン */}
            <button
              onClick={() => removeFromCart(item.id, item.selectedOption)}
              className="text-red-500 ml-4"
            >
              ✕
            </button>
          </div>
        </div>
      ))}

      {/* 合計表示 */}
      <div className="mt-8 flex justify-between items-end">
        <div>
          <span className="text-sm text-zinc-500 block mb-1">Total Price</span>
          <span className="text-3xl font-black">
            ¥{totalPrice.toLocaleString()}
          </span>
        </div>

        {/* --- 注文確定ボタン --- */}
        <button
          onClick={handleOrder}
          disabled={isSubmitting} // 送信中はボタンを押せなくする
          className={`px-8 py-4 bg-black text-white font-black uppercase tracking-widest text-sm active:scale-95 transition-all ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-zinc-800"
          }`}
        >
          {isSubmitting ? "送信中..." : "注文する"}
        </button>
      </div>
    </div>
  );
}
