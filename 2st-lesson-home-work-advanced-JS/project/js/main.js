class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();//рекомендация, чтобы метод был вызван в текущем классе
        this.render();//вывод товаров на страницу
        /* this.sumGoods = 0 */;//стоимость всех товаров
        this.getSumGoods();
    }

    getSumGoods() {
        /* for (let i = 0; i < this.goods.length; i++) {
            this.sumGoods += this.goods[i].price;
        } */

        /* let sumGoods = 0;
        this.goods.forEach(good => {
            sumGoods += good.price;
        })
        alert(`Общая сумма товаров: ${sumGoods}`) */

        let sumGoods = this.goods.reduce((s, item) => s + item.price, 0);
        alert(`Общая сумма товаров: ${sumGoods}`)
    }

    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 3000, img: './img/notebook.jpg' },
            { id: 2, title: 'Mouse', price: 20, img: './img/mouse.jpg' },
            { id: 3, title: 'Keyboard', price: 200, img: './img/keyboard.jpg' },
            { id: 4, title: 'Gamepad', price: 50, img: './img/gamepad.jpg' },
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
            //              block.innerHTML += item.render();
        }
    }
}

class ProductItem {
    constructor(product) {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = product.img;
    }
    render() {
        return `<div class="product-item">
            <div class = "product-item-img-wrp">
            <img class = "product-item-img" src="${this.img}" alt="product">
            </div>                
            <h3 class = "product-item-title">${this.title}</h3>
            <p class = "product-item-price">${this.price}</p>
            <button class="buy-btn">Купить</button>
            </div>`
    }
}

class Cart {
    addGood() { }
    removeGood() { }
    changeGood() { }
    render() { }
}

class CartGood {
    render() { }
}

let list = new ProductList();


/* const products = [
    { id: 1, title: 'Notebook', price: 2000, source: './img/notebook.jpg' },
    { id: 2, title: 'Mouse', price: 20, source: './img/mouse.jpg' },
    { id: 3, title: 'Keyboard', price: 200, source: './img/keyboard.jpg' },
    { id: 4, title: 'Gamepad', price: 50, source: './img/gamepad.jpg' },
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (item) => {
    return `<div class="product-item">
                <div class = "product-item-img-wrp">
                    <img class = "product-item-img" src="${item.source}" alt="product">
                </div>
                <h3 class = "product-item-title">${item.title}</h3>
                <p class = "product-item-price">${item.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item =>
        renderProduct(item));
    console.log(productsList);
    При присваивании массиву свойство .innerHTML, у него автоматически
    вызывается метод .toString, который эквивалентен вызову метода .join(',').
    Таким образом, если разделители не нужны, необходимо вызвать .join явно, 
    передав ему в качества параметра пустую строку: 
    document.querySelector('.products').innerHTML = productsList.join('');
};

renderPage(products); 
*/