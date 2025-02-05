import Foundation
import EventKit
import Vapor

let app = Application()

app.http.server.configuration.hostname = "0.0.0.0"
app.http.server.configuration.port = 8080 

app.middleware.use(FileMiddleware(publicDirectory: app.directory.publicDirectory))
app.get { req in
    req.fileio.streamFile(at: app.directory.publicDirectory + "index.html")
}

app.get("favicon.ico") { req in
    req.fileio.streamFile(at: app.directory.publicDirectory + "favicon.ico")
}

// `/weather` に WebSocket 接続
app.webSocket("weather") { req, ws in
    print("📡 WebSocket クライアントが接続しました！")

    ws.onText { ws, text in
        print("📩 受信したメッセージ: \(text)")

        // JSON デコード
        if let data = text.data(using: .utf8),
           let json = try? JSONSerialization.jsonObject(with: data, options: []) as? [String: String],
           let weather = json["weather"] {
            print("📅 受信した天気情報: \(weather)")
            addEventToCalendar(eventTitle: weather)

            ws.send("✅ カレンダーに登録完了: \(weather)")
        } else {
            ws.send("❌ 無効なデータ")
        }
    }
}

// 📌 カレンダーに登録する関数
func addEventToCalendar(eventTitle: String) {
    let eventStore = EKEventStore()
    eventStore.requestAccess(to: .event) { (granted, error) in
        if granted {
            let event = EKEvent(eventStore: eventStore)
            event.title = eventTitle
            event.startDate = Date()
            event.endDate = event.startDate.addingTimeInterval(3600) // 1時間後
            event.calendar = eventStore.defaultCalendarForNewEvents

            do {
                try eventStore.save(event, span: .thisEvent)
                print("✅ カレンダーにイベントを追加しました: \(eventTitle)")
            } catch {
                print("❌ カレンダー追加に失敗: \(error.localizedDescription)")
            }
        } else {
            print("❌ カレンダーアクセスが拒否されました")
        }
    }
}

func routes(_ app: Application) throws {
    app.get { req in
        return "Hello, Vapor!"
    }
}

// サーバーを起動
try app.run()