<template>
    <div>
        <section class="py-5">
    <div class="container px-4 px-lg-5 my-5">
        <div class="row gx-4 gx-lg-5 align-items-center">
            <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" :src="product.product_image" alt="..." /></div>
            <div class="col-md-6">
                <div class="small mb-1">{{product.product_manufacturer}}</div>
                <h1 class=" fw-bolder text-black">{{product.product_name}}</h1>
                <div class="fs-5 mb-5">
                    <span class="text-primary" >Giá : {{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(product.product_price)}}</span>
                </div>
                <p class="lead" v-html="product.product_description"></p>
                 <span v-show="isadd" class="text-success">Đã thêm Vào Giỏ Hàng</span>
                <div class="d-flex">
                   
                    <button class="btn btn-outline-dark flex-shrink-0" type="button" v-on:click='addcart(product)'>
                        <i class="bi-cart-fill me-1"></i>
                        Thêm vào giỏ
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>

    </div>
</template>
<script>
import BaseRequest from "../core/BaseRequest"
let cart =[] ;
export default {
   
    data(){
        return{
            product: {},
            isadd:false,
        }
    },
    mounted() {
        this.details();
    },
    methods:{
       details:function(){
           BaseRequest.get("product/"+this.$route.params.id)
           .then((response)=>{
               this.product = response.data
                if(this.product.product_id==null){
                   this.$router.push({ name: "404" });
               }
           })
           .catch(function(){
               this.$router.push({ name: "404" });
           })
       },
      addcart(product){
          this.isadd=false;
          let gio= (window.localStorage.getItem('cart'))
          // localStorage.setItem('cart', JSON.stringify(cart))
          if(gio){
          cart= JSON.parse(window.localStorage.getItem('cart'));
           let item = cart.find((i)=> i.product_id == product.product_id)
           if (item) {
            item.quantity++;
           } else {
              cart.push({...product, quantity: 1 })
           }
          localStorage.setItem('cart', JSON.stringify(cart))
          this.isadd=true;
          }
          else{
               cart.push({...product, quantity: 1 })
               localStorage.setItem('cart', JSON.stringify(cart))
               this.isadd=true
          }
      }

    }
}
</script>
<style>

</style>