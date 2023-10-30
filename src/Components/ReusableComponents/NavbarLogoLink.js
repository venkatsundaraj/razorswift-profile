import { CommonImage } from '@/imageComponents/CommonImages';
import Link from 'next/link';

const NavbarLogoLink = ({ url, ...props }) => {
  return (
    <Link href={url}>
      <CommonImage {...props} />
    </Link>
  );
};

export default NavbarLogoLink;
