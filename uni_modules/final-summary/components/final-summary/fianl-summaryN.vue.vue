<template>
 <view>
  <uni-popup ref="popup">
   <view class="chart-view">
    <view class="column-view">
     <view class="charts-box">
      <qiun-data-charts type="column" :opts="opts" :chartData="columnChartData" />
      <view style="width: 100%; text-align: center; margin-top: 30px">
       红蓝军各回合得分情况
      </view>
     </view>
     <view class="charts-box-pie" style="margin-top: 20px">
      <qiun-data-charts type="pie" :opts="pieOpts" :chartData="pieChartData" />
      <view style="width: 100%; text-align: center; margin-top: 30px">
       红蓝军总得分比例
      </view>
     </view>
    </view>
   </view>
  </uni-popup>
 </view>
</template>

<script>
export default {
 name: 'final-summary',
 data() {
  return {
   chartData: {},
   opts: {
    color: [
     '#EE6666',  // 红军颜色
     '#1890FF',  // 蓝军颜色
    ],
    padding: [15, 15, 0, 5],
    enableScroll: true,
    legend: {},
    xAxis: {
     disableGrid: true,
     scrollShow: true,
     itemCount: 4
    },
    yAxis: {
     data: [
      {
       min: 0
      }
     ]
    },
    extra: {
     column: {
      type: 'group',
      width: 30,
      activeBgColor: '#000000',
      activeBgOpacity: 0.08
     }
    }
   },
   pieChartData: {},
   pieOpts: {
    color: ['#EE6666', '#1890FF'],  // 红军、蓝军颜色
    padding: [5, 5, 5, 5],
    enableScroll: false,
    extra: {
     pie: {
      activeOpacity: 0.5,
      activeRadius: 10,
      offsetAngle: 0,
      labelWidth: 15,
      border: false,
      borderWidth: 3,
      borderColor: '#FFFFFF'
     }
    }
   },
   categories: [],
   columnSeries: [
    {
     name: '红军',
     data: []
    },
    {
     name: '蓝军',
     data: []
    }
   ],
   columnChartData: {},
   pieData: [],
   redTotalScore: 0,
   blueTotalScore: 0
  };
 },
 props: {
  dataArray: {
   type: Array,
   default() {
    return [];
   }
  },
  round: {
   type: Number,
   default: 0
  },
  campData: {
   type: Array,
   default() {
    return [];
   }
  }
 },
 watch: {
  dataArray: {
   handler(newVal) {
    this.processData(newVal);
   }
  },
  round: {
   handler(newVal) {
    this.categories = [];
    for (let i = 1; i <= newVal; i++) {
     this.categories.push('回合' + i);
    }
    this.getServerData();
   }
  }
 },
 methods: {
  open() {
   this.$refs.popup.open();
  },

  // 处理数据，提取红蓝军每回合得分和总得分
  processData(data) {
   // 初始化数据
   this.columnSeries[0].data = new Array(this.categories.length).fill(0);
   this.columnSeries[1].data = new Array(this.categories.length).fill(0);
   this.redTotalScore = 0;
   this.blueTotalScore = 0;

   // 分析数据
   for (let item of data) {
    // 确定阵营
    const isRedCamp = item.campId === this.campData[0].campId;
    const campIndex = isRedCamp ? 0 : 1;

    // 处理总得分
    if (item.score !== -1) {
     if (isRedCamp) {
      this.redTotalScore += Number(item.score);
     } else {
      this.blueTotalScore += Number(item.score);
     }
     continue;
    }

    // 处理每回合得分
    if (item.scores) {
     const scores = item.scores.split(',').map(Number);
     for (let i = 0; i < scores.length && i < this.categories.length; i++) {
      this.columnSeries[campIndex].data[i] += scores[i];
     }
    }
   }

   // 更新饼图数据
   this.pieData = [
    { name: this.campData[0]?.campName || '红军', value: this.redTotalScore },
    { name: this.campData[1]?.campName || '蓝军', value: this.blueTotalScore }
   ];

   // 更新图表
   this.getServerData();
   this.getPieServerData();
  },

  getServerData() {
   this.columnChartData = {
    categories: this.categories,
    series: this.columnSeries
   };
  },

  getPieServerData() {
   this.pieChartData = {
    series: [{
     data: this.pieData
    }]
   };
  }
 }
};
</script>

<style lang="scss" scoped>
.chart-view {
 width: 1200px;
 height: 80vh;
 background-color: #ffffff;
 display: flex;
 flex-direction: column;
 align-items: center;
 padding: 50px;
}

.column-view {
 width: 100%;
 height: 100%;
 display: flex;
 flex-direction: column;
 align-items: center;
}

.charts-box {
 width: 800px;
 height: 300px;
 margin-bottom: 50px;
}

.charts-box-pie {
 width: 600px;
 height: 300px;
}
</style>