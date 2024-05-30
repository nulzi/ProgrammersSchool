// Promise 객체

let promise = new Promise((resolve, reject) => {
  // executor
  setTimeout(() => {
    resolve("success");
  }, 3000);
  // 성공 -> resolve
  // 실패 -> reject
})
  .then(
    (result) => {
      console.log(result);
      return result + "!!!!!!!!";
    },
    (err) => {
      console.log(err);
    }
  )
  .then(
    (result) => {
      console.log(result);
    },
    (err) => {
      console.log(err);
    }
  );
