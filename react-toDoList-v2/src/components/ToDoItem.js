import React from 'react'

const styles = {
    item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px 1.25rem',
        borderTop: '1px solid #ccc'
    },
    todoDone: {
        textDecoration: 'line-through',
        fontStyle: 'italic',
        color: 'gray'
    }
}

export default function(props) {
    return (
        <li className="item" style={styles.item}>
            <input  checked={props.item.checked} onChange={props.checkItem} style={{margin: 0}} className="form-check-input" type="checkbox" id={props.item.title + Date.now()} />
            <label style={{margin: '-4.8px 0 0 15px', ...props.item.done ? styles.todoDone : null}} className="form-check-label" htmlFor={props.item.title + Date.now()}>{props.item.title}</label>
            <button onClick={props.doneItem} type="button" style={{float: "right", display: props.item.done ? "none" : "block"}} className="btn btn-outline-success">Done</button>
            <div style={{float: "right", display: !props.item.done ? "none" : "block"}}>
                <button onClick={props.removeItem} type="button" className="btn btn-outline-danger">Remove</button>
                <button onClick={props.restoreItem} type="button" className="btn btn-outline-info">Restore</button>
            </div>
        </li>
    )
}