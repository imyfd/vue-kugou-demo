<template>
	<div class="kugou-child-search">
		<div class="kugou-child-search-title">
			<keep-alive>
				<router-link>
					<img src="./goback.png" alt="">
				</router-link>
			</keep-alive>
			<div>
				<span>
	        	<img src="./goback.png" alt="" @click="goBack()">搜索
	      	</span>
			</div>
		</div>
		<div class="search-input">
			<input type="text" placeholder="歌手/歌名/拼音" v-model="inpVal" @keydown.enter="forSearch(inpVal)">
			<span @click="forSearch(inpVal)">搜索</span>
		</div>
		<div class="kugou-rm">
			<span>{{searchTitle}}</span>
			<div class="kugou-rm-list">
				<ul>
					<li v-if="hotSeen" v-for="(item,index) in hotList" @click="forSearch(item.keyword)">{{item.keyword}}</li>
					<li v-if="searchSeen" v-for="(item,index) in searchList" @click="takehash(index)">{{item.filename}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import { INIT, PLAY_AUDIO } from '../../mixins'
	import { mapGetters } from 'vuex'
	import { Indicator } from 'mint-ui'

	export default {
		data() {
			return {
				hotSeen: true,
				searchSeen: false,
				inpVal: '',
				searchTitle: "最近热门",
				hotList: [],
				searchList: [],
				songName: "金曲捞"
			}
		},
		methods: {
			forSearch(val) {
				Indicator.open({
		          text: '已经很努力的加载了...',
		          spinnerType: 'fading-circle'
		        });
				if(val == "") {
					return
				};
				let that = this;
				let page = 1;
				this.$http.get('http://cs003.m2828.com/apis/proxy.php?val=&url1=http://mobilecdn.kugou.com/api/v3/search/song?keyword=' + val + '&page=2&pagesize=30&url2=').then(res => {
					if(val == '') {
						return
					};
					let datas = res.data.data.info;
					this.searchList = datas;
					this.searchTitle = "共搜到" + datas.length + "条结果";
          			Indicator.close();
				});
				this.hotSeen = false;
				this.searchSeen = true;
			}, //搜索歌曲
			takehash(index) {
				let hash = this.searchList[index].hash;
				let name = this.searchList[index].filename;
				localStorage.setItem('msg',hash);
				localStorage.setItem('index',index);
				localStorage.setItem('playItem',JSON.stringify(this.searchList));
				this.$store.dispatch('getSong', hash);
				this.$store.dispatch('playHistory',[hash,name]);
	       		this.$store.state.music.hash = hash;
	       		this.$store.state.playState.pauseLogo = true;
	       		this.$store.state.playState.playLogo = false;
	       		this.$store.state.playState.pause = true;
	       		this.$store.state.playState.play = false;
	       		this.$store.state.music.preSong = this.searchList;
	       		this.$store.state.music.preSongidx = index;
	       		this.$store.dispatch('runRotate');
	       		let audios = document.getElementById('audioPlay');
	       		audios.autoplay=true;
			},
			goBack() {
				history.go(-1);
			}
			//用hash获取歌曲信息

		},
		mounted() {
			Indicator.open({
		          text: '已经很努力的加载了...',
		          spinnerType: 'fading-circle'
		    });
			let that = this;
			this.$http.get('http://cs003.m2828.com/apis/proxy.php?val=&url1=http://mobilecdn.kugou.com/api/v3/search/hot?plat=0&count=30&url2=', {

			}).then(function(res) {
				let ff = (res.data).data.info;
				that.hotList = ff;
          		Indicator.close();
			})
			
          	console.log('ooo');
		} //调用热门歌曲
	}
</script>

<style>
	.kugou-child-search {
		width: 100%;
	}
	
	.kugou-child-search-title {
		background: #fff;
		box-shadow: 0 .1785rem .1785rem 0 #f4f4f4;
		color: #333;
		width: 100%;
		height: 3rem;
		text-align: center;
		height: 3rem;
		position: relative;
	}
	
	.kugou-child-search img {
		width: 20px;
		vertical-align: middle;
		position: absolute;
		left: 10px;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.kugou-child-search .kugou-child-search-title span {
		display: inline-block;
		line-height: 3rem;
	}
	
	.search-input {
		padding: 10px;
	}
	
	.search-input input {
		width: 78%;
		height: 3rem;
		border: 1px solid #E5E5E5;
		border-radius: 4px;
		outline: none;
		font-size: 0.8rem;
		padding-left: 0.4rem;
		box-sizing: border-box;
		vertical-align: middle;
	}
	
	.search-input span {
		display: inline-block;
		width: 20%;
		height: 2rem;
		background: #2BA2FA;
		color: white;
		text-align: center;
		border-radius: 4px;
		line-height: 2rem;
		vertical-align: middle;
	}
	
	.kugou-rm {
		padding: 10px;
		font-family: 'Microsoft Yahei';
		margin-bottom: 4.2143rem;
		overflow-y: auto;
		text-align: left;
	}
	
	.kugou-rm span {
		display: inline-block;
		color: #2CA3F5;
		font-size: .8571rem;
	}
	
	.kugou-rm .kugou-rm-list {
		border-top: 1px solid #ccc;
	}
	
	.kugou-rm .kugou-rm-list ul li {
		padding: 26px 0;
		border-bottom: 1px solid #E5E5E5;
		list-style: none;
		font-size: 1rem;
	}
</style>