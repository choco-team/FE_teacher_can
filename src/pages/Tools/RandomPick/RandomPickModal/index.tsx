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

export type RandomPickSetting = {
  studentsListId: number | undefined;
  studentsCount: number | undefined;
  isAllowDuplication: boolean | undefined;
  studentsListLength: number | undefined;
  studentsList: Array<{ studentName: string }> | undefined;
};

type RandomPickModalProps = {
  randomPickSetting: RandomPickSetting;
  media: string;
  style?: React.CSSProperties;
};

export type StudentListResponse = {
  data: { studentList: { id: number; name: string }[] };
};
// 모달에서 불러오는 API
export const getStudentList = (): Promise<AxiosResponse<StudentListResponse>> =>
  axiosInstance.get('/student/list', {
    ...headerToken(),
  });

// 나중에 RandomPick/index.tsx에서 불러오도록!
export type StudentListDetailResponse = {
  data: { students: { studentNumber: number; studentName: string }[] };
};

export const getStudentListDetail = (
  id: number | undefined,
): Promise<AxiosResponse<StudentListDetailResponse>> =>
  axiosInstance.get(`/student/list/${id}`, {
    ...headerToken(),
  });

function RandomPickModal({ randomPickSetting }: RandomPickModalProps) {
  const { data, isLoading: isGetStudentListLoading } = useQuery({
    queryKey: ['student-list'],
    queryFn: () => getStudentList().then((response) => response.data),
  });

  const initialSetting = randomPickSetting ?? {
    studentsListId: undefined,
    studentsCount: undefined,
    isAllowDuplication: undefined,
    studentsListLength: undefined,
    studentsList: undefined,
  };

  const [settings, setSettings] = useState({
    studentsListId: initialSetting.studentsListId,
    studentsCount: initialSetting.studentsCount,
    isAllowDuplication: initialSetting.isAllowDuplication,
    studentsListLength: initialSetting.studentsListLength,
    studentsList: initialSetting.studentsList,
  });

  const [count, setCount] = useState<number>(0);

  const { closeModal } = useModal();
  const { showToast } = useToast();

  // const handleChangeStudentsListId = (
  //   event: React.ChangeEvent<HTMLSelectElement>,
  // ) => {
  //   const { value } = event.currentTarget;

  //   setSettings((prevSettings) => ({
  //     ...prevSettings,
  //     studentsListId: Number(value),
  //   }));
  // };

  const { data: detailData } = useQuery({
    queryKey: ['student-list-detail', settings.studentsListId],
    queryFn: () =>
      getStudentListDetail(settings.studentsListId).then(
        (response) => response.data,
      ),
  });

  useEffect(() => {
    if (detailData && detailData.data.students) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        studentsListLength: detailData.data.students.length,
        studentsList: detailData.data.students.map((studentData) => ({
          studentName: studentData.studentName,
        })),
      }));
    }
  }, [detailData, settings.studentsListId]);

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
        <Select
          onChangeOption={(selectedName) => {
            const selectedOption = data?.data?.studentList?.find(
              ({ name }) => name === selectedName,
            );
            if (selectedOption) {
              setSettings((prevSettings) => ({
                ...prevSettings,
                studentsListId: selectedOption.id,
              }));
            }
          }}
          options={data?.data?.studentList?.map(({ name }) => name) || []}
          // defaultOption={selectedName}
        />
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
