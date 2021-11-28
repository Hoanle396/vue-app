<template>
 
    <div class="container">
      <div class="row text-center">
        <div class="col-lg-6 offset-lg-3 col-sm-6 offset-sm-3 col-12 p-3 error-main">
          <div class="row">
            <div class="col-lg-8 col-12 col-sm-10 offset-lg-2 offset-sm-1">
              <h1 class="m-0">404</h1>
              <h6>Không Tìm Thấy Trang Bạn Yêu Cầu </h6>
              <p class="text-primary">Vui lòng nhấp vào nút dưới để quay lại</p>
              <p> <router-link to="./" class="btn btn-dark"> Nhấp vào đây </router-link> </p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
        .error-main{
          box-shadow: 0px 10px 10px -10px #5D6572;
        }
        .error-main h1{
          font-weight: bold;
          color: #444444;
          font-size: 100px;
          text-shadow: 2px 4px 5px #6E6E6E;
        }
        .error-main h6{
          color: #42494F;
        }
        .error-main p{
          color: #9897A0;
          font-size: 14px;
        }
</style>