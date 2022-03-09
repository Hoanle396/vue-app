<template>
  <section class="py-5">
    <div class="container px-4 px-lg-5 mt-5">
      <div class="row gx-4 gx-lg-5 justify-content-center">
        <div class="row" v-if="form">
          <div class="col-md-8">
            <p class="slider1">
              <span>Lọc giá: </span>
              <output
                name="slider_output1"
                id="slider_output1"
                for="form_slider1"
                >1000000</output
              > VND
              <br />
              <input
                type="range"
                class="form_slider1 slider"
                name="form_slider1"
                id="form_slider1"
                v-model="value"
                min="0"
                step="1000"
                max="1000000"
                oninput="slider_output1.value=form_slider1.value"
                @change="change()"
              />
            </p>
          </div>
          <div class="col-md-4" style="float: right">
            <div class="card mb-4">
              <div class="card-header">Tìm kiếm</div>
              <div class="card-body">
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    v-model="search"
                    @keyup="searchs()"
                    placeholder="Nhập Nội Dung "
                  /><button @click="talk()" class="btn btn-small"><i class="fa fa-microphone " id="tlks" ></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="message" class="text-danger">{{message}}</div>
        <div
          v-for="item in product.data"
          :key="item.product_id"
          class="col-md-3 mb-5"
        >
          <div class="card h-100" data-aos="zoom-in">
            <img class="card-img-top" :src="item.product_image" alt="..." />
            <div class="card-body p-4">
              <div class="text-center">
                <h5 class="fw-bolder">{{ item.product_name }}</h5>
                {{
                  new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.product_price)
                }}
              </div>
            </div>
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div class="text-center">
                <router-link
                  class="btn btn-outline-dark mt-auto"
                  :to="/product/ + item.product_id"
                  >Xem chi tiết</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination v-if="!search&&value==1000000"
        align="center"
        :data="product"
        @pagination-change-page="products"
      ></Pagination>
      <Pagination v-if="value!=1000000&&!search"
        align="center"
        :data="product"
        @pagination-change-page="change"
      ></Pagination>
      <Pagination v-if="search"
        align="center"
        :data="product"
        @pagination-change-page="searchs"
      ></Pagination>
    </div>
  </section>
</template>
<script>
import Pagination from "laravel-vue-pagination";
import BaseRequest from "../core/BaseRequest";
export default {
  data() {
    return {
      product: {},
      message: "",
      search: "",
      form: false,
      value:1000000,
       lang_: "vi-VN",
    };
  },
  mounted() {
    this.products();
  },
  components: {
    Pagination,
  },
  methods: {
    products: function (page = 1) {
      BaseRequest.get("product?page=" + page)
        .then((response) => {
          this.product = response.data;
          if (this.products) {
            this.form = true;
          }
        })
        .catch(() => {
          this.message = "Đã Có Lỗi Ở Đây!";
        });
    },
    searchs: function (page = 1) {
      if (this.search == "") {
        this.products();
      }
      else{
      BaseRequest.get("search/" + this.search + "?page=" + page)
        .then((response) => {
          this.product = response.data;
        })
        .catch(() => {
          this.message = "Đã Có Lỗi Ở Đây!";
        })
      }
    },
    change: function (page=1){
       if (this.value == 1000000) {
        this.products();
      }
       else{
      BaseRequest.get("fillter/"+this.value+"?page="+page)
      .then((response) => {
          this.product = response.data;
        })
        .catch(() => {
          this.message = "Đã Có Lỗi Ở Đây!";
        })
       }
    },
    talk: function (){
    document.getElementById("tlks").style.color="red";
    window.SpeechRecognition =window.SpeechRecognition ||  window.webkitSpeechRecognition;
    const recognition = new window.SpeechRecognition();
    recognition.lang = this.lang_;
    recognition.interimResults = true;
    
    recognition.addEventListener("result", event => {      
      var text = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join("");
      this.search = text.substring(0, text.length-1);
      this.searchs();
    });
    recognition.addEventListener("end", () => {
      recognition.stop();
      document.getElementById("tlks").style.color="black";
    });
     recognition.start();
     
    }
  },
}
</script>
<style>
.redtext{
  color:red;
}
.page-link {
  height: 40px;
  width: 40px;
}
.slider {
  -webkit-appearance: none;
  width: 50%;
  height: 15px;
  border-radius:5px;
  background: linear-gradient(133deg,#eeedf7,#7b83f7,#3105f7);
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%; 
  background: #2502c2;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #04AA6D;
  cursor: pointer;
}
</style>