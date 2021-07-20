import styled, { css } from 'styled-components';

interface Done {
  done: boolean;
}

export const TodoGrid = styled.main`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 3fr;
  grid-template-areas: 'settings edit edit';
  background: ${({ theme }) => theme.background};
  overflow: hidden;
`;

export const SettingsContainer = styled.aside`
  grid-area: settings;
  background-size: 100px 100%;
  background: black url('/bg.svg') no-repeat;

  a:nth-of-type(2) {
    float: right;
    color: #fff;
    padding: 10px;
  }
  a:nth-of-type(1) {
    text-decoration: none;
    color: #fff;

    span {
      float: right;
      margin-right: 10px;
    }
  }

  div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    margin-top: 85px;
    margin-left: 34px;
    gap: 20px;
    span {
      color: #fff;
      cursor: pointer;
    }
  }
`;
export const TodoContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.background};
  grid-area: edit;
  flex-direction: column;
  padding: 20px;
  gap: 10px;

  a {
    text-decoration: underline;
    font: normal normal normal 18px/37px Segoe UI;
    letter-spacing: 0px;
    color: #757575;
    margin-left: 10px;
  }

  h1 {
    color: #e83f5b;
    font: normal normal normal 15px/37px Segoe UI;
    font-weight: bold;
  }

  button {
    cursor: pointer;
    display: flex;
    height: 56px;
    width: 100%;
    background-color: #071ac8;
    border: 0px;
    color: #fff;
    border-radius: 18px;
    font-size: 18px;
    align-items: center;
    justify-content: center;
  }
`;
export const UserContainer = styled.div`
  box-shadow: 0 2px 7px 1px rgba(0, 0, 0, 0.2);
  width: 200px;
  height: 60px;
  display: flex;
  font-size: 30px;
  flex-direction: row;
  margin-top: 25px;
  margin-left: 34px;
  border-radius: 8px;
  gap: 10px;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  img {
    float: left;
    width: 60px;
    height: 60px;
  }
`;

export const Label = styled.span`
  text-align: left;
  font: normal normal normal 15px/20px Segoe UI;
  letter-spacing: 0px;
  color: #fff;
`;

export const Email = styled.span`
  text-align: left;
  font: italic normal normal 15px/20px Segoe UI;
  letter-spacing: 0px;
  color: #fff;
  opacity: 1;
`;

export const Tasks = styled.div`
  height: 200px;
  width: 400px;
  overflow-x: auto;
  a {
    font: normal normal normal 18px/37px Segoe UI;
    font: italic normal 300 12px/37px Segoe UI;
    color: #ff0000;
    align-self: flex-end;
    margin-bottom: -10px;
  }

  input {
    align-self: flex-end;
  }

  span {
    margin-left: 14px;
    align-self: flex-end;
    color: #757575;
  }
`;

export const Task = styled.div<Done>`
  cursor: pointer;
  outline: none;
  display: flex;
  flex-direction: row;
  height: 30px;
  ${(props) =>
    props.done &&
    css`
      width: 70px;
      justify-content: space-between;
    `}
  ${(props) =>
    !props.done &&
    css`
      width: 150px;
    `}
`;

export const Wrapper = styled.div<Done>`
  cursor: pointer;
  outline: none;
  display: flex;
  flex-direction: row;
  height: 30px;
  ${(props) =>
    props.done &&
    css`
      width: 70px;
      justify-content: space-between;
    `}
  ${(props) => !props.done && css``}
`;

export const Square = styled.div<Done>`
  ${(props) =>
    props.done &&
    css`
      margin-left: 10px;
      width: 15px;
      height: 15px;
      align-self: flex-end;
      margin-bottom: 2px;
      z-index: -1;
      background-color: #4cd62b;
    `}
  ${(props) =>
    !props.done &&
    css`
      margin-left: 10px;
      width: 15px;
      height: 15px;
      align-self: flex-end;
      margin-bottom: 2px;
      z-index: -1;
      background-color: #fff;
      border: 1px solid #757575;
    `}
`;
export const Container = styled.div<Done>`
  ${(props) =>
    props.done &&
    css`
      border-bottom: 1px solid #757575;
      height: 21px;
      width: 150px;
      z-index: 3;
    `}
  ${(props) =>
    !props.done &&
    css`
      width: 150px;
    `}
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  margin-top: 430px;
  gap: 30px;

  input {
    width: 795px;
    padding-left: 20px;
    font: normal normal normal 18px/37px Segoe UI;
    outline: none;
    &::placeholder {
      text-decoration: underline;
    }
  }
  button {
    width: 152px;
    height: 52px;
  }
`;
