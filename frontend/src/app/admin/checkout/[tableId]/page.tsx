"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { Order } from "@/types"; // 🌟 型（設計図）をインポート
import { ChevronLeft, ReceiptText, CreditCard } from "lucide-react"; // アイコンを追加

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const tableId = params.tableId as string;

  // 🌟 useStateに <Order[]> を設定して型を固定する
  const [orders, setOrders] = useState<Order[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`/api/tables/${tableId}/orders`);
        // 🌟 フィルタリング時も Order型として扱う
        setOrders(res.data.filter((o: Order) => o.status !== "paid"));
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      }
    };
    fetch();
  }, [tableId]);

  // 🌟 Order型のプロパティを使って合計金額を計算
  const totalPrice = orders.reduce((sum, o) => sum + o.total_price, 0);

  const handleCheckout = async () => {
    if (
      !confirm(
        `TABLE ${tableId} の会計を確定しますか？\n合計：¥${totalPrice.toLocaleString()}`,
      )
    )
      return;

    setIsSubmitting(true);
    try {
      await axios.post("/api/admin/checkout", { table_number: tableId });
      alert("会計が完了しました！");
      router.push("/admin/orders");
    } catch {
      alert("エラーが発生しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans text-zinc-900">
      <div className="max-w-xl mx-auto">
        {/* ヘッダーエリア */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-zinc-400 hover:text-black transition-all"
          >
            <div className="p-2 bg-white rounded-full border border-zinc-200 group-hover:border-zinc-900 shadow-sm">
              <ChevronLeft size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">
              Back
            </span>
          </button>

          <div className="text-right">
            <h1 className="text-3xl font-black uppercase tracking-tighter leading-none">
              Checkout
            </h1>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.3em] mt-2">
              Table {tableId}
            </p>
          </div>
        </div>

        {/* 注文明細カード（レシート風デザイン） */}
        <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm mb-6">
          <div className="bg-zinc-900 text-white px-8 py-4 flex items-center justify-between">
            <span className="font-black text-[10px] uppercase tracking-[0.2em]">
              Order Summary
            </span>
            <ReceiptText size={16} className="opacity-50" />
          </div>

          <div className="p-8">
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-zinc-300 text-xs font-black uppercase tracking-[0.2em]">
                  No Pending Orders
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) =>
                  // 🌟 order.items も OrderItem型として自動認識される
                  order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-start"
                    >
                      <div className="flex gap-4">
                        <span className="text-[10px] font-black text-zinc-300 mt-1">
                          x{item.quantity}
                        </span>
                        <div>
                          <p className="font-black text-sm uppercase tracking-tight">
                            {item.menu?.name}
                          </p>
                          {item.option && (
                            <p className="text-[10px] text-zinc-400 font-medium">
                              {item.option}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="font-black text-sm italic">
                        ¥{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  )),
                )}

                {/* 明細内の区切り線 */}
                <div className="border-t border-dashed border-zinc-200 pt-6 mt-6">
                  <div className="flex justify-between items-center text-zinc-400">
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Subtotal
                    </span>
                    <span className="text-sm font-bold">
                      ¥{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 最終合計金額ボックス */}
        <div className="bg-zinc-900 rounded-3xl p-8 mb-8 flex justify-between items-center shadow-xl shadow-zinc-200">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
            Grand Total:合計金額
          </div>
          <div className="text-4xl font-black text-white italic tracking-tighter">
            ¥{totalPrice.toLocaleString()}
          </div>
        </div>

        {/* 会計確定ボタン */}
        <button
          onClick={handleCheckout}
          disabled={isSubmitting || orders.length === 0}
          className={`group w-full py-6 font-black uppercase tracking-[0.4em] text-xs rounded-full transition-all active:scale-95 shadow-lg flex items-center justify-center gap-3 ${
            isSubmitting || orders.length === 0
              ? "bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none"
              : "bg-black text-white hover:bg-zinc-800 shadow-zinc-200"
          }`}
        >
          <CreditCard
            size={16}
            className={isSubmitting ? "animate-pulse" : ""}
          />
          {isSubmitting ? "Processing..." : "Complete Checkout"}
        </button>

        <p className="text-center mt-8 text-[9px] text-zinc-300 font-bold uppercase tracking-widest">
          Final check required before closing the table.
        </p>
      </div>
    </div>
  );
}
