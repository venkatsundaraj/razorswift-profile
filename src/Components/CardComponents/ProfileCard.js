import Card from '@mui/material/Card';

const ProfileCard = ({ children, styleProps, ...props }) => {
  return (
    <Card
      sx={{
        height: 1,
        border: '2px solid #DDDDDD',
        borderRadius: '13px',
        padding: 2,
        ...styleProps,
      }}
    >
      {children}
    </Card>
  );
};

export default ProfileCard;
