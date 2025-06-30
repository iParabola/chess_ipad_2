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
      dice2: 1
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
  padding: 20px;
}

.dice-row {
  display: flex;
  align-items: center;
  gap: 20px;
}

.roll-button {
  margin-right: 50px;
  width: 150px;
  height: 50px;
  font-size: 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.dice {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  border: 2px solid #000;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.5s, background-color 0.5s;
}

.dice-active {
  transform: scale(1.1);
  background-color: #ffeb3b;
}
</style>