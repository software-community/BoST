"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DynamicField from "@/components/ui/dynamic-input-field";
import { useFormState } from "react-dom";
import UploadButton from "@/components/UploadButton";
import { updateProject } from "@/app/actions/ProjectActions";
import { useRouter } from "next/navigation";

const developmentStatus = [
  { id: 1, name: "Not Started" },
  { id: 2, name: "In Progress" },
  { id: 3, name: "Completed" },
];

export default function Form({ projectDetails }) {
  // const { register, handleSubmit, control } = useForm({
  //   defaultValues: {
  //     repoLinks: projectDetails.relatedLinks.map((item) => {
  //       return { value: item.url };
  //     }),
  //     teamMembers: projectDetails.members.map((item) => {
  //       return { value: item };
  //     }),
  //   },
  // });

  // const initialState = {
  // repoLinks: projectDetails.relatedLinks.map((item) => item.url),

  // teamMembers: projectDetails.members,
  //   message: null,
  //   errors: {},
  // };
  // const updateProjectWithId = updateProject.bind(null, projectDetails._id);
  // const [state, dispatch] = useFormState(updateProjectWithId, initialState);
  // const [projectImageURL, setProjectImageURL] = useState(
  //   projectDetails.image || ""
  // );

  const router = useRouter();
  const [state, setState] = useState({ errors: {} });
  const [projectImageURL, setProjectImageURL] = useState(projectDetails.image || "");
  const [members, setMembers] = useState(() => {
    try {
      const rawMembers = (projectDetails.members || []).map((m) => ({
        name: m.name ?? "",
        email: m.email ?? "",
        image: m.image ?? "",
        github: m.github ?? "",
        linkedin: m.linkedin ?? "",
      }));
      return JSON.parse(JSON.stringify(rawMembers)); // 🔥 this strips circular refs
    } catch (err) {
      console.error("Error sanitizing members", err);
      return [];
    }
  });

  const [showMemberForm, setShowMemberForm] = useState(false);
  const [memberImageURL, setMemberImageURL] = useState("");
  const [title, setTitle] = useState(projectDetails.title || "");
  const [description, setDescription] = useState(projectDetails.description || "");
  const [status, setStatus] = useState(projectDetails.status || "not_started");
  const [github, setGithub] = useState(projectDetails.github || "");
  const [website, setWebsite] = useState(projectDetails.website || "");

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
    const formData = new FormData();
    formData.set("title", title);
    formData.set("description", description);
    formData.set("status", status);
    formData.set("github", github);
    formData.set("website", website);
    formData.set("image", projectImageURL);
    formData.set("members", JSON.stringify(members));

    try {
      const result = await updateProject(projectDetails.id, formData);
      if (result?.errors) {
        setState(result);
      } else if (result?.success) {
        router.push("/dashboard/projects");
      } else {
        console.warn("Unexpected result", result);
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="text-xl font-bold text-primary mb-4">
        <h2>Update Project</h2>
      </div>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Enter title"
            aria-describedby="title-error"
          />
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Enter description"
            rows="3"
            aria-describedby="description-error"
          ></textarea>
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="mb-4">
            <label htmlFor="status" className="mb-2 block text-sm font-medium">
              Status
            </label>

            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="status-error"
            >
              <option value="not_started">Not started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {state.errors?.status &&
              state.errors.status.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="mb-2 block text-sm font-medium">
              Image URL
            </label>
            <div className="w-full flex flex-col md:flex-row max-w-[900px] gap-8 items-center">
              <input
                id="image"
                name="image"
                type="text"
                aria-describedby="image-error"
                placeholder="Upload project image"
                value={projectImageURL} // Control the input field value with avatarURL state
                className="peer px-4 block w-full md:w-1/2 h-8 rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                readOnly
              />
              <UploadButton
                endpoint="imageUploader"
                className="ut-uploading:pointer-events-none"
                appearance={{
                  container: "w-1/4",
                  button: "bg-primary"
                }}
                onClientUploadComplete={(res) => {
                  alert("Upload Completed");
                  setProjectImageURL(res[0].url);
                }}
                onUploadError={(error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
              {projectImageURL && (
                <div className="w-32 h-32 mt-4 md:mt-0 border rounded-md overflow-hidden">
                  <img src={projectImageURL} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <div id="image-error" aria-live="polite" aria-atomic="true">
              {state.errors?.image &&
                state.errors.image.map((error) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="github" className="mb-2 block text-sm font-medium">
              GitHub
            </label>
            <input
              id="github"
              name="github"
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Enter GitHub link (optional)"
            // aria-describedby="github-error"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="website" className="mb-2 block text-sm font-medium">
              Website
            </label>
            <input
              id="website"
              name="website"
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Enter website link (optional)"
            // aria-describedby="website-error"
            />
            {/* <div id="website-error" aria-live="polite" aria-atomic="true">
            {state.errors?.website &&
              state.errors.website.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
          </div>
          {/* <div className="mb-4">
            <label htmlFor="members" className="mb-2 block text-sm font-medium">
              Members
            </label>
            <input
              type="text"
              id="members"
              name="members"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Enter members (comma-separated)"
              defaultValue={projectDetails.members}
              aria-describedby="members-error"
            />
            <div id="members-error" aria-live="polite" aria-atomic="true">
              {state.errors?.members &&
                state.errors.members.map((error) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div> */}
          {/* --- MEMBER PREVIEW --- */}
          <div className="flex flex-wrap gap-4 mb-4">
            {members.map((m, idx) => (
              <div key={idx} className="w-28 flex-shrink-0 flex flex-col items-center relative border p-2 rounded-md">
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
                    key={memberForm.email}
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
        </div>

        {/* --- SUBMIT + CANCEL --- */}
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/projects"
            className="flex h-10 items-center rounded-lg bg-secondary px-4 text-sm font-medium text-primary hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Update Project</Button>
        </div>
      </div>
    </form>
  );
}
