import React, { useEffect, useState,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();
  const allPastes =  useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if(pasteId){
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId])

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };
    
    if (!paste.title || !paste.content) {
      return toast.error("Title and content cannot be empty!");
    }

    if (allPastes.some((p) => p.title === paste.title && p.content === paste.content)) {
      return toast.error("This paste already exists!"); // Check for duplicates and show error
    }
      
    if (pasteId) {
      // Update paste
      dispatch(updateToPastes(paste));
    } else {
      // Create paste
      dispatch(addToPastes(paste));
    }

    //after creation and updation
    setValue("");
    setTitle("");
    setSearchParams({});
  }


  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-row gap-4 mb-4 items-center">
        <input
          className="p-2 rounded-lg w-3/4 border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-150"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createPaste}
          className="p-2 w-1/4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-150"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <div>
        <textarea
          className="w-full min-h-[300px] p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-150"
          value={value}
          placeholder="Write Your Content Here"
          onChange={(e) => setValue(e.target.value)}
          rows={10}
        />
      </div>
    </div>
  );
};

export default Home

