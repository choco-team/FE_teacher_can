import { useCallback, useEffect, useState } from 'react';

import localStorageHelper from '@Utils/localStorageHelper';

const useTimer = () => {
  const recentTimes = localStorageHelper.get<number[]>('timer') ?? [];
  const recentTime = recentTimes[0] ?? 300;

  const [initTime, setInitTime] = useState(recentTime);
  const [time, setTime] = useState(recentTime);
  const [isProceeding, setIsProceeding] = useState(false);

  const progress = ((initTime - time) / initTime) * 100;

  const toggleState = () => setIsProceeding((prev) => !prev);

  const changeInitTime = (minute: number, second: number) => {
    setInitTime(minute * 60 + second);
    setTime(minute * 60 + second);
  };

  const resetTimer = () => {
    setTime(initTime);
    setIsProceeding(false);
  };

  const playTimer = useCallback(
    (worker: Worker) => {
      worker.postMessage(time);
      worker.onmessage = (event: MessageEvent<number>) => {
        const leftTime = event.data;

        setTime(leftTime);

        if (leftTime === 0) setIsProceeding(false);
      };
    },
    [time],
  );

  useEffect(() => {
    const worker = new Worker('../../../src/workers/timerWorker.ts');

    if (isProceeding) playTimer(worker);

    return () => {
      worker.terminate();
    };
  }, [playTimer, isProceeding]);

  return {
    time,
    isProceeding,
    progress,
    toggleState,
    resetTimer,
    changeInitTime,
  };
};

export default useTimer;
