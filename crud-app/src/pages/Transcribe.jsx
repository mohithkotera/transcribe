import React, { useState } from "react";
import axios from "axios";
import upload from "../assets/images/upload.png";
import { toast } from "react-toastify";
import { BsArrowRepeat } from "react-icons/bs";
import { MdOutlineContentCopy, MdOutlineFileDownload } from "react-icons/md";
import { BeatLoader } from "react-spinners";
const Transcribe = () => {
  const [audio, setAudio] = useState();
  const [play, setPlay] = useState();
  const [file, setFile] = useState();
  const [response, setResponse] = useState(null);
  const [isloading, setIsloding] = useState(false);

  const onSelectFile = (event) => {
    const selectedFile = event.target.files[0];
    setAudio(selectedFile);
    setFile(selectedFile.name);
    const supportedExtensions = [
      ".mp3",
      ".mp4",
      ".mpeg",
      ".mpga",
      ".m4a",
      ".wav",
      ".webm",
    ];
    const fileExtension = selectedFile.name
      .toLowerCase()
      .substr(selectedFile.name.lastIndexOf("."));
    const maxSize = 25 * 1024 * 1024; // 25 MB (adjust as needed)
    if (
      supportedExtensions.includes(fileExtension) &&
      selectedFile &&
      selectedFile.size <= maxSize
    ) {
      setPlay(URL.createObjectURL(event.target.files[0]));
    } else {
      setAudio(null);
      alert(
        "Please upload a file with a maximum size of 25 MB and format .mp3 .mp4 .mpeg .mpga .m4a .wav .webm"
      );
    }
  };

  const FileUpload = () => {
    setIsloding(true);
    const formdata = new FormData();
    formdata.append("audio", audio);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    if (!audio) {
      setIsloding(false);
      toast.error("Please Upload Audio File", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      axios
        .post("http://localhost:4000/fileupload", formdata, config)
        .then((res) => {
          setTimeout(() => {
            setResponse(res.data);
            setIsloding(false);
          }, 5000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  ////////Copy Text/////////

  const handleCopyText = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        if (text === null) {
          toast.warn("No Transcribed Text", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.success("Text Copied", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch(() => {
        toast.error("Failed To Copy", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  ////////////To download text file/////////

  const downloadTxtFile = (text) => {
    if (text === null) {
      toast.warn("No Transcribed Text", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.success("Text Downloaded", {
        position: toast.POSITION.TOP_RIGHT,
      });

      const textToWrite = text;
      const blob = new Blob([textToWrite], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "textfile.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };
  return (
    <div className="py-20 grid grid-cols-2">
      <div className="col-span-1 mx-40">
        <div className="box-shadow  rounded-lg px-4 py-6 space-y-6">
          <div className="flex justify-center">
            <img src={upload} />
          </div>
          <div className="flex justify-center">
            <label
              htmlFor="fileUpload"
              className="bg-[#00ACEE] text-white py-2 px-5  mx-5 rounded-md"
            >
              Upload Audio
            </label>
            <input
              type="file"
              id="fileUpload"
              hidden
              accept=".mp3,.mp4,.mpeg,.mpga,.m4a,.wav,.webm"
              onChange={(e) => onSelectFile(e)}
            />
          </div>
          <div className="text-center break-all px-5">
            Supported Formats: .mp3 .mp4 .mpeg .mpga .m4a .wav .webm"
          </div>
        </div>
        {file && (
          <div>
            <div className="py-2 text-center break-all">{file}</div>
            <div className="flex justify-center">
              <audio src={play} controls />
            </div>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button
            onClick={() => FileUpload()}
            className="bg-[#00ACEE] text-white py-2 w-full rounded-lg flex items-center justify-center gap-x-3"
          >
            {isloading ? null : <BsArrowRepeat />}

            {isloading ? <BeatLoader color="white" /> : " Transcribe"}
          </button>
        </div>
      </div>
      <div className="col-span-1 mx-8">
        <div className="box-shadow rounded-lg px-4 py-6 space-y-6">
          {response ? (
            <div className="flex flex-col">
              <span className="text-center text-lg font-bold pb-1">
                Transcribed Text
              </span>
              <span className="text-base font-medium text-justify">
                {response}
              </span>
            </div>
          ) : (
            <div className="flex flex-col">
              <span className="text-center text-lg font-bold">
                No transcript yet
              </span>
              <span className="text-center text-sm font-bold">
                To view the transcript, please upload the audio file.
              </span>
            </div>
          )}
        </div>
        <div className="flex justify-end px-5 py-4 gap-x-4 items-center">
          <MdOutlineContentCopy onClick={() => handleCopyText(response)} />
          <MdOutlineFileDownload
            size={20}
            onClick={() => downloadTxtFile(response)}
          />
        </div>
      </div>
    </div>
  );
};

export default Transcribe;

//   const onSelectFile = (e) => {
//     if (e.target.files[0]) {
//       setAudio(URL.createObjectURL(e.target.files[0]));
//     }
//   };

//   function onSelectFile(e) {
//     if (e.target.files && e.target.files.length > 0) {
//       const reader = new FileReader();
//       reader.addEventListener("load", () => setAudio(reader.result));
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   }

//   const onSelectFile = (e) => {
//     setAudio(e.target.files[0]);
//   };
