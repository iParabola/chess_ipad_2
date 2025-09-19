<template>
  <uni-popup ref="popup" >
    <view class="popup">
      <view class="header">
        <view class="title">得分汇总</view>
        <view class="military-code">FINAL SCORE SUMMARY SYSTEM</view>
      </view>
      
      <view v-if="userType === 'admin'" class="admin-content">
          <!-- 最终评分计算 -->
          <view class="final-score-section">
            <view class="section-title">最终推演总得分计算</view>
            
            <!-- 红方评分 -->
            <view class="team-score-group">
              <view class="team-title">{{game.firstCampName}}</view>
              <view class="score-row">
                <view class="score-label">战损比情况得分 (权重20%)：</view>
                <uni-easyinput
                    v-model="first_casualty_score"
                    type="number"
                    placeholder="请输入分数"
                    trim
                    class="score-input"
                    @blur="calculateFinalScores"
                    @input="debouncedCalculate"
                ></uni-easyinput>
              </view>
              <view class="score-row">
                <view class="score-label">作战胜负得分 (权重80%)：</view>
                <uni-easyinput
                    v-model="first_battle_score"
                    type="number"
                    placeholder="请输入分数"
                    trim
                    class="score-input"
                    @blur="calculateFinalScores"
                    @input="debouncedCalculate"
                ></uni-easyinput>
              </view>
              <view class="calculated-score">
                <view class="calc-display">
                  <view class="calc-label">推演总得分：</view>
                  <view class="calc-value">{{ first_final_score }}分</view>
                </view>
              </view>
            </view>

            <!-- 蓝方评分 -->
            <view class="team-score-group">
              <view class="team-title">{{game.secondCampName}}</view>
              <view class="score-row">
                <view class="score-label">战损比情况得分 (权重20%)：</view>
                <uni-easyinput
                    v-model="second_casualty_score"
                    type="number"
                    placeholder="请输入分数"
                    trim
                    class="score-input"
                    @blur="calculateFinalScores"
                    @input="debouncedCalculate"
                ></uni-easyinput>
              </view>
              <view class="score-row">
                <view class="score-label">作战胜负得分 (权重80%)：</view>
                <uni-easyinput
                    v-model="second_battle_score"
                    type="number"
                    placeholder="请输入分数"
                    trim
                    class="score-input"
                    @blur="calculateFinalScores"
                    @input="debouncedCalculate"
                ></uni-easyinput>
              </view>
              <view class="calculated-score">
                <view class="calc-display">
                  <view class="calc-label">推演总得分：</view>
                  <view class="calc-value">{{ second_final_score }}分</view>
                </view>
              </view>
            </view>
          </view>

          <view class="button-group">
            <button class="confirm-btn" @click="setFinalScore">提交最终得分</button>
            <button class="cancel-btn" @click="close">取消</button>
          </view>
        </view>
        
        <view v-else class="user-content">
          <view class="user-score">
            <view class="user-score-label">您的最终得分为：</view>
            <view class="user-score-value">{{score ? score : 0}}</view>
          </view>
        </view>
      </view>
      
      <view v-if="showToast" class="custom-toast">
        {{ toastMessage }}
      </view>
    </view>
  </uni-popup>
</template>
<script>
import {getScoreByCampId} from "@/api/verdictRecord";

export default {
  name: 'njust-score-popup',
  data(){
    return{
      showInfo: false,
      // 最终评分字段
      first_casualty_score: '', // 红方战损比得分
      first_battle_score: '',   // 红方作战胜负得分
      second_casualty_score: '', // 蓝方战损比得分
      second_battle_score: '',   // 蓝方作战胜负得分
      first_final_score: 0,     // 红方最终得分
      second_final_score: 0,    // 蓝方最终得分
      toastMessage: '',
      showToast: false,
      debounceTimer: null,      // 防抖计时器
    }
  },
  props: {
    score: {
      type: String,
      default: '',
    },
    userType: {
      type: String,
      default: ''
    },
    campId: {
      type: String,
      default: ''
    },
    verdictRecordId: {
      type: String,
      default: ''
    },
    game:{},
  },
  mounted() {

  },
  methods: {
    showCustomToast(message) {
      this.toastMessage = message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 1500);
    },
    
    open() {
      this.$refs.popup.open();
      this.getScoreFromPopup();
    },
    
    close() {
  // 重置所有字段
  this.first_casualty_score = '';
  this.first_battle_score = '';
  this.second_casualty_score = '';
  this.second_battle_score = '';
  this.first_final_score = 0;
  this.second_final_score = 0;
  this.$refs.popup.close();
    },
    
    
    // 防抖计算函数，延迟执行避免输入过程中频繁计算
    debouncedCalculate() {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = setTimeout(() => {
        this.calculateFinalScores();
      }, 300); // 300ms 延迟
    },
    
    // 实时计算最终得分
    calculateFinalScores() {
  // 红方最终得分计算：战损比20% + 作战胜负80%
  let firstCasualty = Number(this.first_casualty_score);
  let firstBattle = Number(this.first_battle_score);
  if (isNaN(firstCasualty)) firstCasualty = 0;
  if (isNaN(firstBattle)) firstBattle = 0;
  this.first_final_score = Math.round(firstCasualty * 0.2 + firstBattle * 0.8);

  // 蓝方最终得分计算：战损比20% + 作战胜负80%
  let secondCasualty = Number(this.second_casualty_score);
  let secondBattle = Number(this.second_battle_score);
  if (isNaN(secondCasualty)) secondCasualty = 0;
  if (isNaN(secondBattle)) secondBattle = 0;
  this.second_final_score = Math.round(secondCasualty * 0.2 + secondBattle * 0.8);
    },
    
    setFinalScore(){
      // 检查最终评分字段是否填写完整
      if (this.first_casualty_score === '' || this.first_battle_score === '' ||
          this.second_casualty_score === '' || this.second_battle_score === '') {
        this.showCustomToast('请完整填写最终评分项');
        return;
      }
      
      // 确保计算最新的分数
      this.calculateFinalScores();

      // 使用新计算的最终得分（已经是整数）
      const finalFirstScore = this.first_final_score;
      const finalSecondScore = this.second_final_score;

      console.log('提交最终得分:', {
        firstScore: finalFirstScore,
        secondScore: finalSecondScore,
        calculation: {
          first: `${this.first_casualty_score} × 20% + ${this.first_battle_score} × 80% = ${finalFirstScore}`,
          second: `${this.second_casualty_score} × 20% + ${this.second_battle_score} × 80% = ${finalSecondScore}`
        }
      });

      // 发射事件给父组件，传递最终计算的得分
      this.$emit('setFinalScore', finalFirstScore, finalSecondScore, this.game);
      this.close();
    },
    
    async getScoreFromPopup() {
      if (this.userType === 'user'){
        const data = {
          id : this.verdictRecordId,
          CampId: this.campId
        }
        const res = await getScoreByCampId(data)
        console.log(data)
        this.score = res.data.data
      }
    },
  },
  beforeDestroy() {
    // 清理防抖计时器
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  },
};
</script>
<style lang="scss">
.popup {
  width: 700px;
  height: auto;
  max-width: 85%;
  min-width: 350px;
  max-height: 85vh;
  background: linear-gradient(145deg, #2d4a2d 0%, #1a2e1a 50%, #2d4a2d 100%);
  border-radius: 12px;
  backdrop-filter: blur(20px);
  border: 3px solid #4caf50;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(76, 175, 80, 0.2);
  padding: 18px;
  z-index: 999;
}

.header {
  text-align: center;
  margin-bottom: 16px;
  padding: 12px;
  background: linear-gradient(90deg, transparent 0%, rgba(76, 175, 80, 0.2) 50%, transparent 100%);
  border: 2px solid rgba(76, 175, 80, 0.4);
  border-radius: 6px;
  
  .title {
    font-size: 22px;
    font-weight: 600;
    color: #8bc34a;
    letter-spacing: 1px;
    font-family: 'Courier New', monospace;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  
  .military-code {
    font-size: 10px;
    color: rgba(139, 195, 74, 0.8);
    font-family: 'Courier New', monospace;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-align: center;
    opacity: 0.8;
  }
}

.admin-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.score-section, .final-score-section {
  background: rgba(26, 46, 26, 0.3);
  border-radius: 8px;
  padding: 14px;
  border: 2px solid rgba(76, 175, 80, 0.4);
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #8bc34a;
  margin-bottom: 12px;
  text-align: center;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
}

.score-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  
  .score-label {
    flex: 1;
    color: #a5d6a7;
    font-size: 12px;
    font-weight: 500;
    margin-right: 8px;
    font-family: 'Courier New', monospace;
  }
}

.score-input {
  width: 100px;
  height: 32px;
  
  :deep(.uni-easyinput__content) {
    background: linear-gradient(135deg, rgba(26, 46, 26, 0.8) 0%, rgba(45, 69, 45, 0.8) 100%) !important;
    border: 2px solid #4caf50 !important;
    border-radius: 8px !important;
    
    .uni-easyinput__content-input {
      color: #e8f5e8 !important;
      font-size: 12px !important;
      text-align: center !important;
      font-family: 'Courier New', monospace !important;
    }
    
    .uni-easyinput__placeholder-style {
      color: rgba(232, 245, 232, 0.6) !important;
      font-style: italic !important;
    }
  }
  
  :deep(.uni-easyinput__content:focus-within) {
    border-color: #8bc34a !important;
    box-shadow: 0 0 10px rgba(139, 195, 74, 0.3) !important;
  }
}

.team-score-group {
  background: linear-gradient(135deg, rgba(45, 69, 45, 0.4) 0%, rgba(26, 46, 26, 0.4) 100%);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  border: 2px solid rgba(76, 175, 80, 0.3);
  
  .team-title {
    font-size: 14px;
    font-weight: 600;
    color: #8bc34a;
    margin-bottom: 8px;
    text-align: center;
    padding: 6px;
    background: rgba(26, 46, 26, 0.4);
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    text-transform: uppercase;
    border-bottom: 1px solid rgba(76, 175, 80, 0.3);
  }
}

.calculated-score {
  margin-top: 8px;
  padding: 6px 8px;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(139, 195, 74, 0.15) 100%);
  border-radius: 4px;
  border: 1px solid rgba(76, 175, 80, 0.3);
  
  .calc-display {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .calc-label {
    color: #a5d6a7;
    font-size: 12px;
    font-weight: 600;
    font-family: 'Courier New', monospace;
  }
  
  .calc-value {
    color: #4caf50;
    font-size: 14px;
    font-weight: 700;
    font-family: 'Courier New', monospace;
    text-shadow: 0 0 8px rgba(76, 175, 80, 0.5);
  }
}

.button-group {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 16px;
  padding: 12px;
  background: linear-gradient(90deg, transparent 0%, rgba(76, 175, 80, 0.1) 50%, transparent 100%);
  border-top: 2px solid rgba(76, 175, 80, 0.4);
  border-radius: 6px;
}

.confirm-btn, .cancel-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.confirm-btn {
  background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
  color: white;
  border: 2px solid #8bc34a;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #66bb6a 0%, #4caf50 100%);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(76, 175, 80, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.cancel-btn {
  background: linear-gradient(135deg, #616161 0%, #424242 100%);
  color: #ffffff;
  border: 2px solid #9e9e9e;
  
  &:hover {
    background: linear-gradient(135deg, #757575 0%, #616161 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(158, 158, 158, 0.3);
  }
}

.user-content {
  text-align: center;
  padding: 20px;
  
  .user-score {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    background: linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(139, 195, 74, 0.15) 100%);
    border-radius: 8px;
    border: 2px solid rgba(76, 175, 80, 0.4);
    padding: 20px;
    
    .user-score-label {
      font-size: 16px;
      color: #a5d6a7;
      font-weight: 500;
      font-family: 'Courier New', monospace;
    }
    
    .user-score-value {
      font-size: 28px;
      color: #4caf50;
      font-weight: 700;
      font-family: 'Courier New', monospace;
      text-shadow: 0 0 15px rgba(76, 175, 80, 0.5);
    }
  }
}

.custom-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  font-weight: 500;
  z-index: 10000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 2px solid #8bc34a;
  font-family: 'Courier New', monospace;
}
</style>
