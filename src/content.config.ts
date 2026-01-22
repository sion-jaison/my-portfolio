import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 1. BLOG
const blog = defineCollection({
    loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx,mdoc}' }),
    // Remove ({ image }) from here 
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        // Change this line:
        heroImage: z.string().optional(), 
    }),
});

// 2. MUSIC
const music = defineCollection({
    loader: glob({ base: './src/content/music', pattern: '**/*.yaml' }),
    schema: z.object({
        title: z.string(),
        audio: z.string().optional(),
        duration: z.string().optional(),
        date: z.coerce.date().optional(),
    }),
});

// 3. PHOTOS
const photos = defineCollection({
    loader: glob({ base: './src/content/photos', pattern: '**/*.yaml' }),
    schema: z.object({
        title: z.string(),
        image: z.string().optional(),
        camera: z.string().optional(),
        date: z.coerce.date().optional(),
    }),
});

// 4. VIDEOS
const videos = defineCollection({
    loader: glob({ base: './src/content/videos', pattern: '**/*.yaml' }),
    schema: z.object({
        title: z.string(),
        thumbnail: z.string().optional(),
        link: z.string().optional(),
        date: z.coerce.date().optional(),
    }),
});

// EXPORT ALL
export const collections = { blog, music, photos, videos };
