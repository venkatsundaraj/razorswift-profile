import { useState } from 'react';

const useReadMore = (data, initialDisplayCount = 5, increment = 5) => {
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  // useEffect(() => {
  //   setDisplayCount(initialDisplayCount);
  // }, [data]);

  const handleReadMoreClick = () => {
    if (displayCount + increment >= data.length) {
      setDisplayCount(data.length);
    } else {
      setDisplayCount(displayCount + increment);
    }
  };

  const handleReadLessClick = () => {
    setDisplayCount(initialDisplayCount);
  };

  const displayData = data.slice(0, displayCount);
  const showMoreButton = data.length > 5 && displayCount < data.length;
  const showReadLessButton = data.length > 5 && displayCount === data.length;

  return {
    displayData,
    handleReadMoreClick,
    handleReadLessClick,
    displayCount,
    showMoreButton,
    showReadLessButton,
  };
};
export default useReadMore;
