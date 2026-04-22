<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('table_number');                 //どのテーブルか
            $table->string('status')->default('pending');   //状態（'pending':待ち, 'cooking':調理中, 'served':提供済, 'paid':会計済）
            $table->integer('total_price')->nullable();                 //合計金額
            $table->timestamp('paid_at')->nullable();
            // ↑「会計した日時」を記録するカラム。nullable = 会計前はnullでOK
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
