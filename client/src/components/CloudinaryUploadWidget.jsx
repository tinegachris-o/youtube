{
  /*import { useEffect, useRef } from "react";

const CloudinaryUploadWidget = ({ setPublicId, resourceType, openWidget }) => {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (window.cloudinary) {
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
          uploadPreset: import.meta.env.VITE_UPLOAD_PRESET, // Make sure this matches your Cloudinary settings
          sources: ["local", "url"],
          resourceType: resourceType, // "image" or "video"
        },
        (error, result) => {
          if (!error && result.event === "success") {
            console.log("Upload successful:", result.info);
            setPublicId(result.info.secure_url);
          }
        }
      );
    }
  }, []);

  return (
    <button onClick={() => openWidget(widgetRef.current)}>upload file</button>
  );
};

export default CloudinaryUploadWidget;
*/
}
import { useEffect, useRef } from "react";

const CloudinaryUploadWidget = ({ setPublicId, resourceType, openWidget }) => {
  const widgetRef = useRef(null);

  // Initialize the Cloudinary widget on component mount
  useEffect(() => {
    if (window.cloudinary) {
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
          uploadPreset: import.meta.env.VITE_UPLOAD_PRESET,
          sources: ["local", "url"],
          resourceType,
          multiple: false,
          autoUpload: false, // Disable automatic upload
        },
        (error, result) => {
          if (!error && result.event === "success") {
            console.log("Upload successful:", result.info);
            // Set the secure URL from Cloudinary to the parent's state
            setPublicId(result.info.secure_url);
          }
        }
      );
    }
  }, [resourceType, setPublicId]);

  // Listen for changes to the openWidget prop to open the widget externally
  useEffect(() => {
    if (openWidget && widgetRef.current) {
      widgetRef.current.open();
    }
  }, [openWidget]);

  // Optionally, you can return a button here to open the widget manually
  // or simply return null if the widget is opened only via the openWidget prop.
  return null;
};

export default CloudinaryUploadWidget;
