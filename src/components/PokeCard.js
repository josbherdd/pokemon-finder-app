import React from "react";
import { GiHealthNormal, GiSpinningSword, GiShield } from "react-icons/gi";
import "../styles/PokeCard.css";

function PokeCard({ id, name, types, sprite, stat_1, stat_2, stat_3 }) {

const style = types + " card";

  return (
    <div className={style}>
      <div className="img-container">
        <img src={sprite} alt={name} />
      </div>
      <ol className="card_content">
        <h2>
          {id}-{name}
        </h2>
        <p>Type: {types}</p>
        <div className="card-stats" >
            <p>
            <GiHealthNormal /> {stat_1}
            </p>
            <p>
            <GiSpinningSword /> {stat_2}
            </p>
            <p>
            <GiShield /> {stat_3}
            </p>
      </div>
      </ol>
      
    </div>
  );
}

export { PokeCard };
