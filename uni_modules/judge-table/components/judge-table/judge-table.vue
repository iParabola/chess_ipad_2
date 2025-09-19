<template>
  <view>
    <uni-popup ref="popup" :mask-click="false">
      <!-- 指令上传表 -->
      <view v-if="showInfo.type === 'input'" class="upload-container">
        <view class="upload-panel">
          <view class="panel-header">
            <view class="panel-title">指令上传表</view>
            <view class="military-code">COMMAND UPLOAD SYSTEM</view>
          </view>

          <view class="upload-content">
            <view class="upload-table-wrapper">
              <!-- 表头 -->
              <view class="upload-table-header">
                <view class="upload-header-cell col-round">回合</view>
                <view class="upload-header-cell col-stage">阶段</view>
                <view class="upload-header-cell col-instruction">指挥员指令</view>
              </view>

              <!-- 表格内容 -->
              <view class="upload-table-body">
                <view class="upload-data-row">
                  <view class="upload-data-cell col-round">
                    <view class="cell-content">第{{ showInfo.chessRound }}回合</view>
                  </view>
                  <view class="upload-data-cell col-stage">
                    <view class="cell-content">{{ showInfo.roundPeriodName }}</view>
                  </view>
                  <view class="upload-data-cell col-instruction">
                    <view class="instruction-container">
                      <!-- 文件上传区域 -->
                      <view class="file-upload-area">
                        <view class="upload-title">文件上传</view>
                        <view class="upload-component">
                          <uv-upload
                            :fileList="fileList"
                            name="6"
                            :previewFullImage="true"
                            :maxCount="1"
                            :maxSize="2097152"
                            @afterRead="afterRead"
                            @delete="deletePic"
                            :customStyle="uploadCustomStyle"
                          ></uv-upload>
                        </view>
                      </view>

                      <!-- 文本输入区域 -->
                      <view class="text-input-area">
                        <view class="input-title">文本指令</view>
                        <view class="input-wrapper">
                          <input
                            type="text"
                            placeholder="请输入指令内容..."
                            v-model="instructionText"
                            class="instruction-input-field"
                          />
                        </view>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>

          <view class="panel-footer">
            <button class="sci-fi-button primary" @click="submitInstruct">
              <text class="button-icon">▲</text> 保存指令
            </button>
            <button class="sci-fi-button secondary" @click="close">
              <text class="button-icon">✕</text> 关闭
            </button>
          </view>
        </view>
      </view>

      <!-- 裁决表 -->
      <view v-else class="judge-container">
        <view class="judge-panel">
          <!-- 右上角关闭按钮 -->
          <view class="close-button-container">
            <button class="close-button" @click="close">
              <text class="close-icon">✕</text>
            </button>
          </view>
          
          <!-- 左上角跳过裁决按钮 -->
          <view v-if="showInfo.userType === 'admin'" class="skip-judge-button-container">
            <button class="skip-judge-button" @click="stepJudge">
              <text class="skip-judge-icon">⏭</text>
            </button>
          </view>

          <view class="panel-header">
            <view class="panel-title" v-if="showInfo.userType === 'admin'">导演打分裁决表</view>
            <view class="panel-title" v-else>指令裁决表</view>
            <view class="military-code" v-if="showInfo.userType === 'admin'">DIRECTOR SCORING & JUDGMENT SYSTEM</view>
            <view class="military-code" v-else>COMMAND JUDGMENT SYSTEM</view>
          </view>

          <!-- 整个表格滚动区域 -->
          <view class="judge-scroll-container">
            <!-- 固定表头区域 -->
            <view class="judge-header-container">
              <view class="judge-header">
                <view class="spacer-cell"></view> <!-- 左侧空白 -->
                <view class="judge-header-cell round-header">回合</view>
                <view class="judge-header-cell stage-header">阶段</view>
                <view class="judge-header-cell instruction-header">指挥员指令</view>
                <view class="judge-header-cell unit-header">单位</view>
                <view class="judge-header-cell action-header">部队动作</view>
                <view class="judge-header-cell result-header">裁决结果</view>
                <view class="judge-header-cell score-header">裁决得分</view>
                <view class="spacer-cell"></view> <!-- 右侧空白 -->
              </view>
            </view>

            <!-- 可滚动内容区域 -->
            <view class="judge-content">
            <view class="judge-table-content">
                <view v-for="(value, key) in recordMap" :key="key + 'map'" class="round-group">
                  <view v-for="(item, index) in value" :key="index" class="instruction-group">
                    <!-- 记录模式：合并同一指令下的多条记录为一行展示 -->
                    <template v-if="showInfo.type === 'record'">
                      <view :class="['judge-row', getGroupCampClass(item.historyVoList)]">
                        <view class="spacer-cell"></view> <!-- 左侧空白 -->
                        <view class="judge-cell round-cell">第{{ key }}回合</view>
                        <view class="judge-cell stage-cell">{{ item.roundPeriod | roundPeriodFormatter }}</view>

                        <view class="judge-cell instruction-cell">
                          <view class="instruction-display">
                            <view v-if="item.coverUrl" class="image-container">
                              <uv-image
                                :src="item.coverUrl"
                                @click="imageClick(item.coverUrl)"
                                class="instruction-image"
                                width="72px"
                                height="72px"
                                mode="aspectFill"
                                radius="6"
                                :style="{ width: '72px', height: '72px', borderRadius: '6px', overflow: 'hidden' }"
                              ></uv-image>
                            </view>
                            <view v-if="item.textIns" class="text-container">
                              <view class="instruction-text">{{ item.textIns }}</view>
                            </view>
                            <view v-if="!item.coverUrl && !item.textIns" class="no-instruction">暂无指令</view>
                          </view>
                        </view>

                        <view class="judge-cell unit-cell">
                          <view class="single-text">{{ combineUnits(item.historyVoList) }}</view>
                        </view>

                        <view class="judge-cell action-cell">
                          <view class="list-cell">
                            <view v-for="(txt, i) in flattenActionList(item.historyVoList)" :key="'act'+i" class="list-item">{{ txt }}</view>
                          </view>
                        </view>

                        <view class="judge-cell result-cell">
                          <view class="list-cell">
                            <view v-for="(txt, i) in pluckList(item.historyVoList, 'attackResult')" :key="'res'+i" class="list-item">{{ txt }}</view>
                          </view>
                        </view>
                        <view class="judge-cell score-cell">
                          <view class="list-cell">
                            <view v-for="(txt, i) in pluckList(item.historyVoList, 'attackScore')" :key="'sc'+i" class="list-item">{{ txt }}</view>
                          </view>
                        </view>
                        <view class="spacer-cell"></view> <!-- 右侧空白 -->
                      </view>
                    </template>

                    <!-- 非记录模式（裁决/打分）：保持逐条渲染 -->
                    <template v-else>
                      <view v-for="(eitem, eindex) in item.historyVoList" :key="eindex" :class="['judge-row', getRowCampClass(eitem)]">
                        <view class="spacer-cell"></view> <!-- 左侧空白 -->
                        <view class="judge-cell round-cell">第{{ key }}回合</view>
                        <view class="judge-cell stage-cell">{{ item.roundPeriod | roundPeriodFormatter }}</view>

                        <view class="judge-cell instruction-cell">
                          <view class="instruction-display">
                            <view v-if="item.coverUrl" class="image-container">
                              <uv-image
                                :src="item.coverUrl"
                                @click="imageClick(item.coverUrl)"
                                class="instruction-image"
                                width="72px"
                                height="72px"
                                mode="aspectFill"
                                radius="6"
                                :style="{ width: '72px', height: '72px', borderRadius: '6px', overflow: 'hidden' }"
                              ></uv-image>
                            </view>
                            <view v-if="item.textIns" class="text-container">
                              <view class="instruction-text">{{ item.textIns }}</view>
                            </view>
                            <view v-if="!item.coverUrl && !item.textIns" class="no-instruction">暂无指令</view>
                          </view>
                        </view>

                        <view class="judge-cell unit-cell">
                          <view class="single-text">{{ eitem.chessPiecesNumber }}</view>
                        </view>
                        <view class="judge-cell action-cell">
                          <view class="list-cell">
                            <view v-for="(txt, i) in normalizeList(eitem.actionDesc)" :key="'a'+i" class="list-item">{{ txt }}</view>
                          </view>
                        </view>

                        <view v-if="showInfo.type === 'record'" class="judge-cell result-cell">
                          {{ eitem.attackResult }}
                        </view>
                        <view v-else-if="showInfo.userType === 'admin'" class="judge-cell judge-action-cell">
                          <button @click="judgeOneByOne(eitem, key, index, eindex, 'judge')" class="judge-button">
                            {{ eitem.attackResult || '裁决' }}
                          </button>
                        </view>
                        <view v-else-if="showInfo.type === 'judge'" class="judge-cell judge-action-cell">
                          <button @click="judgeOneByOne(eitem, key, index, eindex, 'judge')"
                                  :class="['judge-button', eitem.status === 2 ? 'judged' : '']">
                            {{ eitem.status !== 2 ? '裁决' : '重新裁决' }}
                          </button>
                        </view>

                        <view v-if="showInfo.type === 'record'" class="judge-cell score-cell">
                          {{ eitem.attackScore }}
                        </view>
                        <view v-else-if="showInfo.userType === 'admin'" class="judge-cell score-cell">
                          <button @click="judgeOneByOne(eitem, key, index, eindex, 'score')"
                                  :class="['score-button', eitem.attackScore ? 'scored' : '']">
                            {{ eitem.attackScore ? `重新打分(${eitem.attackScore})` : '打分' }}
                          </button>
                        </view>
                        <view class="spacer-cell"></view> <!-- 右侧空白 -->
                      </view>
                    </template>
                  </view>
                </view>
              </view>
            </view>
          </view>

          <view class="panel-footer">
          </view>
        </view>
      </view>
    </uni-popup>

    <!-- 裁决弹窗 -->
    <uni-popup ref="judgePopup" :mask-click="false">
      <view class="sci-fi-panel judge-modal">
        <view class="panel-header">
          <view class="panel-title">部队行动裁决</view>
          <view class="military-code">UNIT ACTION JUDGMENT</view>
        </view>

        <view class="panel-content">
          <view class="action-info">
            <view class="info-row">
              <text class="label">部队行动：</text>
              <text class="value">{{ actionInfo.actionDesc }}</text>
            </view>
          </view>

          <!-- 裁决结果输入框 -->
          <view class="judge-input-section">
            <text class="input-label">裁决结果：</text>
            <input
              type="text"
              v-model="judgeResult"
              placeholder="请输入裁决结果或点击下方按钮选择"
              class="judge-input-field"
            />
            <view class="input-tip">
              <text class="tip-text">💡 提示：可以多次提交不同的裁决结果</text>
            </view>
          </view>

          <!-- 裁决规则表按钮 -->
          <view class="judge-rule-buttons">
            <text class="group-title">使用裁决规则表：</text>
            <button class="rule-button single-button" @click="openRuleTablePage">
              <text class="button-text">打开裁决规则表</text>
            </button>
          </view>
        </view>

        <view class="panel-footer">
          <button class="sci-fi-button primary" @click="confirmJudgeAction">
            <text class="button-icon">✓</text> 提交裁决
          </button>
          <button class="sci-fi-button secondary" @click="closeJudge">
            <text class="button-icon">✕</text> 关闭
          </button>
        </view>
      </view>
    </uni-popup>

    <!-- 打分弹窗 -->
    <uni-popup ref="scorePopup" :mask-click="false">
      <view class="sci-fi-panel score-modal">
        <!-- 右上角关闭按钮 -->
        <view class="close-button-container">
          <button class="close-button" @click="closeScore">
            <text class="close-icon">✕</text>
          </button>
        </view>

        <view class="panel-header">
          <view class="panel-title">部队行动打分</view>
          <view class="military-code">UNIT ACTION SCORING</view>
        </view>

        <view class="panel-content">
          <view class="action-info">
            <view class="info-row">
              <text class="label">部队行动：</text>
              <text class="value">{{ actionInfo.actionDesc || '当前行动' }}</text>
            </view>
            <view class="info-row" v-if="actionInfo.attackResult">
              <text class="label">裁决结果：</text>
              <text class="value">{{ actionInfo.attackResult }}</text>
            </view>
            <view class="info-row" v-if="actionInfo.attackScore">
              <text class="label">当前分数：</text>
              <text class="value">{{ actionInfo.attackScore }}分</text>
            </view>
          </view>

          <!-- 打分结果输入框 -->
          <view class="score-input-section">
            <text class="input-label">分项评分：</text>
            
            <!-- 第0回合：只有两个输入框 -->
            <template v-if="key == 0">
              <!-- 符合规则得分 -->
              <view class="score-item">
                <text class="score-label">符合规则得分 (权重50%)：</text>
                <input
                  type="number"
                  v-model="ruleScore"
                  placeholder="请输入分数"
                  class="score-input-field"
                  @input="calculateTotalScore"
                />
              </view>
              
              <!-- 实战要求得分 -->
              <view class="score-item">
                <text class="score-label">实战要求得分 (权重50%)：</text>
                <input
                  type="number"
                  v-model="practicalScore"
                  placeholder="请输入分数"
                  class="score-input-field"
                  @input="calculateTotalScore"
                />
              </view>
              
              <!-- 计算结果显示（第0回合） -->
              <view v-if="ruleScore || practicalScore" class="total-score-display">
                <text class="total-score-label">加权总分：</text>
                <text class="total-score-value">{{ calculatedScore }}分</text>
                <text class="calculation-detail">
                  ({{ ruleScore || 0 }} × 50% + {{ practicalScore || 0 }} × 50%)
                </text>
              </view>
            </template>
            
            <!-- 其他回合：三个输入框 -->
            <template v-else>
              <!-- 符合规则得分 -->
              <view class="score-item">
                <text class="score-label">符合规则得分 (权重10%)：</text>
                <input
                  type="number"
                  v-model="ruleScore"
                  placeholder="请输入分数"
                  class="score-input-field"
                  @input="calculateTotalScore"
                />
              </view>
              
              <!-- 实战要求得分 -->
              <view class="score-item">
                <text class="score-label">实战要求得分 (权重30%)：</text>
                <input
                  type="number"
                  v-model="practicalScore"
                  placeholder="请输入分数"
                  class="score-input-field"
                  @input="calculateTotalScore"
                />
              </view>
              
              <!-- 指挥效果得分 -->
              <view class="score-item">
                <text class="score-label">指挥效果得分 (权重60%)：</text>
                <input
                  type="number"
                  v-model="commandScore"
                  placeholder="请输入分数"
                  class="score-input-field"
                  @input="calculateTotalScore"
                />
              </view>
              
              <!-- 计算结果显示（其他回合） -->
              <view v-if="ruleScore || practicalScore || commandScore" class="total-score-display">
                <text class="total-score-label">加权总分：</text>
                <text class="total-score-value">{{ calculatedScore }}分</text>
                <text class="calculation-detail">
                  ({{ ruleScore || 0 }} × 10% + {{ practicalScore || 0 }} × 30% + {{ commandScore || 0 }} × 60%)
                </text>
              </view>
            </template>
          </view>
        </view>

        <view class="panel-footer">
          <button class="sci-fi-button primary" @click="confirmScoreAction">
            <text class="button-icon">✓</text> 提交打分
          </button>
          <button class="sci-fi-button secondary" @click="closeScore">
            <text class="button-icon">✕</text> 关闭
          </button>
        </view>
        <ScoreTable ref="scoreTablePopup" :showInfo="showInfo" :stageOptions="stageOptions"></ScoreTable>
      </view>
    </uni-popup>

    <!-- 规则表弹窗 -->
    <uni-popup ref="ruleTablePopup" :mask-click="false">
      <view class="sci-fi-panel rule-modal">
        <view class="panel-header compact-header">
          <view class="panel-title">部队行动裁决规则</view>
          <view class="military-code">UNIT ACTION JUDGMENT RULES</view>
        </view>
        <view class="panel-content">
          <RuleTable @close="onRuleTableClose" @selectResult="onRuleTableSelectResult"></RuleTable>
        </view>
      </view>
    </uni-popup>

  </view>
</template>

<script>
import {baseURL, getUserTokenStorage} from '@/api/http.js';
import {saveRoundCover, getHistoryTreeByRound, confirmJudge, saveTextInstruction} from '@/api/verdictRecord.js';
import ScoreTable from '@/pages/tables/index_v2.vue';
import RuleTable from '@/pages/tables/index.vue'; // 引入新的规则表组件


export default {
  name: 'judge-table',
  components: { // 注册组件
    ScoreTable,
    RuleTable // 注册规则表组件
  },
  props: {
    showInfo: {
      type: Object,
      default() {
        return {
          userType: '',
          type: '',
          chessRound: 0,
          roundPeriod: 0,
          roundPeriodName: '',
          verdictRecordId: undefined,
          campId: undefined,
          textIns: '',
        };
      }
    },
    redCampId: {
      type: [String, Number],
      default: undefined
    },
    blueCampId: {
      type: [String, Number],
      default: undefined
    },
    stageOptions: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  watch: {
    showInfo: {
      handler(newVal) {
        if (newVal.type === 'record' || newVal.type === 'judge') {
          this.getRoundTree(newVal);
        }
      },
      deep: true
    }
  },
  computed: {
    judgeOptions() {
      return [
        { value: '成功', label: '成功' },
        { value: '失败', label: '失败' },
        { value: '部分成功', label: '部分成功' }
      ];
    }
  },
  data() {
    return {
      fileList: [],
      uploadCustomStyle: {},
      recordMap: {},
      actionInfo: {},
      key: '',
      index: -1,
      eindex: -1,
      judge_result: '',
      judge_score: '', // 打分结果
      instructionText: '',
      toastMessage: '',
      showToast: false,
      judgeResult: '',
      messageHandler: null,
      tableWindow: null,
      scoreValue: '', // 打分值（用于向后兼容）
      // 新增的分项评分
      ruleScore: '', // 符合规则得分
      practicalScore: '', // 实战要求得分
      commandScore: '', // 指挥效果得分
      calculatedScore: 0 // 计算出的加权总分
    };
  },
  filters: {
    roundPeriodFormatter(val) {
      if (val === 0) {
        return '准备阶段';
      }
      let stageOptions = [
        {title: '直瞄射击阶段'},
        {title: '机动阶段'},
        {title: '解除压制阶段'},
        {title: '间瞄射击阶段'}
      ];
      return stageOptions[val - 1].title;
    }
  },
  mounted() {
  },
  methods: {
    getGroupCampClass(list = []) {
      if (!Array.isArray(list) || list.length === 0) return '';
      const first = list[0];
      const unitClass = this.getCampClassByUnit(this.extractUnit(first));
      if (unitClass) return unitClass;
      return this.getCampClassByCampId(this.extractCampId(first));
    },
    getRowCampClass(eitem) {
      const unitClass = this.getCampClassByUnit(this.extractUnit(eitem));
      if (unitClass) return unitClass;
      return this.getCampClassByCampId(this.extractCampId(eitem));
    },
    getCampClassByCampId(campId) {
      if (campId === this.redCampId) return 'camp-red';
      if (campId === this.blueCampId) return 'camp-blue';
      return '';
    },
    getCampClassByUnit(unitStr) {
      if (!unitStr) return '';
      const s = String(unitStr).trim();
      if (!s) return '';
      const lower = s.toLowerCase();
      if (s.includes('红军') || s.startsWith('红')) return 'camp-red';
      if (s.includes('蓝军') || s.startsWith('蓝')) return 'camp-blue';
      if (lower.startsWith('r')) return 'camp-red';
      if (lower.startsWith('b')) return 'camp-blue';
      return '';
    },
    extractCampId(obj) {
      if (!obj) return undefined;
      return obj.campId !== undefined ? obj.campId : obj.chessPiecesCampId;
    },
    extractUnit(obj) {
      if (!obj) return '';
      return obj.chessPiecesNumber != null ? String(obj.chessPiecesNumber) : '';
    },
    // 将传入值标准化为列表：
    // - 如果是数组，直接返回
    // - 如果是字符串，按换行/中文逗号/英文逗号/分号进行拆分
    // - 过滤空项，保证行渲染稳定
    normalizeList(val) {
      if (Array.isArray(val)) return val;
      if (val === null || val === undefined) return [];
      const text = String(val);
      // 优先按换行切分，其次通用分隔符
      const parts = text.split(/\n|,|，|;|；/).map(s => s.trim()).filter(Boolean);
      return parts.length ? parts : [text];
    },

    // 组合单位：把同一指令下多条历史的单位合并成一行，去重并按出现顺序排列
    combineUnits(list = []) {
      const seq = [];
      const seen = new Set();
      list.forEach(it => {
        const val = it && it.chessPiecesNumber != null ? String(it.chessPiecesNumber).trim() : '';
        if (val && !seen.has(val)) { seen.add(val); seq.push(val); }
      });
      return seq.join('、');
    },

    // 扁平化动作列表：把每条历史的动作描述拆分后拼在一起，逐条展示
    flattenActionList(list = []) {
      const out = [];
      list.forEach(it => {
        const parts = this.normalizeList(it && it.actionDesc);
        parts.forEach(p => out.push(p));
      });
      return out;
    },

    // 抽取字段列表（用于结果/得分列）
    pluckList(list = [], field) {
      return list.map(it => it && it[field]).filter(v => v !== undefined && v !== null && String(v).trim() !== '').map(String);
    },

    showCustomToast(message) {
      uni.showToast({
        title: message,
        icon: 'none',
        duration: 1500
      });
    },

    confirmJudge(notJudgeNumber) {
      this.recordMap[this.key][this.index].historyVoList[this.eindex].status = 2;

      // 导演端可以同时更新裁决结果和评分
      if (this.showInfo.userType === 'admin') {
        if (this.scoreValue) {
          this.recordMap[this.key][this.index].historyVoList[this.eindex].attackScore = this.scoreValue;
        }
        if (this.judgeResult) {
          this.recordMap[this.key][this.index].historyVoList[this.eindex].attackResult = this.judgeResult;
        }
      } else {
        this.recordMap[this.key][this.index].historyVoList[this.eindex].attackResult = this.judgeResult;
      }

      console.log('裁决完毕')
      this.$emit('judgeComplete');
    },

    confirmJudgeAction() {
      if (!this.judgeResult) {
        this.showCustomToast('请输入裁决结果');
        return;
      }
      this.judge_result = this.judgeResult;
      this.submitJudge();
    },

    confirmScore() {
      if (!this.scoreValue) {
        this.showCustomToast('请输入评分');
        return;
      }
      this.judge_score = this.scoreValue;
      this.submitJudge();
    },

    submitJudge() {
      // 导演端可以同时设置裁决结果和评分
      if (this.showInfo.userType === 'admin') {
        if (this.judge_score) {
          this.actionInfo.attackScore = this.judge_score;
        }
        if (this.judge_result) {
          this.actionInfo.attackResult = this.judge_result;
        }
      } else {
        this.actionInfo.attackResult = this.judge_result;
      }

      confirmJudge(this.actionInfo).then((res) => {
        if (res.data.code === 200) {
          this.showCustomToast("裁决提交成功，可继续裁决");
          this.confirmJudge(res.data.data);

          // 清空输入框，但不关闭弹窗，允许继续裁决
          this.judge_result = '';
          this.judgeResult = '';

          // 如果有评分输入框，也清空
          if (this.judge_score) {
            this.judge_score = '';
          }
          if (this.scoreValue) {
            this.scoreValue = '';
          }

          // 不再自动关闭弹窗，用户可以继续输入新的裁决结果
        } else {
          this.showCustomToast(res.data.msg || '提交失败');
        }
      }).catch(() => {
        this.showCustomToast('网络错误，请重试');
      });
    },

    stepJudge() {
      this.$refs.popup.close();
      this.$emit('stepJudge');
    },

    judgeOneByOne(eitem, key, index, eindex, actionType = null) {
      this.key = key;
      this.index = index;
      this.eindex = eindex;
      this.actionInfo = eitem;

      // 如果是导演端，根据actionType决定打开哪个弹窗
      if (this.showInfo.userType === 'admin') {
        if (actionType === 'score') {
          // 打开打分弹窗时，处理现有分数
          if (eitem.attackScore) {
            // 如果已有分数，尝试反推分项评分
            this.parseScoreFromTotal(eitem.attackScore);
          } else {
            // 如果没有分数，重置所有评分
            this.resetScores();
          }
          this.$refs.scorePopup.open();
        } else if (actionType === 'judge') {
          // 打开裁决弹窗时，如果已有裁决结果则显示
          if (eitem.attackResult) {
            this.judgeResult = eitem.attackResult;
          }
          this.$refs.judgePopup.open();
        } else {
          // 默认打开评分弹窗（保持向后兼容）
          this.resetScores();
          this.$refs.scorePopup.open();
        }
      } else {
        this.$refs.judgePopup.open();
      }
    },

    open() {
      this.$refs.popup.open();
    },

    close() {
      this.$refs.popup.close();
    },

    closeJudge() {
      this.$refs.judgePopup.close();
      this.judge_result = '';
      this.judgeResult = '';
    },

    // 打分相关方法
    confirmScoreAction() {
      // 根据回合数检查必填项
      if (this.key == 0) {
        // 第0回合：检查符合规则得分和实战要求得分
        if (!this.ruleScore || !this.practicalScore) {
          uni.showToast({
            title: '请填写符合规则得分和实战要求得分',
            icon: 'none',
            duration: 1500
          });
          return;
        }
      } else {
        // 其他回合：检查所有三项评分
        if (!this.ruleScore || !this.practicalScore || !this.commandScore) {
          uni.showToast({
            title: '请填写所有分项评分',
            icon: 'none',
            duration: 1500
          });
          return;
        }
      }

      // 确保计算总分
      this.calculateTotalScore();
      
      if (!this.calculatedScore && this.calculatedScore !== 0) {
        uni.showToast({
          title: '评分计算错误，请重新输入',
          icon: 'none',
          duration: 1500
        });
        return;
      }

      // 使用计算出的总分
      this.judge_score = this.calculatedScore;
      this.submitScore();
    },

    submitScore() {
      // 设置打分结果到actionInfo
      this.actionInfo.attackScore = this.judge_score;

      // 调用打分API（这里需要根据实际的API来调整）
      confirmJudge(this.actionInfo).then((res) => {
        if (res.data.code === 200) {
          uni.showToast({
            title: '打分提交成功，可继续打分',
            icon: 'success',
            duration: 1500
          });

          // 更新记录状态和分数
          this.recordMap[this.key][this.index].historyVoList[this.eindex].attackScore = this.judge_score;

          // 清空输入框，但不关闭弹窗，允许继续打分
          this.judge_score = '';
          this.scoreValue = '';

        } else {
          uni.showToast({
            title: res.data.msg || '提交失败',
            icon: 'none',
            duration: 1500
          });
        }
      }).catch(() => {
        uni.showToast({
          title: '网络错误，请重试',
          icon: 'none',
          duration: 1500
        });
      });
    },

    closeScore() {
      this.$refs.scorePopup.close();
      this.judge_score = '';
      this.resetScores(); // 重置所有评分
    },

    // 打开打分表页面（新窗口）
    openScoreTablePage() {
      this.$refs.scoreTablePopup.open();
    },

    // 打开裁决规则表页面
    openRuleTablePage() {
      this.$refs.ruleTablePopup.open(); // 调用 uni-popup 打开弹窗
    },

    // 监听规则表弹窗关闭事件
    onRuleTableClose() {
      console.log('规则表弹窗已关闭');
      this.$refs.ruleTablePopup.close(); // 调用 uni-popup 关闭弹窗
    },

    // 监听规则表选择结果事件
    onRuleTableSelectResult(result) {
      console.log('从规则表获取到选择结果:', result);
      this.handleTableResult(result); // 调用已有的处理方法
      this.$refs.ruleTablePopup.close(); // 关闭规则表弹窗
    },

    // 添加消息监听器 (此方法将不再需要，但保留注释以示修改)
    addMessageListener() {
      // this.messageHandler = (event) => {
      //   if (event.data && event.data.message) {
      //     const message = event.data.message;
      //     let result = '';
      //     if (message.includes('裁决结果为')) {
      //       result = message.replace('裁决结果为', '').trim();
      //     } else if (message.includes('攻击效果为')) {
      //       result = message.replace('攻击效果为', '').replace('，', '').trim();
      //     }
      //     if (result) {
      //       this.handleTableResult(result);
      //     }
      //   }
      // };
      // window.addEventListener('message', this.messageHandler);
    },

    // 移除消息监听器 (此方法将不再需要，但保留注释以示修改)
    removeMessageListener() {
      // if (this.messageHandler) {
      //   window.removeEventListener('message', this.messageHandler);
      //   this.messageHandler = null;
      // }
      // if (this.tableWindow && !this.tableWindow.closed) {
      //   this.tableWindow.close();
      //   this.tableWindow = null;
      // }
    },

    // 处理表格选择的结果
    handleTableResult(result) {
      // 将表格的结果填入裁决结果输入框
      if (result) {
        if (typeof result === 'object') {
          // 如果是对象，尝试获取有用的信息
          this.judgeResult = result.value || result.text || result.result || JSON.stringify(result);
        } else {
          // 如果是字符串或数字，直接使用
          this.judgeResult = String(result);
        }
        this.showCustomToast('裁决结果已自动填入');

        // 关闭表格窗口和清理监听器
        this.removeMessageListener();
      }
    },

    imageClick(url) {
      uni.previewImage({
        urls: [url]
      });
    },

    async getRoundTree(item) {
      let res = await getHistoryTreeByRound(item);
      let resArray = res.data.data;
      resArray = resArray.filter((item) => {
        item.historyVoList = item.historyVoList.filter((item) => item.actionDesc);
        return item.historyVoList.length > 0;
      });
      if (resArray.length === 0) {
        this.recordMap = {};
      } else {
        this.recordMap = this.groupBy(resArray, 'chessRound');
      }
    },

    groupBy(arr, key) {
      let obj = {};
      arr.forEach((item) => {
        if (!obj[item[key]]) {
          obj[item[key]] = [];
        }
        obj[item[key]].push(item);
      });
      return obj;
    },

    deletePic(e) {
      this.fileList.splice(e.index, 1);
    },

    async afterRead(event) {
      let lists = [].concat(event.file);
      let fileListLen = this.fileList.length;
      lists.map((item) => {
        this.fileList.push({
          ...item,
          status: 'uploading',
          message: '上传中'
        });
      });

      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url);
        let item = this.fileList[fileListLen];
        this.fileList.splice(
            fileListLen,
            1,
            Object.assign(item, {
              status: 'success',
              message: '',
              url: result
            })
        );
        fileListLen++;
      }
    },

    uploadFilePromise(avatarUrl) {
      return new Promise((resolve, reject) => {
        uni.uploadFile({
          url: baseURL + 'system/upload',
          filePath: avatarUrl,
          name: 'file',
          header: {
            Authorization: getUserTokenStorage()
          },
          success: (uploadFileRes) => {
            let jsonRes = JSON.parse(uploadFileRes.data);
            setTimeout(() => {
              resolve(jsonRes.data.url);
            }, 1000);
          },
          fail: (error) => {
            reject(error);
          }
        });
      });
    },

    async submitInstruct() {
      if ((!this.instructionText || !this.instructionText.trim()) && this.fileList.length === 0) {
        return this.showCustomToast('请至少上传图片或输入文本');
      }

      let textSaved = false;
      let imageSaved = false;
      let hasError = false;

      if (this.instructionText && this.instructionText.trim()) {
        this.showInfo.textIns = this.instructionText;
        try {
          let resText = await saveTextInstruction(this.showInfo);
          if (resText.data && resText.data.code === 200) {
            textSaved = true;
          } else {
            hasError = true;
          }
        } catch (error) {
          hasError = true;
        }
      }

      if (this.fileList.length !== 0) {
        this.showInfo.coverUrl = this.fileList[0].url;
        try {
          let resCover = await saveRoundCover(this.showInfo);
          if (resCover.data && resCover.data.code === 200) {
            imageSaved = true;
          } else {
            hasError = true;
          }
        } catch (error) {
          hasError = true;
        }
      }

      if (hasError) {
        this.showCustomToast('保存失败');
      } else if (textSaved || imageSaved) {
        this.showCustomToast('保存成功');
        this.fileList = [];
        this.instructionText = '';
        this.$refs.popup.close();
      }
    },

    // 计算加权总分
    calculateTotalScore() {
      const rule = parseFloat(this.ruleScore) || 0;
      const practical = parseFloat(this.practicalScore) || 0;
      const command = parseFloat(this.commandScore) || 0;
      
      let weighted = 0;
      
      // 根据回合数使用不同的权重计算
      if (this.key == 0) {
        // 第0回合：符合规则50% + 实战要求50%
        weighted = rule * 0.5 + practical * 0.5;
      } else {
        // 其他回合：符合规则10% + 实战要求30% + 指挥效果60%
        weighted = rule * 0.1 + practical * 0.3 + command * 0.6;
      }
      
      // 取整
      this.calculatedScore = Math.round(weighted);
      
      // 同步更新scoreValue用于向后兼容
      this.scoreValue = this.calculatedScore;
    },

    // 重置所有评分
    resetScores() {
      this.ruleScore = '';
      this.practicalScore = '';
      this.commandScore = '';
      this.calculatedScore = 0;
      this.scoreValue = '';
    },

    // 从总分反推分项评分（编辑时使用）
    parseScoreFromTotal(totalScore) {
      if (totalScore) {
        // 编辑现有分数时，不反推细分，只显示总分
        this.calculatedScore = parseFloat(totalScore);
        this.scoreValue = this.calculatedScore;
        // 保持细分输入框为空，让用户重新输入
        this.ruleScore = '';
        this.practicalScore = '';
        this.commandScore = '';
      } else {
        this.resetScores();
      }
    }
  },
  beforeDestroy() {
    // 组件销毁前清理消息监听器
    this.removeMessageListener();
  }
};
</script>

<style scoped>
/* ==================== 指令上传表样式 ==================== */
.upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: auto; /* 去掉全屏高度，消除上下多余留白 */
  background: #1a2e1a;
  padding: 10px 20px; /* 缩小上下边距 */
}

.upload-panel {
  background: linear-gradient(145deg, #2d4a2d 0%, #1a2e1a 50%, #2d4a2d 100%);
  border: 3px solid #4caf50;
  border-radius: 12px;
  box-shadow: none;
  width: 900px;
  max-width: 95vw;
  padding: 24px;
}

.upload-content {
  margin: 20px 0;
}

/* 上传表格布局 */
.upload-table-wrapper {
  width: 100%;
  border: 2px solid rgba(76, 175, 80, 0.5);
  border-radius: 8px;
  overflow: hidden;
}

.upload-table-header {
  display: flex;
  background: linear-gradient(135deg, #2e7d32 0%, #388e3c 50%, #2e7d32 100%);
}

.upload-header-cell {
  color: #e8f5e8;
  padding: 16px 12px;
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Courier New', monospace;
  border-right: 1px solid rgba(76, 175, 80, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-header-cell:last-child {
  border-right: none;
}

.upload-header-cell.col-round {
  flex: 0 0 150px;
}

.upload-header-cell.col-stage {
  flex: 0 0 150px;
}

.upload-header-cell.col-instruction {
  flex: 1;
  min-width: 400px;
}

.upload-table-body {
  background: linear-gradient(135deg, rgba(45, 69, 45, 0.9) 0%, rgba(26, 46, 26, 0.9) 100%);
}

.upload-data-row {
  display: flex;
  min-height: 200px;
}

.upload-data-cell {
  color: #e8f5e8;
  padding: 16px 12px;
  font-size: 15px;
  font-family: 'Courier New', monospace;
  border-right: 1px solid rgba(76, 175, 80, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-data-cell:last-child {
  border-right: none;
}

.upload-data-cell.col-round {
  flex: 0 0 150px;
}

.upload-data-cell.col-stage {
  flex: 0 0 150px;
}

.upload-data-cell.col-instruction {
  flex: 1;
  min-width: 400px;
  align-items: stretch;
  padding: 20px;
}

.cell-content {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
}

/* ==================== 裁决表样式 ==================== */
.judge-container {
  display: block;
  height: 85vh; /* 缩小页面高度到85%视窗高度 */
  background: #1a2e1a;
  padding: 0;
  overflow: hidden;
}

.judge-panel {
  background: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
  width: 100%;
  max-width: 100%;
  padding: 0 0 50px 0; /* 底部增加50px内边距，防止内容被遮挡 */
  position: relative;
  min-height: 100vh; /* 确保面板至少占满视窗高度 */
  box-sizing: border-box;
}

/* 统一滚动容器 */
.judge-scroll-container {
  width: 100%;
  max-height: calc(100vh - 200px); /* 为标题和底部按钮留出空间 */
  overflow-x: auto; /* 水平滚动 */
  overflow-y: auto; /* 垂直滚动 */
  border: 2px solid rgba(76, 175, 80, 0.4); /* 边框 */
  border-radius: 8px; /* 圆角 */
  background: rgba(26, 46, 26, 0.3); /* 背景色 */
}

.judge-content {
  margin: 0;
  width: 100%;
  padding-bottom: 20px; /* 底部内边距 */
  overflow: visible; /* 内容区域不再控制滚动 */
}

.judge-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; /* 固定表格布局，确保列宽严格按grid定义 */
}

.judge-header {
  display: grid;
  grid-template-columns: 20px 120px 120px 260px 140px 1fr 150px 150px 20px; /* 裁决结果和裁决得分都设为150px，保持对齐 */
  gap: 6px;
  margin-bottom: 6px;
}

.judge-header-cell {
  background: rgba(46, 125, 50, 0.9);
  color: #e8f5e8;
  padding: 15px 12px;
  text-align: left;
  font-weight: 700;
  font-size: 24px; /* 字体放大到24px */
  letter-spacing: 0.5px;
  font-family: 'Courier New', monospace;
  border: 1px solid rgba(76, 175, 80, 0.2);
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.judge-table-content {
  /* 内容区域不限制高度，让其自然展开，由外层judge-content控制滚动 */
  border: none;
  border-radius: 0;
  background: transparent;
  width: 100%;
  min-height: 100%; /* 确保内容至少填满容器 */
}

.judge-row {
  display: grid;
  grid-template-columns: 20px 120px 120px 260px 140px 1fr 150px 150px 20px; /* 裁决结果和裁决得分都设为150px，与表头完全一致 */
  align-items: stretch;
  gap: 6px;
  margin-bottom: 6px;
  background: transparent;
  border-radius: 0;
  overflow: visible;
  border: none;
  width: 100%;
  min-height: 80px;
}

.judge-cell {
  background: rgba(45, 69, 45, 0.55);
  color: #e8f5e8;
  padding: 15px 12px;
  text-align: left;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 80px;
  border: 1px solid rgba(76, 175, 80, 0.2);
  font-family: 'Courier New', monospace;
  word-wrap: break-word;
  overflow-wrap: break-word;
  box-sizing: border-box;
  overflow: visible; /* 确保单元格内容不被裁剪，由外层控制滚动 */
}

/* 阵营底色：红方与蓝方（单位/前缀判断优先，campId 兜底） */
.camp-red .judge-cell { background: rgba(183, 28, 28, 0.35); border-color: rgba(244, 67, 54, 0.35); }
.camp-blue .judge-cell { background: rgba(13, 71, 161, 0.35); border-color: rgba(33, 150, 243, 0.35); }

/* 空白占位单元格 */
.spacer-cell {
  background: transparent;
  border: none;
  min-height: 80px;
}

/* 表头容器样式 */
.judge-header-container {
  background: #1a2e1a;
  padding: 10px 0;
  border-bottom: 2px solid rgba(76, 175, 80, 0.3);
  margin-bottom: 10px;
  position: sticky; /* 固定表头 */
  top: 0;
  z-index: 100;
  border-radius: 8px 8px 0 0; /* 顶部圆角 */
}

/* 统一滚动容器的滚动条样式 - 绿色科幻主题 */
.judge-scroll-container::-webkit-scrollbar {
  width: 16px; /* 垂直滚动条宽度 */
  height: 16px; /* 水平滚动条高度 */
}

.judge-scroll-container::-webkit-scrollbar-track {
  background: rgba(26, 46, 26, 0.8);
  border-radius: 8px;
  border: 1px solid rgba(76, 175, 80, 0.2);
}

.judge-scroll-container::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 50%, #8bc34a 100%);
  border-radius: 8px;
  border: 2px solid rgba(26, 46, 26, 0.3);
  box-shadow: 0 2px 6px rgba(76, 175, 80, 0.3);
}

.judge-scroll-container::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #66bb6a 0%, #81c784 50%, #9ccc65 100%);
  box-shadow: 0 3px 8px rgba(76, 175, 80, 0.4);
}

.judge-scroll-container::-webkit-scrollbar-thumb:active {
  background: linear-gradient(135deg, #388e3c 0%, #4caf50 50%, #66bb6a 100%);
}

/* 滚动条交叉点样式 */
.judge-scroll-container::-webkit-scrollbar-corner {
  background: rgba(26, 46, 26, 0.8);
}

/* 全局图片强制显示规则 */
.judge-table-content img,
.judge-table-content image,
.judge-table-content .uv-image,
.judge-table-content [class*="image"] {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  position: relative !important;
  z-index: 10 !important;
}

/* 单元格中的列表，纵向堆叠，避免换行导致高度异常 */
.list-cell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  width: 100%;
}

.list-item {
  width: 100%;
  text-align: left;
  line-height: 1.5;
  word-break: break-word;
  font-size: 24px; /* 字体放大到24px */
}

.single-text {
  width: 100%;
  text-align: left;
  line-height: 1.5;
  word-break: break-word;
  font-size: 24px; /* 字体放大到24px */
}

/* 占位单元格：不显示内容但占位，维持 7 列对齐 */
.placeholder { visibility: hidden; }

/* ==================== 指令显示样式 ==================== */
.instruction-display {
  display: flex;
  flex-direction: column; /* 图片在上，文字在下，避免重叠 */
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 6px;
  gap: 6px;
}

.image-container {
  flex-shrink: 0;
  max-width: 100%;
  display: block !important; /* 确保容器始终显示 */
  visibility: visible !important;
  opacity: 1 !important; /* 确保不透明 */
  position: relative !important; /* 确保定位正常 */
  overflow: visible !important; /* 确保内容不被裁剪 */
}

.instruction-image {
  width: 72px !important;   /* 强制固定尺寸，防止消失 */
  height: 72px !important;
  border-radius: 6px;
  border: 2px solid rgba(76, 175, 80, 0.5);
  box-shadow: none;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block !important; /* 强制显示，防止被隐藏 */
  visibility: visible !important; /* 确保可见性 */
  opacity: 1 !important; /* 强制不透明 */
  position: relative !important; /* 确保定位 */
  z-index: 10 !important; /* 确保层级 */
  max-width: none !important; /* 防止被压缩 */
  min-width: 72px !important; /* 最小宽度 */
  min-height: 72px !important; /* 最小高度 */
}

.instruction-image:hover {
  border-color: #8bc34a;
  transform: scale(1.05);
}

.text-container {
  flex: 1;
  width: 100%;
}

.instruction-text {
  font-size: 24px; /* 字体放大到24px */
  word-break: break-word;
  line-height: 1.5;
  color: #e8f5e8;
  font-family: 'Courier New', monospace;
  text-align: left;
  max-width: 100%;
  overflow: visible;
  white-space: normal;
}

.no-instruction {
  font-size: 24px; /* 字体放大到24px */
  color: rgba(232, 245, 232, 0.6);
  font-style: italic;
  font-family: 'Courier New', monospace;
  text-align: left;
}

/* ==================== 弹窗样式 ==================== */
.judge-modal, .score-modal {
  width: 550px;
  min-height: 350px;
  padding: 28px;
  background: linear-gradient(145deg, #2d4a2d 0%, #1a2e1a 50%, #2d4a2d 100%);
  border: 3px solid #4caf50;
  border-radius: 12px;
  box-shadow: none;
}

/* ==================== 通用样式 ==================== */
.panel-header {
  text-align: center;
  margin-bottom: 24px;
  padding: 20px;
  background: linear-gradient(90deg, transparent 0%, rgba(76, 175, 80, 0.2) 50%, transparent 100%);
  border: 2px solid rgba(76, 175, 80, 0.4);
  border-radius: 8px;
  position: relative;
}

/* 紧凑型标题头 - 用于规则表弹窗 */
.compact-header {
  margin-bottom: 12px !important; /* 减少下边距 */
  padding: 12px 15px !important; /* 减少内边距 */
}

.compact-header .panel-title {
  font-size: 22px !important; /* 稍小的标题字体 */
  margin-bottom: 4px !important; /* 减少标题与副标题的间距 */
}

.compact-header .military-code {
  font-size: 10px !important; /* 稍小的副标题字体 */
}

/* .panel-header::before {
  content: '★';
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  color: #8bc34a;
  text-shadow: none;
} */

/* .panel-header::after {
  content: '★';
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  color: #8bc34a;
  text-shadow: none;
} */

.panel-title {
  font-size: 28px;
  font-weight: 800;
  color: #8bc34a;
  text-shadow: none;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
  margin-bottom: 8px;
}

.military-code {
  font-size: 12px;
  color: rgba(139, 195, 74, 0.8);
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  opacity: 0.8;
}

/* ==================== 指令容器样式 ==================== */
.instruction-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
}

.file-upload-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.upload-title {
  color: #8bc34a;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Courier New', monospace;
  text-shadow: none;
  text-align: center;
}

.upload-component {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 46, 26, 0.3);
  border: 1px solid rgba(76, 175, 80, 0.3);
  border-radius: 8px;
  padding: 16px;
  min-height: 80px;
}

.text-input-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-title {
  color: #8bc34a;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Courier New', monospace;
  text-shadow: none;
  text-align: center;
}

.input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
}

.instruction-input-field {
  width: 100%;
  background: linear-gradient(135deg, rgba(26, 46, 26, 0.8) 0%, rgba(45, 69, 45, 0.8) 100%);
  border: 2px solid #4caf50;
  color: #e8f5e8;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 16px;
  font-family: 'Courier New', monospace;
  box-shadow: none;
  transition: all 0.3s ease;
}

.instruction-input-field:focus {
  border-color: #8bc34a;
  box-shadow: none;
  outline: none;
}

.instruction-input-field::placeholder {
  color: rgba(232, 245, 232, 0.6);
  font-style: italic;
}

/* ==================== 按钮样式 ==================== */
.sci-fi-button {
  background: linear-gradient(135deg, #4caf50 0%, #388e3c 50%, #2e7d32 100%);
  border: 3px solid #8bc34a;
  color: #ffffff;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: none;
  margin: 0 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Courier New', monospace;
}

.sci-fi-button:hover {
  background: linear-gradient(135deg, #66bb6a 0%, #4caf50 50%, #388e3c 100%);
  box-shadow: none;
  transform: translateY(-2px);
}

.sci-fi-button.secondary {
  background: linear-gradient(135deg, #616161 0%, #424242 50%, #212121 100%);
  border-color: #9e9e9e;
}

.sci-fi-button.secondary:hover {
  background: linear-gradient(135deg, #757575 0%, #616161 50%, #424242 100%);
  box-shadow: none;
}

.judge-button, .score-button {
  background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
  border: 2px solid #8bc34a;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
  box-shadow: none;
}

.judge-button:hover, .score-button:hover {
  background: linear-gradient(135deg, #66bb6a 0%, #4caf50 100%);
  box-shadow: none;
  transform: translateY(-1px);
}

/* 已裁决按钮的样式 */
.judge-button.judged {
  background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
  border-color: #ffb74d;
}

.judge-button.judged:hover {
  background: linear-gradient(135deg, #ffb74d 0%, #ff9800 100%);
}

/* ==================== 打分弹窗样式 ==================== */
.score-modal {
  width: 650px;
  min-height: 450px;
  max-height: 80vh;
  padding: 28px;
  background: linear-gradient(145deg, #2d4a2d 0%, #1a2e1a 50%, #2d4a2d 100%);
  border: 3px solid #4caf50;
  border-radius: 12px;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.score-input-section {
  margin-bottom: 24px;
  padding: 16px;
  background: rgba(26, 46, 26, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.score-input-field {
  width: 80%;
  background: linear-gradient(135deg, rgba(26, 46, 26, 0.8) 0%, rgba(45, 69, 45, 0.8) 100%);
  border: 2px solid #4caf50;
  color: #e8f5e8;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 24px;
  font-family: 'Courier New', monospace;
  outline: none;
  transition: all 0.3s ease;
  margin-top: 8px;
}

.score-input-field:focus {
  border-color: #8bc34a;
  box-shadow: none;
  outline: none;
}

.score-input-field::placeholder {
  color: rgba(232, 245, 232, 0.6);
  font-style: italic;
}

/* 已打分按钮的样式 */
.score-button.scored {
  background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
  border-color: #64b5f6;
}

.score-button.scored:hover {
  background: linear-gradient(135deg, #64b5f6 0%, #2196f3 100%);
}

/* ==================== 分项评分样式 ==================== */
.score-item {
  margin-bottom: 16px;
  padding: 12px;
  background: rgba(45, 69, 45, 0.2);
  border-radius: 6px;
  border: 1px solid rgba(76, 175, 80, 0.2);
}

.score-label {
  display: block;
  color: #a5d6a7;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  font-family: 'Microsoft YaHei', sans-serif;
}

.score-item .score-input-field {
  width: 90%;
  margin-top: 4px;
  font-size: 18px;
  padding: 8px 12px;
}

.total-score-display {
  margin-top: 20px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(139, 195, 74, 0.15) 100%);
  border-radius: 8px;
  border: 2px solid rgba(76, 175, 80, 0.4);
  text-align: center;
}

.total-score-label {
  color: #a5d6a7;
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
}

.total-score-value {
  color: #4caf50;
  font-size: 28px;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  text-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
}

.calculation-detail {
  display: block;
  color: rgba(165, 214, 167, 0.8);
  font-size: 12px;
  margin-top: 8px;
  font-style: italic;
}

/* ==================== 打分表按钮样式 ==================== */
.score-table-section {
  margin-bottom: 24px;
}

.group-title {
  color: #8bc34a;
  font-weight: 700;
  margin-bottom: 16px;
  display: block;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
  text-shadow: none;
  font-size: 24px;
}

.table-button {
  background: linear-gradient(135deg, #2e7d32 0%, #388e3c 50%, #4caf50 100%);
  border: 2px solid #8bc34a;
  color: #ffffff;
  padding: 16px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.table-button:hover {
  background: linear-gradient(135deg, #388e3c 0%, #4caf50 50%, #66bb6a 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.table-button:active {
  transform: translateY(0);
}

.button-text {
  font-size: 24px;
  font-weight: 600;
  font-family: 'Courier New', monospace;
  text-align: center;
  line-height: 1.2;
}

.panel-footer {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  padding: 16px;
  background: linear-gradient(90deg, transparent 0%, rgba(76, 175, 80, 0.1) 50%, transparent 100%);
  border-top: 2px solid rgba(76, 175, 80, 0.4);
  border-radius: 8px;
}

.button-icon {
  margin-right: 8px;
  font-size: 16px;
  font-weight: bold;
  text-shadow: none;
}

/* ==================== 弹窗内容样式 ==================== */
.action-info {
  margin-bottom: 24px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(26, 46, 26, 0.8) 0%, rgba(45, 69, 45, 0.8) 100%);
  border-radius: 10px;
  border: 2px solid rgba(76, 175, 80, 0.4);
  box-shadow: none;
}

.info-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(76, 175, 80, 0.2);
}

.info-row:last-child {
  margin-bottom: 0;
  border-bottom: none;
}

.label {
  color: #8bc34a;
  font-weight: 700;
  margin-right: 16px;
  min-width: 120px;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
  text-shadow: none;
}

.value {
  color: #e8f5e8;
  flex: 1;
  font-family: 'Courier New', monospace;
}

/* ==================== 裁决选项样式 ==================== */
.judge-options {
  margin-bottom: 24px;
  padding: 16px;
  background: rgba(26, 46, 26, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.group-title {
  color: #8bc34a;
  font-weight: 700;
  margin-bottom: 16px;
  display: block;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
  text-shadow: none;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.radio-item {
  display: flex;
  align-items: center;
  color: #e8f5e8;
  cursor: pointer;
  padding: 12px 16px;
  border-radius: 6px;
  transition: all 0.3s ease;
  border: 1px solid rgba(76, 175, 80, 0.2);
  background: rgba(45, 69, 45, 0.3);
  font-family: 'Courier New', monospace;
}

.radio-item:hover {
  background: rgba(76, 175, 80, 0.2);
  border-color: rgba(76, 175, 80, 0.5);
  box-shadow: none;
}

.radio-item radio {
  margin-right: 12px;
  transform: scale(1.2);
}

/* ==================== 评分输入样式 ==================== */
.score-input {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  background: rgba(26, 46, 26, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.input-label {
  color: #8bc34a;
  font-weight: 700;
  margin-right: 16px;
  min-width: 80px;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
  text-shadow: none;
}

.score-field {
  flex: 1;
  background: linear-gradient(135deg, rgba(26, 46, 26, 0.8) 0%, rgba(45, 69, 45, 0.8) 100%);
  border: 2px solid #4caf50;
  color: #e8f5e8;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 16px;
  font-family: 'Courier New', monospace;
  box-shadow: none;
  transition: all 0.3s ease;
}

.score-field:focus {
  border-color: #8bc34a;
  box-shadow: none;
  outline: none;
}

.score-field::placeholder {
  color: rgba(232, 245, 232, 0.6);
  font-style: italic;
}

/* ==================== 固定表头样式 ==================== */
.judge-header-container {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #1a2e1a;
  padding: 10px 0;
}

/* ==================== 右上角关闭按钮样式 ==================== */
.close-button-container {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.close-button {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background: linear-gradient(135deg, #d32f2f 0%, #f44336 50%, #d32f2f 100%);
  border: 2px solid #ff5722;
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(211, 47, 47, 0.3);
}

.close-button:hover {
  background: linear-gradient(135deg, #f44336 0%, #ff5722 50%, #f44336 100%);
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(211, 47, 47, 0.4);
}

.close-button:active {
  transform: scale(0.95);
}

.close-icon {
  font-size: 20px;
  line-height: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* ==================== 跳过裁决按钮样式 ==================== */
.skip-judge-button-container {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000;
}

.skip-judge-button {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background: transparent;
  border: none;
  color: #999999;
  font-size: 20px;
  font-weight: normal;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: 0.7;
}

.skip-judge-button:hover {
  background: rgba(153, 153, 153, 0.1);
  color: #666666;
  opacity: 1;
  transform: scale(1.05);
}

.skip-judge-button:active {
  transform: scale(0.95);
  background: rgba(153, 153, 153, 0.2);
}

.skip-judge-icon {
  font-size: 18px;
  line-height: 1;
}

/* ==================== 固定表头和滚动区域样式 ==================== */
.judge-header-container {
  flex-shrink: 0; /* 表头不参与滚动，固定显示 */
  background: #1a2e1a;
  padding: 10px 0;
  border-bottom: 2px solid rgba(76, 175, 80, 0.3);
  z-index: 100;
}

/* 整体表格滚动条样式 - 绿色科幻主题 */
.judge-content::-webkit-scrollbar {
  width: 14px; /* 稍微加宽滚动条 */
}

.judge-content::-webkit-scrollbar-track {
  background: rgba(26, 46, 26, 0.8);
  border-radius: 8px;
  border: 1px solid rgba(76, 175, 80, 0.2);
}

.judge-content::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 50%, #8bc34a 100%);
  border-radius: 8px;
  border: 2px solid rgba(26, 46, 26, 0.3);
  box-shadow: 0 2px 6px rgba(76, 175, 80, 0.3);
}

.judge-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #66bb6a 0%, #81c784 50%, #9ccc65 100%);
  box-shadow: 0 3px 8px rgba(76, 175, 80, 0.4);
}

.judge-content::-webkit-scrollbar-thumb:active {
  background: linear-gradient(135deg, #388e3c 0%, #4caf50 50%, #66bb6a 100%);
}

/* ==================== 裁决输入框样式 ==================== */
.judge-input-section {
  margin-bottom: 24px;
  padding: 16px;
  background: rgba(26, 46, 26, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.judge-input-field {
  width: 100%;
  background: linear-gradient(135deg, rgba(26, 46, 26, 0.8) 0%, rgba(45, 69, 45, 0.8) 100%);
  border: 2px solid #4caf50;
  color: #e8f5e8;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 24px;
  font-family: 'Courier New', monospace;
  outline: none;
  transition: all 0.3s ease;
  margin-top: 8px;
}

.judge-input-field:focus {
  border-color: #8bc34a;
  box-shadow: none;
  outline: none;
}

.judge-input-field::placeholder {
  color: rgba(232, 245, 232, 0.6);
  font-style: italic;
}

.input-tip {
  margin-top: 8px;
  padding: 8px 12px;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 4px;
  border-left: 3px solid #4caf50;
}

.tip-text {
  color: rgba(139, 195, 74, 0.9);
  font-size: 16px;
  font-family: 'Courier New', monospace;
  font-style: italic;
}

/* ==================== 裁决规则按钮样式 ==================== */
.judge-rule-buttons {
  margin-bottom: 24px;
}

.group-title {
  color: #8bc34a;
  font-weight: 700;
  margin-bottom: 16px;
  display: block;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
  text-shadow: none;
  font-size: 24px;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.single-button {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.rule-button {
  background: linear-gradient(135deg, #2e7d32 0%, #388e3c 50%, #4caf50 100%);
  border: 2px solid #8bc34a;
  color: #ffffff;
  padding: 16px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
}

.rule-button:hover {
  background: linear-gradient(135deg, #388e3c 0%, #4caf50 50%, #66bb6a 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.rule-button:active {
  transform: translateY(0);
}

.button-text {
  font-size: 20px;
  font-weight: 600;
  font-family: 'Courier New', monospace;
  text-align: center;
  line-height: 1.2;
}

</style>
