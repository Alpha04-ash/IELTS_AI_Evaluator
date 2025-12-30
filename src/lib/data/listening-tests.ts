export interface ListeningQuestion {
  id: number;
  type: string;
  question: string;
  answer: string;
  options?: string[];
}

export interface ListeningSection {
  id: number;
  title: string;
  audioUrl: string;
  imageUrl?: string;
  questions: ListeningQuestion[];
}

export interface ListeningTest {
  id: string;
  title: string;
  sections: ListeningSection[];
}

export const listeningTests: ListeningTest[] = [
  {
    id: "listening-1",
    title: "IELTS Academic 17 Listening Test 1",
    sections: [
      {
        id: 1,
        title: "Part 1",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        questions: [
          { id: 1, type: "FILL_IN_BLANKS", question: "Name of agent: Becky ________", answer: "Barnett" },
          { id: 2, type: "FILL_IN_BLANKS", question: "Phone number: 077 ________", answer: "7333 4817" },
          { id: 3, type: "FILL_IN_BLANKS", question: "Best day to meet: ________", answer: "Thursday" },
          { id: 4, type: "FILL_IN_BLANKS", question: "Location: ________ Street", answer: "Station" },
        ],
      },
      {
        id: 2,
        title: "Part 2",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        imageUrl: "https://www.ieltsjacky.com/images/IELTSListeningMapSampleQuestion.png",
        questions: [
          { id: 11, type: "MULTIPLE_CHOICE", question: "What is the speaker's main purpose?", answer: "B", options: ["A", "B", "C"] },
        ],
      },
    ],
  },
];
