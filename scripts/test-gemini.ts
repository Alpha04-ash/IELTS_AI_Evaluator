import { gradeIELTSTask } from "../src/lib/ai/gemini";
import "dotenv/config";

async function test() {
  console.log("Testing Gemini Structured Outputs...");
  const type = "WRITING";
  const taskData = "Write an essay about the impact of technology on education.";
  const userInput = "Technology has a great impact on education. It makes learning easier and more accessible. However, it can also be distracting.";

  try {
    const result = await gradeIELTSTask(type, taskData, userInput);
    console.log("Result:", JSON.stringify(result, null, 2));
    
    if (result.score > 0 && typeof result.feedback === "string") {
      console.log("SUCCESS: Structured output received correctly.");
    } else {
      console.log("FAILURE: Invalid result format.");
    }
  } catch (error) {
    console.error("Test failed:", error);
  }
}

test();
