export interface Order {
  id: number;
  created_at: string;
  address: string;
  receiver: string;
  ph_num: string;
  book_title: string;
  total_quantity: number;
  total_price: number;
}

export interface OrderSheet {
  basketItemIds: number[];
  totalPrice: number;
  totalQuantity: number;
  firstBookTitle: string;
  delivery: Delivery;
}

export interface Delivery {
  address: string;
  receiver: string;
  ph_num: string;
}

export interface OrderDetailItem {
  book_id: number;
  title: string;
  img: string;
  price: number;
  author: number;
  quantity: number;
}

export interface OrderLitsItem extends Order {
  detail?: OrderDetailItem[];
}
