import { Box, Container } from '@mui/material';
import { Mdx } from '../../MdxComponents/MdxComponents';
import ExtraParagraphHeading from '../../headingComponents/ExtraParagraphHeading';

function BlogBody({ blog }) {
  return (
    <Box component="section" sx={{ py: 4 }}>
      <Container>
        {blog.mainDescription ? (
          <ExtraParagraphHeading
            sx={{ color: 'primaryPalette.black', fontWeight: '500', mb: 4 }}
          >
            {blog.mainDescription}
          </ExtraParagraphHeading>
        ) : null}
        <Container>
          <Mdx code={blog.body.code} />
        </Container>
      </Container>
    </Box>
  );
}

export default BlogBody;
