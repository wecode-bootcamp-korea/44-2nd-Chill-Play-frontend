import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Search } from 'react-feather';
import { API } from '../../config';

function Navigation({ isActive }) {
  const [searchText, setSearchText] = useState('');
  const [searchFocus, setSearchFocus] = useState(false);
  const [musicalList, setMusicalList] = useState([]);
  const navigate = useNavigate();
  const searchInputRef = useRef();

  const searchMusical = e => {
    setSearchText(e.target.value);
  };

  const SearchFocus = () => {
    setSearchFocus(prev => !prev);
  };

  const goToDetail = detailId => {
    navigate(`/productdetail/${detailId}`);
    setSearchText('');
  };

  const handleOutsideClick = e => {
    if (searchInputRef.current && !searchInputRef.current.contains(e.target)) {
      setSearchFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    fetch(`${API.navigationSearch}?keyword=${searchText}&limit=4&offset=0`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
      .then(res => res.json())
      .then(list => setMusicalList(list));
  }, [searchText]);

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
      <SearchForm ref={searchInputRef}>
        <SearchFormLeft />
        <SearchInput
          type="text"
          id="headerKeyword"
          value={searchText}
          onChange={searchMusical}
          onFocus={SearchFocus}
          isActive={isActive}
        />
        {searchFocus && (
          <SearchBox>
            {musicalList && musicalList.length > 0 ? (
              musicalList.map(list => (
                <SearchResult
                  key={list.id}
                  onClick={() => {
                    goToDetail(list.id);
                  }}
                >
                  <img src={`${list.post_image_url}`} alt="뮤지컬 포스터" />
                  <span>{list.name}</span>
                </SearchResult>
              ))
            ) : (
              <p>단어를 입력해 주시기 바랍니다.</p>
            )}
          </SearchBox>
        )}
        <SearchButton type="button" id="headerAddKeyword" isActive={isActive}>
          <Search />
        </SearchButton>
        <SearchFormRight />
      </SearchForm>
    </>
  );
}

const SearchResult = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid lightgrey;
  cursor: pointer;

  img {
    height: 80px;
    width: 60px;
  }
  span {
    font-size: 14px;
    font-weight: 400;
  }
`;

const SearchBox = styled.div`
  display: flex;
  position: absolute;
  top: 40px;
  right: -10px;
  flex-direction: column;
  width: 236px;
  max-height: 400px;
  margin-top: 20px;
  padding: 10px 10px;
  overflow: auto;
  border: 1px solid lightgrey;
  border-radius: 10px;
  background-color: white;
  z-index: 10;
  gap: 10px;

  p {
    font-size: 12px;
    font-weight: 400;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-thumb {
    height: 10%;
    background: lightgrey;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(240, 240, 240, 0.1);
  }
`;

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
