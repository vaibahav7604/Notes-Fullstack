import React, { useEffect, useState } from "react";
import api from "../api";
import Notes from "./Notes";
import "../styles/Home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => setNotes(data))
      .catch((error) => alert(error));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Note Deleted");
          getNotes();
        }
      })
      .catch((error) => alert(error.message));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          alert("Note Created");
          setTitle("");
          setContent("");
          getNotes();
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="home-container">
      <section className="note-form-section">
        <h2 className="section-title">➕ Create Note</h2>
        <form className="note-form" onSubmit={createNote}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <button type="submit" className="note-submit-btn">Create</button>
        </form>
        
      </section>
      <section className="note-list-section">
        <h2 className="section-title">📝 Your Notes</h2>
        {notes.length === 0 ? (
          <p>No notes yet. Create one!</p>
        ) : (
          notes.map((note) => (
            <Notes note={note} onDelete={deleteNote} key={note.id} />
          ))
        )}
      </section>
    </div>
  );
}

export default Home;
