// async function f() {
//   return 7;
// }

// f().then(
//   (result) => {
//     console.log("result", result);
//   },
//   (err) => {
//     console.log("err", err);
//   }
// );

async function f1() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("success");
    }, 3000);
  });
  let result = await promise;
  console.log(result);
  console.log("hello");
}

f1();
