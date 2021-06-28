/**
 * This Component:
 * Load current connected account balance
 * Load saved wallets balance
 */
import React from 'react';
import { 
  Button,
  Container,
  Table, 
  Col, 
  Row
} from 'react-bootstrap';
import { 
  get_balance, 
  get_current_account, 
  parseFloatBalance,
  get_allowance,
  get_ether_balance
} from '../utils/sm_token';

import Loader from 'react-loader-spinner';

import {get_wallets} from '../services/wallets-service';
import config from '../config'

class Balances extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            master_balance:'',
            ether_balance:0,
            allowance:0,
            totalAmout:0
        };
        this.get_master_balance = this.get_master_balance.bind(this);
      }
    /**
     * Get holder's wallets balances
     */
    /**
     * return connected MetaMask balance
    */
    async get_master_balance(){
        let balance = await get_balance(get_current_account());
        let parsed_balance = await parseFloatBalance(balance);
        this.setState({master_balance: parsed_balance})
    }
    async componentDidMount(){
      this.get_master_balance();
      const ether_balance = await get_ether_balance();
      //const allowance = await get_allowance(config.sm_bridge);
      let total=0;
      for(let item of this.props.amounts){
        total=total+parseFloat(item);
      }
      console.log(total);
      this.setState({
        totalAmout: total,
        ether_balance: ether_balance
      })
    }
    renderTableData() {
        return this.props.addresses.map((addr, index) => {
           return (
              <tr key={addr}>
                 <td>#</td>
                 <td>{addr}</td>
                 <td>{this.props.amounts[index]}</td>
              </tr>
           )
        })
     }
    render() {
        let current_account = get_current_account()
        return (
          <Container> 
            <Row>
              <Col md="4">
              <h5>{this.state.master_balance}</h5>
                <p> Your token balance </p>
              </Col>
              <Col md="4">
              <h5> {this.state.allowance}</h5>
              <p>Your current multisender approval</p>
              </Col>
              <Col md="4">
              <h5>{this.state.totalAmout}</h5>
              <p>Your total tokens to send</p>
              </Col>
              <Col md="4">
                <h5>{this.state.ether_balance}</h5>
                <p>Your Ether balance </p>
              </Col>
            </Row>
          </Container>
        );
      }
}
export default Balances;