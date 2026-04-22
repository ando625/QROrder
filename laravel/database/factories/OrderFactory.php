<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        //1週間前から前日までのランダムな日付を作る
        $createdAt = fake()->dateTimeBetween('-1 week', 'yesterday 23:59:59');


        return [
            'table_number' => (string)fake()->numberBetween(1, 12),
            'status' => 'paid', // 会計済みのデータを作る
            'total_price' => fake()->numberBetween(1000, 5000),
            'paid_at' => $createdAt, // 会計日時も作成日と同じにしておく
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ];
    }
}
