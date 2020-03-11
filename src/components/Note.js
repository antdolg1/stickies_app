import React, {Component} from "react";

const saveText = "SAVE";

export default class Note extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
    }

    updatePosition({position}) {
        this.style = {
            left: (position ? position.xPos : this.randomBetween(0, window.innerWidth - 280) + "px"),
            top: (position ? position.yPos : this.randomBetween(0, window.innerHeight - 280) + "px")
        };
    }

    componentWillMount() {
        this.updatePosition(this.props);
    }

    componentWillUpdate(nextProps) {
        this.updatePosition(nextProps);
    }

    onDragStart(e) {
        const {index} = this.props;
        e.dataTransfer.setData("application/x-note", index);
    }

    // Get random position
    randomBetween(min, max) {
        return (min + Math.ceil(Math.random() * max));
    }

    // Turn on edit moge
    edit() {
        this.setState({editing: true});
        this.props.changeEditingStatus(this.props.index, true);
    }

    // Save edits
    save() {
        const {index} = this.props;
        this.props.onChange(this.newTitle.value, this.newText.value, index);
        this.setState({editing: false});
        this.props.changeEditingStatus(this.props.index, false);
    }

    // Remove note
    remove() {
        const {index} = this.props;
        this.props.onRemove(index);
    }

    // Render note body
    renderNoteBody(content, noteTitle, save, close) {
        return (
            <div draggable="true" id={"note"+this.props.id} onDragStart={(e) => this.onDragStart(e)} onDoubleClick={() => this.edit()}
                 className="note" style={this.style}>
                <article>
                    <header className="note__header" id={"header"+this.props.id}>
                        <div className="wrapper-tooltip">
                            {close ? <span onClick={() => this.remove()} className="close hairline"/> : ""}
                            <div className="noteTitle">{noteTitle}</div>
                        </div>
                    </header>
                    <div className="note__content">{content}</div>
                    <footer className="note__footer">
                        {save ? <div className="note__save" onClick={() => this.save()}>{saveText}</div> : ""}
                    </footer>
                </article>
            </div>
        );
    }

    // Render note preview
    renderDisplay() {
        const {children, title} = this.props;
        return this.renderNoteBody(children, title, false);
    }

    // Render note edit mode
    renderForm() {
        const {children, title} = this.props;

        const contentEdit = (
            <div>
                <textarea ref={ref => this.newText = ref} defaultValue={children} id={"textarea" + this.props.id} className="note__textarea"/>
            </div>
        );
        const noteTitle = (
            <div>
                <textarea ref={ref => this.newTitle = ref} defaultValue={title} id={"titlearea" + this.props.id} className="note__titlearea"/>
            </div>
        );

        return this.renderNoteBody(contentEdit, noteTitle, true, true);
    }

    render() {
        const {editing} = this.state;
        return (editing ? this.renderForm() : this.renderDisplay());
    }

}
