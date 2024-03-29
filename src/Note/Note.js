import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import NotefulContext from '../NotefulContext'
import config from '../config' 
import PropTypes from 'prop-types'
import { thisExpression } from '@babel/types'

class Note extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {},
  }
  static contextType = NotefulContext;

  handleClickDelete = e => {
    e.preventDefault()
    const id = this.props.id
    fetch(`${config.API_ENDPOINT}/notes/${id}`, {
      method: 'DELETE',
      
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => { throw error })
      }
      return
    })
    .then(() => {
      this.context.deleteNote(id)
      this.props.onDeleteNote(id)
    })
    .catch(error => {
      console.error({ error })
    })
  }
  render() {
    const { name, id, modified } = this.props
    
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button 
          className='Note__delete' 
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          Remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {new Date(modified).getFullYear() + '/' + (new Date(modified).getMonth() + 1) + '/' + new Date(modified).getDate()}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

Note.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  modified: PropTypes.string
}

export default Note;