import React from "react";

const MainTable = props => {
  return (
    <section className="main-table">
      {props.pokemon.map((poke, i) => (
        <div key={i}>
          <img alt={poke.name} src={`/images/OU/${poke.id}.png`} />
        </div>
      ))}
    </section>
  );
};

export default MainTable;
