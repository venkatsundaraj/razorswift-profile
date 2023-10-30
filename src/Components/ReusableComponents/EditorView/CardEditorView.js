import ProfileCard from '@/cardComponents/ProfileCard';
import { Stack, styled, Typography } from '@mui/material';

const NormalListText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#1D1D1D',
  fontWeight: '500',
  fontSize: '13px',
  lineHeight: '21px',
  [theme.breakpoints.down('sm')]: {
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '17px',
  },
}));

function Dangerous({ text }) {
  return (
    <>
      {typeof window !== 'undefined' && text && (
        <Typography
          sx={{
            wordBreak: 'break-word', // Add the word-break CSS property
          }}
          component="div"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
    </>
  );
}

const CardEditorView = ({ text, title }) => {
  return (
    <ProfileCard
      styleProps={{
        minHeight: '50px',
        width: '100%',
        border: '1px solid #BEBEBE',
        background: 'white',
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
      <Stack
        direction="row"
        justifyContent="left"
        alignItems="left"
        spacing={1.5}
      >
        <NormalListText variant="body1" color="initial">
          <Dangerous text={text} />
        </NormalListText>
      </Stack>
    </ProfileCard>
  );
};

export default CardEditorView;
