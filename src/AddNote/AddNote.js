import React from 'react'
import config from '../config'
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types'

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
    note_name: e.target['note-name'].value,
    folder_id: e.target['note-folder-id'].value,
    modified: new Date(),
    content: e.target['note-content'].value
  }

  if(!e.target['note-folder-id'].value) {
    window.alert('Please select a folder')
  } else{
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
      newNote.id = note.id
      this.context.addNote(newNote)
      this.props.history.push(`/folder/${note.folder_id}`)
      console.log("props", this.props)
    })
    .catch(error => {
      console.error({ error })
    })
  }
}

  render() {
    const { folders=[] } = this.context
    return (
      <form className='AddNote' onSubmit={this.handleSubmit}>
        <h2>Create a Note</h2>
        <div className='name-field'>
          <label htmlFor='note-name'>Note Name: </label>
          <input 
            type='text' 
            className='new-note' 
            name='note-name' 
            id='note-name' 
            required
          />
        </div>
        <div className='content-field'>
          <label htmlFor='note-content'>Content: </label>
          <input 
            type='text' 
            className='new-note-content' 
            name='note-content' 
            id='note-content' 
            required
          />
        </div>
        <div className='select-field'>
          <label htmlFor='select-folder'>
            Choose Folder: 
          </label>
          <select 
            required 
            id='select-folder' 
            name='note-folder-id'
            onChange={e => this.context.folder = e.target.value || null}
            value={null}
          >
            <option value=''>...</option>
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

AddNote.propTypes = {
  id: PropTypes.string
}

export default AddNote