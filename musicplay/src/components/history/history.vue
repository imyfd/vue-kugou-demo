<template>
	<div class="kugou-xg">
		<div style="font-size: 1.2rem; line-height: 3rem; height: 3rem;">最近播放列表</div> 
		<ul>
			<li v-for="(item,index) in $store.state.music.hty" @click="play(item.hash,index)">{{item.name}}</li>
		</ul>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui'
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			play(hash, idx) {
				localStorage.setItem('msg',hash);
				localStorage.setItem('index',idx);
				localStorage.setItem('playItem',JSON.stringify(this.$store.state.music.hty));
				this.$store.dispatch('getSong', hash);
	       		this.$store.state.music.hash = hash;
	       		this.$store.state.playState.pauseLogo = true;
	       		this.$store.state.playState.playLogo = false;
	       		this.$store.state.playState.pause = true;
	       		this.$store.state.playState.play = false;
	       		this.$store.state.music.preSong = this.$store.state.music.hty;
	       		this.$store.state.music.preSongidx = idx;
	       		this.$store.dispatch('runRotate');
	       		let audios = document.getElementById('audioPlay');
	       		audios.autoplay=true;
			}
		},
		mounted(){
			let obj = JSON.parse(localStorage.getItem('historyArr'));
			obj.reverse();
			this.$store.state.music.hty = obj;
		}
	}
</script>

<style>
</style>