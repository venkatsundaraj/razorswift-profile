import Layout from '@/src/components_fbl/NavigationComponents/Layout';
import ArticleBody from '@/src/components_fbl/pageBasedComponents/Articles/ArticleBody';
import HeroSection from '@/src/components_fbl/pageBasedComponents/Articles/HeroSection';
import { Box } from '@mui/material';
import { allArticles } from 'contentlayer/generated';
import Head from 'next/head';

function index({ filteredArticle }) {
  console.log(filteredArticle);
  if (!filteredArticle) return;
  return (
    <Layout>
      <Head>
        <title>{filteredArticle.title}</title>
        <meta name="description" content={filteredArticle.description} />
      </Head>
      <Box component="main">
        <HeroSection filteredArticle={filteredArticle} />
        <ArticleBody article={filteredArticle} />
      </Box>
    </Layout>
  );
}

export default index;

export async function getStaticProps({ params }) {
  const filteredArticle = allArticles.find(
    item => item.slugAsParams === params.id
  );

  return {
    props: {
      filteredArticle: filteredArticle,
    },
  };
}

export async function getStaticPaths() {
  const ids = allArticles.map(item => ({
    params: {
      id: item.slugAsParams,
    },
  }));

  return {
    paths: ids,
    fallback: false,
  };
}
