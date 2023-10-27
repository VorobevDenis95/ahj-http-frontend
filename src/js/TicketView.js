import Ticket from './Ticket';

/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {
  constructor(id, name, description, status, created) {
    this.ticket = new Ticket(id, name, description, status, created);
    this.list = document.querySelector('.list');    
  }

  init() {
    const li = document.createElement('li');
    li.classList.add('item');
    li.innerHTML = this.markup;
    this.list.prepend(li);
  }

  getDate(created) {
    const date = new Date(created);
    const day = date.getDate()
    const mount = date.getMonth().toString().padStart(2, '0');;
    const year = date.getFullYear() - 2000;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${day}.${mount}.${year} ${hours}:${minutes}`;
  }

   get markup() {
    return `
        <input class="item_checkbox" type="checkbox">
        <div class="item_info">
        <h2 class="item_name">${this.ticket.name}</h2>
        <p class="item_description">${this.ticket.description}</p>
        </div>
        <span class="item_date">${this.getDate(this.ticket.created)}</span>
        <button class="item_update">✎</button>
        <button class="item_delete">x</button> 
    `
  }
}
