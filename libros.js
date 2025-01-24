let libros = [
    {titulo: "El principtio", autor: "Antoine de Saint-Exupéry", genero: "Fabula", disponible: true},
    {titulo: "La Biblia", autor: "Dios", genero: "Libro Sagrado", disponible: true},
    {titulo: "Comics", autor: "Stan Lee", genero: "Ficcion", disponible: true},
    {titulo: "It", autor: "Stephen King", genero: "Terror", disponible: true}
];

const prestamos = [];
const notificaciones = [];
function mostrarLibros() {
    const listaLibros = document.getElementById("libros");
    listaLibros.innerHTML = libros.map((libro, index) => `
            <li>
                ${libro.titulo} - ${libro.autor} (${libro.genero}) - ${libro.disponible ? "Disponible" : "No disponible"}
                ${libro.disponible ? `<button onclick="reservarLibro(${index})">Reservar</button>` : ""}
            </li>
        `).join("");
}
async function reservarLibro(index) {
    if (!libros[index].disponible) {
        alert("El libro no está disponible.");
        return;
    }
    
    libros[index].disponible = false;
    const fechaDevolucion = new Date();
    fechaDevolucion.setDate(fechaDevolucion.getDate() + 7);
    prestamos.push({ ...libros[index], fechaDevolucion });

    notificar(`Has reservado: ${libros[index].titulo}. Fecha de devolución: ${fechaDevolucion.toLocaleDateString()}`);
    
    mostrarLibros();
    mostrarPrestamos();
    setTimeout(() => {
        notificar(`El libro "${libros[index].titulo}" está disponible para reserva.`);
    }, 5000);
}
function mostrarPrestamos() {
    const listaPrestamos = document.getElementById("prestamos");
    listaPrestamos.innerHTML = prestamos
        .map(prestamo => `
            <li>
                ${prestamo.titulo} - Devuelve antes del ${prestamo.fechaDevolucion.toLocaleDateString()}
                <button onclick="devolverLibro('${prestamo.titulo}')">Devolver</button>
            </li>
        `).join("");
}
function devolverLibro(titulo) {
    const indexPrestamo = prestamos.findIndex(prestamo => prestamo.titulo === titulo);
    if (indexPrestamo === -1) return;

    const libroIndex = libros.findIndex(libro => libro.titulo === titulo);
    libros[libroIndex].disponible = true;
    prestamos.splice(indexPrestamo, 1);

    notificar(`Has devuelto: ${titulo}. Gracias por devolverlo a tiempo.`);
    mostrarLibros();
    mostrarPrestamos();
}

document.getElementById("buscar").addEventListener("input", (e) => {
    const criterio = e.target.value.toLowerCase();
    const resultados = libros.filter(libro =>
        libro.titulo.toLowerCase().includes(criterio) ||
        libro.autor.toLowerCase().includes(criterio) ||
        libro.genero.toLowerCase().includes(criterio)
    );
    const listaResultados = document.getElementById("resultados");
    listaResultados.innerHTML = resultados
        .map(libro => `<li>${libro.titulo} - ${libro.autor} (${libro.genero})</li>`)
        .join("");
});

function notificar(mensaje) {
    notificaciones.push(mensaje);
    const listaNotificaciones = document.getElementById("notificaciones");
    listaNotificaciones.innerHTML = notificaciones
        .map(notificacion => `<li>${notificacion}</li>`)
        .join("");
    alert(mensaje);
}

// Recordatorios automáticos
setInterval(() => {
    const hoy = new Date();
    prestamos.forEach(prestamo => {
        if (prestamo.fechaDevolucion.toDateString() === hoy.toDateString()) {
            notificar(`Devolver libro: ${prestamo.titulo}, hoy`);
        }
    });
}, 60000);

mostrarLibros();