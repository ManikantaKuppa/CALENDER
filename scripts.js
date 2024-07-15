document.addEventListener("DOMContentLoaded",()=>{
    const currentDateElement = document.getElementById('currentDate');
    const currentTimeElement = document.getElementById('currentTime');
    const prevMonthButton = document.getElementById('prevMonth');
    const currentMonthElement = document.getElementById('currentMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const calendarElement = document.getElementById('calendar');

    const selectedDateElement = document.createElement('div'); // Create a new division element
    selectedDateElement.id = 'selectedDate'; // Assign an id to the new division element
    selectedDateElement.style.margin = '10px'; // Add a margin of 10px to the selectedDateElement
    selectedDateElement.style.fontFamily = 'Georgia, cursive'; // Add a font family to the selected
    calendarElement.insertAdjacentElement('afterend', selectedDateElement); // Insert the new division element after the calendarElement


    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    

    function updateDateTime() {
        const now = new Date();
        currentDateElement.innerHTML = `Current Date: ${now.toLocaleDateString()}`;
        currentTimeElement.innerHTML = `Current time: ${now.toLocaleTimeString()}`;
    }
    function generateCalendar(year, month) {
        calendarElement.innerHTML = ''; // Clear previous calendar
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });
        
        currentMonthElement.innerHTML = `${monthName} ${year}`;

        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach((day) => {
            const dayElement = document.createElement('div');
            dayElement.innerHTML = day;
            dayElement.style.fontWeight = 'bold';
            calendarElement.appendChild(dayElement);
        });

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            calendarElement.appendChild(emptyCell);
        }

        // for (let i = 1; i <= daysInMonth; i++) {
        //     const day = document.createElement('div');
        //     day.innerHTML = i;
        //     const today = new Date();
        //     if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        //         day.classList.add('today');
        //     }
        //     calendarElement.appendChild(day);
        // }
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.innerHTML = i;
            day.classList.add('calendar-day'); // Add a class to each day element

         // Add event listener to each day element
         day.addEventListener('click', () => {
            const selectedDate = new Date(year, month, i);
            const selectedDateFormatted = selectedDate.toLocaleDateString('default', { month: 'short', day: '2-digit', year: 'numeric' });
            const selectedDayFormatted = selectedDate.toLocaleString('default', { weekday: 'long' });
            selectedDateElement.innerHTML = `${selectedDateFormatted} ${selectedDayFormatted}`;

            // Highlight the selected date other than today
            const calendarDays = document.querySelectorAll('.calendar-day');
            calendarDays.forEach((calendarDay) => {
                if (calendarDay !== day) {
                    calendarDay.classList.remove('selected');
                }
            });
            day.classList.add('selected');
        });
        
        const today = new Date();
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                day.classList.add('today');
            }
            calendarElement.appendChild(day);
        }
    }

    function changeMonth(offset) {
        currentMonth += offset;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentYear, currentMonth);
    }

    prevMonthButton.addEventListener('click', () => changeMonth(-1));
    nextMonthButton.addEventListener('click', () => changeMonth(1));

    updateDateTime();
    setInterval(updateDateTime, 1000);
    generateCalendar(currentYear, currentMonth);
    


});