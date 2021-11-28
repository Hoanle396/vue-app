<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <!-- Blog entries-->
      <div  class="col-lg-8">
        <!-- Featured blog post-->
        <div class="card mb-4">
          <a href="#!"
            ><img
              class="card-img-top"
              :src="newss.image"
              alt="..."
          /></a>
          <div class="card-body">
            <div class="small text-muted">{{newss.created_at}}</div>
            <h2 class="card-title">{{newss.title}}</h2>
              <router-link class="btn btn-outline-dark mt-auto" :to="/news/+newss.id">Xem chi tiết</router-link>
          </div>
        </div>
        <!-- Nested row for non-featured blog posts-->
        <div class="row">
          <div  v-for="item in news.data"
          :key="item.id" class="col-lg-6">
            <!-- Blog post-->
            <div class="card mb-4">
              <a href="#!"
                ><img
                  class="card-img-top"
                  :src="item.image"
                  alt="..."
              /></a>
              <div class="card-body">
                <div class="small text-muted">{{ item.created_at }}</div>
                <h2 class="card-title h4">{{item.title}}</h2>
                <router-link class="btn btn-outline-dark mt-auto" :to="/news/+item.id">Xem chi tiết</router-link>
              </div>
            </div>
          </div>
        </div>
        <!-- Pagination-->
        <Pagination
          align="center"
          :data="news"
          @pagination-change-page="loaddata"
        ></Pagination>
      </div>
      <!-- Side widgets-->
      <div class="col-lg-4">
        <!-- Search widget-->
        <div class="card mb-4">
          <div class="card-header">Search</div>
          <div class="card-body">
            <div class="input-group">
              <input
                class="form-control"
                type="text"
                placeholder="Enter search term..."
                aria-label="Enter search term..."
                aria-describedby="button-search"
              />
              <button class="btn btn-primary" id="button-search" type="button">
                Go!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from "laravel-vue-pagination";
import BaseRequest from "../core/BaseRequest";
export default {
  data() {
    return {
      newss: [],
      news: [],
    };
  },
  mounted() {
    this.loaddata();
  },
  components: {
    Pagination,
  },
  methods: {
    loaddata : function(page=1) {
      BaseRequest.get("news?page=" + page)
      .then((response) => {
        this.newss = response.data.new;
        this.news = response.data.news;
        
      })
      .catch((error) =>{
          console.error(error);
      })
    },
  },
};
</script>
<style>
.page-link {
  height :40px;
  width :40px;
}
</style>