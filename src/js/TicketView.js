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
    li.setAttribute('data-id', this.ticket.id);
    li.innerHTML = this.markup;
    const checkbox = li.querySelector('.item_checkbox');
    checkbox.checked = this.ticket.status;
    this.list.prepend(li);
  }

  // eslint-disable-next-line class-methods-use-this
  getDate(created) {
    const date = new Date(created);
    const day = date.getDate().toString().padStart(2, '0');
    const mount = date.getMonth().toString().padStart(2, '0');
    const year = date.getFullYear() - 2000;
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}.${mount}.${year} ${hours}:${minutes}`;
  }

  get markup() {
    return `
        <input class="item_checkbox" type="checkbox">
        <div class="item_info">
        <h2 class="item_name">${this.ticket.name}</h2>
        <p class="item_description vissualy_hidden"></p>
        </div>
        <span class="item_date">${this.getDate(this.ticket.created)}</span>
        <button type="button" class="item_update">✎</button>
        <button type="button" class="item_delete">x</button> 
    `;
  }
}
