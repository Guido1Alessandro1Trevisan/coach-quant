import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  webpack(config: any, options: any) {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: {
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;