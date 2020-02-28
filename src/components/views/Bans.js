import React from 'react';

const Ban = props => {
  return (
    <div className={`${props.player}-bans`}>
      <div><img alt={`${props.player} ban1`} src={`/images/${props.tier}/${props.bans[0].id}.png`}/></div>
      <div><img alt={`${props.player} ban2`} src={`/images/${props.tier}/${props.bans[1].id}.png`}/></div>
      <div><img alt={`${props.player} ban3`} src={`/images/${props.tier}/${props.bans[2].id}.png`}/></div>
      <div><img alt={`${props.player} ban4`} src={`/images/${props.tier}/${props.bans[3].id}.png`}/></div>
      <div><img alt={`${props.player} ban5`} src={`/images/${props.tier}/${props.bans[4].id}.png`}/></div>
    </div>
  );
}

export default Ban;