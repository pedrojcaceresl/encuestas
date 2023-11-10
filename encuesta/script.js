

const btnPreguntas = document.getElementById('btn_preguntas');

let preguntas = [];


function cargarPreguntas() {
    var encuestaContainer = document.getElementById("encuesta-container");

    console.log({encuestaContainer, preguntas})

    preguntas.data.forEach(function (pregunta, index) {
        var preguntaDiv = document.createElement("div");
        preguntaDiv.innerHTML = "<p>" + pregunta.pregunta + "</p>";

        var opcionesDiv = document.createElement("div");
        pregunta.opciones.forEach(function (opcion) {
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "pregunta" + index;
            checkbox.value = opcion;
            var label = document.createElement("label");
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(opcion));
            opcionesDiv.appendChild(label);
        });

        preguntaDiv.appendChild(opcionesDiv);
        encuestaContainer.appendChild(preguntaDiv);
    });
}


function getPreguntas() {
    console.log('Preguntasss')
    fetch("http://localhost:3000")
        .then(res => {
            return res.json()
        }).then(res => {
            console.log("This is the data", res);
            preguntas = res;
            cargarPreguntas();

        })
}


getPreguntas();

btnPreguntas.addEventListener('click', getPreguntas);