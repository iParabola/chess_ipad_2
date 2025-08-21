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
        success: (res) => {
          if (res.confirm) {
            console.log('用户点击确定' + value);

            // 发出事件给父组件
            this.$emit('selectResult', value);

            const dataToSend = { message: '攻击效果为' + value + '，' };
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