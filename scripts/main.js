window.addEventListener('DOMContentLoaded', () => {
    const model = new UserModel();
    const view = new UserView();
    const controller = new UserController(model, view);
    let lastKey = '';
    let lastButtonPressed = undefined;
    let isLoading = false;
    controller.getTypesPokemons();

    const typePokemonsList = document.querySelector('.types');

    typePokemonsList.addEventListener('click', async (event) => {
        isLoading=true;
        if (event.target.classList.contains('type')) {
            
            // if (isLoading) return;
            const key = event.target.getAttribute('key');
            console.log(key);
            // controller.abortFetch();
            // await controller.resetPokemons();
            
            if (this.lastKey != key) {
                console.log("last key");
                this.lastKey = key;
                // await controller.abortFetch();
                // this.isLoading=true;
                //console.log(event.target)
                await controller.changeColor(event.target);

                
                await controller.resetPokemons();
                await controller.getPokemons(key);
            }

        

            if(this.lastButtonPressed!=undefined){
                // console.log("abort fetch");
                // controller.abortFetch();
            }

            this.lastButtonPressed = event.target;
          }
        isLoading = false;
    });

    const pokemonList = document.querySelector('.pokemonList');

    pokemonList.addEventListener('scroll', async () => {
        
        if (isLoading) return;

        const scrollPosition = pokemonList.scrollTop + pokemonList.clientHeight;
        const scrollThreshold = pokemonList.scrollHeight - 1;

        
        if (scrollPosition >= scrollThreshold) {
            isLoading = true;
            console.log("Pidiendo pokemones desde scroll")
            await controller.getPokemons(this.lastKey);
            isLoading = false;
            // pokemonList.removeEventListener('scroll', arguments.callee);
        }
    })

    document.querySelector('.pokemonList').addEventListener('click', async (e) => {
        if (e.target.classList.contains('info-btn')) {
            const name = e.target.getAttribute('data-name');
            const data = await model.getPokemon(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const fullAbilities = await controller.getFullAbilities(data.abilities);
            await view.displayPokemonModal(data, fullAbilities);
        }
    });

  });