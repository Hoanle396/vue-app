<template>
  <div>
   
  <nav class="navbar navbar-expand-lg navbar-light " id="mainNav">
     <div class="container">
        <router-link class="nav-link js-scroll-trigger" to="/">
          <img
            src="../../assets/logo.png"
            width="50"
            alt="LOGO"
        /></router-link>
        <button
          class="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i class="fas fa-bars ml-1"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav text-uppercase">
            <li class="nav-item">
              <router-link class="nav-link js-scroll-trigger" to="/"
                ><i class="fas fa-home mr-2"></i> Trang Chủ</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link js-scroll-trigger" to="/Product"
                ><i class="fas fa-store mr-2"></i> Sản Phẩm</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link js-scroll-trigger" to="/Tuvan"
                ><i class="fas fa-user-md mr-2"></i> Tư Vấn</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link js-scroll-trigger" to="/News"
                ><i class="fas fa-newspaper mr-2"></i> Tin Tức</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link js-scroll-trigger" to="/Feedback"
                ><i class="fas fa-phone mr-2"></i> Liện Hệ</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link js-scroll-trigger" to="/Profile"
                ><i class="fas fa-user mr-2"></i> Tài Khoản</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
</script>
<style >
#mainNav {
  background: linear-gradient(133deg,#eeedf7,#7b83f7,#3105f7)!important;
}
.navbar-nav{
  /* margin-left: 30% !important; */
  float: right;
  margin-left:auto;
}
</style>
