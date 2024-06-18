import React from "react";
import MultipleChoice from "./MultipleChoice";
import QNA from "./QNA";

type Props = {
  data: any;
  answers: any;
  setAnswers: any;
  activeQuestion: number;
  handleSubmit: (e:any) => void;
  handleStartTimer: () => void;
  setActiveQuestion: React.Dispatch<React.SetStateAction<number>>;
};

const QuizQuestionType = ({
  data,
  answers,
  setAnswers,
  activeQuestion,
  handleSubmit,
  handleStartTimer,
  setActiveQuestion,
}: Props) => {
  return (
    <>
      {data?.[activeQuestion] &&
      data?.[activeQuestion]?.type === "MULTI_CHOICE" ? (
        <MultipleChoice
          data={data ? data : []}
          activeQuestion={activeQuestion}
          setActiveQuestion={setActiveQuestion}
          answers={answers}
          setAnswers={setAnswers}
          handleSubmit={handleSubmit}
        />
      ) : data?.[activeQuestion] && data?.[activeQuestion]?.type === "QNA" ? (
        <QNA
          data={data ? data : []}
          activeQuestion={activeQuestion}
          setActiveQuestion={setActiveQuestion}
          answers={answers}
          setAnswers={setAnswers}
          handleSubmit={handleSubmit}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default QuizQuestionType;
