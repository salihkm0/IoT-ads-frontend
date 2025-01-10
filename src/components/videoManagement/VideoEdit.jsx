// import React, { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import useVideoStore from "../../store/videoStore";

// const VideoEditForm = ({ video, onClose }) => {
//   const { updateVideo } = useVideoStore();
//   const [formData, setFormData] = useState({
//     filename: video.filename || "",
//     description: video.description || "",
//     expiryDate: video.expiryDate ? new Date(video.expiryDate).toISOString().split("T")[0] : "",
//     brand: video.brand || "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await updateVideo(video._id, formData.filename, formData.description, formData.expiryDate, formData.brand);
//       onClose(); // Close the form after success
//     } catch (error) {
//       console.error("Error updating video:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Video</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Filename */}
//           <div className="mb-4">
//             <label htmlFor="filename" className="block text-sm font-medium text-gray-700">
//               Filename
//             </label>
//             <input
//               type="text"
//               id="filename"
//               name="filename"
//               value={formData.filename}
//               onChange={handleInputChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//             //   required
//             />
//           </div>

//           {/* Description */}
//           <div className="mb-4">
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//               Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//               rows="4"
//             //   required
//             ></textarea>
//           </div>

//           {/* Expiry Date */}
//           <div className="mb-4">
//             <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
//               Expiry Date
//             </label>
//             <input
//               type="date"
//               id="expiryDate"
//               name="expiryDate"
//               value={formData.expiryDate}
//               onChange={handleInputChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//             />
//           </div>

//           {/* Brand */}
//           <div className="mb-4">
//             <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
//               Brand
//             </label>
//             <input
//               type="text"
//               id="brand"
//               name="brand"
//               value={formData.brand}
//               onChange={handleInputChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//               required
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end gap-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`px-4 py-2 text-white rounded-md ${
//                 loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
//               }`}
//             >
//               {loading ? "Saving..." : "Save"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VideoEditForm;


import React, { useState, useEffect } from "react";
import useVideoStore from "../../store/videoStore";
import useBrandStore from "../../store/brandStore";

const VideoEditForm = ({ video, onClose }) => {
    const { brands } = useBrandStore();
  const { updateVideo } = useVideoStore();
  const [formData, setFormData] = useState({
    filename: video.filename || "",
    description: video.description || "",
    expiryDate: video.expiryDate
      ? new Date(video.expiryDate).toISOString().split("T")[0]
      : "",
    brand: video.brand || "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateVideo(
        video._id,
        formData.filename,
        formData.description,
        formData.expiryDate,
        formData.brand // Send selected brand ID
      );
      onClose(); // Close the form after success
    } catch (error) {
      console.error("Error updating video:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Video</h2>
        <form onSubmit={handleSubmit}>
          {/* Filename */}
          <div className="mb-4">
            <label htmlFor="filename" className="block text-sm font-medium text-gray-700">
              Filename
            </label>
            <input
              type="text"
              id="filename"
              name="filename"
              value={formData.filename}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              rows="4"
            ></textarea>
          </div>

          {/* Expiry Date */}
          <div className="mb-4">
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Brand */}
          <div className="mb-4">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <select
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            //   required
            >
              <option value="" disabled>
                Select a brand
              </option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 text-white rounded-md ${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoEditForm;
