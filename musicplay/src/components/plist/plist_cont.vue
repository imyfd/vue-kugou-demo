<template>
	<div class="rank-list">
		<div class="rank-list-title">
			<img src="./goback.png" alt="" @click="goBack()">
			<span>{{title}}</span>
		</div>
		<div class="rank-banner">
			<img :src="imgSrc" alt="">
		</div>
		<div class="rank-list-cont">
			<ul>
				<li v-for="(item,index) in songList" @click="play(item.hash,index,item.title)" class="song-li">
					{{item.title}}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui'

	export default {
		name: "",
		data() {
			return {
				infoID: '',
				imgSrc: '',
				title: '',
				updateTime: '',
				songList: []
			}
		},
		methods: {
			goBack() {
				history.go(-1);
			},
			play(hash, idx,name) {
				localStorage.setItem('msg',hash);
				localStorage.setItem('index',idx);
				localStorage.setItem('playItem',JSON.stringify(this.songList));
				this.$store.dispatch('getSong', hash);
				this.$store.dispatch('playHistory',[hash,name]);
	       		this.$store.state.music.hash = hash;
	       		this.$store.state.playState.pauseLogo = true;
	       		this.$store.state.playState.playLogo = false;
	       		this.$store.state.playState.pause = true;
	       		this.$store.state.playState.play = false;
	       		this.$store.state.music.preSong = this.songList;
	       		this.$store.state.music.preSongidx = idx;
	       		this.$store.dispatch('runRotate');
	       		let audios = document.getElementById('audioPlay');
	       		audios.autoplay=true;
			},
			getData() {
				Indicator.open({
		          text: '已经很努力的加载了...',
		          spinnerType: 'snake'
		        });
				this.infoID = this.$route.params.id;
				this.$http.get(`http://cs003.m2828.com/apis/getPage.php?path=/plist/list/${this.infoID}`).then(res => {
					this.setData(res.data);
					Indicator.close();
				});
			},
			setData(data) {
				var div = document.createElement('div');
				div.innerHTML = data;
				this.imgSrc = div.querySelector('#imgBoxInfo img').src;
				this.title = div.querySelector('.page-title').innerText;
				var list = div.querySelectorAll('.panel-songslist-item');
				this.songList = [];
				for(var i = 0; i < list.length; i++) {
					var song = {};
					song.title = list[i].querySelector('.panel-songs-item-name span').innerText;
					song.hash = list[i].id.substr(6);
					this.songList.push(song);
				};
			}
		},
		mounted() {
			this.getData();
		}
	}
</script>

<style>
	.rank-list .rank-list-title {
		background: #fff;
		box-shadow: 0 .1785rem .1785rem 0 #f4f4f4;
		color: #333;
		width: 100%;
		height: 3rem;
		text-align: center;
		height: 3rem;
		position: relative;
	}
	
	.rank-list .rank-list-title img {
		width: 20px;
		vertical-align: middle;
		position: absolute;
		left: 10px;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.rank-list .rank-list-title span {
		font-family: 'Microsoft Yahei';
		display: inline-block;
		line-height: 3rem;
	}
	
	.rank-banner {
		height: 12.5rem;
		position: relative;
	}
	
	.rank-banner img {
		width: 100%;
		height: 150%;
	}
	
	.rank-list-cont {
		margin-top: 6.5rem;
		padding: 4px 10px
	}
	
	.rank-list-cont ul {
		padding: 0;
	}
	
	.rank-list-cont ul li {
		font-family: 'Microsoft Yahei';
		border-bottom: 1px solid #eeeeee;
		padding: 0.8rem;
		text-align: left;
	}
	
	.rank-list-cont ul li .rank-index {
		padding: 0 .5rem;
		color: #999999;
	}
	
	.updata {
		position: absolute;
		bottom: -6rem;
		left: 0;
		color: #fff;
	}
</style>