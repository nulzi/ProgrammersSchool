// var vs let vs const
function compareVariable() {
  let num1 = 10;
  const num2 = 30;

  num1 = 20; // 기존 값을 변경
  alert("num2: " + num2);
}

// ID 란에 입력된 값을 팝업창에 띄우기
function popId() {
  let userId = document.getElementById("txt_id").value;

  if (!userId) {
    // = userId == ''
    alert("아이디를 입력해주세요.");
  } else {
    alert(userId);
  }
}

// 나만의 함수 만들고, 버튼 클릭하면 호출하기
function myFunction() {
  alert("1");
  alert("2");
  alert("3");
}
