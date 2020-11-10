import Image from './components/Image';
import Toast from './components/Toast';
import { getLocalStore, setLocalStorage } from './util/helper';
import './assets/css/main.style.scss';


function prepareImages(cards) {
    document.querySelector("#cards").innerHTML = "";
    cards.forEach(card => {
      let el = document.createElement("app-image");
      el.setAttribute("poster", card.previewURL);
      el.setAttribute("isLike", card.isFavourite);
      el.setAttribute('likes', card.likes);
      el.setAttribute("card-id", card.id);
  
      document.querySelector("#cards").append(el);
    });
    document.querySelectorAll('app-image').forEach(item => {
      item.addEventListener('favourite', (value) => { 
        setLocalStorage(value.detail, 'favourites');
        const message = value.detail.isFavourite ? 'The photo you like has been saved' : 'The photo deleted from My Favorites';
        const status = value.detail.isFavourite ? 'success' : 'warning';
        addToast(message, status);
        getCards();
      })
    })
}
function addToast(message, status) {
    let el = document.createElement("app-toast");
    el.setAttribute("message", message);
    el.setAttribute("status", status);
    document.querySelector("body").append(el);
}
function getCards() {
    const cards = getLocalStore('favourites');
    prepareImages(cards)
}
getCards();

customElements.define('app-image', Image);
customElements.define('app-toast', Toast);
