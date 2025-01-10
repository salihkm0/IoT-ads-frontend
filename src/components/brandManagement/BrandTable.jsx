export const BrandTable = ({ brands, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-md">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Logo</th>
            <th className="py-2 px-4 text-left">Brand Name</th>
            <th className="py-2 px-4 text-left">Phone</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Address</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand._id} className="border-t">
              <td className="py-2 px-4">
                {brand.logo && (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                )}
              </td>
              <td className="py-2 px-4">{brand.name}</td>
              <td className="py-2 px-4">{brand.phone}</td>
              <td className="py-2 px-4">{brand.email}</td>
              <td className="py-2 px-4">{brand.address}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => onEdit(brand)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(brand._id)}
                  className="text-red-500 hover:underline ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
