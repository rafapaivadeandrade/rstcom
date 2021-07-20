import styled from 'styled-components';
export const EditGrid = styled.main`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 3fr;
  grid-template-areas: 'settings edit .';
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
export const EditContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.background};
  grid-area: edit;
  flex-direction: column;
  padding: 20px;
  gap: 10px;

  div.profile {
    display: flex;
    flex-direction: column;
    width: 70px;
  }

  div > img {
    align-self: flex-start;
    width: 39px;
    height: 39px;
    align-self: center;
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

  div > a {
    text-decoration: underline;
    font: normal normal normal 14px/37px Segoe UI;
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
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
