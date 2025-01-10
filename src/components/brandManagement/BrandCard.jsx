import { Avatar } from "@mui/material";

export const BrandCard = ({ brand, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-md p-4 m-4 w-72">
      {brand.logo ? (
        <img
          src={brand.logo}
          alt={brand.name}
          className="w-full h-40 object-cover rounded-md"
        />
      ) : (
        <img
          src="https://cdn.vectorstock.com/i/1000v/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg"
          alt={brand.name}
          className="w-full h-40 object-cover rounded-md"
        />
      )}
      <h3 className="text-xl font-semibold mt-2">{brand.name}</h3>
      <p className="text-gray-600 text-sm">{brand.description}</p>
      <p className="text-gray-600 text-sm">Phone: {brand.phone}</p>
      <p className="text-gray-600 text-sm">Email: {brand.email}</p>
      <p className="text-gray-600 text-sm">Address: {brand.address}</p>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => onEdit(brand)}
          className="text-blue-500 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(brand._id)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
