/*const inputs = `4 6
0 0 0 0 0 0
1 0 0 0 0 2
1 1 1 0 0 2
0 0 0 0 0 2`
  .trim()
  .split("\n");
const [N, M] = inputs.shift().split(" ").map(Number);
const section = inputs.map((el) => el.split(" ").map(Number));
let maxSafeZone = 0;

const copySection = (section) => {
  const newSection = new Array(N).fill(0).map((el) => new Array(M).fill(0));

  section.forEach((rows, i) => {
    rows.forEach((el, j) => {
      newSection[i][j] = el;
    });
  });

  return newSection;
};

const spreadVirus = (section) => {
  const newSection = copySection(section);
  const visited = new Array(N).fill(0).map((el) => new Array(M).fill(false));
  const move = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const queue = [[0, 0]];

  while (queue.length) {
    const [cx, cy] = queue.shift();
    if (!visited[cx][cy]) {
      visited[cx][cy] = true;
      move.forEach(([mx, my]) => {
        const [nx, ny] = [cx + mx, cy + my];
        if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
          queue.push([nx, ny]);
          if (newSection[cx][cy] == 2 && newSection[nx][ny] == 0)
            newSection[nx][ny] = 2;
        }
      });
    }
  }

  return newSection;
};

const getSafeZone = (section) => {
  let safezone = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (section[i][j] === 0) safezone++;
    }
  }

  return safezone;
};

// 1. 벽을 세우는 과정
// 2. 바이러스 퍼뜨리는 과정
// 3. 안전 영역 카운팅
// 4. 1~3번 반복 최대값 찾기
const visited = new Array(N).fill(0).map((el) => new Array(M).fill(false));
const move = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const queue = [[0, 0]];
const setWall = (wall, nextSection) => {
  if (wall == 0) {
    const tempSection = spreadVirus(nextSection);
    maxSafeZone = Math.max(maxSafeZone, getSafeZone(tempSection));
    return;
  }

  nextSection.map((rows, i) => {
    rows.map((el, j) => {
      if (nextSection[i][j] == 0) {
        nextSection[i][j] = 1;
        setWall(wall - 1, nextSection);
        nextSection[i][j] = 0;
      }
    });
  });

  return;
};

setWall(3, section);
console.log(maxSafeZone);
*/
let inputs = `3 5
a e i o u`
  .trim()
  .split("\n");
const [L, C] = inputs.splice(0, 1)[0].split(" ");
console.log(...[]);
inputs = inputs[0].split(" ").sort();
console.log(L, C, inputs);

const combination = (m, arr) => {
  console.log(m, arr);
  if (m == 1) return arr;
  const temp = [];

  arr.forEach((fixed, i, ori) => {
    const rest = [...ori];
    rest.splice(0, i + 1);
    const combis = combination(m - 1, rest);
    const att = combis.map((el) => fixed + el);

    temp.push(...att);
  });
  return temp;
};

console.log(
  combination(+L, inputs).filter(
    (el) =>
      el.includes("a") ||
      el.includes("e") ||
      el.includes("i") ||
      el.includes("o") ||
      el.includes("u")
  )
);
