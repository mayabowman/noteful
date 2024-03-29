import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import NotefulContext from '../NotefulContext'
import { countNotesForFolder } from '../notes-helpers'

class NoteListNav extends React.Component {
  static contextType = NotefulContext

  render() {
    const { folders, notes, noteCount } = this.context

    // const numbers = {}
    // folders.forEach(folder => {
    //   console.log(countNotesForFolder(notes, folder.id))
    //   return numbers[folder.id] = countNotesForFolder(notes, folder.id)
      
    // })
    console.log(noteCount)
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {folders.map(folder => 
            <li key={folder.id}>
              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}
              >
                <span className='NoteListNav__num-notes'>
                  {noteCount[folder.id]}
                </span>
                {folder.name}
              </NavLink>
            </li>
            )}
        </ul>
        <div className='NoteListNav__button-wrapper'>
            <CircleButton
              tag={Link}
              to='/add-folder'
              type='button'
              className='NoteListNav__add-folder-button'
            >
              <FontAwesomeIcon icon='plus' />
              <br />
              Folder
            </CircleButton>
        </div>
      </div>
    )
  }
}

export default NoteListNav;