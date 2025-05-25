function Sidebar({ notes, onAddNote, onDeleteNote, activeNote, setactiveNote }) {
  //creates local var here for it
  //destructuring props
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

  return <div className="app-sidebar">
    <div className="app-sidebar-header">
      <h1>Poems</h1>
      <button onClick={onAddNote}>Add</button>
    </div>
    <div className="app-sidebar-notes">
      {sortedNotes.map((note) => (
        <div key={note.id}  //Add this line
          className={`app-sidebar-note ${note.id === activeNote && "active"}`}
          onClick={() => setactiveNote(note.id)}>


          <div className="sidebar-note-title">

            <strong>{note.title}</strong>
            <button onClick={() => onDeleteNote(note.id)}>Delete</button>

          </div>

          {/* {note.id === activeNote && note.files.length > 0 && (
            <div className="file-preview">
              {note.files.map((file, index) => (
                <span key={index}>{file.name}</span>
              ))}
            </div>
          )} */}


          <p>{note.body && note.body.substr(0, 100) + "..."}</p>
          <small className="note-meta">
            Last modified {new Date(note.lastModified).toLocaleDateString("en-GB", {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </small>

        </div>
      ))}





    </div>
  </div>//<p>sidebar</p>
};

export default Sidebar;