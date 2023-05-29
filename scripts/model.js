class UserModel {
  constructor(){
    this.controller = new AbortController();
    this.signal = this.controller.signal; 
    
  }
    
    async getTypesPokemons() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/type');
        const typesPokemons = await response.json();
        return typesPokemons;
      } catch (error) {
        console.error('Error al obtener los tipos de pokemones:', error);
        return [];
      }
    }

    async getPokemonList(key, start, end) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${key}`);
        const data = await response.json();
        console.log(data)
        const pokemons = data.pokemon.slice(start, end);
        return pokemons;
      } catch (error) {
        console.error('Error al obtener los pokemones por tipo:', error);
        return [];
      }
    }

    async getPokemon(url) {
      try {
        const response = await fetch(url, { signal: this.signal });
        const pokemon = await response.json();
        return pokemon;
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('La solicitud fue cancelada.');
        } else {
          console.error('Error al obtener los datos del Pokémon:', error);
        }
        return null;
      }
    }

    getControler(){
      return this.controller;
    }

    setController(controller){
      this.controller=controller;
    }
  }