import React from "react";

const Picks = props => {
  return (
    <div className={`${props.player}-picks`}>
      <div>
        <img alt={`${props.player} pick1`} src={`/images/${props.tier}/${props.picks[0].id}.png`} />
        {props.picks[0].name !== '' ? <div className="picked-name">{props.picks[0].name}</div> : null}
      </div>
      <div>
        <img alt={`${props.player} pick1`} src={`/images/${props.tier}/${props.picks[1].id}.png`} />
        {props.picks[1].name !== '' ? <div className="picked-name">{props.picks[1].name}</div> : null}
      </div>
      <div>
        <img alt={`${props.player} pick1`} src={`/images/${props.tier}/${props.picks[2].id}.png`} />
        {props.picks[2].name !== '' ? <div className="picked-name">{props.picks[2].name}</div> : null}
      </div>
      <div>
        <img alt={`${props.player} pick1`} src={`/images/${props.tier}/${props.picks[3].id}.png`} />
        {props.picks[3].name !== '' ? <div className="picked-name">{props.picks[3].name}</div> : null}
      </div>
      <div>
        <img alt={`${props.player} pick1`} src={`/images/${props.tier}/${props.picks[4].id}.png`} />
        {props.picks[4].name !== '' ? <div className="picked-name">{props.picks[4].name}</div> : null}
      </div>
    </div>
  );
};

export default Picks;
