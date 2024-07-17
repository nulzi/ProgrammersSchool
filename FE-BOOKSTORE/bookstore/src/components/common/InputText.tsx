import React from "react";
import { ForwardedRef } from "react";
import styled from "styled-components";

// forward ref 방식
interface Props {
  placeholder?: string;
}

const InputText = React.forwardRef(
  ({ placeholder }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    return <InputTextStyle placeholder={placeholder} ref={ref} />;
  }
);

const InputTextStyle = styled.input.attrs({ type: "text" })`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.text};
`;

export default InputText;
