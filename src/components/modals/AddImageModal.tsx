import React, { useState } from "react";
import { Modal } from "./index";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import createQuiz from "../../assets/icons/create-quiz1.svg";
import Button from "components/button/buttons";

interface Props {
  open: boolean;
  setClose: () => void;
}

export const AddImageModal = ({ open, setClose }: Props) => {
  const [image, setImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
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
    if (file) {
      setImage(URL.createObjectURL(file));
    }
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
                  Add image
                </h2>
                <p className="text-[1rem] text-[#1E1E21] ">
                  Lorem ipsum dolor sit amet consectetur. Sed libero
                </p>
              </div>
            </div>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`${
                dragActive ? "bg-primary100" : "bg-white"
              } border border-dashed border-[#C1A8F9] py-4 rounded-[20px]`}
            >
              <div className="relative flex flex-col gap-2 items-center justify-center min-h-[300px]">
                {image ? (
                  <>
                    <figure className="p-3 border border-primary400 rounded-lg">
                      <img
                        src={image}
                        alt="Uploaded preview"
                        className="w-full max-h-[300px] rounded-lg"
                      />
                    </figure>

                    <button
                      type="button"
                      onClick={() => setImage(null)}
                      className="absolute right-3 top-1 outline-none"
                    >
                      <Close className="h-[1rem] w-[1rem] " />
                    </button>
                  </>
                ) : (
                  <>
                    <p>Drag your image here </p>
                    <p>or </p>
                    <Button.Primary
                      title={"Upload from device"}
                      className="rounded-full px-5"
                      style={{ borderRadius: "50px" }}
                      onClick={() => {
                        // handleDelete(deck_id);
                      }}
                    />
                    <label
                      style={{
                        display: "inline-block",
                        padding: "10px 20px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Browse
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                      />
                    </label>
                  </>
                )}
              </div>
            </div>

            {image && (
              <div className="flex items-center justify-center mt-8">
                <Button.Primary
                  title={"Save"}
                  className="rounded-full px-5"
                  style={{ borderRadius: "50px" }}
                  onClick={() => {}}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
