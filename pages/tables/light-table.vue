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
            success: (res) => {
                if (res.confirm) {
                    console.log('用户点击确定' + value);

                    // 发出事件给父组件
                    this.$emit('selectResult', value);

                    const dataToSend = { message: '裁决结果为' + value };
                    // 通过 window.opener 向父页面发送消息（保持向后兼容）
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
  overflow: auto; /* 允许滚动 */
  /* 自定义滚动条 */
  &::-webkit-scrollbar {
    width: 8px; /* 垂直滚动条宽度 */
    height: 8px; /* 水平滚动条高度 */
  }
  &::-webkit-scrollbar-track {
    background: rgba(26, 46, 26, 0.8);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-corner {
    background: rgba(26, 46, 26, 0.8);
  }
}

.highlight-table {
  width: 100%;
  border-collapse: collapse;
  background: rgba(26, 46, 26, 0.6); /* 表格背景 */
  color: #e8f5e8; /* 默认文字颜色 */
  font-family: 'Courier New', monospace; /* 科幻字体 */
}

.centered-header {
	text-align: center; /* 确保新的表头居中显示 */
  background: linear-gradient(90deg, transparent 0%, rgba(76, 175, 80, 0.3) 50%, transparent 100%); /* 标题渐变背景 */
  border: 1px solid rgba(76, 175, 80, 0.4); /* 标题边框 */
  color: #8bc34a; /* 标题文字颜色 */
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 1px;
}

th, td {
  padding: 10px 15px; /* 调整内边距 */
  border: 1px solid rgba(76, 175, 80, 0.3); /* 调整边框颜色 */
  text-align: left;
  font-size: 14px; /* 调整字体大小 */
}

th {
  background: linear-gradient(135deg, #2e7d32 0%, #388e3c 100%); /* 表头背景渐变 */
  font-weight: bold;
  color: #e8f5e8; /* 表头文字颜色 */
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

td {
  background: rgba(45, 69, 45, 0.5); /* 单元格背景 */
}

.highlight-row {
  background: rgba(139, 195, 74, 0.2); /* 高亮行的背景，更柔和 */
}

.highlight-column {
  background: rgba(139, 195, 74, 0.3); /* 高亮表头背景，更柔和 */
}

.highlight-column-cell {
  background: rgba(139, 195, 74, 0.4); /* 高亮列单元格的背景，更柔和 */
}

/* 单元格点击高亮效果，可以在这里调整 */
td:active {
  background-color: rgba(255, 255, 127, 0.6); /* 激活时的背景色 */
}
</style>