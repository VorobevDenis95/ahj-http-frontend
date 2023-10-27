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

    const btnAddTicket = document.querySelector('.add_item');
    btnAddTicket.addEventListener('click', this.onClickAdd);
  }


  static get markup() {
    return `
    <form class="form">
    <button class="add_item">Добавить тикет</button>
    <ul class="list"></ul>
  </form>
  `
  }

  create() {
    createRequest(url.createTicket, )
  }

  onClickAdd(e) {
      e.preventDefault();
      this.ticketForm.viewForm();
  
  }
}
