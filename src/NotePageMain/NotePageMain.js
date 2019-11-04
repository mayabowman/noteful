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

  handleDeleteNote = note_id => {
    this.props.history.push('/')
  }
  render() {
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: ''}
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
  note_id: PropTypes.string
}

export default NotePageMain;