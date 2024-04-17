import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "./index";
import OpenAI from "openai";
import Input from "components/input/Input";
import Button from "components/button/buttons";
import { deckActions } from "features/store/deckSlice";
import { useAddQuestionMutation } from "features/api/question/questionApi";

interface Props {
  open: boolean;
  setClose: () => void;
}

interface Question {
  questionNumber: number;
  questionContent: string;
  options: string[];
  correctAnswer: string;
}

type DebounceFunction = (...args: any[]) => void;

export const GenerateDeckModal = ({ open, setClose }: Props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addQuestion] = useAddQuestionMutation();

  const open_ai_apiKey = process.env.OPENAI_API_KEY;

  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    const { value } = e.target;
    setPrompt(value);
  };

  const openai = new OpenAI({
    apiKey: open_ai_apiKey,
    dangerouslyAllowBrowser: true,
  });

  const debounce = (
    func: DebounceFunction,
    delay: number,
    condition: boolean
  ) => {
    let timeoutId: NodeJS.Timeout;

    return function (this: any, ...args: any[]) {
      if (condition) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
      }
    };
  };

  // Debounced function
  const debouncedButtonClick = debounce(main, 1000, true);

  async function main() {
    try {
      setIsLoading(true);
      // Send request to OpenAI
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Choose the engine appropriate for your needs
        messages: [
          {
            role: "user",
            content: `Generate a quiz with 10 questions, each question should have 3 options one of them is the correct answer. Indicate the quesion title, options and correct answer. This is the topic:${prompt}`,
          },
        ],
        temperature: 0,
        // max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      if (response?.choices) {
        setIsLoading(false);
      }

      // Format response as JSON
      const formattedQuiz = parseQuestions(
        response?.choices[0]?.message?.content || ""
      );

      const transformedQuiz = transformQuestions(formattedQuiz);

      transformedQuiz && createAIGeneratedQuestions(transformedQuiz);
    } catch (error) {
      console.error("Error generating quiz:", error);
      setIsLoading(false);
    }
  }

  // Format response as JSON
  const parseQuestions = (questionsString: string): Question[] => {
    return questionsString.split("\n\n").map((question, index) => {
      const [questionText, optionsAndCorrectAnswerText] =
        question.split("\nCorrect Answer:");

      // const questionNumber = parseInt(questionText.match(/\d+/)![0]);
      const questionNumberMatch = questionText.match(/^\d+/);
      const questionNumber = questionNumberMatch
        ? parseInt(questionNumberMatch[0])
        : -1; // Or any default value you prefer
      const [questionContent, optionsText] = questionText.split("\nOptions:");

      const options = optionsText ? optionsText.split("\n").slice(1) : [];
      const correctAnswer = optionsAndCorrectAnswerText
        ? optionsAndCorrectAnswerText.trim()
        : "";

      return {
        questionNumber,
        questionContent,
        options,
        correctAnswer,
      };
    });
  };

  const transformQuestions = (questions: Question[]): any[] => {
    return questions.map((question) => {
      console.log("question", question);

      return {
        question: question.questionContent,
        type: "MULTI_CHOICE",
        multichoiceOptions: question.options,
        answer: question.correctAnswer,
      };
    });
  };

  const createAIGeneratedQuestions = (questionSetsArray: any[]) => {
    questionSetsArray.forEach((questionSet, index) => {
      console.log("index", index);

      addQuestion({
        deckId: id,
        payload: questionSet,
      })
        .unwrap()
        .then((res: any) => {
          dispatch(deckActions.addADeckQuestion(res?.data));
        })
        .catch((err) => {
          console.log(err);
        });
    });

    setClose();
    // navigate(`/deck/create/ai/${id}`);
  };

  return (
    <Modal open={open} width={"652px"}>
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div
          style={{
            boxShadow: "0px 2px 3px 0px #D6E4FD",
          }}
          className="bg-white border border-[#D6E4FD] rounded-[1rem] px-[2.5rem] py-[3.125rem]"
        >
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold">
              Generate deck questions with AI
            </h2>
          </div>
          <p className="mb-5">
            This will generate 10 MultipleChoice questions with their answers.
            <br />
            Describe the topic that the questions should be generated below:{" "}
          </p>
          <Input.Textarea
            title={"Quiz Description"}
            name="description"
            placeholder={
              "Describe the topic that the questions should be generated. Example: The quiz is for an introductory algebra class. The lesson quiz should cover the distributive law, in particular how it works in simple cases involving mixes of positive and negative numbers."
            }
            className="rounded-md mb-5 min-h-[100px] bg-[#FAFAFF]"
            autoComplete="off"
            minLength={12}
            onChange={(e: any) => handleChange(e)}
          />

          <div className="flex mt-4 items-center gap-5">
            <Button.Primary
              title={"Generate Questions"}
              className="mt-4"
              loading={isLoading}
              onClick={debouncedButtonClick}
            />
            <Button.Secondary
              title={"Cancel"}
              className="mt-4"
              onClick={() => setClose()}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
