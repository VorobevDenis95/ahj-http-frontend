/* eslint-disable no-shadow */
import TicketForm from './TicketForm';

import TicketView from './TicketView';
import createRequest from './api/createRequest';
import { url } from './url';

/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;
    this.ticketForm = new TicketForm();
    this.tickets = [];
  }

  init() {
    this.container.innerHTML = HelpDesk.markup;
    this.updateList();

    // слушаем контейнер
    this.container.addEventListener('click', (e) => {
      if (e.target.closest('.add_item')) {
        this.ticketForm.viewForm();
        const cancel = this.container.querySelector('.popup_btn_cancel');
        const submit = this.container.querySelector('.popup_submit');
        // eslint-disable-next-line no-shadow
        submit.addEventListener('click', (e) => {
          e.preventDefault();
          const name = this.container.querySelector('.shot_description_input').value;
          const description = this.container.querySelector('.large_description_input').value;

          if (name) {
            const data = JSON.stringify({ name, description });
            createRequest(url.createTicket, {
              method: 'POST',
              body: data,
            }).then(() => {
              this.container.innerHTML = HelpDesk.markup;
              this.updateList();
            });
            this.ticketForm.deleteForm();
          }
        });

        cancel.addEventListener('click', () => {
          this.ticketForm.deleteForm();
        });
      }

      // удаление тикета
      if (e.target.closest('.item_delete')) {
        const item = e.target.closest('.item');
        const id = item.getAttribute('data-id');
        this.ticketForm.viewFormDelete();
        const form = this.container.querySelector('.popup_container');
        const cancel = this.container.querySelector('.btn_cancel_delete');

        cancel.addEventListener('click', (e) => {
          e.preventDefault();
          this.ticketForm.deleteForm();
        });
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          fetch(`${url.deleteTicket}${id}`).then((response) => {
            if (response.status === 204) {
              this.ticketForm.deleteForm();
              this.container.innerHTML = HelpDesk.markup;
              this.updateList();
            }
          });
        });
      }

      // редактирование тикета
      if (e.target.closest('.item_update')) {
        const item = e.target.closest('.item');
        const itemName = item.querySelector('.item_name').textContent;
        const id = item.getAttribute('data-id');
        this.ticketForm.viewForm();
        const nameItem = this.container.querySelector('.shot_description_input');
        const descriptionItem = this.container.querySelector('.large_description_input');
        nameItem.textContent = itemName;
        createRequest(`${url.searchTicket}${id}`).then((data) => {
          descriptionItem.textContent = data.description;
        });
        const cancel = this.container.querySelector('.popup_btn_cancel');
        cancel.addEventListener('click', () => {
          this.ticketForm.deleteForm();
        });

        const form = this.container.querySelector('.popup_container');
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const data = {
            name: this.container.querySelector('.shot_description_input').value,
            description: this.container.querySelector('.large_description_input').value,
          };
          fetch(`${url.updateTicket}${id}`, {
            method: 'POST',
            body: JSON.stringify(data),
          })
            .then((response) => {
              if (response.status === 200) {
                this.container.innerHTML = HelpDesk.markup;
                this.updateList();
                this.ticketForm.deleteForm();
              }
            })
            .catch((err) => console.error(err));
        });
      }

      // редактирование статуса

      if (e.target.closest('.item_checkbox')) {
        const target = e.target.closest('.item_checkbox');
        const id = target.closest('.item').getAttribute('data-id');
        const data = { status: target.checked };
        fetch(`${url.updateTicket}${id}`, {
          method: 'POST',
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (response.status === 200) {
              this.container.innerHTML = HelpDesk.markup;
              this.updateList();
            }
          })
          .catch((err) => console.error(err));
      }

      // ищем тикет по клику на тикет, а не на кнопки
      if (e.target.closest('.item') && !e.target.closest('.item_update')
      && !e.target.closest('.item_delete') && !e.target.closest('.item_checkbox')) {
        const item = e.target.closest('.item');
        const id = item.getAttribute('data-id');
        const description = item.querySelector('.item_description');
        createRequest(`${url.searchTicket}${id}`).then((data) => {
          description.classList.toggle('vissualy_hidden');
          description.textContent = data.description;
        });
      }
    });
  }

  updateList() {
    createRequest(url.allTickets).then((data) => {
      this.tickets = [];
      data.forEach((el) => {
        this.tickets.push(new TicketView(el));
        this.tickets[this.tickets.length - 1].init();
      });
    });
  }

  clearList() {
    this.tickets = [];
  }

  static get markup() {
    return `
    <div class="container">
    <button class="add_item">Добавить тикет</button>
    <ul class="list"></ul>
  </div>
  `;
  }
}
