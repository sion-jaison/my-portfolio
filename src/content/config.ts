import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		heroImage: z.string().optional(),
	}),
});

const music = defineCollection({
    type: 'content', // using content type to allow markdown body if needed, or 'data' for JSON
    schema: z.object({
        title: z.string(),
        audio: z.string(), // Path to file
        duration: z.string(),
        date: z.coerce.date(),
    })
});

const photos = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        image: z.string(),
        camera: z.string().optional(),
        date: z.coerce.date(),
    })
});

const videos = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        thumbnail: z.string(),
        link: z.string(),
        date: z.coerce.date(),
    })
});

export const collections = { blog, music, photos, videos };
