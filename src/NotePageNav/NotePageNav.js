import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import NotefulContext from '../NotefulContext'
import { findNote, findFolder } from '../notes-helpers'
import PropTypes from 'prop-types'

class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => {}
    },
    match: {
      params: {}
    }
  }
  static contextType = NotefulContext;

  render() {
    const { notes, folders } = this.context
    const { id } = this.props.match.params
    const note = findNote(notes, id) || {}
    const folder = findFolder(folders, note.folderId)
    return (
      <div className='NotePageNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Back
        </CircleButton>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
        )}
      </div>
    )
  }
}

NotePageNav.propTypes = {
  id: PropTypes.string
}

export default NotePageNav;