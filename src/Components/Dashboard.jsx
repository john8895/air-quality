import { useEffect, useState } from "react";

function Dashboard() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //success
        console.log(position.coords);
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

  return (
    <div>
          <p>目前天氣儀表盤</p>
              {location && (
                  <p>緯度：{location.latitude}，經度：{location.longitude}</p>
              )}
    </div>
  );
}

export default Dashboard;
