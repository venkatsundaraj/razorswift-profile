import { CommonImage } from '@/imageComponents/CommonImages';

const RightHandComponent = props => {
  const { image, height, width } = props;
  return (
    <CommonImage
      src={image}
      alt="heroImg"
      style={{ width: '100%', height: 'auto' }}
    />
  );
};

export default RightHandComponent;
