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
      `/api/v2/aqx_p_432?api_key=${import.meta.env.VITE_API_KEY}&limit=1000&sort=ImportDate%20desc&format=JSON`,
    )
      .then((res) => res.json())
      .then((data) => {
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
      (
      <>
        <div className="min-h-screen bg-gray-100">
          <nav className="fixed top-0 w-full bg-white shadow-md z-50 px-6 py-4 flex justify-between items-center">
            <a href="/">
              <h1 className="text-xl font-bold text-blue-600">空氣品質地圖</h1>
            </a>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜尋測站或縣市"
              className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </nav>

          <main className="pt-20 px-6 pb-10">
            <Dashboard stations={stations} filtered={filtered} />
          </main>

          <MapContainer
            className="rounded-xl shadow"
            style={{ height: "400px" }}
            center={[23.5, 121]}
            zoom={10}
          >
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
      </>
      )
    </div>
  );
}

export default App;
