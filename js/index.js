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
            this.cart.push(product);
            console.log(productCart);

        }
    },
    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            })

        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for(let el of data.contents){
                    this.products.push(el);
                }
            })
    }
})

const vm = app.mount('#app')
