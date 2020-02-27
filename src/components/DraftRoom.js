import React, { Component } from 'react';
import { OU } from '../tiers';
import { ButtonGroup, Button } from 'reactstrap';
import MainTable from './views/MainTable';
import Bans from './views/Bans';
import Picks from './views/Picks';
import './DraftRoom.css';

class DraftRoom extends Component {

  state = {
    pokemon: OU
  }

  render() {
    return (
      <div>
        <h3>Bans:</h3>
        <section className='bans'>
        <Bans player='red'/>
        <Bans player='blue'/>
        </section>
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