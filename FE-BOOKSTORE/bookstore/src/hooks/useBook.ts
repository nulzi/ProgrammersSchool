import { useEffect, useState } from "react";
import {
  BookDetail,
  BookReviewItem,
  BookReviewItemWrite,
} from "../models/book.model";
import { fetchBook, likeBook, unlikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/baskets.api";
import { addBookReview, fetchBookReview } from "@/api/review.api";
import { useToast } from "./useToast";

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const [basketAdded, setbasketAdded] = useState(false);
  const [reviews, setReviews] = useState<BookReviewItem[]>([]);
  const { isloggedIn } = useAuthStore();
  const { showAlert } = useAlert();
  const { showToast } = useToast();

  const likeToggle = () => {
    if (!isloggedIn) {
      showAlert("로그인이 필요합니다.");
      return;
    }

    if (!book) return;
    if (book.is_like) {
      unlikeBook(book.id).then(() => {
        setBook({
          ...book,
          is_like: false,
          likes: book.likes - 1,
        });
        showToast("좋아요가 취소되었습니다.");
      });
    } else {
      likeBook(book.id).then(() => {
        setBook({
          ...book,
          is_like: true,
          likes: book.likes + 1, // 낙관적 업데이트
        });
      });
      showToast("좋아요가 성공했습니다.");
    }
  };
  const addToBasket = (quantity: number) => {
    if (!book) return;

    addCart({
      bookId: book.id,
      quantity,
    }).then(() => {
      // showAlert("장바구니에 추가되었습니다.");
      setbasketAdded(true);
      setTimeout(() => {
        setbasketAdded(false);
      }, 3000);
    });
  };

  useEffect(() => {
    if (!bookId) return;

    fetchBook(bookId).then((book) => {
      setBook(book);
    });

    fetchBookReview(bookId).then((reviews) => {
      setReviews(reviews);
    });
  }, [bookId]);

  const addReview = (data: BookReviewItemWrite) => {
    if (!book) return;

    addBookReview(book.id.toString(), data).then((res) => {
      // fetchBookReview(book.id.toString()).then((reviews) => {
      //   setReviews(reviews);
      // });
      showAlert(res.message);
    });
  };

  return { book, likeToggle, basketAdded, addToBasket, reviews, addReview };
};
