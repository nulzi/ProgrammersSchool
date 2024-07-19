import { render, screen } from "@testing-library/react";
import BookItem from "./BookItem";
import { BookStoreThemeProvider } from "../../context/themeContext";
import { Book } from "../../models/book.model";

const dummyBook: Book = {
  id: 1,
  title: "어린왕자들",
  img: 26,
  category_id: 0,
  form: "종이책",
  isbn: "0",
  summary: "어리다..",
  detail: "많이 어리다..",
  author: "김어림",
  page_num: 100,
  content_list: "목차입니다.",
  price: 20000,
  published_date: "2019-01-01",
  category_name: "동화",
  likes: 2,
};

describe("BookItem 컴포넌트 테스트", () => {
  it("렌더 확인", () => {
    render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook} />
      </BookStoreThemeProvider>
    );

    expect(screen.getByText(dummyBook.title)).toBeInTheDocument();
    expect(screen.getByText(dummyBook.summary)).toBeInTheDocument();
    expect(screen.getByText(dummyBook.author)).toBeInTheDocument();
    expect(screen.getByText("20,000원")).toBeInTheDocument();
    expect(screen.getByText(dummyBook.likes)).toBeInTheDocument();
    expect(screen.getByAltText(dummyBook.title)).toHaveAttribute(
      "src",
      `https://picsum.photos/id/${dummyBook.img}/600/600`
    );
  });
});
