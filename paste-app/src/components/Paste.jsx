import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };

  const handleShare = (paste) => {
    if (navigator.share) {
      navigator
        .share({
          title: paste.title,
          text: paste.content,
          url: window.location.href + `/pastes/${paste._id}`, // Adjust the URL based on your routing
        })
        .then(() => {
          toast.success("Shared successfully!");
        })
        .catch((error) => {
          toast.error("Error sharing: " + error);
        });
    } else {
      toast.error("Share not supported on this browser.");
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-6 mt-6 bg-gray-50 rounded-lg shadow-lg">
      <input
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-150"
        type="search"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => {
            return (
              <div
                className="border border-gray-300 p-4 rounded-lg bg-white shadow-sm"
                key={paste?._id}
              >
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  {paste.title}
                </div>
                <div className="text-gray-600 mb-4">{paste.content}</div>
                <div className="flex flex-wrap gap-4 justify-between items-center">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150">
                    <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                  </button>
                  <button className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150">
                    <a href={`/pastes/${paste?._id}`} target="_blank">
                      View
                    </a>
                  </button>
                  <button
                    onClick={() => handleDelete(paste?._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to Clipboard");
                    }}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-150"
                  >
                    Copy
                  </button>
                  <button className="px-3 py-1 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-150"
                   onClick={() => handleShare(paste)}
                  >                
                    Share
                  </button>
                </div>
                <div className="text-sm text-gray-400 mt-4">
                  {new Date(paste.createdAt).toLocaleString()}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-gray-500 text-center mt-10">
            No pastes found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;
