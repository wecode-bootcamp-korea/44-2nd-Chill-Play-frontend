import React from 'react';
import styled from 'styled-components';

const FooterWrap = styled.div`
  width: 100%;
  background: #fff;
`;

const FooterService = styled.div`
  width: 980px;
  margin: 0 auto;
`;

const ServiceList = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 23px 0;
  border-bottom: 1px solid #ebebeb;
  list-style: none;

  li {
    font-weight: 500;
    font-size: 13px;
    color: #666;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const CompanyInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  font-size: 12px;
  width: 980px;
  margin: 0 auto;

  p {
    color: #666;
    line-height: 0.5;
    font-style: normal;
  }
`;

function Footer() {
  return (
    <FooterWrap>
      <FooterService>
        <ServiceList>
          {SERVICE_MENUS.map(menu => {
            return <li key={menu.id}>{menu.menu}</li>;
          })}
        </ServiceList>
      </FooterService>
      <CompanyInfo>
        {COMPANY_INFO_LIST.map(info => {
          return <p key={info.id}>{info.text}</p>;
        })}
      </CompanyInfo>
    </FooterWrap>
  );
}

const SERVICE_MENUS = [
  {
    id: 1,
    menu: '회사소개',
  },
  {
    id: 2,
    menu: '지속가능경영',
  },
  {
    id: 3,
    menu: 'IR',
  },
  {
    id: 4,
    menu: '채용정보',
  },
  {
    id: 5,
    menu: '광고/제휴/출점문의',
  },
  {
    id: 6,
    menu: '이용약관',
  },
  {
    id: 7,
    menu: '편성기준',
  },
  {
    id: 8,
    menu: '개인정보처리방침',
  },
  {
    id: 9,
    menu: '법적고지',
  },
  {
    id: 10,
    menu: '이메일주소무단수집거부',
  },
  {
    id: 11,
    menu: '윤리경영',
  },
  {
    id: 12,
    menu: '사이버감시실',
  },
];

const COMPANY_INFO_LIST = [
  {
    id: 1,
    text: '(06159)서울 강남구 테헤란로 427, 위워크타워 10층(Wecode)',
  },
  {
    id: 2,
    text: '대표이사 : 임성근 ㆍ 사업자등록번호 421-16-38070 ㆍ 사업자정보확인',
  },
  {
    id: 3,
    text: '호스팅사업자 : Wecode 44기 2차 프로젝트 B팀 - CHill&Play ㆍ 개인정보보호 책임자 : 신효민 ㆍ 대표이메일 : hyomins013@gmail.com',
  },
  {
    id: 4,
    text: '© Wecode CGW. CHill&Play',
  },
];

export default Footer;
