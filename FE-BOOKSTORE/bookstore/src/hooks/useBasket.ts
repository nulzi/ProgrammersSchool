import { useEffect, useState } from "react";
import { Basket } from "../models/basket.model";
import { deleteBasket, fetchBasket } from "../api/baskets.api";

export const useBasket = () => {
  const [baskets, setBaskets] = useState<Basket[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);

  const deleteCartItem = (id: number) => {
    deleteBasket(id).then(() => {
      setBaskets(baskets.filter((basket) => basket.id !== id));
    });
  };

  useEffect(() => {
    fetchBasket().then((baskets) => {
      setBaskets(baskets);
      setIsEmpty(baskets.length === 0);
    });
  }, []);

  return { baskets, isEmpty, deleteCartItem };
};
