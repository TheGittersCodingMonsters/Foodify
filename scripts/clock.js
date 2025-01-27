function updateDateTime() {
    const now = new Date();
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const formattedDateTime = `${day} | ${time} | ${month} ${date}, ${year}`;

    document.getElementById("dateTimeDisplay").textContent = formattedDateTime;
}

// Update every second
setInterval(updateDateTime, 1000);

// Initial call
updateDateTime();
