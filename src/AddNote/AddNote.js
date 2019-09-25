import React from 'react'
import config from '../config'
import NotefulContext from '../NotefulContext'

class AddNote extends React.Component {
  static defaultProps = {
    history: {
      push: () => {}
    },
  }

static contextType = NotefulContext;

handleSubmit = e => {
  e.preventDefault();
  const newNote = {
    note: e.target['note-name'].value,
    content: e.target['note-content'],
    folderId: e.target['note-folder-id'].value,
    modified: new Date()
  }
  fetch(`${config.API_ENDPOINT}/notes`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(newNote),
  })
  .then(res => {
    if(!res.ok)
      return res.json().then(e => Promise.reject(e))
    return res.json()
  })
  .then(note => {
    this.context.addNote(newNote)
    this.props.history.push(`/folder/${note.folderId}`)
  })
  .catch(error => {
    console.error({ error })
  })
}

  render() {
    const { folders=[] } = this.context
    return (
      <form className='AddNote' onSubmit={this.handleSubmit}>
        <h2>Create a Note</h2>
        <div className='name-field'>
          <label htmlFor='note-name'>Note Name: </label>
          <input type='text' className='new-note' name='note-name' id='note-name' />
        </div>
        <div className='content-field'>
          <label htmlFor='note-content'>Content: </label>
          <input type='text' className='new-note-content' name='note-content' id='note-content' />
        </div>
        <div className='select-field'>
          <label htmlFor='select-folder'>
            Choose Folder: 
          </label>
          <select id='select-folder' name='note-folder-id'>
            <option value={null}>...</option>
              {folders.map(folder => 
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
          </select>
        </div>
        <button type='submit'>Add Note</button>
      </form>
    )
  }
}

export default AddNote