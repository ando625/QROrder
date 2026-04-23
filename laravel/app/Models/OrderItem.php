<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = [
        'menu_id',
        'order_id',
        'quantity',
        'price',
        'option',
        'status',
    ];

    // --- 状態を管理するため ---

    const STATUS_PENDING = 'pending'; // 調理待ち
    const STATUS_COOKING = 'cooking'; // 調理中
    const STATUS_SERVED  = 'served';  // 提供済み

    public static function getStatusLabels()
    {
        return [
            self::STATUS_PENDING => '調理待ち',
            self::STATUS_COOKING => '調理中',
            self::STATUS_SERVED  => '提供済',
        ];
    }


    // 日本語ラベルを $item->status_label で取得できるようにする
    public function getStatusLabelAttribute()
    {
        $labels = self::getStatusLabels();

        // statusがセットされているか、かつラベルの中に存在するかチェック
        if (isset($this->status) && array_key_exists($this->status, $labels)) {
            return $labels[$this->status];
        }

        return '不明'; // 何かあっても「不明」と返すだけでエラーにはならない
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }
}
