<template>
  <div class="genre">
    <h1 id="main">장르 선택</h1>
    <div class="d-flex justify-content-start flex-wrap">
      <div class="genre-box me-3 my-2 col-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 col-xxl-2"
      v-for="(genre, index) in genres"
      :key="genre.id"
      :id="'g'+index">
        <router-link :to="{ name:'GenreView', params:{genre:genre.name, code:String(genre.id), page:1 } }">        
          {{genre.name}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GenreSelectView',
  created() {
    this.getGenres()
  },
  methods: {
    getGenres() {
      this.$store.dispatch('getGenres')
    }
  },
  computed: {
    genres() {
      const array = this.$store.state.genres
      return array
    }
  }
}
</script>

<style>

.genre-box {
  display: flex;
  border-block-end: 2px solid black;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding-top: 2vw;
  padding-bottom: 2vw;
  height: 15vh;
}

.genre-box a {
  font-size: 200%;
  text-decoration: none;
  color: white;
}

.genre-box a:hover {
  color: white;
  font-size: 220%;
}

#g0 {
  background: #f12711;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #f5af19, #f12711);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #f5af19, #f12711); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

#g1 {
  background: #FF0099;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #493240, #FF0099);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #493240, #FF0099); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
#g2 {
  background: #348F50;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #56B4D3, #348F50);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #56B4D3, #348F50); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
#g3 {
  background: #FDC830;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #F37335, #FDC830);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #F37335, #FDC830); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
#g4 {
  background: #232526;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #414345, #232526);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
#g5 {
  background: #F1F2B5;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #135058, #F1F2B5);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #135058, #F1F2B5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
#g6 {
  background: #00B4DB;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #0083B0, #00B4DB);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #0083B0, #00B4DB); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
#g7 {
  background: #403A3E;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #BE5869, #403A3E);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #BE5869, #403A3E); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
#g8 {
  background: #F3904F;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #3B4371, #F3904F);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #3B4371, #F3904F); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

#g9{
  background: #333333;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #dd1818, #333333);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #dd1818, #333333); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

#g10 {
  background: #6441A5;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #2a0845, #6441A5);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2a0845, #6441A5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
#g11 {
  background: #348F50;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #56B4D3, #348F50);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #56B4D3, #348F50); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
#g12 {
  background: #0F2027;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #2C5364, #203A43, #0F2027);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #2C5364, #203A43, #0F2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
#g13 {
  background: #403B4A;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #E7E9BB, #403B4A);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #E7E9BB, #403B4A); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
#g14 {
  background: #fe8c00;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #f83600, #fe8c00);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #f83600, #fe8c00); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
#g15 {
  background: #ec008c;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #fc6767, #ec008c);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #fc6767, #ec008c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
#g16 {
  background: #e9d362;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #333333, #e9d362);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #333333, #e9d362); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
#g17 {
  background: #414d0b;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #727a17, #414d0b);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #727a17, #414d0b); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
#g18 {
  background: #F0C27B;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #4B1248, #F0C27B);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #4B1248, #F0C27B); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

#main{
  font-weight: bold;
}
</style>

