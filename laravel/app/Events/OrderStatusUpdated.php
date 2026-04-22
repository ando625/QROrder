<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\OrderItem;

class OrderStatusUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    // どの商品が更新されたかを保持する変数
    public $orderItem;

    /**
     * Create a new event instance.
     */
    public function __construct(OrderItem $orderItem)
    {
        //受け取ったデータをこのクラスに保存する
        $this->orderItem = $orderItem;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('orders'),
        ];
    }


    // ↓ これを追加！「イベント名を短い名前で送ってね」
    public function broadcastAs(): string
    {
        return 'OrderStatusUpdated';
    }
}
