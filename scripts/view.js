
class UserView {
    constructor() {
        this.typesPokemons = document.querySelector('.types');
        this.pokemonList = document.querySelector('.pokemonList');
        this.lastCard = ``;
        this.lastButton = undefined;
        this.typeColor = {
          "normal": "#A8A77A",
          "fire": "#EE8130",
          "water": "#6390F0",
          "electric": "#F7D02C",
          "grass": "#7AC74C",
          "ice": "#96D9D6",
          "fighting": "#e48e85",
          "poison": "#A33EA1",
          "ground": "#E2BF65",
          "flying": "#A98FF3",
          "psychic": "#F95587",
          "bug": "#A6B91A",
          "rock": "#B6A136",
          "ghost": "#735797",
          "dragon": "#6F35FC",
          "dark": "#705746",
          "steel": "#B7B7CE",
          "fairy": "#D685AD"
        }

        this.typeIcon = {
          "normal": `<i class="fas fa-circle"></i>`,
          "fire": `<i class="fas fa-fire"></i>`,
          "water": `<i class="fas fa-tint"></i>`,
          "electric": `<i class="fas fa-bolt"></i>`,
          "grass": `<i class="fas fa-leaf"></i>`,
          "ice": `<i class="fas fa-snowflake"></i>`,
          "fighting": `<i class="fas fa-hand-fist"></i>`,
          "poison": `<i class="fas fa-skull-crossbones"></i>`,
          "ground": `<i class="fas fa-mountain"></i>`,
          "flying": `<i class="fas fa-dove"></i>`,
          "psychic": `<i class="fas fa-brain"></i>`,
          "bug": `<i class="fas fa-bug"></i>`,
          "rock": `<i class="fas fa-gem"></i>`,
          "ghost": `<i class="fas fa-ghost"></i>`,
          "dragon": `<i class="fas fa-dragon"></i>`,
          "dark": `<i class="fas fa-moon"></i>`,
          "steel": `<i class="fas fa-cogs"></i>`,
          "fairy": `<i class="fas fa-star"></i>`
        }

        this.statsUtils = {
          "hp": {
            color: "#AED581",
            max: 255,
            icon: `<i class="fas fa-heart text-danger"></i>`
          },
          "attack": {
            color: "#FFCDD2",
            max: 190,
            icon: `<i class="fas fa-bolt text-warning"></i>`
          },
          "defense": {
            color: "#FFE082",
            max: 230,
            icon: `<i class="fas fa-shield-alt text-primary"></i>`
          },
          "special-attack": {
            color: "#FF8A80",
            max: 194,
            icon: `<i class="fas fa-magic text-danger"></i>`
          },
          "special-defense": {
            color: "#FFD54F",
            max: 230,
            icon: `<i class="fas fa-shield-heart text-warning"></i>`
          },
          "speed": {
            color: "#81D4FA",
            max: 180,
            icon: `<i class="fas fa-tachometer-alt text-info"></i>`
          },
        };
    }
    
    displayTypesPokemons(typesPokemons) {
    //   this.u.innerHTML = '';
        let count = 1;
        typesPokemons.forEach(type => {
            const child = document.createElement('p');
            child.className = "type";
            child.innerHTML = `${this.typeIcon[type.name]} ${type.name}`
            //child.textContent = `${type.name}`;
            child.setAttribute('key',count);
            child.style.color = this.typeColor[type.name];
            count ++;
            this.typesPokemons.appendChild(child);
      });
    }

    async resetPokemonList(){
        this.pokemonList.innerHTML = ``;
        while (this.pokemonList.firstChild) {
            this.pokemonList.removeChild(this.pokemonList.firstChild);
          }
    }

    displayCard(){
      // console.log("Mostrando card "+contador)
      const card = document.createElement('div');
      // card.id="card"+contador;
      card.className="pokemonCard";
      const loader = document.createElement('div');
      loader.className="o-pokeball c-loader u-rubber-band";
      loader.id = "loader";
      card.appendChild(loader);
      this.lastCard=card;
      this.pokemonList.appendChild(card); 
    }

    // async hideLoading(){
    //   setTimeout(() => {
    //     // console.log(this.lastCard)
    //     console.log(this.lastCard.querySelector('#loader'))
    //     this.lastCard.querySelector('#loader').style.display = 'none';
    //   }, 400);
    // }

    async displayPokemon(pokemon,cardNumber){
        // console.log(this.lastCard)
        const types = pokemon.types.map((type) => {
          return  `<span style="background-color:${this.typeColor[type.type.name]}" class="idPokedex">${this.typeIcon[type.type.name]} ${type.type.name}</span>`;
          });
        
        //const types = pokemon.types.map((type) => {
        //  return  `<span style="background-color:${this.typeColor[type.type.name]}" class="idPokedex">${this.typeIcon[type.type.name]}</span>`;
        //});

        const stats = pokemon.stats.map((stat)=>{
            // <td>${stat.base_stat}</td>
            // console.log(this.statsUtils["hp"].color)
            // console.log(this.statsUtils[stat.stat.name])
            return `<tr>
                        <td><strong>${this.statsUtils[stat.stat.name].icon} ${stat.stat.name}</strong></td>
                        <td><strong class="statPoints">${stat.base_stat}</strong></td>
                        <td><div class="statBar"><div class="statBarFill" 
                          style="background-color:${this.statsUtils[stat.stat.name].color};
                                 max-width:${(100/this.statsUtils[stat.stat.name].max)*stat.base_stat}px;
                          "></div></div></td>
                    </tr>`
        })


        const content = `
          <div class="pokemonInfo">
            <p>${pokemon.name}</p>
            <p class="idPokedex">#${pokemon.id}</p>
            <img class="img-pokemon" src="${pokemon.sprites.versions['generation-v']['black-white'].animated.front_default || pokemon.sprites.front_default}" alt="${pokemon.name}">
            <div class="pokemonType">
                ${types.join('')}
            </div>
          </div>
          <div class="pokemonStats">
            <table>
                ${stats.join('')}
            </table>
          </div>
        `
        const card = this.pokemonList.children[cardNumber]
        setTimeout(()=>{
          card.removeChild(card.querySelector("#loader"));
          card.innerHTML = content;
          card.innerHTML += `<img src="./img/pokeball_icon.svg" class="info-btn" alt="pokeball" width="25" data-name="${pokemon.name}">`
        },500)
        // console.log(cardNumber)
        // console.log(card)
        
    }

    async displayPokemonModal(pokemon, fullAbilities) {
      const types = pokemon.types.map(t => 
        `<span class="badge me-1" style="background-color:${this.typeColor[t.type.name]}">${this.typeIcon[t.type.name]} ${t.type.name}</span>`
      ).join('');
    
      const stats = pokemon.stats.map(stat => 
        `<tr>
            <td><strong>${this.statsUtils[stat.stat.name].icon} ${stat.stat.name}</strong></td>
            <td><strong class="statPoints">${stat.base_stat}</strong></td>
            <td><div class="statBar"><div class="statBarFill" 
              style="background-color:${this.statsUtils[stat.stat.name].color};
                      max-width:${(100/this.statsUtils[stat.stat.name].max)*stat.base_stat}px;
              "></div></div></td>
        </tr>`).join('');
    
        const abilities = fullAbilities.map(a => `
          <div class="card mb-2">
            <div class="card-body p-2">
              <h6 class="card-title mb-1 d-flex justify-content-between align-items-center">
                <span class="text-capitalize">${a.name}</span>
                ${a.is_hidden ? '<span class="badge bg-secondary">Oculta</span>' : ''}
              </h6>
              <p class="card-text small mb-0">${a.description}</p>
            </div>
          </div>
        `).join('');
    
      const html = `
        <div class="text-center">
          <img src="${pokemon.sprites.versions['generation-v']['black-white'].animated.front_default || pokemon.sprites.front_default}" 
               alt="${pokemon.name}" 
               style="width: 150px; image-rendering: pixelated; display: block; margin: 0 auto;">
          <h4 class="mt-2">${pokemon.name}</h4>
          <div class='pokemonType'>${types}</div>
        </div>
        <hr>
        <h5>Statistics</h5>
        <div class="pokemonStats">
          <table class="table-sm">
            <tbody>${stats}</tbody>
          </table>
        </div>
        <h5>Skills</h5>
        <ul>${abilities}</ul>
      `;
    
      document.getElementById('pokemonModalBody').innerHTML = html;
      const modal = new bootstrap.Modal(document.getElementById('pokemonModal'));
      modal.show();
    }


    async changeColorButton(element){
      let textContent = element.textContent.split(' ')[1]
      console.log(this.lastButton)
      console.log(this.typeColor[textContent])
      console.log(element)
      // this.lastButton.style.color = `${this.typeColor[element.textContent]}`;
      // this.lastButton.style.color = "black";
      // this.lastButton.styles.backgroundColor = '#f4f4f4';
      // this.lastButton=element;
      if(this.lastButton){
        let textContentLastButton = this.lastButton.textContent.split(' ')[1]
        this.lastButton.style.color = this.typeColor[textContentLastButton];
        this.lastButton.style.backgroundColor = '#f4f4f4';
      }
      element.style.color='#fff';
      element.style.backgroundColor = this.typeColor[textContent];

      this.lastButton=element;
    }
  }