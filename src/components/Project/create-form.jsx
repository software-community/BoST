"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

// import { useFormState } from "react-dom"; 
// const [state, dispatch] = useFormState(createProject, initialState); // replaced below
import { createProject } from "@/app/actions/ProjectActions";
import UploadButton from "@/components/UploadButton";


const Form = () => {
  const [state, setState] = useState({ errors: {} }); //  replaced useFormState
  const router = useRouter(); // 
  // const initialState = { repoLinks: [""], teamMembers: [""] }; //  No longer used

  const [projectImageURL, setProjectImageURL] = useState("");
  const [members, setMembers] = useState([]);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [memberImageURL, setMemberImageURL] = useState("");
  const [memberForm, setMemberForm] = useState({
    name: "",
    email: "",
    github: "",
    linkedin: "",
  });

  const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleMemberAdd = () => {
    if (!showMemberForm) {
      setShowMemberForm(true);
    } else {
      if (memberForm.name && memberForm.email && memberImageURL) {
        if (!isValidEmail(memberForm.email)) {
        alert("Please enter a valid email address.");
        return;
      }
        const sanitizedMember = {
          name: memberForm.name.trim(),
          email: memberForm.email.trim(),
          image: memberImageURL,
          github: memberForm.github?.trim() || "",
          linkedin: memberForm.linkedin?.trim() || "",
        };

        setMembers((prev) => [...prev, sanitizedMember]);
        setMemberForm({ name: "", email: "", github: "", linkedin: "" });
        setMemberImageURL("");
        setShowMemberForm(false);
      } else {
        alert("Please fill name, email, and upload image before confirming.");
      }
    }
  };


  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.set("image", projectImageURL);
    console.log("Final member data before submit:", members);
    formData.set("members", JSON.stringify(members));
    console.log("Form submitted");

    try {
      const result = await createProject(formData);
      console.log("Result from createProject:", result);

      if (result?.errors) {
        setState(result);
        console.log("Form has validation errors:", result.errors);
      } else if (result?.success) {
        console.log("Redirecting...");
        router.push("/dashboard/projects");
      } else {
        console.warn("Unexpected result:", result);
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  };


  return (
    <form onSubmit={onSubmit}>
      <div className="text-xl font-bold text-primary mb-4">
        <h2>Create a Project</h2>
      </div>

      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* --- TITLE --- */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
            placeholder="Enter title"
          />
          <div id="title-error">
            {state.errors?.title?.map((error) => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </div>

        {/* --- DESCRIPTION --- */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
            placeholder="Enter description"
          />
          {state.errors?.description?.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
          ))}
        </div>

        {/* --- STATUS --- */}
        <div className="mb-4">
          <label htmlFor="status" className="mb-2 block text-sm font-medium">Status</label>
          <select
            id="status"
            name="status"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm"
          >
            <option value="not_started">Not started</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {state.errors?.status?.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
          ))}
        </div>

        {/* --- PROJECT IMAGE --- */}
        <div className="mb-4">
          <label htmlFor="image" className="mb-2 block text-sm font-medium">Image URL</label>
          <div className="flex flex-col md:flex-row max-w-[900px] gap-8 items-center">
            <input
              id="image"
              name="image"
              type="text"
              value={projectImageURL}
              placeholder="Upload project image"
              readOnly
              className="peer px-4 block w-full md:w-1/2 h-8 rounded-md border"
            />
            <UploadButton
              endpoint="imageUploader"
              className="ut-uploading:pointer-events-none"
              appearance={{ container: "w-1/4", button: "bg-primary" }}
              onClientUploadComplete={(res) => {
                alert("Upload Completed");
                setProjectImageURL(res[0].url);
              }}
              onUploadError={(error) => alert(`ERROR! ${error.message}`)}
            />
            {projectImageURL && (
              <div className="w-32 h-32 mt-4 md:mt-0 border rounded-md overflow-hidden">
                <img src={projectImageURL} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* --- GITHUB + WEBSITE --- */}
        <div className="mb-4">
          <label htmlFor="github" className="mb-2 block text-sm font-medium">GitHub</label>
          <input
            id="github"
            name="github"
            type="text"
            className="peer block w-full rounded-md border py-2 pl-3 text-sm"
            placeholder="Enter GitHub link (optional)"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="website" className="mb-2 block text-sm font-medium">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            className="peer block w-full rounded-md border py-2 pl-3 text-sm"
            placeholder="Enter website link (optional)"
          />
        </div>

        {/* --- MEMBER PREVIEW --- */}
        <div className="flex flex-wrap gap-4 mb-4">
          {members.map((m, idx) => (
            <div
              key={idx}
              className="w-28 flex-shrink-0 flex flex-col items-center relative border p-2 rounded-md"
            >
              <img src={m.image} alt={m.name} className="w-20 h-24 object-cover rounded-md border" />
              <p className="text-sm font-medium mt-1 text-center">{m.name}</p>
              <button
                type="button"
                onClick={() => {
                  const updated = [...members];
                  updated.splice(idx, 1);
                  setMembers(updated);
                }}
                className="text-xs text-red-600 mt-1 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>



        {/* --- MEMBER FORM --- */}
        {showMemberForm && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border p-4 rounded-md bg-gray-100 mb-4">
            <input
              type="text"
              placeholder="Name"
              value={memberForm.name}
              onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
              className="peer block w-full rounded-md border py-2 px-3 text-sm"
            />
            <input
              type="email"
              placeholder="Email"
              value={memberForm.email}
              onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
              className="peer block w-full rounded-md border py-2 px-3 text-sm"
            />
            <input
              type="url"
              placeholder="GitHub"
              value={memberForm.github}
              onChange={(e) => setMemberForm({ ...memberForm, github: e.target.value })}
              className="peer block w-full rounded-md border py-2 px-3 text-sm"
            />
            <input
              type="url"
              placeholder="LinkedIn"
              value={memberForm.linkedin}
              onChange={(e) => setMemberForm({ ...memberForm, linkedin: e.target.value })}
              className="peer block w-full rounded-md border py-2 px-3 text-sm"
            />
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Member Image</label>
              <div className="flex flex-col md:flex-row max-w-[900px] gap-8 items-center">
                <input
                  type="text"
                  readOnly
                  value={memberImageURL}
                  placeholder="Upload member image"
                  className="peer px-4 block w-full md:w-1/2 h-8 rounded-md border"
                />
                <UploadButton
                  key={memberForm.email} // ✅ do not remove: ensures correct image upload per member
                  endpoint="imageUploader"
                  className="ut-uploading:pointer-events-none"
                  appearance={{ container: "w-1/4", button: "bg-primary" }}
                  onClientUploadComplete={(res) => {
                    alert("Member image uploaded");
                    setMemberImageURL(res[0].url);
                  }}
                  onUploadError={(error) => alert(`ERROR! ${error.message}`)}
                />
                {memberImageURL && (
                  <div className="w-24 h-28 mt-4 md:mt-0 border rounded-md overflow-hidden">
                    <img src={memberImageURL} alt="Member preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- ADD MEMBER BUTTON --- */}
        <div className="mb-6">
          <Button type="button" onClick={handleMemberAdd}>
            {showMemberForm ? "Confirm Member" : "Add Member"}
          </Button>
        </div>

        {/* --- SUBMIT + CANCEL --- */}
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/projects"
            className="flex h-10 items-center rounded-lg bg-secondary px-4 text-sm font-medium text-primary hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Create Project</Button>
        </div>
      </div>
    </form>
  );
};

export default Form;
