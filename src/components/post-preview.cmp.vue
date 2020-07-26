<template>
  <main class="post-preview flex column space-between">
    <header class="friends-card-headr flex space-between justify-center">
      <div class="flex align-center space-between">
        <img class="friend-profile-pic" :src="user.userProfilePic" alt />
        <div class="friend-user-name">{{user.userName}}</div>
      </div>
      <button @click="openMenue" class="option-btn flex justify-center align-center">
        <span style="margin-bottom:12px">...</span>
      </button>
      <div class="post-modal flex justify-center align-center" v-show="toggeleModalForMenue">
        <div class="menue-modal-home-page flex column">
          <div
            class="delete-post-btn"
            @click.stop="deletePost"
            @mousedown="changeColorForDelete"
            @mouseup="changeColorForDelete"
            v-bind:class="{ light: lightGrayForDelete }"
          >Delete Post</div>
          <div
            class="cancel"
            @click.stop="openMenue"
            @mousedown="changeColor"
            @mouseup="changeColor"
            v-bind:class="{ light: lightGray }"
          >Cancel</div>
        </div>
      </div>
    </header>
    <post-edit :user="user" :post="post"  @openModal="openModal" />
    <!-- ///////////post-modal -->
    <div class="post-modal flex" v-show="toggeleModal">
      <post-modal
        @closeModal="closeModal"
        v-if="user&&post"
        :currentPost="post"
        :user="user"
      />
    </div>
    <!-- ////////// -->
  </main>
</template>


<script>
import postModal from "../views/post-modal.cmp.vue";
import postEdit from "../views/post-edit.cmp.vue";
export default {
  name: "post-preview",
  props: ["user", "post"],
  data() {
    return {
      lightGrayForDelete: false,
      lightGray: false,
      toggeleModal: false,
      toggeleModalForMenue: false,
      userToEdit: null
    };
  },
  computed: {},
  methods: {
    openModal(currentPost) {
      this.toggeleModal = !this.toggeleModal;
    },
    closeModal() {
      this.toggeleModal = !this.toggeleModal;
    },
    changeColorForDelete() {
      this.lightGrayForDelete = !this.lightGrayForDelete;
    },
    changeColor() {
      this.lightGray = !this.lightGray;
    },
    openMenue() {
      this.toggeleModalForMenue = !this.toggeleModalForMenue;
    },
    deletePost() {
      const postIdx = this.userToEdit.posts.findIndex(
        post => post._id === this.post._id
      );
      this.userToEdit.posts.splice(postIdx, 1);
      this.$store.dispatch({
        type: "saveUser",
        user: this.userToEdit
      });
    }
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
    postEdit,
    postModal
  },
  created() {
    this.userToEdit = JSON.parse(JSON.stringify(this.user));
  }
};
</script>




