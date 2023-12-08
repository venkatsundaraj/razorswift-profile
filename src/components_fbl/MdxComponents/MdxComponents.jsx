import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import PrimaryHeading from '@/components_fbl/headingComponents/PrimaryHeading';
import SecondaryHeading from '@/components_fbl/headingComponents/SecondaryHeading';
import { List, ListItem } from '@mui/material';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Image from 'next/image';
import CustomImage from '../globalComponents/CustomImage/CustomImage';
import ExtraParagraphHeading from '../headingComponents/ExtraParagraphHeading';

const components = {
  h1: ({ ...props }) => (
    <PrimaryHeading
      component="h1"
      sx={{ color: 'primaryPalette.black' }}
      {...props}
    />
  ),
  h2: ({ ...props }) => <SecondaryHeading {...props} />,
  h4: ({ ...props }) => (
    <ExtraParagraphHeading
      component="h4"
      sx={{ color: '#3A3A3A', fontWeight: '600', my: 1.2 }}
      {...props}
    />
  ),
  h5: ({ ...props }) => <h5 {...props} />,
  p: ({ ...props }) => (
    <ParagraphHeading
      sx={{ color: 'primaryPalette.black', mb: 2.8, '&:not(:first-child)': {} }}
      {...props}
    />
  ),

  ul: ({ ...props }) => <ul style={{ listStyle: 'disc' }} {...props} />,
  ol: ({ ...props }) => <List component="ol" {...props} />,
  li: ({ ...props }) => (
    <ListItem
      sx={{
        fontSize: 'clamp(16px,1.4vw,18px)',
        color: 'primaryPalette.black',
        lineHeight: '1.4',
        fontWeight: '500',
        '&:last-child': {
          mb: 2,
        },
      }}
      {...props}
    />
  ),
  img: ({ ...props }) => <img alt={alt} {...props} />,
  Image,
  CustomImage,
};

export function Mdx({ code }) {
  const Component = useMDXComponent(code);
  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  );
}
