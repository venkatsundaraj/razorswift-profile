import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import PrimaryHeading from '@/components_fbl/headingComponents/PrimaryHeading';
import SecondaryHeading from '@/components_fbl/headingComponents/SecondaryHeading';
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
  h5: ({ ...props }) => (
    <h5
      style={{
        fontSize: 'clamp(16px, 1.2vw, 18px)',
        fontWeight: '600',
        marginBottom: '8px',
        color: '#3A3A3A',
      }}
      {...props}
    />
  ),
  p: ({ ...props }) => (
    <ParagraphHeading
      sx={{ color: 'primaryPalette.black', mb: 2.8, '&:not(:first-child)': {} }}
      {...props}
    />
  ),

  ul: ({ ...props }) => (
    <ul
      style={{
        listStyle: 'disc',
        listStylePosition: 'inside',
        padding: '10px 0 16px',
        marginLeft: '20px',
      }}
      {...props}
    />
  ),
  ol: ({ ...props }) => <ol component="ol" {...props} />,
  li: ({ ...props }) => (
    <li
      style={{
        fontSize: 'clamp(16px,1.4vw,18px)',
        color: '#3A3A3A',
        lineHeight: '1.4',
        marginBottom: '8px',
        fontWeight: '500',
        listStyle: 'outside',
      }}
      {...props}
    />
  ),
  img: ({ ...props }) => <img alt={alt} {...props} />,
  Image,
  CustomImage,
};

export function Mdx({ code, joinUsData }) {
  const Component = useMDXComponent(code);
  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  );
}
