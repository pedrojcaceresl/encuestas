const express = require("express");
const app = express();

app.use(express.json());

const cors = require('cors');


app.use(cors());

const preguntasDB = {
    preguntas: require('./preguntas.json'),
    setPreguntas: function (data) { this.preguntas = data },
}

app.get('/', (req, res) => {
    const preguntas = preguntasDB.preguntas;

    res.json({
        ok: true,
        data: preguntas,
    })
})

app.post('/', (req, res) => {
    
    const { tipo, pregunta, opciones } = req.body;

    console.log({ tipo, pregunta, opciones});

    const preguntas = preguntasDB.preguntas;

    preguntasDB.setPreguntas([...preguntas, { tipo, pregunta, opciones }]);

    console.log(JSON.stringify(preguntasDB, 0, 2));

    res.json({
        ok: true,
        data: preguntasDB.preguntas
    });
});

app.put('/', (req, res) => {

    const { tipo, pregunta, opciones } = req.body;

    const preguntas = preguntasDB.preguntas;

    preguntasDB.setPreguntas([...preguntas, { tipo, pregunta, opciones }]);


    res.json({
        ok: true,
        data: preguntasDB.preguntas
    });
    res.send(req.body);

})

app.delete('/', (req, res) => { 
    res.send("Eliminado");
})

app.listen(3000, () => {
    console.log("El servidor esta online en el puerto 3000");
})
