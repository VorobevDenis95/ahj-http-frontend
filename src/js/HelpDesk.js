import TicketService from "./TicketService";

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
  }
  
  init() {
    this.container.innerHTML = HelpDesk.markup;
  }

  static get markup() {
    return `
    <form class="form">
    <button class="add_item">Добавить тикет</button>
    <ul class="list">
      <li class="items">
        <input class="item_checkbox" type="checkbox">
        <p class="item_task"></p>
        <span class="item_date"></span>
        <button class="item_update"></button>
        <button class="item_delete"></button>
      </li>
    </ul>
  </form>
  `
  }
}
