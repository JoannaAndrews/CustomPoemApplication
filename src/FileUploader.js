import { useState, useEffect } from 'react';

function FileUploader({ onFileUpload, activeNote }) {
  const [file, setFile] = useState();

  const [latestFileName, setLatestFileName] = useState("");

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      // Pass activeNote to onFileUpload along with the file
      if (activeNote) {
        onFileUpload(uploadedFile, activeNote);  // Notify parent with the file and the active note
      } else {
        console.error("No active poem selected!");
      }
    }
  };

  // Update file name when active note changes
  useEffect(() => {
    if (activeNote?.files?.length > 0) {
      const mostRecentFile = activeNote.files[activeNote.files.length - 1];
      setLatestFileName(mostRecentFile.name);
    } else {
      setLatestFileName("");
    }
  }, [activeNote]);

  return (
    <div className='app-file-upload'>
      <form>
        <input
          id="files"
          type="file"
          name="files"
          onChange={handleFileChange}
          className="file-input"
          style={{ display: 'none' }}
        />

        <label htmlFor="files" className="custom-upload-button">
          Upload File
        </label>

        {latestFileName && (
          <div className="file-name-preview">Uploaded: {latestFileName}</div>
        )}

        {activeNote.files && activeNote.files.length > 0 && (
          <div className="uploaded-images">
            {/* <h4>Uploaded Images:</h4> */}
            <div className="image-preview-grid">
              {activeNote.files.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded ${index}`}
                  style={{ maxWidth: "150px", maxHeight: "150px", margin: "8px" }}
                />
              ))}
            </div>
          </div>
        )}


      </form>
    </div>
  );
}

export default FileUploader;
