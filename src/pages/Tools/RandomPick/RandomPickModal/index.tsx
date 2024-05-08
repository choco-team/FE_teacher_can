import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { IoEllipse, IoEllipseOutline } from 'react-icons/io5';

import { useToast } from '@Hooks/toast';
import useModal from '@Hooks/useModal';

import Button from '@Components/Button';
import Select from '@Components/Select';

import theme from '@Styles/theme';

import { headerToken, axiosInstance } from '@Api/common';

import * as S from './style';
import { MOCK_STUDENTS_LISTS } from '../mock';

export type RandomPickSetting = {
  studentsListId: number | undefined;
  studentsCount: number | undefined;
  isAllowDuplication: boolean | undefined;
  studentsListLength: number | undefined;
};

type RandomPickModalProps = {
  randomPickSetting: RandomPickSetting;
  media: string;
  style?: React.CSSProperties;
};

// api/student/list
// -> 현재 나의 명렬표를 모두 가져옵니다. 하지만 학생들은 보이지가 않습니다.
// -> 각각의 명렬표의 아이디를 알 수 있어요.

// api/student/list/{id}
// -> id에 해당하는 명렬표를 가져옵니다. 학생들도 모두 있어요.

// 2
// 전체를 가져오고, 명렬표 리스트를 선택한다.
// 아이디를 로컬스토리지에 저장을 한다.
// RandomPick index.tsx 데이터를 불러온다.
export type StudentListResponse = {
  data: { studentList: { id: number; name: string }[] };
};
// 모달에서 불러오는 API
export const getStudentList = (): Promise<AxiosResponse<StudentListResponse>> =>
  axiosInstance.get('/student/list', {
    ...headerToken(),
  });

// 나중에 RandomPick/index.tsx에서 불러오도록!
export const getStudentListDetail = (id: number): Promise<AxiosResponse<any>> =>
  axiosInstance.get(`/student/list/${id}`, {
    ...headerToken(),
  });

function RandomPickModal({ randomPickSetting }: RandomPickModalProps) {
  // 전체 학생 리스트를 가져와야 함.
  // /api/student/list

  // 로컬스토리지에 저장된 id
  const id = 1;

  const { data, isLoading: isGetStudentListLoading } = useQuery({
    queryKey: ['student-list'],
    queryFn: () => getStudentList().then((response) => response.data),
  });

  const { data: detailData } = useQuery({
    queryKey: ['student-list-detail', id],
    queryFn: () => getStudentListDetail(id).then((response) => response.data),
  });

  console.log('학생목록 디테일', detailData);

  const initialSetting = randomPickSetting ?? {
    studentsListId: undefined,
    studentsCount: undefined,
    isAllowDuplication: undefined,
    studentsListLength: undefined,
  };

  const [settings, setSettings] = useState({
    studentsListId: initialSetting.studentsListId,
    studentsCount: initialSetting.studentsCount,
    isAllowDuplication: initialSetting.isAllowDuplication,
    studentsListLength: initialSetting.studentsListLength,
  });

  const [count, setCount] = useState<number>(0);

  const { closeModal } = useModal();
  const { showToast } = useToast();

  const handleChangeStudentsListId = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = event.currentTarget;

    setSettings((prevSettings) => ({
      ...prevSettings,
      studentsListId: Number(value),
      studentsListLength: MOCK_STUDENTS_LISTS.find(
        ({ id }) => id === Number(value),
      )?.students.length,
    }));
  };

  useEffect(() => {
    if (settings.studentsListLength) {
      setCount(settings.studentsListLength);
    }
  }, [settings.studentsListLength]);

  const handleClickDuplication = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const { value } = event.currentTarget;
    setSettings((prevSettings) => ({
      ...prevSettings,
      isAllowDuplication: value == 'YES',
    }));
  };

  const handleSaveBtn = () => {
    if (!settings.studentsListId) {
      showToast('학생 명단을 선택하세요', 'warning');
      return;
    }

    if (!settings.studentsCount) {
      showToast('뽑을 학생 수를 설정하세요', 'warning');
      return;
    }

    localStorage.setItem('random-pick-setting', JSON.stringify(settings));
    closeModal();
  };

  const handleCancelBtn = () => {
    closeModal();
  };

  return (
    <>
      <S.ModalContainer>
        <S.BigBsShield />
        <S.WarningSpan>
          명렬표 또는 중복 여부를 바꾸면 뽑기가 초기화됩니다
        </S.WarningSpan>
      </S.ModalContainer>
      <S.ModalContainer>
        <S.ListSpan>명렬표 선택</S.ListSpan>
        <S.ListSelect
          value={settings.studentsListId}
          onChange={handleChangeStudentsListId}
        >
          <option value={0}>클릭하여 명렬표 선택</option>
          {data?.data &&
            data.data.studentList &&
            data.data.studentList.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
        </S.ListSelect>
      </S.ModalContainer>
      <S.ModalContainer>
        <S.ListSpan>학생 수 선택</S.ListSpan>
        <Select
          onChangeOption={(selected) =>
            setSettings((prevSettings) => ({
              ...prevSettings,
              studentsCount: Number(selected),
            }))
          }
          options={Array.from({ length: count ?? 0 }, (_, index) => index + 1)}
          defaultOption={Number(settings.studentsCount ?? 0)}
        />
      </S.ModalContainer>
      <S.ModalContainer>
        <S.ListSpan>중복 여부</S.ListSpan>

        <S.SmallButton
          value="YES"
          isOnClick={settings.isAllowDuplication}
          onClick={handleClickDuplication}
        >
          <S.IconWrapper>
            {settings.isAllowDuplication ? (
              <IoEllipse color={theme.color.primary[300]} />
            ) : (
              <IoEllipseOutline />
            )}
          </S.IconWrapper>
          학생 중복뽑기
        </S.SmallButton>
        <S.SmallButton
          value="NO"
          isOnClick={!settings.isAllowDuplication}
          onClick={handleClickDuplication}
        >
          <S.IconWrapper>
            {settings.isAllowDuplication ? (
              <IoEllipseOutline />
            ) : (
              <IoEllipse color={theme.color.primary[300]} />
            )}
          </S.IconWrapper>
          뽑힌 학생 제외하기
        </S.SmallButton>
      </S.ModalContainer>
      <S.SmallButtonWrapper>
        <Button concept="text" variant="gray" onClick={handleCancelBtn}>
          취소
        </Button>
        <Button onClick={handleSaveBtn}>저장</Button>
      </S.SmallButtonWrapper>
    </>
  );
}

export default RandomPickModal;
