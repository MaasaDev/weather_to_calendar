import Vapor

public func configure(_ app: Application) throws {
    // 外部アクセスを許可
    app.http.server.configuration.hostname = "0.0.0.0"
    app.http.server.configuration.port = 8080

    // ルート設定を読み込む
    try routes(app)
}