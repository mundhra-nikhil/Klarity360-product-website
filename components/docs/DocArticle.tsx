import React from 'react';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import { DocArticle as DocArticleType } from '@/lib/data/docs/manifest';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getHeadingIdGenerator } from '@/lib/data/docs/content';
import { BASE_PATH } from '@/lib/constants';




interface DocArticleProps {
  mdx: string;
  article: DocArticleType;
}

export default function DocArticle({ mdx, article }: DocArticleProps) {
  const generateId = getHeadingIdGenerator();
  
  const components = {
    h2: ({ children, ...props }: any) => {
      // Extract text content from children for ID generation
      const extractText = (node: any): string => {
        if (typeof node === 'string') return node;
        if (typeof node === 'number') return String(node);
        if (Array.isArray(node)) return node.map(extractText).join('');
        if (React.isValidElement(node)) return extractText((node.props as any).children);
        return '';
      };
      const text = extractText(children);
      const id = generateId(text);
      return <h2 id={id} className="text-3xl font-light tracking-tight mt-12 mb-6" {...props}>{children}</h2>;
    },
    // Adding some basic prose styles to match the old raw HTML
    h3: (props: any) => <h3 className="text-2xl font-light mt-8 mb-4" {...props} />,
    p: (props: any) => <p className="mb-6 leading-relaxed text-docs-text-secondary" {...props} />,
    ul: (props: any) => <ul className="list-disc pl-6 mb-6 space-y-2 text-docs-text-secondary" {...props} />,
    ol: (props: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-docs-text-secondary" {...props} />,
    li: (props: any) => <li {...props} />,
    strong: (props: any) => <strong className="font-semibold text-docs-text-primary" {...props} />,
    a: (props: any) => <a className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300" {...props} />,
    table: (props: any) => <div className="overflow-x-auto mb-8"><table {...props} /></div>,
    th: (props: any) => <th {...props} />,
    td: (props: any) => <td {...props} />,
    img: ({ src, alt, ...props }: any) => {
      let imageSrc = src;
      if (src && src.startsWith('/')) {
        imageSrc = `${BASE_PATH}${src}`;
      }
      return (
        <div className="relative w-full h-auto my-6">
          <Image
            src={imageSrc}
            alt={alt || 'Image'}
            width={800}
            height={400}
            className="rounded-lg"
            {...props}
          />
        </div>
      );
    },
  };

  return (
    <div className="docs-content-wrapper">
      <div className="docs-header mb-12 border-b border-docs-border-main pb-8 transition-colors duration-200">
        <h1 className="text-4xl font-light text-docs-text-primary tracking-tight mb-4 transition-colors duration-200">{article.title}</h1>
        <p className="text-xl text-docs-text-secondary transition-colors duration-200">{article.description}</p>
      </div>
      <div className="docs-content">
        <MDXRemote source={mdx} components={components} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />

      </div>
    </div>
  );
}

