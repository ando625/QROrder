//frontend/src/app/table/[id]/page.tsx
//QRコードでテーブル注文をする想定で、URLにテーブル番号を

"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import axios from "@/lib/axios";
import { Category, Menu } from "@/types";
import CategoryTabs from "@/components/CategoryTabs";
import MenuCard from "@/components/MenuCard";
import MenuModal from "@/components/MenuModal";
import Link from "next/link";
import { ClipboardList } from "lucide-react";

export default function TableMenuPage() {
  const params = useParams();
  const tableId = params.id as string; // URLからテーブル番号を取得

  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await axios.get("/api/menus");
        setCategories(res.data);
      } catch (err) {
        console.error("データの取得に失敗しました", err);
      }
    };
    fetchMenus();
  }, []);

  //表示するカテゴリを計算する
  const filteredCategories = useMemo(() => {
    if (activeCategoryId === null) return categories;
    return categories.filter((cat) => cat.id === activeCategoryId);
  }, [activeCategoryId, categories]);

  return (
    <div className="p-8 bg-zinc-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        {/* 今どのテーブルにいるかを表示 */}
        <div className="mb-8 p-4 bg-white rounded-xl shadow-sm border border-zinc-100 flex items-center justify-between">
          <h1 className="text-xl font-black">
            TABLE No. <span className="text-blue-600">{tableId}</span>
          </h1>
          <span className="text-[10px] bg-zinc-100 px-2 py-1 rounded font-bold text-zinc-500 uppercase">
            QRコード: テーブルオーダー注文システム
          </span>
        </div>

        {/* 注文履歴 */}
        <div>
          <Link
            href={`/table/${params.id}/orders`}
            className="fixed bottom-24 right-6 bg-gray-100 border border-zinc-200 p-4 rounded-full shadow-lg z-50 hover:scale-105 transition-transform flex flex-col items-center justify-center gap-1 min-w-[80px]"
          >
            <ClipboardList size={24} className="text-black" />
            <span className="text-xs font-black text-black tracking-widest whitespace-nowrap">
              注文履歴
            </span>
          </Link>
        </div>

        <CategoryTabs
          categories={categories}
          activeCategoryId={activeCategoryId}
          onSelect={setActiveCategoryId}
        />
      </div>

      {selectedMenu && (
        <MenuModal menu={selectedMenu} onClose={() => setSelectedMenu(null)} />
      )}

      {filteredCategories.map((category) => (
        <div key={category.id} className="mb-12 max-w-7xl mx-auto">
          <h2 className="text-2xl font-black mb-10 text-black tracking-tighter uppercase flex items-center gap-4">
            {category.name}
            <div className="h-[1px] bg-zinc-200 flex-grow"></div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {category.menus.map((menu) => (
              <MenuCard
                key={menu.id}
                menu={menu}
                onClick={() => setSelectedMenu(menu)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
