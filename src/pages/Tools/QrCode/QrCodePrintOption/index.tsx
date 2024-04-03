import React, { useState, useRef, ChangeEventHandler } from 'react';
import { useReactToPrint } from 'react-to-print';

import useModal from '@Hooks/useModal';

import Button from '@Components/Button';

import * as S from './style';
import QrcodePrintPage from '../QrCodePrintPage';

const QrCodePrintOption: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const { closeModal } = useModal();
  const [number, setNumber] = useState<number>(0);
  const componentRef = useRef<HTMLDivElement>(null);

  const handleChangeNumber: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = parseInt(e.target.value, 10);

    if (!isNaN(newValue) && newValue >= 0) {
      setNumber(newValue);
    }
  };

  const handleSizeSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleCancelBtn = () => {
    closeModal();
  };

  const handlePrintBtn = useReactToPrint({
    content: () => componentRef.current!,
  });

  return (
    <S.Container>
      <S.OptionContainer>
        <S.NumberSelectContainer>
          <S.NameSpan>개수 선택</S.NameSpan>
          <S.NumberContainer>
            <S.NumberInput
              type="number"
              value={number}
              onChange={handleChangeNumber}
            />
          </S.NumberContainer>
        </S.NumberSelectContainer>

        <S.SizeSelectContainer>
          <S.NameSpan>크기 선택</S.NameSpan>
          <S.SizeSelectButton onChange={handleSizeSelect} value={selectedSize}>
            <option value="5*8">5*8</option>
            <option value="4*4">4*4</option>
            <option value="2*2">2*2</option>
            <option value="1*1">1*1</option>
          </S.SizeSelectButton>
        </S.SizeSelectContainer>
      </S.OptionContainer>

      <S.Preview>
        <QrcodePrintPage ref={componentRef} selectedSize={selectedSize} />
      </S.Preview>

      <S.SmallButtonWrapper>
        <Button concept="text" variant="gray" onClick={handleCancelBtn}>
          취소
        </Button>
        <Button onClick={handlePrintBtn}>인쇄</Button>{' '}
      </S.SmallButtonWrapper>
    </S.Container>
  );
};

export default QrCodePrintOption;
