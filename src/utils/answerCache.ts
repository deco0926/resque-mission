type AnswerRecord = {
    question: string;
    options: string[];
    selected: string;
    correct: string;
    isCorrect: boolean;
    timestamp: string;
  };
  
  const answerCache: Record<string, AnswerRecord[]> = {};
  
  export function recordAnswer(levelId: string, answer: AnswerRecord) {
    if (!answerCache[levelId]) {
      answerCache[levelId] = [];
    }
    answerCache[levelId].push(answer);
  }
  
  export function getAnswers(levelId: string): AnswerRecord[] {
    return answerCache[levelId] || [];
  }
  
  export function clearAnswers(levelId: string) {
    delete answerCache[levelId];
  }
  