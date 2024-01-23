import { Mdx } from '@/components_fbl/MdxComponents/MdxComponents';
import ExtraParagraphHeading from '@/components_fbl/headingComponents/ExtraParagraphHeading';
import JoinUsBox from '@/components_fbl/pageBasedComponents/ContactUs/JoinUsBox';
import contactUsImagePaths from '@/src/constants/ImagePaths/ContactUs/contactUsImagePaths';
import { Box, Container } from '@mui/material';
import { useState } from 'react';

function ArticleBody({ article }) {
  const [ctaData, setCtaData] = useState({
    title: article.ctaHeading,
    buttonText: article.ctaButtonText,
    buttonLink: article.ctaButtonUrl,
    joinUsIcon: contactUsImagePaths.aboutIcon,
  });
  return (
    <Box component="section" sx={{ py: 4 }}>
      <Container>
        {article.mainText ? (
          <ExtraParagraphHeading
            sx={{ color: 'primaryPalette.black', fontWeight: '500', mb: 4 }}
          >
            {article.mainText}
          </ExtraParagraphHeading>
        ) : null}
        <Container>
          <Mdx code={article.body.code} />
          {ctaData ? <JoinUsBox joinUsData={ctaData} /> : null}
        </Container>
      </Container>
    </Box>
  );
}

export default ArticleBody;
