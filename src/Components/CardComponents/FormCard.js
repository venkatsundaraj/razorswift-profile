import Card from '@mui/material/Card';

const FormCard = ({ children, sx, ...props }) => {
  return (
    <Card
      sx={{
        height: 1,
        border: '1px solid #EEEEEE',
        background: '#FAFAFA',
        borderRadius: '6px',
        padding: 2,
        ...sx,
      }}
    >
      {children}
    </Card>
  );
};

export default FormCard;
