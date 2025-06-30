<!-- 右侧表格组件，仅用于火力值表（上面有两个表头），包含表头和能高亮的表格 -->
<template>
  <view class="table-container">
    <table class="highlight-table">
      <thead>
		<tr>
			<!-- <th :colspan="2" class="centered-header">距离（米）</th> -->
			<th v-for="(header, index) in fire_headers1" :key="index" :class="{'highlight-column': hoverColumn === index}">
			  {{ header }}
			</th>
		</tr>
		<tr>
			<!-- <th :colspan="2" class="centered-header">六边格数量</th> -->
			<th v-for="(header, index) in fire_headers2" :key="index" :class="{'highlight-column': hoverColumn === index}">
			  {{ header }}
			</th>
		</tr>
        <tr>
          <th v-for="(header, index) in headers" :key="index" :class="{'highlight-column': hoverColumn === index}">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex" :class="{'highlight-row': hoverRow === rowIndex}">
          <td v-for="(cell, colIndex) in row" :key="colIndex" @mouseover="highlightCell(rowIndex, colIndex)"
              @mouseout="clearHighlight" :class="{'highlight-column-cell': hoverColumn === colIndex}" @click="OnClick(cell)">
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </view>
</template>

<script>
export default {
  props: {
	/* 第一个表头的内容（距离数组）*/
	fire_headers1: {
	  type: Array,
	  required: false
	}, 
	/* 第二个表头的内容（六边格数量）*/
	fire_headers2: {
	  type: Array,
	  required: false
	},
	/* 苏设计，美目标 */
    headers: {
      type: Array,
      required: false
    },
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      hoverRow: null,
      hoverColumn: null
    };
  },
  methods: {
    highlightCell(row, col) {
      this.hoverRow = row;
      this.hoverColumn = col;
    },
    clearHighlight() {
      this.hoverRow = null;
      this.hoverColumn = null;
    },
    OnClick(value) {
      uni.showModal({
        title: '提交结果',
        content: '确认您提交的攻击效果是：' + value,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定' + value);

            const dataToSend = { message: '攻击效果为' + value + '，' };
            // 通过 window.opener 向父页面发送消息
            if (window.opener) {
              window.opener.postMessage(dataToSend, window.location.origin);
            }

          } else if (res.cancel) {
            // console.log('用户点击取消');
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.table-container {
  overflow-x: auto;
}

.highlight-table {
  width: 100%;
  border-collapse: collapse;
}

.centered-header {
	text-align: center; /* 确保新的表头居中显示 */
}

th, td {
  padding: 8px 12px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.highlight-row {
  background-color: #ffff7f; /* 高亮行的所有单元格 */
}

.highlight-column {
  background-color: yellow; /* 高亮表头 */
}

.highlight-column-cell {
  background-color: #ffff7f; /* 高亮列的所有单元格 */
}
</style>