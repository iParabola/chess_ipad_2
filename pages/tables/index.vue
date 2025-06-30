<template>
<!--  <view class="rule__view">
	<view class="title">反车辆战斗结果表</view>
    <highlight-table :headers="headers" :data="data"></highlight-table>
  </view> -->
  <view>
	  <!-- <uni-row>
		  裁决查表工具
	  </uni-row> -->
	  <uni-row class="demo-uni-row" :width="nvueWidth">
		<!-- 侧边栏 -->
	  	<uni-col :span="6">
			<view>
				<uni-data-menu :localdata="localMenus" :unique-opened="true"
					:active="activeUrl" active-text-color="#409eff" @select="onSelect"></uni-data-menu>
			</view>
	  	</uni-col>
		<!-- 右边的表格 -->
		<uni-col :span="18">

			<!-- 骰子显示 -->
			<view class="game-page">
			    <DiceComponent />
			</view>

			<!-- 美军车辆火力值表 -->
			<UsaFireCarTable v-if="selectPage==='UsaFireCarTable'"></UsaFireCarTable>
			<!-- 美军车辆战斗结果表，反车辆战斗结果表双方用的是同一张 -->
			<AntiCarTable v-if="selectPage==='AntiCarTable'"></AntiCarTable>
			<!-- 美军反人员火力值表 -->
			<UsaFirePeopleTable v-if="selectPage==='UsaFirePeopleTable'"></UsaFirePeopleTable>
			<!-- 美军反人员战斗结果表，战斗结果表双方用的是同一张 -->
			<!-- <AntiPeopleTable v-if="selectPage==='AntiPeopleTable'"></AntiPeopleTable> -->
			<!-- 美军间瞄射击表 -->
			<UsaJianTable v-if="selectPage==='UsaJianTable'"></UsaJianTable>


			<!-- 苏军车辆火力值表 -->
			<UssrFireCarTable v-if="selectPage==='UssrFireCarTable'"></UssrFireCarTable>
			<!-- 美军车辆战斗结果表，战斗结果表双方用的是同一张 -->
			<!-- <AntiCarTable v-if="selectPage==='AntiCarTable'"></AntiCarTable> -->
			<!-- 苏军反人员火力值表（数据假的） -->
			<UssrFirePeopleTable v-if="selectPage==='UssrFirePeopleTable'"></UssrFirePeopleTable>
			<!-- 苏军反人员战斗结果表 -->
			<AntiPeopleTable v-if="selectPage==='AntiPeopleTable'"></AntiPeopleTable>
			<!-- 苏军间瞄射击表 -->
			<UssrJianTable v-if="selectPage==='UssrJianTable'"></UssrJianTable>

			<!-- 地形影响表 -->
			<LandformTable v-if="selectPage==='LandformTable'"></LandformTable>

		</uni-col>
	  </uni-row>

	 <!-- <uni-row style="margin-bottom: 10px;" :gutter="20">


	  </uni-row> -->
	  <!-- <UsaAntiCarTable></UsaAntiCarTable> -->
  </view>
</template>

<script>
import AntiCarTable from './anti-car-table.vue';
import UssrFireCarTable from './ussr-fire-car-table.vue';
import UsaFireCarTable from './usa-fire-car-table.vue';
import AntiPeopleTable from './anti-people-table.vue';
import UssrFirePeopleTable from './ussr-fire-people-table.vue';
import UsaJianTable from './usa-jian-table.vue';
import UsaFirePeopleTable from './usa-fire-people-table.vue';
import UssrJianTable from './ussr-jian-table.vue';
import LandformTable from './landform-table.vue';

import DiceComponent from './dice.vue';

export default {
  components: {
	AntiCarTable,
	UssrFireCarTable,
	UsaFireCarTable,
	AntiPeopleTable,
	UssrFirePeopleTable,
	UsaJianTable,
	DiceComponent,
	UsaFirePeopleTable,
	UssrJianTable,
	LandformTable,
  },
  data() {
    return {
		// 选择页面的变量
		selectPage: 'AntiCarTable',

		nvueWidth: '100%',
		      localMenus: [
		        {
		          text: '蓝打红（美方单位攻击）',
		          children: [
		            {
		              text: '美方直瞄射击',
		              children: [
		                {
		                  text: '攻击车辆',
		                  children: [
                        {
                          text: '反车辆火力值表',
                          url: 'UsaFireCarTable',
                        },
		                    {
		                      text: '反车辆战斗结果表',
		                      url: 'AntiCarTable',
		                    }
		                  ]
		                },
                    {
                      text: '攻击人员',
                      children: [
                        {
                          text: '反人员火力值表',
                          url: 'UsaFirePeopleTable',
                        },
                        {
                          text: '反人员战斗结果表',
                          url: 'AntiPeopleTable',
                        }
                      ]
                    }
                          ]
                        },
                  {
                    text: '美方间瞄射击',
                    children: [
                      {
                        text: '美方间瞄射击表',
                        url: 'UsaJianTable',
                      },
                    // {
                    //   text: '美方间瞄战斗结果表',
                    //   url: 'AntiCarTable',
                    // }
                    ]
                  },
		          ]
		        },
		        {
		          text: '红打蓝（苏方单位攻击）',
		          children: [
		            {
		              text: '苏方直瞄射击',
		              children: [
		                {
		                  text: '攻击车辆',
		                  children: [
		                    {
		                      text: '反车辆火力值表',
		                      url: 'UssrFireCarTable',
		                    },
							{
							  text: '反车辆战斗结果表',
							  url: 'AntiCarTable',
							}
		                  ]
		                },
		        		{
		        		  text: '攻击人员',
		        		  children: [
		        		    {
		        		      text: '反人员火力值表',
		        		      url: 'UssrFirePeopleTable',
		        		    },
							{
							  text: '反人员战斗结果表',
							  url: 'AntiPeopleTable',
							}
		        		  ]
		        		}
		              ]
		            },
		        	{
		        	  text: '苏方间瞄射击',
		        	  children: [
		        	    {
		        	      text: '苏方间瞄射击表',
		        	      url: 'UssrJianTable',
		        	    },
		        		// {
		        		//   text: '美方间瞄战斗结果表',
		        		//   url: 'AntiCarTable',
		        		// }
		        	  ]
		        	},
		          ]
		        },
		        {
					text: '打开地形影响表',
					url: 'LandformTable',
				}
		      ],
		      activeUrl: '',
		}
  },
  methods: {
      onSelect(e) {
      	this.selectPage = e.url
		    console.log(this.selectPage)
      },
  }

};
</script>

<style lang="scss" scoped>
@import url('@/common/css/judge-table.scss');
.rule__view {

	.title {
		text-align: center;
		height: 40px;
		line-height: 40px;
		font-weight: bolder;
		background-color: #ffffff;
		font-size: $uni-font-size-title;
		color: #000000;
	}

	.demo-uni-row {
		margin-bottom: 10px;
		/* QQ、抖音小程序文档写有 :host，但实测不生效 */
		/* 百度小程序没有 :host，需要设置block */
		/* #ifdef MP-TOUTIAO || MP-QQ || MP-BAIDU */
		//display: block;
		/* #endif */

		.game-page {
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  justify-content: center;
		  height: 100vh;
		  background-color: #f0f0f0;
		}
	}

	page{
	    background-color: #ededed;
	}
	.user-box{
	    background-color: #fff;
	}


}
</style>
