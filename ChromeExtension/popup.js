document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ popup.js 読み込み完了");

    const button = document.getElementById("fetchWeather");
    if (button) {
        button.addEventListener("click", () => {
            console.log("🖱 ボタンがクリックされた！");

            const socket = new WebSocket("ws://localhost:8080/weather");

            socket.onopen = () => {
                console.log("✅ WebSocket に接続成功！");
                const weatherData = JSON.stringify({ weather: "☀️ 今日の天気は晴れ" });
                console.log("📡 WebSocket で天気情報を送信:", weatherData);
                socket.send(weatherData);
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
        });
    }
});