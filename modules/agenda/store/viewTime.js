import { selector, create } from "../../../utils/documentFunctions";

fetch('/time/show')
    .then(response => response.json())
    .then(time => {
        const tbody = selector('tbody')

        time.forEach(hour => {
            const row = create('tr')
            const cellHour = create('td')
            //const status = create('td')
            const reserva = create('td')

            cellHour.textContent = time.time
            reserva.textContent = time.user ? time.user.name : 'N/A'
            row.appendChild(cellHour)
            row.appendChild(reserva)

            tbody.appendChild(row)
        });



    }).catch(error => {
        console.error('Erro ao carregar os horários:', error);
    });