<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Menu;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $steak  = Category::where('name', 'ステーキ＆グリル')->first();
        $bowl  = Category::where('name', 'ボウル＆ヌードル')->first();
        $pasta  = Category::where('name', 'パスタ＆ピザ')->first();
        $burger = Category::where('name', 'バーガー＆サンドイッチ')->first();
        $poteto  = Category::where('name', 'ポテトチキン＆フライ')->first();
        $salad  = Category::where('name', 'サラダ＆スープ')->first();
        $side   = Category::where('name', 'サイドメニュー')->first();
        $dessert = Category::where('name', 'デザート')->first();
        $drink   = Category::where('name', 'ドリンク')->first();

        $menus = [


            //ステーキ＆グリル
            [
                'category_id' => $steak->id,
                'name' => '熟成牛のサーロインステーキ（200g）',
                'price' => 2400,
                'description' => '適度な霜降りと赤身のバランスが良いサーロインを香ばしく焼き上げました。お肉本来の脂の甘みを楽しみたい方に最適な、標準サイズのステーキです。',
                'menu_image' => 'menu/steki.webp',
            ],
            [
                'category_id' => $steak->id,
                'name' => '特大ポンド・リブロースステーキ（500g）',
                'price' => 5200,
                'description' => '濃厚な旨味が特徴のリブロースを、500gの圧巻ボリュームでご提供。厚切りならではのジューシーな肉汁を堪能できる、シェアにもおすすめの一皿です。',
                'menu_image' => 'menu/steki2.webp',
            ],
            [
                'category_id' => $steak->id,
                'name' => '厳選牛のヒレステーキ（200g）',
                'price' => 3800,
                'description' => '一頭の牛からわずかしか取れない、最高級の希少部位。脂身が少なく、驚くほどの柔らかさと上品な味わいが特徴です。さっぱりと召し上がりたい方に。',
                'menu_image' => 'menu/FilletSteak.webp',
            ],
            [
                'category_id' => $steak->id,
                'name' => 'ラムチョップの炭火グリル',
                'price' => 2400,
                'description' => '厳選した柔らかなラム肉を、ローズマリーと共に香り高く焼き上げました。クセの少ない上質な脂の甘みと、スパイシーな味付けがお酒によく合います。グリルパイナップルの酸味が肉の旨味をさらに引き立てる、本格的な一皿。',
                'menu_image' => 'menu/steak4.webp',
            ],
            [
                'category_id' => $steak->id,
                'name' => '自家製BBQソースのスペアリブ',
                'price' => 1850,
                'description' => 'じっくり時間をかけて火を通し、骨からポロリと外れるほど柔らかく仕上げました。特製のスパイシーなBBQソースが食欲をそそる、ワイルドな逸品です。',
                'menu_image' => 'menu/supea.webp',
            ],
            [
                'category_id' => $steak->id,
                'name' => '丸ごとローストチキンのグリル',
                'price' => 3200,
                'description' => 'チキンを一羽丸ごと、ハーブと共にじっくりとローストしました。外の皮はパリッと、中は驚くほどしっとり。パーティーや特別なディナーの主役にどうぞ。',
                'menu_image' => 'menu/TandooriChicken.webp',
            ],
            [
                'category_id' => $steak->id,
                'name' => 'ノルウェー産サーモンの厚切りグリル',
                'price' => 1650,
                'description' => '脂の乗ったサーモンを贅沢な厚切りにし、皮目までパリッと焼き上げました。フレッシュなハーブの香りと、付け合わせのレモンで爽やかにお楽しみください。',
                'menu_image' => 'menu/GrilledSalmon.webp',
            ],
            [
                'category_id' => $steak->id,
                'name' => 'スズキとアサリの自家製アクアパッツァ',
                'price' => 1800,
                'description' => '新鮮なスズキを一匹丸ごと、アサリやトマトと一緒に白ワインで蒸し上げました。魚介の濃厚な旨味が溶け出したスープは、バゲットとの相性も抜群です。',
                'menu_image' => 'menu/acquaPazza.webp',
            ],
            [
                'category_id' => $steak->id,
                'name' => '白身魚のポワレ 〜焦がしバターソース〜',
                'price' => 1480,
                'description' => '皮目はパリッと、身はふっくらと焼き上げた白身魚のグリル。レモンが香る爽やかなソースと、彩り豊かな野菜を添えた上品なメインディッシュです。',
                'menu_image' => 'menu/poire.webp',
            ],
            [
                'category_id' => $steak->id,
                'name' => '季節野菜の炭火グリル盛り合わせ',
                'price' => 980,
                'description' => 'ズッキーニやパプリカ、ナスなどの旬の野菜をシンプルに炭火で焼き上げ、素材本来の甘みを引き出しました。バルサミコソースや岩塩でお召し上がりください。。',
                'menu_image' => 'menu/vegetables.webp',
            ],


            //ボウル＆ヌードル
            [
                'category_id' => $bowl->id,
                'name' => '熟成牛の特製ステーキボウル',
                'price' => 1480,
                'description' => '香ばしく焼き上げた熟成牛のカットステーキを贅沢にご飯にのせた一品。肉の旨味を引き立てる自家製ソースと、とろ〜り広がる目玉焼きの相性が抜群です。付け合わせのフレッシュハーブと彩り野菜がアクセント。',
                'menu_image' => 'menu/beefBowl.webp',
            ],
            [
                'category_id' => $bowl->id,
                'name' => '炙りマグロとアボカドのポキボウル',
                'price' => 1320,
                'description' => 'さっと表面を炙った新鮮なマグロと濃厚なアボカドを、特製の醤油ダレで和えました。たっぷりの生野菜とライムで、さっぱりと召し上がれるヘルシーな一皿です。',
                'menu_image' => 'menu/bowl.webp',
            ],
            [
                'category_id' => $bowl->id,
                'name' => 'グリルシーフードの贅沢ライスボウル',
                'price' => 1350,
                'description' => '直火で香ばしく焼いた海老やイカ、サーモンをたっぷりのせた洋風どんぶり。特製のガーリック醤油ソースが食欲をそそる、満足度の高い一皿です。',
                'menu_image' => 'menu/seafoodBowl.webp',
            ],
            [
                'category_id' => $bowl->id,
                'name' => '特製醤油の本格チャーシュー麺',
                'price' => 980,
                'description' => 'じっくり煮込んだ自家製チャーシューが主役。鶏と魚介のダブルスープが細麺によく絡みます。シンプルながらも飽きのこない、こだわりの一杯です。',
                'menu_image' => 'menu/ramen.webp',
            ],
            [
                'category_id' => $bowl->id,
                'name' => 'ぷりぷり海老のエスニック・フォー',
                'price' => 950,
                'description' => '鶏ガラの優しいスープに、海老の旨味とハーブが香るベトナム風ライスヌードル。つるっとした喉越しで、ヘルシーに本格的な味わいを楽しめます。',
                'menu_image' => 'menu/four.webp',
            ],
            

            //パスタ＆ピザ
            [
                'category_id' => $pasta->id,
                'name' => '漁師風トマトパスタ「ペスカトーレ」',
                'price' => 1580,
                'description' => 'ムール貝や海老、イカなど、海の幸の旨味がたっぷり溶け込んだトマトソースパスタ。魚介の出汁がパスタにしっかりと染み込んだ、贅沢な一皿です。',
                'menu_image' => 'menu/TomatoPasta.webp',
            ],
            [
                'category_id' => $pasta->id,
                'name' => '濃厚クリームのカルボナーラ',
                'price' => 1320,
                'description' => '卵黄とたっぷりのチーズ、厚切りベーコンを使用した濃厚なソースが自慢。仕上げの黒胡椒が味を引き締める、クリーミーで食べ応えのある定番人気パスタです。',
                'menu_image' => 'menu/carbonara.webp',
            ],
            [
                'category_id' => $pasta->id,
                'name' => 'フレッシュバジルのジェノベーゼ',
                'price' => 1250,
                'description' => '香り高いバジルと松の実、チーズをふんだんに使用した特製ソース。彩り豊かなミニトマトとインゲンを加え、爽やかかつコクのある味わいに仕上げました。',
                'menu_image' => 'menu/genovese.webp',
            ],
            [
                'category_id' => $pasta->id,
                'name' => '特製ミートソースの重ね焼きラザニア',
                'price' => 1400,
                'description' => 'じっくり煮込んだボロネーゼソース、ホワイトソース、チーズを何層にも重ねてオーブンで香ばしく焼き上げました。熱々とろとろの食感を楽しめます。',
                'menu_image' => 'menu/lasagna.webp',
            ],
            [
                'category_id' => $pasta->id,
                'name' => 'チーズとハーブの自家製ラビオリ',
                'price' => 1280,
                'description' => 'もちもちの生地にクリーミーなチーズを閉じ込めたラビオリ。相性の良いトマトソースとフレッシュハーブを合わせました。一口ごとに素材の甘みが広がります。',
                'menu_image' => 'menu/ravioli.webp',
            ],
            [
                'category_id' => $pasta->id,
                'name' => '王道マルゲリータ',
                'price' => 1200,
                'description' => '自家製トマトソース、フレッシュモッツァレラ、バジルのシンプルな組み合わせ。石窯で焼き上げた生地の香ばしさと、チーズのコクが楽しめる定番ピザです。',
                'menu_image' => 'menu/margherita.webp',
            ],
            [
                'category_id' => $pasta->id,
                'name' => '具だくさんミックスピザ',
                'price' => 1450,
                'description' => 'ピーマン、オニオン、ベーコンなど、彩り豊かな具材をたっぷりトッピング。どこを食べても満足感のある、家族や友人とシェアするのにぴったりの一枚です。',
                'menu_image' => 'menu/MixPizza.webp',
            ],
            [
                'category_id' => $pasta->id,
                'name' => '熟成サラミのピリ辛ピザ',
                'price' => 1380,
                'description' => '旨味が凝縮された熟成サラミを贅沢に使用。サラミの塩気とピリッとした刺激がクセになる、ビールやワインのお供に最適なピザです。',
                'menu_image' => 'menu/SalamiPizza.webp',
            ],


            //バーガー＆サンドイッチ
            [
                'category_id' => $burger->id,
                'name' => 'スモーキーベーコン・チーズバーガー',
                'price' => 1250,
                'description' => '香ばしく焼き上げた厚切りベーコンと、とろけるチーズが主役。スモーキーな特製BBQソースがパティの旨味を引き立てる、ガッツリ系の一番人気バーガーです。',
                'menu_image' => 'menu/baconBurger.webp',
            ],
            [
                'category_id' => $burger->id,
                'name' => '自家製タルタルのクリスピーチキンバーガー',
                'price' => 980,
                'description' => 'サクサク衣のチキンフィレに、卵たっぷりの自家製タルタルソースを合わせました。フレッシュなレタスとの相性も抜群な、女性にも人気のバーガーです。',
                'menu_image' => 'menu/ChickenBurger.webp',
            ],
            [
                'category_id' => $burger->id,
                'name' => '厚切りベーコンとエッグの極上クラブサンド',
                'price' => 1250,
                'description' => 'こんがり焼いた厚切りベーコン、フレッシュなトマトとレタス、そして濃厚なタルタルエッグを贅沢にサンドしました。バゲットの香ばしさと具材の旨味が重なる、満足度120%の看板サンドイッチです。',
                'menu_image' => 'menu/sandwich.webp',
            ],
            
            [
                'category_id' => $burger->id,
                'name' => 'ローストポークサンド',
                'price' => 1180,
                'description' => '自家製のローストポークを贅沢に厚切りし、新鮮な野菜と一緒にバゲットで挟みました。お肉の旨味をダイレクトに味わえる、食べ応え満点のサンドイッチです。',
                'menu_image' => 'menu/bucket.webp',
            ],
            [
                'category_id' => $burger->id,
                'name' => 'グリルチキンのサンド',
                'price' => 1110,
                'description' => '直火でジューシーに焼き上げた厚切りチキンを、外はカリッと中はもっちりしたバゲットでサンドしました。フレッシュなトマトとレタス、アクセントの特製マヨソースが食欲をそそる、ボリューム満点のサンドイッチです。',
                'menu_image' => 'menu/chickensand.webp',
            ],
            [
                'category_id' => $burger->id,
                'name' => 'スパイシーチキンのタコス（2P）',
                'price' => 1110,
                'description' => '直火で焼いたスパイシーなチキンに、フレッシュなトマトソース「サルサ」を添えて。お好みでライムを絞れば、爽やかな辛さが口いっぱいに広がります。',
                'menu_image' => 'menu/ChickenTacos.webp',
            ],
            [
                'category_id' => $burger->id,
                'name' => '牛焼肉のトルティーヤ・ラップ',
                'price' => 980,
                'description' => '旨味たっぷりの牛焼肉とフレッシュ野菜を、もちもちのトルティーヤでロールしました。片手で手軽に食べられる、満足感のあるラップサンドです。',
                'menu_image' => 'menu/tortilla.webp',
            ],
            
            


            // ポテトチキン＆フライ
            [
                'category_id' => $poteto->id,
                'name' => '特製スパイスのフライドチキン（4P）',
                'price' => 880,
                'description' => '外はカリッと、中は驚くほどジューシー。数種類のスパイスをブレンドした自慢の衣で仕上げました。お好みのソースをつけてお召し上がりください。',
                'menu_image' => 'menu/Chikin2.webp',
            ],
            [
                'category_id' => $poteto->id,
                'name' => 'フィッシュ＆チップス（ワカモレ添え）',
                'price' => 1380,
                'description' => '外はカリッと中はふんわり揚げた白身魚とポテトの定番セット。爽やかなライムとレモン、そして珍しい濃厚ワカモレソースが、揚げ物の美味しさを引き立てます。',
                'menu_image' => 'menu/FishAndChips.webp',
            ],
            [
                'category_id' => $poteto->id,
                'name' => 'サクサク衣のクリスピーチキン＆ポテト',
                'price' => 1200,
                'description' => '秘伝のスパイスで揚げたジューシーなチキンと、ホクホクのフライドポテトをセットに。ビールとの相性も抜群な、みんなでシェアできるボリューム満点のプレートです。',
                'menu_image' => 'menu/friedChiken.webp',
            ],
            [
                'category_id' => $poteto->id,
                'name' => 'とろけるチーズとグレービーのプーティン',
                'price' => 850,
                'description' => '揚げたてのポテトに、濃厚なグレービーソースと粒状のチーズをたっぷり。カナダ発祥の背徳感あふれる絶品おつまみ。一度食べたら止まりません！',
                'menu_image' => 'menu/pootie.webp',
            ],
            [
                'category_id' => $poteto->id,
                'name' => 'オリジナルスパイスのフライドポテト',
                'price' => 580,
                'description' => '外はカリッと、中はホクホク。数種類のハーブとスパイスをブレンドした、当店オリジナルの味付けです。ビールやハイボールとの相性も抜群。',
                'menu_image' => 'menu/poteto.webp',
            ],
            [
                'category_id' => $poteto->id,
                'name' => 'クリスピーチキンナゲット（5P）',
                'price' => 450,
                'description' => '外はカリッと、中はジューシーに仕上げた一口サイズのナゲット。サイドメニューの定番です。お好みのソース（ケチャップ/マスタード）を選んでお楽しみください。',
                'menu_image' => 'menu/nugget.webp',
            ],
            
            [
                'category_id' => $poteto->id,
                'name' => 'オニオンリング・タワー',
                'price' => 680,
                'description' => '玉ねぎの甘みを引き出し、クリスピーな衣で揚げました。2種類の自家製ソース（ケチャップ・タルタル）で楽しめる、みんなでシェアしやすい人気メニューです。',
                'menu_image' => 'menu/OnionRings.webp',
            ],


            


            //サラダ＆スープ
            [
                'category_id' => $salad->id,
                'name' => 'サーモンとアボカドのポキ風サラダ',
                'price' => 980,
                'description' => '新鮮なサーモンと濃厚なアボカドを、彩り豊かな野菜と一緒に。ライムの酸味とピリ辛のアクセントが効いた、ヘルシーで満足感のあるサラダです。',
                'menu_image' => 'menu/ThermonsSalad.webp',
            ],
            [
                'category_id' => $salad->id,
                'name' => 'グリルチキンのサラダ',
                'price' => 980,
                'description' => '香ばしく焼いたチキンと、数種類のフレッシュ野菜、ナッツを合わせたボリュームサラダ。特製ドレッシングが素材の味を引き立て、一皿で満足感たっぷりです。',
                'menu_image' => 'menu/ChickenSalad.webp',
            ],
            [
                'category_id' => $salad->id,
                'name' => 'パルメザンのシーザーサラダ',
                'price' => 880,
                'description' => '鮮度抜群のロメインレタスに、香り高い削りたてのパルメザンチーズをたっぷりと。自家製クルトンのサクサク感と濃厚なドレッシングが絡み合う、当店定番の人気サラダです。',
                'menu_image' => 'menu/salad.webp',
            ],
            [
                'category_id' => $salad->id,
                'name' => '彩り野菜とフェタチーズのフレッシュサラダ',
                'price' => 750,
                'description' => '2色のミニトマトとオリーブに、コクのあるフェタチーズを合わせたギリシャ風サラダ。さっぱりとしたレモンドレッシングが、素材の味を引き立てます。前菜や、箸休めに最適です。',
                'menu_image' => 'menu/salad1.webp',
            ],
            
            [
                'category_id' => $salad->id,
                'name' => 'あさりと具だくさん野菜のクラムチャウダー',
                'price' => 780,
                'description' => '魚介の旨味が溶け込んだ、クリーミーで濃厚なスープです。あさりと野菜の食感が楽しく、添えられたバゲットと一緒に食べれば心もお腹も満たされます。',
                'menu_image' => 'menu/clamChowder.webp',
            ],
            [
                'category_id' => $salad->id,
                'name' => 'ゴロゴロ野菜の濃厚ビーフシチュー',
                'price' => 1380,
                'description' => '厳選した牛肩肉と大きめにカットした根菜を、赤ワインでじっくり煮込みました。お肉が口の中でほどける贅沢な味わいです。焼きたてのバゲットとご一緒に。',
                'menu_image' => 'menu/BeefStew.webp',
            ],
            [
                'category_id' => $salad->id,
                'name' => 'まるごとトマトの濃厚温スープ',
                'price' => 680,
                'description' => '完熟トマトをじっくり煮込み、甘みと酸味を凝縮させた濃厚なスープ。クリーミーなサワークリームとハーブの香りがアクセントです。焼きたてのバゲットに浸してお召し上がりください。',
                'menu_image' => 'menu/tomatoSoup.webp',
            ],



            //サイドメニュー
            [
                'category_id' => $side->id,
                'name' => 'とろける濃厚チーズソース＆チップス',
                'price' => 650,
                'description' => 'パリパリのトルティーヤチップスを、熱々のとろける特製チーズソースにディップして。ビールやお酒のおつまみにぴったりな、シェアして楽しい一品です。',
                'menu_image' => 'menu/CheeseSauce.webp',
            ],
            [
                'category_id' => $side->id,
                'name' => '具だくさんデラックス・ナチョス',
                'price' => 1200,
                'description' => 'サクサクのチップスに、とろ〜りチーズ、スパイシーな挽肉、濃厚ワカモレをトッピング。ハラペーニョのピリッとした辛さがアクセントの、大満足ボリュームです。',
                'menu_image' => 'menu/chip.webp',
            ],
            [
                'category_id' => $side->id,
                'name' => '濃厚とろ〜りチーズフォンデュ',
                'price' => 1200,
                'description' => '厳選した数種類のチーズをブレンドした、コク深い味わい。ひとくちサイズの香ばしいバゲットを、熱々のチーズにたっぷり絡めてお召し上がりください。',
                'menu_image' => 'menu/cheeseFondue.webp',
            ],
            [
                'category_id' => $side->id,
                'name' => 'クリーミー・マック＆チーズベーコン',
                'price' => 880,
                'description' => 'チーズソースをたっぷり絡めたマカロニに、カリカリのベーコンをトッピング。濃厚でコクのある味わいは、お子様から大人まで楽しめる、アメリカの家庭の味です。',
                'menu_image' => 'menu/MacaroniCheese.webp',
            ],
            [
                'category_id' => $side->id,
                'name' => '自家製クリーミー・マッシュポテト',
                'price' => 550,
                'description' => 'バターと牛乳で丁寧に仕上げた、なめらかでコクのあるマッシュポテト。お肉料理の付け合わせはもちろん、そのまま食べても絶品です。',
                'menu_image' => 'menu/MashedPotato.webp',
            ],
            [
                'category_id' => $side->id,
                'name' => 'ほうれん草とベーコンの自家製キッシュ',
                'price' => 720,
                'description' => 'サクサクのパイ生地に、卵と生クリームの濃厚なアパレイユを流し込み、しっとり焼き上げました。バターの香りが広がる、食べ応えのある一品です。',
                'menu_image' => 'menu/quiche.webp',
            ],
            [
                'category_id' => $side->id,
                'name' => '厳選生ハムとサラミの盛り合わせ',
                'price' => 1200,
                'description' => '熟成された旨味と香りが楽しめる生ハムとサラミを贅沢に。オリーブやクラッカーと一緒に、ワインやカクテルのお供としてゆっくりお楽しみください。',
                'menu_image' => 'menu/prosciutto.webp',
            ],
            [
                'category_id' => $side->id,
                'name' => '焼きたて自家製パン',
                'price' => 300,
                'description' => 'お食事によく合う、小麦本来の香りが楽しめるシンプルなパンです。外はパリッと、中はもちもち。スープやシチューとご一緒にどうぞ。',
                'menu_image' => 'menu/bread2.webp',
            ],
            [
                'category_id' => $side->id,
                'name' => '本格カンパーニュ',
                'price' => 550,
                'description' => '熟成された小麦の深いコクと酸味が特徴の、本格的な田舎パン。食べやすいスライスでご提供します。チーズやワインとの相性が抜群です。',
                'menu_image' => 'menu/bread3.webp',
            ],


            //ドリンク
            [
                'category_id' => $drink->id,
                'name' => 'ソフトドリンク',
                'price' => 480,
                'description' => 'コーラ・グレープソーダ・メロンソーダ・オレンジジュース・サイダー・レモンスカッシュ',
                'menu_image' => 'menu/drink.webp',
            ],
            [
                'category_id' => $drink->id,
                'name' => '濃厚クリーミーシェイク',
                'price' => 580,
                'description' => 'オレンジベリー・ベリーベリー・マンゴーベリー',
                'menu_image' => 'menu/Shake.webp',
            ],
            [
                'category_id' => $drink->id,
                'name' => '完熟バナナの濃厚バナナオレ',
                'price' => 520,
                'description' => '完熟バナナをまるごと使用したような、自然な甘みが広がるバナナオレ。たっぷりのミルクで仕上げた、大人から子供まで楽しめる優しい一杯です。',
                'menu_image' => 'menu/BananaMilk.webp',
            ],
            [
                'category_id' => $drink->id,
                'name' => '自家製レモンティー',
                'price' => 420,
                'description' => '丁寧に淹れた紅茶に、フレッシュレモンの爽やかな酸味をプラス。甘さ控えめで、お食事の味を邪魔しないスッキリとした後味のティーです。',
                'menu_image' => 'menu/LemonTea.webp',
            ],
            [
                'category_id' => $drink->id,
                'name' => 'フレッシュライムのミントサイダー',
                'price' => 620,
                'description' => '生絞りライムの酸味とフレッシュミントの香りが弾ける、爽快感たっぷりの炭酸ドリンク。見た目も涼しげで、お食事の合間のリセットにもおすすめです。',
                'menu_image' => 'menu/lime.webp',
            ],
            [
                'category_id' => $drink->id,
                'name' => '芳醇アイスコーヒー',
                'price' => 480,
                'description' => 'じっくり時間をかけて抽出した、雑味のないクリアな味わいのアイスコーヒー。キレのある苦味と爽やかな後味が、暑い日やリフレッシュに最適です。',
                'menu_image' => 'menu/lcedCoffee.webp',
            ],
            [
                'category_id' => $drink->id,
                'name' => 'クリーミー・アイスカフェオレ',
                'price' => 550,
                'description' => '濃厚なエスプレッソと、たっぷりのミルクを合わせたマイルドな一杯。コーヒーの香ばしさとミルクの優しい甘さが絶妙なバランスで楽しめます。寧に淹れた紅茶に、フレッシュレモンの爽やかな酸味をプラス。甘さ控えめで、お食事の味を邪魔しないスッキリとした後味のティーです。',
                'menu_image' => 'menu/milkCoffee.webp',
            ],
            [
                'category_id' => $drink->id,
                'name' => '自家焙煎ホットコーヒー',
                'price' => 450,
                'description' => '厳選した豆を丁寧にハンドドリップした、香り高い一杯。程よい苦味と深いコクがあり、食後のデザートとも相性抜群な当店のハウスブレンドです。',
                'menu_image' => 'menu/coffee.webp',
            ],


            //デザート
            [
                'category_id' => $dessert->id,
                'name' => 'ごろっとリンゴの自家製アップルパイ',
                'price' => 580,
                'description' => '甘酸っぱい煮リンゴをたっぷり詰め込み、サクサクのパイ生地で焼き上げました。シナモンの香りが引き立つ、どこか懐かしい味わいです。',
                'menu_image' => 'menu/ApplePie.webp',
            ],
            [
                'category_id' => $dessert->id,
                'name' => '濃厚ショコラとベリーのムースケーキ',
                'price' => 680,
                'description' => 'ほろ苦いチョコレートムースに、ベリーの酸味がアクセント。しっとりとしたスポンジと濃厚なクリームの層が楽しめる贅沢な一皿です。',
                'menu_image' => 'menu/berryCake.webp',
            ],
            [
                'category_id' => $dessert->id,
                'name' => 'フレッシュ苺のショートケーキ風タルト',
                'price' => 720,
                'description' => '旬の苺をふんだんに使用した、見た目も可愛らしいタルト。甘さ控えめの生クリームとサクサクのタルト生地が、苺の甘みを引き立てます。',
                'menu_image' => 'menu/berryCake2.webp',
            ],
            [
                'category_id' => $dessert->id,
                'name' => '本格エスプレッソの自家製ティラミス',
                'price' => 650,
                'description' => 'ほろ苦いエスプレッソを染み込ませたスポンジと、なめらかなマスカルポーネクリームを重ねました。口どけの良さと、大人の味わいが魅力の定番デザートです。',
                'menu_image' => 'menu/Tiramisu.webp',
            ],
            [
                'category_id' => $dessert->id,
                'name' => '完熟バナナのメイプルシロップワッフル',
                'price' => 850,
                'description' => '外はカリッと、中はもちもちのワッフルに、完熟バナナとメイプルシロップをトッピング。ボリューム満点でシェアにもおすすめのスイーツです。',
                'menu_image' => 'menu/BananaWaffles.webp',
            ],
            [
                'category_id' => $dessert->id,
                'name' => 'スモア・チョコレートカップケーキ',
                'price' => 480,
                'description' => '濃厚なチョコカップケーキの上に、焼きマシュマロ風のクリームをトッピング。チョコの甘さとマシュマロの食感が楽しい、アメリカンスタイルのケーキです。',
                'menu_image' => 'menu/CupcakeChocolate.webp',
            ],
            [
                'category_id' => $dessert->id,
                'name' => 'ストロベリー・ピンキーカップケーキ',
                'price' => 480,
                'description' => '甘いストロベリークリームを華やかにデコレーションしました。可愛らしいステッキ型のトッピングが目印。お子様にも大人気の一品です。',
                'menu_image' => 'menu/CupcakePink.webp',
            ],
            [
                'category_id' => $dessert->id,
                'name' => 'バニラスター・ホワイトカップケーキ',
                'price' => 480,
                'description' => '香り高いバニラビーンズを使用した、真っ白なクリームのカップケーキ。星型のトッピングを添えた、シンプルながら上品な味わいです。',
                'menu_image' => 'menu/CupcakeStar.webp',
            ],
            [
                'category_id' => $dessert->id,
                'name' => 'ギャラクシー・ブルーベリーカップケーキ',
                'price' => 520,
                'description' => '夜空のような鮮やかなブルーのバニラクリームをあしらった、フォトジェニックな一品。ほんのりブルーベリーの風味が香る不思議なスイーツです。',
                'menu_image' => 'menu/CupcakeStar2.webp',
            ],
            [
                'category_id' => $dessert->id,
                'name' => 'カラフル・バラエティドーナツ（4Pセット）',
                'price' => 1100,
                'description' => 'チョコやベリーなど、色とりどりのコーティングを施したドーナツ4種セット。手土産やパーティーのデザートに最適な、お得なパックです。',
                'menu_image' => 'menu/Donatu.webp',
            ],
            [
                'category_id' => $dessert->id,
                'name' => '甘酸っぱいベリーのデコレーションドーナツ',
                'price' => 420,
                'description' => 'ふわふわのドーナツをストロベリーチョコでコーティングし、フレッシュなベリーとベリーソースで華やかに仕上げました。見た目も可愛い、甘酸っぱい一品です。',
                'menu_image' => 'menu/berry.webp',
            ],
            [
                'category_id' => $dessert->id,
                'name' => 'スノー・ホワイトドーナツ',
                'price' => 380,
                'description' => '粉雪のようなシュガーパウダーをまとう、シンプルながらもミルクのコクがしっかり感じられるドーナツです。',
                'menu_image' => 'menu/RoundDonut.webp',
            ],
            [
                'category_id' => $dessert->id,
                'name' => 'ひとくちチョコドーナツ・ボックス（6P）',
                'price' => 600,
                'description' => 'パリッとしたチョココーティングを施した、食べやすいサイズのミニドーナツ6個セット。みんなでシェアしたり、コーヒーのお供にしたりするのにぴったりです。',
                'menu_image' => 'menu/SetDonut.webp',
            ],
            [
                'category_id' => $dessert->id,
                'name' => '厚焼きふわふわパンケーキ（メープル＆ベリー）',
                'price' => 950,
                'description' => 'じっくり焼き上げた厚みのあるパンケーキに、たっぷりのベリーとメープルシロップを添えて。外はこんがり、中はしっとりとした食感が楽しめます。',
                'menu_image' => 'menu/ponkeck.webp',
            ],

            [
                'category_id' => $dessert->id,
                'name' => 'チョコチップカントリークッキー（3枚入）',
                'price' => 350,
                'description' => '大粒のチョコチップを練り込んだ、しっとり食感のクッキー。お食事後のコーヒータイムや、ちょっとしたおやつにぴったりです。',
                'menu_image' => 'menu/cookie.webp',
            ],
            // [
            //     'category_id' => $drink->id,
            //     'name' => '',
            //     'price' => 580,
            //     'description' => '',
            //     'menu_image' => '',
            // ],
            
        ];

        foreach ($menus as $menu){
            Menu::create($menu);
        }
    }
}
