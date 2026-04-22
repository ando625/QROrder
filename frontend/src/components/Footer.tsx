export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-500 py-10 px-6 mt-5">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          <div>
            <h3 className="text-zinc-100 font-black text-xl tracking-tighter uppercase mb-2">
              Digital Menu
            </h3>
          </div>

          <div className="flex flex-col md:items-end gap-4">
            {/* クレジット部分 */}
            <div className="max-w-screen-md mx-auto text-center text-xs text-zinc-500 leading-relaxed mt-2">
              <p className="text-[10px] sm:text-xs leading-tight">
                このサイトで使用している画像素材は{" "}
                <a
                  href="https://jp.freepik.com/"
                  target="_blank"
                  rel="noopener"
                  className="text-white hover:underline"
                >
                  Freepik
                </a>{" "}
                提供のものです。
              </p>
              <p className="text-[9px] sm:text-[10px] text-zinc-400 mt-1 opacity-80">
                Images used in this site are from{" "}
                <a
                  href="https://jp.freepik.com/"
                  target="_blank"
                  rel="noopener"
                  className="text-white hover:underline"
                >
                  Freepik
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        
      </div>
    </footer>
  );
}
