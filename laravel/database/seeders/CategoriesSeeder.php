<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'ステーキ＆グリル', 'display_order' => 1],
            ['name' => 'ボウル＆ヌードル', 'display_order' => 2],
            ['name' => 'パスタ＆ピザ', 'display_order' => 3],
            ['name' => 'バーガー＆サンドイッチ', 'display_order' => 4],
            ['name' => 'ポテトチキン＆フライ', 'display_order' => 5],
            ['name' => 'サラダ＆スープ', 'display_order' => 6],
            ['name' => 'サイドメニュー', 'display_order' => 7],
            ['name' => 'デザート', 'display_order' => 8],
            ['name' => 'ドリンク', 'display_order' => 9],

        ];

        foreach($categories as $category){
            Category::create($category);
        }
    }
}
