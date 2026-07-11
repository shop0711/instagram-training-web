# 店舗から届けるInstagram研修

実際の店舗Instagramスクリーンショットを教材化した、Webプレゼン型の社内研修資料です。

- PCでは1画面ずつ進む発表資料として使用
- スマートフォンでは縦スクロールで復習
- 発表モード / 閲覧モードを切り替え
- 全17セクション、講師メモ、投稿前チェックリスト、印刷CSSを搭載

## 技術構成

- Vite
- React
- TypeScript
- Tailwind CSS
- Motion for React
- lucide-react
- sharp

## 起動方法

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```

ビルド結果は `dist/` に出力されます。ローカルで本番ビルドを確認する場合は次を実行します。

```bash
npm run preview
```

## 画像素材の運用

実スクリーンショットの元素材は次に配置します。

```text
tools/source-assets/
```

このフォルダは容量が大きい元素材置き場のため、Git管理や本番公開には含めません。`.gitignore` の対象です。

Webサイトで読み込む軽量画像は、次に生成されます。

```text
public/assets/processed/
```

画像を追加・差し替えた場合は、ローカルで次を実行してください。

```bash
npm run assets:build
```

`assets:build` は `tools/source-assets` 内のPNG/JPGをWebPへ変換し、通常表示用、サムネイル用、投稿トリミング用の画像を生成します。

Vercel公開時は `public/assets/processed/` の画像が必要です。`tools/source-assets` が存在しなくても、processed画像があれば `npm run build` は成功する構成です。

## 画像マニフェスト

使用画像の分類と参照先は次に集約しています。

```text
src/data/assetManifest.ts
```

各画像について、元ファイル名、processed画像パス、説明、店舗名、種別、ジャンル、使用予定セクション、alt、注釈ラベルを管理します。

## 主な編集箇所

研修本文、章タイトル、講師メモは主に次で編集します。

```text
src/data/training.ts
```

実スクショを使った図解・比較・スマホUI表現は主に次で編集します。

```text
src/components/RealAssetLessons.tsx
src/components/TrainingSlideVisual.tsx
```

全体レイアウトとレスポンシブ調整は次です。

```text
src/App.tsx
src/styles/globals.css
```

## 発表時の使い方

1. PCブラウザで開く
2. 右下の「発表」を選ぶ
3. 次へ / 戻る、またはキーボードの左右キーで移動
4. 必要に応じて全画面表示
5. 目次から任意のセクションへ移動
6. 各ページ下部の講師メモで補足を確認

キーボード操作:

- `ArrowRight` / `PageDown` / `Space`: 次へ
- `ArrowLeft` / `PageUp`: 戻る
- `Home`: 最初へ
- `End`: 最後へ

## Vercel公開

GitHubへpushすると、連携済みのVercelプロジェクトで通常どおりビルドできます。

- Build Command: `npm run build`
- Output Directory: `dist`
- 画像再生成はローカルで `npm run assets:build`
- Vercel上では `tools/source-assets` に依存しません
