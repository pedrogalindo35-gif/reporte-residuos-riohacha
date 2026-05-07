const horarios = {
  "Centro": "Lunes, miércoles y viernes - 7:00 a.m.",
  "Coquivacoa": "Martes, jueves y sábado - 8:00 a.m.",
  "Villa Fátima": "Lunes, miércoles y viernes - 6:30 a.m.",
  "Los Almendros": "Martes, jueves y sábado - 7:30 a.m.",
  "Dividivi": "Lunes, miércoles y sábado - 8:30 a.m."
};

function consultarHorario() {
  const barrio = document.getElementById("barrioHorario").value;
  const resultado = document.getElementById("resultadoHorario");

  if (barrio === "") {
    resultado.innerHTML = "Por favor seleccione un barrio para consultar el horario.";
    return;
  }

  resultado.innerHTML = `
    <strong>Barrio:</strong> ${barrio}<br>
    <strong>Horario de recolección:</strong> ${horarios[barrio]}
  `;
}

document.getElementById("formReporte").addEventListener("submit", function(event) {
  event.preventDefault();

  const barrio = document.getElementById("barrio").value;
  const direccion = document.getElementById("direccion").value;
  const tipo = document.getElementById("tipo").value;
  const descripcion = document.getElementById("descripcion").value;

  if (barrio === "" || direccion === "" || tipo === "" || descripcion === "") {
    document.getElementById("mensaje").textContent = "Debe completar todos los campos.";
    return;
  }

  const reporte = {
    barrio: barrio,
    direccion: direccion,
    tipo: tipo,
    descripcion: descripcion,
    fecha: new Date().toLocaleString(),
    estado: "Registrado"
  };

  let reportes = JSON.parse(localStorage.getItem("reportes")) || [];
  reportes.push(reporte);
  localStorage.setItem("reportes", JSON.stringify(reportes));

  document.getElementById("mensaje").textContent = "Reporte guardado correctamente.";
  document.getElementById("formReporte").reset();

  mostrarReportes();
});

function mostrarReportes() {
  const lista = document.getElementById("listaReportes");
  let reportes = JSON.parse(localStorage.getItem("reportes")) || [];

  if (reportes.length === 0) {
    lista.innerHTML = "<p>No hay reportes registrados todavía.</p>";
    return;
  }

  lista.innerHTML = "";

  reportes.forEach((reporte, index) => {
    lista.innerHTML += `
      <div class="reporte">
        <p><strong>Reporte No:</strong> ${index + 1}</p>
        <p><strong>Barrio:</strong> ${reporte.barrio}</p>
        <p><strong>Dirección:</strong> ${reporte.direccion}</p>
        <p><strong>Tipo de problema:</strong> ${reporte.tipo}</p>
        <p><strong>Descripción:</strong> ${reporte.descripcion}</p>
        <p><strong>Fecha:</strong> ${reporte.fecha}</p>
        <p><strong>Estado:</strong> ${reporte.estado}</p>
      </div>
    `;
  });
}

mostrarReportes();