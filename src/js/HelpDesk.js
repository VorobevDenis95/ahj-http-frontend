import TicketForm from "./TicketForm";
import TicketService from "./TicketService";
import TicketView from "./TicketView";
import createRequest from "./api/createRequest";
import { url } from "./url";

/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("This is not HTML element!");
    }
    this.container = container;
    this.ticketService = new TicketService();
    this.ticketForm = new TicketForm();
    this.tickets = [];

    this.onClickAdd = this.onClickAdd.bind(this);
  }
  
  init() {
    this.container.innerHTML = HelpDesk.markup;
    this.updateList();
    const btnAddTicket = document.querySelector('.add_item');
    btnAddTicket.addEventListener('click', this.onClickAdd);
  }

  updateList() {
    createRequest(url.allTickets).then((data) => {
      data.forEach(el => {
        this.tickets.push(new TicketView(el));
        this.tickets[this.tickets.length-1].init();
      });
    });
  }


  static get markup() {
    return `
    <form class="form">
    <button class="add_item">Добавить тикет</button>
    <ul class="list"></ul>
  </form>
  `
  }


  onClickAdd(e) {
      e.preventDefault();
      this.ticketForm.viewForm();
      const submit = this.container.querySelector('.popup_btn')

  
  }
}
