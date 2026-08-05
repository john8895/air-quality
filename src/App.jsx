import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [stations, setStations] = useState([])

  useEffect(() => {
    fetch('https://data.moenv.gov.tw/api/v2/aqx_p_432?api_key=e8dd42e6-9b8b-43f8-991e-b3dee723a52d&limit=1000&sort=ImportDate%20desc&format=JSON')
      .then(res => res.json())
      .then(data => { console.log(data) })
  }, [])

  return (
    <div>
      <h1>空氣品質地圖</h1>
    </div>
  )
}

export default App
