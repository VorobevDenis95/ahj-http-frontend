/**
 *  Класс для создания формы создания нового тикета
 * */
export default class TicketForm {
  constructor() {
    this.deleteForm = this.deleteForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  viewForm() {
    const div = document.createElement('div');
    div.classList.add('popup');
    div.innerHTML = TicketForm.markup;
    const root = document.querySelector('#root');
    root.prepend(div);

    const cancel = document.querySelector('.popup_btn_cancel');
    cancel.addEventListener('click', this.deleteForm);

    const submit = document.querySelector('.popup_submit');
    submit.addEventListener('click',this.onSubmit);
  }

  deleteForm() {
    const popup = document.querySelector('.popup');
     if (popup) {
      popup.remove()
    }
    return;
  }

  onSubmit(e) {
    e.preventDefault();


    this.deleteForm();

  }
    
  static get markup() {
    return `
    <form class="popup_addTicked">
      <h2 class="addTicked_name">Изменить текст</h2>
      <span class="name_input">Краткое описание</span>
      <textarea class="shot_description_input"></textarea>
      <span class="name_input">Подробное описание</span>
      <textarea class="large_description_input"></textarea>
      <div class="popup_btn_container">
        <button class="popup_btn popup_btn_cancel">Отмена</button>
        <button type="submit" class="popup_btn popup_submit">Ок</button>
      </div>
    </form>
  `
  }

  static get markupFormDeleteTicket() {
    return `
        <form class="popup_addTicked">
        
    `
  }
}
