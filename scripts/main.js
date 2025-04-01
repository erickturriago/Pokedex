window.addEventListener('DOMContentLoaded', () => {
    const model = new UserModel();
    const view = new UserView();
    const controller = new UserController(model, view);
    let lastKey = '';
    let lastButtonPressed = undefined;
    let isLoading = false;
    controller.getTypesPokemons();

    const typePokemonsList = document.querySelector('.types');
    const burgerBtn = document.querySelector('.burger-btn');
    const bar = document.querySelector('.bar');
    const pokemonList = document.querySelector('.pokemonList');

    // Click en tipo
    typePokemonsList.addEventListener('click', async (event) => {
        isLoading = true;
        if (event.target.classList.contains('type')) {
            const key = event.target.getAttribute('key');

            if (lastKey !== key) {
                lastKey = key;
                await controller.changeColor(event.target);
                await controller.resetPokemons();
                await controller.getPokemons(key);
            }

            lastButtonPressed = event.target;

            // Cerrar menú en móvil
            if (window.innerWidth <= 768) {
                typePokemonsList.classList.remove('show');
                document.body.classList.remove('menu-open');
            }
        }
        isLoading = false;
    });

    // Scroll infinito
    pokemonList.addEventListener('scroll', async () => {
        if (isLoading) return;

        const scrollPosition = pokemonList.scrollTop + pokemonList.clientHeight;
        const scrollThreshold = pokemonList.scrollHeight - 1;

        if (scrollPosition >= scrollThreshold) {
            isLoading = true;
            await controller.getPokemons(lastKey);
            isLoading = false;
        }
    });

    // Info Pokémon modal
    pokemonList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('info-btn')) {
            const name = e.target.getAttribute('data-name');
            const data = await model.getPokemon(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const fullAbilities = await controller.getFullAbilities(data.abilities);
            await view.displayPokemonModal(data, fullAbilities);
        }
    });

    // Botón burger
    burgerBtn.addEventListener('click', () => {
        const isVisible = typePokemonsList.classList.toggle('show');
        document.body.classList.toggle('menu-open', isVisible);
    });

    // Botón cerrar menú
    document.querySelector('.close-types-btn').addEventListener('click', () => {
        typePokemonsList.classList.remove('show');
        document.body.classList.remove('menu-open');
    });

    // Ocultar barra en móvil solo con scroll en .pokemonList
    let lastScrollTop = 0;
    pokemonList.addEventListener('scroll', () => {
        const currentScroll = pokemonList.scrollTop;
        if (window.innerWidth <= 768) {
            if (currentScroll > lastScrollTop) {
                bar.classList.add('hide');
            } else {
                bar.classList.remove('hide');
            }
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
});
