import React, { useEffect, useState } from 'react';

import Header from './components/Header/Header';
import Introduction from './components/Introduction/Introduction';

function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => {
        setBackendData(data);
      })
      .catch((err) => console.log(err));
  }, []); // Empty array to run only once

  return (
    <div>
      <Header />
      <Introduction />
      
    </div>
  );
}

export default App;
