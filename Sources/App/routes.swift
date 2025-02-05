import Vapor

func routes(_ app: Application) throws {
    app.get { req in
        return "Hello, Vapor!"
    }

    // WebSocketのルート設定
    app.webSocket("weather") { req, ws in
        print("📡 WebSocket クライアントが接続しました！")

        ws.onText { ws, text in
            print("📩 受信: \(text)")
            ws.send("✅ 受信成功: \(text)")
        }
    }
}