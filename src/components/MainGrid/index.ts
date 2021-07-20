import styled from 'styled-components';
export const MainGrid = styled.main`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 0.5fr 2fr 1fr;
  grid-template-areas: 'container container login';
  background: ${({ theme }) => theme.background};
  overflow: hidden;
`;

export const LogoContainer = styled.aside`
  grid-area: container;
  background-size: 100px 100%;
  background: black url('/bg.svg') no-repeat;

  img {
    margin-top: 256px;
    margin-left: 211px;
    width: 202px;
    height: 202px;
  }
`;

export const Login = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.background};
  grid-area: login;
  flex-direction: column;
  padding: 80px;
  align-items: center;
  gap: 10px;

  h1 {
    color: #707070;
    font: normal normal normal 20px/37px Segoe UI;
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

  a {
    text-align: center;
    text-decoration: underline;
    font: normal normal normal 20px/37px Segoe UI;
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
  }
`;
