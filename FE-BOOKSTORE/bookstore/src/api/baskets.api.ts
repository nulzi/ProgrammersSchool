import { Basket } from "../models/basket.model";
import { httpClient } from "./http";

interface AddCartParams {
  bookId: number;
  quantity: number;
}

export const addCart = async (params: AddCartParams) => {
  const response = await httpClient.post("/baskets", params);

  return response.data;
};

export const fetchBasket = async () => {
  const response = await httpClient.get<Basket[]>("/baskets");

  return response.data;
};

export const deleteBasket = async (basketId: number) => {
  const response = await httpClient.delete(`/baskets/${basketId}`);

  return response.data;
};
