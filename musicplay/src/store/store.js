
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
Vue.use(Vuex);
Vue.use(VueResource)

 const store = new Vuex.Store({
    state: {
        sideBarOpened: true,
        playState:{
        	load:false,
        	play:false,
        	pause:true,
        	playLogo:false,
        	pauseLogo:true,
        	mute:false,
        	sound:true,
        	rotate:false,
        	nowCur:0,
        	nowMin:0,
        	nowSec:0,
        	finalMin:0,
        	finalSec:0
        },
        music:{
        	hash:"",
        	name:"",
        	song:"",
        	imgUrl:"",
        	songUrl:"",
        	songLen:0,
        	preSong:"",
        	preSongidx:0,
        	nextSong:"",
        	hty:''
        },
        lrc:{
        	songTime:[],
        	songLrc:[],
        	marginCur:0,
        	finalMins:0,
        	finalSecs:0,
        	bar:0
        },
        list:[
		    {
		      url:'/',
		      name:'新歌'
		    },{
		      url:'phb',
		      name:'排行榜'
		    },{
		      url:'gd',
		      name:'歌单'
		    },{
		      url:'gs',
		      name:'歌手'
		    },{
		      url:'ls',
		      name:'最近播放'
		    }
		],
		singerList:[
			{
				name:'热门歌手',
				id:'/singer/88'
			},
			{
				name:'华语男歌手',
				id:'/singer/1'
			},
			{
				name:'华语女歌手',
				id:'/singer/2'
			},
			{
				name:'华语组合',
				id:'/singer/3'
			},
			{
				name:'日韩男歌手',
				id:'/singer/4'
			},
			{
				name:'日韩女歌手',
				id:'/singer/5'
			},
			{
				name:'日韩组合',
				id:'/singer/6'
			},
			{
				name:'欧美男歌手',
				id:'/singer/7'
			},
			{
				name:'欧美女歌手',
				id:'/singer/8'
			},
			{
				name:'欧美组合',
				id:'/singer/9'
			}
			
		],
		rankList:"",
		pList:"",
        xgList:[
	    {
	      name:'周杰伦 - 不能说的秘密 (《不能说的秘密》电影插曲)',
	      hash:'6859F85541A3D58FA441D7B4B3E64F38'
	    },{
	      name:'陈奕迅 - 陀飞轮',
	      hash:'b785c002646f380b14d6d85bd00ec98b'
	    },{
	      name:'徐佳莹 - 身骑白马',
	      hash:'ae2a8e8e0a86f945b33395934c99aedc'
	    },{
	      name:'狮子合唱团 - 最后的请求',
	      hash:'40444478B5229EAA5F0CDF28A8E5E770'
	    },{
	      name:'林俊杰 - 爱要怎么说出口(Live)',
	      hash:'A860533D41C9C7DA676C6EB81D5E7478'
	    },{
	      name:'李荣浩 - 有一个姑娘',
	      hash:'966A1CA9852EDA3930D5829DEF960608'
	    },{
	      name:'杨宗纬 - 流浪记',
	      hash:'1B2A2489DDBE3AA1EF72B5A6CC4A64AD'
	    },{
	      name:'薛之谦、何洁 - 有没有(Live)',
	      hash:'d166caf0010e0a3d6139f17ecfdf598f'
	    },{
	      name:'林俊杰 - 不为谁而作的歌',
	      hash:'2A57E986FADDD315C5D5B68488540F8F'
	    },{
	      name:'林俊杰 - 修炼爱情',
	      hash:'F31183001093A25D5E5B58E4139D6C6F'
	    },{
	      name:'邓紫棋 - A.I.N.Y',
	      hash:'6C8F73900A5928730B189D434CDB8752'
	    },{
	      name:'周杰伦 - 搁浅',
	      hash:'F17ADEE3D1B3B97FBAB27597D845C650'
	    },{
	      name:'林俊杰 - 可惜没如果',
	      hash:'E74E56BE4097507F1ABC204E7DC00D9A'
	    },{
	      name:'周杰伦 - 晴天',
	      hash:'3BD5C05B9F8D082BA3C9425A1A712394'
	    },{
	      name:'庄心妍 - 好可惜',
	      hash:'A1580270012022F499684F4953F7E5C5'
	    },{
	      name:'林俊杰 - 我怀念的(live)',
	      hash:'571AED82C90C7F7C0E9DDE4F354225CA'
	    },{
	      name:'邓紫棋 - 睡公主',
	      hash:'a68cdd18fea27798e18d531048379c49'
	    }
	  ]
        //放置公用状态
    },
    getters: {
        changeState: state => {
        }
    },
    mutations: {
        	commitName(state,name){
        		state.music.name = name;
        	},
        	commitSong(state,song){
        		state.music.song = song;
        	},
        	commitimgUrl(state,imgUrl){
        		state.music.imgUrl = imgUrl;
        	},
        	commitsongUrl(state,songUrl){
        		state.music.songUrl = songUrl;
        	},
		    commitsongLen(state,songLen){
        		state.music.songLen = songLen;
        	},
        	autoPlay(state,eles){
			    if(state.playState.play == false){
			    	eles.autoplay = true;
			    }
        	},
        	changeImg(state){
				let songBckg = $('.play-index-bg');
				let img = state.music.imgUrl;
				songBckg.css('background-image','url('+img+')');
        	},
        	getsongLen(state,el){
				let songLens = state.music.songLen;
			    let min = parseInt(songLens/60);
			    let sec = parseInt(songLens%60);
			    state.playState.finalMin = min;
			    if(sec<10){
			    	sec = '0'+sec
			    }
			    state.playState.finalSec = sec;
        		
		    	setInterval(()=>{
		    		state.playState.nowCur = parseInt(el.currentTime);
		    			let nowmin = parseInt(state.playState.nowCur/60);
		    			state.playState.nowMin = nowmin;
		    			let nowsec = parseInt(songLens%60);
		    			state.playState.nowSec = nowsec;
		    			if(state.playState.nowCur < 60){
		    				if(state.playState.nowCur<10){
					    		state.playState.nowCur = '0'+state.playState.nowCur;
					    	}
		    				state.playState.nowSec = state.playState.nowCur;
		    				state.playState.nowMin = 0;
		    			}else if(state.playState.nowCur >= 60){
			    			let nowmin = parseInt(state.playState.nowCur/60);
			    			let nowsec = parseInt(state.playState.nowCur%60);
			    			if(nowsec<10){
					    		nowsec = '0'+nowsec;
					    	}
			    			state.playState.nowMin = nowmin;
			    			state.playState.nowSec = nowsec;
		    			}
		    	},500)
		    },
		    setLrc(state,data){
				let hashs = state.music.hash;
				var arr = new Array();
				var arrs = new Array();
				
				let datas = data;
				
			      	let Timestrs = new Array();
			        let lrcstrs = new Array();
		          
					Timestrs = datas.split("\r\n");
					lrcstrs = datas.split("\r\n");
					for (let i=0;i<Timestrs.length ;i++ ) 
					{ 
						let time=Timestrs[i].substring(2,6); //分割后的字符输出 
						let min=parseInt(time.substring(0,1));
						let sec = parseInt(time.substr(2,3));
						if(min>0){
							sec += min * 60;
						};
						arrs.push(sec);
					};
					state.lrc.songTime = arrs;
					
					for (let i=0;i<lrcstrs.length;i++ )
					{ 
						var songLrcs=lrcstrs[i].substring(10); //分割后的字符输出 
						arr.push(songLrcs);
					};
					let lastLrc = "......";
					state.lrc.songLrc=arr;
					state.lrc.songLrc.push(lastLrc);
					
				setInterval(()=>{
				    let audios=document.getElementById('audioPlay');
					let curTime = parseInt(audios.currentTime);
					let timeArr = state.lrc.songTime;
					let lrcEl = $('.kugou-play-lyrics-context-index');
			    	for(let idx=0;idx<timeArr.length;idx++){
			    		if(timeArr[idx] > curTime){
			    			state.lrc.marginCur = idx-1;
			    			break;
			    		}
			    	};
			    },500);
			    
				
		    }
    },
    actions: {
        getSong({commit,state}, hash){
		      Vue.http.get(`http://cs003.m2828.com/apis/getKugouSong.php?hash=${hash}`).then(res=> {
		        	let jsonObj = res.data;
					let name = jsonObj.choricSinger;
					let song = jsonObj.songName;
					let imgUrl = jsonObj.imgUrl.split('{size}').join('100');
					let songUrl = jsonObj.url;
					let songLen = jsonObj.timeLength;
					commit('commitName',name);
					commit('commitSong',song);
					commit('commitimgUrl',imgUrl);
					commit('commitsongUrl',songUrl);
					commit('commitsongLen',songLen);
					let ele = document.getElementById('audioPlay');
					commit('getsongLen',ele);
					commit('changeImg');
		      });
	    },
        getLrc({commit,state}, hash){
        	let songList = state.preSong;
            Vue.http.get('http://cs003.m2828.com/apis/getLrc.php?hash='+hash).then(res=> {
			        commit('setLrc',res.data);
		   });
        },
        
        getTime({commit,state},hash){
        	
				setTimeout(()=>{
					let len=state.lrc.songTime.length;
			    	let lastTime = state.lrc.songTime[len-2] + 3;
			    	let timeArr=state.lrc.songTime;
			    	
			    	timeArr.splice(state.lrc.songTime.length-1,state.lrc.songTime.length,lastTime);
			    	state.lrc.songTime=timeArr;
				},1000);
				var eles = document.getElementById("audioPlay");
				
				setInterval(()=>{
					let allSec = state.music.songLen;
	       			state.lrc.bar = parseInt(parseInt(eles.currentTime)/allSec*100);
				},1000);
        },
        
		runRotate({commit,state}){
		    setTimeout(() => {
				$('.gs-img').addClass('Rotation');
					state.rotate = false;
				},200);
		},
		
		prev({dispatch,commit,state}){
			let songList = state.music.preSong;
			if (state.music.preSongidx == 0) {
	        	state.music.preSongidx = songList.length-1;
	        	localStorage.setItem('index',songList.length-1);
		    } else {
		        --state.music.preSongidx;
		        localStorage.setItem('index',state.music.preSongidx);
		    };
		    let hash=songList[state.music.preSongidx].hash;
		    dispatch('getSong',hash);
		    dispatch('getLrc',hash);
			let eles = document.getElementById("audioPlay");
		    commit('autoPlay',eles);
		    commit('getsongLen',eles);
		},
		
		next({dispatch,commit,state}){
			let songList = state.music.preSong;
			if (state.music.preSongidx == songList.length-1) {
	        	state.music.preSongidx = 0;
	        	localStorage.setItem('index',0)
		    } else {
		        ++state.music.preSongidx;
		        localStorage.setItem('index',state.music.preSongidx);
		    };
		    let hash=songList[state.music.preSongidx].hash;
		    dispatch('getSong',hash);
		    dispatch('getLrc',hash);
			let eles = document.getElementById("audioPlay");
		    commit('autoPlay',eles);
		    commit('getsongLen',eles);
		},
		
		play({dispatch,state}){
			let songList = JSON.parse(localStorage.getItem('playItem'));
			if(songList == ""){
				return
			}else{
				let hash=songList[localStorage.getItem('index')].hash;
			    dispatch('getSong',hash);
			    dispatch('getLrc',hash);
			};
		},
		
		playHistory({dispatch,state},arr){
			let hash = arr[0];
			let name = arr[1];
			
			if(localStorage.getItem('historyArr') == null || localStorage.getItem('historyArr') == ''){
				localStorage.setItem('historyArr','');
				let newArr = localStorage.getItem('historyArr');
				let res = []
			    for (let i = 0; i < newArr.length; i++) {
			     res.push(newArr[i])
			    }
				state.music.hty = res;
				let obj={'hash':hash,'name':name};
				state.music.hty.push(obj);
				localStorage.setItem('historyArr',JSON.stringify(state.music.hty));
			}else{
				let newArr = JSON.parse(localStorage.getItem('historyArr'));
				let res = []
				if(newArr[newArr.length-1].hash == hash){
					return
				}else{
				    for (let i = 0; i < newArr.length; i++) {
				    res.push(newArr[i])
				}
			};
			state.music.hty = res;
			    
			if(state.music.hty.length > 20){
				let hty = state.music.hty;
				hty.splice(0,1);
			};
			
			let obj={'hash':hash,'name':name};
			state.music.hty.push(obj);
			
			dispatch('deleteSameobj',state.music.hty);
			localStorage.setItem('historyArr',JSON.stringify(state.music.hty));
			
			}
			
		},
		
		deleteSameobj({dispatch,state},obj){
			let objArr = obj;
			for(let i=0;i<state.music.hty.length;i++){
				for(let j=i+1;j<objArr.length;j++){
					if(objArr[i].hash == objArr[j].hash){
						objArr.splice(i,1);
					}
				}	
			}
		}
    },
    modules: {
        //引入某一个state的以上集合的模块，会自动分别填充到上面，使得结构更加清晰
    }
});

export default store
