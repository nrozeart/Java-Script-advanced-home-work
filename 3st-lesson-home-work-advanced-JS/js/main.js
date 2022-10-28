const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = data;
                //                 console.log(data);
                this.render()
            });
        this.goodsBasket = {};//объект содержимого корзины из JSON документа
        this._getBasketProducts()
            .then(data => { //data - объект js
                this.goodsBasket = data.contents;
                // console.log(data);
                this.showBasket()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }
    _getBasketProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            //            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
    showBasket() {
        const block = document.querySelector(".basket");
        for (let product of this.goodsBasket) {
            const basketObj = new BasketItem(product);
            //            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', basketObj.render());
        }
    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

class BasketItem extends ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150', quantity) {
        super(product, img = 'https://via.placeholder.com/200x150');
        this.quantity = product.quantity;
    }
    render() {
        return `<div class="basket-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <div class="basket-item-header">
                        <h3>${this.title}</h3>
                        <p class = "basket-item-price">${this.price} $</p>
                    </div>
                    <div class="basket-item-header">
                        <p>Quantity: ${this.quantity}</p>
                        <button class="delete-btn">Удалить</button>
                    </div>
                </div>
            </div>`
    }
}

let list = new ProductsList();

