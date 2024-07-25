import { BookReviewItem } from "@/models/book.model";
import { requestHandler } from "./http";

export const fetchBookReview = async (bookId: string) => {
  return await requestHandler<BookReviewItem>("get", `/reviews/${bookId}`);
};
