//frontend/src/app/table/[id]/orders/page.tsx
//注文履歴

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "@/lib/axios";
import { Order } from "@/types";
import "@/lib/echo";

export default function TableOrdersPage() {
  const params = useParams();
  const tableId = params.id as string;
  const [orders, setOrders] = useState<Order[]>([]);

  // 1. 注文履歴を取得する
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`/api/tables/${tableId}/orders`);
      setOrders(res.data);
    } catch (err) {
      console.error("履歴の取得に失敗しました", err);
    }
  };

  

  useEffect(() => {
    fetchOrders();

    // window.Echo を直接使う
    if (typeof window === "undefined" || !window.Echo) return;

    const channel = window.Echo.channel("orders");

    channel
      .listen(".OrderCreated", (e: any) => {
        console.log("★OrderCreated受信!", e);
        fetchOrders();
      })
      .listen(".OrderStatusUpdated", (e: any) => {
        console.log("★OrderStatusUpdated受信!", e);
        fetchOrders();
      });

    return () => {
      window.Echo?.leaveChannel("orders");
    };
  }, [tableId]);

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-black uppercase mb-8">
          Order History{" "}
          <span className="text-zinc-400 ml-3">#Table {tableId}</span>
        </h1>

        {orders.length === 0 ? (
          <p className="text-zinc-400 text-sm">注文履歴はありません。</p>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order.id} className="border-t border-zinc-100 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black uppercase text-zinc-400">
                    Order ID: {order.id}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 bg-zinc-100 rounded">
                    {new Date(order.created_at).toLocaleTimeString("ja-JP",{
                      hour: "2-digit", minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="space-y-4">
                  {order.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-bold text-sm">{item.menu.name}</p>
                        <p className="text-sm text-zinc-400">
                          × {item.quantity}
                        </p>
                      </div>
                      <div>
                        {item.status === "served" ? (
                          <span className="text-[10px] font-black uppercase text-green-600 bg-green-50 px-2 py-1 rounded">
                            Served
                          </span>
                        ) : (
                          <span className="text-[10px] font-black uppercase text-zinc-400 bg-zinc-50 px-2 py-1 rounded animate-pulse">
                            Cooking...
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}