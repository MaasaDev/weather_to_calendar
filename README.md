# weather_to_calendar 

Googleの拡張機能を使ってMacのデフォルトカレンダーに天気を追加するアプリ

## どんなアプリ 
このプロジェクトは、Chrome拡張機能 × Swift（Vapor） を使って、
天気予報を取得し、Macのデフォルトカレンダーに自動登録 するシンプルなアプリです！

## 仕組み
・Chrome拡張機能 → WebSocket を使って Swift アプリに天気予報を送信
・Swift（Vapor）サーバー → WebSocket を受信し、カレンダーに登録

## インストール手順
### 1️. リポジトリをクローン
```bash
git clone https://github.com/maasamatumoto/weather_to_calendar.git
cd weather_to_calendar
```

### 2️. Swift（Vapor）サーバーのセットアップ
```bash
swift package update
swift build
swift run SwiftWebSocketExec
```
→ローカルサーバーが起動！ → http://127.0.0.1:8080/ にアクセス

## Chrome拡張機能のインストール
1.	ChromeExtension フォルダを開く
2.	Chromeの「拡張機能」ページを開き、デベロッパーモードを有効化
3.	[パッケージ化されていない拡張機能を読み込む] をクリック
4.	ChromeExtension フォルダを選択

→拡張機能のボタンを押すだけで、天気がカレンダーに登録される

## 使い方
1.	SwiftWebSocketExec を起動
2.	拡張機能の「天気を取得」ボタンをクリック
3.	「カレンダーに登録」ボタンをクリック
4.	Macのカレンダーを開くと、天気情報が登録される

## Ver1.2 以降の予定（アップデート予定機能）
1.	他の都市の天気も選択できるようにする

## スマホからでも動きます（現在はローカルのみ）
### サーバーを起動
```bash
swift run SwiftWebSocketExec serve
```

→ http://0.0.0.0:8080 でサーバーが起動していることを確認。

### PCのローカルIPを確認
```bash
ifconfig | grep "inet "  # macOS
ipconfig getifaddr en0   # macOS（Wi-Fi使用時）
```
→ 例えば 192.168.1.19 のようなIPが出てきたら、それをスマホで使う。

### スマホのブラウザでアクセス
http://ここはPCのローカルIP:8080

→WebSocketの接続が「🟢 接続済み」になることを確認

## PWAとしてホーム画面に追加する場合
•iPhone: Safariの「共有」ボタン → 「ホーム画面に追加」

•Android: Chromeの「⋮メニュー」→「アプリをインストール」

## トラブルシューティング
### サーバーが起動しない
→swift run の前に
```bash
swift package clean && swift build
```

### スマホからアクセスできない
 →IPを再確認 ifconfig / ファイアウォールをチェック sudo pfctl -d

### WebSocketが切断される
 →ネットワークが安定しているか確認（Wi-Fi切り替えなど）


## ライセンス
This project is licensed under the MIT License - see the LICENSE file for details.