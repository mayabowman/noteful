import React from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav' 
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import NotefulContext from '../NotefulContext'
import config from '../config'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import ErrorBoundary from '../ErrorBoundary'
import { countNotesForFolder } from '../notes-helpers'
import '../index.css'

class App extends React.Component {
  state = {
    notes: [],
    folders: [],
    noteCount: {}
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));
        return Promise.all([notesRes.json(), foldersRes.json()])
      })
      .then(([notes, folders]) => {
      const numbers = {}
      folders.forEach(folder => {
      console.log(countNotesForFolder(notes, folder.id))
      return numbers[folder.id] = countNotesForFolder(notes, folder.id)
      
    })
      console.log(numbers)
        this.setState({notes, folders, noteCount: numbers});
      })
      .catch(error => {
        console.error({error});
      });
  }

  handleDeleteNote = id => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    });
  };

  handleAddFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  handleAddNote = note => {
    const newNoteCount = this.state.noteCount[note.folder_id] + 1
    this.state.noteCount[note.folder_id] = newNoteCount
    this.setState({
      notes: [...this.state.notes, note], noteCount: this.state.noteCount
    })
  }

  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route 
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
        ))}
        <Route path='/note/:id'component={NotePageNav} />
        <Route path='/add-folder' component={NotePageNav} />
        <Route path='/add-note' component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        ))}
        <Route path='/note/:id' component={NotePageMain} />
        <Route path='/add-folder' component={AddFolder} />
        <Route path='/add-note' component={AddNote} />
      </>
    );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      noteCount: this.state.noteCount
    };

    return (
      <ErrorBoundary>
        <NotefulContext.Provider value={value}>
          <div className='App'>
            <nav className='App__nav'>{this.renderNavRoutes()}</nav>
            <header className='App__header'>
              <h1>
                <Link to='/'>Noteful</Link>{' '}
              <FontAwesomeIcon icon='check-double' />
              </h1>
            </header>
            <main className='App__main'>{this.renderMainRoutes()}</main>
          </div>
        </NotefulContext.Provider>
      </ErrorBoundary>
    );
  }
}

export default App;
