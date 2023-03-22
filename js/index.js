const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = Vue.createApp({
    data() {
        return {
            catalogUrl: `/catalogData.json`,
            cartUrl: `/getBasket.json`,
            deleteCartUrl: `/deleteFromBasket.json`,
            products: [],
            imgCatalog: 'https://placehold.it/200x150',
            userSearch: '',
            cart: [],
            isShowCart: false,
        }
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },

        addProduct(product){
            const index = this.products.findIndex((item) => item.id_product === product.id_product);
            let productFind = this.cart.find(product => product.id_product === this.products[index].id_product);
            if (productFind) {
                ++productFind.quantity;
                //this.showCart(productFind)
            } else {
                const cartProduct = JSON.parse(JSON.stringify(product))
                cartProduct.quantity = 1;
                this.cart.push(cartProduct);
            console.log(this.cart);
            }
        },

       showCart(){
            
            this.isShowCart = !this.isShowCart;
        }, 
        
        deleteProduct(product){
            this.getJson(`${API + this.deleteCartUrl}`)
            .then(data => {
                 if(data.result===1){
                    const index = this.products.findIndex((item) => item.id_product === product.id_product);
                    let productFind = this.cart.find(product => product.id_product === this.products[index].id_product);
                    if(productFind.quantity > 1){
                        productFind.quantity--;
                } else {
                    this.cart.splice(this.cart.indexOf(productFind), 1);
                }
            }
        })
        }
    },

    

    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                this.products = [...data];
            })

        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
               this.cart = data.contents;
            })
    }
})

const vm = app.mount('#app')
