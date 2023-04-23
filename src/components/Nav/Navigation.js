import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Search } from 'react-feather';

function Navigation({ isActive }) {
  return (
    <>
      <NavMenu>
        {NAV_MENU_LIST.map(list => {
          return (
            <li key={list.id}>
              <StyledLink
                color={isActive ? 'white' : list.color}
                to={list.path}
              >
                {list.menu}
              </StyledLink>
            </li>
          );
        })}
      </NavMenu>
      <SearchForm>
        <SearchFormLeft />
        <SearchInput type="text" id="headerKeyword" isActive={isActive} />
        <SearchButton type="button" id="headerAddKeyword" isActive={isActive}>
          <Search />
        </SearchButton>
        <SearchFormRight />
      </SearchForm>
    </>
  );
}

const StyledLink = styled(Link)`
  color: ${props => props.color};
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  padding-left: 0;

  li {
    padding: 0px;
    width: 70px;
    font-weight: 700;

    a {
      cursor: pointer;
      text-decoration: none;
    }

    &:first-child {
      width: 85px;
    }

    &:nth-child(3) {
      color: #6200ee;
    }
  }
`;

const SearchFormLeft = styled.div`
  content: '';
  position: absolute;
  left: -10px;
  top: 13px;
  width: 1px;
  height: 30px;
  background-color: lightgrey;
`;

const SearchForm = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchInput = styled.input`
  height: 30px;
  padding: 0 10px;
  font-size: 14px;
  color: ${({ isActive }) => (isActive ? '#fff' : '#252525')};
  border: none;
  box-shadow: none;
  outline: none;
  background-color: transparent;
  flex: 1;
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 30px;
  margin-left: 10px;
  border: none;
  border-radius: 20px;
  outline: none;
  background: transparent;
  color: ${({ isActive }) => (isActive ? 'white' : '#252525')};
  cursor: pointer;
`;

const SearchFormRight = styled.div`
  content: '';
  position: absolute;
  right: -10px;
  top: 13px;
  width: 1px;
  height: 30px;
  background-color: lightgrey;
`;

const NAV_MENU_LIST = [
  {
    id: 1,
    menu: '뮤지컬',
    color: '#252525',
    path: '/productList',
  },
  {
    id: 2,
    menu: '극장',
    color: '#252525',
    path: '/theater',
  },
  {
    id: 3,
    menu: '예매',
    color: '#6200EE',
    path: '/booking',
  },
  {
    id: 4,
    menu: '스토어',
    color: '#252525',
    path: '/store',
  },
];

export default Navigation;
