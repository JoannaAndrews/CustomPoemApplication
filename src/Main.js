import FileUploader from "./FileUploader";

function Main({ activeNote, onUpdateNote }) {

  const onEditField = (key, value) => {
    onUpdateNote({
      ...activeNote,
      [key]: value,
      lastModified: Date.now(),
    })
  };

  const onFileUpload = (file, activeNote) => {
    if (!activeNote) {
      console.error("No active poem selected.");
      return;
    }

    console.log("Uploading file for poem:", activeNote.id);

    const updatedNote = {
      ...activeNote,
      files: [file],
      lastModified: Date.now(),
    };

    onUpdateNote(updatedNote);  // Update the correct note  ...(activeNote.files || []), 
  };



  if (!activeNote)
    return <div className="no-active-note">No poem selected</div>

  return <div className="app-main">
    <div className="app-main-note-edit">
      <input type="text"
        id="title"
        value={activeNote.title}
        onChange={(e) => onEditField("title", e.target.value)}
        autoFocus></input>

      <FileUploader onFileUpload={onFileUpload} activeNote={activeNote} />


      <textarea className="text-area" id="body"
        placeholder="Write your poem here..."
        value={activeNote.body}
        onChange={(e) => onEditField("body", e.target.value)}></textarea>
    </div>

    {/* <div className="app-main-note-preview">
      <h1 className="preview-title">{activeNote.title}</h1>
      <div className="markdown-preview">{activeNote.body}</div>
    </div> */}


  </div>//<p>main</p>
}

export default Main;

//autofocus: already will start the user there