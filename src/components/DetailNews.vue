<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-8">
        <!-- Post content-->
        <article>
          <!-- Post header-->
          <header class="mb-4">
            <!-- Post title-->
            <h1 class="fw-bolder mb-1">{{news.title}}</h1>
            <!-- Post meta content-->
            <div class="text-muted fst-italic mb-2">
             {{news.created_at}}
            </div>
            <!-- Post categories-->
            
          </header>
          <!-- Preview image figure-->
          <figure class="mb-4">
            <img
              class="img-fluid rounded"
              :src="news.image"
              alt="..."
            />
          </figure>
          <!-- Post content-->
          <section class="mb-5" v-html="news.description">
            
          </section>
        </article>
        <!-- Comments section-->
        
      </div>
      <!-- Side widgets-->
      <div class="col-lg-4">
        
      </div>
    </div>
  </div>
</template>
<script>
import BaseRequest from "../core/BaseRequest"
export default {
     data(){
        return{
            news: {},
        }
    },
    mounted() {
        this.details();
    },
    methods:{
       details:function(){
           BaseRequest.get("news/"+this.$route.params.id)
           .then((response)=>{
               this.news = response.data
                if(this.news.id==null){
                   this.$router.push({ name: "404" });
               }
           })
           .catch(function(){
               this.$router.push({ name: "404" });
           })
       },
    }
}
</script>
<style>

</style>