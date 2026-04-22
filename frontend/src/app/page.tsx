//トップページ画面

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

//背景スライド用の画像リスト
//フロント側の public から
const foodImages = [
  { src: "/steki.webp", alt: "Steak" },
  { src: "/margherita.webp", alt: "Pizza" },
  { src: "/supea.webp", alt: "Ribs" },
  { src: "/friedChiken.webp", alt: "Chicken" },
  { src: "/MacaroniCheese.webp", alt: "Mac & Cheese" },
  { src: "/acquaPazza.webp", alt: "Acqua Pazza" },
  { src: "/bowl.webp", alt: "Bowl" },
  { src: "/cheeseFondue.webp", alt: "Cheese Fondue" },
  { src: "/FilletSteak.webp", alt: "Fillet Steak" },
  { src: "/GrilledSalmon.webp", alt: "Grilled Salmon" },
  { src: "/MixPizza.webp", alt: "Mix Pizza" },
  { src: "/prosciutto.webp", alt: "Prosciutto" },
  { src: "/salad1.webp", alt: "Salad" },
  { src: "/sandwich.webp", alt: "Sandwich" },
  { src: "/TomatoPasta.webp", alt: "Tomato Pasta" },
  { src: "/Shake.webp", alt: "Shake" },
  { src: "/LcedCoffee.webp", alt: "Iced Coffee" },
  { src: "/LemonTea.webp", alt: "Lemon Tea" },
  { src: "/Donatu.webp", alt: "Donut" },
  { src: "/RoundDonut.webp", alt: "Round Donut" },
  { src: "/berryCake2.webp", alt: "Berry Cake" },
];

export default function HomePage() {
  
  const [currentIdx, setCurrentIdx] = useState(0);

  //5秒毎に背景を変えるタイマー
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % foodImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);


  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden font-sans">
      {/* 背景：料理画像のスライドショー */}
      <div className="absolute inset-0 z-0">
        {foodImages.map((img, idx) => (
          <Image
            key={`${img.src}-${idx}`}
            src={img.src}
            alt={img.alt}
            fill
            className={`object-cover transition-opacity duration-1000 ease-in-out ${
              idx === currentIdx ? "opacity-40" : "opacity-0"
            }`}
            priority={idx === 0}
          />
        ))}

        {/* 文字を読みやすくするためのグラデーション */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
      </div>

      {/* --- 前面：メインコンテンツ --- */}
      <div className="relative z-20 text-center px-6 text-white flex flex-col items-center">
        {/* ロゴエリア */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-4">
            Digital
            <br />
            Menu
          </h1>
          <p className="text-zinc-400 text-[10px] md:text-xs tracking-[0.5em] uppercase font-light">
            Crafting Memorable Flavors
          </p>
        </div>

        {/* --- QRコードの重なりデザインエリア --- */}
        <div className="relative w-full max-w-md h-48 mt-8 mb-16 flex items-center justify-center">
          {/* 左側のQR案内画像（斜め） */}
          <div className="absolute left-4 md:-left-12 bottom-0 w-32 h-44 border-[6px] border-white shadow-2xl rotate-[-12deg] transition-transform hover:rotate-[-5deg] duration-500 z-10 overflow-hidden">
            <Image
              src="/mdOrder.jpg"
              alt="Scan Guide 1"
              fill
              className="object-cover"
            />
          </div>

          {/* 右側のQR案内画像（少し重ねる） */}
          <div className="absolute right-4 md:-right-12 bottom-4 w-36 h-48 border-[6px] border-white shadow-2xl rotate-[8deg] transition-transform hover:rotate-[3deg] duration-500 z-20 overflow-hidden">
            <Image
              src="/mdOrder2.jpg"
              alt="Scan Guide 2"
              fill
              className="object-cover"
            />
          </div>

          {/* 中央のテキストボックス（すりガラス風） */}
          <div className="bg-white/5 backdrop-blur-xl p-6 border border-white/10 z-30">
            <p className="text-xs md:text-sm tracking-[0.2em] leading-loose font-medium">
              卓上のQRコードをスキャンして
              <br />
              メニューをご覧ください
            </p>
          </div>
        </div>

        {/* ボタンエリア */}
        <div className="flex flex-col items-center gap-6">
          <Link
            href="/table/1"
            className="px-12 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-zinc-200 transition-all active:scale-95"
          >
            Enter Table 1
          </Link>
          <div className="w-8 h-[1px] bg-zinc-700"></div>
          
        </div>
      </div>

      {/* 装飾用の固定テキスト */}
      <div className="fixed bottom-8 left-8 hidden lg:block text-[10px] text-zinc-600 font-black uppercase tracking-[1em] vertical-rl">
        Est. 2026
      </div>
    </div>
  );
}