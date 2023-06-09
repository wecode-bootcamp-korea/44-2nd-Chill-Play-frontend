const BASE_URL = 'http://10.58.52.153:3000';

export const API = {
  kakaoLogin: `${BASE_URL}/users/kakaologin`,
  kakaoAuthToken: 'https://kauth.kakao.com/oauth/token',
  productList: `${BASE_URL}/musicals`,
  productDetail: `${BASE_URL}/musicals/detail`,
  navigationSearch: `${BASE_URL}/musicals/search`,
  ticketing: `${BASE_URL}/ticketing`,
  seatSelection: `${BASE_URL}/seat/`,
  payment: `${BASE_URL}/orders`,
  photoReview: `${BASE_URL}/reviews`,
  mypage: `${BASE_URL}/mypage/info?&limit=10`,
};
