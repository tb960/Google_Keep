import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import ContentEditable from "react-contenteditable";

function ToDoItem(props){

  function shiftFocus(event, isEntry){
    if (event.key === "Enter")
    {
      if (isEntry === true) {
        document.querySelector("#new-entry").focus();
      }
      else {
        document.querySelector("#new-todo").focus();
      }
      event.preventDefault();
    }
  }

  const StyledCheckbox = withStyles({
    root: {
      '&:hover': {
        backgroundColor: 'rgb(245, 186, 19, 0.3)',
    }
  }
  })(Checkbox);

  return(
    <div className="todo-wrapper">
      <StyledCheckbox onClick={(event) => {props.isEntry ? props.deleteEntry(props.toDoItemId) : props.deleteToDoItem(event, props.noteId, props.toDoItemId)}}/>
      <ContentEditable className="editable todo-item" html={props.toDoItem} onKeyPress={(event) => shiftFocus(event, props.isEntry)} onChange={(event) =>  {props.isEntry ? props.editEntry(event, props.toDoItemId) : props.changeToDoItem(event, props.noteId, props.toDoItemId)}} />
    </div>
  )
}

export default ToDoItem;
