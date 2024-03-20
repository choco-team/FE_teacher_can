import { useEffect, useState } from 'react';
import { AiOutlineUserAdd, AiFillSetting } from 'react-icons/ai';
import { css } from 'styled-components';

import { useMedia } from '@Hooks/useMedia';
import useModal from '@Hooks/useModal';

import Button from '@Components/Button';

import teachercan_logo from '@Assets/image/logo/teachercan-logo.png';
import teachercan_logo_2 from '@Assets/image/logo/teachercan-logo_2.png';

import RandomPickModal, { RandomPickSetting } from './RandomPickModal';
import { MOCK_STUDENTS_LISTS } from './mock';
import * as S from './style';

function RandomPick() {
  const media = useMedia();
  const [randomPickSetting, setRandomPickSetting] = useState<RandomPickSetting>(
    {
      studentsListId: undefined,
      studentsCount: undefined,
      isAllowDuplication: undefined,
    },
  );
  //학생 명단
  const [studentsList, setStudentsList] = useState<string[]>([]);
  //뽑을 학생 수
  const [count, setCount] = useState(0);
  //중복 여부
  const [duplication, setDuplication] = useState<undefined | boolean>(
    undefined,
  );
  // 뽑힌 학생 명단
  const [pickedStudents, setPickedStudents] = useState<string[]>([]);
  // 중복 금지일 때 제외할 학생 명단

  const { isOpen, openModal } = useModal();

  const handlePick = () => {
    //학생 명단 셔플하기
    for (let i = studentsList.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [studentsList[i], studentsList[randomIndex]] = [
        studentsList[randomIndex],
        studentsList[i],
      ];
    }

    //학생 뽑기
    if (studentsList.length >= count) {
      setPickedStudents(studentsList.slice(0, count));
    } else setPickedStudents(studentsList);
  };

  const handleConfirm = () => {
    const fetchedStudentsList = MOCK_STUDENTS_LISTS.find(
      ({ id }) => id === randomPickSetting.studentsListId,
    )?.students;
    if (fetchedStudentsList)
      setStudentsList(fetchedStudentsList.map(({ name }) => name));
    setPickedStudents([]);
  };

  //StudentsList 업데이트하기
  useEffect(() => {
    if (duplication !== true) {
      setStudentsList(
        studentsList.filter((student) => !pickedStudents.includes(student)),
      );
    }
  }, [duplication, pickedStudents]);

  //modal에서 선택했던 학생 명단, 수, 중복여부 가져오기
  useEffect(() => {
    if (isOpen) return;
    const setting = localStorage.getItem('random-pick-setting');
    if (setting) setRandomPickSetting(JSON.parse(setting));
  }, [isOpen]);

  useEffect(() => {
    const fetchedStudentsList = MOCK_STUDENTS_LISTS.find(
      ({ id }) => id === randomPickSetting.studentsListId,
    )?.students;
    const fetchedIsAllowDuplication = randomPickSetting.isAllowDuplication;
    if (fetchedStudentsList)
      setStudentsList(fetchedStudentsList.map(({ name }) => name));

    setDuplication(fetchedIsAllowDuplication);
    setPickedStudents([]);
  }, [randomPickSetting.studentsListId, randomPickSetting.isAllowDuplication]);

  useEffect(() => {
    const fetchedStudentsCount = randomPickSetting.studentsCount;
    if (fetchedStudentsCount) {
      setCount(fetchedStudentsCount);
    }
  }, [randomPickSetting.studentsCount]);

  return (
    <S.Layout>
      <S.LogoImage_2 src={teachercan_logo_2} alt="TeacherCan Logo_2" />
      <S.LogoImage src={teachercan_logo} alt="TeacherCan Logo" />
      <>
        <S.RandomResult>
          <S.ResultWrapper color={'black'}>
            {pickedStudents.length !== 0 && (
              <p>
                {/* <S.ResultSpan>{pickedStudents.join('    ')}</S.ResultSpan> */}
                {pickedStudents.map((student, index) => (
                  <S.ResultSpan key={index}>{student}</S.ResultSpan>
                ))}
              </p>
            )}

            {!localStorage.getItem('random-pick-setting') && (
              <S.CheckParagraph>학생 목록을 선택하세요</S.CheckParagraph>
            )}

            {studentsList.length === 0 &&
              localStorage.getItem('random-pick-setting') && (
                <>
                  <S.CheckParagraph>
                    모든 학생을 뽑았습니다. 확인을 누르면 처음부터 뽑을 수
                    있습니다.
                  </S.CheckParagraph>

                  <Button
                    onClick={handleConfirm}
                    $style={css`
                      margin: 20px;
                    `}
                    size={media === 'tablet' ? 'sm' : 'lg'}
                  >
                    확인
                  </Button>
                </>
              )}
          </S.ResultWrapper>
        </S.RandomResult>
        <S.ButtonWrapper>
          <Button onClick={handlePick} size={media === 'tablet' ? 'sm' : 'lg'}>
            <AiOutlineUserAdd />
            뽑기
          </Button>
          <Button
            size={media === 'tablet' ? 'sm' : 'lg'}
            onClick={() => {
              {
                openModal(
                  <RandomPickModal
                    randomPickSetting={randomPickSetting}
                    media={media}
                  />,
                );
              }
            }}
          >
            <AiFillSetting />
            설정
          </Button>
        </S.ButtonWrapper>
      </>
    </S.Layout>
  );
}

export default RandomPick;
