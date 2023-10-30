import ProfileCard from '@/cardComponents/ProfileCard';
import CardSectionHeader from '@/headingComponents/ProfileText/CardSectionHeader';
import { Box, Typography } from '@mui/material';

const ViewEditor = ({ title, text }) => {
  return (
    <ProfileCard>
      <CardSectionHeader>{title}</CardSectionHeader>
      <Box
        sx={{
          width: '100%',
          maxHeight: '400px',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: 5,
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        {typeof window !== 'undefined' && text && (
          <Typography
            sx={{
              wordBreak: 'break-word', // Add the word-break CSS property
            }}
            component="div"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        )}
      </Box>
    </ProfileCard>
  );
};

export default ViewEditor;
