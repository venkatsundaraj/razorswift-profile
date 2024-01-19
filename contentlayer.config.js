import { defineDocumentType, makeSource } from '@contentlayer/source-files';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    bannerData: {
      type: 'string',
    },
    headText: {
      type: 'string',
    },
    author: {
      type: 'string',
    },
    mainText: {
      type: 'string',
    },
    subText: {
      type: 'string',
    },
    date: {
      type: 'string',
    },
    description: {
      type: 'string',
      required: true,
    },
    mainDescription: {
      type: 'string',
      required: true,
    },
    isPublished: {
      type: 'boolean',
      default: true,
    },
    image: { type: 'image', required: true },
    parent: {
      type: 'string',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: doc => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
      type: 'string',
      resolve: doc => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
  },
}));

const Article = defineDocumentType(() => ({
  name: 'Article',
  filePathPattern: 'article/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    headText: {
      type: 'string',
      required: true,
    },
    mainText: {
      type: 'string',
    },
    date: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    isPublished: {
      type: 'boolean',
      default: true,
    },
    image: { type: 'image', required: true },
    parent: {
      type: 'string',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: doc => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
      type: 'string',
      resolve: doc => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
  },
}));

const codeOptions = {
  theme: 'github-dark',
  grid: false,
};

export default makeSource({
  /* options */
  contentDirPath: './src/content',
  documentTypes: [Blog, Article],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
      [rehypePrettyCode, codeOptions],
    ],
  },
});

// readingTime: {
//       type: 'json',
//       resolve: doc => readingTime(doc.body.raw),
//     },
//     toc: {
//       type: 'json',
//       resolve: async doc => {
//         const regulrExp = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
//         const slugger = new GithubSlugger();
//         const headings = Array.from(doc.body.raw.matchAll(regulrExp)).map(
//           ({ groups }) => {
//             const flag = groups?.flag;
//             const content = groups?.content;

//             return {
//               level:
//                 flag?.length == 1 ? 'one' : flag?.length == 2 ? 'two' : 'three',
//               text: content,
//               slug: content ? slugger.slug(content) : undefined,
//             };
//           }
//         );

//         return headings;
//       },
//     },
