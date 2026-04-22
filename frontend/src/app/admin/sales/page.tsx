//frontend/src/app/admin/sales/page.tsx

"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useAuth } from "@/hooks/useAuth";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";

export default function SalesPage()
{
  useAuth({ middleware: "auth" });

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);  //今日の日付を初期値として持っとく
  const [data, setData] = useState<any>(null);  //APIから受け取ったデータを入れる
  const [loading, setLoading] = useState(false);

    //指定された日付の売上を取りに行く関数
    const fetchSales = async (targetDate: string) => {
      setLoading(true);

      try {
          const res = await axios.get(`/api/admin/sales/summary?date=${targetDate}`);
          setData(res.data);
      } catch (err) {
          console.error(err);
      } finally {
          setLoading(false);
      }
    };


    useEffect(() => {
      fetchSales(date);
    }, [date]);

    //日付変更ボタン
    const changeDate = (days: number) => {
        const d = new Date(date);
        d.setDate(d.getDate() + days);  //日付を+1 -1
        setDate(d.toISOString().split("T")[0]);
    };

    // ローディング画面
    if (loading || !data) {
      return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
          <div className="text-zinc-400 font-black animate-pulse uppercase tracking-widest text-xs">
            Loading Data...
          </div>
        </div>
      );
    }
  
  //カテゴリ売り上げの一番大きい値をとる
  const maxCategoryTotal = data.category_ranking[0]?.total || 1;


  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans text-zinc-900">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダーエリア */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
              Sales <span className="text-zinc-300">Report</span>
            </h1>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.3em] mt-2">
              売上レポート
            </p>
          </div>

          {/* 日付ナビゲーション */}
          <div className="flex items-center bg-white border border-zinc-200 rounded-full p-1 shadow-sm">
            <button
              onClick={() => changeDate(-1)}
              className="p-2 hover:bg-zinc-100 rounded-full transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="px-4 text-sm font-black min-w-[140px] text-center">
              {new Date(date).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <button
              onClick={() => changeDate(1)}
              className="p-2 hover:bg-zinc-100 rounded-full transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* サマリーカード: 黒背景を混ぜてアクセント */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {[
            {
              en: "Total Sales", // 英語
              jp: "総売上高", // 日本語
              value: `¥${data.total_sales.toLocaleString()}`,
              highlight: true,
            },
            {
              en: "Orders",
              jp: "総注文数",
              value: `${data.total_orders}`,
              highlight: false,
            },
            {
              en: "Average",
              jp: "平均注文単価",
              value: `¥${data.avg_price.toLocaleString()}`,
              highlight: false,
            },
          ].map((item) => (
            <div
              key={item.en}
              className={`rounded-3xl p-8 shadow-sm border text-center ${
                item.highlight
                  ? "bg-zinc-900 text-white border-zinc-900"
                  : "bg-white text-zinc-900 border-zinc-200"
              }`}
            >
              <div className="text-[10px] font-black uppercase tracking-widest opacity-50">
                {item.en}
              </div>
              <div className="text-[10px] font-bold mb-4 opacity-40">
                -- {item.jp} --
              </div>
              <div className="text-3xl font-black tracking-tighter italic">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 売上ランキング: ミニマルなリスト */}
          <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                Menu Ranking
                <span className="block text-xs font-bold normal-case tracking-normal opacity-60">
                  --売上ランキング--
                </span>
              </h2>
              <TrendingUp size={16} className="text-zinc-300" />
            </div>

            <div className="space-y-6">
              {data.ranking.length === 0 ? (
                <p className="text-zinc-300 text-xs py-4">No data available</p>
              ) : (
                data.ranking.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between items-end group">
                    <div className="flex gap-4">
                      <span className="text-2xl font-black text-red-100 group-hover:text-zinc-200 transition-colors">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-black uppercase tracking-tight">
                          {item.menu_name}
                        </p>
                        <p className="text-[10px] text-zinc-400 font-bold">
                          {item.count} Sold
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black">
                        ¥{item.total.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* カテゴリ別売上: 黒いバーチャート */}
          <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-8">
              Category Share
              <span className="block text-xs font-bold normal-case tracking-normal opacity-60">
                --カテゴリ別売上--
              </span>
            </h2>

            <div className="space-y-8">
              {data.category_ranking.length === 0 ? (
                <p className="text-zinc-300 text-xs py-4">No data available</p>
              ) : (
                data.category_ranking.map((item: any, i: number) => (
                  <div key={i}>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-[10px] font-black uppercase">
                        {item.category_name}
                      </span>
                      <span className="text-xs font-black italic">
                        ¥{item.total.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-[6px] bg-zinc-50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-zinc-900 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${(item.total / maxCategoryTotal) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}