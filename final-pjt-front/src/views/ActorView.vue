<template>
  <div class="Actor">
    <h1 id="main"> {{ actorname }}가 출연한 영화</h1>
    <ActorMovieList 
      :actor="actor"
    />
  </div>
</template>

<script>
import ActorMovieList from '@/components/ActorMovieList'

export default {
  name: 'ActorView',
  components: {
    ActorMovieList,
  },
  data: function() {
    return {
      actor: this.$route.params.id,
      actorname: this.$route.params.name
    }
  }
}
</script>

<style>
#main{
  font-weight: bold;
}
</style>