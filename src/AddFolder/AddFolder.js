import React from 'react'
import config from '../config'
import NotefulContext from '../NotefulContext'

class AddFolder extends React.Component {
  static defaultProps = {
    addFolder: () => {}
  }
  static contextType = NotefulContext;

  handleSubmit = e => {
    e.preventDefault();
    const newFolder = {
      name: e.target['folder-name'].value
    }
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newFolder)
    })
    .then(res => {
      if (!res.ok)
        return res.json().then(error => { throw error })
      return res.json()
    })
    .then((folder) => {
      newFolder.id = folder.id
      this.context.addFolder(folder)      
      this.props.history.push('/')
    })
    .catch(error => {
      console.error({ error })
    })
  }

  render() {

    return (
      <form className='AddFolder' onSubmit={this.handleSubmit}>
        <h2>Create a Folder</h2>
        <div className='field'>
          <label htmlFor='folder-name'>Folder Name: </label>
          <input 
            type='text' 
            className='new-folder' 
            name='folder-name' 
            id='folder-name' 
            required
          />
        </div>
        <div className='buttons'>
          <button type='submit'>
            Add Folder
          </button>
        </div>
      </form>
    )
  }
}

export default AddFolder