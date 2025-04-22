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

    // ------------------------
    // TEMA VISUAL
    // ------------------------

    const themeContainer = document.querySelector(".theme-container");
    const themeIcons = document.querySelectorAll(".theme-container .theme-icon");
    let pastTheme = null;
    let currentTheme = document.querySelector(".theme-icon.selected");
    let isThemeOpen = false;

    const themeClassMap = {
        yellow: "theme-yellow",
        blue: "theme-blue",
        green: "theme-green"
    };

    // Clic en el contenedor para abrir el menú
    themeContainer.addEventListener("click", (e) => {
        const targetDiv = e.target.closest(".theme-icon");
        if (!targetDiv) return;

        // Solo abre si se hizo clic sobre el ícono seleccionado
        if (targetDiv.classList.contains("selected") && !isThemeOpen) {
            themeIcons.forEach((icon) => {
                icon.classList.remove("hidden");
            });
            isThemeOpen = true;
        }
    });

    // Seleccionar nuevo tema
    themeIcons.forEach((icon) => {
        icon.addEventListener("click", (e) => {
            const clickedIcon = e.currentTarget;

            if (!clickedIcon.classList.contains("selected")) {
                // Quitar clases anteriores del body
                document.body.classList.remove("theme-yellow", "theme-blue", "theme-green");

                // Agregar nueva clase de tema
                const colorClass = [...clickedIcon.classList].find(c => themeClassMap[c]);
                if (colorClass) {
                    document.body.classList.add(themeClassMap[colorClass]);
                }

                // Ocultar todos los íconos excepto el clicado
                themeIcons.forEach((i) => {
                    if (i !== clickedIcon) {
                        i.classList.add("hidden");
                    }
                });

                // Esperar antes de marcar como seleccionado y moverlo
                setTimeout(() => {
                    currentTheme.classList.remove("selected");
                    clickedIcon.classList.add("selected");

                    // Mover el ícono seleccionado al final
                    themeContainer.appendChild(clickedIcon);

                    pastTheme = currentTheme;
                    currentTheme = clickedIcon;
                }, 500);

                isThemeOpen = false;
            }
        });
    });

    // Clic fuera = cerrar menú y dejar solo el .selected
    document.addEventListener("click", (e) => {
        if (!isThemeOpen) return;

        if (!themeContainer.contains(e.target)) {
            themeIcons.forEach((icon) => {
                if (!icon.classList.contains("selected")) {
                    icon.classList.add("hidden");
                }
            });
            isThemeOpen = false;
        }
    });
});
