import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';

import {
  ProgramLevel,
  ProgramLevelId,
  levelDetails,
  programLevels,
} from '../data/program';

type ProgramContextValue = {
  currentLevelId: ProgramLevelId;
  currentLevel: ProgramLevel;
  isParticipating: boolean;
  setLevel: (levelId: ProgramLevelId) => void;
  activateParticipation: () => void;
  deactivateParticipation: () => void;
  promoteToPremium: () => void;
  currentShareText: string;
  currentRewardLabel: string;
};

const ProgramContext = createContext<ProgramContextValue | null>(null);

export function ProgramProvider({ children }: PropsWithChildren) {
  const [currentLevelId, setCurrentLevelId] = useState<ProgramLevelId>('advanced');
  const [isParticipating, setIsParticipating] = useState(false);

  const currentLevel = useMemo(
    () => programLevels.find((level) => level.id === currentLevelId) ?? programLevels[1],
    [currentLevelId],
  );

  const currentShareText = levelDetails[currentLevelId].shareText;
  const currentRewardLabel = levelDetails[currentLevelId].rewardLabel;

  return (
    <ProgramContext.Provider
      value={{
        currentLevelId,
        currentLevel,
        isParticipating,
        setLevel: setCurrentLevelId,
        activateParticipation: () => setIsParticipating(true),
        deactivateParticipation: () => {
          setIsParticipating(false);
          setCurrentLevelId('advanced');
        },
        promoteToPremium: () => setCurrentLevelId('premium'),
        currentShareText,
        currentRewardLabel,
      }}
    >
      {children}
    </ProgramContext.Provider>
  );
}

export function useProgram() {
  const context = useContext(ProgramContext);

  if (!context) {
    throw new Error('useProgram must be used within ProgramProvider');
  }

  return context;
}
