const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = Vue.createApp({
    data() {
        return {
            catalogUrl: `/catalogData.json`,
            cartUrl: `/getBasket.json`,
            products: [],
            imgCatalog: 'https://placehold.it/200x150',
            userSearch: '',
            cart: [],
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
            console.log(productFind);
            if (productFind) {
                productFind.quantity++;
                //this.showCart(productFind)
            }
        },

        showCart(){
            console.log("ok");
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
