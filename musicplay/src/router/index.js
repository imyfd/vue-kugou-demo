import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import search from '@/components/search/search'
import playIndex from '@/components/playindex/playindex'
import list from '@/components/list/list.vue'
import newsong from '@/components/newsong/newsong'
import rank from '@/components/rank/rank'
import rankList from '@/components/rank/ranklist'
import plist from '@/components/plist/plist'
import plist_cont from '@/components/plist/plist_cont'
import singer from '@/components/singer/singer'
import singerlist from '@/components/singer/singerlist'
import singerdetail from '@/components/singer/singerdetail'
import history from '@/components/history/history'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      children:[
      {
      	name:'banner',
      	path: '/',
      	name: 'list',
      	component: list,
      	children:[
      		{
      			path: '/',
      			component: newsong
      		},
      		{
      			path: '/phb',
      			component: rank
      		},
      		{
      			path: '/gd',
      			component: plist
      		},
      		{
      			path: '/gs',
      			component: singer
      		},
      		{
      			path: 'ls',
      			component: history
      		}
      	]
      },
      {
        name:'搜索',
        path:'/search',
        component:search
      },
      {
       	name:'歌词',
       	path:'/playindex',
       	component:playIndex
      },
	    {
	    	path:'/rank/:id',
	      component:rankList
	    },{
	      path:'/plist/info/:id',
	      component:plist_cont
	    },{
	       	path:'/singer/:id',
	       	component:singerlist
	    },{
	       	path:'/singer/info/:id',
	       	component:singerdetail
	    }
      ]
    }
  ]
})
