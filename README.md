# 店舗から届けるInstagram研修

「今日、このお店に行く理由」をつくるSNS発信をテーマにした、ブラウザ表示型の社内研修資料です。

- PCでは1画面ずつ進むプレゼンテーションとして使用
- スマートフォンでは縦スクロールのマニュアルとして閲覧
- 外部API・外部画像なしで動作する静的サイト
- 全17セクション、約30分想定

## 技術構成

- Vite
- React
- TypeScript
- Tailwind CSS
- Motion for React
- lucide-react

## 起動方法

```bash
npm install
npm run dev
```

ターミナルに表示されるローカルURLをブラウザで開いてください。

## ビルド方法

```bash
npm run build
```

ビルド結果は `dist/` に出力されます。ローカルで本番ビルドを確認する場合は次を実行します。

```bash
npm run preview
```

## 資料本文の修正場所

研修本文、章名、各セクションの説明、カード、講師メモは以下にまとめています。

```text
src/data/training.ts
```

UIやレイアウトは主に以下です。

```text
src/App.tsx
src/components/
src/styles/globals.css
```

## 画像を差し替える場合

画像用の格納先として以下を用意しています。

```text
src/assets/
```

画像を追加した場合は、対象コンポーネントまたは `src/App.tsx` からimportしてください。現在は通信状況に左右されないよう、CSSとUIモックだけで成立する構成です。

## 発表時の使い方

1. PCブラウザで開く
2. 上部の「発表」を選ぶ
3. 右下の「次へ」「戻る」、またはキーボードの左右キーで移動
4. 必要に応じて右上の全画面ボタンを使用
5. 目次ボタンから任意のセクションへ移動
6. 各ページ下部の「講師メモを表示」で補足を確認

キーボード操作：

- `→` / `PageDown` / `Space`：次へ
- `←` / `PageUp`：戻る
- `Home`：最初へ
- `End`：最後へ

スマートフォンでは自動的に縦スクロール型の閲覧モードになります。

## 印刷・PDF出力

ブラウザの印刷機能を使用してください。印刷時は操作ナビゲーションと講師メモが非表示になり、各セクションが改ページされます。PDFとして保存すると配布用資料として利用できます。

## Vercelで公開する場合

1. このフォルダをGitHubリポジトリへpush
2. Vercelで「Add New Project」を選択
3. GitHubリポジトリを選択
4. Framework Presetは通常Viteとして自動認識
5. Build Command：`npm run build`
6. Output Directory：`dist`
7. Deployを実行

静的サイトなので、NetlifyやGitHub Pagesなどにも公開できます。
