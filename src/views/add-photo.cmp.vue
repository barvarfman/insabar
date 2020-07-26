<template>
  <section>
    <!-- <div class="vidoe-container">
            <my-video :sources="video.sources" :options="video.options"></my-video>
        </div> -->
    <main-header v-if="user" :user="user" />
    <section class="section-add-photo flex justify-center align-center">
      <main class="main-add-photo">
        <div class="add-photo-input-container flex">
          <input
            v-model="descreption"
            class="input-add-photo"
            type="text"
            placeholder="Write a caption here:"
          />
          <img
            @click="submitPost"
            class="upload-btn icons-size"
            src="../assets/styles/icons/add.svg"
            alt
          />
        </div>
        <img class="main-photo-upload" :src="img" alt @click="$refs.file.click()" />
        <input type="file" @change="onUploadImg" ref="file" style="display: none" />
      </main>
    </section>
    <main-footer v-if="user" :user="user" />
    <!--FOOTER FOR MOBILE -->
  </section>
</template>


<script>
// import myVideo from "vue-video";
import { uploadImg } from "../services/imgUpload.service.js";
import { makeId } from "../services/imgUpload.service.js";
import mainHeader from "../components/main-header.cmp.vue";
import mainFooter from "../components/main-footer.cmp.vue";
export default {
  name: "add-photo-app",
  data() {
    return {
      img:
        "https://www.cowgirlcontractcleaning.com/wp-content/uploads/sites/360/2018/05/placeholder-img.jpg",
      userToEdit: null,
      descreption: "",
      video: {
        sources: [
          {
            src: "https://www.youtube.com/watch?v=XY9-QvL-__g",
            type: "video/mp4"
          }
        ],
        options: {
          autoplay: true,
          volume: 0.6,
          poster: "http://covteam.u.qiniudn.com/poster.png"
        }
      },
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    onUploadImg(ev) {
      this.img = "https://i.ya-webdesign.com/images/loading-animated-png-8.gif";
      uploadImg(ev).then(res => (this.img = res.url));
    },
    submitPost() {
      if (
        this.img !==
        "https://www.cowgirlcontractcleaning.com/wp-content/uploads/sites/360/2018/05/placeholder-img.jpg"
      ) {
        this.userToEdit = JSON.parse(JSON.stringify(this.user));
        this.userToEdit.posts.unshift({
          _id: makeId(),
          userName: this.userToEdit.userName,
          userUrl: this.img,
          createdAt: Date.now(),
          likeBy: [],
          descreption: this.descreption,
          comments: [],
          isLiked: false
        });
        this.$store.dispatch({
          type: "saveUser",
          user: this.userToEdit
        });
        this.$router.push("/home");
      }
    }
  },
  created() {
    this.$store.dispatch({ type: "loadUser", userId: 12345 });
  },

  components: {
    mainHeader,
    mainFooter,
    // myVideo
   
  }
};
</script>