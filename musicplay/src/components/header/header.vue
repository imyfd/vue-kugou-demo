<template>
    <div class="kugou-header">

               <router-link to="/" class="kugou-header-logo">
                 <img src="./logo.png" alt="">
               </router-link>
                 <div>
                   <span>下载酷狗</span>
                 </div>
                 
				<router-link to="/search" class="kugou-header-search">
	               <img src="./search.png" alt="">
	            </router-link>
    </div>
</template>

<script>
</script>

<style>
  .kugou-header{
    width: 100%;
    height: 4rem;
    background: #2CA2F9;
    padding-top: .0357rem;
    display: flex;
    justify-content:space-between;
    position: relative;
    z-index: 99;
    font-family: 'Microsoft Yahei';
  }

  .kugou-header .kugou-header-logo{
    display: inline-block;
    width: 7.286rem;
    height: 1.7143rem;
    position: absolute;
    top:1.9rem;
    left: .7143rem;
    transform: translateY(-50%);
  }
  .kugou-header  .kugou-header-logo img{
    width: 9rem;
  }

  .kugou-header>div span{
    display: block;
    width: 6rem;
    height: 2rem;
    line-height: 2rem;
    border: 1px solid #fff;
    border-radius: .3571rem;
    text-align: center;
    color: #fff;
    font-size: .9rem;
    position: absolute;
    top:2.1rem;
    left:11rem;
    transform: translateY(-50%);

  }
  .kugou-header .kugou-header-search{
      width: 1.4rem;
      height: 1.4rem;
      position: absolute;
      top: 2.1rem;
      right: .7143rem;
      cursor: pointer;
      position: absolute;
      transform: translateY(-50%);
  }
  .kugou-header .kugou-header-search img{
    width: 100%;
    height: 100%;
  }
</style>
