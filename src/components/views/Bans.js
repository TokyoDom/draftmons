import React from 'react';

const Ban = props => {
  return (
    <div className={`${props.player}-bans`}>
      <div><img alt={`${props.player} ban1`} src='/images/OU/0251.png'/></div>
      <div><img alt={`${props.player} ban2`} src='/images/OU/0000.png'/></div>
      <div><img alt={`${props.player} ban3`} src='/images/OU/0000.png'/></div>
      <div><img alt={`${props.player} ban4`} src='/images/OU/0000.png'/></div>
      <div><img alt={`${props.player} ban5`} src='/images/OU/0000.png'/></div>
    </div>
  );
}

export default Ban;