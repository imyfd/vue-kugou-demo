<template>
	<div class="kugou-play-index">
		<div class="play-index-bg"></div>
		<div class="play-overlay"></div>
		<div class="kugou-play-index-title">
			<span @click="goBack()">
        	<img src="./goback.png" alt="">
      	</span>
			<span>{{$store.state.music.song}}</span>
		</div>
		<div class="kugou-play-lyrics">
			<img :src="$store.state.music.imgUrl" alt="">
			<div class="kugou-play-lyrics-context">
				<div class="kugou-play-lyrics-context-index" :style="{'margin-top':lrcOffset+'px'}">
					<span class="kugou-lyrics" v-for="(item,index) in this.$store.state.lrc.songLrc">{{item}}</span>
				</div>
			</div>
			<div class="kugou-player">
				<span class="time-start">0{{$store.state.playState.nowMin}}:{{$store.state.playState.nowSec}}</span>
				<span class="time-start"></span>
				<div class="kugou-player-strip" id="bar" @touchmove="moveSlide($event)" @touchend="endSlide()" @click="clickBar($event)">
					<div class="kugou-player-strip-index" :style="{'left':progressOffset+'%'}">
					</div>
				</div>
				<span class="time-end">0{{$store.state.playState.finalMin}}:{{$store.state.playState.finalSec}}</span>
			</div>
			<div class="kugou-control">
				<div class="kugou-control-box">
					<img src="./before.png" @click="pre()" />
					<img src="./pause.png" v-if="$store.state.playState.pauseLogo" @click="pause()" />
					<img src="./play.png" v-if="$store.state.playState.playLogo" @click="play()" />
					<img src="./after.png" @click="next()" />
					<img src="./mute.png" v-if="$store.state.playState.mute" @click="muted()" />
					<img src="./sound.png" v-if="$store.state.playState.sound" @click="muted()" />
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		data() {
			return {
				songTime: [],
				marginCur: 0,
				finalMins: 0,
				finalSecs: 0,
				bar: 0,
				nowTime: 0,
				preHash: [],
				preIdx: 0
			}
		},
		methods: {
			pre() {
				this.$store.dispatch('prev');
			},
			next() {
				this.$store.dispatch('next');
			},
			goBack() {
				history.go(-1);
			},
			muted() {
				let audios = document.getElementById('audioPlay');
				audios.muted = !audios.muted;
				this.$store.state.playState.mute = !this.$store.state.playState.mute;
				this.$store.state.playState.sound = !this.$store.state.playState.sound;
			},
			playState(){
				this.$store.state.playState.pause = !this.$store.state.playState.pause;
				this.$store.state.playState.play = !this.$store.state.playState.play;
				this.$store.state.playState.pauseLogo = !this.$store.state.playState.pauseLogo;
				this.$store.state.playState.playLogo = !this.$store.state.playState.playLogo;
			},
			toPause() {
				this.playState();
				let audios = document.getElementById('audioPlay');
				if(!this.$store.state.playState.pause) {
					audios.pause();
				}
			},
			toPlay() {
				this.playState();
				let audios = document.getElementById('audioPlay');
				if(this.$store.state.playState.pause) {
					audios.play();
				}
			},
			play() {
				let that = this;
				setTimeout(() => {
					that.toPlay();
					if(this.$store.state.rotate) {
						$('.gs-img').addClass('Rotation');
						this.$store.state.rotate = false;
					};
				}, 200)
			},
			pause() {
				let that = this;
				setTimeout(() => {
					that.toPause();
					if(!this.$store.state.rotate) {
						$('.gs-img').removeClass('Rotation');
						that.$store.state.rotate = true;
					};
				}, 200)
			},
			pubSlide(offS){
				let stripOff = $('.kugou-player-strip-index').offset().left; //圆圈off
				let barOff = $('#bar').offset().left; //进度条off
				let barWid = $('#bar').width();
				let mouseOff = offS;
				stripOff = mouseOff - barOff;
				if(stripOff < 0 || stripOff > barWid) {
					return
				};
				$('.kugou-player-strip-index').css('left', stripOff);
				this.nowTime = stripOff;
			},
			moveSlide(event) {
				let mouseOff = event.changedTouches[0].clientX; //鼠标off
				this.pubSlide(mouseOff);
			},
			endSlide() {
				let barWid = $('#bar').width();
				let nowtime = this.nowTime;
				let loc = (nowtime / barWid).toFixed(2);
				let audios = $('audio')[0];
				audios.currentTime = audios.duration * loc;
				$('.kugou-lyrics').removeClass("redcol");
			},
			clickBar(event){
				let mouseOff = event.clientX; //鼠标off
				this.pubSlide(mouseOff);
				this.endSlide();
			}
		},
		mounted() {
			this.$store.dispatch('play');
			this.$store.dispatch('getTime');
		},

		computed: {
			lrcOffset() {
				let Cur = this.$store.state.lrc.marginCur;
				return Cur * (-73.8);
			},
			progressOffset() {
				return this.$store.state.lrc.bar;
			}
		}
	}
</script>

<style>
	.redcol {
		color: yellow;
	}
	
	.kugou-play-index {
		margin-top: 4rem;
		margin-bottom: 4.2143rem;
		width: 100%;
		height: 100%;
	}
	
	.play-index-bg {
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
		background-position: center center;
		background-size: cover;
		-webkit-filter: blur(15px);
		position: absolute;
		top: 0;
		left: 0;
	}
	
	.kugou-play-index-title {
		background: rgba(0, 0, 0, 0);
		color: white;
		width: 100%;
		height: 3rem;
		text-align: center;
		height: 3rem;
		position: fixed;
		top: 4rem;
		z-index: 100;
	}
	
	.kugou-play-index-title img {
		width: 20px;
		vertical-align: middle;
		position: absolute;
		left: 10px;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.kugou-play-index-title span {
		font-family: '黑体';
		display: inline-block;
		line-height: 3rem;
		font-size: 1.4rem;
	}
	
	.play-overlay {
		background: rgba(0, 0, 0, .6);
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	
	.kugou-play-lyrics {
		min-width: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 999;
		height: 69%;
		max-width: 650px;
		color: #ECF0F1;
	}
	
	.kugou-play-lyrics img {
		width: 8rem;
		height: 8rem;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 100%;
	}
	
	.kugou-play-lyrics .kugou-play-lyrics-context {
		width: 100%;
		position: absolute;
		top: 9rem;
		left: 50%;
		transform: translateX(-50%);
		height: 18.4rem;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.kugou-play-lyrics .kugou-play-lyrics-context .kugou-play-lyrics-context-index {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
	
	.kugou-play-lyrics .kugou-play-lyrics-context span {
		display: block;
		width: 100%;
		height: 2.3rem;
		line-height: 2.3rem;
		text-align: center;
	}
	
	.kugou-control {
		width: 100%;
		height: 3rem;
		position: absolute;
		bottom: -2rem;
		display: flex;
		justify-content: center;
	}
	
	.kugou-control-box {
		display: flex;
		justify-content: center;
	}
	
	.kugou-control img {
		width: 2rem;
		height: 2rem;
		position: static;
		margin-left: 4rem;
		opacity: 0.8;
	}
	
	.kugou-player {
		width: 100%;
		position: absolute;
		bottom: 10%;
		display: block;
	}
	
	.kugou-player .kugou-player-strip {
		width: 70%;
		height: 16px;
		background-color: #777;
		margin: 0 auto;
		position: relative;
		border-radius: 20px;
	}
	
	.kugou-player .kugou-player-strip-index {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background-color: #3195FD;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
	}
	
	.kugou-player .time-start {
		position: absolute;
		left: 1.6rem;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.kugou-player .time-end {
		position: absolute;
		right: 1.6rem;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.lyrics-active {
		color: red;
	}
</style>