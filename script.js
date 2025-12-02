fetch('events.json')
  .then(response => response.json())
  .then(data => {
    const calendarBody = document.getElementById('calendar-body');
    const outsideList = document.getElementById('outside-list');

    for (let hour = 8; hour < 20; hour++) {
      const row = document.createElement('tr');
      const timeCell = document.createElement('td');
      timeCell.textContent = `${hour}:00`;
      row.appendChild(timeCell);

      ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].forEach(day => {
        const cell = document.createElement('td');
        const events = data.events[day] || [];
        events.forEach(ev => {
          const startHour = parseInt(ev.start.split(':')[0]);
          if (startHour === hour) {
            const div = document.createElement('div');
            div.className = 'event';
            div.textContent = `${ev.title} (${ev.start}-${ev.end})`;
            cell.appendChild(div);
          }
        });
        row.appendChild(cell);
      });
      calendarBody.appendChild(row);
    }

    data.outside_hours.forEach(ev => {
      const li = document.createElement('li');
      li.textContent = `${ev.title} (${ev.start}-${ev.end})`;
      outsideList.appendChild(li);
    });
  });
