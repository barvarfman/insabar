<template>
  <!-- //////////////////////////FOOTER FOR MOBILE -->
  <footer class="main-footer flex align-center justify-center" v-if="user">
    <nav class="footer-nav-bar flex space-between align-center justify-center">
      <img @click="toHomePage" class="main-nav-bar-btn" src="../assets/styles/icons/home.svg" alt />
      <img @click="transferToAddPhoto" class="main-nav-bar-btn" src="../assets/styles/icons/addPhoto.svg" alt />
      <img class="main-nav-bar-btn" src="../assets/styles/icons/heart.svg" alt />
      <img class="main-nav-bar-btn" src="../assets/styles/icons/search.svg" alt />
      <img
        @click="toProfilePage"
        class="main-nav-bar-btn-profile-img-footer"
        :src="user.userProfilePic"
        alt
      />
    </nav>
  </footer>
</template>


<script>
export default {
  name: "main-footer",
  props: ["user"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    toProfilePage() {
      this.$router.push("/prfile-page");
    },
    toHomePage() {
      this.$router.push("/home");
    },
     transferToAddPhoto() {
      this.$router.push("/add-photo");
    }
  },

  created() {},

  components: {}
};
</script>












