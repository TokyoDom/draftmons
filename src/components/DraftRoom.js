import React, { Component } from 'react';
import { OU } from '../tiers';
import { ButtonGroup, Button } from 'reactstrap';
import firebase from '../firebase';
import 'firebase/firestore';
import 'firebase/auth';
import MainTable from './views/MainTable';
import Bans from './views/Bans';
import Picks from './views/Picks';
import './DraftRoom.css';

class DraftRoom extends Component {

  state = {
    pokemon: OU,
    redPicked: false,
    bluePicked: false
  }

  handleSideSelect = team => {
    team === 'red' ? this.setState({redPicked: true}) : this.setState({bluePicked: true});
    console.log(team);

  }

  render() {
    return (
      <div>
        <h3>Bans:</h3>
        <section className='bans'>
        <Bans player='red'/>
        <Bans player='blue'/>
        </section>
        <ButtonGroup className='side-select'>
        <Button color="danger" value="red" className={this.state.redPicked ? 'team-picked' : null} onClick={e => this.handleSideSelect(e.target.value)}>Play as Red Team</Button>
        <Button color="primary" value="blue" className={this.state.bluePicked ? 'team-picked' : null} onClick={e => this.handleSideSelect(e.target.value)}>Play as Blue Team</Button>
        </ButtonGroup>
        <h3>Picks:</h3>
        <section className='bottom-container'>
        <Picks player='red'/>
        <MainTable pokemon={this.state.pokemon}/>
        <Picks player='blue'/>
        </section>
      </div>
    );
  }

}

export default DraftRoom;