import rss from '@astrojs/rss';

export async function GET(context) {
  // Utiliser import.meta.glob au lieu d'Astro.glob
  const posts = import.meta.glob('../content/blog/*.{md,mdx}', { eager: true });
  
  const items = Object.values(posts)
    .map((post) => ({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      pubDate: new Date(post.frontmatter.pubDate),
      link: `/blog/${post.frontmatter.slug}/`,
    }))
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
    .filter(post => !post.frontmatter?.draft);

  return rss({
    title: 'Reho - Blog',
    description: 'Mes réflexions sur le développement et la technologie',
    site: context.site,
    items: items,
    customData: `<language>en-us</language>`,
  });
}