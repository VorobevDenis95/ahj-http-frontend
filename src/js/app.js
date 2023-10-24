import HelpDesk from './HelpDesk';
import createRequest from './api/createRequest';
import { getList } from './utils';

const root = document.getElementById('root');

const app = new HelpDesk(root);

app.init();

const list = document.querySelector('.list');
const item = document.querySelector('.item_task');


const url = 'http://localhost:3000/?method=allTickets';

// url

// let response = await fetch(url);
// if (response.ok) {
//   let json = await response.json()
//   console.log(json);
// }


  createRequest(url).then((data) => {
    data.forEach(el => {
      const elementItem = document.createElement('li');
      elementItem.textContent = el.name;
      list.prepend(elementItem);
    });
  });
  // app.ticketService.list(getList());


// createRequest(url).then((data) => {
//   console.log(data);
// })

