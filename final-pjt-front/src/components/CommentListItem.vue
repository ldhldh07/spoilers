<template>
  <div>
    <div
      id="comment-list"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false"  
    >
      <div id="comment">
        <div id="comment-writer">
          <router-link :to="{ name: 'ProfileView', params: { username: comment.user.username, page: 1 } }" id="profile-link">
            <font-awesome-icon v-if="isOwner" class="fa-2xl" icon="fa-regular fa-user" />
            <font-awesome-icon v-else class="fa-2xl" icon="fa-solid fa-user" />
            <p id="comment-user-name">{{comment.user.username}}</p>
          </router-link>
        </div>
        <div id="comment-content">
          <span class="me-4" id="comment-title">{{ comment.title }}</span>     
          <span>{{ commentCreatedAt }}</span><br>
          <span>{{ comment.content }}</span>
          <br>
          <div
            style= "margin-top: 10px"
            v-b-toggle="`${comment.id}-comment-form`"
            @click="replyOpen = !replyOpen"
          >
            <span>
              <font-awesome-icon v-if="replyOpen" icon="fa-solid fa-angles-up" />
              <font-awesome-icon v-else icon="fa-solid fa-angles-down" />
              답글   {{ comments.length }}
            </span>
          </div>
        </div>
      </div>
      <div>
        <button
          id="delete-button"
          class="btn btn-dark btn-sm"
          v-if="isOwner"
          v-show="isHovered"
          @click=deleteComment(comment.id)
        >
        X
        </button>
      </div>
    </div>
    <div class="d-flex">
    </div>
    <b-collapse :id="`${comment.id}-comment-form`" class="collapse">
      <CocommentList
        :movieId = movieId
        :parentId = comment.id
        :comments = comments
        @update-comment-list="updateCommentList"
        id="cocoment-area"
      />
    </b-collapse>
  </div>
</template>
  
<script>
import CocommentList from '@/components/CocommentList'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'


export default {
  name: 'CommentListItem',
  components: {
    CocommentList,
  },
  data() {
    return {
      replyOpen: false,
      isHovered: false,
    }
  },
  props: {
    comment: Object,
    movieId: Number,
  },
  computed: {
    isOwner() {
      return this.$store.state.user?.id === this.comment.user.id ? true : false
    },
    commentCreatedAt() {
      const createdDate = new Date(this.comment.created_at)
      const now = new Date()
      const timeDiff = now.getTime() - createdDate.getTime()

      var diffText
      if (timeDiff / (1000 * 60) < 1) {
        diffText = `${parseInt(timeDiff / 1000) }초 전`
      } else if (timeDiff / (1000 * 60 * 60) < 1) {
        diffText = `${parseInt(timeDiff / (1000 * 60)) }분 전`
      } else if (timeDiff / (1000 * 60 * 60 * 24) < 1) {
        diffText = `${parseInt(timeDiff / (1000 * 60 * 60)) }시간 전`
      } else if (timeDiff / (1000 * 60 * 60 * 24 * 30) < 1) {
        diffText = `${parseInt(timeDiff / (1000 * 60 * 60 * 24)) }일 전`
      } else {
        diffText = `${createdDate.getFullYear()}/${createdDate.getMonth()+1}/${createdDate.getDate()}`
      }
      return diffText
    },
    comments() {
      return this.comment.replies
    }
  },
  methods: {
    deleteComment(commentId) {
      axios({
        method: 'delete',
        url: `${API_URL}/api/community/${commentId}`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
      })
        .then(() => {
          this.$emit('update-comment-list')
        })
        .catch((error)=> {
          console.log(error)
        })
    },
    updateCommentList() {
      this.$emit('update-comment-list')
    },
    hoverComment() {
      this.isHovered = true
    }
  }
}
</script>

<style>
#comment-list {
  margin: 5px;
  padding: 5px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
}

#comment-title {
  font-weight: bold ;
}

#comment-writer {
  display: flex;
  text-align: center;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  width: 60px;
}

#comment {
  display: flex;
}

#delete-button {
  margin-bottom: 50px;
  width: 30px;
  height: 30px;
}

#comment-content {
  margin-left: 20px;
}

#profile-link {
  color : #333d51;
  text-decoration: none;
}

#comment-user-name {
  word-wrap:break-word;
}

#cocoment-area {
  margin-left: 5vw;
}
</style>