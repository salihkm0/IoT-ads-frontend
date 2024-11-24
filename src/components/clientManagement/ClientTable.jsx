import React from "react";
import InfoIcon from "@mui/icons-material/Info"; // Details icon
import EditIcon from "@mui/icons-material/Edit"; // Edit icon
import DeleteIcon from "@mui/icons-material/Delete"; // Delete icon

export const ClientTable = ({ clients }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="table-auto border-collapse border border-gray-200 w-full bg-white">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="border px-4 py-2">RPI Name</th>
            {/* <th className="border px-4 py-2">RPI Server Url</th> */}
            {/* <th className="border px-4 py-2">WiFi SSID</th> */}
            {/* <th className="border px-4 py-2">WiFi Password</th> */}
            {/* <th className="border px-4 py-2">Vehicle No</th> */}
            <th className="border px-4 py-2">Owner Name</th>
            <th className="border px-4 py-2">Owner Phone</th>
            <th className="border px-4 py-2">Location</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 transition-colors`}
            >
              <td className="border px-4 py-2 text-gray-800">{client.rpi_name}</td>
              {/* <td className="border px-4 py-2 text-gray-800">{client.rpi_serverUrl}</td> */}
              {/* <td className="border px-4 py-2 text-gray-800">{client.wifi_ssid}</td> */}
              {/* <td className="border px-4 py-2 text-gray-800">
                {client.wifi_password}
              </td> */}
              {/* <td className="border px-4 py-2 text-gray-800">{client.vehicle_no}</td> */}
              <td className="border px-4 py-2 text-gray-800">{client.owner_name}</td>
              <td className="border px-4 py-2 text-gray-800">{client.owner_phone}</td>
              <td className="border px-4 py-2 text-gray-800">{client.location}</td>
              <td className="border px-4 py-2 text-gray-800">{client.rpi_status}</td>
              <td className=" px-4 py-2 flex justify-center gap-2 items-center h-full">
                {/* Details Button */}
                <button
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                  title="View Details"
                >
                  <InfoIcon />
                </button>
                {/* Edit Button */}
                <button
                  className="text-yellow-500 hover:text-yellow-700 transition-colors"
                  title="Edit"
                >
                  <EditIcon />
                </button>
                {/* Delete Button */}
                <button
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Delete"
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
