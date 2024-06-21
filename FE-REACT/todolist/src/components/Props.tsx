import React, { Component } from "react";

interface IProps {
  weather: string;
  children: React.ReactNode;
}

const Props: React.FC<IProps> = ({ children, weather }) => {
  // const { children, weather } = props;

  return (
    <div>
      <h2>{children}</h2>
      today's weather is {weather}.
    </div>
  );
};

// class Props extends Component<IProps> {
//   render() {
//     const { children, weather } = this.props;
//     return (
//       <div>
//         <h2>{children}</h2>
//         today's weather is {weather}.
//       </div>
//     );
//   }
// }

export default Props;
