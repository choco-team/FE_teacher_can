import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import useModal from '@Hooks/useModal';

import Button from '@Components/Button';
import Select from '@Components/Select';

import * as S from './style';
import QrcodePrintPage from '../QrcodePrintPage';
import QrcodePrintPreview from '../QrcodePrintPreview';

const QrCodePrintOption: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string>('소(5X8)');
  const [selectedNumber, setSelectedNumber] = useState<number>(40);
  const { closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const options = ['소(5X8)', '중(2X4)', '대(1X1)'];

  const handleNumberSelect = (selected: string) => {
    const newValue = parseInt(selected, 10);
    if (!isNaN(newValue) && newValue >= 0) {
      setSelectedNumber(newValue);
    }
  };

  const handleSizeSelect = (selected: string) => {
    setSelectedSize(selected);
  };

  const handleCancelBtn = () => {
    closeModal();
  };

  const handlePrintBtn = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () => {
      setIsLoading(true);
      return Promise.resolve();
    },
    onAfterPrint: () => setIsLoading(false),
    removeAfterPrint: true,
  });

  return (
    <S.Container>
      <S.OptionContainer>
        <S.NumberSelectContainer>
          <Select
            label="개수"
            options={Array.from({ length: 100 }, (_, index) => `${index + 1}`)}
            onChangeOption={handleNumberSelect}
            value={selectedNumber}
            defaultOption="40"
          />
        </S.NumberSelectContainer>

        <S.SizeSelectContainer>
          <Select
            label="크기"
            options={options}
            onChangeOption={handleSizeSelect}
            value={selectedSize}
            defaultOption="소(5X8)"
          />
        </S.SizeSelectContainer>
      </S.OptionContainer>

      <S.Preview>
        <QrcodePrintPreview selectedSize={selectedSize} key={selectedSize} />
        <QrcodePrintPage
          style={{ display: 'none' }}
          selectedSize={selectedSize}
          selectedNumber={selectedNumber}
          ref={componentRef}
        />{' '}
      </S.Preview>

      <S.SmallButtonWrapper>
        <Button concept="text" variant="gray" onClick={handleCancelBtn}>
          취소
        </Button>
        <Button onClick={handlePrintBtn}> 인쇄</Button>
      </S.SmallButtonWrapper>
    </S.Container>
  );
};

export default QrCodePrintOption;
