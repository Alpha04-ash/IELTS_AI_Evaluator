export interface ChartData {
  type: "BAR" | "LINE" | "PIE" | "TABLE";
  title: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

export interface WritingSection {
  id: number;
  taskType: "TASK_1" | "TASK_2";
  prompt: string;
  minWords: number;
  imageUrl?: string;
  chartData?: ChartData;
}

export interface WritingTest {
  id: string;
  title: string;
  sections: WritingSection[];
}

export const writingTests: WritingTest[] = [
  {
    id: "writing-1",
    title: "IELTS Academic 17 Writing Test 1",
    sections: [
      {
        id: 1,
        taskType: "TASK_1",
        prompt: "The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        minWords: 150,
        chartData: {
          type: "BAR",
          title: "Households in Owned and Rented Accommodation (1918-2011)",
          labels: ["1918", "1939", "1953", "1961", "1971", "1981", "1991", "2001", "2011"],
          datasets: [
            {
              label: "Owned accommodation",
              data: [23, 31, 32, 42, 50, 58, 68, 69, 64]
            },
            {
              label: "Rented accommodation",
              data: [77, 69, 68, 58, 50, 42, 32, 31, 36]
            }
          ]
        }
      },
      {
        id: 2,
        taskType: "TASK_2",
        prompt: "It is important for people to take risks, both in their professional lives and their personal lives. Do you think the advantages of taking risks outweigh the disadvantages?",
        minWords: 250,
      },
    ],
  },
  {
    id: "writing-2",
    title: "IELTS Academic 17 Writing Test 2",
    sections: [
      {
        id: 1,
        taskType: "TASK_1",
        prompt: "The graph below shows the number of shops that closed and the number of new shops that opened in one country between 2011 and 2018. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        minWords: 150,
        chartData: {
          type: "LINE",
          title: "Shop Openings and Closures (2011-2018)",
          labels: ["2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"],
          datasets: [
            {
              label: "New shops",
              data: [8500, 4000, 5800, 6200, 4000, 5100, 4000, 3000]
            },
            {
              label: "Closed shops",
              data: [6400, 6000, 7100, 6500, 600, 5100, 5000, 5100]
            }
          ]
        }
      },
      {
        id: 2,
        taskType: "TASK_2",
        prompt: "Some people think that it is best to stay in the same job for one's whole life. Others think that changing jobs frequently is better. Discuss both views and give your opinion.",
        minWords: 250,
      },
    ],
  },
];
