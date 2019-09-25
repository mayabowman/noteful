import React from 'react'

class AddNote extends React.Component {
  render() {
    return (
      <form className='AddNote'>
        <label htmlFor='note-name'>Note Name:</label>
        <input type='text' className='new-note' name='note-name' id='note-name' />
        <label htmlFor='note-content'>Content:</label>
        <input type='text' className='new-note-content' name='note-content' id='note-content' />
      </form>
    )
  }
}

export default AddNote