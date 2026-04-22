//frontend/src/types/index.ts

//メニュー１つ分の設計図
export interface Menu{
  id: number;
  category_id: number;  //どのカテゴリか
  name: string;         //料理名
  price: number;        //値段
  description: string;  //商品説明
  menu_image: string;   //画像ファイル名
}


//カテゴリ１つ分の設計図
export interface Category{
  id: number;
  name: string;        //カテゴリ名
  menus: Menu[];       //その中にメニューの「リスト（配列）」が入っている
}


/**
 * 注文確定時にバックエンドへ送るデータの設計図
 * ordersテーブルの構造に対応
 */
export interface Order {
  id?: number;
  table_number: string;  //どのテーブルか
  status: 'pending' | 'cooking' | 'served' | 'paid';  //状態
  total_price: number;   //合計金額
  items: OrderItem[];
  created_at?: string;
  paid_at?: string | null;
}


/**
 * 注文された商品1つ1つの設計図
 * order_itemsテーブルの構造に対応
 */
export interface OrderItem {
  id?: number;
  order_id?: number; //どの注文に属するか
  menu_id: number;   //料理のID
  quantity: number;  //個数
  price: number;     //注文時の単価
  option: string | null; //選んだフレーバー
  menu?: Menu;
}