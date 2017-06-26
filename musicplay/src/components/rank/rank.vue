<template>
	<div class="rank">
		<ul>
			<li v-for="(item,index) in songList">
				<router-link :to="item.location">
					<div class="rank-container">
						<img :src="item.imgUrl" :title="item.title" class="rank-logo" alt="" @click="text()">
						<span @click="text(index)">{{item.title}}</span>
						<img src="./arrow_icon.png" alt="" class="rank-next">
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "rank",
		data() {
			return {
				imgSrc: '',
				songList: []
			}
		},
		methods: {
			text(index) {
				let idx = this.songList[index].location;
				let info = idx.substr(6);
				this.$store.state.rankList = info;
			},
			getData() {
				this.$http.get('http://cs003.m2828.com/apis/getPage.php?path=/rank/list').then(res => {
					this.setData(res.data)

				});
			},
			setData(data) {
				var div = document.createElement('div');
				div.innerHTML = data;
				var list = div.querySelectorAll('.panel-img-list li');
				for(var i = 0; i < list.length; i++) {
					var rank = {};
					rank.title = list[i].querySelector('.panel-img-content p').innerText;
					rank.imgUrl = list[i].querySelector('.panel-img-left img').getAttribute('_src');
					rank.location = "/rank/" + list[i].querySelector('a').href.substr(29);
					this.songList.push(rank);
				}
			}
		},
		mounted() {
			this.getData();
		}
	}
</script>

<style>
	.rank {
		margin-bottom: 4.2143rem;
	}
	
	.rank-container {
		width: 100%;
		height: 100%;
	}
	
	.rank ul {
		padding: 4px 10px;
		list-style: none;
	}
	
	.rank ul li {
		width: 100%;
		padding: 10px 0;
		border-bottom: 1px solid #E5E5E5;
		font-family: 'Microsoft Yahei';
		position: relative;
	}
	
	.rank ul li img {
		float: left;
		margin-top: 0.3rem;
	}
	
	.rank ul li .rank-logo {
		width: 5.3751rem;
		height: 5.3751rem;
		vertical-align: middle;
	}
	
	.rank ul li span {
		display: block;
		vertical-align: middle;
		margin-left: 1rem;
		line-height: 6rem;
		text-align: left;
		margin-left: 7rem;
	}
	
	.rank ul li .rank-next {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
	}
</style>