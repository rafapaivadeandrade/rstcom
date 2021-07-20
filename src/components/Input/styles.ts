import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: Boolean;
  isFilled: Boolean;
  isErroed: Boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.text};
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 5px;
  color: black;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.black};
  margin: 0px 0px 10px;
  ${(props) =>
    props.isErroed &&
    css`
      border-color: #e83f5b;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #071ac8;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #071ac8;
    `}

 input {
    flex: 1;
    color: #757575;
    width: 300px;
    background: transparent;
    border: 0;
    outline: none;
    &::placeholder {
      color: #757575;
      text-decoration: underline;
    }
  }
`;

export const Error = styled.span`
  color: #e83f5b;
  height: 30px;
  margin-top: -20px;
`;
