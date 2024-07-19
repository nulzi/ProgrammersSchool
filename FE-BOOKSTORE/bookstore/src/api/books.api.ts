import { Book } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { httpClient } from "./http";

interface FetchBooksParams {
  categoryId?: number;
  isNew?: boolean;
  currentPage?: number;
  limit: number;
}

interface FetchBooksResponse {
  books: Book[];
  pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    const response = await httpClient.get<FetchBooksResponse>("/books", {
      params,
    });

    return response.data;
  } catch (err) {
    return {
      books: [],
      pagination: {
        total_page: 0,
        current_page: 1,
      },
    };
  }
};
