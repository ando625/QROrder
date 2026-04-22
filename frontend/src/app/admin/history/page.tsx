"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useAuth } from "@/hooks/useAuth";
import { Order } from "@/types"; // 🌟 型をインポート
import { ChevronLeft, ChevronRight, Clock, CalendarDays } from "lucide-react"; // アイコン追加

export default function HistoryPage() {
  useAuth({ middleware: "auth" });

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [orders, setOrders] = useState<Order[]>([]); // 🌟 any[] から Order[] へ
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/admin/paid-history?date=${date}`);
        setOrders(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [date]);

  const changeDate = (days: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    setDate(d.toISOString().split("T")[0]);
  };

  const totalSales = orders.reduce((sum, o) => sum + o.total_price, 0);

  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans text-zinc-900">
      <div className="max-w-3xl mx-auto">
        {/* ヘッダーエリア */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
              Checkout <span className="text-zinc-300">History</span>
            </h1>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.3em] mt-2">
              今日の会計履歴
            </p>
          </div>

          <div className="bg-zinc-900 text-white rounded-2xl px-6 py-3 shadow-lg shadow-zinc-200 text-right">
            <p className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-1">
              Daily Total
            </p>
            <p className="text-xl font-black italic">
              ¥{totalSales.toLocaleString()}
            </p>
          </div>
        </div>

        {/* 日付ナビゲーション */}
        <div className="flex items-center justify-between mb-8 bg-white border border-zinc-200 p-2 rounded-full shadow-sm">
          <button
            onClick={() => changeDate(-1)}
            className="p-3 hover:bg-zinc-100 rounded-full transition-all"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-zinc-400" />
            <span className="text-sm font-black tracking-tighter uppercase">
              {new Date(date + "T00:00:00").toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <button
            onClick={() => changeDate(1)}
            className="p-3 hover:bg-zinc-100 rounded-full transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* 会計履歴リスト */}
        {loading ? (
          <div className="text-center py-20 animate-pulse text-zinc-300 font-black uppercase text-xs tracking-widest">
            Loading History...
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-3xl p-16 text-center shadow-sm">
            <p className="text-zinc-300 text-xs font-black uppercase tracking-widest">
              No history found for this date
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* 履歴カード：ヘッダー */}
                <div className="px-8 py-5 flex justify-between items-center border-b border-zinc-50">
                  <div className="flex items-center gap-4">
                    <div className="bg-zinc-900 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                      Table {order.table_number}
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <Clock size={12} />
                      <span className="text-[10px] font-bold">
                        {order.paid_at &&
                          new Date(order.paid_at).toLocaleTimeString("ja-JP", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black italic tracking-tighter">
                      ¥{order.total_price.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* 履歴カード：注文内容（タグ形式） */}
                <div className="px-8 py-4 bg-zinc-50/50">
                  <div className="flex flex-wrap gap-2">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-1.5 bg-white border border-zinc-200 px-3 py-1.5 rounded-xl shadow-sm"
                      >
                        <span className="text-[10px] font-black text-zinc-800 uppercase tracking-tighter">
                          {item.menu?.name}
                        </span>
                        <span className="text-[9px] font-black text-zinc-300 uppercase">
                          x{item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
