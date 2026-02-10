const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS para que tu web en GitHub pueda llamar a este servidor
app.use(cors());

app.get('/modelo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const url = `https://passport-traca.iti.es/inescop/modelo/${id}`;
        
        console.log(`📡 Solicitud recibida para ID: ${id}`);
        
        const respuesta = await fetch(url);
        
        if (!respuesta.ok) {
            return res.status(respuesta.status).json({ error: `Error en ITI: ${respuesta.status}` });
        }
        
        const datos = await respuesta.json();
        res.json(datos);
        
    } catch (error) {
        res.status(500).json({ error: 'Error al conectar con el servidor de ITI' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor proxy activo en el puerto ${PORT}`);
});