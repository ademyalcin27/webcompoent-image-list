export function getLocalStore(name) {
    return localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : null;
}

export function setLocalStorage(card, name) {
    let currentStore = getLocalStore(name);
    if(currentStore) {
       const isNew = currentStore.findIndex(item => item.id === card.id)
      if(card.isFavourite && isNew < 0) {
         currentStore.push(card);
      } 
      if(!card.isFavourite && isNew > -1) {
        currentStore = currentStore.filter(item => item.id !== card.id);
      }
     
    }else {
       currentStore = [card];
   }
   localStorage.setItem(name,JSON.stringify(currentStore))
 }