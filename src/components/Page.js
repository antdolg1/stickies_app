import React, {Component} from "react";
import Note from "./Note";
import Colors from "./Colors";

const newNoteText = "Note text";
const newNoteTitle = "Note title";

export default class Page extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: []
        };
    }

    componentWillMount() {
        // Get notes from local storage
        const notes = JSON.parse(localStorage.getItem("notesStorage")) || [];
        notes.map((single) => {
            this.add(single.content, single.title, single.position);
        });
    }

    updateEditingStatus(i, status){
        const {notes} = this.state;
        notes[i].editing = status;
        this.saveToStorage(notes);
    }

    // Save to localStorage
    saveToStorage(notes) {
        this.setState({notes});
        localStorage.setItem("notesStorage", JSON.stringify(notes));
    }

    // Get next ID
    nextId() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    }

    // Add note to localStorage and state
    add(text, title, position) {
        const {notes} = this.state;
        // this.state.notes
        // const {notes} = this.state;

        notes.push({
            id: this.nextId(this),
            content: text,
            title: title,
            editing: false,
            position
        });

        this.saveToStorage(notes);
    }

    // Update note text
    update(newNoteTitle, newText, i) {
        const {notes} = this.state;
        notes[i].title = newNoteTitle;
        notes[i].content = newText;
        this.saveToStorage(notes);
    }

    // Update note position
    updatePosition(position, i) {
        const {notes} = this.state;
        notes[i].position = position;
        this.saveToStorage(notes);
    }

    // Remove note
    remove(i) {
        const {notes} = this.state;
        notes.splice(i, 1);
        this.saveToStorage(notes);
    }
    // Remove all notes
    removeAll() {
        const {notes} = this.state;
        let length = notes.length;
        notes.splice(0, length);
        this.saveToStorage(notes);
    }

    // Render Notes
    renderNotes(note, i) {
        return (
            <Note id={note.id}
                  index={i}
                  position={note.position}
                  title={note.title}
                  onChange={this.update.bind(this)}
                  onDrag={this.updatePosition.bind(this)}
                  onRemove={this.remove.bind(this)}
                  changeEditingStatus={this.updateEditingStatus.bind(this)}>
                {note.content}
            </Note>
        );
    }

    onDragOver(e) {
        e.preventDefault();
    }

    onDrop(e) {
        let noteId = e.dataTransfer.getData("application/x-note");
        let position = {xPos: e.clientX, yPos: e.clientY};
        this.updatePosition(position, noteId);
    }

    //Change note color & font color
    changeColor(value) {
        const {notes} = this.state;
        {notes.map(note => {
            if(note.editing === true){
                document.getElementById("note"+note.id).style.backgroundColor = value;
                if(value === 'black'){
                    document.getElementById("note"+note.id).style.color = 'white';
                    document.getElementById("textarea"+note.id).style.color = 'white';
                    document.getElementById("titlearea"+note.id).style.color = 'white';
                }
            }
        })}
    }

    render() {
        const {notes} = this.state;
        let counter = notes.length;
        return (
            <div className="board" onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e)}>
                <ul>
                    <li className="navbar navbarImage"><img src="src/resources/Logo.PNG" alt="Stickies logo"/></li>
                    <li className="navbar navbarTitle">Stickies app</li>
                    <li className="navbar counter"><i className="far fa-sticky-note"/> {counter}</li>
                    <li className="navbar" onClick={this.add.bind(this, newNoteText, newNoteTitle, false)}><i className="far fa-plus-square"/> Add note</li>
                    <li className="navbar" onClick={this.removeAll.bind(this)}><i className="far fa-trash-alt"/> Delete all notes</li>
                    <li className="color-selection navbar">
                        <i className="fas fa-paint-brush"/><Colors onChange={this.changeColor.bind(this)}/>
                    </li>
                </ul>
                <div className="boardTransparent"/>
                {notes.map(this.renderNotes.bind(this))}
                </div>
        );
    }

}
