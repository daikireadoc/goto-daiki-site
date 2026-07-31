# GOTO DAIKI Website Prototype

## 見方
`index.html` をブラウザで開いてください。

ただし、BEST OF MISSセクションの「スポンサー詳細」モーダルはPDFを`iframe`で表示する仕様のため、
`index.html` を `file://` で直接開くとブラウザによっては
「PDFドキュメントを読み込めませんでした」と表示されることがあります。
その場合は、下記の「ローカルサーバーでの確認方法」を使ってください。

## ローカルサーバーでの確認方法
1. ターミナル（Mac）を開く
2. `goto-daiki-site` フォルダに移動する
   ```bash
   cd path/to/goto-daiki-site
   ```
3. Python3のローカルサーバーを起動する
   ```bash
   python3 -m http.server 8000
   ```
4. ブラウザで以下のURLにアクセスする
   ```
   http://localhost:8000
   ```
5. 終了する場合はターミナルで `Control + C` を押す

## 公開前に変更する場所
1. `YOUR PHOTO` を本人写真に変更
2. Instagramリンクの `href="#"` を変更
3. Xリンクの `href="#"` を変更
4. `yourmail@example.com` を実際のメールアドレスに変更
5. 制作実績の内容を実案件に変更

## 料金
- 初期費用：10,000円
- 月額：20,000円
- 年間契約
