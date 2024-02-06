import React, { useEffect, useState } from 'react'
import Note from './Note'

export default function NotesCard({ notes }) {
  const [empty , setEmpty] = useState(true)

  useEffect(() => {
    for (let i = 0; i < notes.length; i++) {
      if(notes[i].note!==''){
        setEmpty(false);
        break;
      }
      
    }
  } , [])
  return (
    <div className='relative w-full h-fit flex flex-col justify-center items-center bg-purple rounded-lg shadow-md mt-6 p-5'>
      <h1 className='relative w-full text-center text-white text-3xl pb-5'>الملاحظات</h1>
      {notes.map(note =>
        <Note day={note.day} note={note.note} />
      )}
      {
        notes.length==0 || empty  &&
        <h1 className='text-white text-xl font-black text-center'>لا يوجد ملاحظات حالياً</h1>
      } 
    </div>
  )
}
