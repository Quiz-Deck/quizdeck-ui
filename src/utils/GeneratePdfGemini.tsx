// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");
// const { GoogleAIFileManager } = require("@google/generative-ai/server");
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

const apiKey = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

/**
 * Uploads the given file to Gemini.
 *
 * See https://ai.google.dev/gemini-api/docs/prompting_with_media
 */
async function uploadToGemini(path:string, mimeType:string) {
  const uploadResult = await fileManager.uploadFile(path, {
    mimeType,
    displayName: path,
  });
  const file = uploadResult.file;
  console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
  return file;
}

/**
 * Waits for the given files to be active.
 *
 * Some files uploaded to the Gemini API need to be processed before they can
 * be used as prompt inputs. The status can be seen by querying the file's
 * "state" field.
 *
 * This implementation uses a simple blocking polling loop. Production code
 * should probably employ a more sophisticated approach.
 */
async function waitForFilesActive(files:any) {
  console.log("Waiting for file processing...");
  for (const name of files.map((file:any) => file.name)) {
    let file = await fileManager.getFile(name);
    while (file.state === "PROCESSING") {
      process.stdout.write(".");
      await new Promise((resolve) => setTimeout(resolve, 10_000));
      file = await fileManager.getFile(name);
    }
    if (file.state !== "ACTIVE") {
      throw Error(`File ${file.name} failed to process`);
    }
  }
  console.log("...all files ready\n");
}

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run() {
  // TODO Make these files available on the local file system
  // You may need to update the file paths
  const files = [
    await uploadToGemini("5 Day Challenge Day One.pdf", "application/pdf"),
  ];

  // Some files have a processing delay. Wait for them to be ready.
  await waitForFilesActive(files);

  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            fileData: {
              mimeType: files[0].mimeType,
              fileUri: files[0].uri,
            },
          },
          {
            text: "Generate topic-specific questions from technical documents from this pdf using gemini ai and javascript",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```javascript\nfunction generateQuestions(ocrText) {\n  const questions = [];\n\n  // 1. Extract the main question\n  const mainQuestionMatch = ocrText.match(\n    /(All cars that burn fossil fuels should be banned and electric cars should replace them\\. Do you agree or disagree\\?)/\n  );\n  if (mainQuestionMatch) {\n    questions.push({\n      question: mainQuestionMatch[1],\n      type: "main_question",\n    });\n  }\n\n\n    // 2. Extract the thesis statement/opinion.\n  const thesisMatch = ocrText.match(\n      /State opinion and main reasons: (.*?)\\./\n  )\n    if(thesisMatch){\n        questions.push({\n            question: "What is the opinion on whether electric vehicles should replace vehicles that run on petrol?",\n            answer: thesisMatch[1],\n            type: "opinion"\n        })\n    }\n\n // 3. Extract main reasons from the thesis statement.\n    const mainReasonsMatch = ocrText.match(/State opinion and main reasons: Disagree\\. (.*?)\\./)\n    if(mainReasonsMatch){\n        const reasons = mainReasonsMatch[1].split("and");\n        reasons.forEach((reason, index) => {\n          questions.push({\n            question: `What is reason ${index + 1} given to disagree with the main question?`,\n            answer: reason.trim(),\n            type: "reason",\n            });\n        })\n    }\n\n  // 4. Extract topic sentences from the body paragraphs\n  const topicSentencesMatches = ocrText.matchAll(/Topic sentence: (.*?)\\./g);\n  for (const match of topicSentencesMatches) {\n    questions.push({\n      question: "What is the topic sentence of the paragraph?",\n      answer: match[1],\n      type: "topic_sentence",\n    });\n  }\n    // 5. Extract explanations and examples\n    const explanationMatches = ocrText.matchAll(/Explain: (.*?)\\./g);\n    for(const match of explanationMatches){\n        questions.push({\n            question: "What is the explanation provided?",\n            answer: match[1],\n            type: "explanation"\n        })\n    }\n     const exampleMatches = ocrText.matchAll(/Example: (.*?)\\./g);\n        for(const match of exampleMatches){\n            questions.push({\n                question: "What example is provided?",\n                answer: match[1],\n                type: "example"\n            })\n        }\n\n  // 6. Extract the conclusion summary.\n  const conclusionMatch = ocrText.match(\n    /Reiterate opinion and summarise:\\s*(.*?)\\./\n  );\n  if (conclusionMatch) {\n    questions.push({\n      question: "What is the concluding statement?",\n      answer: conclusionMatch[1],\n      type: "conclusion",\n    });\n  }\n\n  return questions;\n}\n\n// Example usage:\nconst ocrText = `All cars that burn fossil fuels should be banned and electric cars should replace them. Do you\nagree or disagree?\nIntroduction\nParaphrase: Electric vehicles should be a replacement for all vehicles that run on petrol.\nState opinion and main reasons: Disagree. Petrol cars are easier to manage and electric\ncars are more expensive to operate.\nMBP 1\nTopic sentence: Petrol cars are easier to manage.\nExplain: The fuel needed is easily accessible and portable.\nExplain: Petrol cars can travel for a long distance without needing to stop for hours.\nExample: If your car runs out of petrol while on transit, it is easy to top up the fuel and\nget going.\nMBP 2\nTopic sentence: Electric cars more expensive.\nExplain: Batteries need to be replaced as they lose capacity after a few months.\nExplain: Charging stations are few and expensive.\nExample: In remote areas, electric cars will need to be powerd by fuel generators by the\nusers.\nConclusion\nReiterate opinion and summarise:\nDisagree because petrol cars are easier to manage and electric cars are costlier.`;\n\n\nconst generatedQuestions = generateQuestions(ocrText);\nconsole.log(JSON.stringify(generatedQuestions, null, 2));\n```\n\n**Explanation:**\n\n1. **`generateQuestions(ocrText)` Function:**\n   - Takes the OCR text as input.\n   - Initializes an empty array `questions` to store the generated questions.\n   - Uses regular expressions to extract key information from the text.\n   - Creates objects with "question" and "answer" properties and pushes them to the `questions` array.\n   - Returns the `questions` array.\n\n2. **Regular Expressions:**\n   - `/(All cars that burn fossil fuels should be banned and electric cars should replace them\\. Do you agree or disagree\\?)/`: Captures the main question.\n   - `/State opinion and main reasons: (.*?)\\./`: captures the overall opinion of the document.\n    - `/State opinion and main reasons: Disagree\\. (.*?)\\./` : captures the main reasons for the opinion.\n   - `/Topic sentence: (.*?)\\./g`: Captures all topic sentences.\n   - `/Explain: (.*?)\\./g` : captures all the explanations.\n   - `/Example: (.*?)\\./g` : captures all the examples.\n   - `/Reiterate opinion and summarise:\\s*(.*?)\\./`: Captures the concluding statement.\n   - The `.*?` part matches any character (except a newline) zero or more times (non-greedy).\n   - The `\\.` part matches a literal period.\n   - The parentheses `(...)` create capturing groups, which allow us to extract the matched content using `match[1]`.\n   - The `g` flag means "global," which will match all occurrences of the pattern.\n\n3. **Extraction and Question Formation:**\n   - The code iterates through the matches found by the regex to extract the relevant parts of the text.\n   - It then uses the extracted text to generate specific questions.\n   - each question contains a question prompt, its answer, and a type.\n   - These question objects are then pushed into the `questions` array.\n\n4. **Example Usage:**\n   - The `ocrText` variable holds a sample document.\n   - The `generateQuestions()` function is called to generate questions.\n   - The `console.log(JSON.stringify(generatedQuestions, null, 2))` displays the output in a formatted JSON structure for better readability.\n\n**Key Improvements**\n\n- **Specific Question Types**: Each question is now categorized with a `type` property, like "main_question", "opinion", "reason", "topic_sentence", "explanation", "example", "conclusion". This will be helpful for sorting, filtering, or using the questions in different contexts.\n- **Reason Extraction**: Instead of just the entire statement, main reasons from the opinion statement are extracted individually.\n-   **Structured output:** The results are displayed as a JSON string, making it easier to parse in other applications or workflows.\n\n**How to Use**\n\n1.  **Copy the Code:** Copy the JavaScript code above.\n2.  **Replace `ocrText`:** Replace the sample `ocrText` variable with the actual text from your PDF.\n3.  **Run the Script:** You can run the script using Node.js or in a web browser environment.\n4. **Analyze the output:** The code will log the generated questions in the console.\n\nThis script will provide a structured set of questions that you can use to understand the main ideas and arguments presented in your technical documents.\n',
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
}

run();
