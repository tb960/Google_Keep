import React, {useState, useRef, useEffect} from "react";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import ContentEditable from "react-contenteditable";
import ToDoItem from './ToDoItem';
import AddIcon from '@material-ui/icons/Add';
import TextareaAutosize from 'react-textarea-autosize';
import {customNoteStyles, customButtonStyles, blurBackground} from "../custom-styles/note-expanded";

function ToDoList(props){

  const [content, setContent] = useState("");

  useEffect(() => {
    // Execute after the render is completed
    document.addEventListener("mousedown", handleClick);
    // Remove if component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const [isClicked, setIsClicked] = useState(false);
  const note = useRef();

  function handleClick(event){
    // If the current node contains the triggered event
    if (note.current.contains(event.target)) {
      // inside click
      return;
    }
    // outside click
    setIsClicked(false);
  };

  function expandCenter(){
    setIsClicked(true);
  }

  function changeContent(event){
    setContent(event.target.value)
  }

  return(
    <div>
      <div ref={note} onClick={expandCenter} className="note" style={isClicked ? customNoteStyles : null}>

        <ContentEditable id="toDoList" className="editable title" html={props.title} disabled={isClicked ? false : true} onChange={event => props.updateTitle(event, props.noteId)}/>

        {!props.content.length && !isClicked ? <p className="todoitem"></p> : null}  { /* Show "Empty List" when list is empty */}

        {props.content.map(toDoItem => <ToDoItem key={toDoItem.key} noteId={props.noteId} toDoItemId={toDoItem.key} toDoItem={toDoItem.content} deleteToDoItem={props.deleteToDoItem} changeToDoItem={props.changeToDoItem} isClicked={isClicked}/>)}

        <div className="todo-wrapper">
          {isClicked ? <AddIcon className="add-icon"/> : null}
          {isClicked ? <TextareaAutosize id="new-todo" className="todo-input" name="listItem" placeholder="List Item" minRows={1} onChange={changeContent}
          onKeyPress={(event) => setContent(props.addToDoItem(event, props.noteId))} value={content}/> : null}
        </div>

        <div className="button-wrapper">
          <button onClick={() => props.deleteToDoList(props.noteId)} style={isClicked ? customButtonStyles : null}><DeleteRoundedIcon/></button>
        </div>

      </div>

      <div style={isClicked ? blurBackground : null}></div>
    </div>
  )
}

export default ToDoList;
