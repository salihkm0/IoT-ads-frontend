// import React from "react";
// import { useForm } from "react-hook-form";
// import CloseIcon from "@mui/icons-material/Close";
// import { toast } from "react-hot-toast";

// export const ClientAddForm = ({onClose}) => {

//   const { register, handleSubmit, reset } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       console.log("Data: ", data);
//     } catch (error) {
//       console.error("Error adding client:", error);
//       toast.error("Failed to add client.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-md shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
//         >
//           <CloseIcon />
//         </button>

//         {/* Form */}
//         <h2 className="text-xl font-bold mb-4">Add New Client</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* RPI Id */}
//           <div>
//             <label className="block text-sm font-medium mb-1">RPI Id</label>
//             <input
//               type="text"
//               {...register("rpi_id", { required: true })}
//               className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter RPI Id"
//             />
//           </div>

//           {/* RPI Name */}
//           <div>
//             <label className="block text-sm font-medium mb-1">RPI Name</label>
//             <input
//               type="text"
//               {...register("rpi_name", { required: true })}
//               className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter RPI Name"
//             />
//           </div>

//           {/* Vehicle Number */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Vehicle Number
//             </label>
//             <input
//               type="text"
//               {...register("vehicle_no", { required: true })}
//               className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter Vehicle Number"
//             />
//           </div>

//           {/* Owner Name */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Owner Name</label>
//             <input
//               type="text"
//               {...register("owner_name", { required: true })}
//               className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter Owner Name"
//             />
//           </div>

//           {/* Owner Phone */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Owner Phone
//             </label>
//             <input
//               type="text"
//               {...register("owner_phone", { required: true })}
//               className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter Owner Phone"
//             />
//           </div>

//           {/* Location */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Location</label>
//             <input
//               type="text"
//               {...register("location", { required: true })}
//               className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter Location"
//             />
//           </div>

//           {/* Wifi SSID */}
//           <div>
//             <label className="block text-sm font-medium mb-1">WiFi SSID</label>
//             <input
//               type="text"
//               {...register("wifi_ssid", { required: true })}
//               className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter WiFi SSID"
//             />
//           </div>

//           {/* Wifi Password */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               WiFi Password
//             </label>
//             <input
//               type="text"
//               {...register("wifi_password", { required: true })}
//               className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter WiFi Password"
//             />
//           </div>

//           {/* Status */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Status</label>
//             <select
//               {...register("rpi_status", { required: true })}
//               className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="active">Active</option>
//               <option value="in_active">Inactive</option>
//             </select>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//           >
//             Add Client
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

import React from "react";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-hot-toast";

export const ClientAddForm = ({ onClose, createRpi }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const {
      rpi_id,
      rpi_name,
      vehicle_no,
      owner_name,
      owner_phone,
      location,
      wifi_ssid,
      wifi_password,
    } = data;

    // console.log("data: " + JSON.stringify(data));
    if (
      !rpi_id ||
      !rpi_name ||
      !vehicle_no ||
      !owner_name ||
      !owner_phone ||
      !location
    ) {
      toast.success(
        "Please Fill required Fields. RPI Id,RPI Name,Vehicle Number,Owner Name,Owner Phone,Location"
      );
    }
    const formData = new FormData();
    formData.append("rpi_id", rpi_id);
    formData.append("rpi_name", rpi_name);
    formData.append("vehicle_no", vehicle_no);
    formData.append("owner_name", owner_name);
    formData.append("owner_phone", owner_phone);
    formData.append("location", location);
    formData.append("wifi_ssid", wifi_ssid);
    formData.append("wifi_password", wifi_password);
    try {
      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }      
      await createRpi(formData);
      reset();
      // onClose();
    } catch (error) {
      console.error("Error adding client:", error);
      toast.error("Failed to add client.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
        >
          <CloseIcon fontSize="large" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Add New Client
          </h2>
          <p className="text-gray-500">
            Fill in the details to register a client
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Input Fields */}
          {[
            {
              label: "RPI Id",
              name: "rpi_id",
              placeholder: "Enter RPI Id",
              required: true,
            },
            {
              label: "RPI Name",
              name: "rpi_name",
              placeholder: "Enter RPI Name",
              required: true,
            },
            {
              label: "Vehicle Number",
              name: "vehicle_no",
              placeholder: "Enter Vehicle Number",
              required: true,
            },
            {
              label: "Owner Name",
              name: "owner_name",
              placeholder: "Enter Owner Name",
              required: true,
            },
            {
              label: "Owner Phone",
              name: "owner_phone",
              placeholder: "Enter Owner Phone",
              required: true,
            },
            {
              label: "Location",
              name: "location",
              placeholder: "Enter Location",
              required: true,
            },
            {
              label: "WiFi SSID",
              name: "wifi_ssid",
              placeholder: "Enter WiFi SSID",
              required: false,
            },
            {
              label: "WiFi Password",
              name: "wifi_password",
              placeholder: "Enter WiFi Password",
              required: false,
            },
          ].map(({ label, name, placeholder, required }) => (
            <div key={name} className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type="text"
                {...register(name, { required })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                placeholder={placeholder}
              />
              {label === "Owner Phone" && (
                <span className="absolute top-2 right-3 text-teal-400 text-xs">
                  +91
                </span>
              )}
            </div>
          ))}

          {/* Status */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              {...register("rpi_status", { required: true })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            >
              <option value="active">Active</option>
              <option value="in_active">Inactive</option>
            </select>
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 rounded-lg shadow-md text-lg font-medium hover:from-green-600 hover:to-teal-700 hover:shadow-lg transition-all transform hover:scale-105"
          >
            Add Client
          </button>
        </form>
      </div>
    </div>
  );
};
