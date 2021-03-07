import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { saveAs } from 'file-saver';
import { Packer, Document, HeadingLevel, Paragraph } from 'docx';

import { debounce } from 'debounce';

const Notes = ({socketUrl}) => {
  const socketRef = io.connect(socketUrl);
  const [notes, setNotes] = useState(localStorage.getItem('notes') ?? '');

  const handleChange = (e) => {
    setNotes(e.target.value);
    localStorage.setItem('notes', e.target.value);

    debounce(socketRef.emit('update_notes', notes), 50);
  };

  useEffect(() => {
    socketRef.on('update_notes', (notes) => {
      setNotes(notes);
    });

    return () => socketRef.disconnect();
  }, []);

  const downloadNotes = () => {
    if (notes === '') return;

    const document = new Document();

    document.addSection({
      children: [
        new Paragraph({
          text: 'Work.Space Notes',
          heading: HeadingLevel.TITLE
        }),
        new Paragraph({
          text: notes
        })
      ]
    });

    Packer.toBlob(document).then((blob) => {
      console.log(blob);
      saveAs(blob, 'notes.docx');
      console.log('Document created successfully');
    });
  };

  return (
    <div className="max-w-screen-md mx-auto">
      <div className="relative bg-white w-full h-screen">
        <button
          onClick={downloadNotes}
          className="z-20 absolute top-0 -right-36 mt-4 rounded shadow-sm bg-blue-600 px-2 py-2 text-white text-sm font-semibold"
        >
          Download Notes
        </button>
        <textarea
          value={notes}
          onChange={handleChange}
          className="font-mono p-4"
          name="notes_live"
          placeholder="Enter Notes Here..."
        />
      </div>
    </div>
  );
};

export default Notes;
