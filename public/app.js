const container = document.getElementById('container');
const version = document.getElementById('version');
const players = document.getElementById('players');
const html = document.getElementById('html');
const img = document.getElementById('img');
const nameServer = document.getElementById('name');
const loading = document.getElementById('loading');
const writeHtml = (data) => {
  if (data.mensaje !== null){
    version.textContent = data.mensaje.version.name
    players.textContent = `${data.mensaje.players.online}/${data.mensaje.players.max}`
    html.innerHTML = data.mensaje.motd.html
    img.src = data.mensaje.favicon
    nameServer.textContent = data.mensaje.motd.clean
  } else {
    nameServer.textContent = 'No se encuentran servidores con esta ip o este puerto'
    version.textContent = '' 
    players.textContent = ''
    html.innerHTML = '' 
    img.src = ''
  }
}
document.getElementById('Form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    // Obtener los valores del formulario
    const username = document.getElementById('ip').value;
    loading.removeAttribute('hidden')
    // Enviar los datos al servidor mediante una solicitud POST
    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
    .then(response => response.json())
    .then(data => {
      writeHtml(data)
      loading.setAttribute('hidden','')      
      // Puedes realizar acciones adicionales aquí según la respuesta del servidor
    })
    .catch(error => {
      console.error('Error al enviar la solicitud:', error);
    });
  });