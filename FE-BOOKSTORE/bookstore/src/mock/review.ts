import { BookReviewItem } from "@/models/book.model";
import { http, HttpResponse } from "msw";

export const reviewsById = http.get(
  "http://localhost:3000/reviews/:bookId",
  () => {
    const mockReviewData: BookReviewItem[] = [
      {
        id: 1,
        userName: "Nulzi",
        content: "thank u",
        created_at: "2024-01-02",
        score: 5,
      },
      {
        id: 2,
        userName: "Nolza",
        content: "sry",
        created_at: "2024-01-12",
        score: 2,
      },
    ];
    return HttpResponse.json(mockReviewData, {
      status: 200,
    });
  }
);
