function bar(arg, ...rest) {
  console.log(arguments);
  console.log(
    arguments.forEach((element) => {
      console.log(element);
    })
  );
  return arg;
}

bar(1, 2, 3);
