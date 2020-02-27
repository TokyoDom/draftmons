import React from "react";

const Picks = props => {
  return (
    <div className={`${props.player}-picks`}>
      <div>
        <img alt={`${props.player} pick1`} src="/images/OU/0151.png" />
        <div className="picked-name">Mew</div>
      </div>
      <div>
        <img alt={`${props.player} pick2`} src="/images/OU/0598.png" />
        <div className="picked-name">Ferrothorn</div>
      </div>
      <div>
        <img alt={`${props.player} pick3`} src="/images/OU/0000.png" />
      </div>
      <div>
        <img alt={`${props.player} pick4`} src="/images/OU/0000.png" />
      </div>
      <div>
        <img alt={`${props.player} pick5`} src="/images/OU/0000.png" />
      </div>
    </div>
  );
};

export default Picks;
