import React, { useState, useRef } from "react";
import { Modal } from "./index";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import createQuiz from "../../assets/icons/create-quiz1.svg";
import audio from "../../assets/icons/audio.png";
import Button from "components/button/buttons";

interface Props {
  open: boolean;
  setClose: () => void;
}

export const AddAudioModal = ({ open, setClose }: Props) => {
  const [audioFile, setAudioFile] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(URL.createObjectURL(file));
    }
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setAudioStream(stream);
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/mp3",
      });
      setAudioFile(URL.createObjectURL(audioBlob));
      setAudioStream(null);
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    audioStream?.getTracks().forEach((track) => track.stop());
    setIsRecording(false);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
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
                  Add Audio
                </h2>
                <p className="text-[1rem] text-[#1E1E21] ">
                  Lorem ipsum dolor sit amet consectetur. Sed libero
                </p>
              </div>
            </div>

            <div className="bg-white border border-dashed border-[#C1A8F9] py-4 rounded-[20px]">
              {audioFile ? (
                <div className="relative flex flex-col gap-3 items-center justify-center min-h-[300px]">
                  <img src={audio} alt="audio" onClick={startRecording} />

                  <div className="py-2">
                    <audio controls src={audioFile} />
                  </div>

                  <button
                    type="button"
                    onClick={() => setAudioFile(null)}
                    className="absolute right-3 top-1 outline-none"
                  >
                    <Close className="h-[1rem] w-[1rem] " />
                  </button>

                  <Button.Primary
                    title={"Save"}
                    className="rounded-full px-8"
                    style={{ borderRadius: "50px" }}
                    onClick={() => {}}
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-2 items-center justify-center min-h-[300px]">
                  {isRecording ? (
                    <button
                      onClick={stopRecording}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "4px",
                      }}
                    >
                      Stop Recording
                    </button>
                  ) : (
                    <img src={audio} alt="audio" onClick={startRecording} />
                  )}

                  <p>Click to record </p>
                  <p>not more than 5min </p>
                  <p>or </p>
                  <Button.Secondary
                    title={"Upload mp3"}
                    className="rounded-full px-3"
                    style={{ borderRadius: "50px" }}
                    onClick={handleButtonClick}
                  />
                </div>
              )}

              <div>
                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleAudioUpload}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
