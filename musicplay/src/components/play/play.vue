<template>
	<div class="audio-play">
	<keep-alive>
		<router-link to="/playIndex" class="play-index-router">
			<div class="singerImg gs-img Rotation" :style="{'background-image':'url('+$store.state.music.imgUrl+')'}"></div>
	    </router-link>
    </keep-alive>	
    
    <!--<img :src="$store.state.music.imgUrl" class="gs-img" alt="">-->
    <div class="song-value">	
	    <span style="margin-top: 0.8rem;">{{$store.state.music.name}}</span><br />
	    <span>{{$store.state.music.song}}</span>
    </div>
    
    <div class="kugou-play-img">
        <img src="./pause_icon.png" alt="" class="pause" v-if="$store.state.playState.pauseLogo" @click="pause()">
        <img src="./play_icon.png" alt="" class="pause" v-if="$store.state.playState.playLogo" @click="play()">
     	<img src="./next_icon.png" alt="" class="next" @click="next()">
    </div>
      <audio id="audioPlay" :src="$store.state.music.songUrl" controls="controls" loop="loop" autoplay="autoplay" hidden>亲 您的浏览器不支持html5的audio标签</audio>
	</div>
</template>

<script>
	
  	import { mapGetters } from 'vuex'
	
	export default{
		data(){
			return{
				load:true,
				imgRot:false,
				hash:''
			}
		},
		methods:{
			toPause(){
				let audios=document.getElementById('audioPlay');
				this.$store.state.playState.pause = !this.$store.state.playState.pause;
				this.$store.state.playState.play = !this.$store.state.playState.play;
				this.$store.state.playState.pauseLogo = !this.$store.state.playState.pauseLogo;
				this.$store.state.playState.playLogo = !this.$store.state.playState.playLogo;
				if(!this.$store.state.playState.pause){
					audios.pause();
				}
			},
			toPlay(){
				let audios=document.getElementById('audioPlay');
				this.$store.state.playState.pause = !this.$store.state.playState.pause;
				this.$store.state.playState.play = !this.$store.state.playState.play;
				this.$store.state.playState.pauseLogo = !this.$store.state.playState.pauseLogo;
				this.$store.state.playState.playLogo = !this.$store.state.playState.playLogo;
				if(this.$store.state.playState.pause){
					audios.play();
				}
			},
			play(){
				let that = this;
				setTimeout(() => {
					that.toPlay();
					if(this.$store.state.rotate){
						$('.gs-img').addClass('Rotation');
						this.$store.state.rotate = false;
					}
				},200)
			},
			pause(){
				let that = this;
				setTimeout(() => {
					that.toPause();
					if(!this.$store.state.rotate){
						$('.gs-img').removeClass('Rotation');
						that.$store.state.rotate = true;
					};
				},200)
			},
			next(){
				this.$store.dispatch('next');
			}
		},
		mounted(){
			//自动加载localStroage
			let hashs = localStorage.getItem('msg');
			let idx = localStorage.getItem('index');
			let playItem = JSON.parse(localStorage.getItem('playItem'));
			if(hashs == null){
				return;
			}else{
				this.$store.dispatch('play');
	       		this.$store.state.music.hash = hashs;
	       		this.$store.state.music.preSong = playItem;
	       		this.$store.state.music.preSongidx = idx;
	       		$('.gs-img').removeClass('Rotation');
				this.$store.state.rotate = true;
	       		
				this.$store.state.playState.pause = !this.$store.state.playState.pause;
				this.$store.state.playState.play = !this.$store.state.playState.play;
				this.$store.state.playState.pauseLogo = !this.$store.state.playState.pauseLogo;
				this.$store.state.playState.playLogo = !this.$store.state.playState.playLogo;
	       		let audios = document.getElementById('audioPlay');
				if(!this.$store.state.playState.pause) {
					audios.autoplay=false;
				}
			}
		}//调用热门歌曲
	}
</script>

<style>
@-webkit-keyframes rotation{
	from {-webkit-transform: rotate(0deg);}
	to {-webkit-transform: rotate(360deg);}
}	
.Rotation{
	-webkit-transform: rotate(360deg);
	animation: rotation 8s linear infinite;
	-moz-animation: rotation 8s linear infinite;
	-webkit-animation: rotation 8s linear infinite;
	-o-animation: rotation 8s linear infinite;
}

.singerImg{
	background-size: cover;
}
	
.audio-play{
  width: 100%;
  height: 4.2143rem;
  position: fixed;
  left: 0;
  bottom: 0;
  background: rgba(0,0,0,.9);
  color: #fff;
  font-size: 0;
  display: flex;
  align-items: center;
}
.audio-play .gs-img{
  display: block;
  width: 4.6rem;
  height: 4.6rem;
  border-radius: 100%;
  vertical-align: middle;
  margin-top: 0.28rem;
  margin-left: 0.2rem;
  border: none;
}
.audio-play span{
  color: white;
  display: inline-block;
  width: 16rem;
  font-size: 15px;
  vertical-align: middle;
  margin-left: 0.2rem;
}
.kugou-play-img{
  float: right;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 4rem;
}
.song-value{
	height: 100%;
	margin-left: 5rem;
}
.song-value span{
	font-size: xx-large;
	text-align: left;
}
.gs-img{
	float: left;
}
.audio-play .kugou-loading{
  animation: loads 1.5s infinite linear;
}
.audio-play .next{
  vertical-align: middle;
}
.pause,.next{
	width: 80px;
	height: 80px;
}
.play-index-router{
  width: auto;
  height: 100%;
  padding: 0;
  position: absolute;
  top: -1rem;
  left: 0.2rem;
}

</style>