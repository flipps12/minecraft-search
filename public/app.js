const loading = document.getElementById('loading');
var key = 1;

const crearElemento = (tag, clase, id) => {
  const elemento = document.createElement(tag);
  elemento.className = clase;
  elemento.id = `${id}${key}`; // Asumiendo que "numero" es una variable con el valor deseado
  return elemento;
}

crearElementoHTML = () => {
  let serverContainer = document.querySelector('.server');
  let container = crearElemento('div', 'container', 'container');
  let version = crearElemento('div', 'version', 'version');
  let container2 = crearElemento('div', 'container2', 'container');
  let img = crearElemento('img', 'img', 'img');
  let subContainer = crearElemento('div', 'sub-container', 'sub-container');
  let subContainer1 = crearElemento('div', 'sub-container1', 'sub-container');
  let name = crearElemento('div', 'name', 'name');
  let players = crearElemento('div', 'players', 'players');
  let subContainer2 = crearElemento('div', 'sub-container2', 'sub-container');
  let html = crearElemento('div', 'html', 'html');

  subContainer1.append(name, players);
  subContainer2.appendChild(html);
  subContainer.append(subContainer1, subContainer2)
  container2.append(img, subContainer);
  container.append(version, document.createElement('br'), container2);

  serverContainer.appendChild(container);
}

const writeHtml = (data) => {
  if (data.mensaje !== null) {
    document.getElementById(`version${key}`).textContent = data.mensaje.version.name
    document.getElementById(`players${key}`).textContent = `${data.mensaje.players.online}/${data.mensaje.players.max}`
    document.getElementById(`html${key}`).innerHTML = data.mensaje.motd.html
    document.getElementById(`img${key}`).src = data.mensaje.favicon
    document.getElementById(`name${key}`).textContent = data.mensaje.motd.clean
  } else {
    document.getElementById(`name${key}`).textContent = 'No se encuentran servidores con esta ip o este puerto'
    document.getElementById(`img${key}`).src = ''
  }
}
document.getElementById('Form').addEventListener('submit', function (event) {
  event.preventDefault();
  const username = document.getElementById('ip').value;
  const port = document.getElementById('port').value;
  // Obtener los valores del formulario
  minecraftSearch(username, port)
});

const minecraftSearch = (username, port) => {
  loading.removeAttribute('hidden')
  // Enviar los datos al servidor mediante una solicitud POST
  fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, port }),
  })
    .then(response => response.json())
    .then(data => {
      crearElementoHTML()
      writeHtml(data, key)
      key++
      loading.setAttribute('hidden', '')
      // Puedes realizar acciones adicionales aquí según la respuesta del servidor
    })
    .catch(error => {
      console.error('Error al enviar la solicitud:', error);
    });
}

minecraftSearch('mc.bepisgvng.site', '')
//minecraftSearch('mc.universocraft.com', '')
