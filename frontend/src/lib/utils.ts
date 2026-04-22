/**
 * 画像のフルパスを取得する便利な関数
 * * コンピュータへの命令：
 * 「画像の名前を受け取ったら、バックエンドの住所と合体させて返してね！」
 */
export const getImageUrl = (path: string | null): string => {
  // 1. もし画像名が空っぽ（null）だったら
  if (!path) {
    // 「画像がありません」という文字（または代わりの画像パス）を返します
    return "";
  }

  // 2. 住所録（.env.local）に書いた「http://localhost:8080」を呼び出す
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  // 3. 全てをガッチャンコして、ブラウザが理解できるURLを完成
  // 訳：「住所」＋「/storage/menu/」＋「画像の名前」
  return `${baseUrl}/storage/${path}`;
};
