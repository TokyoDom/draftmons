import React, { Component } from "react";
import { ButtonGroup, Button, Spinner } from "reactstrap";
import firebase from "../firebase";
import "firebase/firestore";
import "firebase/auth";
import MainTable from "./views/MainTable";
import Bans from "./views/Bans";
import Picks from "./views/Picks";
import "./DraftRoom.css";

class DraftRoom extends Component {
  state = {
    loading: false,
    roomID: null,
    tier: "",
    users: {},
    turnOrder: [0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1]
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const room = this.props.match.params.id;
    const db = firebase.firestore();

    //Initialize Firestore Snapshot Listener
    this.listener = db
      .collection("rooms")
      .where("roomID", "==", room)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          this.setState({
            users: change.doc.data().users,
            turn: change.doc.data().turn,
            activeUser: change.doc.data().activeUser,
            pickBans: change.doc.data().pickBans,
            pokemon: change.doc.data().pokemon
          });
        });
      });

    //Initial State
    const snapshot = await db.collection("rooms").get();
    const snapshotMatch = snapshot.docs.filter(
      doc => doc.data().roomID === room
    );
    const roomDetails = snapshotMatch.map(doc => doc.data());

    //Make sure only 1 room returns, check in createRoom?
    if (snapshotMatch.length === 1) {
      const {
        activeUser,
        roomID,
        tier,
        pickBans,
        pokemon,
        users
      } = roomDetails[0];
      this.setState({ activeUser, roomID, tier, pickBans, pokemon, users });
    }

    this.setState({ loading: false });
  }

  componentWillUnmount() {
    //Remove snapshot listener
    this.listener();
    console.log("unmounted");
  }

  handleSideSelect = async team => {
    let id;
    if (firebase.auth().currentUser) {
      id = firebase.auth().currentUser.uid;
    } else {
      await firebase
        .auth()
        .signInAnonymously()
        .catch(err => console.log(err));
      id = firebase.auth().currentUser.uid;
    }

    const room = firebase
      .firestore()
      .collection("rooms")
      .doc(this.state.roomID);

    const doc = await room.get();
    const users = doc.data().users;

    if (team === "red" && users.red === "") {
      await room.update({ "users.red": id });
    }

    if (team === "blue" && users.blue === "") {
      await room.update({ "users.blue": id });
    }

    if (this.state.users.red !== "" && this.state.users.blue !== "") {
      const pickBans = this.state.pickBans;
      pickBans[0].styles = "currently-picking";

      await room.update({
        activeUser: this.state.users.blue,
        pickBans: pickBans
      });
    }
  };

  handlePickBan = async poke => {
    //Check if user can make update
    if (firebase.auth().currentUser && this.state.turn < 20) {
      //Get current and next user
      const activeUser =
        this.state.turnOrder[this.state.turn] === 0
          ? this.state.users.blue
          : this.state.users.red;
      const nextUser =
        this.state.turnOrder[this.state.turn + 1] === 0
          ? this.state.users.blue
          : this.state.users.red;
      if (firebase.auth().currentUser.uid === activeUser) {
        //Find pokemon clicked
        const pokemon = this.state.pokemon.filter(el => el.name === poke);
        if (!pokemon[0].picked) {
          const room = firebase
            .firestore()
            .collection("rooms")
            .doc(this.state.roomID);

          //Change pickBans table with new pokemon and currently picking glow
          const newPB = this.state.pickBans.map((el, i) => {
            if (i === this.state.turn) {
              el.name = pokemon[0].name;
              el.id = pokemon[0].id;
              el.styles = null;
            }

            if (i === this.state.turn + 1) {
              el.styles = "currently-picking";
            }
            return el;
          });

          //Change pokemon picked to true in main table and apply style
          const newPokemon = this.state.pokemon.map(el => {
            if (el.name === poke) {
              el.picked = true;

              switch (this.state.turn) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 12:
                case 13:
                case 14:
                case 15:
                  el.styles = "main-banned";
                  break;
                case 6:
                case 9:
                case 10:
                case 17:
                case 18:
                  el.styles = "main-blue-picked";
                  break;
                case 7:
                case 8:
                case 11:
                case 16:
                case 19:
                  el.styles = "main-red-picked";
                  break;
                default:
                  break;
              }
            }
            return el;
          });

          await room.update({
            pokemon: newPokemon,
            pickBans: newPB,
            turn: firebase.firestore.FieldValue.increment(1),
            activeUser: nextUser
          });
        }
      }
    }
  };

  render() {
    const pickBans = this.state.pickBans;
    return (
      <div>
        {this.state.loading ? <div><Spinner color="dark" className="spinner"/></div> : (
          <div>
            {this.state.roomID ? (
              <div>
                <h3>Bans:</h3>
                <section className="bans">
                  <Bans
                    player="blue"
                    tier={this.state.tier}
                    bans={[
                      pickBans[0],
                      pickBans[2],
                      pickBans[4],
                      pickBans[13],
                      pickBans[15]
                    ]}
                  />
                  <Bans
                    player="red"
                    tier={this.state.tier}
                    bans={[
                      pickBans[1],
                      pickBans[3],
                      pickBans[5],
                      pickBans[12],
                      pickBans[14]
                    ]}
                  />
                </section>
                <ButtonGroup className="side-select">
                  <Button
                    color="primary"
                    value="blue"
                    className={
                      this.state.users.blue === "" ? null : "team-picked"
                    }
                    onClick={e => this.handleSideSelect(e.target.value)}
                  >
                    Play as Blue Team
                  </Button>
                  <Button
                    color="danger"
                    value="red"
                    className={
                      this.state.users.red === "" ? null : "team-picked"
                    }
                    onClick={e => this.handleSideSelect(e.target.value)}
                  >
                    Play as Red Team
                  </Button>
                </ButtonGroup>
                <h3>Picks:</h3>
                <section className="bottom-container">
                  <Picks
                    player="blue"
                    tier={this.state.tier}
                    picks={[
                      pickBans[6],
                      pickBans[9],
                      pickBans[10],
                      pickBans[17],
                      pickBans[18]
                    ]}
                  />
                  <MainTable
                    pokemon={this.state.pokemon}
                    tier={this.state.tier}
                    handlePickBan={this.handlePickBan}
                  />
                  <Picks
                    player="red"
                    tier={this.state.tier}
                    picks={[
                      pickBans[7],
                      pickBans[8],
                      pickBans[11],
                      pickBans[16],
                      pickBans[19]
                    ]}
                  />
                </section>
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

export default DraftRoom;
