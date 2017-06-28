<template>
	<div class="kugou-xg">
		<div style="font-size: 1.2rem; line-height: 3rem; height: 3rem;position: relative;">
			最近播放列表
			<button class="clear" type="button" @click="clearHistory()">清除历史记录</button>
		</div> 
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
			},
			clearHistory(){
				localStorage.setItem('historyArr','');
				this.$store.state.music.hty = [];
			},
			setHistory(){
				let obj = JSON.parse(localStorage.getItem('historyArr'));
				obj.reverse();
				this.$store.state.music.hty = obj;
			}
		},
		mounted(){
			this.setHistory();
		}
	}
</script>

<style>
	.clear{
		position: absolute;
		top: 0.4rem;
		right: 0.5rem;
		border-radius: 4rem;
		background-color: #fff;
		border: 0;
		padding: 0.4rem 0.8rem;
		background-color: #2CA2F9;
		color: #fff;
		font-size:0.8rem;
	}
</style>