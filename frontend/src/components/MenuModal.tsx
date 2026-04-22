"use client";

import { Menu } from "@/types";
import { getImageUrl } from "@/lib/utils";
import { useState, useMemo } from "react";
import { useCart } from "@/context/CartContext";
import { Minus, Plus } from "lucide-react";

type MenuModalProps = {
  menu: Menu;
  onClose: () => void;
};

export default function MenuModal({ menu, onClose }: MenuModalProps) {
  // 選択されたオプションを管理する箱
  const [selectedOption, setSelectedOption] = useState("");
  const { addToCart } = useCart();
  const [count, setCount] = useState(1);

  //追加処理を実行する関数
  const handleAddToCart = () => {
    addToCart(menu, selectedOption,count);
    onClose();
    alert(`${menu.name} をカートに追加しました`);
  };


  // 説明文からフレーバーの選択肢を生成する計算
  const options = useMemo(() => {
    if (!menu.description) return [];
    return menu.description
      .replace(/[（）()]/g, "")
      .split(/[・/、]/)
      .map((item) => item.trim());
  }, [menu.description]);

  const isDrink = menu.category_id === 9;
  const isFlavoredDrink =
    isDrink &&
    (menu.description.includes("・") || menu.description.includes("/"));

  return (
    // 画面全体を覆う暗い背景
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-500 max-h-[95vh]">
        {/* --- 画像エリア --- */}
        <div className="relative h-64 group overflow-hidden bg-black rounded-t-2xl">
          <img
            src={getImageUrl(menu.menu_image)}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
            alt={menu.name}
          />
          {/* 画像の右上の×ボタン */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-all"
          >
            ✕
          </button>
        </div>

        {/* --- コンテンツエリア --- */}
        <div className="p-5">
          <div className="mb-3">
            <h2 className="text-xl font-black text-black tracking-tighter uppercase mb-2">
              {menu.name}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-300 uppercase tracking-widest font-black mb-0.5">
                Price
              </span>
              <span className="text-xl font-light text-zinc-900 leading-none ">
                ¥{menu.price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* 説明文 */}
          <p className="text-zinc-500 mb-2 text-sm leading-relaxed border-l border-zinc-100 pl-4">
            {menu.description}
          </p>

          {/* フレーバー選択（ドリンクのみ） */}
          {isFlavoredDrink && options.length > 0 && (
            <div className="">
              <label className="block text-xs uppercase tracking-[0.2em] font-black text-zinc-400 mb-1">
                Select Flavor
              </label>
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="w-full border-b-1 border-zinc-100 rounded-none py-1 bg-transparent text-sm font-medium focus:border-black outline-none transition-colors appearance-none cursor-pointer ml-5"
              >
                <option value="">選択してください▼</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 数量増減ボタン */}
          <div className="flex items-center justify-center gap-8 py-2 border-y border-zinc-50 mb-2">
            <button
              onClick={() => setCount(Math.max(1, count - 1))}
              className="w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center text-xl hover:bg-zinc-50 transition-colors"
            >
              <Minus size={16} strokeWidth={3} />
            </button>

            <div className="flex flex-col items-center min-w-[60px]">
              <span className="text-xs uppercase tracking-widest font-black text-zinc-400">
                数量
              </span>
              <span className="text-xl font-light tracking-tighter">
                {count}
              </span>
            </div>

            <button
              onClick={() => setCount(count + 1)}
              className="w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center text-xl hover:bg-zinc-50 transition-colors"
            >
              <Plus size={16} strokeWidth={3} />
            </button>
          </div>

          {/* --- ボタンエリア --- */}
          <div className="flex flex-col gap-3 max-w-sm mx-auto">
            <button
              disabled={isFlavoredDrink && !selectedOption}
              className={`w-full py-4 rounded-none font-black uppercase tracking-[0.3em] transition-all text-sm ${
                isFlavoredDrink && !selectedOption
                  ? "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-zinc-800 active:scale-[0.98]"
              }`}
              onClick={handleAddToCart}
            >
              {isFlavoredDrink && !selectedOption
                ? "Select an option"
                : "Add to Cart"}
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest hover:text-black transition-colors"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
