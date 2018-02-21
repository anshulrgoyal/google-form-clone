import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import DatePicker from 'react-date-picker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.addInput = this.addInput.bind(this);
    this.addRadio = this.addRadio.bind(this);
    this.addRadioButton = this.addRadioButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getIndex=this.getIndex.bind(this)
    this.state = {
      input: [],
      radio: [],
      hell: "false",
      datepicker: [],
      stars: [],
      id:0
    }
  }
  //get the index of datepicker
  getIndex=(e)=>{
    this.setState({id:e.target.split("-")[1]})
  //  console.log(e.target.id.split('-'))
  }
  //add datepicker
  addDate = (date) => {
    var datepicker = this.state.datepicker;
    datepicker.push({
      name: "untitled",
      selected:moment()
    })
    this.setState({ datepicker })
  }
  //change in date
  handleDate=(date)=>{
    // var index=e.target.name.split("-")[1]
    // var datepicker=this.state.datepicker.slice()
    // datepicker[index].selected=date;
  //  var datepicker=this.state.datepicker.slice()
  //  datepicker[this.sate.id].selected=date
  //  this.setState({datepicker})


  }
  //change name of input
  handleChange = (e) => {
    var index = e.target.name.split("-")[1];
    var input = this.state.input.slice();
    input[index].name = e.target.value;
    this.setState({ input })
  }
  //change the name of radio button option
  handleChange2 = (e) => {
    var index = e.target.id.split("-")[1];
    var lab = e.target.id.split("-")[2];

    var radio = this.state.radio.slice();
    radio[index].radios[lab].name = e.target.value;
    this.setState({ radio })

  }
  //change the name of radio button
  handleChange3 = (e) => {
    var index = e.target.name.split("-")[1];
    var input = this.state.radio.slice();
    input[index].name = e.target.value;
    this.setState({ radio: input })
  }
  //change the name of date picker
  handleChange4 = (e) => {
    var index = e.target.name.split('-')[1]
    var datepicker = this.state.datepicker.slice();
    datepicker[index].name = e.target.value
    this.setState({ datepicker });
  }
  //add input box to the dom
  addInput = (name) => {
    let state = Object.assign(this.state);
    let input = state.input.slice();
    input.push({
      name: 'untitled',
    })
    this.setState({ input });
  }
  //radio button to the the dom
  addRadio = (name) => {
    let state = Object.assign(this.state);
    let input = state.radio.slice();
    input.push({
      name: "untitled",
      radios: [{ name: "untitled" }]
    })
    this.setState({ radio: input })

  }
  //add option to the radio button
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
  //remove radio button option
  delete = (e) => {
    e.preventDefault();
    var index = e.target.id.split("-")[1];
    var lab = e.target.id.split("-")[2];
    var radio = this.state.radio.slice();
    radio[index].radios.splice(lab, 1);
    this.setState({ radio })
  }
  //remove the input
  delete1 = (e) => {
    e.preventDefault();
    var index = e.target.name.split("-")[1]
    var input = this.state.input.slice();
    input.splice(index, 1);
    this.setState({ input, hell: "true" });
  }
  //remove the radio button
  delete2 = (e) => {
    e.preventDefault();
    var index = e.target.name.split("-")[1];
    var radio = this.state.radio.slice();
    radio.splice(index, 1);
    this.setState({ radio })
  }
  //remove the datepicker
  delete3 = (e) => {
    e.preventDefault();
    var index = e.target.name.split("-")[1];
    var datepicker = this.state.datepicker;
    datepicker.splice(index, 1);
    this.setState(datepicker);
  }
  //submit the form markup
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
//input fields
    var inputs = this.state.input.map((data, i) => {
      {/*input field markup*/}
      return (

        <div key={i} className="margin-large">
          <input value={data.name} className="no-border1 btn-heading margin border-5"
            name={`value-${i}`} onChange={this.handleChange} />

          <input type="sunmit" className="btn-cross btn-inline"
            onClick={this.delete1} name={`value-${i}`}
            value='X' />{/*remove the input button*/}
          <input className="btn-down large border" />
        </div>
      )
    })
    //===============================================================================
    //radio buttons
    var radiogroups = this.state.radio.map((data, i) => {
      let label = i;
      return (
        <div key={i} className="margin-large">
          <input type="text" className="radio-group btn-heading border-3" name={`lable-${i}`}
            onChange={this.handleChange3} value={data.name} style={style} />
          <input type="submit" onClick={this.addRadioButton} value="+"
            name={`value-${i}`} className="btn-cross" /> {/*add raadio button option*/}
          <input type="submit" className="btn-cross" onClick={this.delete2}
            value='x' name={`value-${i}`} /> {/*remove the radio button*/}
          <div>
            {this.state.radio.length > 0 ?
              data.radios.map((doc, i) => {
                return (
                  <div className="margin-large btn-inline">
                    <input type="text" onChange={this.handleChange2}
                      id={`radio-${label}-${i}`}
                      className="no-border border-2" value={doc.name} />
                    <input type="submit" onClick={this.delete} value="X"
                      id={`radioLable-${label}-${i}`} className="btn-cross" />{/*remove the radio button option*/}
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
    //=====================================================================================================
    //date picker
    var date = this.state.datepicker.map((data, i) => {
      return (
        <div  id={`valueq-${i}`}>
          <input type="text"  className="no-border2 margin-large margin border-4 btn-heading"
            value={this.state.datepicker[i].name}
            name={`value-${i}`} onChange={this.handleChange4}   id={`value-${i}`} />
          <DatePicker  selected={this.state.datepicker[i].selected} className="margin-large" id={`value-${i}`} onChange={this.handleDate}/>
          <input type="sunmit" className="btn-cross btn-inline"
            onClick={this.delete3} name={`value-${i}`}
            value='X' />//remove datepicker
        </div>
      )
    })
    //==========================================================================================================
    return (
      <div className="container">
        <div className="block">
      {  /*============================================-->
        buttons*/
      }
          <div className="btn add btn-inline"
          onClick={this.addInput}>add input field</div>
          <div className="btn add btn-inline"
          onClick={this.addDate}>add date picker</div>
          <div className="btn add btn-inline"
           onClick={this.addStars}>add rating stars</div>

          <div className="btn radio add btn-inline"
            onClick={this.addRadio}>add a radio button</div>
        </div>
      {  /*===============================================
        //form fileds*/
      }
        {inputs} {/*all the inputs*/}
        {radiogroups} {/*all the radio button*/}
        {date} {/*all date picker*/}
        <button className="btn-submit"
          onClick={this.done1}>done</button>
      </div>

    );
  }
}

export default App;
