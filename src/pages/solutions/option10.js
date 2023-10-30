import { useRouter } from 'next/router';
import { useState } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [counter, setCounter] = useState(120);
  const router = useRouter();

  const handleClickEffect = () => {
    const startTime = Date.now(); // get the start time in milliseconds
    const interval = setInterval(() => {
      fetch('/api/values')
        .then(response => response.json())
        .then(data => {
          console.log('data values', data.value);
          const elapsedTime = Date.now() - startTime;
          console.log('eslapnsed time', elapsedTime); // calculate elapsed time
          if (elapsedTime >= 60000 || data.value == 100) {
            // check elapsed time and data value
            console.log('end');
            clearInterval(interval);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }, 5 * 1000);
  };

  return (
    <div>
      <button onClick={handleClickEffect}>Start interval</button>
    </div>
  );
}

export default MyComponent;
