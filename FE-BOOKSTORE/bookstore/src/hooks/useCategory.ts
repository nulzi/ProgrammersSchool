import { useEffect, useState } from "react";
import { fetchCategory } from "../api/category.api";
import { Category } from "../models/category.model";
import { useLocation } from "react-router-dom";
import { QUERYSTRING } from "../constants/querystring";

export const useCategory = () => {
  const location = useLocation();
  const [category, setCategory] = useState<Category[]>([]);

  const setAcitve = () => {
    const params = new URLSearchParams(location.search);

    if (params.get(QUERYSTRING.CATEGORY_ID)) {
      setCategory((prev) =>
        prev.map((item) => ({
          ...item,
          isActive: item.id === Number(params.get(QUERYSTRING.CATEGORY_ID)),
        }))
      );
    } else {
      setCategory((prev) =>
        prev.map((item) => ({
          ...item,
          isActive: false,
        }))
      );
    }
  };

  useEffect(() => {
    fetchCategory().then((category) => {
      if (!category) return;
      const categoryWithAll = [{ id: null, name: "전체" }, ...category];

      setCategory(categoryWithAll);
      setAcitve();
    });
  }, []);

  useEffect(() => {
    setAcitve();
  }, [location.search]);

  return { category };
};
