<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    /**
     * メニュー一覧をカテゴリ別に取得してNext.jsに返す
     */
    public function index()
    {
        $categories = Category::with('menus')->orderBy('display_order', 'asc')->get();

        return response()->json($categories);
    }
}
