import React, {useState, useRef, useEffect} from "react";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import ContentEditable from "react-contenteditable";
import {customNoteStyles, customButtonStyles, blurBackground} from "../custom-styles/note-expanded";

function Note(props){

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

  return(
    <div>
      <div ref={note} onClick={expandCenter} className="note" style={isClicked ? customNoteStyles : null}>
        <ContentEditable id="note" className="editable title" html={props.title} disabled={isClicked ? false : true} onChange={event => props.updateTitle(event, props.id)}/>
        <ContentEditable className="editable content" disabled={isClicked ? false : true} html={props.content} onChange={event => props.updateContent(event, props.id)}/>
        <div className="button-wrapper">
          <button onClick={() => props.deleteNote(props.id)} style={isClicked ? customButtonStyles : null}><DeleteRoundedIcon/></button>
        </div>
      </div>
      <div style={isClicked ? blurBackground : null}></div>
    </div>
  )
}

export default Note;
