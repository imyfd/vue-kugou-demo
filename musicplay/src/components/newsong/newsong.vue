<template>
	<div class="kugou-xg">
		<swiper :options="swiperOption" ref="mySwiper">
		    <!-- slides -->
		    <swiper-slide v-for="item in imgSrc">
		    	<img :src="item.src" alt="" />
		    </swiper-slide>
		    <!-- Optional controls -->
		    <div class="swiper-pagination"  slot="pagination"></div>
		    <div class="swiper-button-prev" slot="button-prev"></div>
		    <div class="swiper-button-next" slot="button-next"></div>
		    <div class="swiper-scrollbar"   slot="scrollbar"></div>
		  </swiper>
    <div class="kugou-xg-list">
    	<div style="font-size: 1.2rem;line-height: 3rem;height: 3rem;">热歌推荐</div>
	    <ul>
	       	<li v-for="(item,index) in $store.state.xgList" @click="play(item.hash,index,item.name)">
	          {{item.name}}
	        </li>
	    </ul>
    </div>
  </div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	var pic1 =  require('@/assets/music1.jpg');
	var pic2 =  require('@/assets/music2.jpg');
	var pic3 =  require('@/assets/music3.jpg');
	
	export default{
		components: {
			swiper,
			swiperSlide
		},
		name: "newsong",
		data(){
			return {
				swiperOption: {
					notNextTick: true,
			        autoplay: 3000,
			        direction : 'horizontal',
			        grabCursor : true,
			        setWrapperSize :true,
			        autoHeight: true,
			        pagination : '.swiper-pagination',
			        paginationClickable :true,
			        prevButton:'.swiper-button-prev',//上一张
			        nextButton:'.swiper-button-next',//下一张
			        scrollbar:'.swiper-scrollbar',//滚动条
			        mousewheelControl : true,
			        observeParents:true,
			        debugger: true
		       	},
		       	imgSrc:[
		       		{src:pic1},
		       		{src:pic2},
		       		{src:pic3}
		       	]
			}
		},
		methods:{
			copyArr(arr){
				let res = []
			    for (let i = 0; i < arr.length; i++) {
			     res.push(arr[i])
			    }
			    return res
			},
			play(hash,idx,name){
				localStorage.setItem('msg',hash);
				localStorage.setItem('index',idx);
				localStorage.setItem('playItem',JSON.stringify(this.$store.state.xgList));
				this.$store.dispatch('playHistory',[hash,name]);
				this.$store.dispatch('getSong', hash);
	       		this.$store.state.music.hash = hash;
	       		this.$store.state.playState.pauseLogo = true;
	       		this.$store.state.playState.playLogo = false;
	       		this.$store.state.playState.pause = true;
	       		this.$store.state.playState.play = false;
	       		this.$store.state.music.preSong = this.$store.state.xgList;
	       		this.$store.state.music.preSongidx = idx;
	       		this.$store.dispatch('runRotate');
	       		let audios = document.getElementById('audioPlay');
	       		audios.autoplay=true;
			}
		}
	}
</script>

<style>
.swiper-container-autoheight{
	height: 12rem !important;
}	
.kugou-xg{
    margin-bottom:4.2143rem;
}
.kugou-xg-list{
	width: 100%;
}
.kugou-xg img{
    width: 100%;
}
.kugou-xg ul{
    list-style: none;
    padding-left: 20px;
    margin-top: 0;
    margin-bottom: 4rem;
}
.kugou-xg ul li{
    width: 100%;
    font-family: 'Microsoft Yahei';
    border-bottom: 1px solid #cbcbcb;
    font-size: 1.2rem;
    padding: 20px 0px;
    text-align: left;
    color: #333;
}
.kugou-xg ul li:first-child{
	
    border-top: 1px solid #cbcbcb;
}
</style>