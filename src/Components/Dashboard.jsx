import { useEffect, useState } from "react";

function Dashboard({ stations, filtered }) {
  const [location, setLocation] = useState(null);

  // 取得API資料
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //success
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        //error
        console.log(error);
      },
    );
  }, []);

  function getDistance(lat1, lon1, lat2, lon2) {
    // 勾股定理算距离
    return Math.sqrt((lat1 - lat2) ** 2 + (lon1 - lon2) ** 2);
  }

  let nearestStation = null;
  let minDistance = Infinity;

  if (!location || stations.length === 0) {
    return <p>載入中…</p>;
  }

  stations.forEach((station) => {
    const d = getDistance(
      location.latitude,
      location.longitude,
      station.latitude,
      station.longitude,
    );
    if (d < minDistance) {
      minDistance = d;
      nearestStation = station;
    }
  });

  // 對應環保署的 6 個分級顏色，產背景色
  function getColor(aqi) {
    const value = Number(aqi);
    if (value <= 50) return "bg-green-400";
    if (value <= 100) return "bg-yellow-400";
    if (value <= 150) return "bg-orange-400";
    if (value <= 200) return "bg-red-500";
    return "bg-red-900";
  }

  //當 AQI 背景色太深時，文字要變白色，不然看不到
  function getTextColor(aqi) {
    const value = Number(aqi);
    return value > 150 ? "text-white" : "text-gray-800";
  }

  function getStatus(aqi) {
    const value = Number(aqi);
    if (value <= 50) return "良好";
    if (value <= 100) return "普通";
    if (value <= 150) return "敏感";
    if (value <= 200) return "不良";
    return "危險";
  }

  return (
    <>
      {nearestStation && (
        <>
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow p-5 text-center">
              <p className="text-sm text-gray-500 mb-1">最近測站</p>
              <p className="text-2xl font-bold text-gray-800">
                {nearestStation.sitename}
              </p>
            </div>

            <div className="bg-green-50 rounded-xl shadow p-5 text-center">
              <p className="text-sm text-gray-500 mb-1">AQI</p>
              <p className="text-3xl font-bold text-green-600">
                {nearestStation.aqi}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-5 text-center">
              <p className="text-sm text-gray-500 mb-1">狀態</p>
              <p className="text-lg font-semibold text-green-600">
                {getStatus(nearestStation.aqi)}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-5 text-center">
              <p className="text-sm text-gray-500 mb-1">更新時間</p>
              <p className="text-lg font-semibold text-gray-800">
                {nearestStation.publishtime.slice(5, 16)}
              </p>
            </div>
          </section>
          <h2 className="text-lg font-bold text-gray-700 mb-4">
            {filtered.length === stations.length
              ? `所有測站 (${stations.length} 筆，顯示前 10 筆)`
              : `搜尋結果 (${filtered.length} 筆)`}
          </h2>
          <div className="space-y-3">
            {filtered.slice(0, 10).map((item) => (
              <div
                className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:shadow-lg hover:scale-[1.01] transition-all duration-200"
                key={item.siteid}
              >
                <div>
                  <p className="font-bold text-gray-800">{item.sitename}</p>
                  <p className="text-sm text-gray-500">{item.county}</p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full font-bold text-sm ${getColor(item.aqi)} ${getTextColor(item.aqi)}`}
                >
                  AQI {item.aqi}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
