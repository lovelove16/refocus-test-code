import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  pokemons: [],
  error: ''
}

export const fetchPokemons = createAsyncThunk('pokemon/fetchPokemons', () => {
  return axios
    .get('https://pokeapi.co/api/v2/pokemon?limit=30&offset=30')
    .then(data => data.data.results)
})

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchPokemons.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchPokemons.fulfilled, (state, action) => {
      console.log("action", action);
      state.loading = false
      state.pokemons = action.payload
      state.error = ''
    })
    builder.addCase(fetchPokemons.rejected, (state, action) => {
      state.loading = false
      state.pokemons = []
      state.error = action.error.message
    })
  }
})

export default pokemonSlice.reducer