import CustomImage from '@/components_fbl/globalComponents/CustomImage/CustomImage';
import { Box, List, ListItem, keyframes } from '@mui/material';
import { useEffect, useRef } from 'react';

const slideImages = keyframes`
to {
    transform: translate(calc(-50% - 0.5rem));
  }`;

function InfiniteScroll({ edTechData }) {
  const logoRef = useRef(new Array());
  const boxRef = useRef(null);
  const listRef = useRef(null);

  const addAnimation = function (boxRef, listRef) {
    const container = new Array(boxRef);

    container.forEach(item => {
      item.current.setAttribute('data-animated', true);
      const scrollContent = Array.from(listRef.current.children);

      scrollContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute('aria-hidden', true);
        listRef.current.appendChild(duplicatedItem);
      });
    });
  };

  useEffect(() => {
    addAnimation(boxRef, listRef);
  }, []);

  return (
    <Box
      ref={boxRef}
      className="hello"
      sx={{
        maxWidth: '600px',

        mt: 2,
        overflow: 'hidden',
      }}
    >
      <List
        ref={listRef}
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 'max-content',
          wrap: 'nowrap',
          gap: '1rem',
          animation: `${slideImages} 50s forwards infinite linear`,
        }}
      >
        {edTechData.map((googleLogo, i) => (
          <ListItem
            key={googleLogo.id}
            sx={{ padding: '0' }}
            ref={googleLogo => (logoRef.current[i] = googleLogo)}
          >
            <CustomImage
              src={googleLogo.logo}
              aspectRatio="2/1"
              width="120px"
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default InfiniteScroll;
