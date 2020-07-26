<template>
<section class="post-list">
    <post-preview :post="post" :user="user" v-for="post in user.posts" :key="post._id"/>
    </section>
</template>

<script>
import postPreview from "../components/post-preview.cmp.vue";
export default {
 name: 'post-list',
 props: ["user"],
    components:{
        postPreview,
    },
    created(){}
}
</script>