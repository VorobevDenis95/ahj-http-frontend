import HelpDesk from './HelpDesk';
import Ticket from './Ticket';
import TicketView from './TicketView';
import createRequest from './api/createRequest';
import { url } from './url';

const root = document.getElementById('root');

const app = new HelpDesk(root);

app.init();

const list = document.querySelector('.list');
const item = document.querySelector('.item_task');




// url

// let response = await fetch(url);
// if (response.ok) {
//   let json = await response.json()
//   console.log(json);
// }

// list
  // createRequest(url.allTickets).then((data) => {
  //   data.forEach(el => {
  //     const elementItem = document.createElement('li');
  //     elementItem.textContent = el.name;
  //     list.prepend(elementItem);
  //   });
  // });

  createRequest(url.allTickets).then((data) => {
    data.forEach(el => {
      app.tickets.push(new TicketView(el));
      app.tickets[app.tickets.length-1].init();
    });
  });

  // app.ticketService.list(createRequest(url.allTickets));


  //identificator

