<template>
  <view class="sci-fi-panel">
    <!-- 右上角关闭按钮 -->
    <view class="close-button-container">
      <button class="close-button" @click="closeTable">
        <text class="close-icon">✕</text>
      </button>
    </view>

    <!-- 顶部标题框已删除 -->

    <view class="panel-content">
		<!-- 侧边栏 -->
      <view class="sidebar">
        <uni-data-menu :localdata="localMenus" :unique-opened="true" :active="activeUrl" active-text-color="#8bc34a" @select="onSelect"></uni-data-menu>
			</view>
		<!-- 右边的表格 -->
      <view class="main-content">
			<!-- 骰子显示 -->
			<view class="game-page">
			    <DiceComponent />
			</view>

			<!-- 美军车辆火力值表 -->
			<UsaFireCarTable v-if="selectPage==='UsaFireCarTable'" @selectResult="onTableSelectResult"></UsaFireCarTable>
			<!-- 美军车辆战斗结果表，反车辆战斗结果表双方用的是同一张 -->
			<AntiCarTable v-if="selectPage==='AntiCarTable'" @selectResult="onTableSelectResult"></AntiCarTable>
			<!-- 美军反人员火力值表 -->
			<UsaFirePeopleTable v-if="selectPage==='UsaFirePeopleTable'" @selectResult="onTableSelectResult"></UsaFirePeopleTable>
			<!-- 美军反人员战斗结果表，战斗结果表双方用的是同一张 -->
			<!-- <AntiPeopleTable v-if="selectPage==='AntiPeopleTable'"></AntiPeopleTable> -->
			<!-- 美军间瞄射击表 -->
			<UsaJianTable v-if="selectPage==='UsaJianTable'" @selectResult="onTableSelectResult"></UsaJianTable>

			<!-- 苏军车辆火力值表 -->
			<UssrFireCarTable v-if="selectPage==='UssrFireCarTable'" @selectResult="onTableSelectResult"></UssrFireCarTable>
			<!-- 美军车辆战斗结果表，战斗结果表双方用的是同一张 -->
			<!-- <AntiCarTable v-if="selectPage==='AntiCarTable'"></AntiCarTable> -->
			<!-- 苏军反人员火力值表（数据假的） -->
			<UssrFirePeopleTable v-if="selectPage==='UssrFirePeopleTable'" @selectResult="onTableSelectResult"></UssrFirePeopleTable>
			<!-- 苏军反人员战斗结果表 -->
			<AntiPeopleTable v-if="selectPage==='AntiPeopleTable'" @selectResult="onTableSelectResult"></AntiPeopleTable>
			<!-- 苏军间瞄射击表 -->
			<UssrJianTable v-if="selectPage==='UssrJianTable'" @selectResult="onTableSelectResult"></UssrJianTable>

			<!-- 地形影响表 -->
			<LandformTable v-if="selectPage==='LandformTable'" @selectResult="onTableSelectResult"></LandformTable>
      </view>
    </view>
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
      	this.selectPage = e.url;
		    console.log('当前选中的表格是：', this.selectPage);
      },
      // 从子表格接收数据并再次向上抛出
      onTableSelectResult(value) {
        this.$emit('selectResult', String(value));
        console.log('子表格传递的数据是：', value);
      },
      // 新增关闭方法，用于父组件调用
      closeTable() {
        this.$emit('close');
      }
  }

};
</script>

<style lang="scss" scoped>
@import url('@/common/css/judge-table.scss');

.sci-fi-panel {
  width: 1200px; /* 根据judge-table的宽度进行调整 */
  height: 60vh; /* 调整高度为页面高度的60% */
  background: linear-gradient(145deg, #1a2e1a 0%, #0a1a0a 50%, #1a2e1a 100%); /* 深色背景 */
  border: 3px solid #4caf50;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(76, 175, 80, 0.5); /* 绿色光晕效果 */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
  overflow: hidden; /* 隐藏所有滚动条 */
  box-sizing: border-box;
}

/* 关闭按钮样式 - 从judge-table复制并调整 */
.close-button-container {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 1000;
}

.close-button {
  width: 45px;
  height: 45px;
  border-radius: 8px;
  background: linear-gradient(135deg, #d32f2f 0%, #f44336 50%, #d32f2f 100%);
  border: 2px solid #ff5722;
  color: #ffffff;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(211, 47, 47, 0.3);
}

.close-button:hover {
  background: linear-gradient(135deg, #f44336 0%, #ff5722 50%, #f44336 100%);
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(211, 47, 47, 0.4);
}

.close-button:active {
  transform: scale(0.95);
}

.close-icon {
  font-size: 18px;
  line-height: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* 面板头部样式 - 从judge-table复制并调整 */
.panel-header {
  text-align: center;
  margin-bottom: 20px;
  padding: 15px;
  background: linear-gradient(90deg, transparent 0%, rgba(76, 175, 80, 0.2) 50%, transparent 100%);
  border: 2px solid rgba(76, 175, 80, 0.4);
  border-radius: 8px;
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.panel-title {
  font-size: 28px;
  font-weight: 800;
  color: #8bc34a;
  text-shadow: none;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
  margin-bottom: 8px;
}

.military-code {
  font-size: 16px;
  color: rgba(139, 195, 74, 0.8);
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  text-transform: uppercase;
		text-align: center;
  opacity: 0.8;
}

/* 面板内容区域 - flex布局，左右两列 */
.panel-content {
  flex: 1; /* 占据剩余空间 */
  width: 100%;
  display: flex;
  flex-direction: row; /* 左右布局 */
  justify-content: flex-start;
  align-items: stretch; /* 子项高度拉伸 */
  gap: 15px; /* 间距 */
  overflow: hidden; /* 隐藏所有滚动条 */
  padding-bottom: 0; /* 底部无额外填充 */
  margin-bottom: 0;
}

.sidebar {
  flex: 0 0 250px; /* 固定宽度 */
  background: linear-gradient(145deg, rgba(20, 35, 20, 0.9) 0%, rgba(10, 20, 10, 0.9) 100%); /* 更深的科幻渐变背景 */
  border: 2px solid #8bc34a; /* 更粗、更亮的绿色边框 */
  border-radius: 8px;
  padding: 10px;
  overflow-y: auto; /* 侧边栏允许滚动 */
  box-sizing: border-box;
  color: #e8f5e8; /* 文字颜色 */
  box-shadow: 0 0 10px rgba(139, 195, 74, 0.3); /* 绿色光晕阴影 */

  /* 自定义滚动条 */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(26, 46, 26, 0.8);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
    border-radius: 4px;
  }
}

.main-content {
  flex: 1; /* 占据剩余空间 */
  background: rgba(26, 46, 26, 0.4); /* 半透明深绿背景 */
  border: 1px solid rgba(76, 175, 80, 0.3);
  border-radius: 8px;
  padding: 10px;
  overflow-y: auto; /* 主内容区域允许滚动 */
  box-sizing: border-box;
  color: #e8f5e8; /* 文字颜色 */

  /* 自定义滚动条 */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(26, 46, 26, 0.8);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
    border-radius: 4px;
  }
}

		.game-page {
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  justify-content: center;
  padding-bottom: 10px; /* 为骰子组件底部留一些空间 */
  border-bottom: 1px dashed rgba(76, 175, 80, 0.3); /* 分隔线 */
  margin-bottom: 10px;
}

/* 增强的uni-data-menu军绿色主题样式 */
.uni-data-menu {
  /* 嵌套菜单项的特殊样式 */
  ::v-deep .item-bg .uni-menu-item {
    margin-left: 15px !important;
    border-left: 3px solid rgba(139, 195, 74, 0.5) !important;
    background-color: rgba(10, 25, 10, 0.9) !important; /* 更深的嵌套背景 */
    font-size: 14px !important; /* 稍小字体用于嵌套 */
    padding-left: 15px !important; /* 增加左边距 */
  }
  
  ::v-deep .item-bg .uni-menu-item:hover {
    background-color: rgba(76, 175, 80, 0.35) !important;
    border-left-color: #a5d6a7 !important;
    transform: translateX(5px) !important; /* 更明显的移动效果 */
  }
  
  ::v-deep .item-bg .uni-menu-item.is-active {
    background-color: rgba(76, 175, 80, 0.45) !important;
    border-left-color: #8bc34a !important;
    color: #a5d6a7 !important;
  }
}
</style>
