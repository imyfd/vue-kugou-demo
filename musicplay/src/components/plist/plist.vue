<template>
	<div class="rank">
      <ul>
        <li v-for="(item,index) in plist">
          <router-link :to="item.location">
          	<div class="rank-container">
              <img :src="item.imgUrl" :title="item.title" class="rank-logo" alt="" @click="text()">
              <span @click="text(index)">{{item.title}}</span>
              <img src="./arrow_icon.png" alt="" class="rank-next">
              <div class="rank-val">
              	<img src="./time.jpg" alt="">{{item.countPlay}}
              </div>
            </div>  	
          </router-link>
        </li>
      </ul>
    </div>
</template>

<script>
  	import plistJson from '@/json/list_plist'
  	import { mapGetters } from 'vuex'
  	
	export default{
		name:"plist",
		data(){
			return {
				imgSrc:'',
				plist:[]
			}
		},
		methods:{
			text(index){
				let idx = this.plist[index].location;
				let info=idx.substr(12);
				this.$store.state.pList = info;
			}
		},
		mounted(){
			this.plist = plistJson;
		}
	}
</script>

<style>
.rank{
  margin-bottom: 4.2143rem;
}
.rank-container{
	width: 100%;
	height: 100%;
	position: relative;
}
.rank-val{
	position: absolute;
	top: 4rem;
	left: 7rem;
	font-size: 0.9rem;
}
.rank-val img{
	width: 0.8rem;
	height: 0.8rem;
	margin-right: 0.4rem;
	margin-top: 0.18rem !important;
}
.rank ul{
  padding: 4px 10px;
  list-style: none;
  margin: 0;
}
.rank ul li{
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #E5E5E5;
  font-family: 'Microsoft Yahei';
  position: relative;
}
.rank ul li img{
	float: left;
	margin-top: 0.3rem;
}
.rank ul li .rank-logo{
  width: 5.3751rem;
  height: 5.3751rem;
  vertical-align: middle;
}
.rank ul li span{
  display: block;
  vertical-align: middle;
  margin-left: 1rem;
  line-height: 6rem;
  text-align: left;
  margin-left: 7rem;
}
.rank ul li .rank-next{
  position: absolute;
  right: 0;
  top:50%;
  transform: translateY(-50%);
}
</style>