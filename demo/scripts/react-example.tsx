import * as React from "react";
import * as ReactDOM from "react-dom";
import { validate } from "../../src/main";

interface InputState {
    errorMessages: Array<string>
}

class InputExample extends React.Component<any, InputState> {

    public constructor() {
        super();

        this.state = {
            errorMessages: []
        };
    }

    private _onChange(event: any) {
        this.props.object[this.props.property] = (event.target as any).value;
    }

    private _validate() {
        this.setState({
            errorMessages: validate(this.props.object, this.props.property)[this.props.property]
        });
    }

    public render() {
        return <div>
                <Value>{this.props.object[this.props.property]}</Value>
                 <label>{this.props.label}</label>
                 <input type="text" name="name" onChange={this._onChange.bind(this)} onBlur={this._validate.bind(this)} />
                 <ul>
                    { this.state.errorMessages.map((message, index) => <li key={index}>{message}</li>) }
                 </ul>
               </div>;
    }
}

class Value extends React.Component {
    render () {
        return <p>Value: {this.props.children}</p>;
    }
}

const user = (window as any).example;

ReactDOM.render(
    <div>
        <InputExample object={user} property="givenName" label="First Name" />
        <InputExample object={user} property="familyName" label="Last Name" />
        <InputExample object={user} property="emailAddress" label="Email" />
        <InputExample object={user} property="confirmEmailAddress" label="Confirm Email" />
    </div>,
   document.getElementById("react-example")
);
