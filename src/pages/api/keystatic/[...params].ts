// src/pages/api/keystatic/[...params].ts
export const prerender = false;

import { makeHandler } from '@keystatic/astro/api';
import config from '../../../../keystatic.config';

// --- DEBUGGING START ---
// This will print to your Vercel Logs (not the browser)
console.log("--- KEYSTATIC DEBUG ---");
console.log("Client ID exists?", !!import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID);
console.log("Secret exists?", !!import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET);
console.log("Secret Length:", import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET ? import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET.length : "0");
console.log("Expected Secret (Last 4):", import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET ? import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET.slice(-4) : "NONE");
// --- DEBUGGING END ---

export const ALL = makeHandler({
  config,
});
