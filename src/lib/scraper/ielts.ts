import { readingTests } from "../data/reading-tests";
import { listeningTests } from "../data/listening-tests";
import { writingTests } from "../data/writing-tests";
import { speakingTests } from "../data/speaking-tests";

export interface IELTSTest {
  type: "LISTENING" | "READING" | "WRITING" | "SPEAKING" | "FULL";
  title: string;
  duration: number; // in minutes
  sections: any[];
}

export const getMockExam = (type: IELTSTest["type"], testId?: string): IELTSTest => {
  if (type === "READING") {
    let test;
    if (testId) {
      test = readingTests.find(t => t.id === testId);
    }
    
    if (!test) {
      const randomIndex = Math.floor(Math.random() * readingTests.length);
      test = readingTests[randomIndex];
    }

    return {
      type: "READING",
      title: test.title,
      duration: 60,
      sections: test.sections
    };
  }

  if (type === "LISTENING") {
    let test;
    if (testId) {
      test = listeningTests.find(t => t.id === testId);
    }
    
    if (!test) {
      const randomIndex = Math.floor(Math.random() * listeningTests.length);
      test = listeningTests[randomIndex];
    }

    return {
      type: "LISTENING",
      title: test.title,
      duration: 30,
      sections: test.sections
    };
  }

  if (type === "WRITING") {
    let test;
    if (testId) {
      test = writingTests.find(t => t.id === testId);
    }
    
    if (!test) {
      const randomIndex = Math.floor(Math.random() * writingTests.length);
      test = writingTests[randomIndex];
    }

    return {
      type: "WRITING",
      title: test.title,
      duration: 60,
      sections: test.sections
    };
  }

  if (type === "SPEAKING") {
    let test;
    if (testId) {
      test = speakingTests.find(t => t.id === testId);
    }
    
    if (!test) {
      const randomIndex = Math.floor(Math.random() * speakingTests.length);
      test = speakingTests[randomIndex];
    }

    return {
      type: "SPEAKING",
      title: test.title,
      duration: 15,
      sections: test.sections
    };
  }

  return getMockExam("READING");
};
