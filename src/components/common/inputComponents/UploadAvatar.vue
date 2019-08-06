<template>
  <div>
    <a class="btn" @click="toggleShow">上傳圖片</a>
    <AvatarCropper
      field="avatar"
      langType="zh-tw"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      v-model="show"
      :withCredentials="true"
      :noSquare="true"
      :width="300"
      :height="300"
      :headers="getHeaders()"
      url="http://35.221.163.65:3000/api/upload/avatar"
    ></AvatarCropper>
  </div>
</template>

<script>
import AvatarCropper from "vue-image-crop-upload";
export default {
  components: {
    AvatarCropper
  },
  data() {
    return {
      msg: "",
      show: false,
      imgDataUrl: "" // the datebase64 url of created image
    };
  },
  methods: {
    getHeaders() {
      let token = this.getCookie("session");
      let header = {
        "x-access-token": token
      };
      return header;
    },
    toggleShow() {
      this.show = !this.show;
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
      cropSuccess(imgDataUrl, field) {
      console.log(imgDataUrl , field)
      this.$bus.$emit('isLoading:push',true)
      console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
      setTimeout(() => {
      this.$bus.$emit('isLoading:push',false)
      this.$router.go("/user");
      }, 2000)


      
    },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
      this.imgDataUrl  = jsonData.msg.filePath;
      // console.log("path: " + path);
      this.$store.commit("updateAvatar", this.imgDataUrl);
      console.log(this.$store.state.userInfo.avatarPath)
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
    }
  },
  watch: {
    imgDataUrl: function() {
      this.$emit("updateAvatar", this.imgDataUrl);
    }
  }
};
</script>