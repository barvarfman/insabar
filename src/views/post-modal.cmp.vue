<template>
  <section class="post-modal-container">
    <div class="close-modal" @click.stop=" closeModal">
      <svg
        aria-label="Close"
        class="_8-yf5"
        fill="#ffffff"
        height="24"
        viewBox="0 0 48 48"
        width="24"
      >
        <path
          clip-rule="evenodd"
          d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z"
          fill-rule="evenodd"
        />
      </svg>
    </div>
    <div class="main-modal-content flex row-reverse" v-if="currentPost">
      <div class="main-right-content-pro-modal flex column">
        <header
          class="friends-card-headr flex space-between justify-center"
          :style="{ 'border-bottom': 'gainsboro 1px solid'}"
        >
          <img
            class="post-modal-home-btn  position-fixed"
            src="../assets/styles/icons/homepage.svg"
            alt
          />
          <div class="flex align-center space-between">
            <img class="friend-profile-pic" :src="user.userProfilePic" alt />
            <div class="friend-user-name">{{user.userName}}</div>
          </div>
          <button
            @click.stop="openOrCloseMenue"
            class="option-btn flex justify-center align-center"
          >
            <span style="margin-bottom:12px">...</span>
          </button>
          <div class="post-modal flex justify-center align-center" v-show="toggeleMenueModal">
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
                @click.stop="openOrCloseMenue"
                @mousedown="changeColor"
                @mouseup="changeColor"
                v-bind:class="{ light: lightGray }"
              >Cancel</div>
            </div>
          </div>
        </header>
        <div id="idForScrollBar" class="middle-comment-box">
          <div
            class="comment-in-modal flex align-center"
            v-for="comments in currentPost.comments"
            :key="comments.input"
          >
            <img v-if="comments.userUrl" class="friend-profile-pic" :src="comments.userUrl" alt />
            <img v-else class="friend-profile-pic" :src="user.userProfilePic" alt />
            <span class="friend-user-name">{{comments.userName}}</span>
            <span class="user-comment-input-modal">{{comments.input}}</span>
          </div>
        </div>
        <main class="friends-card-main-content" :style="{ 'border-top': 'gainsboro 1px solid'}">
          <nav class="friends-card-nav flex space-between">
            <div class="left-comment-buttons flex space-between">
              <img
                v-if="like"
                @click.stop="toggleLike()"
                class="icons-size"
                src="../assets/styles/icons/redHeart.svg"
                alt
              />
              <img
                v-else
                @click.stop="toggleLike()"
                class="icons-size"
                src="../assets/styles/icons/heart.svg"
                alt
              />
              <img class="icons-size" src="../assets/styles/icons/comment.svg" alt />
              <img class="icons-size" src="../assets/styles/icons/send.svg" alt />
            </div>
            <img class="icons-size" src="../assets/styles/icons/post.svg" alt />
          </nav>
          <div class="middle-post-container flex column space-between">
            <div v-if="currentPost.likeBy.length>0" class="liked-by margin-top">
              Liked by
              <span class="user-name-comments">{{currentPost.likeBy[0].userName}}</span>
              <span v-if="currentPost.likeBy.length>1">
                and
                {{currentPost.likeBy.length-1}}
                <span
                  class="user-name-comments"
                >others</span>
              </span>
            </div>

            <div class="createdAt margin-top">{{timeConverter(currentPost.createdAt)}}pm</div>
          </div>
        </main>

        <footer class="friends-card-footer">
          <form
            @submit.prevent="addComment(currentPost._id)"
            class="add-comment-box flex space-between align-center justify-center"
          >
            <input
              v-model="comment"
              class="add-comment-input"
              cols="30"
              rows="10"
              placeholder=" Add comment..."
              :style="{ 'border-bottom': 'none'}"
            />
            <button class="post-btn">Post</button>
          </form>
        </footer>
      </div>
      <div class="modal-img" :style="{ 'background-image': 'url(' + currentPost.userUrl+ ')' }" />
    </div>
  </section>
</template>



<script>
export default {
  name: "post-modal",
  props: ["user", "currentPost"],
  data() {
    return {
      comment: "",
      like: false,
      toggeleMenueModal: false,
      userToEdit: null,
      postToEdit: null,
      space: " ",
      lightGrayForDelete: false,
      lightGray: false
    };
  },
  computed: {},
  methods: {
    changeColorForDelete() {
      this.lightGrayForDelete = !this.lightGrayForDelete;
    },
    changeColor() {
      this.lightGray = !this.lightGray;
    },

    closeModal() {
      this.$emit("closeModal");
    },

    addComment() {
      this.postToEdit = JSON.parse(JSON.stringify(this.currentPost));
      this.userToEdit = JSON.parse(JSON.stringify(this.user));
      this.postToEdit.comments.push({
        _id: this.user._id,
        userName: this.user.userName,
        input: this.comment
      });

      const userIndex2 = this.userToEdit.posts.findIndex(
        post => post._id === this.postToEdit._id
      );
      this.userToEdit.posts.splice(userIndex2, 1, this.postToEdit);

      this.$store.dispatch({
        type: "saveUser",
        user: this.userToEdit
      });
      this.comment = "";
    },
    toggleLike() {
      this.postToEdit = JSON.parse(JSON.stringify(this.currentPost));
      this.userToEdit = JSON.parse(JSON.stringify(this.user));
      this.like = !this.like;
      if (this.like)
        this.postToEdit.likeBy.push({
          _id: this.user._id,
          userName: this.user.userName
        });
      else {
        const userIdx = this.postToEdit.likeBy.findIndex(
          user => user._id === this.user._id
        );
        this.postToEdit.likeBy.splice(userIdx, 1);
      }

      const userIndex = this.userToEdit.posts.findIndex(
        post => post._id === this.postToEdit._id
      );
      this.userToEdit.posts.splice(userIndex, 1, this.postToEdit);

      this.$store.dispatch({
        type: "saveUser",
        user: this.userToEdit
      });
    },
    openOrCloseMenue() {
      this.toggeleMenueModal = !this.toggeleMenueModal;
    },
    timeConverter(UNIX_timestamp) {
      var a = new Date(+UNIX_timestamp * 1000);
      var hour = a.getHours();
      return hour;
    },
    deletePost() {
      this.$emit("closeModal");
      this.toggeleMenueModal = !this.toggeleMenueModal;
      this.userToEdit = JSON.parse(JSON.stringify(this.user));
      const postIdx = this.userToEdit.posts.findIndex(
        post => post._id === this.currentPost._id
      );
      this.userToEdit.posts.splice(postIdx, 1);
      this.$store.dispatch({
        type: "saveUser",
        user: this.userToEdit
      });
    }
  },
  created() {}
};
</script>






