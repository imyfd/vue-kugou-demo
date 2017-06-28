<template>
	<div class="singer-list">
		<div class="singer-list-title">
          <img src="./goback.png" alt="" @click="goBack()">
          <span>{{title}}</span>
        </div>
        <div class="singer-list-container">
			<div v-for="(item,index) in singerList" class="singer-list-con">
				<router-link :to="item.location" class="song-a">
					<img :src="item.imgSrc" alt="" />
					<span>{{item.name}}</span>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui'
	export default{
		name:"singerlist",
		data(){
			return{
				infoID:'',
				singerList:[],
				title:''
			}
		},
		methods:{
			goBack(){
		    	history.go(-1);
		   	},
		   	getData(){
		   		Indicator.open({
		          text: '已经很努力的加载了...',
		          spinnerType: 'snake'
		       	});
				this.infoID = this.$route.params.id;
				this.$http.get(`http://cs003.m2828.com/apis/getPage.php?path=/singer/list/${this.infoID}`).then((res)=> {
		        	this.setData(res.data);
		        	Indicator.close();
		       });
		   	},
		   	setData(data){
		   		var div = document.createElement('div');
			    div.innerHTML = data;
			    this.title = div.querySelector('.page-title').innerText;
			    var list = div.querySelectorAll('#panelList li');
			    this.singerList = [];
			    for (var i = 0; i < list.length; i++) {
			        var singer = {};
			        singer.imgSrc = list[i].querySelector('.panel-img-left img').getAttribute('_src');
			        singer.name = list[i].querySelector('.panel-img-content-first').innerText;
			        singer.location = '/singer/info/' + list[i].querySelector('a').href.substr(31);
			        this.singerList.push(singer);
			    };
		   	}	
		},
		mounted(){
			this.getData();
		}
	}
</script>

<style>
.singer-list .singer-list-title{
  background: #fff;
  box-shadow: 0 .1785rem .1785rem 0 #f4f4f4;
  color: #333;
  width: 100%;
  height: 3rem;
  text-align: center;
  height: 3rem;
  position: relative;
}
.singer-list .singer-list-title img{
  width: 20px;
  vertical-align: middle;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.singer-list .singer-list-title span{
  font-family: 'Microsoft Yahei';
  display: inline-block;
  line-height: 3rem;
}
.singer-list-container{
	padding-left: 0.8rem;
	margin-bottom: 4rem;
}
.singer-list-con{
	display: flex;
	align-items: center;
	border-bottom:  solid 1px #E0E0E0;
}
.singer-list-con img{
	width: 5rem;
	height: 5rem;
}
.singer-list-con span{
	margin-left: 0.8rem;
	color: #333;
}
.song-a{
	display: flex;
    align-items: center;
    padding-left: 0.8rem;
}
</style>