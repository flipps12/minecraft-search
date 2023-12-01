const express = require('express')
const path = require('path');
const util = require('minecraft-server-util');

// inicializando 
const app = express();
const puerto = process.env.PORT || 3000;
const ip = '0.0.0.0';
const serverIP = 'mc.universocraft.com';
// uses
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// rutas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'root.html'));
});
app.post('/', async (req, res) => {
  let ip = req.body;
  console.log(ip)
  if (ip.port == '') ip.port = 25565
  else ip.port = parseInt(ip.port)
  try {
    const status = await util.status(ip.username, ip.port);
    res.json({ mensaje: status });
  } catch (error) {
    res.json({ mensaje: null })
    console.error(error);
  }
})

// Escucha
app.listen(puerto, () => {
  console.log(`Aplicación Express escuchando en el puerto ${puerto}`);
});