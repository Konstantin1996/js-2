function Hamburger(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;
}

Hamburger.SIZE_SMALL = 'small';
Hamburger.SIZE_LARGE = 'large';
Hamburger.STUFFING_CHEESE = 'cheese';
Hamburger.STUFFING_SALAD = 'salad';
Hamburger.STUFFING_POTATO = 'potato';

Hamburger.prototype.getSize = function() {
    return this.size;
}

var hamb = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_CHEESE);

console.log(hamb);
