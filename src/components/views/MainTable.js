import React from "react";

const MainTable = props => {
  return (
    <section className="main-table">
      {props.pokemon.map((poke, i) => (
        <div className={poke.styles} key={i}>
          <img
            id={poke.id}
            alt={poke.name}
            src={`/images/${props.tier}/${poke.id}.png`}
            onClick={e => props.handlePickBan(e.target.alt)}
          />
        </div>
      ))}
    </section>
  );
};

export default MainTable;
