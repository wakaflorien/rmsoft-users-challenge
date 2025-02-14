import React from 'react'

function Button(props) {
    return (
        <button type='button' className={`${props.classNames} p-2 rounded-md`} onClick={props.onClick}>{props.title}</button>

    )
}

export default Button