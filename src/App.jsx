import { useState, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import Dashboard from "./Components/Dashboard";
import "leaflet/dist/leaflet.css";
import "./App.css";

function App() {
  const [stations, setStations] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      "/api/v2/aqx_p_432?api_key=218c35f1-d697-447c-927f-677ea69efa8f&limit=1000&sort=ImportDate%20desc&format=JSON",
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStations(Array.isArray(data) ? data : (data.records ?? [])); // 用 isArray 判斷資料格式，防噴錯，陣列或是物件，加上例外處理。
      });
  }, []);

  function getColor(aqi) {
    const value = Number(aqi);
    if (value <= 50) return "#00e400";
    if (value <= 100) return "#ffff00";
    if (value <= 150) return "#ff7e00";
    if (value <= 200) return "#ff0000";
    return "#7e0023";
  }

  const filtered = stations.filter(
    (item) => item.sitename.includes(search) || item.county.includes(search),
  );

  return (
    <div>
      <h1 className="text-blue-500">空氣品質地圖</h1>
    
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="搜尋測站或縣市"
      />
  <Dashboard />

      <MapContainer center={[23.5, 121]} zoom={10} style={{ height: "100vh" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filtered.map((item) => (
          <CircleMarker
            key={item.siteid}
            center={[item.latitude, item.longitude]}
            radius={10}
            fillColor={getColor(item.aqi)}
            color="#333"
            weight={1}
          >
            <Popup>
              {item.sitename}
              <br />
              AQI: {item.aqi}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
