
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
          "fighting": "#C22E28",
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

        this.statColors = {
          "hp": {
            color: "#AED581",
            max: 255,
          },
          "attack": {
            color: "#FFCDD2",
            max: 190,
          },
          "defense": {
            color: "#FFE082",
            max: 230,
          },
          "special-attack": {
            color: "#FF8A80",
            max: 194,
          },
          "special-defense": {
            color: "#FFD54F",
            max: 230,
          },
          "speed": {
            color: "#81D4FA",
            max: 180,
          },
        };
    }
    
    displayTypesPokemons(typesPokemons) {
    //   this.u.innerHTML = '';
        let count = 1;
        typesPokemons.forEach(type => {
            const child = document.createElement('p');
            child.className = "type";
            child.textContent = type.name;
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
            return  `<span style="background-color:${this.typeColor[type.type.name]}" class="idPokedex">${type.type.name}</span>`;
          });

        const stats = pokemon.stats.map((stat)=>{
            // <td>${stat.base_stat}</td>
            // console.log(this.statColors["hp"].color)
            // console.log(this.statColors[stat.stat.name])
            return `<tr>
                        <td><strong>${stat.stat.name}</strong></td>
                        <td><strong class="statPoints">${stat.base_stat}</strong></td>
                        <td><div class="statBar"><div class="statBarFill" 
                          style="background-color:${this.statColors[stat.stat.name].color};
                                 max-width:${(100/this.statColors[stat.stat.name].max)*stat.base_stat}px;
                          "></div></div></td>
                    </tr>`
        })


        const content = `
          <div class="pokemonInfo">
            <p>${pokemon.name}</p>
            <p class="idPokedex">#${pokemon.id}</p>
            <img src=${pokemon.sprites.front_default}>
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
        },500)
        // console.log(cardNumber)
        // console.log(card)
        
    }


    async changeColorButton(element){
      console.log(this.lastButton)
      console.log(this.typeColor[element.textContent])
      // this.lastButton.style.color = `${this.typeColor[element.textContent]}`;
      // this.lastButton.style.color = "black";
      // this.lastButton.styles.backgroundColor = '#f4f4f4';
      // this.lastButton=element;
      if(this.lastButton){
        this.lastButton.style.color = this.typeColor[this.lastButton.textContent];
        this.lastButton.style.backgroundColor = '#f4f4f4';
      }
      element.style.color='#fff';
      element.style.backgroundColor = this.typeColor[element.textContent];

      this.lastButton=element;
    }
  }