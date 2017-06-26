<template>
	<div>
		<div class="singer-container">
				<div class="singer-cont" v-for="(item,index) in $store.state.singerList">
					<router-link :to="item.id">
						{{item.name}}
					</router-link>
				</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"singer",
		data(){
			return {
				
			}
		}
	}
</script>

<style>
	.singer-container{
		width: 100%;
		overflow: hidden;
		margin-bottom: 4rem;
	}
	.singer-cont{
		width: 88%;
		margin: 0.6rem auto;
		text-align: left;
		margin-left: 0.8rem;
		background-color: #f5f5f5;
		padding:0.4rem 1rem;
		border-radius: 0.6rem;
		color: #333;
		border: solid 1px #cbcbcb;
	}
</style>