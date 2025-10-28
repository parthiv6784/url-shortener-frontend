"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getData, deleteData, putData,postData } from "../../lib/apiMethods";
import { ExternalLink, Edit2, Trash2, Save, X, Eye, Link as LinkIcon ,AlertTriangle } from "lucide-react";

export default function LinksPage() {
  const [links, setLinks] = useState<any[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [newUrl, setNewUrl] = useState("");
   const [deleteModal, setDeleteModal] = useState<{ show: boolean; id: string; url: string }>({
    show: false,
    id: "",
    url: "",
  });
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const fetchLinks = async () => {
    try {
      const data = await getData("/links/all");
      setLinks(data);
    } catch {
      toast.error("Failed to fetch links");
    }
  };
  useEffect(() => {
    fetchLinks();
  }, []);
   const handleRedirect = (shortId: string) => {
  const href = `${baseUrl}/${shortId}`;
  window.open(href, "_blank", "noopener,noreferrer");
  toast.success("Redirecting...");
};
 
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this link?")) return;
    await deleteData(`/links/delete/${id}`);
    toast.success("Link deleted");
    fetchLinks();
  };
  const openDeleteModal = (id: string, url: string) => {
    setDeleteModal({ show: true, id, url });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ show: false, id: "", url: "" });
  };

  const confirmDelete = async () => {
    try {
      await deleteData(`/links/delete/${deleteModal.id}`);
      toast.success("Link deleted successfully");
      closeDeleteModal();
      fetchLinks();
    } catch (error) {
      toast.error("Failed to delete link");
    }
  };

  const handleUpdate = async (id: string) => {
    await putData(`/links/update/${id}`, { originalUrl: newUrl });
    toast.success("Link updated!");
    setEditing(null);
    fetchLinks();
  };
   const cancelEdit = () => {
    setEditing(null);
    setNewUrl("");
  };
   return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-gradient-to-r from-blue-900 to-sky-400 p-2 rounded-lg shadow-md">
              <LinkIcon className="w-6 h-6 text-white" />
            </div>
         <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-sky-600 to-sky-400">
              My Shortened Links
            </h1>
          </div>
          <p className="text-gray-600 ml-14">Manage and track all your shortened URLs</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {links.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <LinkIcon className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No links yet</h3>
              <p className="text-gray-500">Create your first shortened link to get started!</p>
            </div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b-2 border-indigo-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Original URL</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Short ID</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Visits</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {links.map((link) => (
                      <tr key={link._id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4">
                          {editing === link._id ? (
                            <input
                              value={newUrl}
                              onChange={(e) => setNewUrl(e.target.value)}
                              className="w-full px-3 py-2 border-2 border-indigo-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                              autoFocus
                            />
                          ) : (
                            <a
                              href={link.originalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-700 hover:underline flex items-center space-x-2 group max-w-md"
                            >
                              <span className="truncate">{link.originalUrl}</span>
                              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                            </a>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleRedirect(link.shortId)}
                            className="text-purple-600 font-semibold hover:text-purple-700 hover:underline flex items-center space-x-1"
                          >
                            <span>{link.shortId}</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center space-x-1">
                            <Eye className="w-4 h-4 text-gray-400" />
                            <span className="font-semibold text-gray-700">{link.visitCount}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            {editing === link._id ? (
                              <>
                                <button
                                  onClick={() => handleUpdate(link._id)}
                                  className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                                  title="Save"
                                >
                                  <Save className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                                  title="Cancel"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => {
                                    setEditing(link._id);
                                    setNewUrl(link.originalUrl);
                                  }}
                                  className="p-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-colors duration-200"
                                  title="Edit"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => openDeleteModal(link._id, link.originalUrl)}
                                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="md:hidden divide-y divide-gray-100">
                {links.map((link) => (
                  <div key={link._id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                    {editing === link._id ? (
                      <div className="space-y-3">
                        <input
                          value={newUrl}
                          onChange={(e) => setNewUrl(e.target.value)}
                          className="w-full px-3 py-2 border-2 border-indigo-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdate(link._id)}
                            className="flex-1 flex items-center justify-center space-x-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save</span>
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="flex-1 flex items-center justify-center space-x-2 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                          >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="mb-3">
                          <p className="text-xs text-gray-500 mb-1">Original URL</p>
                          <a
                            href={link.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-700 hover:underline text-sm break-all flex items-center space-x-1"
                          >
                            <span className="flex-1">{link.originalUrl}</span>
                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          </a>
                        </div>
                        <div className="mb-3">
                          <p className="text-xs text-gray-500 mb-1">Short ID</p>
                          <button
                            onClick={() => handleRedirect(link.shortId)}
                            className="text-purple-600 font-semibold hover:text-purple-700 hover:underline flex items-center space-x-1 text-sm"
                          >
                            <span>{link.shortId}</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="mb-3">
                          <p className="text-xs text-gray-500 mb-1">Visits</p>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4 text-gray-400" />
                            <span className="font-semibold text-gray-700">{link.visitCount}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditing(link._id);
                              setNewUrl(link.originalUrl);
                            }}
                            className="flex-1 flex items-center justify-center space-x-2 bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 transition-colors duration-200"
                          >
                            <Edit2 className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                          <button
                          onClick={() => openDeleteModal(link._id, link.originalUrl)}
                            className="flex-1 flex items-center justify-center space-x-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
       {deleteModal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-gradient-to-r from-red-500 to-rose-500 p-6 text-white">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">Delete Link</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete this link? This action cannot be undone.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 break-all">{deleteModal.url}</p>
              </div>
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={closeDeleteModal}
                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
