import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPokemons } from './pokemonSlice'

export const PokemonView = () => {

  const [charData, setChardata] = useState([]);  

  const getSinglePokemon = async (url) => {
    let val = await axios
      .get(url)
      .then((data)=> data.data.sprites.front_shiny )
      .catch((err) => { console.log("err", err)})
      return val
  }

  const pokemon = useSelector(state => state.pokemon)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPokemons())
  }, [dispatch])

  useEffect(() => {
    console.log("pokemon.pokemons", pokemon.pokemons);
    if(pokemon.pokemons.length){
      pokemon.pokemons.map( async (pokemon, index) => {
        let imgeUrl = await getSinglePokemon(pokemon.url)
        let exists = charData.findIndex(val => val.name === pokemon.name)
        if(exists > 0){
          console.log(`${pokemon.name} already exist with the index ${index}`);
          return
        }
        setChardata(charData => [...charData, {name: pokemon.name, imgeUrl:imgeUrl}]);
      })
    }
  }, [pokemon]);

  console.log("charData", charData.length);

  return (
    <div>
      <h2 className="mt-5">List of Pokemons</h2>
      {pokemon.loading && <div>Loading...</div>}
      {!pokemon.loading && pokemon.error ? <div>Error: {pokemon.error}</div> : null}
      {!pokemon.loading && charData.length ? (
        <div>
          <Container>
            <Row>
              {
                charData.map( (data, index) => {
                  return <Col lg={4} className="mt-5">
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={data.imgeUrl} />
                                    <Card.Body>
                                      <Card.Title>{data.name.toUpperCase() }</Card.Title>
                                    </Card.Body>
                                  </Card>
                              </Col>
                          
                    
                })
              }
             </Row>
          </Container>
        </div>
      ) : null}
    </div>
  )
}