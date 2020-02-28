import React, { Component } from "react";
import firebase from "../firebase";
import "firebase/firestore";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import { OU, UU, PickBans } from "../tiers";
import random from "random-string-generator";

class CreateRoom extends Component {
  state = {
    tier: null
  };

  tierSelection = tier => {
    this.setState({ tier });
  };

  createRoom = async e => {
    e.preventDefault();

    //Check tier
    const tier = this.state.tier;
    if (tier) {
      let pokemon;
      switch (tier) {
        case "OU":
          pokemon = OU;
          break;
        case "UU":
          pokemon = UU;
          break;
        default:
          break;
      }

      //Create firestore document
      const roomID = `${this.state.tier}-${random(9)}`;
      const db = firebase.firestore();
      await db
        .collection("rooms")
        .doc(roomID)
        .set({
          roomID: roomID,
          tier: tier,
          turn: 0,
          activeUser: "",
          pickBans: PickBans,
          pokemon: pokemon,
          users: {
            red: "",
            blue: ""
          },
          dateCreated: firebase.firestore.Timestamp.now()
        });

      //Go to Room
      this.props.history.push(`room/${roomID}`);
    }
  };

  render() {
    return (
      <Form>
        <FormGroup tag="fieldset">
          <legend>Pick a Tier:</legend>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="tier"
                value="OU"
                onClick={e => this.tierSelection(e.target.value)}
              />{" "}
              OU
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="tier"
                value="UU"
                onClick={e => this.tierSelection(e.target.value)}
              />{" "}
              UU
            </Label>
          </FormGroup>
        </FormGroup>
        <Button onClick={e => this.createRoom(e)}>Create Room</Button>
      </Form>
    );
  }
}

export default withRouter(CreateRoom);
