const CHAT_BOT_DATA = {
  initial: {
    message:
      '안녕하세요 👋 어떤 뮤지컬을 볼 지 고민되신다면 저희 추천봇을 이용해주세요!',
    options: [
      { text: '추천해줘요 추천봇', value: 'recommend', isPrimary: true },
      { text: '직접 둘러볼게요', value: 'no' },
    ],
  },
  second: {
    message: '그럼요! 어떤 장르를 좋아하시는지 알려주세요!',
    options: [
      { text: '🥹 역사/감동', value: 'historical' },
      { text: '👨‍⚖️ 범죄/심판', value: 'judgment' },
      { text: '🧚 스릴러/판타지', value: 'thriller' },
      { text: '💃🏽 음악/댄스', value: 'music' },
      { text: '처음으로 돌아갈래요', value: 'reset' },
    ],
  },
  third: {
    message: '장르를 고르셨네요! 다음 작품들은 어떠신가요?',
    options: [
      { text: '아이다', value: '아이다', category: 'historical', pageId: 8 },
      {
        text: '레미제라블',
        value: '레미제라블',
        category: 'historical',
        pageId: 5,
      },
      { text: '시카고', value: '시카고', category: 'judgment', pageId: 4 },
      {
        text: '오페라의 유령',
        value: '오페라의 유령',
        category: 'thriller',
        pageId: 2,
      },
      { text: '데스노트', value: '데스노트', category: 'thriller', pageId: 1 },
      {
        text: '맨오브라만차',
        value: '맨오브라만차',
        category: 'music',
        pageId: 3,
      },
      { text: '캣츠', value: '캣츠', category: 'music', pageId: 7 },
      { text: '슈퍼클로젯', value: '슈퍼클로젯', category: 'music', pageId: 6 },
      { text: '처음으로 돌아갈래요', value: 'reset' },
    ],
  },
};

export default CHAT_BOT_DATA;
