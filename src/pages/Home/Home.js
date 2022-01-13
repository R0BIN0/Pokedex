import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [pokemon, setPokemon] = useState([]);
  const [keyword, setKeyword] = useState("");

  console.log(pokemon);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=200")
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, []);

  return (
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
        {pokemon &&
          pokemon.results &&
          pokemon.results
            .filter((val) =>
              keyword === undefined
                ? val
                : val.name.toLowerCase().includes(keyword.toLowerCase()) && val
            )
            .map((item, index) => (
              <Link to={`/pokemon/${item.name}`}>
                <div className="card" key={index}>
                  <h2>{item.name}</h2>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

// {item && item.filter((val) => keyword === undefined ? val : val.search.toLowerCase().includes(keyword.toLowerCase()) && val).map((item) => (
//     <div onClick={() => addSP(item)} className="box-SP-modalAdd">
//       <h2>{item.name}</h2>
//       <h3>{item.reference}</h3>
//       <p>{item.Id}</p>
//     </div>
//   ))}

export default Home;
