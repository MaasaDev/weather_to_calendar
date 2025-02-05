        const logElement = document.getElementById("log");
        function logMessage(message) {
            logElement.innerHTML += `<div>${message}</div>`;
            logElement.scrollTop = logElement.scrollHeight;
        }

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

        document.getElementById("fetchWeather").addEventListener("click", async () => {
            logMessage("📡 天気データを取得中...");
            const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=3594d9eb9b4ef2e14d3fc3adcdd54a38&units=metric&lang=ja");
            const data = await response.json();
            const weatherText = `🌡 気温: ${data.main.temp}°C\n☁️ 天候: ${data.weather[0].description}\n💧 湿度: ${data.main.humidity}%`;
            logMessage("🌤 天気情報取得: " + weatherText);
            sessionStorage.setItem("weatherData", weatherText);
        });

        document.getElementById("addToCalendar").addEventListener("click", () => {
            const weatherData = sessionStorage.getItem("weatherData") || "☀️ 今日の天気は晴れ";
            logMessage("📡 WebSocket で天気情報を送信: " + weatherData);
            socket.send(JSON.stringify({ weather: weatherData }));
        });
        document.getElementById("triggerShortcut").addEventListener("click", () => {
            // 取得済みの天気データ
            const weatherData = sessionStorage.getItem("weatherData") || "☀️ 今日の天気は晴れ";
        
            // URLエンコード（ショートカットに渡すため）
            const encodedWeather = encodeURIComponent(weatherData);
        
            // iOS ショートカットを起動するURLスキーム
            const shortcutURL = `shortcuts://run-shortcut?name=カレンダーに天気予報を追加&input=${encodedWeather}`;
        
            // URLをデバッグ用に出力
            console.log("🔗 ショートカットのURL:", shortcutURL);
        
            // ショートカットを起動
            window.location.href = shortcutURL;
        });