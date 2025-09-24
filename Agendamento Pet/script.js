document.addEventListener('DOMContentLoaded', () => {
    // --- Seleção de Elementos do DOM ---
    const form = document.getElementById('appointment-form');
    const filterDateInput = document.getElementById('filter-date');
    const dollarQuoteSpan = document.getElementById('dollar-quote');
    const morningList = document.getElementById('morning-list');
    const afternoonList = document.getElementById('afternoon-list');
    const nightList = document.getElementById('night-list');
    const noAppointmentsMessage = document.getElementById('no-appointments-message');

    // --- Constantes ---
    const MORNING_END = 12;
    const AFTERNOON_END = 18;
    const APPOINTMENTS_STORAGE_KEY = 'petshop_appointments';

    // --- API: Cotação do Dólar ---
    async function fetchDollarQuote() {
        try {
            const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL' );
            if (!response.ok) throw new Error('Falha na rede');
            const data = await response.json();
            const bid = parseFloat(data.USDBRL.bid).toFixed(2);
            dollarQuoteSpan.textContent = `R$ ${bid}`;
        } catch (error) {
            console.error("Erro ao buscar cotação do dólar:", error);
            dollarQuoteSpan.textContent = 'N/A';
        }
    }

    // --- API: LocalStorage ---
    function getAppointmentsFromStorage() {
        return JSON.parse(localStorage.getItem(APPOINTMENTS_STORAGE_KEY)) || [];
    }

    function saveAppointmentsToStorage(appointments) {
        localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
    }

    // --- Lógica da Aplicação ---
    function renderAppointments() {
        // Limpa as listas antes de renderizar
        morningList.innerHTML = '';
        afternoonList.innerHTML = '';
        nightList.innerHTML = '';

        const appointments = getAppointmentsFromStorage();
        
        appointments.forEach(app => {
            const card = createAppointmentCard(app);
            addCardToList(card, new Date(app.dateTime));
        });

        filterAppointments();
    }

    function createAppointmentCard(appointment) {
        const { id, petName, ownerName, service, dateTime } = appointment;
        const card = document.createElement('li');
        card.className = 'appointment-card';
        card.dataset.id = id;
        card.dataset.date = new Date(dateTime).toISOString().split('T')[0];

        const time = new Date(dateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        card.innerHTML = `
            <div class="details">
                <p class="time">${time}</p>
                <p><strong>Pet:</strong> ${petName}</p>
                <p><strong>Tutor:</strong> ${ownerName}</p>
                <p><strong>Serviço:</strong> ${service}</p>
            </div>
            <button class="delete-btn" title="Excluir agendamento">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
            </button>
        `;

        card.querySelector('.delete-btn' ).addEventListener('click', () => {
            deleteAppointment(id);
        });

        return card;
    }

    function addCardToList(card, dateTime) {
        const hour = dateTime.getHours();
        if (hour < MORNING_END) morningList.appendChild(card);
        else if (hour < AFTERNOON_END) afternoonList.appendChild(card);
        else nightList.appendChild(card);
    }

    function addAppointment(event) {
        event.preventDefault();
        const newAppointment = {
            id: Date.now(), // ID único baseado no timestamp
            petName: form['pet-name'].value,
            ownerName: form['owner-name'].value,
            service: form['service'].value,
            dateTime: form['appointment-time'].value,
        };

        const appointments = getAppointmentsFromStorage();
        appointments.push(newAppointment);
        saveAppointmentsToStorage(appointments);
        
        renderAppointments();
        form.reset();
    }

    function deleteAppointment(id) {
        let appointments = getAppointmentsFromStorage();
        appointments = appointments.filter(app => app.id !== id);
        saveAppointmentsToStorage(appointments);
        renderAppointments();
    }

    function filterAppointments() {
        const filterDate = filterDateInput.value;
        document.querySelectorAll('.appointment-card').forEach(card => {
            card.classList.toggle('hidden', filterDate && card.dataset.date !== filterDate);
        });
        updateNoAppointmentsMessage();
    }

    function updateNoAppointmentsMessage() {
        const visibleCards = document.querySelectorAll('.appointment-card:not(.hidden)');
        noAppointmentsMessage.classList.toggle('hidden', visibleCards.length > 0);
    }

    // --- Inicialização ---
    form.addEventListener('submit', addAppointment);
    filterDateInput.addEventListener('change', filterAppointments);
    
    fetchDollarQuote();
    renderAppointments();
});
