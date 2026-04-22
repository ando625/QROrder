"use client";

import { Category } from "@/types";

type CategoryTabsProps = {
  categories: Category[];
  activeCategoryId: number | null;
  onSelect: (id: number | null) => void;
};

export default function CategoryTabs({
  categories,
  activeCategoryId,
  onSelect,
}: CategoryTabsProps) {
  return (
    <div className="sticky top-[72px] z-20 bg-zinc-50/80 backdrop-blur-xl border-b border-zinc-200/50 py-6 mb-10">
      <div className="flex overflow-x-auto pb-2 px-4 gap-8 no-scrollbar max-w-7xl mx-auto">
        <button
          key="all"
          onClick={() => onSelect(null)}
          className={`relative pb-2 whitespace-nowrap font-bold text-xl uppercase tracking-[0.2em] transition-all ${
            activeCategoryId === null
              ? "font-black text-black border-b-2 border-black"
              : "font-medium text-zinc-400 hover:text-zinc-600"
          }`}
        >
          All
        </button>

        {/* 各カテゴリのボタン */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(Number(category.id))}
            className={`relative pb-3 whitespace-nowrap font-bold text-sm uppercase tracking-[0.15em] transition-all ${
              activeCategoryId === category.id
                ? "font-black text-black border-b-2 border-black" // 選択時はバキッと黒
                : "font-bold text-zinc-300 hover:text-zinc-800" // 非選択時：zinc-400より少し濃くして、ホバーで黒に
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
