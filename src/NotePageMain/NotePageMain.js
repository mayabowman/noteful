import React from 'react'
import Note from '../Note/Note'
import NotefulContext from '../NotefulContext'
import { findNote } from '../notes-helpers'
import PropTypes from 'prop-types'

class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = NotefulContext

  handleDeleteNote = () => {
    this.props.history.push('/')
  }
  render() {
    const { notes=[] } = this.context
    const { id } = this.props.match.params
    const note = findNote(notes, id) || { content: ''}
    console.log('context notes', this.context.notes.id)
    console.log('notes', notes)
    console.log('id', id)
    
    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
            )}
        </div>
      </section>
    )
  }
}

NotePageMain.propTypes = {
  id: PropTypes.string
}

export default NotePageMain;