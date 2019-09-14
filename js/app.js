function Seguro(marca, anio, tipo) {

  this.marca = marca;
  this.anio = anio;
  this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function() {
  
  let cantidad,
      base = 2000;

  switch (this.marca) {
    case '1':
      cantidad = base * 1.15;
      break;
    case '2':
      cantidad = base * 1.05;
      break;
    case '3':
      cantidad = base * 1.35;
  }  
                             
  // Leer el año
  let diferencia = new Date().getFullYear() - this.anio;
  // Reducir un 3% de su valor cada año
  cantidad -= ((diferencia * 3) * cantidad) / 100;

  if (this.tipo === 'basico') {

    cantidad *= 1.30;
  } else {

    cantidad *= 1.50;
  }
  return cantidad;
}

function Interfaz() {} //Todo lo que se muestra.
Interfaz.prototype.mostrarMsg = (msg, type) => {  // Msg que se imprime en el HTML
  
  let div = document.createElement('div');

  if (type === 'error') {

    div.classList.add('mensaje', 'error');
  } else {

    div.classList.add('mensaje', 'correcto');
  }

  div.innerHTML = `${msg}`;

  formulario.insertBefore(div, document.querySelector('.form-group'));

  setTimeout(() => {
    document.querySelector('.mensaje').remove();
  }, 3000);
}

// Imprime el resultado de la cotización
Interfaz.prototype.mostrarResultado = function(seguro, total) {

  let result = document.getElementById('resultado'),
      lookMarca;
  
  switch (seguro.marca) {
    case '1':
      lookMarca = 'Americano';
      break;
    case '2':
      lookMarca = 'Asiatico';
      break;
    case '3':
      lookMarca = 'Europeo';
  }

  let div = document.createElement('div'), // crear div para inyectar resultados
      spinner = document.querySelector('#cargando img');

  spinner.style.display = 'block';
  
  setTimeout(() => {
    
    spinner.style.display = 'none';
    result.appendChild(div);
  }, 3000);

  div.innerHTML = `
      <strong><p class="header">Tu resumen:</p><br>
      <p>Marca: ${lookMarca}</p>
      <p>año: ${seguro.anio}</p>
      <p>tipo: ${seguro.tipo}</p> 
      <p>total: ${total}</p> 
      </strong>
  `;

}

// EventListeners
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', e => {
  
  e.preventDefault();

  let marca = document.getElementById('marca'),
      marcaSelect = marca.options[marca.options.selectedIndex].value; // Lee el valor del select marca

  let anio = document.getElementById('anio'),
      anioSelect = anio.options[anio.options.selectedIndex].value; // Lee valor del select año

  let tipo = document.querySelector('input[name="tipo"]:checked').value; // Lee valor del radio bottom

  let interfaz = new Interfaz();

  if (marcaSelect === '' || anioSelect === '' || tipo === '') {
    
    interfaz.mostrarMsg('faltan datos', 'error');
  } else {

    interfaz.mostrarMsg('Cotizando...', 'correcto');

    let resultados = document.querySelector('#resultado div');

    if (resultados != null) {
      resultados.remove();
    }
  
    let seguro = new Seguro(marcaSelect, anioSelect, tipo);  // Instanciar seguro y mostrar

    let cantidad = seguro.cotizarSeguro();  // Cotizar el seguro

    interfaz.mostrarResultado(seguro, cantidad); // Mostrar el resultado
  }
})



const MAX = new Date().getFullYear(),
      MIN = MAX - 20,
      ID_YEARS = document.getElementById('anio');

for(let i = MAX; i >= MIN; i--) {

  let option = document.createElement('option');

  option.value = i;
  option.innerHTML = i;

  ID_YEARS.appendChild(option);
}