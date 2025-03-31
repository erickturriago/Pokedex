class UserController {
    constructor(model, view) {
      this.model = model;
      this.view = view;
      this.firstPokemon = 0;
      this.lastPokemon = 0;
      this.contador = 0;
      this.pokemonList = undefined;
      this.key =  '';
    }
  
    async getTypesPokemons() {
      const typesPokemons = await this.model.getTypesPokemons();
    
      // 🔍 Filtrar tipos inválidos
      const tiposValidos = typesPokemons.results.filter(
        type => type.name !== 'stellar' && type.name !== 'unknown'
      );
    
      this.view.displayTypesPokemons(tiposValidos);
    
      // 🔀 Mostrar un tipo aleatorio al iniciar
      setTimeout(() => {
        const typeButtons = document.querySelector('.types').children;
        if (typeButtons.length > 0) {
          const randomIndex = Math.floor(Math.random() * typeButtons.length);
          const randomButton = typeButtons[randomIndex];
          randomButton.click();
        }
      }, 100);
    }

    async getPokemons(key) {

      console.log("Pidiendo pokemones")
      //  console.log(key);
      //  console.log(this.firstPokemon +" "+this.lastPokemon);

      this.lastPokemon += 10;
      const loadingBox = document.querySelector('.pokemonLoading');

      const pokemons = await this.model.getPokemonList(key, this.firstPokemon, this.lastPokemon);

      console.log(pokemons);
  
      pokemons.forEach(async (pokemon) => {
        // console.log(this.contador);
        this.view.displayCard();
        const pokemonData = await this.model.getPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon.name}`);
        await this.view.displayPokemon(pokemonData,this.contador++); // Pasar isLoading como `true` para el último Pokémon y `false` para los demás
        // await this.view.hideLoading();
      });
        // this.view.displayPokemons(pokemons);
        this.firstPokemon=this.lastPokemon;
    }


    async getFullAbilities(abilities) {
      return await Promise.all(
        abilities.map(async (a) => {
          const desc = await this.model.getAbilityDescription(a.ability.url);
          return {
            name: a.ability.name,
            is_hidden: a.is_hidden,
            description: desc
          };
        })
      );
    }

    async resetPokemons(){
      console.log("Reset pokemons")
      await this.view.resetPokemonList();
      // await this.view.esperar();
      this.firstPokemon = 0;
      this.lastPokemon = 0;
      this.contador=0;
    }

    async abortFetch(){
      console.log("abortó");
      this.model.getControler().abort();
      // if (this.model.getControler()) {
      //   // abortController.abort(); // Abortar la petición si existe
      //   this.model.getControler().abort();
      //   this.model.setController(null);
      // }
    }

    async changeColor(element){
      this.view.changeColorButton(element);
    }

  }