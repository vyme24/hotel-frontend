import { useGetStaffStatsQuery } from "../../services/staffService";

const Staff = () => {
  const { data, isLoading, isError } = useGetStaffStatsQuery();

  if (isLoading) {
    return <div className="p-6 text-gray-500">Loading staff data...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load staff stats</div>;
  }

  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>

      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-600">
          Manage hotel staff, assign roles, and track attendance.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Total Staff</h3>
            <p className="text-2xl font-bold mt-2">{stats.total}</p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">On Duty</h3>
            <p className="text-2xl font-bold mt-2 text-green-600">
              {stats.onDuty}
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Off Duty</h3>
            <p className="text-2xl font-bold mt-2 text-red-600">
              {stats.offDuty}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;
