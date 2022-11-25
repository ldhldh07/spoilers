<template>
  <div>
    <h4>지금까지 적은 스포일러</h4>
    <div class="container">
      <ProfileCommentListItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :user = user
        @update-comment-list="updateCommentList"
      />
    </div>
  </div>
</template>

<script>
import ProfileCommentListItem from '@/components/ProfileCommentListItem.vue'

export default {
  name:'CommentList',
  props:{
    comments : Array,
    user : Object,
  },
  components : {
    ProfileCommentListItem
  },
  methods: {
    updateCommentList() {
      this.$emit('update-comment-list')
    }
  },
  computed: {
    isLogIn() {
      return this.$store.getters.isLogIn
    }
  },
}
</script>

<style>

</style>