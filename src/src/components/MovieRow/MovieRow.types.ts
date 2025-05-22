export interface SimpleMediaItem {
  poster_path: string;
  original_title?: string;
  original_name?: string;
}

export interface Items {
  results: SimpleMediaItem[];
}

export interface MovieRowProps {
  title: string;
  items: Items;
}
