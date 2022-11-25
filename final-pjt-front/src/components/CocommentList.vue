<template>
  <div>

    <br>
    <CocommentListItem
      v-for="comment in comments"
      :comment="comment"
      :key="comment.id"
      :movieId= movieId
      @update-comment-list="updateCommentList"
    />
    <form v-if="isLogIn" @submit.prevent="createComment">
      <label class="form-label" for="comments-title"> 제목 </label>
      <input class="form-control" type="text" id="comments-title" v-model.trim="title"><br>
      <label class="form-label" for="comments-content">내용 </label>
      <textarea
        class="form-control"
        id="comments-content"
        cols=40
        rows=5
        v-model.trim="content"
        style="resize: none;"
      ></textarea>
      <div id="comment-area">
        <input class="btn btn-dark" type="submit" id="submit-button" value="입력">        
      </div>
    </form>
    <br>
  </div>
</template>

<script>
import CocommentListItem from '@/components/CocommentListItem.vue'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'


export default {
  name:'CocommentList',
  props:{
    movieId : Number,
    parentId : Number,
    comments : Array,
  },
  components : {
    CocommentListItem
  },
  data() {
    return {
      title: null,
      content: null,
    }
  },
  computed: {
    isLogIn() {
      return this.$store.getters.isLogIn
    },
  },
  methods: {
    createComment() {
      const title = this.title
      const content = this.content
      const userId = this.$store.state.user.id
      
      if (!title) {
        alert('제목 입력해주세요')
      } else if (!content) {
        alert('내용 입력해주세요')
      }
      axios({
        method: 'post',
        url: `${API_URL}/api/community/${this.movieId}/comments/`,
        data: {
          title: title,
          content: content,
          user_id: userId,
          parent_id: this.parentId,
        },
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
      })
        .then(() => {
          this.title = null
          this.content = null
          this.$emit('update-comment-list')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateCommentList() {
      this.$emit('update-comment-list')
    }
  }
}
</script>

<style>
#submit-button {
  margin-top: 10px;
}

#comment-area {
  display: flex;
  flex-direction: row-reverse;
}

</style>