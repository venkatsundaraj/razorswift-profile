import Card from '@mui/material/Card';
const LoginFormCard = ({ children, sx, ...props }) => {
  return (
    <Card
      sx={{
        width: 900, // set the width to a specific value
        border: '1px solid #EEEEEE',
        background: '#FFFFFF',
        borderRadius: '12px',
        padding: 2,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Card>
  );
};

export default LoginFormCard;
