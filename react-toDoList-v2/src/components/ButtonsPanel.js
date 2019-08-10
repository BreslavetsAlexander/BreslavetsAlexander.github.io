import React from 'react'

export default function(props) {
    return (
        <div className="btn-group btn-block">
            <button type='button' onClick={props.doneItems} className='btn btn-success'>Done</button>
            <button type='button' onClick={props.restoreItems} className='btn btn-info'>Restore</button>
            <button type='button' onClick={props.removeItems} className='btn btn-danger'>Remove</button>
        </div>
    )
}