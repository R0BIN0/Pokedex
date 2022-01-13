import {useEffect, useState} from 'react'

const PokemonDetails = ({match}) => {

    // console.log(match.params.id);

    const [pokemonDetail, setPokemonDetail] = useState()
    
    console.log(pokemonDetail);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2pokemon/${match.params.id}`)
          .then((res) => res.json())
          .then((data) => setPokemonDetail(data));
      }, []);


    return (
        <div>
            
        </div>
    )
}

export default PokemonDetails
