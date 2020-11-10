export class Card {
    constructor({ id,likes, previewURL, isFavourite = false }){
        this.id= id;
        this.likes= likes;
        this.previewURL= previewURL;
        this.isFavourite = isFavourite;
    }
}