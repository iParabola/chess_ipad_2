<template>
  <div class="container">
    <h1>想定得分统计表</h1>
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
          <span v-else :class="{ 'grey-text': !scores.planDeployment }">{{ scores.planDeployment || '符合规则（50）' }}</span>
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
          <span v-else :class="{ 'grey-text': !scores.combinedIndicators }">{{ scores.combinedIndicators || '实战要求（50）' }}</span>
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
          <span v-else :class="{ 'grey-text': !scores.ruleCompliance }">{{ scores.ruleCompliance || '符合规则（10）' }}</span>
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
          <span v-else :class="{ 'grey-text': !scores.combatRequirement }">{{ scores.combatRequirement || '实战要求（20）' }}</span>
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
          <span v-else :class="{ 'grey-text': !scores.commandEffect }">{{ scores.commandEffect || '指挥效果（60）' }}</span>
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
          <span v-else :class="{ 'grey-text': !scores.finalStrength }">{{ scores.finalStrength || '最终实力分值占比*20得分' }}</span>
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
          <span v-else :class="{ 'grey-text': !scores.combatResult }">{{ scores.combatResult || '胜方得80，负方不得分' }}</span>
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
    </div>
  </div>
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
        planDeployment: '符合规则（50）',
        combinedIndicators: '实战要求（50）',
        ruleCompliance: '符合规则（10）',
        combatRequirement: '实战要求（20）',
        commandEffect: '指挥效果（60）',
        damageRatio: '战损比情况（20）',
        combatOutcome: '作战胜负（80）',
        finalStrength: '最终实力分值占比*20得分',
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

      return ((ruleScore * 0.1) + (combatScore * 0.2) + (commandScore * 0.6)).toFixed(2);
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
        planDeployment: '符合规则（50）',
        combinedIndicators: '实战要求（50）',
        ruleCompliance: '符合规则（10）',
        combatRequirement: '实战要求（20）',
        commandEffect: '指挥效果（60）',
        damageRatio: '战损比情况（20）',
        combatOutcome: '作战胜负（80）',
        finalStrength: '最终实力分值占比*20得分',
        combatResult: '胜方得80，负方不得分'
      };
      return placeholders[cellKey];
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px 15px;
  text-align: center;
  vertical-align: middle;
}

th {
  background-color: #f8f9fa;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f8f8f8;
}

tr:hover {
  background-color: #e9ecef;
}

.editable {
  background-color: #fff;
  cursor: pointer;
}

.editable:hover {
  background-color: #e9ecef;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.input-placeholder::placeholder {
  color: #ccc; /* 浅灰色 */
}

.total-row {
  font-weight: bold;
  background-color: #f8f9fa;
}

.header-row {
  background-color: #f1f1f1;
}

.stage-title {
  text-align: left;
  font-weight: bold;
}

.note {
  margin-top: 20px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-size: 14px;
  color: #6c757d;
}
.grey-text {
  color: #d3d3d3; /* 灰白色 */
}
</style>