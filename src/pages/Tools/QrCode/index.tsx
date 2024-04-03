import { useState } from 'react';

import QrCodeInput from './QrCodeInput';
import QrCodeStorage from './QrCodeStorage';
import * as S from './style';

function QrCode() {
  const [isInStorageMode, setIsInStorageMode] = useState<boolean>(false);
  const handleToStorage = () => {
    setIsInStorageMode(!isInStorageMode);
  };

  return (
    <S.Container>
      <S.StorageButton onClick={handleToStorage}>
        {isInStorageMode ? '새 QR 코드 생성' : '보관함'}
      </S.StorageButton>

      {isInStorageMode ? <QrCodeStorage /> : <QrCodeInput />}
    </S.Container>
  );
}

export default QrCode;
