<template>
  <div class="d-flex flex-wrap">
    <br>
    <div class="d-flex justify-content-start cursor">
      <p @click="toggleToPopular" class="popular">인기순</p>
      <p>&nbsp;|&nbsp;</p>
      <p @click="toggelToNew" class="new">최신순</p>
    </div>
    <div class="d-flex flex-wrap" id="movieitems">
      <MovieListItem
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
    <div @click="changePage" id="page-area">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="movieitems"
        first-number
        last-number
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import MovieListItem from '@/components/MovieListItem.vue'

export default {
  name:'GenreMovieList',
  data : function() {
    return {
      toggle: true,
      perPage: 24,
      currentPage: this.$route.params.page,
    }
  },
  components : {
    MovieListItem
  },
  computed: {
    movies() {
      const array = this.$store.state.movies
      const genreArray = array.filter(movie => movie.genres_of_movie.includes(Number(this.genreCode)))
      if(this.toggle) {
        const popularGenreArray = genreArray.sort((a,b) => b.popularity - a.popularity)
        return popularGenreArray.slice((this.currentPage-1)*this.perPage, this.currentPage*this.perPage)
      } else {
        const newestGenreArray = genreArray.sort((a,b) => new Date(b.date_opened) - new Date(a.date_opened))
        return newestGenreArray.slice((this.currentPage-1)*this.perPage, this.currentPage*this.perPage)
      }
    },
    rows() {
      const array = this.$store.state.movies
      const genreArray = array.filter(movie => movie.genres_of_movie.includes(Number(this.genreCode)))
      return genreArray.length
    }
  },
  props:{
    genreCode : String
  },
  methods : {
    toggelToNew() {
      this.toggle = false
      const popularbtn = document.querySelector('.popular')
      const newbtn = document.querySelector('.new')
      newbtn.setAttribute('style','  font-weight: bold')
      popularbtn.setAttribute('style','  font-weight: 400')
      this.currentPage = 1
    },
    toggleToPopular() {
      this.toggle = true
      const popularbtn = document.querySelector('.popular')
      const newbtn = document.querySelector('.new')
      popularbtn.setAttribute('style','  font-weight: bold')
      newbtn.setAttribute('style','  font-weight: 400')
      this.currentPage = 1
    },
    changePage() {  
      history.pushState(null, null, this.currentPage)
    }
  }
}
</script>

<style>
.cursor {
  cursor:pointer
}
.popular {
  font-weight: bold;
  color: #333d51;
}

#page-area {
  margin-right: auto;
  margin-left: auto;
}

.pagination .page-item.disabled .page-link{
  background-color:#333d51;
  color : #f4f3ea;
}

.pagination .page-link {
  background-color: #333d51 ;
  color : #f4f3ea;
}

.pagination .page-item.active .page-link {
  color: #333d51;
  background-color: #d3ac2b;
  border: solid white 1px;
}
</style>