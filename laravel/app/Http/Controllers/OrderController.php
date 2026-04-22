<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use App\Events\OrderCreated;


class OrderController extends Controller
{
    public function store(Request $request)
    {
        // フロントから「テーブル番号」と「商品のリスト」を受け取る
        $validated = $request->validate([
            'table_number' => 'required|string',
            'items' => 'required|array',
        ]);

        //注文をDBに保存 親である Order を作成
        return DB::transaction(function () use ($validated){
            $order = Order::create([
                'table_number' => $validated['table_number'],
                'status' => 'pending',  //状態を「待ち」にする
                'total_price' => 0,     //後で計算して更新する
            ]);

            $total = 0;

            //商品リストを１つずつ「子」である OrderItem に保存する
            foreach ($validated['items'] as $item) {
                $orderItem = new OrderItem();
                $orderItem->order_id = $order->id;  //この商品はこの注文に属す
                $orderItem->menu_id = $item['menu_id'];  //どの商品か 
                $orderItem->quantity = $item['quantity'];  //何個か
                $orderItem->price = $item['price'];  //いくらか
                $orderItem->option = $item['option'] ?? null;  //フレーバーあれば
                $orderItem->status = 'pending';
                $orderItem->save();

                $total += $item['price'] * $item['quantity'];
            }

            // 合計金額を更新する
            $order->update(['total_price' => $total]);

            event(new OrderCreated($order->load('items.menu')));

            // フロントに詳しい情報を返してあげる
            return response()->json([
                'message' => '注文を確定しました！',
                'order_id' => $order->id
            ]);
        });

    }


   

    //特定のテーブルの注文履歴を表示
    public function index($table_number)
    {
        //1会計毎にリセット
        $orders = Order::where('table_number', $table_number)
            ->where('status', '!=', 'paid')  //会計済み以外を表示
            ->with('items.menu')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($orders);
    }
}
