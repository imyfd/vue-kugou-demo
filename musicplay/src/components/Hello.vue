<template>
  <div class="hello">
    <kugouHeader></kugouHeader>
    <router-view></router-view>
    <play></play>
  </div>
</template>

<script>
import kugouHeader from '@/components/header/header';
import play from '@/components/play/play';
	
export default {
  name: 'hello',
  data () {
    return {
      
    }
  },
  components: {
    kugouHeader,play
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
