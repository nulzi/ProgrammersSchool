## Use Case

1. 현재 자산 입력
2. 가계부 내역 입력
3. 가계부 목록 조회

## Detail

```json
{
  "currentAsset": 1000000,
}

// 가계부 내역
{
  "id" : "...",
  "category" : "coffee" | "meal" | "shopping" | "mart" | ...,
  "description": "blabla",
  "amount": 1000, // 지출 금액
  "createdAt":"2024-06-11T10:19:20.234Z",
  "fundsAtTheTime": 100000, // 잔액
}[]
```

## 데이터 관리

> 원본데이터는 브라우저 storage에서 관리

> 데이터 갱신 flow : store 객체와 브라우저 storage 모두 갱신
