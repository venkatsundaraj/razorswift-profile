import Image from 'next/image';

function GraphCMSImageLoader({ src, width, quality }) {
  return `${src}?w=${width}&q=${quality || 75}`;
}

export const CommonImage = props => {
  const development = true;
  return (
    <>
      {development && <Image {...props} />}
      {!development && <img {...props} />}
    </>
  );
};
