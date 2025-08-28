<template>
	<view>
		<uni-popup ref="popup">
			<view class="chart-panel">
				<!-- 右上角关闭按钮 -->
				<view class="close-button-container">
					<button class="close-button" @click="close">
						<text class="close-icon">✕</text>
					</button>
				</view>

				<view class="panel-header">
					<view class="panel-title">战局总览</view>
					<view class="military-code">BATTLE SUMMARY REPORT</view>
				</view>

				<view class="panel-content">
					<view class="column-view"> <!-- 现在用于垂直堆叠 -->
						<view class="charts-box">
							<qiun-data-charts type="column" :opts="opts" :chartData="columnChartData" />
							<view class="chart-title">红蓝军各回合得分情况</view>
						</view>
						<view class="charts-box-pie">
							<qiun-data-charts type="pie" :opts="pieOpts" :chartData="pieChartData" />
							<view class="chart-title">红蓝军总得分比例</view>
						</view>
					</view>
				</view>
				<!-- 底部不再需要 panel-footer -->
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
      nonZeroRoundScores: null,
			//您可以通过修改 config-ucharts.js 文件中下标为 ['column'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
			//您可以通过修改 config-ucharts.js 文件中下标为 ['column'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
			opts: {
				color: [
					'#1890FF',
					'#EE6666',
				],
				padding: [30, 15, 0, 5], // 增大顶部内边距，确保柱状图顶部数字可见
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
			//您可以通过修改 config-ucharts.js 文件中下标为 ['pie'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
			pieOpts: {
				color: ['#1890FF', '#EE6666'],
				padding: [30, 30, 30, 30],  // 减小内边距，给标签更多空间
				enableScroll: false,
				extra: {
					pie: {
						activeOpacity: 0.5,
						activeRadius: 10,
						offsetAngle: 0,
						labelWidth: 0,  // 调整标签宽度，避免过长
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
				},
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
				for (let i = 0; i <= newVal - 1; i++) {
					this.categories.push('回合' + i);
				}
				console.log('this.categories: ', this.categories);
				this.getServerData();
				// this.getPieServerData();
			}
		}
	},
	mounted() {},
	methods: {
		open() {
			this.$refs.popup.open();
		},
		close() {
			this.$refs.popup.close();
		},
    processData(data) {

      if (this.categories.length === 0 && this.round > 0) {
        for (let i = 1; i <= this.round; i++) {
          this.categories.push('回合' + i);
        }
      }

      // 初始化数据
      this.columnSeries[0].data = new Array(this.categories.length).fill(0);
      this.columnSeries[1].data = new Array(this.categories.length).fill(0);
      this.redTotalScore = 0;
      this.blueTotalScore = 0;

      // 分析数据
      for (let item of data) {

        // const campIndex = isRedCamp ? 0 : 1;

        // 处理总得分
        if (item.score !== -1) {
          const scoreValue = Number(item.score);
          // 判断回合数
          if (item.chessRound === 0) {
            // 第0回合得分按0.1计算
            const calculatedScore = scoreValue * 0.1;
            if (item.type === 6) {
              //6为红军、7为蓝军
              this.redTotalScore += calculatedScore;
            } else {
              this.blueTotalScore += calculatedScore;
            }
          }
          else {
            // 收集非零回合得分，在处理完所有数据后统一计算平均值
            if (!this.nonZeroRoundScores) {
              this.nonZeroRoundScores = {
                red: { sum: 0, count: 0 },
                blue: { sum: 0, count: 0 }
              };
            }
            if (item.type === 6) { // 红军
              this.nonZeroRoundScores.red.sum += scoreValue;
              this.nonZeroRoundScores.red.count++;
            } else { // 蓝军
              this.nonZeroRoundScores.blue.sum += scoreValue;
              this.nonZeroRoundScores.blue.count++;
            }
          }
        }

        //处理每回合得分
        if (item.score) {
          for (let i = 0; i < this.round && i < this.categories.length; i++) {
            if(item.type === 6) {
              this.columnSeries[0].data[item.chessRound] = item.score;
            } else {
              this.columnSeries[1].data[item.chessRound] = item.score;
            }
          }
        }

        console.log('this.columnSeries:', this.columnSeries);
      }

      // 计算非零回合平均分并加入总分
      if (this.nonZeroRoundScores) {
        // 红军平均分
        if (this.nonZeroRoundScores.red.count > 0) {
          const redAvg = this.nonZeroRoundScores.red.sum / this.nonZeroRoundScores.red.count;
          this.redTotalScore += redAvg * 0.3;
          console.log('red',redAvg);
        }
        // 蓝军平均分
        if (this.nonZeroRoundScores.blue.count > 0) {
          const blueAvg = this.nonZeroRoundScores.blue.sum / this.nonZeroRoundScores.blue.count;
          this.blueTotalScore += blueAvg * 0.3;
          console.log('blue',blueAvg);
        }
        // 重置数据，为下一次计算做准备
        this.nonZeroRoundScores = null;
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
.chart-panel {
  width: 900px; /* 调整宽度，使其更紧凑 */
  height: 80vh; /* 保持高度，确保内容能显示 */
  background: linear-gradient(145deg, #e0ffe0 0%, #f0fff0 50%, #e0ffe0 100%); /* 浅绿色背景 */
  border: 3px solid #8bc34a; /* 调整边框颜色 */
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); /* 调整阴影 */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px; /* 进一步减小内边距 */
  position: relative;
  overflow: hidden; /* 隐藏所有滚动条 */
  box-sizing: border-box;
}

.column-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column; /* 上下放置 */
  justify-content: flex-start; /* 从顶部开始 */
  align-items: center;
  gap: 10px; /* 减小图表之间的垂直间距 */
  overflow: hidden; /* 确保无滚动条 */
}

.charts-box {
  width: 95%;
  height: 30%; /* 进一步缩短柱状图高度 */
  background: rgba(189, 230, 189, 0.4);
  border: 1px solid rgba(139, 195, 74, 0.5);
  border-radius: 8px;
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.charts-box-pie {
  width: 60%; /* 进一步减小宽度 */
  height: 60%; /* 进一步减小高度，调整与柱状图的比例 */
  background: rgba(189, 230, 189, 0.4);
  border: 1px solid rgba(139, 195, 74, 0.5);
  border-radius: 8px;
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.chart-title {
  width: 100%;
  text-align: center;
  margin-top: 5px; /* 调整标题与图表的间距 */
  font-size: 18px; /* 调整字体大小 */
  color: #388e3c; /* 调整字体颜色，适应浅色背景 */
  font-weight: 700;
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
  text-shadow: none;
}

/* 关闭按钮样式 */
.close-button-container {
  position: absolute;
  top: 5px; /* 保持紧凑 */
  right: 5px; /* 保持紧凑 */
  z-index: 1000;
}

.close-button {
  width: 35px; /* 进一步减小大小 */
  height: 35px; /* 进一步减小大小 */
  border-radius: 8px;
  background: linear-gradient(135deg, #ef5350 0%, #e53935 50%, #d32f2f 100%); /* 调整红色渐变，适应浅背景 */
  border: 2px solid #ef9a9a; /* 调整边框颜色 */
  color: #ffffff;
  font-size: 18px; /* 调整字体大小 */
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(211, 47, 47, 0.2); /* 调整阴影 */
}

.close-button:hover {
  background: linear-gradient(135deg, #e53935 0%, #d32f2f 50%, #c62828 100%);
  transform: scale(1.05); /* 减小缩放效果 */
  box-shadow: 0 4px 10px rgba(211, 47, 47, 0.3);
}

.close-button:active {
  transform: scale(0.98);
}

.close-icon {
  font-size: 14px; /* 调整字体大小 */
  line-height: 1;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
}

/* 面板头部样式 */
.panel-header {
  text-align: center;
  margin-bottom: 8px; /* 进一步减小间距 */
  padding: 8px; /* 进一步减小内边距 */
  background: linear-gradient(90deg, transparent 0%, rgba(139, 195, 74, 0.1) 50%, transparent 100%); /* 浅色渐变 */
  border: 2px solid rgba(139, 195, 74, 0.4); /* 调整边框颜色 */
  border-radius: 8px;
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.panel-title {
  font-size: 20px; /* 进一步减小字体大小 */
  font-weight: 800;
  color: #388e3c; /* 调整字体颜色，适应浅色背景 */
  text-shadow: none;
  letter-spacing: 1px; /* 调整字符间距 */
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
  margin-bottom: 2px; /* 进一步减小间距 */
}

.military-code {
  font-size: 10px; /* 进一步减小字体大小 */
  color: rgba(76, 175, 80, 0.8); /* 调整字体颜色 */
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  opacity: 0.8;
}

/* 面板内容区域 */
.panel-content {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden; /* 隐藏所有滚动条 */
  padding-bottom: 5px; /* 保持底部紧凑 */
}
</style>
