
export default function UsersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users Management</h1>
      <p className="text-gray-600 mb-6">
        Here you can manage all registered users of the Tour Management System.
      </p>

      {/* Example table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-6 py-3">1</td>
              <td className="px-6 py-3">John Doe</td>
              <td className="px-6 py-3">john@example.com</td>
              <td className="px-6 py-3">Admin</td>
              <td className="px-6 py-3">
                <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Edit
                </button>
                <button className="ml-2 px-3 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-6 py-3">2</td>
              <td className="px-6 py-3">Jane Smith</td>
              <td className="px-6 py-3">jane@example.com</td>
              <td className="px-6 py-3">User</td>
              <td className="px-6 py-3">
                <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Edit
                </button>
                <button className="ml-2 px-3 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
