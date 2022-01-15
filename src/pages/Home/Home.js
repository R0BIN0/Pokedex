import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const [allPokemons, setAllPokemons] = useState([]);

  const getAllPokemons = async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await res.json();

    function pokemonDetails(results) {
      results.map(async (item) => {
        await fetch(`https://pokeapi.co/api/v2/pokemon/${item.name}`)
          .then((res) => res.json())
          .then((data) =>
            setAllPokemons((currentArr) => [...currentArr, data])
          );
      });
    }
    pokemonDetails(data.results);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <>
      <div className="global-container">
        <h1>POKEDEX</h1>

        <input
          className="search-input"
          type="text"
          placeholder="Recherche"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <div className="card-grid">
          {allPokemons
            .filter((val) =>
              keyword === undefined
                ? val
                : val.name.toLowerCase().includes(keyword.toLowerCase()) && val
            )
            .map((item, index) => (
              <Link to={`/pokemon/${item.name}`}>
                <div className="card">
                  <div
                    data-color-bg={item.types[0].type.name}
                    className="top-card"
                  >
                    <img src={item.sprites.front_default} alt="" />
                  </div>
                  <div className="bottom-card">
                    <h2>{item.name}</h2>
                    <div className="left-card-type">
                      <span data-color-bg={item.types[0].type.name}>
                        {item.types[0].type.name}
                      </span>
                      {item.types.length !== 1 && (
                        <span data-color-bg={item.types[1].type.name}>
                          {item.types[1].type.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
