import { useEffect, useState } from "react";
import { BookDetail } from "../models/book.model";
import { fetchBook, likeBook, unlikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/baskets.api";

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const [cardAdded, setCardAdded] = useState(false);
  const { isloggedIn } = useAuthStore();
  const { showAlert } = useAlert();

  const likeToggle = () => {
    if (!isloggedIn) {
      showAlert("로그인이 필요합니다.");
      return;
    }

    if (!book) return;
    unlikeBook(book.id).then(() => {
      setBook({
        ...book,
        is_like: false,
        likes: book.likes - 1,
      });
    });
    if (book.is_like) {
    } else {
      likeBook(book.id).then(() => {
        setBook({
          ...book,
          is_like: true,
          likes: book.likes + 1, // 낙관적 업데이트
        });
      });
    }
  };
  const addToCart = (quantity: number) => {
    if (!book) return;

    addCart({
      bookId: book.id,
      quantity,
    }).then(() => {
      // showAlert("장바구니에 추가되었습니다.");
      setCardAdded(true);
      setTimeout(() => {
        setCardAdded(false);
      }, 3000);
    });
  };

  useEffect(() => {
    if (!bookId) return;

    fetchBook(bookId).then((book) => {
      setBook(book);
    });
  }, [bookId]);

  return { book, likeToggle, cardAdded, addToCart };
};
