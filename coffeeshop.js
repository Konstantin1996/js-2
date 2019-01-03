/**
 * @file Кафе быстрого питания
 * @author Konstantin
 */

/**
* Класс, объекты которого описывают отдельный заказ. 
* 
* @this {Order} 
* @constructor
*/
function Order() {
    // Здесь храним объекты Hamburger, Salad, Drink
    this.foodArray = [];
}

/**
 * Добавляет в массив foodArray экземпляр класса Food.
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
 * Удаляет последнее добавленное блюдо.
 * 
 * @this {Order}
 * @return {Food} - Удаленный объект
 * 
 */
Order.prototype.deleteLastFromOrder = function() {
    return this.foodArray.pop();
}

/**
 * Удаляет первое добавленное блюдо.
 *
 * @return {Food} - Удаленный объект
 * 
 */
Order.prototype.deleteFirstFromOrder = function() {
    return this.foodArray.shift();
}

/**
 * Завершает заказ, делает объект неизменяемым и выводит в консоль итоговую сумму заказа и каллории.
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
* Класс описывающий категорию еды.
* 
* @param size Размер, если есть
* @param stuffing Добавка, если есть
* @param type Тип, если есть
* @param weight Вес, если есть
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

    // Цена и каллории для объектов классов Hamburger, Salad, Drink
    this.price = this.calculatePriceAndCalories.call(this, this.size, this.stuffing, this.type, this.weight)[0];
    this.calories = this.calculatePriceAndCalories.call(this, this.size, this.stuffing, this.type, this.weight)[1];    
}

/**
* Узнать цену Гамбургера/Салата/Напитка
* 
* @this {Hamburger,Drink,Salad} 
* @return {Array[price,calories]} Первый аргумент - цена конкретного продукта, второй - каллории
*/
Food.prototype.calculatePriceAndCalories = function() {
    this.price = 0;
    this.calories = 0;
    // Проверяем, чем является this и в зависимости от аргументов считаем цену
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
* Класс описывающий Гамбургер.
* 
* @param size Размер
* @param stuffing Добавка
* @this {Hamburger} 
* @constructor
*/
function Hamburger(size, stuffing) {
    Food.call(this, size, stuffing);
}
/* Наследуем Гамбургер от класса Еды */
Hamburger.prototype = Object.create(Food.prototype);
Hamburger.prototype.constructor = Hamburger;

/**
* Узнать размер Гамбургера
* 
* @this {Hamburger} 
* @return {Number} size - Размер Гамбургера
*/
Hamburger.prototype.getSize = function() {
    return this.size;
}

/**
* Узнать начинку Гамбургера
* 
* @this {Hamburger} 
* @return {Number} stuffing - Начинка Гамбургера
*/
Hamburger.prototype.getStuffing = function() {
    return this.stuffing;
}

/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = 'small';
Hamburger.SIZE_LARGE = 'large';
Hamburger.STUFFING_CHEESE = 'cheese';
Hamburger.STUFFING_SALAD = 'salad';
Hamburger.STUFFING_POTATO = 'potato';

/**
* Класс описывающий Салат.
* 
* @param type Тип салата
* @param weight Вес салата
* @this {Salad} 
* @constructor
*/
function Salad(type, weight) {
    Food.call(this, size = undefined, stuffing = undefined, type, weight);
}

/* Наследуем Салат от класса Еды */
Salad.prototype = Object.create(Food.prototype);
Salad.prototype.constructor = Salad;

/**
* Узнать тип Салата
* 
* @this {Salad} 
* @return {Number} type - тип Салата
*/
Salad.prototype.getType = function() {
    return this.type;
}

/**
* Узнать вес Салата
* 
* @this {Salad} 
* @return {Number} weight - вес Салата
*/
Salad.prototype.getWeight = function() {
    return this.weight;
}
/* Типы салатов и вес */
Salad.TYPE_RUSSIAN = 'russian';
Salad.TYPE_CAESAR = 'caesar';
Salad.WEIGHT = 170;

/**
* Класс описывающий Напиток.
* 
* @param type Тип салата
* @this {Drink} 
* @constructor
*/
function Drink(type) {
    Food.call(this, size = undefined, stuffing = undefined, type);
}

/* Наследуемся от класса Еды */ 
Drink.prototype = Object.create(Food.prototype);
Drink.prototype.constructor = Drink;

/**
* Узнать тип Напитка
* 
* @this {Drink} 
* @return {Number} type - тип Салата
*/
Drink.prototype.getType = function() {
    return this.type;
}

/* Типы напитков */
Drink.TYPE_COLA = 'cola';
Drink.TYPE_COFFEE = 'coffee';

// Создаем гамбургер, салат, напиток
var h1 = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_CHEESE);
var s1 = new Salad(Salad.TYPE_CAESAR,Salad.WEIGHT);
var d1 = new Drink(Drink.TYPE_COFFEE);

// Создаем заказ и добавляем в него еду
var o1 = new Order();
o1.addToOrder(h1);
o1.addToOrder(s1);
o1.addToOrder(d1);
// Завершаем заказ, больше изменять его не можем
o1.finishOrder();

// Другой заказ
var o2 = new Order();
o2.addToOrder(d1);
o2.addToOrder(h1);
o2.addToOrder(h1);
// Удаляем первое блюдо с заказа
o2.deleteFirstFromOrder();
o2.addToOrder(h1);
o2.finishOrder();
// Пытаемся добавить еду после завершения заказа, но еда уже не добавляется
o2.addToOrder(s1);

