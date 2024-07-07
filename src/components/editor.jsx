"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";
export default function Editor({value,setValue}) {
  // const [value, setValue] = useState("");
  // Customize the toolbar options
  const modules = {
    toolbar: [
      [{ header: [1, 2,3,4,5, false] }],
      ["bold", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ "code-block": true }],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "code-block",
  ];

  return (
    <div className="flex flex-col bg-white">
      <div className="w-full p-4 ">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
        />
      </div>
      {/* <div className="w-full p-4">{parse(value)}</div> */}
    </div>
  );
}