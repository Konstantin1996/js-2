/**
 * @file Coffee shop
 * @author Konstantin
 */

/**
*
* Class which objects desrcibe specific class
*
* @this {Order} 
* @constructor
*/
function Order() {
    // Here we store Hamburger, Salad, Drink
    this.foodArray = [];
}

/**
 * Add into foodArray class instance Food.
 *
 * @this {Order}
 * @param  {food} - Экземпляр класса Food
 * @return {Array} - Обновленный массив foodArray
 * 
 */
Order.prototype.addToOrder = function(food) {
    if(!Object.isFrozen(this)) {
        this.foodArray.push(food);
    } else {
        console.log('Your order is finished! You can\'t add food!');
    }
    return this.foodArray;
}

/**
 * Delete last added dish
 * 
 * @this {Order}
 * @return {Food} - Deleted object
 * 
 */
Order.prototype.deleteLastFromOrder = function() {
    return this.foodArray.pop();
}

/**
 * Delete first added dish
 * 
 * @return {Food} - Deleted object
 * 
 */
Order.prototype.deleteFirstFromOrder = function() {
    return this.foodArray.shift();
}

/**
 *
 * End the order. Make an object unchangable and displays total amount and callories.
 * 
 * @this {Order}
 * 
 */
Order.prototype.finishOrder = function() {

    this.resultOrderPrice = 0;
    this.resultOrderCalories = 0;
    for(var i = 0; i < this.foodArray.length; i++) {
        this.resultOrderPrice += this.foodArray[i].price;
        this.resultOrderCalories += this.foodArray[i].calories;
    }

    Object.freeze(this);
    console.log('-------------------')
    console.log('Order information:');
    console.log('Price: ' + this.resultOrderPrice + ' tugrickes');
    console.log('Calories: ' + this.resultOrderCalories);
    console.log('-------------------');

}

/**
* 
* Class which discribes types of food
* 
* @param size Size, if exist
* @param stuffing Toppings, if exist
* @param type Type, if exist
* @param weight Weight, if exist
* @this {Hamburger,Drink,Salad} 
* @constructor
*/
function Food(size, stuffing, type, weight) {

    if(size !== undefined){
        this.size = size;
    }
    if(type !== undefined) {
        this.type = type;
    }
    if(stuffing !== undefined) {
        this.stuffing = stuffing;
    }

    if(weight !== undefined) {
        this.weight = weight;
    }

    //  Price and calories of the objects Hamburger, Salad, Drink
    this.price = this.calculatePriceAndCalories.call(this, this.size, this.stuffing, this.type, this.weight)[0];
    this.calories = this.calculatePriceAndCalories.call(this, this.size, this.stuffing, this.type, this.weight)[1];    
}

/**
* Find out the price of Hamburger/Salad/Drink
* 
* @this {Hamburger,Drink,Salad} 
* @return {Array[price,calories]}  The first argument is the price of a specific product, the second is calories.
*/
Food.prototype.calculatePriceAndCalories = function() {
    this.price = 0;
    this.calories = 0;
    // Check what this is and, depending on the arguments, consider the price
    if (this instanceof Hamburger) {
        switch(this.size) {
            case(Hamburger.SIZE_LARGE): {
                this.price += 100;
                this.calories += 40;
                break;
            }
            case(Hamburger.SIZE_SMALL): {
                this.price += 50;
                this.calories += 20;
                break;
            }
        }

        switch(this.stuffing) {
            case(Hamburger.STUFFING_CHEESE): {
                this.price += 10;
                this.calories += 20;
                break;
            }
            case(Hamburger.STUFFING_SALAD): {
                this.price += 20;
                this.calories += 5;
                break;
            }
            case(Hamburger.STUFFING_POTATO): {
                this.price += 15;
                this.calories += 10;
                break;
            }
        }


    }

    if (this instanceof Salad) {
        switch(this.type) {
            case(Salad.TYPE_RUSSIAN): {
                this.price += (this.weight * 100)/100;
                this.calories += (this.weight * 20)/100;
            }
            case(Salad.TYPE_CAESAR): {
                this.price += (this.weight * 50)/100;
                this.calories += (this.weight * 80)/100;
            }
        }
    }

    if (this instanceof Drink) {
        switch(this.type) {
            case(Drink.TYPE_COLA): {
                this.price += 50;
                this.calories += 40;
                break;
            }
            case(Drink.TYPE_COFFEE): {
                this.price += 80;
                this.calories += 20;
                break;
            }
        }
    }

    return [this.price,this.calories]; 
}



/**
* Class describing Hamburger.
* 
* @param size Size
* @param stuffing Stuff
* @this {Hamburger} 
* @constructor
*/
function Hamburger(size, stuffing) {
    Food.call(this, size, stuffing);
}
/* Inherit Hamburger from Food Class */
Hamburger.prototype = Object.create(Food.prototype);
Hamburger.prototype.constructor = Hamburger;

/**
* Find out the size of the Hamburger
* 
* @this {Hamburger} 
* @return {Number} size - Size of the Hamburger
*/
Hamburger.prototype.getSize = function() {
    return this.size;
}

/**
* Find out the Hamburger stuffing
* 
* @this {Hamburger} 
* @return {Number} stuffing - Hamburger Toppings
*/
Hamburger.prototype.getStuffing = function() {
    return this.stuffing;
}

/* Sizes, types of fillings and additives */
Hamburger.SIZE_SMALL = 'small';
Hamburger.SIZE_LARGE = 'large';
Hamburger.STUFFING_CHEESE = 'cheese';
Hamburger.STUFFING_SALAD = 'salad';
Hamburger.STUFFING_POTATO = 'potato';

/**
* Class describes Salad.
* 
* @param type Type of the Salad
* @param weight Weight of the Salad
* @this {Salad} 
* @constructor
*/
function Salad(type, weight) {
    Food.call(this, size = undefined, stuffing = undefined, type, weight);
}

/* Inherit Salad from Food Class*/
Salad.prototype = Object.create(Food.prototype);
Salad.prototype.constructor = Salad;

/**
* Find out the type of the Salad
* 
* @this {Salad} 
* @return {Number} type - Salad type
*/
Salad.prototype.getType = function() {
    return this.type;
}

/**
* Find out weight of the Salad
* 
* @this {Salad} 
* @return {Number} weight - Salad weight
*/
Salad.prototype.getWeight = function() {
    return this.weight;
}
/* Types of salads and weight */
Salad.TYPE_RUSSIAN = 'russian';
Salad.TYPE_CAESAR = 'caesar';
Salad.WEIGHT = 170;

/**
* Class describing the drink.
* 
* @param type Salad type
* @this {Drink} 
* @constructor
*/
function Drink(type) {
    Food.call(this, size = undefined, stuffing = undefined, type);
}

/* Inherited from Food Class */ 
Drink.prototype = Object.create(Food.prototype);
Drink.prototype.constructor = Drink;

/**
* Find out type of the Drink
* 
* @this {Drink} 
* @return {Number} type - Salad type
*/
Drink.prototype.getType = function() {
    return this.type;
}

/* Types of the drinks */
Drink.TYPE_COLA = 'cola';
Drink.TYPE_COFFEE = 'coffee';

// Create a hamburger, salad, drink
var h1 = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_CHEESE);
var s1 = new Salad(Salad.TYPE_CAESAR,Salad.WEIGHT);
var d1 = new Drink(Drink.TYPE_COFFEE);

// Create an order and add food to it
var o1 = new Order();
o1.addToOrder(h1);
o1.addToOrder(s1);
o1.addToOrder(d1);
// We finish the order, we cannot change it anymore
o1.finishOrder();

// Another order
var o2 = new Order();
o2.addToOrder(d1);
o2.addToOrder(h1);
o2.addToOrder(h1);
// Remove the first dish from the order
o2.deleteFirstFromOrder();
o2.addToOrder(h1);
o2.finishOrder();
// We are trying to add food after order completion, but food is no longer added.
o2.addToOrder(s1);

