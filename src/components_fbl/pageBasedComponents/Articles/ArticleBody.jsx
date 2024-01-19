import { Mdx } from '@/components_fbl/MdxComponents/MdxComponents';
import ExtraParagraphHeading from '@/components_fbl/headingComponents/ExtraParagraphHeading';
import { Box, Container } from '@mui/material';

function ArticleBody({ article }) {
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
        </Container>
      </Container>
    </Box>
  );
}

export default ArticleBody;
