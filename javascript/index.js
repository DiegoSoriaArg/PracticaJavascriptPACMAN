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

//Creamos un array multidimencional para enmarcar los limites de una caja o perimetro
const map = [
  ['-', '-', '-', '-', '-', '-'],
  ['-', ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', '-', '-', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ', '-'],
  ['-', '-', '-', '-', '-', '-']
];

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

function animate() {
  requestAnimationFrame(animate);
  //console.log('sdfsdgf');
  //Recorremos el array de perimetros y mediante una funcion de linea los dibujamos
  boundaries.forEach((boundary) => {
    boundary.draw();
  });

  player.update();
}

animate();



//Agregamos el evento que captara cuando pulsemos las teclas de movimiento (evento)
addEventListener('keydown', ({key}) => {
  switch (key) {
    case 'w':
      player.velocity.y = -5;
      break;
    case 'a':
      player.velocity.x = -5;
      break;
    case 's':
      player.velocity.y = 5;
      break;
    case 'd':
      player.velocity.x = 5;
      break;
  }
  console.log(player.velocity);
})