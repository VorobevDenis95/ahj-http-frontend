/* eslint-disable class-methods-use-this */
/**
 *  Класс для создания формы создания нового тикета
 * */
export default class TicketForm {
  viewForm() {
    const div = document.createElement('div');
    div.classList.add('popup');
    div.innerHTML = TicketForm.markup;
    const root = document.querySelector('#root');
    root.prepend(div);
  }

  viewFormDelete() {
    const div = document.createElement('div');
    div.classList.add('popup');
    div.innerHTML = TicketForm.markupFormDeleteTicket;
    const root = document.querySelector('#root');
    root.prepend(div);
  }

  deleteForm() {
    const popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
  }

  // onSubmit(e) {
  //   e.preventDefault();

  //   this.deleteForm();

  // }

  static get markup() {
    return `
    <form class="popup_container">
      <h2 class="popup_name">Изменить текст</h2>
      <span class="name_input">Краткое описание</span>
      <textarea class="shot_description_input"></textarea>
      <span class="name_input">Подробное описание</span>
      <textarea class="large_description_input"></textarea>
      <div class="popup_btn_container">
        <button type="button" class="popup_btn popup_btn_cancel">Отмена</button>
        <button type="submit" class="popup_btn popup_submit">Ок</button>
      </div>
    </form>
  `;
  }

  static get markupFormDeleteTicket() {
    return `
        <form class="popup_container">
          <h2 class="popup_name">Удалить тикет</h2>
          <p class="text_popup">Вы уверены, что хотите удалить тикет?
          Это действие необратимо</p>
          <div class="popup_btn_container">
            <button type="button" class="popup_btn btn_cancel_delete">Отмена</button>
            <button type="submit" class="popup_btn btn_delete_item">Ок</button>
          </div>
        </form>
    `;
  }
}
