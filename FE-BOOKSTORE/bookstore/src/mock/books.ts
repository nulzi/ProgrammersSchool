import { Book } from "@/models/book.model";
import { http, HttpResponse } from "msw";
import { fakerKO as faker } from "@faker-js/faker";

const bestBooksData: Book[] = Array.from({ length: 10 }).map((item, i) => ({
  id: i,
  title: faker.lorem.sentence(),
  img: faker.helpers.rangeToNumber({ min: 100, max: 150 }),
  category_id: faker.helpers.rangeToNumber({ min: 0, max: 2 }),
  form: "종이책",
  isbn: faker.commerce.isbn(),
  summary: faker.lorem.paragraph(),
  detail: faker.lorem.paragraph(),
  author: faker.person.firstName(),
  page_num: faker.helpers.rangeToNumber({ min: 100, max: 500 }),
  content_list: faker.lorem.paragraph(),
  price: faker.helpers.rangeToNumber({ min: 10000, max: 50000 }),
  likes: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
  published_date: faker.date.past().toISOString(),
  category_name: "동화",
}));

export const bestBooks = http.get("http://localhost:3000/books/best", () => {
  return HttpResponse.json(bestBooksData, {
    status: 200,
  });
});
