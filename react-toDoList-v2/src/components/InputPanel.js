import React from 'react'

export default function(props) {
    return (
        <div className="input-group">
            <div className="input-group-prepend">
                <span>
                    <button onClick={props.selectAll} className="btn btn-outline-primary" type="button" style={{marginRight: '5px'}}>Select all</button>
                </span>
            </div>
            <input type="text" onKeyDown={event => props.addItem(event)} className="form-control"/>
        </div>
    )
}