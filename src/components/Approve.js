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
  parseBalance,
  parseFloatBalance,
  get_allowance,
  get_ether_balance
} from '../utils/sm_token';

import Loader from 'react-loader-spinner';

import {get_wallets} from '../services/wallets-service';
import config from '../config'
import Balances from './Balances';
class Approve extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            addresses: [],
            master_balance:'',
            ether_balance:0,
            loading: false,
            allowance:0,
            totalAmout:0
        };
        this.get_balances = this.get_balances.bind(this);
        this.get_master_balance = this.get_master_balance.bind(this);
      }
    /**
     * Get holder's wallets balances
     */
    async get_balances(){
        let self = this;
        let list = []
        self.setState({ loading: true });
        let data = await get_wallets({holder: get_current_account()})
        for(let item of data){
            let balance = await get_balance(item.address);
            let parsed_balance = await await parseBalance(balance);
            list.push({
                address: item.address,
                balance: parsed_balance
            })
        }
        self.setState({ loading: false });
        await self.setState({addresses: list});
    }
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
            <Balances addresses={this.props.addresses} amounts={this.props.amounts}></Balances> 
            <Row>
            <Col sm="4">
            </Col>
            <Col sm="4">
            {this.state.loading &&
              <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
            }
            </Col>
            <Col sm="4"></Col>
            </Row>
            <Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Address</th>
                    <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                   {this.renderTableData()}
                </tbody>
                </Table>
            </Row>
            <Button onClick={(e)=>this.props.handleNext()}  className="btn-generate">
                Process
              </Button>
          </Container>
        );
      }
}
export default Approve;