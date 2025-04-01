import { useEffect } from 'react'
import Map from './Map'

function App() {
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/api/satellites');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  return (
    <Map />
  )
}

export default App
