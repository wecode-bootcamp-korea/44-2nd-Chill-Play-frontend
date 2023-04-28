import React from 'react';
import styled from 'styled-components';
import Envelope from './components/Envelope';
import html2canvas from 'html2canvas';
import { AlertCircle, Download } from 'react-feather';

function TicketSection({ ticketData }) {
  const ticketRef = React.useRef(null);

  const handleDownloadTicket = () => {
    html2canvas(ticketRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = imgData;
      downloadLink.download = 'ticket.png';
      downloadLink.click();
    });
  };

  return (
    <TabContent>
      <DownloadBtnRow>
        <DownloadBtn onClick={handleDownloadTicket}>
          <Download size={20} />
          <p>티켓 이미지로 저장하기</p>
        </DownloadBtn>
      </DownloadBtnRow>
      <CenterDiv>
        <NotificationMsg>
          <AlertCircle size={14} />
          <span>가장 최근에 예약한 예약 티켓만 조회가 가능합니다.</span>
        </NotificationMsg>
      </CenterDiv>
      <EnvelopeContainer>
        <Envelope
          ticketData={ticketData}
          ticketRef={ticketRef}
          handleDownloadTicket={handleDownloadTicket}
        />
      </EnvelopeContainer>
    </TabContent>
  );
}

export default TicketSection;

const TabContent = styled.div`
  position: relative;
  width: 800px;
  padding: 24px;
  background: #e1e3e5;
`;

const DownloadBtnRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DownloadBtn = styled.button`
  padding: 12px 20px;
  display: flex;
  align-items: center;
  background-color: #3c3b40;
  color: #fff;
  font-size: 14px;
  border-radius: 5px;
  outline: 0;
  border: 0;
  transition: 0.3s;
  cursor: pointer;

  p {
    margin: 0;
    padding-left: 6px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.black};
  }
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const NotificationMsg = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #acaeaa;

  span {
    margin-left: 6px;
  }
`;

const EnvelopeContainer = styled.div`
  display: flex;
  justify-content: center;
`;
