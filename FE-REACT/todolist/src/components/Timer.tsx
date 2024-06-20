import { useState } from "react";

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);

  return (
    <>
      <h2>Timer : {seconds}s</h2>
      <button
        onClick={() => {
          setInterval(() => {
            setSeconds((prev) => prev + 1);
          }, 1000);
        }}
      >
        start
      </button>
    </>
  );
};

export default Timer;
