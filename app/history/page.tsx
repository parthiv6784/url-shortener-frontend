"use client";
import { useState, useEffect } from "react";
import { getData } from "../../lib/apiMethods";
import toast from "react-hot-toast";
import { History, PlusCircle, Edit, Trash2, Eye, Filter } from "lucide-react";

interface HistoryItem {
  _id: string;
  action: "CREATED" | "UPDATED" | "DELETED" | "VISITED";
  previousData?: any;
  newData?: any;
  visitCount?: number;
  createdAt: string;
}
export default function HistoryPage() {
   const [history, setHistory] = useState<HistoryItem[]>([]);
  const [filter, setFilter] = useState("all");

  const getHistory = async () => {
    try {
      const data = await getData(`links/hisotryFilter/${filter}`);
      setHistory(data);
    } catch {
      toast.error("Failed to load history");
    }
  };

  useEffect(() => {
    getHistory();
  }, [filter]);
   const created = history.filter((h) => h.action === "CREATED");
  const updated = history.filter((h) => h.action === "UPDATED");
  const deleted = history.filter((h) => h.action === "DELETED");
  const visited = history.filter((h) => h.action === "VISITED");
    return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-900 to-sky-400 p-2 rounded-lg shadow-md">
              <History className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-sky-600 to-sky-400">
                Activity History
              </h1>
              <p className="text-gray-600 text-sm mt-1">Track all your URL activities</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white font-medium text-gray-700"
            >
              <option value="5">Last 5</option>
              <option value="15">Last 15</option>
              <option value="all">All Activities</option>
            </select>
          </div>
        </div>
        <Section title="Created Links" data={created} icon={<PlusCircle className="w-5 h-5" />} color="green">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">New Link</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {created.map((h) => (
                    <tr key={h._id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <code className="text-sm bg-gray-50 px-3 py-1 rounded border border-gray-200 text-gray-700">
                          {JSON.stringify(h.newData)}
                        </code>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {new Date(h.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Section>
        <Section title="Updated Links" data={updated} icon={<Edit className="w-5 h-5" />} color="yellow">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-yellow-50 to-amber-50 border-b-2 border-yellow-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Previous</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">New</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {updated.map((h) => (
                    <tr key={h._id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <code className="text-sm bg-red-50 px-3 py-1 rounded border border-red-200 text-gray-700">
                          {JSON.stringify(h.previousData)}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-sm bg-green-50 px-3 py-1 rounded border border-green-200 text-gray-700">
                          {JSON.stringify(h.newData)}
                        </code>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {new Date(h.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Section>
        <Section title="Deleted Links" data={deleted} icon={<Trash2 className="w-5 h-5" />} color="red">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-red-50 to-rose-50 border-b-2 border-red-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Deleted Data</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {deleted.map((h) => (
                    <tr key={h._id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <code className="text-sm bg-gray-50 px-3 py-1 rounded border border-gray-200 text-gray-700">
                          {JSON.stringify(h.previousData)}
                        </code>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {new Date(h.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Section>
        <Section title="Visited Links" data={visited} icon={<Eye className="w-5 h-5" />} color="blue">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Original URL</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Short ID</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Visit Count</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {visited.map((h) => (
                    <tr key={h._id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 text-gray-700 text-sm break-all max-w-md">
                        {h.newData?.originalUrl || "-"}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-indigo-600">
                          {h.newData?.shortId || "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center px-3 py-1 bg-green-100 text-green-700 font-semibold rounded-full text-sm">
                          {h.visitCount || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {new Date(h.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}
function Section({
  title,
  data,
  children,
  icon,
  color,
}: {
  title: string;
  data: any[];
  children: React.ReactNode;
  icon: React.ReactNode;
  color: string;
}) {
  const colorClasses = {
    green: "from-green-500 to-emerald-500",
    yellow: "from-yellow-400 to-amber-400",
    red: "from-red-500 to-rose-500",
    blue: "from-blue-500 to-indigo-500",
  };

  return (
    <section className="mb-8">
      <div className="flex items-center space-x-3 mb-4">
        <div className={`bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} p-2 rounded-lg text-white`}>
          {icon}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h2>
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
          {data.length}
        </span>
      </div>
      {data.length > 0 ? (
        children
      ) : (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
          <p className="text-gray-400">No {title.toLowerCase()} found</p>
        </div>
      )}
    </section>
  );
}
