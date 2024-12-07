import { fetchAllRequests } from "@/actions/fetchAdminRequest";

export default async function AdminRequestsPage() {
    const requests = await fetchAllRequests();
  
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Request Information
        </h1>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-gray-600">#</th>
                <th className="px-4 py-2 text-left text-gray-600">User Name</th>
                <th className="px-4 py-2 text-left text-gray-600">
                  Instructor ID
                </th>
                <th className="px-4 py-2 text-left text-gray-600">
                  Test History ID
                </th>
                <th className="px-4 py-2 text-left text-gray-600">Status</th>
                <th className="px-4 py-2 text-left text-gray-600">Created At</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={request.id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{request.user?.name || "Unknown"}</td>
                  <td className="px-4 py-2">{request.instructorId}</td>
                  <td className="px-4 py-2">{request.testHistoryId}</td>
                  <td className="px-4 py-2">{request.status}</td>
                  <td className="px-4 py-2">
                    {new Date(request.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  