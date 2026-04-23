<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;


    protected $fillable = [
        'table_number',
        'status',
        'total_price',
        'paid_at',
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    const STATUS_PENDING = 'pending';
    const STATUS_COOKING = 'cooking';
    const STATUS_SERVED  = 'served';
    const STATUS_PAID    = 'paid';

    //状態（'pending':待ち, 'cooking':調理中, 'served':提供済, 'paid':会計済）
    // 日本語で表示させる
    public static function getStatusLabels()
    {
        return [
            self::STATUS_PENDING => '待ち',
            self::STATUS_COOKING => '調理中',
            self::STATUS_SERVED  => '提供済',
            self::STATUS_PAID    => '会計済',
        ];
    }

    // 今の自分の状態を日本語で取得する
    // app/Models/Order.php

    public function getStatusLabelAttribute()
    {
        $labels = self::getStatusLabels();
        // Order側も安全に取得するように修正
        return $labels[$this->status] ?? '不明';
    }

    
}
