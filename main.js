const keys = [
  [
    ["1", "!"],
    ["2", "@"],
    ["3", "#"],
    ["4", "$"],
    ["5", "%"],
    ["6", "&"],
    ["7", "/"],
    ["8", "("],
    ["9", ")"],
    ["0", "="],
    ["'", "?"],
    ["¡", "¿"],
  ], // primera fila teclado
  [
    ["q", "Q"],
    ["w", "W"],
    ["e", "E"],
    ["r", "R"],
    ["t", "T"],
    ["y", "Y"],
    ["u", "U"],
    ["i", "I"],
    ["o", "O"],
    ["p", "P"],
    ["´", "^"],
    ["+", "*"],
  ],
  [
    ["MAYUS", "MAYUS"],
    ["a", "W"],
    ["s", "E"],
    ["d", "R"],
    ["f", "T"],
    ["g", "Y"],
    ["h", "U"],
    ["j", "I"],
    ["k", "O"],
    ["l", "P"],
    ["ñ", "^"],
    ["¨", "{"],
    ["Ç", "}"],
  ],
  [
    ["SHIFT", "SHIFT"],
    ["<", ">"],
    ["z", "Z"],
    ["x", "X"],
    ["c", "C"],
    ["v", "V"],
    ["b", "B"],
    ["n", "N"],
    ["m", "M"],
    [",", ";"],
    [".", ":"],
    ["-", "_"],
  ],
  [
    ["SPACE", "SPACE"],
    
  ], // ultima fila del teclado
]; 

let mayus = false;
let shift = false;
let current = null; // para saber cual fue el ultimo click que recibio el input 

renderKeyboard();

function renderKeyboard(){
    const keyboardContainer = document.querySelector('#keyboard-container'); // referencia para mi html 
    let empty = `<div class="key-empty"></div>`; // pequeños espacios en los bordes del teclado

    const layers = keys.map((layer) =>{ // aca se esta iterando por cada fila y dependiendo de los controles hacemos una nueva iteracion
        return layer.map(key => {
            if(key[0] === 'SHIFT'){ // es decir en la posicion inicial de cada elemento
                return `<button class="key key-shift ${shift ? 'activated' : ''}">${key[0]}</button>`
            }
            if(key[0] === 'MAYUS'){
                return `<button class="key key-mayus ${mayus ? 'activated' : ''}">${key[0]}</button>`;
            }
            if (key[0] === "SPACE") {
              return `<button class="key key-space"></button>`;
            }

            return `
                <button class='key key-normal'>
                    ${shift
                         ? key[1]
                         : mayus &&
                           key[0].toLowerCase().charCodeAt(0) >= 97 && // se pasa a minuscula,y se muestra una letra del alfabeto
                           key[0].toLowerCase().charCodeAt(0) <= 122 // y si no se muestra el key[0]
                        ? key[1]
                        : key[0]}
                </button>
            `;
        })
    });

    layers[0].push(empty); //añadir al final de la primera fila del teclado
    layers[1].unshift(empty); // añadir al principio de la 2da fila del teclado (empty)

    const htmlLayers = layers.map((layer) =>{
        return layer.join(""); // aca estoy uniendo los array de layers en un solo arreglo unidimensional
    });

    keyboardContainer.innerHTML = ""; // estoy borrando todo lo que tenia

    htmlLayers.forEach(layer => {
        keyboardContainer.innerHTML += `<div class="layer">${layer}</div>` // aca estamos imprimiendo el teclado que cada uno tenga su contenedor 
    });
    document.querySelectorAll('.key').forEach(key => { // aca le estamos asignando un event listener a cada una de la teclas
        key.addEventListener('click', (e) => {
            if(current) { // quiere decir si hay un input 
                if(key.textContent === 'SHIFT') {
                    shift = !shift; // cambio el valor de shift a lo opuesto 
                    
                } else if(key.textContent === 'MAYUS'){
                    mayus = !mayus; // si es falso va a ser verdadero y si es verdadero va a ser falso 
                    
                } else if(key.textContent === ''){
                    current.value += " ";
                }else {
                    current.value += key.textContent.trim();
                    if(shift){
                        shift = false;
                        
                    }
                }

                renderKeyboard();
                current.focus();
            }
        })
    })
}

document.querySelectorAll('input').forEach(input => { // aca estoy diciendo que escoja cada elemento input luego lo itero 
 input.addEventListener('focusin', e => { // se activa cuando reciba el foco o este seleccionado 
    current = e.target;
 })
})