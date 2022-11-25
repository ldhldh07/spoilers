<template>
  <div class="popular">
    <h1 id="main">따끈따끈한 최신 영화</h1>
    <MovieList
      :isNew="isNew"
    />
  </div>
</template>

<script>
import MovieList from '@/components/MovieList'

export default {
  name: 'PopularView',
  components: {
    MovieList,
  },
  data: function() {
    return{
      isNew: 'NEW'
    }
  },
}
</script>

<style>
#main{
  font-weight: bold;
}
</style>
