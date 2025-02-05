# weather_to_calendar 

Googleの拡張機能を使ってMacのデフォルトカレンダーに天気を追加するアプリ

## どんなアプリ 
このプロジェクトは、Chrome拡張機能 × Swift（Vapor） を使って、
天気予報を取得し、Macのデフォルトカレンダーに自動登録 するシンプルなアプリです！

---

## 仕組み
・Chrome拡張機能 → WebSocket を使って Swift アプリに天気予報を送信
・Swift（Vapor）サーバー → WebSocket を受信し、カレンダーに登録

---

## インストール手順
### 1️. リポジトリをクローン
```bash
git clone https://github.com/maasamatumoto/weather_to_calendar.git
cd weather_to_calendar

### 2️. Swift（Vapor）サーバーのセットアップ
```bash
swift package update
swift build
swift run SwiftWebSocketExec

## ローカルサーバーが起動！ → http://127.0.0.1:8080/ にアクセス

---

## Chrome拡張機能のインストール
	1.	ChromeExtension フォルダを開く
	2.	Chromeの「拡張機能」ページを開き、デベロッパーモードを有効化
	3.	[パッケージ化されていない拡張機能を読み込む] をクリック
	4.	ChromeExtension フォルダを選択

## 拡張機能のボタンを押すだけで、天気がカレンダーに登録される

---

## 使い方
	1.	SwiftWebSocketExec を起動
	2.	拡張機能の「天気を取得」ボタンをクリック
	3.	「カレンダーに登録」ボタンをクリック
	4.	Macのカレンダーを開くと、天気情報が登録されている！

---

## Ver1.2 以降の予定（アップデート予定機能）
✅ 他の都市の天気も選択できるようにする
✅ 天気の自動登録機能を追加（定時で更新)
✅ PWA 化してスマホからも登録できるようにする

---

## ライセンス
This project is licensed under the MIT License - see the LICENSE file for details.