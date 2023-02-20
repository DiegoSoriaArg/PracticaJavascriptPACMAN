//Obtenemos el elemento canvas
const canvas = document.querySelector('canvas');

//Obtenemos el contexto 2d del elemento canvas
const c = canvas.getContext('2d');

//Obtenemos el ancho y el alto de la ventana en el contexto de canvas
canvas.width = innerWidth;
canvas.height = innerHeight;

//Creamos la clase "Perimetro" y en su constructor asignamos la posicion y un ancho y alto
class Boundary {
  static width = 40;
  static height = 40;
  constructor({ position }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
  }

  //Creamos una funcion dentro de la clase llamada "dibujar" que creara una imagen de acuerdo a los parametros pasados al contexto (c)
  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

//Creamos la clase con la que construiremos un jugador
class Player {
  //En el constructor, le asignamos las propiedades del contexto
  constructor({position, velocity}) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
  }

  //Creamos una funcion dentro de la clase llamada "dibujar" que creara una imagen de acuerdo a los parametros pasados al contexto (c)
  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    c.fillStyle = 'yellow';
    c.fill()
    c.closePath();
  }

  //Con esta funcion, creamos el movimiento del jugador
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y
  }
}

//Creamos un array de "perimetros"
const boundaries = [];

//Creamos un nuevo jugador y le pasamos sus parametros
const player = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2
  },
  velocity: {
    x: 0,
    y: 0,
  },
});


//con esta constante, especificaremos el movimiento en el funcion recursiva
const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
}

let lastKey = '';

//Creamos un array multidimencional para enmarcar los limites de una caja o perimetro
const map = [
  ['-', '-', '-', '-', '-', '-'],
  ['-', ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', '-', '-', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ', '-'],
  ['-', '-', '-', '-', '-', '-']
];

//Recorremos el array map y mediante dos funciones callback lo dibujamos
map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    //Aqui verificamos si symbol contiene "-" y si es true, dibujamos/metemos un "perimetro dentro del array "perimetros""
    switch (symbol) {
      case '-':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            }
          })
        )
        break
    }
  });
});

//Esta funcion es recursiva y nos ayuda a crear el movimiento del jugador
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  //Recorremos el array de perimetros y mediante una funcion de linea los dibujamos
  boundaries.forEach((boundary) => {
    boundary.draw();
  });

  player.update();
  player.velocity.x = 0;
  player.velocity.y = 0;

  if(keys.w.pressed && lastKey === 'w') {
    player.velocity.y = -5
  } else if(keys.a.pressed && lastKey === 'a') {
    player.velocity.x = -5
  } else if(keys.s.pressed && lastKey === 's') {
    player.velocity.y = 5 
  } else if(keys.d.pressed && lastKey === 'd') {
    player.velocity.x = 5
  }
} 
animate();

//Agregamos el evento que captara cuando pulsemos las teclas de movimiento (evento) para un movimiento continuo
addEventListener('keydown', ({key}) => {
  switch (key) {
    case 'w':
      keys.w.pressed = true;
      lastKey = 'w';
      break;
    case 'a':
      keys.a.pressed = true;
      lastKey = 'a';
      break;
    case 's':
      keys.s.pressed = true;
      lastKey = 's';
      break;
    case 'd':
      keys.d.pressed = true;
      lastKey = 'd';
      break;
  }
})

//Agregamos el evento que captara cuando pulsemos las teclas de movimiento (evento) para un movimiento con pausa
addEventListener('keyup', ({key}) => {
  switch (key) {
    case 'w':
      keys.w.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case 's':
      keys.s.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
  }
})