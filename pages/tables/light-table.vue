<!-- 右侧表格组件，仅用于战斗结果表（上面有一个表头），包含表头和能高亮的表格 -->
<template>
  <view class="table-container">
    <table class="highlight-table">
      <thead>
		<tr>
			<th :colspan="headers.length" class="centered-header">射击单位攻击等级</th>
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
      // 不在2-12中，也不在'2'-'12'中，用于过滤表格的第一列，点第一列不会有反应。后续可调整
      const regex = /^(?:[2-9]|1[0-2])$/;
      if (!regex.test(value)) {
        uni.showModal({
            title: '提交结果',
            content: '确认您提交的裁决结果是：' + value,
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定' + value);

                    const dataToSend = { message: '裁决结果为' + value };
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