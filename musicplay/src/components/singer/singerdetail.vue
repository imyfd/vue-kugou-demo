<template>
	<div class="singer-detail">
		
		<div class="singer-detail-title">
          <img src="./goback.png" alt="" @click="goBack()">
          <span>{{title}}</span>
        </div>
        
        <div class="singer-banner">
        	<img :src="imgSrc" alt="">
        </div>
        
		<div v-for="(item,index) in songList" class="songDetail">
			<div class="songDetail-Con" @click="play(item.hash,index,item.title)">
				{{item.title}}
			</div>
		</div>
		
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui'
	
	export default {
	name: 'singerdetail',
	data() {
		return {
			infoID: '',
			songList: [],
			imgSrc: '',
			title: '',
			desp: '',

		}
	},
	methods:{
		goBack(){
		    history.go(-1);
		},
		play(hash,idx,name){
	       	
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
		
		getData(){
			Indicator.open({
		          text: '已经很努力的加载了...',
		          spinnerType: 'snake'
		    });
			this.infoID = this.$route.params.id;
			this.$http.get(`http://cs003.m2828.com/apis/getPage.php?path=/singer/info/${this.infoID}`).then((res) => {
				this.setData(res.data);
				Indicator.close();
			});
		},
		setData(data){
				var div = document.createElement('div');
				div.innerHTML = data;
				if(div.querySelector('#imgBoxInfo')) {
					this.imgSrc = div.querySelector('#imgBoxInfo img').src;
					this.title = div.querySelector('.page-title').innerText;
					this.desp = div.querySelector('#introBox p').innerText;
					this.songList = [];
					var list = div.querySelectorAll('.panel-songslist-item');
					
					for(let i = 0; i < list.length; i++) {
						var song = {};
						song.title = list[i].querySelector('.panel-songs-item-name span').innerText;
						song.hash = list[i].id.substr(6);
						this.songList.push(song)
					}
					
				} else {
					var imgSrc_A = div.querySelector('.sng_ins_1 .top img').getAttribute("_src").split('/120');
					this.imgSrc = imgSrc_A[0] + '/480' + imgSrc_A[1];
					this.title = div.querySelector('.sng_ins_1 .top .intro .clear_fix').innerText;
					this.desp = div.querySelector('#text .bordr_cen').innerText;
					this.songList = [];
					var list = div.querySelectorAll('#song_container li');
					
					for(let i = 0; i < list.length; i++) {
						var song = {};
						var song_info = list[i].querySelector('.song_hid').value.split("|");
						song.title = song_info[0];
						song.hash = song_info[1];
						this.songList.push(song);
					}
				}
		}
	},	
	mounted() {
		this.getData();
	}
}
</script>

<style>
.singer-detail .singer-detail-title{
  background: #fff;
  box-shadow: 0 .1785rem .1785rem 0 #f4f4f4;
  color: #333;
  width: 100%;
  height: 3rem;
  text-align: center;
  height: 3rem;
  position: relative;
}
.singer-detail .singer-detail-title img{
  width: 20px;
  vertical-align: middle;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.singer-detail .singer-detail-title span{
  font-family: 'Microsoft Yahei';
  display: inline-block;
  line-height: 3rem;
}
.singer-banner{
	width: 100%;
	height: 16.5rem;
}
.singer-banner img{
	width: 100%;
	height: 100%;
}
.songDetail{
	width:100%;
	text-align: left;
}
.songDetail-Con{
	margin-left: 1rem;
	padding: 0.8rem 0;
	border-bottom: solid 1px #E0E0E0;
	font-size: 0.8rem;
}
</style>