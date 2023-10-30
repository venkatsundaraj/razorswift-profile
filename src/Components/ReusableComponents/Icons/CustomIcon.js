import { Icon } from '@mui/material';

const CustomIcon = ({ src, name, size, color }) => {
  const isUrlIcon = !!src;
  console.log(src); // Check if the icon is from URL

  if (isUrlIcon) {
    return (
      <Icon
        component="img"
        src={src}
        alt="Custom Icon"
        color={color}
        style={{ width: size, height: size, color: color }}
      />
    );
  } else {
    return <></>;
  }
};

export default CustomIcon;
