# Digital Menu

**QRコードをスキャンするだけ。テーブルから注文が完結するモバイルオーダーシステム**

> Next.js × Laravel × Laravel Reverb（WebSocket）× Docker

---

## アプリの概要

このアプリを一言で言うと、**「お客がスマホからそのまま注文でき、厨房にリアルタイムで届く、飲食店向けセルフオーダーシステム」**です。

テーブルに置いたQRコードをお客がスキャンするだけでメニュー画面が開き、カートに入れて注文確定すると、**Laravel Reverb（WebSocket）によってキッチンの管理画面に瞬時に通知が届きます**。

Next.js（フロントエンド）× Laravel 12（バックエンド）の2層構成で構築し、リアルタイム通信技術である **Laravel Reverb** の実務的な使い方を学ぶことを目的として開発しました。

---

## こだわったポイント

### 1. QRコードを読むだけ、ログイン不要のお客体験
お客側はアカウント登録・ログイン一切不要。`/table/1` のようなURLに直接アクセスするだけでメニューが開きます。「QRコードをスキャンして注文」という、実際の飲食店での体験をそのままWebで再現しました。

### 2. リアルタイム通知で「注文が届いた」を厨房へ即伝達
注文確定ボタンを押した瞬間、**Laravel ReverbのWebSocketで管理画面に通知が飛びます**。ページをリロードしなくても、Kitchen Display画面に新しい注文カードが自動で追加されます。

### 3. 料理1品ずつのステータス管理
注文全体ではなく、**料理1品ごとに「SERVE NOW」ボタンで提供済み管理**ができます。複数品の注文でも「あれは出した、これはまだ」という細かい状態管理を実現しています。

### 4. カテゴリタブ付きのメニューUI
ステーキ・パスタ・ドリンクなど9カテゴリのメニューをタブで切り替え表示。スマホ画面でも快適に使えるモバイルファーストなレイアウトです。

### 5. ドリンクのフレーバー選択に対応
ドリンクカテゴリの商品はモーダルでフレーバーを選択してからカートに追加できます。選択肢は商品の説明文から自動生成され、未選択のまま注文できない制御も実装しています。

### 6. Dockerによる完全コンテナ化
nginx・PHP(Laravel)・MySQL・Next.js・phpMyAdmin・Reverbの6サービスを1つの `docker-compose.yml` で管理。MySQLの起動完了をhealthcheckで確認してからReverbを起動する、**起動順序の制御**まで実装しています。

### 7. TypeScriptによる型安全な設計
APIから受け取るデータ（Menu・Category・Order・OrderItem）に対して厳密な `interface` を定義。コンポーネント間でデータの形が明確になり、バグの少ない開発を実現しました。

### 8. シンプルで海外風のUIデザイン
白・黒・グレーをベースカラーに統一。Tailwind CSSで余白・フォント・アニメーションにこだわり、実在するおしゃれなレストランのデジタルメニューを目指したUIを構築しました。

### 9. Laravel Breeze による管理者ログイン認証
管理者のログイン・ログアウト機能は **Laravel Breeze** を使って構築しました。BreezeはLaravelが公式に提供している認証のスターターキットで、ログイン・パスワードリセット・認証ガードなどの仕組みをゼロから書かずに導入できます。フロントエンド（Next.js）との認証連携には **Laravel Sanctum**（セッションベース認証）を組み合わせ、`useAuth` カスタムフックで「ログインしていない人は自動でログインページへ飛ばす」処理を実装しています。

### 10. 売上ダッシュボード
管理者は日付を切り替えながら「日別売上・注文件数・平均単価・料理ランキング・カテゴリ別売上バーチャート」を確認できます。
 
### 11. 会計機能・会計履歴
テーブルごとに注文内容を確認してワンクリックで会計済みにできます。会計済みの履歴は日付ごとに閲覧できます。

---

## Laravel Reverbとは何か（仕組みの理解）

> 初めてReverbを触った時のために、仕組みをここにまとめておきます。後から見返した時にわかるように。

### 普通のWebとReverbの違い

| 方式 | 例え | 説明 |
|------|------|------|
| 普通のWeb（リロード） | ラーメンができたか毎分カウンターに聞きに行く | お客がお店に聞きに行く方式。非効率 |
| Reverb（WebSocket） | 席で待っていたら「お客様、できました！」と声をかけてもらえる | お店からお客に知らせる方式 |

### WebSocketとは

通常のHTTP通信は「リクエストして返事をもらったら終わり」の1回限りの会話です。WebSocketは「電話をかけてつながったまま」の状態です。お互いにいつでも話しかけられます。

```
ブラウザ  ⟷  ずっとつながってる  ⟷  Reverb（WebSocketサーバー）
```

### 新しいファイルの役割

#### `app/Events/OrderCreated.php`（イベントクラス）

「注文が届いたよ！」という**合図を定義するファイル**です。例えるとレストランの「呼び出しベル」で、注文が確定したら「チーン！」と鳴らす合図を定義しています。

```php
// OrderController.php の中で
event(new OrderCreated($order));
// ↑「注文が来たよ！」とベルを鳴らす
```

このファイルには3つの大事なことが書かれています。

- **何のデータを持つか**：`public $order`（注文情報を持つ）
- **どのチャンネルに送るか**：`new Channel('orders')`（ordersチャンネルに送る）
- **どんな名前で送るか**：`broadcastAs()`（イベントの名前を決める）

#### `frontend/src/lib/echo.ts`（フロントの受信機）

「ordersチャンネルを聞き続けるラジオ」です。例えるとラジオの受信機で、特定のチャンネル（周波数）に合わせて、そこから流れてくる情報を受け取ります。

```typescript
// echo.ts でEchoを初期化（ラジオをセットする）
window.Echo = new Echo({ broadcaster: "reverb", ... })

// ページ内でチャンネルを聞く
window.Echo.channel("orders")
  .listen(".OrderCreated", (e) => {
    // ここに注文が届く！
  })
```

### リアルタイム通知の全体の流れ

```
① お客が注文ボタンを押す
   ↓ POST /api/orders
② OrderController が DB に保存して event() を発火
   ↓ QUEUE_CONNECTION=sync なので即座に処理
③ OrderCreated.php が「ordersチャンネルに送って」と指示
   ↓ Laravel が Reverb（reverb:8080）に送信
④ Reverb（WebSocketサーバー）が全員のブラウザに届ける
   ↓ WebSocket でブロードキャスト
⑤ echo.ts が受け取って管理画面を自動更新！
```

---

## 苦労した点・学んだこと


### 問題1：MySQLが準備できる前にReverbが起動しようとした

**例え：** お店が開く前にホールスタッフが出勤したが、厨房がまだ準備中だった。ホールスタッフは仕事が始められず帰ってしまった。

**技術的な原因：** Reverbコンテナは起動するとすぐMySQLに接続しようとします。でもMySQLはまだ「起動中」で接続できない状態でした。`docker-compose logs reverb` で `Connection refused` エラーが確認できました。

**解決策：** `healthcheck` という設定を追加しました。「MySQLが本当に使える状態になったか？」を5秒ごとに確認して、OKになってからReverbを起動するようにしました。

```yaml
mysql:
  healthcheck:
    test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
    interval: 5s
    timeout: 5s
    retries: 10

reverb:
  depends_on:
    mysql:
      condition: service_healthy  # MySQLが完全に起動してから
```

**学び：** 「コンテナが起動した」と「サービスが使える状態」は別物。

---

### 問題2：Next.jsがサーバー側でecho.tsを読もうとした（Pusher client not found エラー）

**例え：** 「スマホアプリ専用の機能」をパソコンで実行しようとしてエラーになった。

**技術的な原因：** Next.jsはコードをサーバー側でも実行します（SSR）。`window` オブジェクト（ブラウザの機能）はサーバーには存在しません。`"use client"` を書いてもimportの実行はサーバーでも起きてしまいます。

**解決策：** `typeof window !== "undefined"` でブラウザの時だけEchoを作るようにしました。そして `window.Echo` に保存することで、どのページからでも同じEchoを使い回せるようにしました。

```typescript
// ブラウザかサーバーかを判定
const isBrowser = typeof window !== "undefined";

if (isBrowser) {
  window.Pusher = Pusher;
  if (!window.Echo) {
    window.Echo = new Echo({ ... }); // ブラウザの時だけ作る
  }
}
```

**学び：** Next.jsでは `window` を使う処理は必ずブラウザ判定が必要。`"use client"` だけでは不十分。

---

### 問題3：Dockerの中でlocalhostが自分自身を指していた

**例え：** 「隣の部屋に荷物を届けて」と頼んだら、自分の部屋に届けてしまった。

**技術的な原因：** Docker内では各コンテナが独立した「部屋」です。`localhost` は「今いる部屋（自分自身）」を指します。phpコンテナから `localhost:8080` に送っても、reverbコンテナには届きません。

```
// Laravelログのエラー
Failed to connect to localhost port 8080: Could not connect to server
```

**解決策：** Dockerではコンテナ名がそのままホスト名になります。`REVERB_HOST="localhost"` を `REVERB_HOST="reverb"` に変えました。

```env
# laravel/.env
REVERB_HOST="reverb"  # ← コンテナ名で指定する
```

**学び：** Docker内のコンテナ同士は「コンテナ名」で通信する。`localhost` は自分自身を指す。

---

### 問題4：イベント名がフロントとバックでズレていた

**例え：** 送り主は荷物に「A」と書いたのに、受け取り側は「B」という名前の荷物を待っていた。

**技術的な原因：** Laravelはデフォルトで `App\Events\OrderCreated` という長いフルネームでイベントを送ります。フロントは `OrderCreated` という短い名前で待っていたのでズレていました。

**解決策：** `broadcastAs()` メソッドを追加して短い名前を指定し、フロントではドットつきで受け取るようにしました。

```php
// OrderCreated.php に追加
public function broadcastAs(): string
{
    return 'OrderCreated'; // 短い名前で送る
}
```

```typescript
// フロント側はドット（.）をつけて受け取る
window.Echo.channel("orders")
  .listen(".OrderCreated", (e) => { ... })
//         ↑ このドットが「カスタム名を使っているよ」というサイン
```

**学び：** `broadcastAs()` でカスタム名をつけたら、フロントはドットつきで受け取る。

---

### 問題5：キューワーカーが動いていなかった

**例え：** 注文票（伝票）を伝言箱に入れたが、伝言箱を確認する人が誰もいなかった。

**技術的な原因：** Laravelはイベントをすぐに処理せず「キュー（順番待ちリスト）」に入れることがあります。そのキューを処理する「ワーカー（処理係）」が動いていなかったので、イベントが積まれたまま誰にも処理されませんでした。

**解決策：** `QUEUE_CONNECTION=sync` に変えました。`sync` は「キューを使わず、その場で即座に処理する」という設定です。

```env
# laravel/.env
QUEUE_CONNECTION=sync  # キューを使わず即座に処理
```

> **注意：** 本番環境ではキューワーカーを別途動かす方が推奨です。`sync` は開発中の手軽な設定です。

**学び：** 開発中は `QUEUE_CONNECTION=sync` にするとReverbイベントが即座に処理される。

---

## 主な機能

| 機能名 | 内容 |
|--------|------|
| モバイルメニュー閲覧 | QRコードからアクセス。カテゴリタブ・モーダル詳細表示付き |
| カート管理 | 個数変更・削除・合計金額のリアルタイム表示 |
| フレーバー選択 | ドリンク商品はフレーバーを選んでからカートに追加 |
| 注文確定 | 1タップで注文。送信中はボタンを無効化して二重送信防止 |
| リアルタイム通知 | 注文確定と同時にLaravel ReverbでKitchen Displayに通知 |
| Kitchen Display | テーブル番号・料理名・個数をカード形式で表示 |
| 提供済み管理 | 料理1品ごとに「SERVE NOW」→ チェックマークに変化 |
| 管理者ログイン | Laravel Breeze + Sanctum認証。未ログインは自動リダイレクト |
| 会計機能 | テーブルごとの注文確認・ワンクリック会計 |
| 会計履歴 | 日付ナビゲーションで過去の会計履歴を閲覧 |
| 売上ダッシュボード | 日別売上・注文件数・料理ランキング・カテゴリ別バーチャート |

---

## 使用技術

 
| カテゴリ | 技術 | 用途 |
|----------|------|------|
| フロントエンド | Next.js 14（App Router） | UI・ルーティング |
| | TypeScript | 型安全な開発 |
| | Tailwind CSS | スタイリング |
| | React Context（CartContext） | カート状態のグローバル管理 |
| | Axios | API通信 |
| | laravel-echo + pusher-js | WebSocket受信（Reverb対応） |
| | SWR | 認証ユーザーの取得 |
| バックエンド | Laravel 12 / PHP 8.4 | REST API・認証・DB操作 |
| | Laravel Breeze | 管理者認証スターターキット（ログイン・認証ガード） |
| | Laravel Reverb | WebSocketサーバー（リアルタイム通信） |
| | Laravel Sanctum | セッションベース認証（Next.jsとのAPI連携） |
| | Laravel Events | OrderCreated / OrderStatusUpdated イベントのブロードキャスト |
| インフラ・DB | MySQL 8.0 | データ保存 |
| | Docker / docker-compose | コンテナ環境構築 |
| | nginx 1.21.1 | リバースプロキシ |
| | phpMyAdmin | DB管理GUI |
| 開発ツール | GitHub | バージョン管理 |

---

## データベース設計

**categoriesテーブル**
 
| カラム名 | 型 | 詳細 |
|----------|----|------|
| id | BigInt | プライマリキー |
| name | string | カテゴリ名（例: ステーキ＆グリル） |
| display_order | integer | 表示順（デフォルト: 0） |
 
**menusテーブル**
 
| カラム名 | 型 | 詳細 |
|----------|----|------|
| id | BigInt | プライマリキー |
| category_id | BigInt | 外部キー（categories.id） |
| name | string | 料理名 |
| description | text | 説明文（ドリンクはフレーバー一覧を記載） |
| price | integer | 価格（円） |
| menu_image | string | 画像パス（storage/配下） |
 
**ordersテーブル**
 
| カラム名 | 型 | 詳細 |
|----------|----|------|
| id | BigInt | プライマリキー |
| table_number | string | テーブル番号（URLのパラメータ） |
| status | string | pending / cooking / served / paid |
| total_price | integer | 合計金額（null許容） |
| paid_at | timestamp | 会計日時（null許容） |
 
**order_itemsテーブル**
 
| カラム名 | 型 | 詳細 |
|----------|----|------|
| id | BigInt | プライマリキー |
| order_id | BigInt | 外部キー（orders.id） |
| menu_id | BigInt | 外部キー（menus.id） |
| quantity | integer | 数量 |
| price | integer | 注文時の単価 |
| option | string | フレーバー等（null許容） |
| status | string | pending / cooking / served（デフォルト: pending） |
 
**usersテーブル（管理者のみ）**
 
| カラム名 | 型 | 詳細 |
|----------|----|------|
| id | BigInt | プライマリキー |
| name | string | 氏名 |
| email | string | メールアドレス（Unique） |
| password | string | パスワード（Hash） |
 

---

## ディレクトリ構成

```
storeOrder/
├── docker-compose.yml
├── docker/
│   ├── nginx/default.conf
│   ├── php/Dockerfile・php.ini
│   └── mysql/my.cnf・data/
├── laravel/                   ← Laravel 12（バックエンド）
│   ├── app/
│   │   ├── Events/
│   │   │   ├── OrderCreated.php          # 注文作成イベント（Reverbブロードキャスト）
│   │   │   └── OrderStatusUpdated.php    # 提供済みイベント（Reverbブロードキャスト）
│   │   ├── Http/Controllers/
│   │   │   ├── OrderController.php       # 注文作成・履歴取得
│   │   │   └── AdminOrderController.php  # 管理者用注文・ステータス更新・売上・会計
│   │   └── Models/
│   │       ├── Order.php
│   │       ├── OrderItem.php
│   │       ├── Menu.php
│   │       └── Category.php
│   ├── routes/api.php
│   └── .env
└── frontend/                  ← Next.js 14（フロントエンド）
    └── src/
        ├── app/
        │   ├── page.tsx                    # トップページ（スライドショー）
        │   ├── login/page.tsx              # 管理者ログイン
        │   ├── admin/
        │   │   ├── orders/page.tsx         # Kitchen Display（管理者）
        │   │   ├── sales/page.tsx          # 売上ダッシュボード
        │   │   ├── history/page.tsx        # 会計履歴
        │   │   └── checkout/[tableId]/page.tsx  # 会計画面
        │   └── table/[id]/
        │       ├── page.tsx                # メニュー一覧（お客）
        │       ├── cart/page.tsx           # カート（お客）
        │       └── orders/page.tsx         # 注文履歴（お客）
        ├── components/
        │   ├── CartPage.tsx
        │   ├── CategoryTabs.tsx
        │   ├── MenuCard.tsx
        │   ├── MenuModal.tsx
        │   ├── Header.tsx
        │   └── Footer.tsx
        ├── context/CartContext.tsx         # カート状態管理
        ├── hooks/useAuth.ts                # Sanctum認証フック
        ├── lib/
        │   ├── axios.ts                    # Axiosインスタンス
        │   ├── echo.ts                     # Laravel Echo初期化（window.Echoに保存）
        │   └── utils.ts                    # getImageUrl()
        └── types/index.ts                  # 型定義（Menu, Order等）
```

---

## セットアップ方法

### 前提条件
- Docker / Docker Compose がインストール済みであること

---

### 手順1 : リポジトリをクローン

```bash
git clone git@github.com:ando625/QROrder.git
cd QROrder
```

---

### 手順2 : Dockerコンテナを起動

```bash
docker compose up -d --build
```

---

### 手順3 : Laravel の初期設定

```bash
# phpコンテナに入る
docker compose exec php bash

# 依存パッケージインストール
composer install

# .envをコピー
cp .env.example .env

# アプリキー生成
php artisan key:generate

# マイグレーション＋シーダー実行
php artisan migrate:fresh --seed

# ストレージリンク作成（画像表示用）
php artisan storage:link
```

`laravel/.env` の重要な設定：

```env
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel_db
DB_USERNAME=laravel_user
DB_PASSWORD=laravel_pass

BROADCAST_CONNECTION=reverb
QUEUE_CONNECTION=sync          # ← 開発中はsyncにする（即座にイベント処理）

REVERB_APP_ID=your_app_id
REVERB_APP_KEY=your_app_key
REVERB_APP_SECRET=your_app_secret
REVERB_HOST="reverb"           # ← localhostではなくコンテナ名で指定！
REVERB_PORT=8080
REVERB_SCHEME=http

FRONTEND_URL=http://localhost:3000
SANCTUM_STATEFUL_DOMAINS=localhost:3000
SESSION_DOMAIN=localhost
SESSION_DRIVER=database
```

> **⚠️ ハマりポイント：** `REVERB_HOST` は `"localhost"` ではなく `"reverb"`（Dockerのコンテナ名）にすること。Docker内では `localhost` は自分自身を指すため、Reverbコンテナに届かない。

---

### 手順4 : フロントエンドの初期設定

`frontend/.env.local` を新規作成：

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost
NEXT_PUBLIC_REVERB_APP_KEY=your_app_key
NEXT_PUBLIC_REVERB_HOST=localhost
NEXT_PUBLIC_REVERB_PORT=8080
```

---

### 手順5 : アクセス確認

| サービス | URL |
|----------|-----|
| フロントエンド（Next.js） | http://localhost:3000 |
| バックエンドAPI（Laravel） | http://localhost:80 |
| DB管理画面（phpMyAdmin） | http://localhost:8888 |
| ReverbサーバーWS | ws://localhost:8080 |

---

## テストアカウント

> `php artisan migrate:fresh --seed` 実行後に自動生成されます。

| ロール | メールアドレス | パスワード |
|--------|---------------|-----------|
| 管理者 | admin@gmail.com | pass1234 |

---

## 画面紹介

### トップページ
料理画像のスライドショーを背景に、QRコードの使い方を案内。`/table/1` へのリンクボタンからデモ体験ができます。

### メニュー一覧（お客側）
テーブル番号がヘッダーに表示され、カテゴリタブで絞り込みが可能。カードをクリックするとモーダルで詳細表示・カートへの追加ができます。

### カート画面
注文商品の個数変更・削除・合計金額確認が可能。「注文する」ボタンで確定するとLaravel経由でReverbイベントが発火します。

### Kitchen Display（管理者）
テーブル1〜12を常時表示。注文が届くとリアルタイムでそのテーブルのカード内に料理が追加されます。「SERVE NOW」ボタンで提供済みに変更でき、全品提供済みになると薄く表示されます。

### 注文履歴（お客側）
注文した料理の一覧と、管理者がSERVE NOWを押した瞬間にリアルタイムで「Cooking...」→「Served」に変わります。

---

## 今後の拡張予定

- [ ] 管理者側の会計画面（テーブルごとの合計・会計済みボタン）
- [ ] 日別・月別の売上管理・グラフ表示
- [ ] 注文ステータスの3段階化（待ち → 調理中 → 提供済み）
- [ ] テーブルごとのQRコード自動生成
- [ ] メニューのCRUD管理画面（ブラウザから追加・編集）