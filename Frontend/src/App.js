import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.addInput = this.addInput.bind(this);
    this.addRadio = this.addRadio.bind(this);
    this.addRadioButton = this.addRadioButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      input: [],
      radio: [],
      hell: "false",
      datepicker: [],
      stars: [],
    }
  }
  addDate = (date) => {
    var datepicker = this.state.datepicker;
    datepicker.push({
      name: "untitled"
    })
    this.setState({ datepicker })
  }
  handleChange = (e) => {
    var index = e.target.name.split("-")[1];
    var input = this.state.input.slice();
    input[index].name = e.target.value;
    this.setState({ input })
  }
  handleChange2 = (e) => {
    var index = e.target.id.split("-")[1];
    var lab = e.target.id.split("-")[2];

    var radio = this.state.radio.slice();
    radio[index].radios[lab].name = e.target.value;
    this.setState({ radio })

  }
  handleChange3 = (e) => {
    var index = e.target.name.split("-")[1];
    var input = this.state.radio.slice();
    input[index].name = e.target.value;
    this.setState({ radio: input })
  }
  handleChange4 = (e) => {
    var index = e.target.name.split('-')[1]
    var datepicker = this.state.datepicker.slice();
    datepicker[index].name = e.target.value
    this.setState({ datepicker });
  }
  addInput = (name) => {
    let state = Object.assign(this.state);
    let input = state.input.slice();
    input.push({
      name: 'untitled',
    })
    this.setState({ input });
  }
  addRadio = (name) => {
    let state = Object.assign(this.state);
    let input = state.radio.slice();
    input.push({
      name: "untitled",
      radios: [{ name: "untitled" }]
    })
    this.setState({ radio: input })

  }
  addRadioButton = (e) => {
    e.preventDefault()
    var index = e.target.name.split("-")[1];
    let state = Object.assign(this.state);
    let radio = state.radio.slice();
    console.log(index)
    radio[index].radios.push({
      name: "untitled",
    })
    this.setState({ radio: radio, hell: "true" })
  }
  delete = (e) => {
    e.preventDefault();
    var index = e.target.id.split("-")[1];
    var lab = e.target.id.split("-")[2];
    var radio = this.state.radio.slice();
    radio[index].radios.splice(lab, 1);
    this.setState({ radio })
  }
  delete1 = (e) => {
    e.preventDefault();
    var index = e.target.name.split("-")[1]
    var input = this.state.input.slice();
    input.splice(index, 1);
    this.setState({ input, hell: "true" });
  }
  delete2 = (e) => {
    e.preventDefault();
    var index = e.target.name.split("-")[1];
    var radio = this.state.radio.slice();
    radio.splice(index, 1);
    this.setState({ radio })
  }
  delete3 = (e) => {
    e.preventDefault();
    var index = e.target.name.split("-")[1];
    var datepicker = this.state.datepicker;
    datepicker.splice(index, 1);
    this.setState(datepicker);
  }
  done1 = (e) => {
    e.preventDefault();
    this.setState({ hell: "true" })
    axios.get('https://api.github/users', this.state).then((data) => {
    })
  }
  render() {
    const style = {
      border: "0",
      textDecoration: "none",
    }

    var inputs = this.state.input.map((data, i) => {
      return (

        <div key={i} className="margin-large">
          <input value={data.name} className="no-border1 btn-heading margin border-5"
            name={`value-${i}`} onChange={this.handleChange} />
          <input type="sunmit" className="btn-cross btn-inline"
            onClick={this.delete1} name={`value-${i}`}
            value='X' />
          <input className="btn-down large border" />
        </div>
      )
    })
    var radiogroups = this.state.radio.map((data, i) => {
      let label = i;
      return (
        <div key={i} className="margin-large">
          <input type="text" className="radio-group btn-heading border-3" name={`lable-${i}`}
            onChange={this.handleChange3} value={data.name} style={style} />
          <input type="submit" onClick={this.addRadioButton} value="+"
            name={`value-${i}`} className="btn-cross" />
          <input type="submit" className="btn-cross" onClick={this.delete2}
            value='x' name={`value-${i}`} />
          <div>
            {this.state.radio.length > 0 ?
              data.radios.map((doc, i) => {
                return (
                  <div className="margin-large btn-inline">
                    <input type="text" onChange={this.handleChange2}
                      id={`radio-${label}-${i}`}
                      className="no-border border-2" value={doc.name} />
                    <input type="submit" onClick={this.delete} value="X"
                      id={`radioLable-${label}-${i}`} className="btn-cross" />
                    <input type="radio" className="radiogroups" name={`radio-${label}`} />
                  </div>
                )
              })
              : null
            }
          </div>
        </div>
      )
    })
    var date = this.state.datepicker.map((data, i) => {
      return (
        <div>
          <input type="text" className="no-border2 margin-large margin border-4 btn-heading"
            value={this.state.datepicker[i].name}
            name={`value-${i}`} onChange={this.handleChange4} />
          <DatePicker className="margin-large" />
          <input type="sunmit" className="btn-cross btn-inline"
            onClick={this.delete3} name={`value-${i}`}
            value='X' />
        </div>
      )
    })
    return (
      <div className="container">
        <div className="block">
          <div className="btn add btn-inline" onClick={this.addInput}>add input field</div>
          <div className="btn add btn-inline" onClick={this.addDate}>add date picker</div>
          <div className="btn add btn-inline" onClick={this.addStars}>add rating stars</div>

          <div className="btn radio add btn-inline"
            onClick={this.addRadio}>add a radio button</div>
        </div>
        {inputs}
        {radiogroups}
        {date}
        <button className="btn-submit"
          onClick={this.done1}>done</button>
      </div>

    );
  }
}

export default App;
