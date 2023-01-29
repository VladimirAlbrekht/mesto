export default class Section {
    constructor({renderer}, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;

    }

    addItem(element) {
        this._container.append(element)
    }

    renderCards(items){
        items.forEach(({title, image })  => {
            this._renderer({title: title, image: image});
        })
    }
}
