export interface SpeakingSection {
  id: number;
  part: "PART_1" | "PART_2" | "PART_3";
  title: string;
  questions?: string[];
  prompt?: string; // For Part 2 cue card
}

export interface SpeakingTest {
  id: string;
  title: string;
  sections: SpeakingSection[];
}

export const speakingTests: SpeakingTest[] = [
  {
    id: "speaking-1",
    title: "IELTS Academic 17 Speaking Test 1",
    sections: [
      {
        id: 1,
        part: "PART_1",
        title: "Part 1: Introduction and Interview",
        questions: [
          "Do you work or are you a student?",
          "What do you like most about your studies?",
          "Let's talk about dreams. Do you often remember your dreams?",
          "Do you think dreams are important?"
        ],
      },
      {
        id: 2,
        part: "PART_2",
        title: "Part 2: Individual Long Turn",
        prompt: "Describe a city you would like to visit in the future. You should say: where it is, what you would like to do there, who you would like to go with, and explain why you would like to visit this city.",
      },
      {
        id: 3,
        part: "PART_3",
        title: "Part 3: Two-way Discussion",
        questions: [
          "Why do some people prefer to live in cities rather than the countryside?",
          "What are the advantages of living in a large city?",
          "How can city life be improved?"
        ],
      },
    ],
  },
];
