import type { MediaItem } from "./mediaItem";

export type HomeCategory = {
  slug: string;
  title: string;
  items: {
    page: number;
    results: MediaItem[];
    total_pages: number;
    total_results: number;
  };
};
