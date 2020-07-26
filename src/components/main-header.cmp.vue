<template>
  <header class="main-header flex justify-center">
    <div class="main-header-content flex space-between align-center">
      <div class="header-logo">Instabar</div>
      <!-- <div class="top-search" style="border:1px solid lightgray;backgruond-color:lightgray">
      <font-awesome-icon class="main-nav-bar-btn" icon="search" size="xs"/>-->
      <input class="input-filter-serch" type="text" placeholder="Search" />
      <!-- </div> -->
      <nav class="header-nav-bar">
        <img
          @click="transferToHomePage"
          class="main-nav-bar-btn"
          src="../assets/styles/icons/home.svg"
          alt
        />
        <img class="main-nav-bar-btn" src="../assets/styles/icons/send.svg" alt />
        <img class="main-nav-bar-btn" src="../assets/styles/icons/compass.svg" alt />
        <img class="main-nav-bar-btn" src="../assets/styles/icons/heart.svg" alt />
        <img
          class="main-nav-bar-btn-profile-img"
          @click="transferToProfile"
          :src="user.userProfilePic"
          alt
        />
      </nav>
    </div>
    <img class="send-logo-top icons-size position-fixed" src="../assets/styles/icons/send.svg" alt />
    <img
      class="camera-logo-top icons-size position-fixed"
      src="../assets/styles/icons/camera.svg"
      alt
    />
  </header>
</template>


<script>
export default {
  name: "profile-page",
  props: ["user"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    transferToProfile() {
      this.$router.push("/prfile-page");
    },
    transferToHomePage() {
      this.$router.push("/home");
    }
  },
  created() {},

  components: {}
};
</script>
