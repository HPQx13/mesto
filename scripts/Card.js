export default class Card {
  constructor(cardTempalteEl, name, url, openFullScreen) {
      this.cardEl = cardTempalteEl.content.cloneNode(true);
      this.cardName = name;
      this.cardUrl = url;
      this.openFullScreen = openFullScreen;

      this.cardPic = this.cardEl.querySelector('.card__picture');
      this.cardTitle = this.cardEl.querySelector('.card__block-title');
      this.trashButton = this.cardEl.querySelector('.card__trash-button');
      this.likeButton = this.cardEl.querySelector('.card__block-button');

      this.cardPic.setAttribute("src", this.cardUrl);
      this.cardPic.setAttribute("alt", this.cardName);

      this.cardTitle.textContent = this.cardName;

      this._addListeners();
  }

  _addListeners() {
      this.cardPic.addEventListener('click', () => this.openFullScreen(this.cardName, this.cardUrl));
      this.trashButton.addEventListener('click', this._removeCard);
      this.likeButton.addEventListener('click', this._clickLike);
  }

  _removeCard(evt) {
      evt.target.closest('.card').remove();
  }

  _clickLike(evt) {
      evt.target.classList.toggle('card__block-button_active');
  }

  getCard() {
      return this.cardEl
  }
}