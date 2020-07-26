<template>
  <section class="main-app">
    <main-header v-if="user" :user="user" />
    <main class="main-containr-post">
      <post-list v-if="user" :user="user" />
    </main>
    <img
      @click="transferToAddPhoto"
      class="add-photo-logo icons-size position-fixed"
      src="../assets/styles/icons/instagram.svg"
      alt
    />
    <main-footer v-if="user" :user="user" />
    <!--FOOTER FOR MOBILE -->
  </section>
</template>


<script>
import postList from "../components/post-list.cmp.vue";
import mainHeader from "../components/main-header.cmp.vue";
import mainFooter from "../components/main-footer.cmp.vue";
import addPhoto from "../views/add-photo.cmp.vue";
export default {
  name: "insta-app",
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    transferToAddPhoto() {
      this.$router.push("/add-photo");
    }
  },
  created() {
    this.$store.dispatch({ type: "loadUser", userId: 12345 });
  },

  components: {
    mainHeader,
    postList,
    addPhoto,
    mainFooter
  }
};
</script>












