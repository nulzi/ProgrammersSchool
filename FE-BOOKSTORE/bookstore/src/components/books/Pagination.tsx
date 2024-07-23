import React from "react";
import styled from "styled-components";
import { Pagination as IPagination } from "../../models/pagination.model";
import Button from "../common/Button";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";

interface Props {
  pagination: IPagination;
}

const Pagination = ({ pagination }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { total_page, current_page } = pagination;

  const handleClickPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(QUERYSTRING.PAGE, page.toString());
    setSearchParams(newSearchParams);
  };

  return (
    <PaginationStyle>
      {total_page > 0 && (
        <ol>
          {Array(total_page)
            .fill(0)
            .map((_, i) => (
              <li key={i}>
                <Button
                  size="small"
                  scheme={current_page === i + 1 ? "primary" : "normal"}
                  onClick={() => handleClickPage(i + 1)}
                >
                  {i + 1}
                </Button>
              </li>
            ))}
        </ol>
      )}
    </PaginationStyle>
  );
};

const PaginationStyle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 24px 0;

  ol {
    list-style: none;
    display: flex;
    gap: 8px;
    padding: 0;
    margin: 0;
  }
`;
export default Pagination;
