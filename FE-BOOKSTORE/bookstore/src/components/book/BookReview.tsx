import { BookReviewItem as IBookReviewItem } from "@/models/book.model";
import React from "react";
import styled from "styled-components";
import BookReviewItem from "./BookReviewItem";

interface Props {
  reviews: IBookReviewItem[];
}

const BookReview = ({ reviews }: Props) => {
  return (
    <BookReviewStyle>
      {reviews.map((review) => (
        <BookReviewItem key={review.id} review={review} />
      ))}
    </BookReviewStyle>
  );
};

const BookReviewStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default BookReview;
