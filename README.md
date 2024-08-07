# Weather Dashboard

![專案封面圖](https://firebasestorage.googleapis.com/v0/b/imagestorge-b6395.appspot.com/o/WeatherDashboard%2FweatherDashboard-5.png?alt=media&token=cb7f17c0-0dc3-48a9-9715-37267a915c29)

- [專案位置] (http://weatherboard.chun-chia.name/)
- [GitHub ](https://github.com/a121515222/weatherDashboard)

## Weather Dashboard

這是一個天氣預報顯示板，主要使用 Vue 與 tailwind CSS 製作。
主要的功能有以下

### 搜尋輸入城市的天氣

主版會顯示氣溫、天氣、風速、濕度、城市名稱，並且背景顏色會根據天氣變化。
![搜尋結果](https://firebasestorage.googleapis.com/v0/b/imagestorge-b6395.appspot.com/o/WeatherDashboard%2FweatherDashboard-5.png?alt=media&token=cb7f17c0-0dc3-48a9-9715-37267a915c29)

### AutoComplete 功能可以選擇城市

在輸入部分的城市名稱之後，會出現可選的城市

![AutoComplete](https://firebasestorage.googleapis.com/v0/b/imagestorge-b6395.appspot.com/o/WeatherDashboard%2FweatherDashboard-6.png?alt=media&token=f39ccd73-c166-4cfc-89f7-f0a9999d91f1)

### 找不到城市通知

![通知](https://firebasestorage.googleapis.com/v0/b/imagestorge-b6395.appspot.com/o/WeatherDashboard%2FweatherDashboard-3.png?alt=media&token=4da1fd70-cbd5-4f04-bb0b-2c129ad46ad5)

### 網路出錯通知

![通知](https://firebasestorage.googleapis.com/v0/b/imagestorge-b6395.appspot.com/o/WeatherDashboard%2FweatherDashboard-4.png?alt=media&token=c0cd4a27-0f57-4abd-aa92-1e4f2498e7cf)

## 專案內容

### 安裝套件

```bash
pnpm install
```

### 運行專案

```bash
pnpm run dev
```

### 運行 Unit Test

```
pnpm run test
```

### 開啟專案

在瀏覽器網址列輸入以下即可看到畫面

```bash
http://localhost:5173/
```

### 使用主要工具與套件

- Vite : 5.3.4
- Vue : 3.4.31
- Pinia : 2.1.7
- Tailwind CSS : 3.4.6
- Flowbite : 2.4.1
- Vitest : 2.0.3

### 天氣預報來源

https://open-meteo.com/

### 天氣情況圖來源

https://openweathermap.org/
