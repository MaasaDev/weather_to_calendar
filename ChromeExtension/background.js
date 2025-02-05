console.log("🌍 WebSocket に接続開始...");

const socket = new WebSocket("ws://localhost:8080/weather");

socket.onopen = () => {
    console.log("✅ WebSocket に接続成功！");
};

socket.onmessage = (event) => {
    console.log("📬 サーバーからのレスポンス:", event.data);
};

socket.onerror = (error) => {
    console.error("❌ WebSocket エラー:", error);
};

socket.onclose = () => {
    console.log("🔌 WebSocket 接続が閉じられました");
};

// 天気情報を取得 & WebSocket で送信
async function fetchWeather() {
    console.log("🌍 `fetchWeather()` を実行");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=3594d9eb9b4ef2e14d3fc3adcdd54a38&units=metric&lang=ja`;

    try {
        console.log("📡 `fetch()` を実行する直前");
        const response = await fetch(url);

        console.log("🌤 `fetch()` のレスポンスを受け取った！", response);

        if (!response.ok) {
            throw new Error(`HTTPエラー: ${response.status}`);
        }

        const data = await response.json();
        console.log("🌤 天気APIレスポンス:", data);

        if (!data.weather || !Array.isArray(data.weather) || data.weather.length === 0) {
            throw new Error("天気データが取得できませんでした！");
        }

        const weatherText = `🌡 気温: ${data.main.temp}°C\n☁️ 天候: ${data.weather[0].description}\n💧 湿度: ${data.main.humidity}%`;

        console.log("📡 WebSocket で天気情報を送信:", weatherText);

        // WebSocket 経由で送信
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ weather: weatherText }));
        } else {
            console.error("❌ WebSocket が接続されていません");
        }

        return weatherText;
    } catch (error) {
        console.error("❌ 天気情報の取得に失敗:", error);
        return "天気情報の取得に失敗しました";
    }
}

// メッセージを受信したら天気情報を取得 & 送信
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("📩 `onMessage` にリクエストが来ました！", message);

    if (message.action === "getWeather") {
        console.log("🌍 `fetchWeather()` を実行します...");

        fetchWeather().then((weather) => {
            console.log("📡 `background.js` から `popup.js` に送信:", weather);
            sendResponse({ status: "success", message: weather });
        });

        return true; // 非同期のため `true` を返す
    }
});