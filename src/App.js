import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

import './App.css';

function App() {
  const [champs, setChamps] = useState([]);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(500);

  useEffect(() => {
    fetch('https://www.googleapis.com/drive/v3/files/1rlN0cflIZhXQ2GJLlAcXn428CYbQ9ueFXdlrLU2DUWs/export?' + new URLSearchParams({
      mimeType: 'text/plain',
      key: 'AIzaSyDfkIvk631ATHEH0odYQalThQZiydZRYio'
    }), {
      method: 'GET',
    }).then((response) => {
      return response.text();
    }).then((data) => {
      setChamps(data.split('\n'));
    });

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleResize = () => {
    const { innerWidth: w, innerHeight: h } = window;
    setWidth(w);
    setHeight(h);
  };

  return (
    <div className="App">
      <Plot 
        data={[
          {
            x: champs,
            type: 'histogram',
          }
        ]}
        layout={
          {
            title: 'ARAM Champion Appearance Frequency',
            showlegend: false,
            width: width,
            height: height,
            xaxis: {
              categoryorder: 'total descending'
            }
          }      
        }
      />
    </div>
  );
}

export default App;
