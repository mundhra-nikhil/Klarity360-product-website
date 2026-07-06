import fs from 'fs';
import path from 'path';

export interface DocContent {
  mdx: string;
}

export function getDocContent(slug: string): DocContent | undefined {
  try {
    const filePath = path.join(process.cwd(), 'lib/data/docs/content', `${slug}.mdx`);
    const mdx = fs.readFileSync(filePath, 'utf8');
    return { mdx };
  } catch (err) {
    return undefined;
  }
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function extractHeadingsFromMdx(mdx: string): Heading[] {
  const headings: Heading[] = [];
  const headingRegex = /^##\s+(.+)$/gm;
  let match;
  
  while ((match = headingRegex.exec(mdx)) !== null) {
    let text = match[1].trim();
    // Strip bold/italic markdown from text for ID generation
    text = text.replace(/[*_]+/g, '');
    // Strip markdown escapes (like \.)
    text = text.replace(/\\(.)/g, '$1');
    
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const level = 2;

    let finalId = id;
    let counter = 1;
    while (headings.some(h => h.id === finalId)) {
      finalId = `${id}-${counter}`;
      counter++;
    }

    headings.push({ id: finalId, text, level });
  }

  return headings;
}

export function getHeadingIdGenerator() {
  const seenIds = new Set<string>();
  
  return (text: string) => {
    let cleanText = text.replace(/[*_]+/g, '');
    const id = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    let finalId = id;
    let counter = 1;
    while (seenIds.has(finalId)) {
      finalId = `${id}-${counter}`;
      counter++;
    }
    seenIds.add(finalId);
    return finalId;
  };
}

