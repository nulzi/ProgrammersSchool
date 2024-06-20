import { useState } from "react";

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  setInterval(() => {
    setTime(new Date());
  }, 1000);

  return <div>curTime : {time.toLocaleTimeString()}</div>;
};

export default Clock;
