import React from 'react'
import { Link } from 'react-router-dom'
// import { format } from 'date-fns'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './Note.css';

function Note(props) {
  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${props.id}`}>
          {props.name}
        </Link>
      </h2>
      <button className='Note__delete' type='button'>
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        Remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {new Date(props.modified).getFullYear() + '/' + (new Date(props.modified).getMonth() + 1) + '/' + new Date(props.modified).getDate()}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Note;