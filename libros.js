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
mostrarLibros();