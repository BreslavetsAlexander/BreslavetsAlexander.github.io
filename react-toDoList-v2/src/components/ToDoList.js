import React from 'react'
import ToDoItem from './ToDoItem'

export default function(props) {
    return (
        <ul className="list-group list-group-flush">
            {
                props.toDoItems.map((item, i) => {
                    return <ToDoItem 
                                key={i}
                                item={item}
                                checkItem={()=>props.checkItem(i)}
                                doneItem={()=>props.doneItem(i)}
                                restoreItem={()=>props.restoreItem(i)}
                                removeItem={()=>props.removeItem(i)}
                            />
                })
            }
        </ul>
    )
}