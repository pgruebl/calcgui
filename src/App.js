import React, { Component } from 'react';
import './App.css';
import axios from "axios";


function newNumber(i,curval, operandEntered) {
    if(curval==='0' || operandEntered) {
        curval = i;
    } else {
        curval = curval.concat(i);
    }
    return curval;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        a: 0,
        b: 0,
        operation: '+',
        result: '0',
        operandEntered: false
    };
  }

  handleClick(i) {
      const newState = JSON.parse(JSON.stringify(this.state));
      if(isNaN(parseInt(i))) {
          if(i==="C") {
              newState.result='0';
              newState.operation = '+';
              newState.operandEntered = false;
          } else if(i==='+') {
              newState.operation = '+';
              newState.a=parseInt(newState.result);
              newState.operandEntered = true;
          } else if(i==='*') {
              newState.operation = '*';
              newState.a=parseInt(newState.result);
              newState.operandEntered = true;
          } else if(i==='/') {
              newState.operation = '/';
              newState.a=parseInt(newState.result);
              newState.operandEntered = true;
          } else if(i==='-') {
              newState.operation = '-';
              newState.a=parseInt(newState.result);
              newState.operandEntered = true;
          } else if(i==='=') {
              if(newState.operation==='+') {
                  newState.b=parseInt(newState.result);
                  let body="a=" + newState.a + "&b=" + newState.b;
                  axios.post('http://localhost:8080/Taschenrechner/rest/calc/add',body).then(response => {
                      console.log(response);
                      newState.result = response.data;
                      this.setState(newState);
                  });

                  /*newState.b=parseInt(newState.result);
                  newState.result = newState.a + newState.b;*/
              } else if(newState.operation==='-') {
                  newState.b=parseInt(newState.result);
                  let body="a=" + newState.a + "&b=" + newState.b;
                  axios.post('http://localhost:8080/Taschenrechner/rest/calc/sub',body).then(response => {
                      console.log(response);
                      newState.result = response.data;
                      this.setState(newState);
                  });
                  /*
                  newState.b=parseInt(newState.result);
                  newState.result = newState.a - newState.b;*/
              } else if(newState.operation==='*') {
                  newState.b=parseInt(newState.result);
                  let body="a=" + newState.a + "&b=" + newState.b;
                  axios.post('http://localhost:8080/Taschenrechner/rest/calc/mul',body).then(response => {
                      console.log(response);
                      newState.result = response.data;
                      this.setState(newState);
                  });
                  /*
                  newState.b=parseInt(newState.result);
                  newState.result = newState.a * newState.b;*/
              } else if(newState.operation==='/') {
                  newState.b=parseInt(newState.result);
                  let body="a=" + newState.a + "&b=" + newState.b;
                  axios.post('http://localhost:8080/Taschenrechner/rest/calc/div',body).then(response => {
                      console.log(response);
                      newState.result = response.data;
                      this.setState(newState);
                  });
                  /*
                  newState.b=parseInt(newState.result);
                  newState.result = newState.a / newState.b;*/
              }
          }
      } else {
          newState.result = newNumber(i,newState.result,newState.operandEntered);
          newState.operandEntered=false;
      }
      this.setState(newState);
  }


  render() {
     const result = this.state.result;

    return (
      <table>
          <tbody>
              <tr><td colSpan="4" align="right">{result}</td></tr>
              <tr>
                  <td><button onClick={() => this.handleClick('7')}>7</button></td>
                  <td><button onClick={() => this.handleClick('8')}>8</button></td>
                  <td><button onClick={() => this.handleClick('9')}>9</button></td>
                  <td><button onClick={() => this.handleClick("+")}>+</button></td>
              </tr>
              <tr>
                  <td><button onClick={() => this.handleClick('4')}>4</button></td>
                  <td><button onClick={() => this.handleClick('5')}>5</button></td>
                  <td><button onClick={() => this.handleClick('6')}>6</button></td>
                  <td><button onClick={() => this.handleClick("-")}>-</button></td>
              </tr>
              <tr>
                  <td><button onClick={() => this.handleClick('1')}>1</button></td>
                  <td><button onClick={() => this.handleClick('2')}>2</button></td>
                  <td><button onClick={() => this.handleClick('3')}>3</button></td>
                  <td><button onClick={() => this.handleClick("*")}>*</button></td>
              </tr>
              <tr>
                  <td><button onClick={() => this.handleClick("C")}>C</button></td>
                  <td><button onClick={() => this.handleClick('0')}>0</button></td>
                  <td><button onClick={() => this.handleClick("=")}>=</button></td>
                  <td><button onClick={() => this.handleClick("/")}>/</button></td>
              </tr>
          </tbody>
      </table>
    );
  }
}



export default App;
