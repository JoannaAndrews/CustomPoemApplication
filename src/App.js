import { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Sidebar'; // ./ for curr dir 
import Main from './Main'; // ./ for curr dir 
import uuid from "react-uuid";

function App() {

  // const [notes, setNotes] = useState([]);

  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setactiveNote] = useState(false);


  // useEffect(() => {
  //   localStorage.setItem("notes", JSON.stringify(notes))
  // }, [notes]);

  useEffect(() => {
    const notesToSave = notes.map(note => ({
      ...note,
      files: [] // optionally save file metadata like name/type
    }));
    localStorage.setItem("notes", JSON.stringify(notesToSave));
  }, [notes]);



  const onAddNote = () => {
    //console.log("add");
    const newNote = {
      id: uuid(),
      title: "Untitled Poem",
      body: "",
      files: [],
      lastModified: Date.now()
    };

    setNotes([newNote, ...notes]);
  };

  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete))
  }

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    console.log("Updating poem:", updatedNote.id);
    updatedNotesArray.forEach((n, i) => {
      console.log(`Poem ${i} (${n.id}) - files:`, n.files);
    });

    setNotes(updatedNotesArray);
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  return (
    <div className="App">
      <Sidebar notes={notes} onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote} setactiveNote={setactiveNote}
      ></Sidebar>
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote}>
      </Main>
    </div >
  );
}

export default App;
