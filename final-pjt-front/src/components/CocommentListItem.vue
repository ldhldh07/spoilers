<template>
  <div>
    <div
      id="comment-list"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false"  
    >
      <div id="comment">
        <div id="comment-writer">
          <router-link :to="{ name: 'ProfileView', params: { username: comment.user.username, page: 1 } }" id="cocoment-profile-link">
            <font-awesome-icon v-if="isOwner" class="fa-2xl" icon="fa-regular fa-user" />
            <font-awesome-icon v-else class="fa-2xl" icon="fa-solid fa-user" />
            <p id="comment-user-name">{{comment.user.username}}</p>
          </router-link>
        </div>
        <div id="comment-content">
          <span class="me-4" id="comment-title">{{ comment.title }}</span>     
          <span>{{ commentCreatedAt }}</span><br>
          <span>{{ comment.content }}</span>
        </div>
      </div>
      <div>
        <button
          id="delete-button"
          class="btn btn-dark btn-sm"
          v-if="isOwner"
          v-show="isHovered"
          @click="deleteComment(comment.id)"
        >
        X
        </button>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'


export default {
  name: 'CocommentListItem',
  props: {
    comment: Object,
    movieId: Number,
  },
  data() {
    return {
      isHovered: false,
    }
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

#cocoment-profile-link {
  color : #333d51;
  text-decoration: none;
  margin-top: 7px;
  margin-bottom: 1px;
}

#comment-user-name {
  word-wrap:break-word;
}
</style>