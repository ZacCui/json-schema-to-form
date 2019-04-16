import React, { Component } from "react";
import Form from "./Form";
import {
  bmiReferenceProps,
  headCircumferenceReferenceProps
} from "./ReferenceProps";

class App extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Form {...bmiReferenceProps} />
        <Form {...headCircumferenceReferenceProps} />
      </div>
    );
  }
}

export default App;
