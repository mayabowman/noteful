import React from 'react'

function NavCircleButton(props) {
  const { tag, className, children, ...otherProps} = props

  return React.createElement(
    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

NavCircleButton.defaultProps ={
  tag: 'a',
}

export default NavCircleButton;