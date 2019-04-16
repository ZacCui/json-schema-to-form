import React from "react";
import _ from "lodash";
import "./Form.css";

class Form extends React.Component {
  state = {
    submitting: false,
    success: false
  };

  componentWillMount() {
    const object = {};
    if (this.props.observationName) {
      object["observationName"] = this.props.observationName;
    }
    // read data fields from props to states
    if (this.props.dataElements) {
      const error = {};
      const bounds = {};
      const required = {};
      this.props.dataElements.forEach(element => {
        object[element.id] = "";
        // store required fields in error message list
        if (element.isRequired) {
          error[element.id] = "";
          required[element.id] = true;
        }
        // store rules and add it to error list
        if (element.bounds) {
          error[element.id] = "";
          bounds[element.id] = element.bounds;
        }

        // store default value
        if (element.options) {
          for (let key in element.options) {
            if (element.options[key].isDefault) {
              object[element.id] = element.options[key].id;
              break;
            }
          }
        }
      });
      object["error"] = error;
      object["bounds"] = bounds;
      object["required"] = required;
    }
    this.setState(object);
  }

  vaildateRequiredFields = () => {
    // Check required fields
    let vaildate = true;
    let errorMessage = this.state.error;
    // if a required field is not filled them pass an error message to state.error
    if (this.state.error) {
      for (let key in this.state.error) {
        if (this.state[key] === "" && this.state.required[key]) {
          if (vaildate) vaildate = false;
          errorMessage[key] = `${key} is required. `;
        } else {
          errorMessage[key] = "";
        }
      }
      this.setState({ error: errorMessage });
    }

    return vaildate;
  };

  vaildateFieldRules = () => {
    // Check fields' rules
    let vaildate = true;
    let errorMessage = this.state.error;
    // if rule check failed, then pass an error message to state.error
    if (this.state.bounds) {
      for (let item in this.state.bounds) {
        if (this.state[item] && this.state.bounds[item].upperLimit) {
          if (
            parseFloat(this.state[item]) > this.state.bounds[item].upperLimit
          ) {
            if (vaildate) vaildate = false;
            errorMessage[item] = `Invaild ${item} as the upperlimit is ${
              this.state.bounds[item].upperLimit
            }. `;
          } else {
            errorMessage[item] = "";
          }
        }
      }
      this.setState({ error: errorMessage });
    }
    return vaildate;
  };

  calculateBmi = () => {
    if (this.state.height && this.state.weight) {
      this.setState(
        {
          bmi: (+this.state.weight / Math.pow(+this.state.height / 100, 2))
            .toFixed(1)
            .toString()
        },
        () => {
          this.vaildateRequiredFields() && this.vaildateFieldRules();
        }
      );
    }
  };

  handleOnBlur = () => {
    this.calculateBmi();
  };

  handleFieldOnChange = event => {
    const key = event.target.attributes.placehoder.value;
    this.setState({
      [key]: event.target.value
    });
  };

  handleFormOnSubmit = event => {
    event.preventDefault();
    // disable submit button
    this.setState({ submitting: true });
    // vaildate data
    if (this.vaildateRequiredFields() && this.vaildateFieldRules()) {
      this.setState({
        submitting: false,
        success: true
      });
      const data = {};
      this.props.dataElements.forEach(e => {
        data[e.id] = this.state[e.id];
      });
      // send data to back end here
    } else {
      this.setState({
        submitting: false,
        success: false
      });
    }
  };

  successMessage = () => {
    return this.state.success ? (
      <div className="form-success-message">Submission completed</div>
    ) : null;
  };

  errorMessage = (key, message) => {
    return this.state.error[key] ? (
      <div className="form-error-message">
        {this.state.error[key]} {message}
      </div>
    ) : null;
  };

  requiredLabel = key => {
    return this.state.required[key] ? (
      <label className="form-required-label">*</label>
    ) : null;
  };

  render() {
    if (this.props.dataElements) {
      return (
        <form className="form" onSubmit={this.handleFormOnSubmit}>
          {this.successMessage()}
          <h3 className="form-title">{this.state.observationName}</h3>
          {_.map(this.props.dataElements, data => {
            // if display is false
            if (!data.display) {
              // special message to explian special field (eg. bmi)
              let specialMessage = "";
              if (data.id === "bmi") {
                specialMessage = `(bmi = Weight(kg) / Height(m)^2 )`;
              }
              // if the rules check failed for a hidden field, then display the
              // error message back to user
              if (data.bounds) {
                return (
                  <div key={data.id} className="form-label">
                    {this.errorMessage(
                      data.id,
                      `Current ${data.id} is ${this.state[data.id]}` +
                        specialMessage
                    )}
                  </div>
                );
              }
              return;
            }
            const type =
              data.type === "select"
                ? "radio"
                : data.type.replace(/input/gi, "");
            // case: input type = 'radio'
            if (type === "radio" && data.options) {
              return (
                <div key={data.id} className="form-radio">
                  <label htmlFor={data.id} className="form-label">
                    {data.displayName}
                    {data.unitOfMeasure ? ` (${data.unitOfMeasure})` : null}
                    {this.requiredLabel(data.id)}
                  </label>
                  {data.options.map(option => {
                    return (
                      <div key={option.id} className="form-options">
                        <label htmlFor={option.name}>{option.name}</label>
                        <input
                          value={option.id}
                          checked={option.id === +this.state[data.id]}
                          placehoder={data.id}
                          name={option.name}
                          type={type}
                          onChange={this.handleFieldOnChange}
                        />
                      </div>
                    );
                  })}
                  {this.errorMessage(data.id)}
                </div>
              );
              // case: normal input field
            } else {
              return (
                <div key={data.id} className="form-input">
                  <label htmlFor={data.id} className="form-label">
                    {data.displayName}
                    {data.unitOfMeasure ? ` (${data.unitOfMeasure})` : null}
                    {this.requiredLabel(data.id)}
                  </label>
                  <input
                    value={this.state[data.id]}
                    placehoder={data.id}
                    type={type}
                    onChange={this.handleFieldOnChange}
                    onBlur={this.handleOnBlur}
                  />
                  {this.errorMessage(data.id)}
                </div>
              );
            }
          })}
          <div className="form-button">
            <button type="submit" disabled={this.state.submitting}>
              Submit
            </button>
          </div>
        </form>
      );
    } else {
      return (
        <h1 className="form-error-message">Error: DataElements is required</h1>
      );
    }
  }
}

export default Form;
