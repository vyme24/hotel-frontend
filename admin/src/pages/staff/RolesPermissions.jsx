import { useState, useEffect } from "react";
import { useGetRolesQuery, useUpdateRoleMutation } from "../../services/roleService"; 
import { toast, Toaster } from "react-hot-toast";

const RolesPermissions = () => {
  const { data, isLoading, isError, refetch } = useGetRolesQuery();
  const [updateRole] = useUpdateRoleMutation();
  const [roles, setRoles] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (data?.data) {
      setRoles(data.data);
    }
  }, [data]);





  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500 text-lg">Loading roles...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-2xl font-semibold">Failed to load roles</div>
          <p className="text-gray-600">Please try again later or contact support.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const allPermissions = ["Full Access", "Bookings", "Rooms", "Check-in / Check-out", "Room Status"];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Toaster position="top-center" />

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Roles & Permissions</h1>
            <p className="mt-2 text-sm text-gray-600">Manage user roles and their permissions</p>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            {editing ? "Cancel Edit" : "Edit Permissions"}
          </button>
        </div>

        {/* Roles List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            {roles.map((role) => (
              <div key={role._id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                  <span className="text-sm text-gray-500">
                    {role.permissions.join(", ")}
                  </span>
                </div>

                {editing && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {allPermissions.map((permission) => (
                      <label key={permission} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={role.permissions.includes(permission)}
                          onChange={(e) => handlePermissionChange(role._id, permission, e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{permission}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {editing && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RolesPermissions;