import React, { useEffect, useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Input from "components/input/Input";
import Button from "components/button/buttons";
import Audio from "assets/icons/add-audio.svg";
import Photo from "assets/icons/add-photo.svg";
import Video from "assets/icons/add-video.svg";
import EditQNA from "pages/dashboard/editQuestionTypes/EditQNA";
import EditMultipleChoice from "pages/dashboard/editQuestionTypes/EditMultipleChoice";
import { TrashIcon } from "@heroicons/react/24/outline";
import successHandler from "handlers/successHandler";
import errorHandler from "handlers/errorHandler";
import ErrorValidation from "pages/common/ErrorValidation";
import { deckActions } from "features/store/deckSlice";
import { AddImageModal } from "components/modals/AddImageModal";
import { AddAudioModal } from "components/modals/AddAudioModal";
import { AddVideoModal } from "components/modals/AddVideoModal";
import { useDeleteQuestionMutation } from "features/api/question/questionApi";
import { useAddQuestionMutation } from "features/api/question/questionApi";
import { useEditQuestionMutation } from "features/api/question/questionApi";

// Explicitly import the types for JSX
type CreateQuizProps = {
  question: any;
  index: number;
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

const SingleDeckQuestion: React.FC<CreateQuizProps> = ({ question, index }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const [editQuestion, { isLoading }] = useEditQuestionMutation();
  // const [addQuestion, { isLoading }] = useAddQuestionMutation();
  const [deleteQuestion, { isLoading: loading }] = useDeleteQuestionMutation();

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

  // const [answerFields, setAnswerFields] = useState(["option 1", "option 2"]);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const [answerFields, setAnswerFields] = useState(
    question?.multichoiceOptions
  );

  useEffect(() => {
    setData((data) => ({
      ...data,
      question: question?.question,
      type: question?.type,
      answer: question?.answer,
    }));
    setAnswerFields(question?.multichoiceOptions);
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

  // const handleSubmit = () => {
  //   const newData = { ...data, multichoiceOptions: answerFields };

  //   if (answerFields?.length < 2) {
  //     errorHandler(
  //       { message: "Multichoice questions should have a minimum of 2 options" },
  //       true
  //     );
  //   } else if (data?.question === "" || data?.answer === "") {
  //     setSubmitted(true);
  //   } else {
  //     addQuestion({
  //       deckId: id,
  //       // payload: { ...data, multichoiceOptions: answerFields },
  //       payload: [newData],
  //     })
  //       .unwrap()
  //       .then((res: any) => {
  //         dispatch(deckActions.addADeckQuestion(res?.data));
  //         setData({
  //           question: "",
  //           type: "MULTI_CHOICE",
  //           multichoiceOptions: [],
  //           answer: "",
  //           image: "",
  //           video: "",
  //           audio: "",
  //         });
  //         setAnswerFields(["option 1", "option 2"]);
  //         successHandler(res, true);
  //         // handleClose();
  //       })
  //       .catch((err) => {
  //         errorHandler(err?.data, true);
  //       });
  //   }
  // };

  const handleSubmit = (e: any) => {
    if (answerFields?.length < 2) {
      errorHandler(
        {
          message: "Multichoice questions should have a minimum of 2 options",
        },
        true
      );
    } else {
      editQuestion({
        deckId: question?._id,
        payload: { ...data, multichoiceOptions: answerFields },
      })
        .unwrap()
        .then((res: any) => {
          successHandler(res, true);
          dispatch(deckActions.editADeckQuestion(res?.data));
        })
        .catch((err) => {
          errorHandler(err?.data || "Something went wrong", true);
        });
    }
  };
  return (
    <div key={question?._id} className="bg-primary rounded-[20px] w-full mb-8">
      <div className="p-5 flex items-center justify-between border-b py-2">
        <div className="flex items-center gap-3">
          <p className="text-white font-bold">Question {index + 1}.</p>
          <select>
            <option>Multiple Question</option>
            <option>Open Ended</option>
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
            <TrashIcon className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>
      <div className="mt-5 p-5 bg-primary rounded-[20px] w-full">
        <div className="flex gap-3 px-4 py-3 relative rounded-[20px] bg-[#350B95CC] border border-[#FFFFFF]">
          {data?.image && (
            <div className="max-w-[264px] w-full h-[196px]">
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
              className="mb-5 min-h-[80px] w-full text-[#DCDCDF] bg-[#350B95CC] border-none"
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
                <img src={Photo} alt="photo" className="w-[20px] h-[18px]" />
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

        {submitted && data?.question === "" && (
          <ErrorValidation message="Question is required" />
        )}

        {question?.type === "MULTI_CHOICE" ? (
          <EditMultipleChoice
            question={question}
            data={data}
            setData={setData}
            handleSubmit={handleSubmit}
          />
        ) : question?.type === "QNA" ? (
          <EditQNA question={question} />
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
