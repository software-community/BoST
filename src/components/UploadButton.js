"use client";
import { useState /* original */, useId } from "react"; // ✅ added useId to fix input ID conflict

/* 
<UploadButton
  endpoint="imageUploader"
  className="ut-uploading:pointer-events-none"
  appearance={{
    container: "w-1/4",
    button:"bg-primary"
  }}
  onClientUploadComplete={(res) => {
    alert("Upload Completed");
    setProjectImageURL(res[0].url);
  }}
  onUploadError={(error) => {
    alert(`ERROR! ${error.message}`);
  }}
/> 
*/

export default function UploadButton(props) {
  const [uploading, setUploading] = useState(false);
  // const inputId = "userFile"; //original hardcoded ID
  const inputId = useId(); //  useId prevents ID conflicts in multiple UploadButtons

  return (
    <div className="flex items-center justify-center">
      <label
        className={
          "cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        }
        // htmlFor="userFile" // original line
        htmlFor={inputId} // dynamically generated ID (safe for multiple uploads)
      >
        {uploading ? "Uploading..." : "Choose a file"}
      </label>

      <input
        type="file"
        name="userFile"
        // id="userFile" // old ID (conflicted when reused)
        id={inputId} //  new unique ID per component instance
        className="hidden"
        onChange={(e) => {
          const file = e.target.files[0];
          const formData = new FormData();
          setUploading(true);
          console.log("Uploading...");

          formData.append("file", file);

          fetch(`/bost/api/files`, {
            method: "POST",
            body: formData,
          })
            .then((res) => res.json())
            .then((res) => {
              props.onClientUploadComplete(res); 
              setUploading(false);
            })
            .catch((error) => {
              props.onUploadError(error); 
              setUploading(false);
            });
        }}
      />
    </div>
  );
}
