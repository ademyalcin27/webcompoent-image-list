import './assets/css/main.style.scss';
import Image from './components/Image';
import SelectBox from './components/Select';
import Button from './components/Button';
import Toast from './components/Toast';
import { Card } from './api/model';
import { getLocalStore, setLocalStorage } from './util/helper';


  // App Button Click
  document.querySelector('app-button').addEventListener('click', () => {
    const selectedItem = document.querySelector('app-select-box').getAttribute('option');
    searchMovie(selectedItem);
  })

  async function searchMovie(val) {
    if(!val) return;
    const apiKey = '19005136-36e2a6d68026fd0d0c5120538';
    const request = await fetch(`https://pixabay.com/api/?key=${apiKey}&image_type=photo&pretty=true&category=${val}`);
    const data = await request.json();
    let hits = [];
    const store = getLocalStore('favourites');
    if(store) {
      hits = data.hits.map(hit => {
        const newHit = {...hit};
        const storeData = store.find(item => parseInt(item.id) === hit.id);
        newHit.isFavourite = storeData ? storeData.isFavourite : false;
        return new Card(newHit)
      });
    } else {
      hits = data.hits.map(hit => new Card(hit));
    }
    prepareImages(hits);
  }
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
        addToast(message, status)
      })
    })
  }

  function addToast(message, status) {
    let el = document.createElement("app-toast");
    el.setAttribute("message", message);
    el.setAttribute("status", status);
    document.querySelector("body").append(el);
  }

 
customElements.define('app-image', Image);
customElements.define('app-select-box', SelectBox);
customElements.define('app-button', Button);
customElements.define('app-toast', Toast);


