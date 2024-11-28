// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import Dropzone from "react-dropzone";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import CloseIcon from "@mui/icons-material/Close";
// import InfoIcon from "@mui/icons-material/Info";
// import DateRangeIcon from "@mui/icons-material/DateRange";
// import TextFieldsIcon from "@mui/icons-material/TextFields";
// import DescriptionIcon from "@mui/icons-material/Description";
// import { toast } from "react-hot-toast";
// import useVideoStore from "../../store/videoStore";

// export const UploadForm = ({ onClose }) => {
//   const [videoPreview, setVideoPreview] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
//   const uploadVideo = useVideoStore((state) => state.uploadVideo); // Access uploadVideo
//   const { register, handleSubmit, reset, setValue } = useForm();

//   const handleDrop = (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     if (file) {
//       setVideoPreview(URL.createObjectURL(file));
//       setValue("file", file);
//     }
//   };

//   const onSubmit = async (data) => {
//     const { filename, expiryDate, brand } = data;
//     const file = data.file[0];

//     if (!file || !filename || !expiryDate || !brand) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("filename", filename);
//       formData.append("expiryDate", expiryDate);
//       formData.append("brand", brand);

//       await uploadVideo(formData, setUploadProgress);
//       // toast.success("Video uploaded successfully!");
//       reset();
//       setVideoPreview(null);
//       // onClose();
//     } catch (error) {
//       console.error("Error uploading video:", error);
//       toast.error("Failed to upload video.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 mt-10 flex items-start justify-center bg-black bg-opacity-50 overflow-auto">
//       <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-lg shadow-lg w-full max-w-lg p-8 relative text-white">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-white hover:text-gray-200"
//         >
//           <CloseIcon fontSize="large" />
//         </button>

//         <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2 text-white">
//           <CloudUploadIcon fontSize="large" />
//           Upload Video
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <Dropzone
//             onDrop={(acceptedFiles) => {
//               handleDrop(acceptedFiles);
//               setValue("file", acceptedFiles);
//             }}
//             accept="video/*"
//           >
//             {({ getRootProps, getInputProps }) => (
//               <div
//                 {...getRootProps()}
//                 className="border-4 border-dashed border-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-8 text-center rounded-md cursor-pointer bg-white bg-opacity-20 hover:bg-opacity-30 transition"
//               >
//                 <input {...getInputProps()} />
//                 {videoPreview ? (
//                   <video
//                     src={videoPreview}
//                     controls
//                     className="w-full h-40 mt-4 rounded-md shadow-lg"
//                   />
//                 ) : (
//                   <p className="flex flex-col items-center gap-4 text-white">
//                     <CloudUploadIcon fontSize="large" />
//                     <span>Drag & drop a video here, or click to select</span>
//                   </p>
//                 )}
//               </div>
//             )}
//           </Dropzone>

//           {/* <input
//             type="text"
//             {...register("filename", { required: true })}
//             className="w-full border-2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
//             placeholder="Enter file name"
//           />

//           <input
//             type="text"
//             {...register("brand", { required: true })}
//             className="w-full border-2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
//             placeholder="Enter brand name"
//           />

//           <input
//             type="date"
//             {...register("expiryDate", { required: true })}
//             className="w-full border-2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
//           /> */}

//           {/* Filename */}
//           <div className="flex items-center gap-2">
//             <TextFieldsIcon />
//             <label className="text-lg font-medium text-white">File Name</label>
//           </div>
//           <input
//             type="text"
//             {...register("filename", { required: true })}
//             className="w-full border-2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
//             placeholder="Enter file name"
//           />

//           {/* Brand */}
//           <div className="flex items-center gap-2">
//             <InfoIcon />
//             <label className="text-lg font-medium text-white">Brand</label>
//           </div>
//           <input
//             type="text"
//             {...register("brand", { required: true })}
//             className="w-full border-2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
//             placeholder="Enter brand name"
//           />

//           {/* Description */}
//           <div className="flex items-center gap-2">
//             <DescriptionIcon />
//             <label className="text-lg font-medium text-white">
//               Description
//             </label>
//           </div>
//           <textarea
//             {...register("description")}
//             className="w-full border-2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 text-black"
//             placeholder="Enter file description"
//           />

//           {/* Expiry Date */}
//           <div className="flex items-center gap-2">
//             <DateRangeIcon />
//             <label className="text-lg font-medium text-white">
//               Expiry Date
//             </label>
//           </div>
//           <input
//             type="date"
//             {...register("expiryDate", { required: true })}
//             className="w-full border-2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
//           />

//           {/* Upload Progress */}
//           {uploadProgress > 0 && (
//             <div className="w-full bg-gray-300 h-2 rounded-full mt-4">
//               <div
//                 className="bg-blue-500 h-2 rounded-full"
//                 style={{ width: `${uploadProgress}%` }}
//               ></div>
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-teal-400 via-green-500 to-blue-600 py-3 rounded-md hover:from-teal-500 hover:to-blue-700 transition text-lg font-semibold shadow-lg flex items-center justify-center gap-2"
//           >
//             <CloudUploadIcon />
//             Upload Video
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Dropzone from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import DateRangeIcon from "@mui/icons-material/DateRange";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import DescriptionIcon from "@mui/icons-material/Description";
import { toast } from "react-hot-toast";
import useVideoStore from "../../store/videoStore";

export const UploadForm = ({ onClose }) => {
  const [videoPreview, setVideoPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
  const [isUploading, setIsUploading] = useState(false); // Track upload state
  const uploadVideo = useVideoStore((state) => state.uploadVideo); // Access uploadVideo
  const { register, handleSubmit, reset, setValue } = useForm();

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setVideoPreview(URL.createObjectURL(file));
      setValue("file", file);
    }
  };

  const onSubmit = async (data) => {
    const { filename, expiryDate, brand } = data;
    const file = data.file[0];

    if (!file || !filename || !expiryDate || !brand) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsUploading(true); // Set upload state to true
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", filename);
      formData.append("expiryDate", expiryDate);
      formData.append("brand", brand);

      await uploadVideo(formData, setUploadProgress);
      reset();
      setVideoPreview(null);
      setUploadProgress(0);
      onClose();
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Failed to upload video.");
    } finally {
      setIsUploading(false); // Reset upload state
    }
  };

  return (
    <div className="fixed inset-0 z-50 mt-10 flex items-start justify-center bg-black bg-opacity-50 overflow-auto">
      <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-lg shadow-lg w-full max-w-lg p-8 relative text-white">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-gray-200"
        >
          <CloseIcon fontSize="large" />
        </button>

        <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2 text-white">
          <CloudUploadIcon fontSize="large" />
          Upload Video
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Dropzone
            onDrop={(acceptedFiles) => {
              handleDrop(acceptedFiles);
              setValue("file", acceptedFiles);
            }}
            accept="video/*"
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="border-4 border-dashed border-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-8 text-center rounded-md cursor-pointer bg-white bg-opacity-20 hover:bg-opacity-30 transition"
              >
                <input {...getInputProps()} />
                {videoPreview ? (
                  <video
                    src={videoPreview}
                    controls
                    className="w-full h-40 mt-4 rounded-md shadow-lg"
                  />
                ) : (
                  <p className="flex flex-col items-center gap-4 text-white">
                    <CloudUploadIcon fontSize="large" />
                    <span>Drag & drop a video here, or click to select</span>
                  </p>
                )}
              </div>
            )}
          </Dropzone>

          {/* Filename */}
          <div className="flex items-center gap-2">
            <TextFieldsIcon />
            <label className="text-lg font-medium text-white">File Name</label>
          </div>
          <input
            type="text"
            {...register("filename", { required: true })}
            className="w-full border-2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            placeholder="Enter file name"
          />

          {/* Brand */}
          <div className="flex items-center gap-2">
            <InfoIcon />
            <label className="text-lg font-medium text-white">Brand</label>
          </div>
          <input
            type="text"
            {...register("brand", { required: true })}
            className="w-full border-2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
            placeholder="Enter brand name"
          />

          {/* Description */}
          <div className="flex items-center gap-2">
            <DescriptionIcon />
            <label className="text-lg font-medium text-white">
              Description
            </label>
          </div>
          <textarea
            {...register("description")}
            className="w-full border-2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 text-black"
            placeholder="Enter file description"
          />

          {/* Expiry Date */}
          <div className="flex items-center gap-2">
            <DateRangeIcon />
            <label className="text-lg font-medium text-white">
              Expiry Date
            </label>
          </div>
          <input
            type="date"
            {...register("expiryDate", { required: true })}
            className="w-full border-2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
          />

          {/* Submit Button */}
          {/* <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-400 via-green-500 to-blue-600 py-3 rounded-md hover:from-teal-500 hover:to-blue-700 transition text-lg font-semibold shadow-lg flex items-center justify-center gap-2"
            disabled={isUploading}
          >
            {isUploading ? (
              <div className="flex items-center gap-2">
                <CloudUploadIcon />
                <span>Uploading... ({uploadProgress}%)</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CloudUploadIcon />
                <span>Upload Video</span>
              </div>
            )}
          </button> */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-400 via-green-500 to-blue-600 py-3 rounded-md hover:from-teal-500 hover:to-blue-700 transition text-lg font-semibold shadow-lg relative overflow-hidden flex items-center justify-center gap-2"
            disabled={isUploading}
          >
            {/* Progress Bar (as a background layer) */}
            {isUploading && (
              <div
                className="absolute inset-0 bg-blue-500 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            )}

            {/* Button Content */}
            <div className="relative z-10 flex items-center gap-2">
              <CloudUploadIcon />
              <span>
                {isUploading
                  ? `Uploading... (${uploadProgress}%)`
                  : "Upload Video"}
              </span>
            </div>
          </button>

          {/* Helper Text */}
          {isUploading && (
            <p className="text-sm text-gray-200 mt-2 text-center">
              It may take a few minutes, depending on your file size and network
              speed.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
