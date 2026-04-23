"use client";

import { useEffect, useState,useCallback } from "react";
import axios from "@/lib/axios";
import { useAuth } from "@/hooks/useAuth";
import "@/lib/echo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Order, OrderItem } from "@/types"; // 🌟 型をインポート
import { Clock, History, Receipt } from "lucide-react"; // アイコンを追加

const TABLE_COUNT = 12;

export default function AdminOrdersPage() {
  const { user } = useAuth({ middleware: "auth" });
  const [orders, setOrders] = useState<Order[]>([]); // 🌟 Order[] 型に変更

  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.get("/api/admin/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("注文の取得に失敗しました", err);
    }
  }, []);

  const updateStatus = useCallback(async (itemId: number, newStatus: string) => {
    try {
      await axios.patch(`/api/admin/order-items/${itemId}/status`, {
        status: newStatus,
      });
      fetchOrders();
    } catch (err) {
      alert("更新に失敗しました");
    }
  }, [fetchOrders]);

  useEffect(() => {
    fetchOrders();
    if (typeof window === "undefined" || !window.Echo) return;

    const channel = window.Echo.channel("orders");
    channel
      .listen(".OrderCreated", () => fetchOrders())
      .listen(".OrderStatusUpdated", () => fetchOrders());

    return () => {
      window.Echo?.leaveChannel("orders");
    };
  }, []);

  const getOrdersByTable = (tableNumber: number) => {
    return orders
      .filter((order) => order.table_number === String(tableNumber))
      .sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at || "").getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at || "").getTime() : 0;
        return dateB - dateA;
      });
  };

  const getSortedItems = (items: OrderItem[]) => {
    return [...items].sort((a, b) => {
      if (a.status === "served" && b.status !== "served") return 1;
      if (a.status !== "served" && b.status === "served") return -1;
      return 0;
    });
  };

  const hasActiveItems = (tableNumber: number) => {
    const tableOrders = getOrdersByTable(tableNumber);
    // 未提供の料理がある、または未会計の注文がある場合にActiveとする
    return tableOrders.some((order) => order.status !== "paid");
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-6 font-sans text-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* 🌟 ヘッダー：履歴ボタンを追加 */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">
              Kitchen <span className="text-zinc-300">Display</span>
            </h1>
            <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">
              リアルタイム注文管理
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/history"
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-zinc-200 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-zinc-100 transition-all shadow-sm active:scale-95"
            >
              <History size={14} />
              会計履歴
            </Link>

            <div className="bg-zinc-900 text-white px-5 py-2.5 rounded-full shadow-lg shadow-zinc-200 flex items-center gap-2">
              <span className="text-[9px] font-black uppercase tracking-widest opacity-60">
                Active:
              </span>
              <span className="text-sm font-black">{orders.length}</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: TABLE_COUNT }, (_, i) => i + 1).map(
            (tableNumber) => {
              const tableOrders = getOrdersByTable(tableNumber);
              const isActive = hasActiveItems(tableNumber);

              return (
                <div
                  key={tableNumber}
                  className={`bg-white border rounded-[2rem] overflow-hidden transition-all duration-300 ${
                    isActive
                      ? "border-zinc-900 shadow-xl"
                      : "border-zinc-200 opacity-60 scale-[0.98]"
                  }`}
                >
                  {/* 🌟 テーブルヘッダー：会計ボタンを追加 */}
                  <div
                    className={`px-6 py-4 flex justify-between items-center ${
                      isActive
                        ? "bg-zinc-900 text-white"
                        : "bg-zinc-100 text-zinc-400"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm uppercase tracking-widest">
                        T-{tableNumber}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      )}
                    </div>

                    {isActive && (
                      <Link
                        href={`/admin/checkout/${tableNumber}`}
                        className="flex items-center gap-1.5 text-[9px] font-black uppercase bg-white text-black px-3 py-1.5 rounded-full hover:bg-zinc-200 transition-all active:scale-90 shadow-sm"
                      >
                        <Receipt size={15} />
                        会計
                      </Link>
                    )}
                  </div>

                  <div className="p-5 min-h-[120px]">
                    {tableOrders.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 opacity-20">
                        <Clock size={24} />
                        <p className="text-[10px] font-black uppercase mt-2 tracking-widest">
                          注文はありません
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {tableOrders.map((order) =>
                          getSortedItems(order.items).map((item) => (
                            <div
                              key={item.id}
                              className={`flex justify-between items-center p-3 rounded-2xl border border-zinc-50 bg-zinc-50/50 transition-all ${
                                item.status === "served"
                                  ? "opacity-30 grayscale"
                                  : ""
                              }`}
                            >
                              <div className="flex-1 min-w-0">
                                <p className="font-black text-xs uppercase truncate leading-tight">
                                  {item.menu?.name}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-sm font-black text-zinc-500">
                                    x{item.quantity}
                                  </span>
                                  {item.option && (
                                    <span className="text-xs text-zinc-500 truncate font-bold">
                                      / {item.option}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="ml-3">
                                {item.status === "served" ? (
                                  <div className="p-1 text-green-500">
                                    <svg
                                      size={16}
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={4}
                                      className="w-4 h-4"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() =>
                                      updateStatus(item.id, "served")
                                    }
                                    className="text-[9px] font-black uppercase bg-black text-white px-3 py-2 rounded-xl hover:bg-zinc-700 transition-all active:scale-95 shadow-sm"
                                  >
                                    Served
                                  </button>
                                )}
                              </div>
                            </div>
                          )),
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
}
