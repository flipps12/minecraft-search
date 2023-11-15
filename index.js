const express = require('express')
const path = require('path');
const util = require('minecraft-server-util');

// inicializando 
const app = express();
const puerto = 3000;
const ip = '0.0.0.0';
const serverIP = 'mc.universocraft.com';
// uses
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const search = async() => {
    try {
        const status = await util.status(serverIP);
        console.log(status.version);
      } catch (error) {
        console.error(error);
      }
}
// rutas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'root.html'));
});
app.post('/', async (req, res) =>{
    let ip = req.body;
    console.log(ip)
    try {
        const status = await util.status(ip.username);
        console.log(status)
        res.json({ mensaje: status });
      } catch (error) {
        console.error(error);
      }
})

// Escucha
app.listen(puerto, () => {
  console.log(`Aplicación Express escuchando en el puerto ${puerto}`);
});