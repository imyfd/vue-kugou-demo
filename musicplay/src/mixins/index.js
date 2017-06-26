module.exports = {
  'PLAY_AUDIO':{
    methods:{
      playAudio(index){
        console.log(index);
      }
    }
  },
  'INIT':{
    data(){
      return {
        songList:[]
      }
    },
    created(){
      this.getList();
    }
  }
};
