"use client";
import { useState, useId } from "react";

/* 
<UploadButton
  endpoint="imageUploader"
  accept="image/*" // for images
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

<UploadButton
  endpoint="pdfUploader"
  accept=".pdf" // for PDFs only
  onClientUploadComplete={(res) => {
    // handle PDF upload
  }}
  onUploadError={(error) => {
    alert(`ERROR! ${error.message}`);
  }}
/> 
*/

export default function UploadButton(props) {
  const [uploading, setUploading] = useState(false);
  const inputId = useId(); // useId prevents ID conflicts in multiple UploadButtons

  return (
    <div className="flex items-center justify-center">
      <label
        className={
         
          "cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        }
        htmlFor={inputId} // dynamically generated ID (safe for multiple uploads)
      >
        {uploading ? "Uploading..." : "Choose a file"}
      </label>

      <input
        type="file"
        name="userFile"
        id={inputId} // new unique ID per component instance
        className="hidden"
        accept={props.accept} // Add accept prop for file filtering
        onChange={(e) => {
          const file = e.target.files[0];
          
          // Validate file type if accept prop is provided
          if (props.accept && file) {
            const acceptedTypes = props.accept.split(',').map(type => type.trim());
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            const fileMimeType = file.type.toLowerCase();
            
            const isValidType = acceptedTypes.some(acceptType => {
              if (acceptType.startsWith('.')) {
                // Extension-based validation (e.g., .pdf, .jpg)
                return fileExtension === acceptType.toLowerCase();
              } else if (acceptType.includes('/')) {
                // MIME type validation (e.g., application/pdf, image/*)
                if (acceptType.endsWith('/*')) {
                  return fileMimeType.startsWith(acceptType.replace('*', ''));
                } else {
                  return fileMimeType === acceptType;
                }
              }
              return false;
            });
            
            if (!isValidType) {
              const errorMsg = `Invalid file type. Please select a file matching: ${props.accept}`;
              props.onUploadError?.(new Error(errorMsg));
              return;
            }
          }
          
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
              props.onUploadError?.(error); 
              setUploading(false);
            });
        }}
      />
    </div>
  );
}