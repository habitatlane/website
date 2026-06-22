import { createMarkdownProcessor } from '@astrojs/markdown-remark';

const processor = await createMarkdownProcessor();

export const renderMarkdown = async (content = '') => {
  const trimmed = content.trim();
  if (!trimmed) {
    return '';
  }

  const { code } = await processor.render(trimmed);
  return code;
};
