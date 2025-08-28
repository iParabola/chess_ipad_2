<template>
  <uni-popup ref="popup" type="center" :mask-click="false">
    <view class="popup-content">
      <view class="close-button-container">
        <button class="close-button" @click="close">
          <text class="close-icon">✕</text>
        </button>
      </view>
      <div class="container">
        <div class="header">
          <h1>想定得分统计表</h1>
        </div>
        <table>
          <thead>
          <tr class="header-row">
            <th>推演阶段</th>
            <th>指标1</th>
            <th>指标2</th>
            <th>指标3</th>
            <th>权重</th>
            <th>加权得分</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="stage-title">当前计划部署</td>
            <td class="editable" @click="editCell($event, 'planDeployment')">
              <input
                  v-if="editingCell === 'planDeployment'"
                  type="text"
                  v-model="scores.planDeployment"
                  @focus="clearPlaceholder('planDeployment')"
                  @blur="restorePlaceholder('planDeployment')"
                  @keyup.enter="saveEdit"
                  @keyup.esc="cancelEdit"
                  :placeholder="placeholders.planDeployment"
                  class="input-placeholder"
              >
              <span v-else :class="{ 'grey-text': !scores.planDeployment }">{{ scores.planDeployment || '符合规则（50%）' }}</span>
            </td>
            <td colspan="2" class="editable" @click="editCell($event, 'combinedIndicators')">
              <input
                  v-if="editingCell === 'combinedIndicators'"
                  type="text"
                  v-model="scores.combinedIndicators"
                  @focus="clearPlaceholder('combinedIndicators')"
                  @blur="restorePlaceholder('combinedIndicators')"
                  @keyup.enter="saveEdit"
                  @keyup.esc="cancelEdit"
                  :placeholder="placeholders.combinedIndicators"
                  class="input-placeholder"
              >
              <span v-else :class="{ 'grey-text': !scores.combinedIndicators }">{{ scores.combinedIndicators || '实战要求（50%）' }}</span>
            </td>
            <td>10%</td>
            <td>{{ weightedScore }}</td>
          </tr>
          <tr>
            <td class="stage-title">当前回合对抗</td>
            <td class="editable" @click="editCell($event, 'ruleCompliance')">
              <input
                  v-if="editingCell === 'ruleCompliance'"
                  type="text"
                  v-model="scores.ruleCompliance"
                  @focus="clearPlaceholder('ruleCompliance')"
                  @blur="restorePlaceholder('ruleCompliance')"
                  @keyup.enter="saveEdit"
                  @keyup.esc="cancelEdit"
                  :placeholder="placeholders.ruleCompliance"
                  class="input-placeholder"
              >
              <span v-else :class="{ 'grey-text': !scores.ruleCompliance }">{{ scores.ruleCompliance || '符合规则（10%）' }}</span>
            </td>
            <td class="editable" @click="editCell($event, 'combatRequirement')">
              <input
                  v-if="editingCell === 'combatRequirement'"
                  type="text"
                  v-model="scores.combatRequirement"
                  @focus="clearPlaceholder('combatRequirement')"
                  @blur="restorePlaceholder('combatRequirement')"
                  @keyup.enter="saveEdit"
                  @keyup.esc="cancelEdit"
                  :placeholder="placeholders.combatRequirement"
                  class="input-placeholder"
              >
              <span v-else :class="{ 'grey-text': !scores.combatRequirement }">{{ scores.combatRequirement || '实战要求（30%）' }}</span>
            </td>
            <td class="editable" @click="editCell($event, 'commandEffect')">
              <input
                  v-if="editingCell === 'commandEffect'"
                  type="text"
                  v-model="scores.commandEffect"
                  @focus="clearPlaceholder('commandEffect')"
                  @blur="restorePlaceholder('commandEffect')"
                  @keyup.enter="saveEdit"
                  @keyup.esc="cancelEdit"
                  :placeholder="placeholders.commandEffect"
                  class="input-placeholder"
              >
              <span v-else :class="{ 'grey-text': !scores.commandEffect }">{{ scores.commandEffect || '指挥效果（60%）' }}</span>
            </td>
            <td>30%</td>
            <td>{{ roundWeightedScore }}</td>
          </tr>
          <tr>
            <td class="stage-title" rowspan="2">回合推演总评</td>
            <td>战损比情况(20)</td>
            <td colspan="2">作战胜负（80）</td>
            <td rowspan="2">60%</td>
            <td rowspan="2">{{ overallEvaluationScore }}</td>
          </tr>
          <tr>
            <td class="editable" @click="editCell($event, 'finalStrength')">
              <input
                  v-if="editingCell === 'finalStrength'"
                  type="text"
                  v-model="scores.finalStrength"
                  @focus="clearPlaceholder('finalStrength')"
                  @blur="restorePlaceholder('finalStrength')"
                  @keyup.enter="saveEdit"
                  @keyup.esc="cancelEdit"
                  :placeholder="placeholders.finalStrength"
                  class="input-placeholder"
              >
              <span v-else :class="{ 'grey-text': !scores.finalStrength }">{{ scores.finalStrength || '分值占比20%得分' }}</span>
            </td>
            <td colspan="2" class="editable" @click="editCell($event, 'combatResult')">
              <input
                  v-if="editingCell === 'combatResult'"
                  type="text"
                  v-model="scores.combatResult"
                  @focus="clearPlaceholder('combatResult')"
                  @blur="restorePlaceholder('combatResult')"
                  @keyup.enter="saveEdit"
                  @keyup.esc="cancelEdit"
                  :placeholder="placeholders.combatResult"
                  class="input-placeholder"
              >
              <span v-else :class="{ 'grey-text': !scores.combatResult }">{{ scores.combatResult || '胜方得100，负方不得分' }}</span>
            </td>
          </tr>
          <tr class="total-row">
            <td colspan="4">综合得分</td>
            <td colspan="2">{{ totalScore }}</td>
          </tr>
          </tbody>
        </table>

        <div class="note">
          <p>说明：点击可编辑单元格进行评分，综合得分将根据各阶段得分自动计算。</p>
          <p>注意：每个单元格得分需输入0-100之间的数字。</p>
        </div>
      </div>
    </view>
  </uni-popup>
</template>

<script>
export default {
  data() {
    return {
      editingCell: null,
      scores: {
        planDeployment: '',
        combinedIndicators: '',
        ruleCompliance: '',
        combatRequirement: '',
        commandEffect: '',
        damageRatio: '',
        combatOutcome: '',
        finalStrength: '',
        combatResult: '',
        overallEvaluation: ''
      },
      placeholders: {
        planDeployment: '符合规则（50%）',
        combinedIndicators: '实战要求（50%）',
        ruleCompliance: '符合规则（10%）',
        combatRequirement: '实战要求（30%）',
        commandEffect: '指挥效果（60%）',
        damageRatio: '战损比情况（20%）',
        combatOutcome: '作战胜负（80%）',
        finalStrength: '最终实力分值占比20得分',
        combatResult: '胜方得80，负方不得分'
      }
    };
  },
  computed: {
    weightedScore() {
      let planScore = parseFloat(this.scores.planDeployment) || 0;
      let combinedScore = parseFloat(this.scores.combinedIndicators) || 0;

      return ((planScore * 0.5) + (combinedScore * 0.5)).toFixed(2);
    },
    roundWeightedScore() {
      let ruleScore = parseFloat(this.scores.ruleCompliance) || 0;
      let combatScore = parseFloat(this.scores.combatRequirement) || 0;
      let commandScore = parseFloat(this.scores.commandEffect) || 0;

      return ((ruleScore * 0.1) + (combatScore * 0.3) + (commandScore * 0.6)).toFixed(2);
    },
    overallEvaluationScore() {
      let finalStrengthScore = parseFloat(this.scores.finalStrength) || 0;
      let combatResultScore = parseFloat(this.scores.combatResult) || 0;

      return ((finalStrengthScore * 0.2) + (combatResultScore * 0.8)).toFixed(2);
    },
    totalScore() {
      let planScore = parseFloat(this.scores.planDeployment) || 0;
      let roundScore = parseFloat(this.roundWeightedScore) || 0;
      let overallScore = parseFloat(this.overallEvaluationScore) || 0;

      return ((planScore * 0.1) + (roundScore * 0.3) + (overallScore * 0.6)).toFixed(2);
    }
  },
  methods: {
    editCell(event, cellKey) {
      this.editingCell = cellKey;
      setTimeout(() => {
        const input = event.target.querySelector('input');
        if (input) {
          input.focus();
        }
      }, 0);
    },
    saveEdit(event) {
      if (event.type === 'blur' || event.key === 'Enter') {
        this.editingCell = null;
      }
    },
    cancelEdit() {
      this.editingCell = null;
    },
    clearPlaceholder(cellKey) {
      this.placeholders[cellKey] = '';
    },
    restorePlaceholder(cellKey) {
      if (!this.scores[cellKey]) {
        this.placeholders[cellKey] = this.getPlaceholderText(cellKey);
      }
    },
    getPlaceholderText(cellKey) {
      const placeholders = {
        planDeployment: '符合规则（50%）',
        combinedIndicators: '实战要求（50%）',
        ruleCompliance: '符合规则（10%）',
        combatRequirement: '实战要求（30%）',
        commandEffect: '指挥效果（60%）',
        damageRatio: '战损比情况（20%）',
        combatOutcome: '作战胜负（80%）',
        finalStrength: '最终实力分值占比20得分',
        combatResult: '胜方得80，负方不得分'
      };
      return placeholders[cellKey];
    },
    open() {
      this.$refs.popup.open();
    },
    close() {
      this.$refs.popup.close();
    }
  }
};
</script>

<style lang="scss" scoped>
.popup-content {
  background: linear-gradient(145deg, #1a2e1a 0%, #0f1a0f 100%);
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 12px 28px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(76,175,80,0.2);
  border: 1px solid rgba(76,175,80,0.3);
  position: relative;
  width: 1200px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  box-sizing: border-box;
  -webkit-backdrop-filter: blur(8px) saturate(180%);
  backdrop-filter: blur(8px) saturate(180%);
}

.container {
  max-width: 100%;
  margin: 0 auto;
  background-color: transparent; /* Transparent background */
  padding: 0;
  border-radius: 8px;
  box-shadow: none;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  position: relative;
  background: linear-gradient(90deg, transparent 0%, rgba(76,175,80,0.2) 50%, transparent 100%);
  border: 1px solid rgba(76,175,80,0.4);
  border-radius: 10px;
  padding: 15px 20px;
}

.close-button-container {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 1000;
}

.close-button {
  background: linear-gradient(135deg, #d32f2f 0%, #f44336 50%, #d32f2f 100%);
  color: white;
  border: 2px solid #ff5722;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.close-button:hover {
  background: linear-gradient(135deg, #f44336 0%, #ff5722 50%, #f44336 100%);
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0,0,0,0.3);
}

.close-button:active {
  transform: scale(0.95);
}

.close-icon {
  font-size: 20px;
  line-height: 1;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

h1 {
  flex: 1;
  text-align: center;
  margin: 0;
  color: #8bc34a;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 2px;
  font-family: 'Courier New', monospace;
  text-shadow: 0 0 8px rgba(139,195,74,0.5);
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 25px;
  border: 1px solid rgba(76,175,80,0.3);
  border-radius: 10px;
  overflow: hidden;
  background-color: rgba(26,46,26,0.5);
}

th, td {
  border: 1px solid rgba(76,175,80,0.2);
  padding: 14px 18px;
  text-align: center;
  vertical-align: middle;
  color: #e8f5e8;
  font-family: 'Courier New', monospace;
  font-size: 16px;
}

th {
  background: linear-gradient(135deg, #2e7d32 0%, #388e3c 50%, #2e7d32 100%);
  font-weight: bold;
  color: #c8e6c9;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 18px;
}

tr:nth-child(even) td {
  background-color: rgba(26,46,26,0.6);
}

tr:hover td {
  background-color: rgba(46,125,50,0.4);
  transition: background-color 0.2s ease;
}

.editable {
  background-color: rgba(26,46,26,0.4);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.editable:hover {
  background-color: rgba(46,125,50,0.5);
}

input[type="text"] {
  width: calc(100% - 16px);
  padding: 8px;
  border: 1px solid rgba(139,195,74,0.5);
  border-radius: 6px;
  box-sizing: border-box;
  background-color: rgba(26,46,26,0.8);
  color: #e8f5e8;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input[type="text"]:focus {
  outline: none;
  border-color: #8bc34a;
  box-shadow: 0 0 8px rgba(139,195,74,0.6);
}

.input-placeholder::placeholder {
  color: rgba(232,245,232,0.5);
  font-style: italic;
}

.total-row {
  font-weight: bold;
  background: linear-gradient(90deg, rgba(76,175,80,0.6) 0%, rgba(46,125,50,0.6) 100%);
  color: #ffffff;
  font-size: 18px;
}

.header-row {
  background: linear-gradient(135deg, #2e7d32 0%, #388e3c 50%, #2e7d32 100%);
}

.stage-title {
  text-align: left;
  font-weight: bold;
  color: #c8e6c9;
  font-size: 17px;
  letter-spacing: 0.5px;
}

.note {
  margin-top: 30px;
  padding: 15px;
  background-color: rgba(26,46,26,0.4);
  border-radius: 10px;
  font-size: 14px;
  color: rgba(232,245,232,0.8);
  border: 1px dashed rgba(76,175,80,0.3);
  text-align: center;
  font-family: 'Courier New', monospace;
}
.grey-text {
  color: rgba(232,245,232,0.6);
  font-style: italic;
}

/* Scrollbar Styling */
.popup-content::-webkit-scrollbar {
  width: 14px;
  height: 14px;
}

.popup-content::-webkit-scrollbar-track {
  background: rgba(26, 46, 26, 0.8);
  border-radius: 8px;
  border: 1px solid rgba(76, 175, 80, 0.2);
}

.popup-content::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 50%, #8bc34a 100%);
  border-radius: 8px;
  border: 2px solid rgba(26, 46, 26, 0.3);
  box-shadow: 0 2px 6px rgba(76, 175, 80, 0.3);
}

.popup-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #66bb6a 0%, #81c784 50%, #9ccc65 100%);
  box-shadow: 0 3px 8px rgba(76, 175, 80, 0.4);
}

.popup-content::-webkit-scrollbar-thumb:active {
  background: linear-gradient(135deg, #388e3c 0%, #4caf50 50%, #66bb6a 100%);
}

.popup-content::-webkit-scrollbar-corner {
  background: rgba(26, 46, 26, 0.8);
}
</style>