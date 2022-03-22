import './App.css';
import { Component } from 'react';
import { Button } from 'antd';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      cardNum: '',
      cardCvv: '',
      cardExpDate: '',
      isCardNumCorrect: false,
      isCardCvvCorrect: false,
      isCardExpDateCorrect: false,
      isAmountValid: false,
      isDataValid: false,
    };
    this.onCardNumChange = this.onCardNumChange.bind(this);
    this.onCardCvvChange = this.onCardCvvChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onCardExpChange = this.onCardExpChange.bind(this);
    this.leaveJustDigits = this.leaveJustDigits.bind(this);
    this.sendPaymentToServer = this.sendPaymentToServer.bind(this);
    this.formatExpDate = this.formatExpDate.bind(this);
    this.checkIsDataValid = this.checkIsDataValid.bind(this);
  }

  leaveJustDigits(stringValue) {
    return stringValue.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
  }

  formatExpDate(stringValue) {
    const stringAsArrayByTwo = stringValue.match(/.{1,2}/g);
    if (stringAsArrayByTwo == null) { return stringValue; }
    return stringAsArrayByTwo.join('/');
  }

  onCardNumChange(e) {
    const val = this.leaveJustDigits(e.target.value);
    this.setState({ cardNum: val });
    this.setState({ isCardNumCorrect: val.length === 16 }, () => {
      this.checkIsDataValid();
    });
  }

  onCardCvvChange(e) {
    const val = this.leaveJustDigits(e.target.value);
    this.setState({ cardCvv: val });
    this.setState({ isCardCvvCorrect: val.length === 3 }, () => {
      this.checkIsDataValid();
    });
  }

  onAmountChange(e) {
    const val = this.leaveJustDigits(e.target.value);
    this.setState({
      amount: val,
      isAmountValid: Number(val) > 0
    }, () => {
      this.checkIsDataValid();
    });
  }

  onCardExpChange(e) {
    const val = this.leaveJustDigits(e.target.value);
    console.log('exp length', val.length);
    this.setState({
      cardExpDate: this.formatExpDate(val),
      isCardExpDateCorrect: val.length === 4
    }, () => {
      this.checkIsDataValid();
    });
  }

  checkIsDataValid() {
    console.log('checkIsDataValid GO!');
    console.log(this.state.isCardNumCorrect, this.state.isCardCvvCorrect, this.state.isCardExpDateCorrect, this.state.isAmountValid);
    this.setState({
      isDataValid:
        this.state.isCardNumCorrect &&
        this.state.isCardCvvCorrect &&
        this.state.isCardExpDateCorrect &&
        this.state.isAmountValid
    });
  }

  async sendPaymentToServer() {
    const cardNum = this.state.cardNum;
    const cardCvv = this.state.cardCvv;
    const cardExpData = this.state.cardExpDate;
    const amount = Number(this.state.amount);
    const postBody = { cardNum, cardCvv, cardExpData, amount };
    console.log({ postBody });
    const result = await axios.post('http://localhost:5000/payment/create', postBody);
    const { data } = result;
    console.log({ data });
  }

  render() {
    return (
      <>
        <Input value={this.state.amount} placeholder="Amount" style={{ width: '300px' }} min="0" onChange={this.onAmountChange}></Input>
        <br></br>
        <br></br>
        <Input value={this.state.cardNum} placeholder="Card Number" style={{ width: '300px' }} maxLength='16' onChange={this.onCardNumChange}></Input>
        <br></br>
        <Input value={this.state.cardCvv} placeholder="CVV" style={{ width: '150px' }} min="0" maxLength='3' onChange={this.onCardCvvChange}></Input>
        <Input value={this.state.cardExpDate} placeholder="Exp Date" style={{ width: '150px' }} min="0" maxLength='5' onChange={this.onCardExpChange}></Input>
        <br></br>
        <Button onClick={this.sendPaymentToServer} disabled={!(this.state.isDataValid)}>Оплатить</Button>
      </>
    );
  }

}

export default App;
