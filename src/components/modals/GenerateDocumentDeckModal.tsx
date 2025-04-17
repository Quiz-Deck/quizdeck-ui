import React, { useState, useRef } from "react";
import { Modal } from "./index";
import Input from "components/input/Input";
import Button from "components/button/buttons";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import Upload from "../../assets/icons/upload-file.png";
import Spirals from "../../assets/decorations/spirals.svg";
import Question from "../../assets/decorations/question-mark.png";
import axios from "axios";
import { _getUser } from "../../utils/Auth";

interface Props {
  open: boolean;
  setClose: () => void;
}

export const GenerateDocumentDeckModal = ({ open, setClose }: Props) => {
  const user = _getUser();

  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      // setPdfFile(URL.createObjectURL(file));
      setPdfFile(file);
      setFileName(file?.name);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      // setPdfFile(URL.createObjectURL(file));
      setPdfFile(file);
      setFileName(file?.name);
    }
  };
  console.log("pdfFile", pdfFile);

  const handleRemovePdf = () => {
    setPdfFile(null);
    setFileName(null);
  };

  const handleSubmit = async () => {
    const apiUrl = "http://localhost:3000/gemini";
    // Data to be sent in the POST request
    const postData = {
      pdf: pdfFile,
      name: "Physics",
    };
    const config = {
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const response = await axios.post(apiUrl, postData, config);
      console.log("Response data:", response.data);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  return (
    <Modal open={open} width={"652px"}>
      <div className="max-w-[864px] mx-auto px-4 mt-12">
        <div
          style={{
            boxShadow: "0px 2px 3px 0px #D6E4FD",
          }}
          className="relative bg-[#FAFAFA] border border-[#D6E4FD] rounded-[1rem] px-[1rem] md:px-[2.5rem] py-[3.125rem]"
        >
          <button
            type="button"
            onClick={() => setClose()}
            className="absolute right-3 top-4 outline-none"
          >
            <Close className="h-[2rem] w-[2rem] " />
          </button>
          <div className="purple-gradient pt-12 pb-10 px-10 rounded-[30px] mb-8 relative">
            <div className="flex items-end justify-between gap-2">
              <div className="pb-4 text-white lg:w-[75%] ml-2">
                <h2 className="text-[2rem] mb-3">Create deck from document</h2>
                <p className="text-lg">
                  Lorem ipsum dolor sit amet consectetur. Sed libero tellus
                  ornare est nLorem ipsum dolor sit amet consectetu.
                </p>
              </div>
              <img
                src={Question}
                alt="design"
                className="h-130px] w-[130px] "
              />
            </div>
            <img
              src={Spirals}
              alt="design"
              className="absolute left-4 bottom-4"
            />
          </div>

          {!pdfFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`${
                dragActive ? "bg-primary100" : "bg-white"
              } border border-dashed border-[#C1A8F9] rounded-[20px] py-10`}
            >
              <div className="flex flex-col items-center justify-center text-center gap-1">
                <img src={Upload} alt="upload" className="h-[40px] w-[40px]" />
                <p className="text-[#1E1E21]">Drag your document here </p>
                <p className="text-[#84848E]">or </p>
                <div className="flex items-center justify-center gap-4 my-3">
                  <Button.Primary
                    title={"Upload from device"}
                    className="px-5"
                    style={{ borderRadius: "30px" }}
                    // disabled={isLoading}
                    // loading={isLoading}
                    onClick={handleButtonClick}
                  />
                  <Button.Primary
                    title={"Import from drive"}
                    className="px-5"
                    style={{ borderRadius: "30px" }}
                    // disabled={isLoading}
                    // loading={isLoading}
                    // onClick={handleSubmit}
                  />
                  <input
                    type="file"
                    accept="application/pdf"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                    ref={fileInputRef}
                  />
                </div>
                <p className="text-[#84848E]">Maximum file size: 50MB </p>
              </div>
            </div>
          ) : (
            <div>
              {/* User has uploaded image */}
              <div className="relative flex items-center gap-2 bg-white border border-dashed border-[#C1A8F9] rounded-[20px] py-8 px-4 sm:px-8 mb-5">
                <img src={Upload} alt="upload" className="h-[40px] w-[40px]" />
                <p>{fileName}</p>
                <button
                  type="button"
                  onClick={() => handleRemovePdf()}
                  className="absolute right-3 top-4 outline-none"
                >
                  <Close className="h-[1.5rem] w-[1.5rem] " />
                </button>
              </div>
              <Input.Label
                title={"Number of Questions"}
                name="title"
                placeholder={"Enter number of questions"}
                className="rounded-[20px] mb-5 bg-[#FAFAFF]"
                autoComplete="off"
                // onChange={(e: any) => handleChange(e)}
              />
              <Button.Primary
                title={"Generate Question"}
                className="px-5"
                style={{ borderRadius: "30px" }}
                // disabled={isLoading}
                // loading={isLoading}
                onClick={handleSubmit}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
