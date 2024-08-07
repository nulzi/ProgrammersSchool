export interface Book {
  id: number;
  title: string;
  img: number;
  category_id: number;
  form: string;
  isbn: string;
  summary: string;
  detail: string;
  author: string;
  page_num: number;
  content_list: string;
  price: number;
  likes: number;
  published_date: string;
  category_name: string;
}

export interface BookDetail extends Book {
  is_like: boolean;
}

export interface BookReviewItem {
  id: number;
  userName: string;
  content: string;
  created_at: string;
  score: number;
}

export type BookReviewItemWrite = Pick<BookReviewItem, "content" | "score">;
