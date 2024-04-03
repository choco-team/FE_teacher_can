import React, { forwardRef } from 'react';

import * as S from './style';

interface QRCode {
  id: number;
  content: string;
}

interface GridContainerProps {
  selectedSize: string;
}

// eslint-disable-next-line react/display-name
const QrcodePrintPage = forwardRef<HTMLDivElement, GridContainerProps>(
  ({ selectedSize }, ref) => {
    const qrCodes = [
      { id: 1, content: '  1' },
      { id: 2, content: '  2' },
      { id: 3, content: '  3' },
      { id: 4, content: '  4' },
      { id: 5, content: '  5' },
      { id: 6, content: '  6' },
      { id: 7, content: '  7' },
      { id: 8, content: '  8' },
      { id: 9, content: '  9' },
      { id: 10, content: '  10' },
      { id: 1, content: '  1' },
      { id: 2, content: '  2' },
      { id: 3, content: '  3' },
      { id: 4, content: '  4' },
      { id: 5, content: '  5' },
      { id: 6, content: '  6' },
      { id: 7, content: '  7' },
      { id: 8, content: '  8' },
      { id: 9, content: '  9' },
      { id: 10, content: '  10' },
      { id: 1, content: '  1' },
      { id: 2, content: '  2' },
      { id: 3, content: '  3' },
      { id: 4, content: '  4' },
      { id: 5, content: '  5' },
      { id: 6, content: '  6' },
      { id: 7, content: '  7' },
      { id: 8, content: '  8' },
      { id: 9, content: '  9' },
      { id: 10, content: '  10' },
      { id: 1, content: '  1' },
      { id: 2, content: '  2' },
      { id: 3, content: '  3' },
      { id: 4, content: '  4' },
      { id: 5, content: '  5' },
      { id: 6, content: '  6' },
      { id: 7, content: '  7' },
      { id: 8, content: '  8' },
      { id: 9, content: '  9' },
      { id: 10, content: '  10' },
    ];

    const itemsPerRowMap: Record<string, number> = {
      '5*8': 5,
      '4*4': 4,
      '2*2': 2,
      '1*1': 1,
    };
    const rowsMap: Record<string, number> = {
      '5*8': 8,
      '4*4': 4,
      '2*2': 2,
      '1*1': 1,
    };

    const itemsPerRow = itemsPerRowMap[selectedSize];
    const maxRows = rowsMap[selectedSize];
    const itemsPerPage = itemsPerRow * maxRows;

    const groupedQrCodes: QRCode[][] = [];
    for (let i = 0; i < qrCodes.length; i += itemsPerPage) {
      groupedQrCodes.push(qrCodes.slice(i, i + itemsPerPage));
    }

    return (
      <div ref={ref}>
        {groupedQrCodes.map((group, index) => (
          <S.GridContainer key={index} selectedSize={selectedSize}>
            {group.map((qrCode) => (
              <S.GridItem key={qrCode.id} selectedSize={selectedSize}>
                <div>{qrCode.content}</div>
              </S.GridItem>
            ))}
          </S.GridContainer>
        ))}
      </div>
    );
  },
);

export default QrcodePrintPage;
