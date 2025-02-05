import Foundation
import EventKit
print("🚀 グローバル main.swift が実行された！")
// 標準入力からメッセージを受け取る
func readMessage() -> String? {
    let input = FileHandle.standardInput
    let data = input.availableData
    if data.isEmpty {
        print("🔍 標準入力は空")
        return nil
    }
    let message = String(data: data, encoding: .utf8)
    print("📩 受信したメッセージ: \(message ?? "デコード失敗")")
    return message
}

// カレンダーに予定を追加
func addEventToCalendar(eventTitle: String) {
    let eventStore = EKEventStore()
    eventStore.requestAccess(to: .event) { (granted, error) in
        if granted {
            let event = EKEvent(eventStore: eventStore)
            event.title = eventTitle
            event.startDate = Date()
            event.endDate = event.startDate.addingTimeInterval(3600) // 1時間後
            event.calendar = eventStore.defaultCalendarForNewEvents

            if #available(macOS 10.14, *) {
                do {
                    try eventStore.save(event, span: .thisEvent)
                    print("✅ カレンダーにイベントを追加した！")
                } catch {
                    print("❌ イベントの保存に失敗: \(error.localizedDescription)")
                }
            } else {
                print("❌ macOS 10.14 未満ではカレンダーに追加できません")
            }
        } else {
            print("❌ カレンダーへのアクセスが拒否された")
        }
    }
}

// メッセージを受信して処理
if let jsonString = readMessage(), let data = jsonString.data(using: .utf8) {
    if let json = try? JSONSerialization.jsonObject(with: data, options: []) as? [String: String],
       let weather = json["weather"] {
        print("📅 受信した天気情報: \(weather)")
        addEventToCalendar(eventTitle: weather)
    }
}

RunLoop.main.run(until: Date(timeIntervalSinceNow: 5))