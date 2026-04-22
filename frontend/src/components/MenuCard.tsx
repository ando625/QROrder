"use client";

import { Menu } from "@/types";
import { getImageUrl } from "@/lib/utils";

type MenuCardProps = {
  menu: Menu;
  onClick: () => void;
};

export default function MenuCard({ menu, onClick }: MenuCardProps) {
  return (
    <div
      className="group bg-white rounded-xl border border-zinc-200 flex flex-col h-full cursor-pointer hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 overflow-hidden"
      onClick={onClick}
    >
      {/* 画像：少しだけズームする仕掛け */}
      <div className="overflow-hidden h-56">
        <img
          src={getImageUrl(menu.menu_image)}
          alt={menu.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        {/* 名前：文字間を詰めて太く（Apple風タイポグラフィ） */}
        <h3 className="font-black text-xl mb-2 text-black tracking-tighter leading-tight uppercase">
          {menu.name}
        </h3>

        {/* 説明：文字を少し小さくして、空気感（余白）を出す */}
        <p className="text-sm text-zinc-400 mb-6 leading-relaxed font-medium">
          {menu.description}
        </p>

        {/* 価格とステータス */}
        <div className="flex justify-between items-end mt-auto pt-4 border-t border-zinc-50">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-300 font-black uppercase tracking-[0.2em] mb-0.5">
              Price
            </span>
            <span className="text-2xl font-black text-black leading-none ml-4">
              ¥{menu.price.toLocaleString()}
            </span>
          </div>

          <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
            <span className="text-lg">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}
