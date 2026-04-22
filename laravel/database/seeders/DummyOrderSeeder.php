<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Menu;

class DummyOrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //メニューが１つもないとエラーになるのでメニューが存在することを確認
        $menus = Menu::all();
        if ($menus->isEmpty()) {
            $this->command->error('メニューがありません。先にメニューのSeederを実行してください！');
            return;
        }

        //５０件の注文データを作成
        Order::factory(50)->create()->each(function ($order) use ($menus){
            //各注文に対して１−３この商品を紐ずける
            $itemCount = rand(1,3);

            for ($i = 0; $i < $itemCount; $i++) {
                $menu = $menus->random();
                OrderItem::create([
                    'order_id' => $order->id,
                    'menu_id' => $menu->id,
                    'quantity' => rand(1, 2),
                    'price' => $menu->price,
                    'status' => 'served',
                    'created_at' => $order->created_at, // 親の注文と同じ日時にする
                    'updated_at' => $order->created_at,
                ]);
            }
        });
    }
}
