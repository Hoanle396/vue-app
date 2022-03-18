<template>
  <div class="container" >
    <div class="modal-header">
      <h4 class="modal-title">ĐĂNG KÝ</h4>
    </div>
    <div class="modal-body">
      <div class="progressing hidden">
        <i class="fa fa-spinner fa-spin"></i>
      </div>
      <div class="row">
        <div class="col-md-5">
          <h3>Dịch Vụ Tư Vấn Y Tế - Gặp Mặt Chuyên Gia</h3>
        </div>
        <div class="col-md-7 col-offset-5">
          <h5>{{message}}</h5>
          <form @submit.prevent="send()" >
            <div class="form-group row row-eq-height">
              <div class="col-md-12">
                <input
                  type="text"
                  class="form-control col12"
                  placeholder="Họ Và Tên"
                  required="true"
                  v-model="service.fullname"
                />
              </div>
            </div>
            <div class="form-group row ">
              <div class="col-md-6 col6">
                <select name="gender" v-model="service.gender" 
                   class="form-control" >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>
              <div class="col-md-6">
                <input
                  type="date"
                  class="form-control  col6"
                  placeholder="Ngày Sinh"
                  required="true"
                  size="30"
                  v-model="service.birthday"
                />
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-12">
                <select name="nationality" v-model="service.address" class="form-control col12">
                  <option
                    v-for="result in city"
                    :key="result.province_id"
                    :value="result.province_name"
                  >
                    {{ result.province_name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group row ">
              <div class="col-md-6">
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  placeholder="Thư điện tử: default@example.com"
                  required="true"
                  v-model="service.email"
                />
              </div>
              <div class="col-md-6">
                <input
                  type="text"
                  name="mobilePhone"
                  class="form-control"
                  placeholder="Điện Thoại Di Động"
                  required="true"
                  pattern=".{10,}"
                  title="Ten or more numbers"
                  v-model="service.mobilePhone"
                />
              </div>
            </div>
            <div class="form-group row ">
              <div class="col-md-6">
                <input
                  type="text"
                  name="homePhone"
                  class="form-control"
                  placeholder="Điện Thoại Nơi Ở"
                  pattern=".{10,}"
                  title="Ten or more numbers"
                  v-model="service.homePhone"
                />
              </div>
              <div class="col-md-6">
                <input
                  type="text"
                  name="officePhone"
                  class="form-control"
                  placeholder="Điện Thoại Nơi Làm Việc"
                  pattern=".{10,}"
                  title="Ten or more numbers"
                  v-model="service.officePhone"
                />
              </div>
            </div>
            <div class="center-content">
              <input type="submit" class="btn btn-success" value="Gửi" />
            </div>
          </form>
        </div>
      </div>
      <div class="row success-submition">
        <div class="col-md-12">
          <div>
            <p>Mến Gửi ,</p>
            <p>Cảm ơn bạn đã gửi yêu cầu đặt hẹn khám tại chúng tôi</p>
            <p>
              Nhân viên phụ trách đặt hẹn của chúng tôi nhận được yêu cầu từ bạn
              và sẽ gửi email cho bạn để xác nhận cuộc hẹn này
              <strong>trong vòng hai ngày làm việc</strong>.
            </p>
            <p>
              Xin vui lòng hiểu rằng lịch hẹn này có thể thay đổi tùy theo lịch
              làm việc còn trống của bác sĩ.
            </p>
            <p>
              Để biết thêm thông tin chi tiết, xin vui lòng liên hệ Dịch vụ đặt
              hẹn theo số điện thoại
              <span class="text-primary">
                +84 345 648 638 từ 8g00 sáng đến 5g00 chiều từ thứ Hai đến thứ
                Sáu; và 8g00 sáng đến 12g00 ngày thứ Bảy</span
              >.
            </p>
            <p>
              Cảm ơn bạn đã tin tưởng chọn <strong>Chúng Tôi</strong> là nơi
              cung cấp dịch vụ chăm sóc sức khỏe của mình!
            </p>
            <p>Trân trọng,</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const axios = require("axios");
import BaseRequest from "../core/BaseRequest"
import Swal from 'sweetalert2'
export default {
   data() {
    
    return {
      city : [],
      service : {
        fullname :'',
        gender :'Nam',
        birthday :'',
        address :'Thành phố Đà Nẵng',
        email :'',
        mobilePhone :'',
        homePhone :'',
        officePhone :'',
      },
      message : 'Vui lòng điền vào thông tin bên dưới để đăng kí',
    }
  },
  mounted() {
    this.list()
    
  },
  methods: {
    list() {
      axios
        .get("https://vapi.vnappmob.com/api/province/")
        .then(response=>{
          this.city=response.data.results;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    send(){
      BaseRequest.post('service',this.service)
      .then(()=>{
       Swal.fire(
             'Hoàn Thành',
             'Đăng Kí Thành Công',
             'success'
         )
         this.service.fullname = '';
         this.service.gender = 'Nam';
         this.service.birthday = '';
         this.service.address = 'Thành phố Đà Nẵng';
         this.service.email = '';
         this.service.mobilePhone = '';
         this.service.homePhone = '';
         this.service.officePhone = '';
      })
      .catch(()=>{
          Swal.fire(
             'Thất Bại',
             'Đăng kí thất bại',
             'error'
         )
      })
    }
  },
 
};
</script>
<style scoped>
.col12{
  width: 28rem;
}
.form-group{
  margin-top :1rem;
}
.col6{
  width:13.8rem;
}
</style>