/**
 * This Component
 * Load stored wallets
 * Save entered token
 * Send total amounts to Bridge smart contract
 * Send bulk tokens to loaded wallets from bridge smart contract 
 */
import React, { useState } from 'react';
import { Button, Container, Col, Row, Form, Badge, Card} from 'react-bootstrap';
import config from '../config';
import {
  send_amount,
  send_amount_sc, 
  get_decimals,
  get_name,
  get_totalSupply,
  get_symbol,
  validate_address,
  getBigNumber, 
  get_current_account
} from '../utils/sm_token';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { save_token } from '../services/tokens-service';
import { get_wallets } from '../services/wallets-service';
import { save_bulk_bridges } from '../services/bridges-service';
import { parse_transactions, get_random } from '../utils/common';
import Balances from './Balances';
const  MultiSender = (props)=>{
    const [loading, setLoading] = useState(false)
    const bulkSend = async () =>{
            try{
              setLoading(true);
              const total_amount = 0;
              let amounts = []
              let total=0;
              for(let item of props.amounts){
                total=total+parseFloat(item);
                amounts.push((await getBigNumber(item)));
              }
              let bn_total_amount = await getBigNumber(total);
              
              let txid_bridge = await send_amount_sc(config.sm_bridge, bn_total_amount);    // send total tokens to bridge SC
              if(txid_bridge){
                toast('Amount successfully sent to Bridge SC', { appearance: 'success' })
              }
              let txid = await send_amount(props.addresses,amounts);                              // send tokens from SC to wallets
              setLoading(false);
              if(txid){
                toast('Amount successfully sent to  wallets', { appearance: 'success' })
              }
              
      
            } catch (e) {
              console.log(e);
              toast('Something went wrong !');
              return false;
            }
          
    }
    return (
        <Container> 
            <Balances addresses={props.addresses} amounts={props.amounts} />
          <Row>
            <Col>
            <Form>
              <Row>
                <Col>
                    <Button className="btn-generate" onClick={()=>bulkSend()} variant="primary">Processed</Button>{' '}
                  </Col>
                </Row>
              </Form>
            </Col> 
          </Row>
          <Row>
          <Col sm="4">
          </Col>
          <Col sm="4">
          {loading &&
            <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
          }
          </Col>
          <Col sm="4"></Col>
          </Row>
        </Container>
        )
}
export default MultiSender;