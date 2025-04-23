import React from 'react';
import "../styles/Notes.css"

function Notes({ note, onDelete }) {
  const DateFormat = new Date(note.created_at).toLocaleDateString("en-US", )

  return (
    <div className="note-card">
      <div className="note-header">
        <h2 className="note-title">{note.title}</h2>
        <p className="note-date">{DateFormat}</p>
      </div>
      <p className="note-content">{note.content}</p>
      <button className="note-delete" onClick={() => onDelete(note.id)}>🗑️ Delete</button>
    </div>
  );
}

export default Notes;
