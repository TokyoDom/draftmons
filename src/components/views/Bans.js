import React from "react";

const Ban = props => {
  return (
    <div className={`${props.player}-bans`}>
      <div>
        <img
          alt={`${props.player} ban1`}
          src={`/images/${props.tier}/${props.bans[0].id}.png`}
          className={props.bans[0].styles}
        />
      </div>
      <div>
        <img
          alt={`${props.player} ban2`}
          src={`/images/${props.tier}/${props.bans[1].id}.png`}
          className={props.bans[1].styles}
        />
      </div>
      <div>
        <img
          alt={`${props.player} ban3`}
          src={`/images/${props.tier}/${props.bans[2].id}.png`}
          className={props.bans[2].styles}
        />
      </div>
      <div>
        <img
          alt={`${props.player} ban4`}
          src={`/images/${props.tier}/${props.bans[3].id}.png`}
          className={props.bans[3].styles}
        />
      </div>
      <div>
        <img
          alt={`${props.player} ban5`}
          src={`/images/${props.tier}/${props.bans[4].id}.png`}
          className={props.bans[4].styles}
        />
      </div>
    </div>
  );
};

export default Ban;
