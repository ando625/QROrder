<?php

use App\Http\Controllers\Customer\CartController;
use App\Http\Controllers\Customer\MenuController;
use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminOrderController;





//お客さん用メニュー一覧表示
Route::get('/menus', [MenuController::class, 'index']);

//商品を注文する
Route::post('/orders', [OrderController::class, 'store']);

// 自分のテーブルの注文履歴表示
Route::get('/tables/{table_number}/orders', [OrderController::class,'index']);



Route::middleware(['auth:sanctum'])  
    ->prefix('admin')
    ->group(function () {
        // リアルタイムオーダー表示
        Route::get('/orders', [AdminOrderController::class, 'index']);

        //オーダー内容を提供済みに変更
        Route::patch('/order-items/{id}/status', [AdminOrderController::class, 'updateItemStatus']);

        //月日別売上やデータ一覧
        Route::get('/sales/summary', [AdminOrderController::class, 'salesSummary']);

        //会計済み
        Route::post('/checkout', [AdminOrderController::class, 'checkout']);

        //会計履歴表示
        Route::get('/paid-history', [AdminOrderController::class, 'paidHistory']);
    });




Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});