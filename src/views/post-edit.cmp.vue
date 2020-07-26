<template>

    <main class="edit-card-main-content">
      <img class="friend-photo" :src="post.userUrl" alt />
      <nav class="friends-card-nav flex space-between">
        <div class="left-comment-buttons flex space-between">
          <img
            v-if="like"
            @click="toggleLike()"
            class="icons-size"
            src="../assets/styles/icons/redHeart.svg"
            alt
          />
          <img
            v-else
            @click="toggleLike()"
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
        <div v-if="post.likeBy.length>0" class="liked-by margin-top">
          Liked by
          <span class="user-name-comments">{{post.likeBy[0].userName}}</span>
          <span v-if="post.likeBy.length>1">
            and
            {{post.likeBy.length-1}}
            <span class="user-name-comments">others</span>
          </span>
        </div>
        <div class="friends-description flex margin-top">
          <div class="link-to-friends-profile" href>{{post.userName}}</div>
          <div class="friends-description-preview" style="margin-left:5px">{{post.descreption}}</div>
        </div>

        <div
          @click="openModal"
          href
          v-if="post.comments[2]"
          class="view-all-comments margin-top"
        >View all {{post.comments.length}} commnents</div>
        <div v-if="post.comments[1]" class="friends-card-comments margin-top">
          <span class="user-name-comments">{{post.comments[0].userName}}</span>
          {{post.comments[0].input}}
          <div style="margin-top:3.5px">
            <span class="user-name-comments">{{post.comments[1].userName}}</span>
            {{post.comments[1].input}}
          </div>
        </div>
        <div v-else-if="post.comments[0]" class="friends-card-comments margin-top">
          <span class="user-name-comments">{{post.comments[0].userName}}</span>
          {{post.comments[0].input}}
        </div>
        <div class="createdAt margin-top">{{timeConverter(post.createdAt)}}pm</div>
      </div>
      <footer class="friends-card-footer">
      <form
        @submit.prevent="addComment(post._id)"
        class="add-comment-box flex space-between align-center justify-center"
      >
        <input
          v-model="comment"
          class="add-comment-input"
          cols="30"
          rows="10"
          placeholder=" Add comment..."
        />
        <button class="post-btn">Post</button>
      </form>
    </footer>
    </main>

    

</template>

<script>
export default {
  name: "post-edit",
  props: ["user", "post"],
  data() {
    return {
      like: false,
      userToEdit: null,
      postToEdit: null,
      comment: "",
      space: " "
    };
  },
  computed: {},
  methods: {
    openModal() {
      this.$emit("openModal");
    },
    timeConverter(UNIX_timestamp) {
      var a = new Date(+UNIX_timestamp * 1000);
      var hour = a.getHours();
      return hour;
    },
    toggleLike() {
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
    addComment(postId) {
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
    }
  },
  created() {
    this.userToEdit = JSON.parse(JSON.stringify(this.user));
    this.postToEdit = JSON.parse(JSON.stringify(this.post));
  },
  components: {}
};
</script>