import { Link } from "react-router-dom";
import { useGetAttendanceQuery } from "../../services/staffService";

const StaffAttendance = () => {
  
  const { data, isLoading, isError } = useGetAttendanceQuery();

  if (isLoading) {
    return <div className="p-6 text-gray-500">Loading attendance...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load attendance</div>;
  }

 
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Staff Attendance</h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage and track daily attendance records for all staff members.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">No</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceRecords.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    No attendance records yet.
                  </td>
                </tr>
              ) : (
                attendanceRecords.map((staff, index) => (
                  <tr key={staff._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium">{index + 1}</td>
                    <td className="px-6 py-4">
                      <img
                        src={staff.image || "/images/no-avatar.png"}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-bold">{staff.name}</td>
                    <td className="px-6 py-4 text-sm">{staff.role}</td>
                    <td className="px-6 py-4 text-sm">{staff.date}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          staff.status === "Present"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {staff.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link
                        to={`/staff/attendance/${staff._id}`}
                        className="px-3 py-1 text-xs rounded bg-blue-100 text-blue-700"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffAttendance;
