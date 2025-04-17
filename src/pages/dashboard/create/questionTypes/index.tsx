import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
import Input from "components/input/Input";
// import Button from "components/button/buttons";
import Audio from "assets/icons/add-audio.svg";
import Photo from "assets/icons/add-photo.svg";
import Video from "assets/icons/add-video.svg";
import EditQNA from "pages/dashboard/editQuestionTypes/EditQNA";
import EditMultipleChoice from "pages/dashboard/editQuestionTypes/EditMultipleChoice";
import { TrashIcon } from "@heroicons/react/24/outline";
import successHandler from "handlers/successHandler";
import errorHandler from "handlers/errorHandler";
// import ErrorValidation from "pages/common/ErrorValidation";
import { deckActions } from "features/store/deckSlice";
import { AddImageModal } from "components/modals/AddImageModal";
import { AddAudioModal } from "components/modals/AddAudioModal";
import { AddVideoModal } from "components/modals/AddVideoModal";
import { useDeleteQuestionMutation } from "features/api/question/questionApi";
// import { useAddQuestionMutation } from "features/api/question/questionApi";
// import { useEditQuestionMutation } from "features/api/question/questionApi";

// Explicitly import the types for JSX
type CreateQuizProps = {
  question: any;
  index: number;
  deckQuestions: any;
  setDeckQuestions: (e: any) => void;
};

// QDeck{
// 	createdOn: date,
// 	createdBy: string,
// 	updatedOn: date,
// 	updatedBy: string,
// 	type: "MULTI_CHOICE" || "QNA" || "IMAGE" || "AUDIO" || "VIDEO",
// 	question: string,
// 	options: [{key: value}]
// 	image: file,
// 	video: file,
// 	audio: file,
// 	difficulty: "EASY" || "MEDIUM" || "HARD",
// 	file: file //users should be able to upload text files or pdf documents and we would generate questions for them from the file
// 	timer: date //time that user has allocated to be able to answer this question
// 	answer: string [] //This is an array to accomodate for questions with more than one answer
// }

const SingleDeckQuestion: React.FC<CreateQuizProps> = ({
  question,
  index,
  deckQuestions,
  setDeckQuestions,
}) => {
  // const { id } = useParams();
  const dispatch = useDispatch();
  // const [submitted, setSubmitted] = useState(false);
  // const [addQuestion, { isLoading }] = useAddQuestionMutation();
  const [deleteQuestion, { isLoading}] = useDeleteQuestionMutation();

  const [modal, setModal] = useState({ status: false, type: "" });
  const closeModal = () => {
    setModal({ status: false, type: "" });
  };

  const openModal = (type: string) => {
    setModal({ status: true, type: type });
  };

  const [data, setData] = useState({
    question: "",
    type: "MULTI_CHOICE",
    multichoiceOptions: [],
    answer: "",
    image: "",
    video: "",
    audio: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setDeckQuestions((deckQuestions: any) =>
      deckQuestions.map((quiz: any, i: number) =>
        i === index ? { ...quiz, [name]: value } : quiz
      )
    );
  };

  const handleSelectOption = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setDeckQuestions((deckQuestions: any) =>
      deckQuestions.map((quiz: any, i: number) =>
        i === index ? { ...quiz, [name]: value } : quiz
      )
    );
  };

  useEffect(() => {
    setData((data: any) => ({
      ...data,
      question: question?.question,
      type: question?.type,
      answer: question?.answer,
    }));
  }, [question]);

  const handleDelete = (id: string) => {
    deleteQuestion(id)
      .unwrap()
      .then((res: any) => {
        successHandler(res, true);
        dispatch(deckActions.deleteADeckQuestion(id));
      })
      .catch((err) => {
        errorHandler(err?.data, true);
      });
  };

  return (
    <div key={question?._id} className="bg-primary rounded-[20px] w-full mb-8">
      <div className="py-3 px-10 flex items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <p className="text-white font-bold">Question {index + 1}.</p>
          <select
            name="type"
            className="bg-[#E0D4FC] rounded-[15px] px-2 py-1 outline-none"
            onChange={handleSelectOption}
          >
            <option value={"MULTI_CHOICE"}>Multiple Question</option>
            <option value={"QNA"}>Open Ended</option>
          </select>
        </div>

        <button
          className={`${isLoading ? "animate-spin" : ""}`}
          onClick={() => handleDelete(question?._id)}
        >
          {isLoading ? (
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <circle
                cy="12"
                cx="12"
                r="10"
                fill="transparent"
                stroke="#d1d5db"
                strokeWidth="2px"
              ></circle>
              <circle
                cy="12"
                cx="12"
                r="10"
                fill="transparent"
                stroke="#116cd6"
                strokeWidth="2px"
                strokeDasharray={30}
              ></circle>
            </svg>
          ) : (
            <TrashIcon className="h-5 w-5 stroke-white" aria-hidden="true" />
          )}
        </button>
      </div>

      <div className="mt-5 py-5 px-10 bg-primary rounded-[20px] w-full">
        <div className="flex gap-3 px-4 pt-3 relative rounded-[20px] bg-[#350B95CC] border border-[#FFFFFF]">
          {data?.image && (
            <div className="max-w-[264px] w-full h-[196px] pb-3">
              {data?.image && (
                <img
                  src={data?.image}
                  alt="Uploaded preview"
                  className="w-full h-full rounded-lg object-cover"
                />
              )}
            </div>
          )}

          <div className="w-full">
            <Input.Textarea
              title={""}
              name="question"
              value={data?.question}
              placeholder="Type your question here..."
              className="mb-0 min-h-[80px] w-full text-[#DCDCDF] bg-[#350B95CC] border-none"
              autoComplete="off"
              minLength={12}
              rows={2}
              onChange={(e: any) => handleChange(e)}
            />
          </div>

          <div className="absolute top-4 right-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => openModal("image")}
                className="bg-[#46209C] w-[26px] h-[23px] rounded-[5px] flex items-center justify-center "
              >
                <img src={Photo} alt="add_image" className="w-[20px] h-[18px]" />
              </button>
              <button
                onClick={() => openModal("video")}
                className="bg-[#46209C] w-[26px] h-[23px] rounded-[5px] flex items-center justify-center "
              >
                <img src={Video} alt="video" className="w-[20px] h-[18px]" />
              </button>
              <button
                onClick={() => openModal("audio")}
                className="bg-[#46209C] w-[26px] h-[23px] rounded-[5px] flex items-center justify-center "
              >
                <img src={Audio} alt="audio" className="w-[20px] h-[18px]" />
              </button>
            </div>
          </div>
        </div>

        {/* {submitted && data?.question === "" && (
          <ErrorValidation message="Question is required" />
        )} */}

        {question?.type === "MULTI_CHOICE" ? (
          <EditMultipleChoice
            question={question}
            data={data}
            setData={setData}
            quiz_index={index}
            deckQuestions={deckQuestions}
            setDeckQuestions={setDeckQuestions}
          />
        ) : question?.type === "QNA" ? (
          <EditQNA
            question={question}
            data={data}
            setData={setData}
            quiz_index={index}
            deckQuestions={deckQuestions}
            setDeckQuestions={setDeckQuestions}
          />
        ) : (
          ""
        )}
      </div>

      {modal.status && modal.type === "image" && (
        <AddImageModal
          open={modal.status}
          setClose={closeModal}
          data={data}
          setData={setData}
        />
      )}
      {modal.status && modal.type === "audio" && (
        <AddAudioModal open={modal.status} setClose={closeModal} />
      )}
      {modal.status && modal.type === "video" && (
        <AddVideoModal open={modal.status} setClose={closeModal} />
      )}
    </div>
  );
};

export default SingleDeckQuestion;
