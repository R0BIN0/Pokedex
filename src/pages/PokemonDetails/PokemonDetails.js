import { useEffect, useState } from "react";
import "./PokemonDetails.css";

const PokemonDetails = ({ match }) => {
  const [pokemonDetail, setPokemonDetail] = useState();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${match.params.id}`)
      .then((res) => res.json())
      .then((data) => setPokemonDetail(data));
  }, []);

  const [calculatedWeight, setCalculatedWeight] = useState();

  useEffect(() => {
    if (pokemonDetail) {
      let weight;
      weight = pokemonDetail.weight * 0.454;
      setCalculatedWeight(weight.toFixed(2));
    }
  }, [pokemonDetail]);

  return (
    <>
      {pokemonDetail ? (
        <div className="global-container-PD">
          <div
            data-color-bg={pokemonDetail.types[0].type.name}
            className="PD-left-part"
          >
            <img src={pokemonDetail.sprites.front_default} alt="" />
          </div>
          <div className="PD-right-part">
            <div className="PD-right-about">
              <h2 className="PD-title">About</h2>
              <div
                data-color-bg={pokemonDetail.types[0].type.name}
                className="bar-title"
              ></div>
              <div className="PD-about-content">
                <div className="PD-about-box">
                  <p className="PD-about-category-txt">Type(s) :</p>
                  <div className="PD-about-type-box">
                    <p data-color-bg={pokemonDetail.types[0].type.name}>
                      {pokemonDetail.types[0].type.name}
                    </p>
                    {pokemonDetail.types.length !== 1 && (
                      <p data-color-bg={pokemonDetail.types[1].type.name}>
                        {pokemonDetail.types[1].type.name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="PD-about-box">
                  <p className="PD-about-category-txt">Weight :</p>
                  <p className="PD-about-data-txt">
                    {pokemonDetail.weight} lbs ({calculatedWeight} kg)
                  </p>
                </div>
                <div className="PD-about-box">
                  <p className="PD-about-category-txt">Abilities :</p>
                  <p className="PD-about-data-txt">
                    {pokemonDetail.abilities[0].ability.name},{" "}
                    {pokemonDetail.abilities.length !== 1 &&
                      `${pokemonDetail.abilities[1].ability.name}`}
                  </p>
                </div>
              </div>
            </div>
            <div className="PD-left-BS">
              <h2 className="PD-title">Base stat</h2>
              <div
                data-color-bg={pokemonDetail.types[0].type.name}
                className="bar-title"
              ></div>

              <div className="PD-BS-content">
                {pokemonDetail.stats.map((item, index) => (
                  <div className="PD-BS-box">
                    <p>
                      {pokemonDetail.stats[index].stat.name.replaceAll(
                        "special-",
                        "Sp. "
                      )}
                    </p>
                    <div className="PD-BS-box-right">
                      <span>{pokemonDetail.stats[index].base_stat}</span>
                      <div className="bar">
                        <div
                          style={{
                            width: pokemonDetail.stats[index].base_stat + "px",
                            background:
                              pokemonDetail.stats[index].base_stat >= 50
                                ? "green"
                                : "red",
                          }}
                          className="progress-bar"
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Chargement</p>
      )}
    </>
  );
};

export default PokemonDetails;
