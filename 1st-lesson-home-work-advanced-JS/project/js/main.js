const products = [
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
    /* При присваивании массиву свойство .innerHTML, у него автоматически
    вызывается метод .toString, который эквивалентен вызову метода .join(',').
    Таким образом, если разделители не нужны, необходимо вызвать .join явно, 
    передав ему в качества параметра пустую строку: */
    document.querySelector('.products').innerHTML = productsList.join('');
};

renderPage(products);