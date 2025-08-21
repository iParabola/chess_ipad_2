<!-- 骰子组件 -->

<template>
  <view class="dice-container">
    <view class="dice-row">
	  <button @click="rollDice" class="roll-button">掷骰子</button>
	  <view class="dice" :class="{ 'dice-active': dice1 === activeDice }">1D{{ dice1 }}</view>
	  <view class="dice" :class="{ 'dice-active': dice2 === activeDice }">2D{{ dice2 }}</view>
	  <view class="dice" :class="{ 'dice-active': dice2 === activeDice }">{{ dice1 + dice2 }}</view>
	</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      dice1: 1,
      dice2: 1,
      activeDice: null
    };
  },
  methods: {
    rollDice() {
      this.dice1 = Math.floor(Math.random() * 6) + 1;
      this.dice2 = Math.floor(Math.random() * 6) + 1;
    }
  }
};
</script>

<style scoped>
.dice-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px; /* 调整内边距，使其更紧凑 */
}

.dice-row {
  display: flex;
  align-items: center;
  gap: 15px; /* 调整间距 */
}

.roll-button {
  margin-right: 30px; /* 调整间距 */
  width: 120px; /* 调整大小 */
  height: 40px; /* 调整大小 */
  font-size: 16px; /* 调整字体大小 */
  background: linear-gradient(135deg, #4caf50 0%, #388e3c 50%, #2e7d32 100%); /* 科幻绿渐变 */
  color: #ffffff; /* 白色文字 */
  border: 2px solid #8bc34a; /* 绿色边框 */
  border-radius: 8px; /* 圆角 */
  box-shadow: 0 4px 10px rgba(76, 175, 80, 0.3); /* 绿色光晕阴影 */
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace; /* 科幻字体 */
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.roll-button:hover {
  background: linear-gradient(135deg, #66bb6a 0%, #4caf50 50%, #388e3c 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(76, 175, 80, 0.4);
}

.roll-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(76, 175, 80, 0.2);
}

.dice {
  width: 45px; /* 调整大小 */
  height: 45px; /* 调整大小 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px; /* 调整字体大小 */
  font-weight: bold;
  border: 2px solid #8bc34a; /* 绿色边框 */
  border-radius: 8px; /* 圆角 */
  background: rgba(26, 46, 26, 0.6); /* 半透明深绿背景 */
  color: #e8f5e8; /* 浅色文字 */
  box-shadow: 0 4px 8px rgba(76, 175, 80, 0.2); /* 绿色光晕阴影 */
  transition: transform 0.3s, background-color 0.3s, box-shadow 0.3s;
  font-family: 'Courier New', monospace; /* 科幻字体 */
}

.dice-active {
  transform: scale(1.15); /* 增加缩放效果 */
  background: linear-gradient(135deg, #ffeb3b 0%, #ffc107 100%); /* 亮黄色渐变 */
  color: #333333; /* 深色文字 */
  border-color: #ffd700; /* 亮黄色边框 */
  box-shadow: 0 6px 12px rgba(255, 193, 7, 0.5); /* 亮黄色光晕 */
}
</style>