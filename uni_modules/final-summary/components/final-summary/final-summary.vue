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
      nonZeroRoundScores: null,
			//您可以通过修改 config-ucharts.js 文件中下标为 ['column'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
			//您可以通过修改 config-ucharts.js 文件中下标为 ['column'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
			opts: {
				color: [
					'#1890FF',
					'#EE6666',
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
			//您可以通过修改 config-ucharts.js 文件中下标为 ['pie'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
			pieOpts: {
				color: ['#1890FF', '#EE6666'],
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
.chart-view {
  width: 1400px;
  height: 80vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
}

.column-view {
  width: 85%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.charts-box {
  width: 55%;
  height: 350px;
}

.charts-box-pie {
  width: 40%;
  height: 350px;
}
</style>
