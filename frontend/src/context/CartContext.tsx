//複数の画面（メニュー画面、カート画面、ヘッダーなど）でカートの中身を共有するために Context（コンテキスト） という仕組みを使う
//context/CartContext.tsx

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Menu } from "@/types";

//カートに入れる商品の型定義
export type CartItem = Menu & {
  quantity: number;           //商品の個数
  selectedOption?: string;    //選んだフレーバー
}

//Contextの中身の型定義
type CartContextType = {
  cartItems: CartItem[];   //商品一覧
  addToCart: (item: Menu, option: string | undefined, quantity: number) => void;  //商品を追加する関数(カートに入れる)
  updateQuantity: (menuId: number, option: string | undefined, delta: number) => void;  //数量変更できる
  removeFromCart: (menuId: number, option: string | undefined) => void;  //商品削除
  totalPrice: number;      //合計金額
  clearCart: () => void;   //カートをからに
}




const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  
  //今のカートの中身
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // サーバー側では動かないのでブラウザ判定が必要
    if (typeof window === "undefined") return [];

    try {
      const saved = localStorage.getItem("cart"); // 「cartという名前で保存したデータ頂戴」
      return saved ? JSON.parse(saved) : []; // あれば復元、なければ空配列
    } catch {
      return []; // 万が一壊れたデータでもエラーにならないように
    }
  });

  // cartItemsが変わるたびにlocalStorageに保存する リロードしてもカートの中身が消えないように
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    // ↑ 「cartという名前で、cartItemsをJSON文字列にして保存して」
  }, [cartItems]);
  // ↑ [cartItems] = cartItemsが変わるたびに実行する


  //カートを空にする関数
  const clearCart = () => {
    setCartItems([]); 
  };

  //カートに商品を追加する関数
  const addToCart = (
    menu: Menu,
    option: string | undefined,
    quantity: number,
  ) => {
    setCartItems((prev) => {
      //全く同じ商品がすでにあるか探す
      const existingItem = prev.find(
        (item) => item.id === menu.id && item.selectedOption === option,
      );

      if (existingItem) {
        //あればその商品だけ個数を増やす
        return prev.map((item) =>
          item.id === menu.id && item.selectedOption === option
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        //同じものがなければ新しく追加
        return [...prev, { ...menu, quantity: quantity, selectedOption: option }];
      }
    });
  };


  //数量変更（増減）
  const updateQuantity = (menuId: number, option: string | undefined, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        (item.id === menuId && item.selectedOption === option)
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      ).filter(item => item.quantity > 0)  //0にならないようして⬆️ なったら削除
    );
  }

  //商品削除
  const removeFromCart = (menuId: number, option: string | undefined) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.id === menuId && item.selectedOption === option),
      ),
    );
  };

  //合計金額計算
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);


  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, totalPrice,clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

//使うためのショートカット
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};