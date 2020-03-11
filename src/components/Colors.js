import React, { Component } from "react";

export default class Colors extends Component {

    constructor(props) {
        super(props);
    }

    changeColor(event){
        this.props.onChange(event.target.value);

    }

    render() {
        return (
            <select id="color" className="select-color" onChange={this.changeColor.bind(this)}>
                <option value="">Color</option>
                <option className="black" value="black">Black</option>
                <option className="blue" value="#00CCFF">Blue</option>
                <option className="yellow" value="#FFDA65">Yellow</option>
            </select>
        )
    }

}