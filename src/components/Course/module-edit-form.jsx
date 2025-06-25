"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UploadButton from "@/components/UploadButton";
import { editModuleFromCourse } from "@/app/actions/CourseActions";

const Form = ({ courseid, moduleDetails }) => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [videoInputs, setVideoInputs] = useState(moduleDetails.moduleVideos || []);
  const [pdfInputs, setPdfInputs] = useState(moduleDetails.modulePdfs || []);

  const validate = (fields) => {
    const newErrors = {};
    if (!fields.moduleName || fields.moduleName.trim().length < 3) {
      newErrors.moduleName = "Module name must be at least 3 characters.";
    }
    if (!fields.moduleDesc || fields.moduleDesc.trim().length < 10) {
      newErrors.moduleDesc = "Description must be at least 10 characters.";
    }
    return newErrors;
  };

  const handleInputChange = (setter, idx, field, value) => {
    setter(prev => {
      const updated = [...prev];
      updated[idx][field] = value;
      return updated;
    });
  };

  const handleDelete = (setter, idx) => {
    setter(prev => prev.filter((_, i) => i !== idx));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const values = {
      moduleName: formData.get("moduleName"),
      moduleDesc: formData.get("moduleDesc"),
    };

    const validationErrors = validate(values);
    if (videoInputs.length > 0 && videoInputs.every((v) => v.url.trim() === "")) {
      validationErrors.moduleVideos = "You added a video field but didn’t enter a URL.";
    }


    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    formData.append("moduleVideos", JSON.stringify(videoInputs));
    formData.append("modulePdfs", JSON.stringify(pdfInputs));

    try {
      const result = await editModuleFromCourse(courseid, moduleDetails.id, formData);
      if (result?.errors) setErrors(result.errors);
      else router.push(`/dashboard/courses`);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-6">
      <h2 className="text-xl font-bold text-primary mb-6">Edit Module</h2>

      <div className="rounded-md bg-gray-50 p-6 space-y-6">
        {/* Module Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Module Name</label>
          <input
            name="moduleName"
            defaultValue={moduleDetails.moduleName}
            className="w-full border rounded-md p-2 text-sm"
            placeholder="e.g., Introduction to React"
          />
          {errors.moduleName && <p className="text-sm text-red-500">{errors.moduleName}</p>}
        </div>

        {/* Module Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Module Description</label>
          <textarea
            name="moduleDesc"
            defaultValue={moduleDetails.moduleDesc}
            rows={3}
            className="w-full border rounded-md p-2 text-sm"
            placeholder="e.g., Learn about state, props, lifecycle..."
          />
          {errors.moduleDesc && <p className="text-sm text-red-500">{errors.moduleDesc}</p>}
        </div>

        {/* YouTube Videos */}
        <div className="space-y-2">
          <Button
            type="button"
            variant="outline"
            className="text-sm"
            onClick={() => setVideoInputs(prev => [...prev, { url: "", title: "" }])}
          >
            + Add YouTube Video
          </Button>

          {videoInputs.map((video, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 border rounded-md bg-white relative"
            >
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="YouTube Video URL"
                  value={video.url}
                  onChange={(e) => handleInputChange(setVideoInputs, idx, "url", e.target.value)}
                  className="w-full border p-2 rounded-md text-sm mb-2"
                />
                <input
                  type="text"
                  placeholder="Video Title(Optional)"
                  value={video.title}
                  onChange={(e) => handleInputChange(setVideoInputs, idx, "title", e.target.value)}
                  className="w-full border p-2 rounded-md text-sm"
                />
              </div>

              <div className="w-[160px] h-[90px]">
                {video.url && (
                  <iframe
                    src={
                      video.url.includes("watch?v=")
                        ? video.url.replace("watch?v=", "embed/")
                        : `https://www.youtube.com/embed/${video.url.split("/").pop()}`
                    }
                    className="w-full h-full rounded-md"
                    allowFullScreen
                  />
                )}
              </div>

              <button
                type="button"
                onClick={() => handleDelete(setVideoInputs, idx)}
                className="absolute top-2 right-2 text-red-600 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* PDFs */}
        <div className="space-y-2">
          <Button
            type="button"
            variant="outline"
            className="text-sm"
            onClick={() => setPdfInputs(prev => [...prev, { name: "", url: "" }])}
          >
            + Add PDF
          </Button>

          {pdfInputs.map((pdf, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 border rounded-md bg-white relative"
            >
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="PDF Name (Optional)"
                  value={pdf.name}
                  onChange={(e) => handleInputChange(setPdfInputs, idx, "name", e.target.value)}
                  className="w-full border p-2 rounded-md text-sm"
                />
              </div>

              {pdf.url && (
                <a
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm underline"
                >
                  📄 View
                </a>
              )}

              <button
                type="button"
                onClick={() => handleDelete(setPdfInputs, idx)}
                className="absolute top-2 right-2 text-red-600 text-xs"
              >
                ✕
              </button>
            </div>
          ))}

          {pdfInputs.some((p) => !p.url) && (
            <UploadButton
              endpoint="pdfUploader"
              onClientUploadComplete={(res) => {
                const uploaded = res.map(file => ({
                  url: file.url,
                  name: file.originalFilename || "",
                }));

                setPdfInputs((prev) => {
                  const updated = [...prev];
                  for (const file of uploaded) {
                    const emptyIndex = updated.findIndex(p => !p.url);
                    if (emptyIndex !== -1) {
                      updated[emptyIndex] = { ...updated[emptyIndex], url: file.url };
                    } else {
                      updated.push(file);
                    }
                  }
                  return updated;
                });
              }}
              onUploadError={(err) => alert(`Upload error: ${err.message}`)}
            />
          )}
        </div>

        {/* Error for Videos / PDFs */}
        {errors.moduleVideos && (
          <p className="text-sm text-red-500">{errors.moduleVideos}</p>
        )}
        {errors.modulePdfs && (
          <p className="text-sm text-red-500">{errors.modulePdfs}</p>
        )}

        {/* Final Actions */}
        <div className="flex justify-end gap-4 pt-6">
          <Link
            href="/dashboard/courses"
            className="bg-secondary px-4 py-2 text-sm rounded-md hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Update Module</Button>
        </div>
      </div>
    </form>
  );
};

export default Form;
