<template>
  <div>
    <div class="d-flex justify-content-start" id="divisionbar">
      <font-awesome-icon icon="fa-solid fa-comment" id="justicon"/>
      <span class="align-self-center fs-4">&nbsp;&nbsp;&nbsp;스포일러 한마디</span>
    </div>
    <br>
    <CommentListItem
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      :movieId= movieId
      @update-comment-list="updateCommentList"
    />
    <div class="d-flex justify-content-end">
      <button class="btn btn-outline-dark" v-b-toggle.comment-form>
        스포일러 남기기
      </button>
    </div>
    <b-collapse v-if="isLogIn" id="comment-form" class="collapse">
      <br>

      <form @submit.prevent="createComment">
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

    </b-collapse>
    <div v-else>
      <br><br>
    </div>
    <br><br>
  </div>
</template>

<script>
import CommentListItem from '@/components/CommentListItem.vue'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'


export default {
  name:'CommentList',
  props:{
    comments : Array,
    movieId : Number,
  },
  components : {
    CommentListItem
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
    }
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
          user_id: userId
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