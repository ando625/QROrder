<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Events\OrderStatusUpdated;

class AdminOrderController extends Controller
{
    // 全ての注文を取得（キッチンモニター用）
    public function index()
    {
        return Order::with('items.menu')
            ->where('status', '!=', 'paid')     //お会計済み以外を表示
            ->whereDate('created_at', today())  //今日の注文だけを表示（次の日や前日のオーダーを残さない）
            ->orderBy('created_at', 'asc')
            ->get();
    }

    

    //商品１品毎のステータスを更新する
    public function updateItemStatus(Request $request, $id)
    {
        //指定された料理１品を探す
        $item = OrderItem::findOrFail($id);

        //「ステータスを更新して（pending -> cooking -> served）」
        $item->update([
            'status' => $request->status
        ]);

        // 料理の状態が変わったよ！という合図を飛ばす
        event(new \App\Events\OrderStatusUpdated($item));

        return response()->json($item);
    }


    // 売り上げダッシュボード用のデータ
    public function salesSummary(Request $request)
    {
        //フロントから日付を受け取る、なければ今日
        $date = $request->input('date', today()->toDateString());

        //指定日の「会計済み（paid）」の注文を全部取得
        //paidになったものが売り上げとして確定 注文だけでなく関連データも取得
        $orders = Order::with('items.menu.category')
            ->where('status', 'paid')
            ->whereDate('created_at', $date)
            ->get();

        // サマリー計算
        $totalSales = $orders->sum('total_price');  //売上合計
        $totalOrders = $orders->count();            //注文件数
        //平均単価：０件の時に割り算エラーにならないよう
        $avgPrice  = $totalOrders > 0
            ? intval($totalSales / $totalOrders)
            : 0;
        
        //料理ランキング計算
        $ranking = $orders
            ->flatMap(fn($order) => $order->items) //全注文の商品を１つの配列に
            ->groupBy('menu_id')
            ->map(function ($items) {
                $first = $items->first();
                return [
                    'menu_name' => $first->menu->name,
                    'count' => $items->sum('quantity'),
                    'total' => $items->sum(fn($i) => $i->price * $i->quantity),
                ];
            })
            ->sortByDesc('total')  //売上金額の高い順
            ->take(10)              //上位５件だけ
            ->values();

        //カテゴリ別売上計算
        $categoryRanking = $orders
            ->flatMap(fn($order) => $order->items)
            ->groupBy(fn($item) => $item->menu->category->name)
            ->map(function ($items){
                return [
                    'category_name' => $items->first()->menu->category->name,
                    'total' => $items->sum(fn($i) => $i['price'] * $i['quantity']),
                ];
            })
            ->sortByDesc('total')
            ->values();

        // まとめてフロントに返す
        return response()->json([
            'date'             => $date,
            'total_sales'      => $totalSales,
            'total_orders'     => $totalOrders,
            'avg_price'        => $avgPrice,
            'ranking'          => $ranking,
            'category_ranking' => $categoryRanking,
        ]);
    }

    //テーブルの注文を「会計済み(paid)」にする
    public function checkout(Request $request)
    {
        $tableNumber = $request->input('table_number');
        Order::where('table_number', $tableNumber)
            ->where('status', '!=', 'paid')
            ->update([
                'status' => 'paid',
                'paid_at' => now(),
            ]);

        return response()->json(['message' => '会計が完了しました']);
    }

    //会計履歴
    public function paidHistory(Request $request)
    {
        $date = $request->input('date', today()->toDateString());

        $orders = Order::with('items.menu')
            ->where('status', 'paid')
            ->whereDate('paid_at', $date)
            ->orderBy('paid_at', 'desc')
            ->get();
        
        return response()->json($orders);
    }
}
