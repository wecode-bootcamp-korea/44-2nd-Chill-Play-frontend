import React from 'react';
import styled from 'styled-components';
import { AlertCircle } from 'react-feather';
import Collapse from 'rc-collapse';
import HistoryItemHeader from './components/HistoryItemHeader';
import HistoryItemContent from './components/HistoryItemContent';
require('rc-collapse/assets/index.css');

function HistorySection({ historyData }) {
  let Panel = Collapse.Panel;

  return (
    <TabContent>
      <CenterDiv>
        <NotificationMsg>
          <AlertCircle size={14} />
          <span>최근 1년 이내 구매 내역만 조회가 가능합니다.</span>
        </NotificationMsg>
      </CenterDiv>
      <Collapse accordion={true}>
        {historyData?.map(history => (
          <Panel
            key={history.id}
            header={<HistoryItemHeader history={history} />}
          >
            <HistoryItemContent history={history} />
          </Panel>
        ))}
      </Collapse>
    </TabContent>
  );
}

export default HistorySection;

const TabContent = styled.div`
  position: relative;
  width: 800px;
  padding: 24px;
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const NotificationMsg = styled.div`
  margin: 40px 0;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #acaeaa;

  span {
    margin-left: 6px;
  }
`;
