// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            showCart: false
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            let sum = 0;
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++;
                            for (let i = 0; i < this.cartItems.length; i++) {
                                sum += this.cartItems[i].quantity * this.cartItems[i].price;
                                return (sum);
                            }
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }

            // this.$parent.getJson(`${API}/addToBasket.json`)
            //     .then(data => {
            //         if(data.result === 1){
            //             let find = this.cartItems.find(el => el.id_product === item.id_product);
            //             if(find){
            //                 find.quantity++;
            //             } else {
            //                 const prod = Object.assign({quantity: 1}, item);
            //                 this.cartItems.push(prod)
            //             }
            //         }
            //     })
        },
        remove(item) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        }
    },
    template: `<div>
        <button class="btn-cart" type="button" @click="showCart = !showCart">Cart</button>
        <div class="cart-block" v-show="showCart">
            <p v-show="cartItems.length == 0">Cart is empty</p>
            <cart-item v-for="item of cartItems" :key="item.id_product" :img="item.img" :cart-item="item" :cart-count = "cartCount"
            :cart-summ = "cartSumm" @remove="remove">
            </cart-item>
            <p class="total-cart-price" v-show="!cartItems.length == 0">Total cart products price: $ {{ this.cartItems.reduce((summ, item) => summ + item.quantity*item.price, 0) }} </p>
            </div>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
    <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some img">
                    </div>
                    <div class="right-block">
                        <div class="product-desc">
                            <div class="product-title">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">$ {{ cartItem.price }} each</div>
                        </div>
                        <div class="product-price">Total: <span>$ {{cartItem.quantity*cartItem.price}}</span></div>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
})