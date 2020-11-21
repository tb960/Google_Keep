import React, {useState} from 'react';
import Header from "./Header";
import Note from "./Note";
import ToDoList from "./ToDoList";
import Form from "./Form";
import uuid from 'react-uuid';

function App() {
  const [items, setItems] = useState([]);
  const [toDoLists, setToDoLists] = useState([]);

  // Note Logic

  function addNote(event, newNote){
    setItems(prevItems => [...prevItems, newNote]);
  }

  function deleteNote(noteId)
  {
    setItems(prevItems => prevItems.filter(oldItem => oldItem.key !== noteId));
  }

  function updateTitle(event, noteId)
  {
    if (event.currentTarget.id === "note") {
      setItems(prevItems => {
        let foundNoteIndex = prevItems.findIndex(item => item.key === noteId);
        prevItems[foundNoteIndex].title = event.target.value;
        return [...prevItems]
      });
    }
    else if (event.currentTarget.id === "toDoList") {
      setToDoLists(prevToDoLists => {
        let foundListIndex = prevToDoLists.findIndex(toDoList => toDoList.key === noteId);
        prevToDoLists[foundListIndex].title = event.target.value;
        return [...prevToDoLists]
      })
    }
  }

  function updateContent(event, noteId)
  {
    setItems(prevItems => {
      let foundNoteIndex = prevItems.findIndex(item => item.key === noteId);
      prevItems[foundNoteIndex].content = event.target.value;
      return [...prevItems]
    });
  }

  // ToDo Lists Logic

  function addToDoLists(event, newToDoList)
  {
    setToDoLists(prevToDoLists => [...prevToDoLists, newToDoList]);
  }

  function deleteToDoList(listId)
  {
    setToDoLists(prevToDoLists => prevToDoLists.filter(oldLists => oldLists.key !== listId));
  }

  function changeToDoItem(event, listId, itemId)
  {
    setToDoLists(prevToDoLists => {
      console.log(prevToDoLists);
      let foundListIndex = prevToDoLists.findIndex(toDoLists => toDoLists.key === listId);
      prevToDoLists[foundListIndex].content.find(oldListItem => oldListItem.key === itemId).content = event.target.value;
      console.log(prevToDoLists);
      return [...prevToDoLists]
    })
  }

  function addToDoItem(event, listId) {
    if (event.key === 'Enter') {
      setToDoLists(prevToDoLists => {
        let foundListIndex = prevToDoLists.findIndex(toDoLists => toDoLists.key === listId);
        prevToDoLists[foundListIndex].content = [...prevToDoLists[foundListIndex].content, {key: uuid(), content: event.target.value}];
        return [...prevToDoLists]
      })
      event.preventDefault();
      return ""
    }
  }

  function deleteToDoItem(event, listId, itemId)
  {
    setToDoLists(prevToDoLists => {
      let foundListIndex = prevToDoLists.findIndex(toDoLists => toDoLists.key === listId);
      prevToDoLists[foundListIndex].content = prevToDoLists[foundListIndex].content.filter(oldListItem => oldListItem.key !== itemId);
      return [...prevToDoLists]
    })
    event.stopPropagation();
  }

  return (
    <div>
      <Header />
      <Form addNote={addNote} addToDoLists={addToDoLists}/>
      <div className="wrapper">
        {items.map(item => <Note key={item.key} id={item.key} title={item.title} content={item.content} deleteNote={deleteNote} updateTitle={updateTitle} updateContent={updateContent}/>)}
        {toDoLists.map(toDoList => <ToDoList key={toDoList.key} noteId={toDoList.key} title={toDoList.title} content={toDoList.content} deleteToDoList={deleteToDoList} deleteToDoItem={deleteToDoItem} changeToDoItem={changeToDoItem} addToDoItem={addToDoItem} updateTitle={updateTitle}/>)}
      </div>
    </div>
  );
}

export default App;
