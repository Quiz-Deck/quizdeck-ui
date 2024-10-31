import React, { useState, useRef } from "react";
import { Modal } from "./index";
import Input from "components/input/Input";
import Button from "components/button/buttons";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import createQuiz from "../../assets/icons/create-quiz1.svg";

interface Props {
  open: boolean;
  setClose: () => void;
}

export const AddVideoModal = ({ open, setClose }: Props) => {
  const [youtubeLink, setYoutubeLink] = useState<string | null>(null);
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleYoutubeLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    if (youtubeRegex.test(link)) {
      setYoutubeLink(link);
      setUploadedVideo(null); // Clear the uploaded video if a YouTube link is provided
    } else {
      alert("Please enter a valid YouTube link.");
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedVideo(URL.createObjectURL(file));
      setYoutubeLink(null); // Clear the YouTube link if a video file is uploaded
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const getYoutubeEmbedLink = (link: string) => {
    const videoId = link.split("v=")[1] || link.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };
  return (
    <Modal open={open} width={"652px"}>
      <div className="max-w-[864px] mx-auto px-4 mt-12">
        <div
          style={{
            boxShadow: "0px 2px 3px 0px #D6E4FD",
          }}
          className="relative bg-primary100 border border-[#D6E4FD] rounded-[1rem] px-[1rem] md:px-[2.5rem] py-[5rem]"
        >
          <button
            type="button"
            onClick={() => setClose()}
            className="absolute right-3 top-4 outline-none"
          >
            <Close className="h-[2rem] w-[2rem] " />
          </button>

          <div className="max-w-[718px] mx-auto">
            <div className="flex items-center justify-center gap-5 mb-12">
              <img src={createQuiz} alt="icon" className="w-[92px] h-[92px] " />
              <div className="text-left">
                <h2 className="text-primary font-bold text-[40px]">
                  Add Video
                </h2>
                <p className="text-[1rem] text-[#1E1E21] ">
                  Lorem ipsum dolor sit amet consectetur. Sed libero
                </p>
              </div>
            </div>

            <div className="bg-white border border-dashed border-[#C1A8F9] py-4 rounded-[20px]">
              <div className="flex flex-col gap-3 items-center justify-center min-h-[300px]">
                {youtubeLink || uploadedVideo ? (
                  <div className="relative w-full max-w-[718px] mx-auto">
                    {/* Video Preview */}
                    <div className="flex items-center justify-center px-3">
                      {youtubeLink ? (
                        <iframe
                          width="560"
                          height="315"
                          src={getYoutubeEmbedLink(youtubeLink)}
                          title="YouTube video"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : uploadedVideo ? (
                        <video controls width="100%">
                          <source src={uploadedVideo} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <p>No video selected.</p>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setYoutubeLink(null);
                          setUploadedVideo(null);
                        }}
                        className="absolute right-3 top-4 outline-none"
                      >
                        <Close className="h-[2rem] w-[2rem] " />
                      </button>
                    </div>

                    <div className="flex items-center justify-center my-3">
                      <Button.Primary
                        title={"Save"}
                        className="rounded-full px-8"
                        style={{ borderRadius: "50px" }}
                        onClick={() => {}}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="max-w-[560px] max-w-auto w-full">
                      <h3>Paste a link here</h3>

                      {/* YouTube Link Input */}
                      <Input.Label
                        title={""}
                        name="title"
                        placeholder={
                          "Enter any video link, e.g youtube. google drive"
                        }
                        className="rounded-md mb-1 bg-[#FAFAFF]"
                        autoComplete="off"
                        // onBlur={handleYoutubeLinkChange}
                        onChange={handleYoutubeLinkChange}
                      />
                    </div>

                    <p>or </p>

                    {/* Upload Video Button */}
                    <div>
                      <Button.Primary
                        title={"Upload from device"}
                        className="rounded-full px-5"
                        style={{ borderRadius: "50px" }}
                        onClick={handleButtonClick}
                      />

                      <input
                        type="file"
                        accept="video/*"
                        ref={fileInputRef}
                        onChange={handleVideoUpload}
                        className="hidden"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
