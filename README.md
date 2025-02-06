# weather_to_calendar

Google の拡張機能を使って Mac のデフォルトカレンダーに天気を追加するアプリ

## どんなアプリ

このプロジェクトは、Chrome 拡張機能 × Swift（Vapor） を使って、
天気予報を取得し、Mac のデフォルトカレンダーに自動登録 するシンプルなアプリです！

## 仕組み

・Chrome 拡張機能 → WebSocket を使って Swift アプリに天気予報を送信
・Swift（Vapor）サーバー → WebSocket を受信し、カレンダーに登録

## インストール手順

### 1️. リポジトリをクローン

```bash
git clone https://github.com/maasamatumoto/weather_to_calendar.git
cd weather_to_calendar
```

## API キーの取得方法

このプロジェクトは OpenWeather API を使用して天気を取得します。

1. OpenWeather に登録し、API キーを取得
2. Public/config.js を作成（Git に含まれないため手動で作成）
3. config.js に API キーを設定

設定例

```bash
const config = {
    OPENWEATHER_API_KEY: "ここにAPIキーを入力"
};
```

※.gitignore に追加済みなので、API キーが外部に漏れません

### 2️. Swift（Vapor）サーバーのセットアップ

```bash
swift package update
swift build
swift run SwiftWebSocketExec
```

→ ローカルサーバーが起動！ → http://127.0.0.1:8080/ にアクセス

## Chrome 拡張機能のインストール

1. ChromeExtension フォルダを開く
2. Chrome の「拡張機能」ページを開き、デベロッパーモードを有効化
3. [パッケージ化されていない拡張機能を読み込む] をクリック
4. ChromeExtension フォルダを選択

→ 拡張機能のボタンを押すだけで、天気がカレンダーに登録される

## 使い方

1. SwiftWebSocketExec を起動
2. 拡張機能の「天気を取得」ボタンをクリック
3. 「カレンダーに登録」ボタンをクリック
4. Mac のカレンダーを開くと、天気情報が登録される

## Ver1.2 以降の予定（アップデート予定機能）

1. 他の都市の天気も選択できるようにする

## スマホからでも動きます（現在はローカルのみ）

### サーバーを起動

```bash
swift run SwiftWebSocketExec serve
```

→ http://0.0.0.0:8080 でサーバーが起動していることを確認。

### PC のローカル IP を確認

```bash
ifconfig | grep "inet "  # macOS

ipconfig getifaddr en0   # macOS（Wi-Fi使用時）
```

→ 例えば 192.168.1.19 のような IP が出てきたら、それをスマホで使う。

### スマホのブラウザでアクセス

http://ここは PC のローカル IP:8080

→WebSocket の接続が「🟢 接続済み」になることを確認

## PWA としてホーム画面に追加する場合

•iPhone: Safari の「共有」ボタン → 「ホーム画面に追加」

•Android: Chrome の「⋮ メニュー」→「アプリをインストール」

## トラブルシューティング

### サーバーが起動しない

→swift run の前に

```bash
swift package clean && swift build
```

### スマホからアクセスできない

→IP を再確認 ifconfig / ファイアウォールをチェック sudo pfctl -d

### WebSocket が切断される

→ ネットワークが安定しているか確認（Wi-Fi 切り替えなど）

## ライセンス

This project is licensed under the MIT License - see the LICENSE file for details.
