const logElement = document.getElementById("log");

function logMessage(message) {
    logElement.innerHTML += `<div>${message}</div>`;
    logElement.scrollTop = logElement.scrollHeight;
}

// WebSocketの設定
const socket = new WebSocket("ws://192.168.1.19:8080/weather");

socket.onopen = () => {
    document.getElementById("wsStatus").textContent = "🟢 接続済み";
    logMessage("✅ WebSocket に接続成功！");
};

socket.onmessage = (event) => {
    logMessage(`📬 受信: ${event.data}`);
};

socket.onerror = (error) => {
    logMessage("❌ WebSocket エラー: " + error);
};

socket.onclose = () => {
    document.getElementById("wsStatus").textContent = "🔴 切断";
    logMessage("🔌 WebSocket 接続が閉じられました");
};

// APIキーの読み込み
if (typeof config === "undefined" || !config.OPENWEATHER_API_KEY) {
    console.error("❌ config.js が読み込まれていないか、APIキーが設定されていません！");
} else {
    document.getElementById("fetchWeather").addEventListener("click", async () => {
        logMessage("📡 天気データを取得中...");

        const apiKey = config.OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=${apiKey}&units=metric&lang=ja`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(`🌩️ APIエラー: ${data.message}`);
            }

            const weatherText = `🌡 気温: ${data.main.temp}°C\n☁️ 天候: ${data.weather[0].description}\n💧 湿度: ${data.main.humidity}%`;

            logMessage("🌤 天気情報取得: " + weatherText);
            sessionStorage.setItem("weatherData", weatherText);
        } catch (error) {
            logMessage(`❌ 天気データ取得に失敗: ${error.message}`);
        }
    });
}

// WebSocketでカレンダーに天気情報を登録
document.getElementById("addToCalendar").addEventListener("click", () => {
    const weatherData = sessionStorage.getItem("weatherData") || "☀️ 今日の天気は晴れ";
    logMessage("📡 WebSocket で天気情報を送信: " + weatherData);
    socket.send(JSON.stringify({ weather: weatherData }));
});

// iOSショートカットを呼び出してカレンダーに登録
document.getElementById("triggerShortcut").addEventListener("click", () => {
    const weatherData = sessionStorage.getItem("weatherData") || "☀️ 今日の天気は晴れ";

    const encodedWeather = encodeURIComponent(weatherData);
    const shortcutURL = `shortcuts://run-shortcut?name=カレンダーに天気予報を追加&input=${encodedWeather}`;

    console.log("🔗 ショートカットのURL:", shortcutURL);

    window.location.href = shortcutURL;
});