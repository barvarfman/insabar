<template>
  <section class="main-pro-content flex align-center justify-center">
    <main-header v-if="user" :user="user" />
    <main class="second-main-test">
      <header class="profile-header-container flex">
        <div class="img-pro-container flex justify-center">
          <div class="profile-img-header"></div>
          <div class="user-name-for-narrow-layout">Barvarf</div>
        </div>
        <div class="header-main-content-pro-page">
          <div class="user-name-pro-page">Barvarf</div>
          <div class="post-and-foloow-pro-page flex">
            <div class="posts-count-pro-page">
              <span class="helper-for-span">{{user.posts.length}}</span>posts
            </div>
            <div class="followers-count-pro-page">
              <span class="helper-for-span">{{user.followers.length}}</span>followers
            </div>
            <div class="following-count-pro-page">
              <span class="helper-for-span">{{user.following.length}}</span>following
            </div>
          </div>
          <div class="full-name-pro-page">Bar var</div>
        </div>
      </header>
      <nav class="profile-navbar-container flex justify-center">
        <section class="flex space-between" style="width:420px">
          <div class="pro-vav-bar-btn-container flex align-center">
            <img class="main-pro-nav-bar-btn" src="../assets/styles/icons/grid.svg" alt />
            <div class="pro-vav-bar-btn">POSTS</div>
          </div>
          <div class="pro-vav-bar-btn-container flex align-center">
            <img class="main-pro-nav-bar-btn" src="../assets/styles/icons/television.svg" alt />
            <div class="pro-vav-bar-btn">IGTV</div>
          </div>
          <div class="pro-vav-bar-btn-container flex align-center">
            <img class="main-pro-nav-bar-btn" src="../assets/styles/icons/post.svg" alt />
            <div class="pro-vav-bar-btn">SAVED</div>
          </div>
          <div class="pro-vav-bar-btn-container flex align-center">
            <img class="main-pro-nav-bar-btn" src="../assets/styles/icons/price.svg" alt />
            <div class="pro-vav-bar-btn">TAGGED</div>
          </div>
        </section>
      </nav>

      <main class="profile-main-container" v-if="user">
        <div
          @click.stop="openModal"
          @mouseover="setCorrentPost(post)"
          class="thumb1"
          :style="{ 'background-image': 'url(' + post.userUrl+ ')' }"
          v-for="post in user.posts"
          :key="post._id"
        >
          <div class="thumb1-screen flex align-center justify-center" v-if="currentPost">
            <div class="thumb1-screen-container flex space-between">
              <div class="flex space-between align-center justify-center">
                <img class="icons-size-thumb1" src="../assets/styles/icons/redHeart.svg" alt />
                <div class="like-count-thumb1">{{currentPost.likeBy.length}}</div>
              </div>
              <div class="flex space-between align-center justify-center">
                <img class="icons-size-thumb1" src="../assets/styles/icons/blueComment.svg" alt />
                <div class="comment-count-thumb1">{{currentPost.comments.length}}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- ///////////post-modal -->
        <div class="post-modal flex" v-show="toggeleModal">
          <post-modal
            @closeModal="closeModal"
            v-if="user&&currentPost"
            :currentPost="currentPost"
            :user="user"
          />
        </div>
        <!-- ////////// -->
      </main>
      <footer class="profile-footer-container"></footer>
    </main>
    <main-footer v-if="user" :user="user" />
    <!--FOOTER FOR MOBILE -->
  </section>
</template>

<script>
import mainHeader from "../components/main-header.cmp.vue";
import mainFooter from "../components/main-footer.cmp.vue";
import postModal from "../views/post-modal.cmp.vue";
export default {
  name: "profile-page",
  data() {
    return {
      toggeleModal: false,
      currentPost: null
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    openModal(currentPost) {
      this.toggeleModal = !this.toggeleModal;
    },
    closeModal() {
      this.toggeleModal = !this.toggeleModal;
    },
    setCorrentPost(currentPost) {
      if (currentPost) this.currentPost = currentPost;
    }
  },
  created() {
    this.$store.dispatch({ type: "loadUser", userId: 12345 });
  },
  watch: {
    toggeleModal: function() {
      if (this.toggeleModal) {
        document.documentElement.style.overflow = "hidden";
        return;
      }

      document.documentElement.style.overflow = "auto";
    }
  },
  components: {
    mainHeader,
    mainFooter,
    postModal
  }
};
</script>












