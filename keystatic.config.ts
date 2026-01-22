import { config, fields, collection } from '@keystatic/core';

export default config({
  // SMART STORAGE:
  // If we are in "production" (Vercel), use GitHub.
  // If we are in "dev" (Localhost), use the hard drive.
  storage: import.meta.env.PROD
    ? {
        kind: 'github',
        repo: {
          owner: 'sion-jaison', // Your GitHub Username
          name: 'my-portfolio', // Your Repo Name
        },
      }
    : {
        kind: 'local',
      },

  collections: {
    // 1. BLOG POSTS
    blog: collection({
      label: '📝 Blog',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description' }),
        pubDate: fields.date({ label: 'Publish Date' }),
        heroImage: fields.image({
            label: 'Hero Image',
            directory: 'public/blog-images',
            publicPath: '/blog-images/',
        }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/blog-images',
            publicPath: '/blog-images/',
          },
        }),
      },
    }),

    // 2. MUSIC
    music: collection({
      label: '🎧 Music',
      slugField: 'title',
      path: 'src/content/music/*',
      schema: {
        title: fields.slug({ name: { label: 'Track Title' } }),
        audio: fields.file({ 
            label: 'Audio File',
            directory: 'public/music', 
            publicPath: '/music/' 
        }),
        duration: fields.text({ label: 'Duration (e.g. 3:45)' }),
        date: fields.date({ label: 'Release Date' }),
      },
    }),

    // 3. PHOTOS
    photos: collection({
      label: '📸 Photography',
      slugField: 'title',
      path: 'src/content/photos/*',
      schema: {
        title: fields.slug({ name: { label: 'Caption' } }),
        image: fields.image({
            label: 'Photo',
            directory: 'public/photos',
            publicPath: '/photos/',
        }),
        camera: fields.text({ label: 'Camera Settings' }),
        date: fields.date({ label: 'Date' }),
      },
    }),

    // 4. VIDEOS
    videos: collection({
      label: '🎬 Videos',
      slugField: 'title',
      path: 'src/content/videos/*',
      schema: {
        title: fields.slug({ name: { label: 'Video Title' } }),
        thumbnail: fields.image({
            label: 'Thumbnail',
            directory: 'public/videos',
            publicPath: '/videos/',
        }),
        link: fields.url({ label: 'Video Link (YouTube/Vimeo)' }),
        date: fields.date({ label: 'Date' }),
      },
    }),
  },
});
