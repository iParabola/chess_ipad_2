<template>
	<view class="xinyi-content">
    <view class="foot-view">
      <xinyi-steps
          :options="roundOptions"
          :active="roundActive"
          :canClick="true"
          :clickType="'round'"
          arrowRight
          :campData="campList"
          @setScore="scoreTableShow"
          :initType="initType"
      ></xinyi-steps>
    </view>
    <view v-if="showToast" class="custom-toast">
      {{ toastMessage }}
    </view>
		<view class="rightBtn" v-if="initType !== 'watch'">
<!--			<view class="btnView" @click="showActionDescFunc">记录明细</view>-->
<!--			<view class="btnView" @click="getRealTimeScore">实时得分</view>-->
			<view v-if="userType === 'user'" class="btnView" @click="getJudgeTable">指令录入</view>
			<view class="btnView" @click="getJudgeResult">裁决结果</view>
      <view v-if="game.status === 50 && userType === 'user'" class="btnView" @click="getScore">最后得分</view>
<!--			<view v-if="userType === 'admin'" class="btnView" @click="getTableScoreFinal">推演得分</view>-->
			<view class="btnView" @click="getFinalSummary">推演汇总</view>
		</view>
		<view class="middleBtn">
			<view class="btnView" v-if="isMove" @click="moveStop">移动结束</view>
			<view class="btnView" v-if="nextStageFlag" @click="nextStage">{{ nextBtnText }}</view>
		</view>

    <view class="top">
      <view class="top-head">
        <image src="/static/image/wargame/火力.svg" style="width: 15%; height: 7vh;"></image>
        <view style="height: 7vh; line-height: 7vh; font-size: 25px; color: #4cf5e3;">火力战</view>
        <view style="height: 7vh; line-height: 8vh; font-size: 18px; color: white; margin-left: 10px">房间号：{{game.inviteCode}}</view>
      </view>
      <view class="top-middle">
        <div class="react-left ml-3">
          <span v-if="game.nowRound === 0 && game.isDeplaoy && userType === 'user'" class="text">准备阶段</span>
          <span v-else-if="game.nowRound === 0 && game.isDeplaoy && userType !== 'user'" class="text">准备阶段</span>
          <span v-else-if="game.chessRound === 0" class="text">准备阶段</span>
          <span v-else-if="userType === 'admin' && game.status !== 50"  class="text"> 第{{game.chessRound}}回合： {{ stage[stageActive] }} </span>
          <span v-else-if="game.status !== 50" class="text"> 第{{game.chessRound}}回合：{{ stage[stageActive] }}——{{stage2[statusIndex]}} </span>
          <span v-else class="text">游戏结束</span>
        </div>
      </view>
      <view class="top-tail">
        <div class="react-right">
          <span class="react-after"></span>
          <span style="width: 40%; margin-left: 10%" class="text">
            <view class="top-tail-action" hover-class="hover-top-tail-action">
              <view v-if="game.nowRound === 0 && game.isDeplaoy && userType === 'user'"
                    @click="endDeployFunc()">
                结束准备
              </view>
              <view v-if="userType === 'user' && game.nowRound !== 0 && userStageNotSubmit"
                    @click="endRoundFunc()">
                结束指挥
              </view>
              <view v-if="userType === 'judge' && roundEnd" @click="judge()">
                 裁决
              </view>
              <view v-if="userType === 'user' && game.nowRound !== 0 && userModify"
                    @click="endRoundFuncAndSetRoundActionPoint()">
                 结束走棋
              </view>
              <view v-if="userType === 'admin'"
                  @click="judge()">
                打分
              </view>
            </view>
          </span>
          <span>
          </span>
          <span style="width: 50%;" class="text">{{ avatarText }}{{ avatarDesc }}: {{user.userName}}</span>
        </div>
      </view>
    </view>

<!--		<view class="top__view">-->
<!--			<xinyi-steps-->
<!--				:options="stageOptions"-->
<!--				:active="stageActive"-->
<!--				arrowRight-->
<!--				:canClick="true"-->
<!--				:clickType="'stage'"-->
<!--				:statusDesc="statusDesc"-->
<!--				:isAdmin="userType === 'admin'"-->
<!--				:statusIndex="statusIndex"-->
<!--			></xinyi-steps>-->
<!--			<view class="dice-toolbar__veiw">-->
<!--				<button-->
<!--					class="stage-over__btn"-->
<!--					type="primary"-->
<!--					v-if="game.nowRound === 0 && game.isDeplaoy && userType === 'user'"-->
<!--					@click="endDeployFunc()"-->
<!--				>-->
<!--					结束部署-->
<!--				</button>-->
<!--				<button-->
<!--					class="stage-over__btn"-->
<!--					type="primary"-->
<!--					v-if="userType === 'user' && game.nowRound !== 0 && userStageNotSubmit"-->
<!--					@click="endRoundFunc()"-->
<!--				>-->
<!--					提交-->
<!--				</button>-->
<!--				<button class="stage-over__btn" type="primary" v-if="userType === 'judge' && roundEnd" @click="judge()">-->
<!--					裁决-->
<!--				</button>-->
<!--        <button-->
<!--            class="stage-over__btn"-->
<!--            type="primary"-->
<!--            v-if="userType === 'user' && game.nowRound !== 0 && userModify"-->
<!--            @click="endRoundFuncAndSetRoundActionPoint()"-->
<!--        >-->
<!--          修正-->
<!--        </button>-->
<!--        <button-->
<!--            class="stage-over__btn"-->
<!--            type="primary"-->
<!--            v-if="userType === 'admin'"-->
<!--            @click="judge()"-->
<!--        >-->
<!--          打分-->
<!--        </button>-->
<!--			</view>-->
<!--			<view class="avatar-view">-->
<!--				<uv-avatar :text="avatarText" size="60" fontSize="20" bg-color="#7f7f00" color="#ffffff"></uv-avatar>-->
<!--				<view>{{ avatarDesc }}</view>-->
<!--			</view>-->
<!--		</view>-->

    <NjustScorePopup ref="njustScore" :user-type="userType" :game="game" :camp-id="campId" :verdict-record-id="verdictRecordId" @setFinalScore="setFinalScore"></NjustScorePopup>

    <uv-modal
        :showCancelButton="true"
        ref="attackConfirm"
        @cancel="cancelAttack()"
        @confirm="attackPoint()"
        title="确认"
        content="是否攻击该位置"
        width="200rpx"
    ></uv-modal>
    <uv-modal
        :showCancelButton="true"
        ref="scoutConfirm"
        @cancel="scoutConfirm = false"
        @confirm="scoutPoint()"
        title="确认"
        content="是否侦察该位置"
        width="200rpx"
    ></uv-modal>
    <uv-modal
        :showCancelButton="true"
        ref="reactanceConfirm"
        @cancel="reactanceConfirm = false"
        @confirm="reactancePoint()"
        title="确认"
        content="是否要解除压制"
        width="200rpx"
    ></uv-modal>

    <uv-modal
        :showCancelButton="true"
        ref="communicationConfirm"
        @cancel="communicationConfirm = false"
        @confirm="communicationPoint()"
        title="确认"
        content="是否与此点位进行通信？"
        width="200rpx"
    ></uv-modal>
    <uv-modal
      :showCancelButton="true"
      ref="moveConfirm"
      @cancel="moveConfirm = false"
      @confirm="movePoint()"
      title="确认"
      width="200rpx"
      content="是否移动到该位置"
  ></uv-modal>
    <uv-modal
        :showCancelButton="true"
        ref="moveChessConfirmModal"
        @cancel="moveChessConfirmModal = false"
        @confirm="moveChessConfirm()"
        title="确认"
        width="200rpx"
        content="是否移动到该位置"
    ></uv-modal>
    <uni-drawer ref="showActionDesc" mode="right" :width="400">
      <view class="scroll-view" style="padding-right: 30px">
        <scroll-view class="scroll-view-box" scroll-y="true" style="height: 80vh">
          <uni-card v-for="(item, index) in game.actionDescList" :key="index">
            <view @click="cjResult(index)" v-html="item"></view>
          </uni-card>
        </scroll-view>
      </view>
    </uni-drawer>
    <uni-drawer ref="showRealTimeScore" mode="right" :width="400">
      <view class="scroll-view" style="padding-right: 30px">
        <uni-table border>
          <uni-tr class="rowTitle">
            <uni-td align="center">{{ realTimeScore.firstCampName }}</uni-td>
            <uni-td align="center">阵营</uni-td>
            <uni-td align="center">{{ realTimeScore.secondCampName }}</uni-td>
          </uni-tr>
          <uni-tr class="rowTitle">
            <uni-td align="center">{{ realTimeScore.firstScoretype1 }}</uni-td>
            <uni-td align="center">指挥口令规范性</uni-td>
            <uni-td align="center">{{ realTimeScore.secondScoretype1 }}</uni-td>
          </uni-tr>
          <uni-tr class="rowTitle">
            <uni-td align="center">{{ realTimeScore.firstScoretype2 }}</uni-td>
            <uni-td align="center">指挥要素完备性</uni-td>
            <uni-td align="center">{{ realTimeScore.secondScoretype2 }}</uni-td>
          </uni-tr>
          <uni-tr class="rowTitle">
            <uni-td align="center">{{ realTimeScore.firstScoretype3 }}</uni-td>
            <uni-td align="center">打击效果</uni-td>
            <uni-td align="center">{{ realTimeScore.secondScoretype3 }}</uni-td>
          </uni-tr>
          <uni-tr class="rowTitle">
            <uni-td align="center">{{ realTimeScore.firstScoretypeTotal }}</uni-td>
            <uni-td align="center">总分</uni-td>
            <uni-td align="center">{{ realTimeScore.secondScoretypeTotal }}</uni-td>
          </uni-tr>
        </uni-table>
      </view>
    </uni-drawer>
    <score-table
        ref="scoreTable"
        :data="campListItem"
        :scoreList="scoreList"
        @submitScore="submitScore"
    ></score-table>
    <judge-table
        ref="judgeTable"
        :showInfo="judgeTableShowInfo"
        :stageOptions="stageOptions"
        @judgeComplete="judgeComplete"
        @stepJudge="stepJudge"
    ></judge-table>
    <score-table-final
        ref="scoreTableFinal"
        :scoreList="finalScoreList"
        :data="finalData"
        @submitScore="submitScoreFinal"
    ></score-table-final>
    <final-summary
        ref="finalSummary"
        :dataArray="summaryScoreData"
        :round="chartRound"
        :campData="campList"
    ></final-summary>
    <uv-modal :showCancelButton="false" :showConfirmButton="false" title="棋子选着" ref="showSelPiece">
      <view>
        <div style="display: flex; flex-wrap: wrap; justify-content: flex-start">
          <div
              v-if="!item.isAdd && item.chessPiecesCampId === campId"
              @click="selPiece(item)"
              v-for="(item, index) in game.userPiece"
              style="width: 77upx; height: 77upx"
              :key="index"
          >
            <uv-image
                style="margin-left: 11upx"
                :src="item.chessPiecesCover"
                width="55upx"
                height="55upx"
            ></uv-image>
            <div style="text-align: center">{{ item.chessPiecesName }}</div>
          </div>
        </div>
      </view>
    </uv-modal>
    <uv-modal :showCancelButton="false" :showConfirmButton="false" title="切换棋子" ref="switchChess">
      <view>
        <div style="display: flex; flex-wrap: wrap; justify-content: flex-start">
          <div
              @click="switchPiece(item)"
              v-for="(item, index) in pointInfoList"
              style="width: 77upx; height: 77upx"
              :key="index"
          >
            <uv-image
                style="margin-left: 11upx"
                :src="item.chessPiecesCover"
                width="55upx"
                height="55upx"
            ></uv-image>
            <div style="text-align: center">{{ item.chessPiecesName }}</div>
          </div>
        </div>
      </view>
    </uv-modal>
    <view v-if="showChessOptionInfo.visible"
          class="newcontextmenu"
          name="newcontextmenu"
          :style="{ left: showChessOptionInfo.left + 'px', top: showChessOptionInfo.top + 'px', zIndex: 1001 }">
      <view class="score-btn-view">
        <uv-text
            v-if="showChessOptionInfo.stacked"
            prefixIcon="empty-history"
            iconStyle="font-size: 19px"
            :text="'切换棋子'"
            color="#ffffff"
            :size="18"
            :iconStyle="{ color: '#ffffff', size: 18 }"
            @click="switchChess()"
        ></uv-text>
<!--        <uv-text-->
<!--            prefixIcon="empty-history"-->
<!--            iconStyle="font-size: 19px"-->
<!--            :text="'添加棋子'"-->
<!--            color="#ffffff"-->
<!--            :size="18"-->
<!--            :iconStyle="{ color: '#ffffff', size: 18 }"-->
<!--            @click="continueAddChess()"-->
<!--        ></uv-text>-->
<!--        <uv-text-->
<!--            prefixIcon="empty-history"-->
<!--            iconStyle="font-size: 19px"-->
<!--            :text="'删除棋子'"-->
<!--            color="#ffffff"-->
<!--            :size="18"-->
<!--            :iconStyle="{ color: '#ffffff', size: 18 }"-->
<!--            @click="delChess()"-->
<!--        ></uv-text>-->
        <uv-text
            prefixIcon="empty-history"
            iconStyle="font-size: 19px"
            :text="'移动棋子'"
            color="#ffffff"
            :size="18"
            :iconStyle="{ color: '#ffffff', size: 18 }"
            @click="setIsMoveEmploy()"
        ></uv-text>
      </view>
    </view>
    <view
        v-if="showChessButtonInfo.visible"
        :style="{ left: showChessButtonInfo.left + 'px', top: showChessButtonInfo.top + 'px', zIndex: 1001 }"
        class="newcontextmenu"
        name="newcontextmenu"
    >
      <view class="score-btn-view">
        <!-- <uv-text
          prefixIcon="empty-history"
          iconStyle="font-size: 19px"
          :text="'攻击'"
          color="#ffffff"
          :size="18"
          :iconStyle="{ color: '#ffffff', size: 18 }"
          @click="attack()"
        ></uv-text> -->
        <uv-text
            v-if="game.roundPeriod==2&&this.selCellInfo.roundActionPoint=='1'&&this.selCellInfo.status!='PRESS'"
            prefixIcon="empty-history"
            iconStyle="font-size: 19px"
            :text="'机动'"
            color="#ffffff"
            :size="18"
            :iconStyle="{ color: '#ffffff', size: 18 }"
            @click="move()"
        ></uv-text>
        <!--				<uv-text-->
        <!--					prefixIcon="empty-history"-->
        <!--					iconStyle="font-size: 19px"-->
        <!--					:text="'侦察'"-->
        <!--					color="#ffffff"-->
        <!--					:size="18"-->
        <!--					:iconStyle="{ color: '#ffffff', size: 18 }"-->
        <!--					@click="scout()"-->
        <!--				></uv-text>-->
        <!--				<uv-text-->
        <!--					prefixIcon="empty-history"-->
        <!--					iconStyle="font-size: 19px"-->
        <!--					:text="'通信'"-->
        <!--					color="#ffffff"-->
        <!--					:size="18"-->
        <!--					:iconStyle="{ color: '#ffffff', size: 18 }"-->
        <!--					@click="communication()"-->
        <!--				></uv-text>-->
        <uv-text
            v-if="game.roundPeriod==1&&this.selCellInfo.roundActionPoint=='1'&&this.selCellInfo.status!='PRESS'&&this.selCellInfo.status!='FIRE'"
            prefixIcon="empty-history"
            iconStyle="font-size: 19px"
            :text="'直瞄打击'"
            color="#ffffff"
            :size="18"
            :iconStyle="{ color: '#ffffff', size: 18 }"
            @click="attack()"
        ></uv-text>
        <uv-text
            v-if="game.roundPeriod==3&&this.selCellInfo.roundActionPoint=='1'&&this.selCellInfo.status=='PRESS'"
            prefixIcon="empty-history"
            iconStyle="font-size: 19px"
            :text="'解除压制'"
            color="#ffffff"
            :size="18"
            :iconStyle="{ color: '#ffffff', size: 18 }"
            @click="releasePress()"
        ></uv-text>
        <uv-text
            v-if="game.roundPeriod==4&&this.selCellInfo.roundActionPoint=='1'&&this.selCellInfo.status!='PRESS'&&this.selCellInfo.status!='FIRE'"
            prefixIcon="empty-history"
            iconStyle="font-size: 19px"
            :text="'间瞄射击'"
            color="#ffffff"
            :size="18"
            :iconStyle="{ color: '#ffffff', size: 30}"
            @click="attack()"
        ></uv-text>
<!--        <uv-text-->
<!--            v-if="statusIndex === 2"-->
<!--            prefixIcon="empty-history"-->
<!--            iconStyle="font-size: 19px"-->
<!--            :text="'轻损'"-->
<!--            color="#ffffff"-->
<!--            :size="18"-->
<!--            :iconStyle="{ color: '#ffffff', size: 18 }"-->
<!--            @click="changeChessStatus_('ATTACK_MID')"-->
<!--        ></uv-text>-->
<!--        <uv-text-->
<!--            v-if="statusIndex === 2"-->
<!--            prefixIcon="empty-history"-->
<!--            iconStyle="font-size: 19px"-->
<!--            :text="'中损'"-->
<!--            color="#ffffff"-->
<!--            :size="18"-->
<!--            :iconStyle="{ color: '#ffffff', size: 18 }"-->
<!--            @click="changeChessStatus_('ATTACK_MODERATE')"-->
<!--        ></uv-text>-->
<!--        <uv-text-->
<!--            v-if="statusIndex === 2"-->
<!--            prefixIcon="empty-history"-->
<!--            iconStyle="font-size: 19px"-->
<!--            :text="'重损'"-->
<!--            color="#ffffff"-->
<!--            :size="18"-->
<!--            :iconStyle="{ color: '#ffffff', size: 18 }"-->
<!--            @click="changeChessStatus_('ATTACK_SEVERE')"-->
<!--        ></uv-text>-->
<!--        <uv-text-->
<!--            v-if="statusIndex === 2"-->
<!--            prefixIcon="empty-history"-->
<!--            iconStyle="font-size: 19px"-->
<!--            :text="'轻微干扰'"-->
<!--            color="#ffffff"-->
<!--            :size="18"-->
<!--            :iconStyle="{ color: '#ffffff', size: 18 }"-->
<!--            @click="changeChessStatus_('REACTANCE_MID')"-->
<!--        ></uv-text>-->
<!--        <uv-text-->
<!--            v-if="statusIndex === 2"-->
<!--            prefixIcon="empty-history"-->
<!--            iconStyle="font-size: 19px"-->
<!--            :text="'中度干扰'"-->
<!--            color="#ffffff"-->
<!--            :size="18"-->
<!--            :iconStyle="{ color: '#ffffff', size: 18 }"-->
<!--            @click="changeChessStatus_('REACTANCE_MODERATE')"-->
<!--        ></uv-text>-->
<!--        <uv-text-->
<!--            v-if="statusIndex === 2"-->
<!--            prefixIcon="empty-history"-->
<!--            iconStyle="font-size: 19px"-->
<!--            :text="'重度干扰'"-->
<!--            color="#ffffff"-->
<!--            :size="18"-->
<!--            :iconStyle="{ color: '#ffffff', size: 18 }"-->
<!--            @click="changeChessStatus_('REACTANCE_SEVERE')"-->
<!--        ></uv-text>-->
        <uv-text
            v-if="statusIndex === 2&&this.selCellInfo.status!='PRESS'"
            prefixIcon="empty-history"
            iconStyle="font-size: 19px"
            :text="'压制'"
            color="#ffffff"
            :size="18"
            :iconStyle="{ color: '#ffffff', size: 18 }"
            @click="changeChessStatus_('PRESS')"
        ></uv-text>
        <uv-text
            v-if="statusIndex === 2"
            prefixIcon="empty-history"
            iconStyle="font-size: 19px"
            :text="'击毁'"
            color="#ffffff"
            :size="18"
            :iconStyle="{ color: '#ffffff', size: 18 }"
            @click="changeChessStatus_('KILL')"
        ></uv-text>
        <uv-text
            v-if="statusIndex === 2"
            prefixIcon="empty-history"
            iconStyle="font-size: 19px"
            :text="'失火'"
            color="#ffffff"
            :size="18"
            :iconStyle="{ color: '#ffffff', size: 18 }"
            @click="changeChessStatus_('FIRE')"
        ></uv-text>
<!--        <uv-text-->
<!--            v-if="statusIndex === 2&&game.roundPeriod==3&&this.selCellInfo.roundActionPoint=='1'&&this.selCellInfo.status=='PRESS'"-->
<!--            prefixIcon="empty-history"-->
<!--            iconStyle="font-size: 19px"-->
<!--            :text="'解除压制'"-->
<!--            color="#ffffff"-->
<!--            :size="18"-->
<!--            :iconStyle="{ color: '#ffffff', size: 18 }"-->
<!--            @click="releasePress()"-->
<!--        ></uv-text>-->
      </view>
    </view>
    <view
        v-if="showChessListInfo.visible"
        :style="{ left: showChessListInfo.left + 'px', top: showChessListInfo.top + 'px', width: '200px' }"
        class="newcontextmenu"
        name="newcontextmenu"
    >
      <view class="score-btn-view">
        <view
            class="chess-view"
            v-for="(item, index) in pointChessList"
            :key="index"
            @click="showChessAction($event, item)"
        >
          {{ item.chessPiecesName + '-' + item.chessPiecesNumber }}
        </view>
        <!-- <uv-text
          v-for="(item, index) in pointChessList"
          :key="index"
          prefixIcon="empty-history"
          :text="item.chessPiecesName + '-' + item.chessPiecesNumber"
          color="#ffffff"
          :size="18"
          iconStyle="28"
          @click="showChessAction($event, item)"
        ></uv-text> -->
      </view>
    </view>
    <rule-table ref="popupRule" :dataArray="ruleArray"></rule-table>
    <uni-popup ref="popup" :isMaskClick="false" maskBackgroundColor="rgba(0,0,0,0.2)">
      <view class="dice__veiw">
        <xinyi-dice v-for="(item, index) in diceCount" :key="index" :ref="`dice${index}`"></xinyi-dice>
      </view>
    </uni-popup>
    <blow-effect-table
        ref="blowEffectTable"
        :dataArray="blowEffectList"
        @maskClick="blowEffectMaskClick"
    ></blow-effect-table>
    <!-- <judge-reactance-table ref="judgeReactanceTable"></judge-reactance-table> -->
    <!-- <judge-disturb-table ref="judgeReactanceTable"></judge-disturb-table> -->
    <!-- <judge-command-control-table ref="judgeCommandControlTable"></judge-command-control-table> -->
    <view id="map"></view>
  </view>
</template>

<script>
import item from "ol-ext/legend/Item";
let vector;
import 'ol/ol.css';
import 'ol-ext/dist/ol-ext.css';
import 'ol-games/dist/ol-games.css';
import {Map, View, Collection} from 'ol';
import Draw from 'ol/interaction/Draw.js';
import HexGrid from 'ol-ext/render/HexGrid.js';
import FlowLine from 'ol-ext/style/FlowLine.js';
import HexMap from 'ol-games/source/HexMap.js';
import Feature from 'ol/Feature.js';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';
import {OSM, Vector as VectorSource, StadiaMaps as StadiaMapsSource} from 'ol/source.js';
import {
  Layer,
  Tile as TileLayer,
  Vector as VectorLayer,
  VectorImage as VectorImageLayer,
  Image as ImageLayer
} from 'ol/layer.js';
import {defaults as defaultControls} from 'ol/control';
import Projection from 'ol/proj/Projection.js';
import Static from 'ol/source/ImageStatic.js';
import Overlay from 'ol/Overlay.js';
import Polygon from 'ol/geom/Polygon.js';
import Point from 'ol/geom/Point.js';
import LineString from 'ol/geom/LineString.js';
import Icon from 'ol/style/Icon.js';
import WebGLVectorLayerRenderer from 'ol/renderer/webgl/VectorLayer.js';
import {getOssById} from '@/api/system.js';
import {
  getMapCoordinate,
  queryGameStatus,
  queryChessRound,
  queryPrompt,
  queryVerdictResult,
  queryActionEffect,
  isOwnRound,
  queryAllChessPiecesInfo,
  endDeploy,
  chessPiecesAction,
  deployChessPieces,
  undeployChessPieces,
  endRound,
  moveChess,
  chessPiecesActionNew,
  changePiecesActionPoint,
  getRuleList,
  getBlowEffectList,
  chessPiecesActionContinue,
  submitScore,
  queryScoreList,
  getRealTimeScore,
  getSummaryScore,
  getRoundStatus,
  judge,
  getMapChessImage,
  nextStage, resetPiecesActionPoint,
  changeChessStatus,
  getMap,
  stepJudge,
  setScore,
  getScoreByCampId, getSummaryScoreNew
} from '@/api/verdictRecord';
import {sendMsg} from '@/api/websocket.js';
import NjustScorePopup from "@/uni_modules/njust-score-popup/njust-score-popup.vue";

export default {
  data() {
    return {
      mapInfo: {
        row: 99,
        col: 130
      },

      stage: ['直瞄射击阶段', '机动阶段', '解除压制阶段', '间瞄射击阶段'],
      stage2: ['指挥时节', '裁决时节', '走棋时节'],
      coordinateMap: {},
      imageArray: ['village', 'wood', 'bridge', 'city', 'shrub'],
      imageMap: undefined,
      statusImageArray: ["ACTED","ATTACK_MID", "ATTACK_MODERATE", "ATTACK_SEVERE", "REACTANCE_MID", "REACTANCE_MODERATE", "REACTANCE_SEVERE", "SCOUT_CONFIRM", "SCOUT_FIND", "SCOUT_RECOGNITION", 'PRESS', 'KILL', 'FIRE'],
      verdictRecordId: '',
      campId: '',
      user: {},
      game: {
        status: 0,
        chessRound: 1,
        nowRound: 0,
        baseRound: 0,
        userPiece: '',
        isDeplaoy: true,
        isOwn: false,
        showSettlement: false,
        settlement: '',
        showResult: false,
        result: 0,
        resultStr: '',
        allRound: 0,
        roundPeriod: '',
        roundDesc: '',
        actionDescList: []
      },
      roundActive: 0,
      stageActive: 0,
      userType: '',
      isAdmin: false,
      chessRoundLimit: 0,
      campList: [],
      avatarText: '',
      avatarDesc: '',
      roundOptions: [],
      stageOptions: [],
      historyList: [],
      roundStatusList: [],
      selectIndex: [],
      selectTargetIndex: [],
      statusDesc: '',
      roundEnd: false,
      userStageNotSubmit: false,
      statusIndex: -1,
      judgeTableShowInfo: {},
      realTimeScore: {
        firstCampName: '',
        firstScoretype1: 0,
        firstScoretype2: 0,
        firstScoretype3: 0,
        firstScoretypeTotal: 0,
        secondCampName: '',
        secondScoretype1: 0,
        secondScoretype2: 0,
        secondScoretype3: 0,
        secondScoretypeTotal: 0
      },
      showScoreButtonInfo: {
        visible: false,
        top: 0,
        left: 0
      },
      campListItem: {},
      scoreList: [],
      summaryDataArray: [],
      finalData: [],
      finalScoreList: [],
      summaryScoreData: [],
      chartRound: 0,
      selCellInfo: {},
      targetCellInfo: {},
      mapChessArray: [],
      chessOnMapArray: [],
      pointOffset: [],
      hex: {},
      mapChessMap: {},
      mapChessImageMap: {},
      showChessButtonInfo: {
        visible: false,
        top: 0,
        left: 0
      },
      showChessOptionInfo: {
        stacked: false,
        visible: false,
        top: 0,
        left: 0
      },
      showChessListInfo: {
        visible: false,
        top: 0,
        left: 0
      },
      pointChessList: [],
      ruleArray: [],
      diceCount: 2,
      blowEffectList: [],
      showActionDescFlag: false,
      showRealTimeScoreFlag: false,
      stageStatusActive: 0,
      chessMoveArray: [],
      isMove: false,
      isAttack: false,
      isScout: false,
      isReactance: false,
      nextStageFlag: false,
      scoutConfirm: false,
      reactanceConfirm: false,
      isCommunication: false,
      communicationConfirm: false,
      flowLineArr: [], // 画箭头存储点集合
      nextBtnText: "下一回合",
      initType: "",
      pointInfoList: [],
      selectedIndexInMapChessArray: -1,
      hexLayer: "",
      attackLine: "",
      periodActionChessList:[],

      userModify: false,

      toastMessage: '',
      showToast: false,

      isMoveEmploy:false,

      countdown: 30, // 倒计时初始值
      countdownInterval: null, // 倒计时计时器

    };
  },
  components: {NjustScorePopup},
  mounted() {
    // this.$refs.judgeCommandControlTable.open()
    if (this.userType === 'user') {
      this.loadCountdown();
      this.startCountdown();
    }
  },
  beforeDestroy() {
    this.clearCountdown();
  },
  onLoad(res) {
    this.onMessage();
    this.user = uni.getStorageSync('user');
    console.log('user', this.user)
    console.log('res', res)
    this.verdictRecordId = res.verdictRecordId;
    this.campId = res.campId;
    this.initType = res.type;
    // this.queryAllFunc();
    // this.initChessRound();
    // setTimeout(() => {
    // 	this.queryUsChessPiecesInfoFunc();
    // }, 2121);
    // 注册websocket监听;
    this.init();
  },
  methods: {
    showCustomToast(message) {
      this.toastMessage = message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 1500); // Toast 显示 1.5 秒
    },
    loadCountdown(){
      const savedCountdown = localStorage.getItem('countdown');
      if (savedCountdown !== null) {
        this.countdown = parseInt(savedCountdown, 10);
      }
    },
    startCountdown() {
      this.countdownInterval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          this.endDeployFunc();
          this.clearCountdown();
        }
      }, 1000);
    },
    clearCountdown() {
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
        this.countdownInterval = null;
      }
    },
    async init() {
      uni.showLoading({
        title: "地图数据加载中..."
      })
      let data = {
        verdictRecordId: this.verdictRecordId
      };
      console.log(data)
      getMap(data).then((res)=>{
        console.log(res)
        this.mapInfo.row = res.data.data.longitudinalDimension;
        this.mapInfo.col = res.data.data.transverseDimension;
      });


      let res = await getMapCoordinate(data);
      console.log("coordinateMap", res)
      this.coordinateMap = res.data.data;
      let chessImageData = {
        verdictRecordId: this.verdictRecordId
      };
      let chessImageRes = await getMapChessImage(chessImageData);
      this.mapChessImageMap = chessImageRes.data.data;
      console.log('this.mapChessImageMap: ', this.mapChessImageMap);
      await this.initImage();

    },
    // websocket 接收信息
    onMessage() {
      uni.$on('onMessage', (res) => {
        let jsonRes = JSON.parse(res.data);
        let action = jsonRes.action;
        console.log('jsonRes', jsonRes)
        switch (action) {
          case 'shakeDice':
            this.$refs.popupRule.close();
            let diceArr = jsonRes.data;
            this.shakeDice(diceArr);
            break;
          case 'lookUpTable':
            this.getRuleList();
            break;
          case 'colseTable':
            break;
          case 'takeAction':
            console.log("takeAction:来了");
            this.queryAllFunc(jsonRes.round);
            break;
          case 'endRound':
            //更新管理员看到的提交状态
            this.getRoundStatus();
            break;
          case 'judge':
            //裁决结果展示
            let judgeData = jsonRes.data;
            this.judgeShow(judgeData);
            break;
          case 'refresh':
            this.refresh();
            break;
          case 'drawRoad':
            let road = jsonRes.data;
            this.drawRoad(road);
            break;
          case 'clearRoad':
            vector.getSource().clear();
            break;
          case 'nextRound':
            this.resetRoundActionPoint();
            break;

          default:
            break;
        }
      });
    },
    async initImage() {
      let that = this;
      that.imageMap = new Map();
      console.log('imageMap', that.imageMap)
      for (name of that.imageArray) {
        let src = '/static/image/terrain/' + name + '.png';
        await that.loadImage(src).then(function (img) {
          that.imageMap.set(name, img);
        });
      }
      for (var key in this.mapChessImageMap) {
        let value = this.mapChessImageMap[key];
        console.log('value: ', value);
        let oss = await getOssById(value);
        console.log('oss: ', oss.data.data.fileName);
        let coverUrl = this.baseOssIpPort + oss.data.data.fileName;
        await that.loadImage(coverUrl).then(function (img) {
          that.imageMap.set(key, img);
        });
      }
      for (name of that.statusImageArray) {
        let src = '/static/image/status/' + name + '.png';
        await that.loadImage(src).then(function (img) {
          that.imageMap.set(name, img);
        });
      }

      that.initMap();
    },
    loadImage(src) {
      return new Promise(function (resolve, reject) {
        console.log('src: ', src);
        const img = new Image();
        img.src = src; // 设置图片的src，开始加载图片
        img.onload = function () {
          resolve(img); // 图片加载完成，将img对象传递给resolve
        };
        img.onerror = function () {
          reject(new Error('Image load failed')); // 图片加载失败，reject带上错误信息
        };
      });
    },
    initMap() {
      let that = this;
      // Layers
      var layers = [
        // new TileLayer({ preload: Infinity, source: new OSM() })
      ];
      // Popup
      // The map
      var map = new Map({
        target: 'map',
        view: new View({
          minZoom: 13,
          maxZoom: 17,
          zoom: 15,
          center: [13240200, 3767000],
          enableRotation: false
        }),
        layers: layers,
        controls: defaultControls({
          zoom: false,
          rotate: false,
          attribution: false
        })
      });
      this.queryAllFunc();
      // var grid = new HexGrid({ size: 4000, origin: map.getView().getCenter(), row: 39, col: 54 });
      var grid = new HexGrid({
        size: 200,
        origin: map.getView().getCenter(),
        row: this.mapInfo.row,
        col: this.mapInfo.col,
        coordinateMap: this.coordinateMap,
        imageMap: this.imageMap
      });
      var hex = new HexMap({hexGrid: grid});
      // this.hex = hex;
      // this.hexLayer = new ImageLayer({source: hex});
      // // this.hexLayer.setOpacity(0.7);
      // map.addLayer(this.hexLayer);
      this.hex = hex;
      map.addLayer(new ImageLayer({ source: hex }));

      var text = false;
      // hex.set('text', text);
      hex.set('text', 'offset'); // axial cube offset
      hex.showCoordiantes('offset');
      // grid.setLayout('flat');
      // grid.setSize($(4000);
      console.log('origin', grid.getOrigin());
      var flowStyle = new FlowLine({
        color: 'red',
        color2: 'red',
        width: 8,
        width2: 8,
        _acolor: 'red',
        arrow: 1
      });

      function getStyle(feature, res) {
        /* ol < 7 need a style to make the feature selectable
        return [ defaultStyle, flowStyle ];
        */
        return flowStyle;
      }

      vector = new VectorImageLayer({
        source: new VectorSource({features: new Collection()}),
        style: getStyle
      });
      map.addLayer(vector);

      // Styles
      var greenStyle = new Style({
        fill: new Fill({color: 'rgba(0,255,0,0.2)'}),
        stroke: new Stroke({color: 'green', width: 1.25})
      });
      var blueStyle = new Style({
        fill: new Fill({color: 'rgba(0,0,255,0.2)'}),
        stroke: new Stroke({color: 'blue', width: 1.25})
      });
      var redStyle = new Style({
        fill: new Fill({color: 'rgba(255,0,0,0.2)'}),
        stroke: new Stroke({color: 'red', width: 1.25})
      });

      var current = [];
      var start = false;

      map.on(['click'], function (e) {

        if (that.showChessOptionInfo.visible) {
          that.showChessOptionInfo.visible = false;
          return;
        }
        // hex.drawArrow([-5,1],[-4,0])
        that.showChessListInfo.visible = false;
        that.showChessButtonInfo.visible = false;
        that.showChessOptionInfo.stacked = false;
        // that.showChessOptionInfo.visible=false;
        if (that.userType !== 'user') {
          return;
        }
        let ehex = grid.coord2hex(e.coordinate);
        var h = grid.hex2offset(ehex);
        if (that.game.nowRound === 0) {
          console.log("bushu")
          if(that.isMoveEmploy){
            console.log("yidong")
            // that.pointOffset = h
            that.targetCellInfo = {
              offset: h[0] + ',' + h[1],
              coordinate: hex.hexToPointNumber(h[1], h[0], that.mapInfo.row, that.mapInfo.col)
            };
            that.$refs.moveChessConfirmModal.open();
            // that.$refs.moveChessConfirmModal=true;
            that.isMoveEmploy=false;
          }else{
            console.log("xuanze")
            //判断这个格子里有没有棋子
            let exixitChess = 0;
            let campIdt;
            for (let i = 0; i < that.mapChessArray.length; i++) {
              if (that.mapChessArray[i].offset === JSON.stringify(h).slice(1, -1)) {
                exixitChess = 1;
                that.selCellInfo=that.mapChessArray[i].info;
                campIdt = that.mapChessArray[i].info.chessPiecesCampId;
                console.log(that.mapChessArray[i].infoList);
                that.selectedIndexInMapChessArray = i;
                console.log("selectedIndexInMapChessArray", that.selectedIndexInMapChessArray)
                if (that.mapChessArray[i].infoList.length > 1) {
                  that.showChessOptionInfo.stacked = true;
                  that.pointInfoList = that.mapChessArray[i].infoList;
                }
                break;
              }
            }
            console.log(exixitChess)

            if (exixitChess) {
              // console.log(e.coordinate)
              let pix = map.getPixelFromCoordinate(e.coordinate);
              // console.log(typeof pix)
              // console.log(typeof pix[0])
              let x = pix[0]; //这个应该是相对于整个浏览器页面的x坐标，左上角为坐标原点（0,0）
              let y = pix[1]; //这个应该是相对于整个浏览器页面的y坐标，左上角为坐标原点（0,0）
              that.showChessOptionInfo.top = y;
              that.showChessOptionInfo.left = x;
              that.pointOffset = h;
              console.log(campIdt)
              console.log(that.campId)
              if (campIdt === that.campId) that.showChessOptionInfo.visible = true;
            } else {
              that.pointOffset = h;
              // that.$refs.showSelPiece.open();
            }
          }

          console.log(h)

        }
        else {
          if (that.isMove) {
            //棋子移动
            // that.chessMove(h);
            that.targetCellInfo = {
              offset: h[0] + ',' + h[1],
              coordinate: hex.hexToPointNumber(h[1], h[0], that.mapInfo.row, that.mapInfo.col)
            };

            if (that.flowLineArr.length === 0) {
              let first = grid.hex2coord(grid.offset2hex(that.selCellInfo.offset.split(',')));
              that.flowLineArr.push(first);
            }

            // draw lines
            var line_hex = grid.coord2hex(e.coordinate);
            let cc = grid.hex2coord(line_hex);
            if (that.flowLineArr.toString().indexOf(cc.toString()) < 0) {
              that.flowLineArr.push(cc);
              var feature = vector.getSource().getFeatureById(that.selCellInfo.chessPiecesNumber)
              if (feature) {
                vector.getSource().removeFeature(feature);
              }
              vector.getSource().clear();
              var l = new Feature({
                geometry: new LineString(that.flowLineArr),
                style: getStyle,
                type: 'LineString'
              });
              l.setId(that.selCellInfo.chessPiecesNumber)
              vector.getSource().addFeature(l);
              let data = {
                array: that.flowLineArr,
                campId: that.campId,
                userId: that.user.id,
                chessNumber: that.selCellInfo.chessPiecesNumber
              }
              sendMsg(
                  JSON.stringify({
                    action: 'drawRoad',
                    verdictRecordId: that.verdictRecordId,
                    data: data
                  })
              );
            }
          }
          else if (that.isScout) {
            that.targetCellInfo = {
              offset: h[0] + ',' + h[1],
              coordinate: hex.hexToPointNumber(h[1], h[0], that.mapInfo.row, that.mapInfo.col)
            };
            that.$refs.scoutConfirm.open();
          }
          else if (that.isReactance) {
            that.targetCellInfo = {
              offset: h[0] + ',' + h[1],
              coordinate: hex.hexToPointNumber(h[1], h[0], that.mapInfo.row, that.mapInfo.col)
            };
            that.$refs.reactanceConfirm.open();
          }
          else if (that.isCommunication) {
            that.targetCellInfo = {
              offset: h[0] + ',' + h[1],
              coordinate: hex.hexToPointNumber(h[1], h[0], that.mapInfo.row, that.mapInfo.col)
            };
            that.$refs.communicationConfirm.open();
          }
          else if (that.isAttack) {
            that.targetCellInfo = {
              offset: h[0] + ',' + h[1],
              coordinate: hex.hexToPointNumber(h[1], h[0], that.mapInfo.row, that.mapInfo.col),
              chessPiecesNumber: ""
            };
            console.log(that.mapChessArray)
            for (let i = 0; i < that.mapChessArray.length; i++) {
              console.log(typeof that.mapChessArray[i].offset, typeof (h[0] + ',' + h[1]))
              if (that.mapChessArray[i].offset === (h[0] + ',' + h[1])) {
                that.targetCellInfo.chessPiecesNumber = that.mapChessArray[i].info.chessPiecesNumber;
                break;
              }

            }
            if (that.flowLineArr.length === 0) {
              let first = grid.hex2coord(grid.offset2hex(that.selCellInfo.offset.split(',')));
              that.flowLineArr.push(first);
            }
            var line_hex = grid.coord2hex(e.coordinate);
            let cc = grid.hex2coord(line_hex);
            if (that.flowLineArr.toString().indexOf(cc.toString()) < 0) {
              that.flowLineArr.push(cc);
              var feature = vector.getSource().getFeatureById(that.selCellInfo.chessPiecesNumber)
              if (feature) {
                vector.getSource().removeFeature(feature);
              }
              var flowStyle = new FlowLine({
                color: 'red',
                color2: 'red',
                width: 8,
                width2: 8,
                _acolor: 'red',
                arrow: 1
              });
              // vector.getSource().clear();
              that.attackLine = new Feature({
                geometry: new LineString(that.flowLineArr),
                style: flowStyle,
                type: 'LineString'
              });
              that.attackLine.setId(that.selCellInfo.chessPiecesNumber)

              // let data ={
              //   array:that.flowLineArr,
              //   campId:that.campId,
              //   userId:that.user.id,
              //   chessNumber: that.selCellInfo.chessPiecesNumber
              // }
              // sendMsg(
              //     JSON.stringify({
              //       action: 'drawRoad',
              //       verdictRecordId: that.verdictRecordId,
              //       data: data
              //     })
              // );

            }

            that.$refs.attackConfirm.open();
          }
          else {

            //获取格子里的棋子
            let selectArray = that.getChessByOffset(h[0] + ',' + h[1]);
            console.log("selectArray",selectArray)
            if (selectArray.length <= 0 && !that.isMove) {
              return;
            } else {
              console.log("that.game.roundPeriod",that.game.roundPeriod)
              if(that.statusIndex == 1&&that.userType=="user") {
                // that.$message('当前阶段无法对棋子进行操作');
                uni.showToast({
                  title: '当前阶段无法对棋子进行操作',
                  icon: 'none',
                })
                return;
              }
              //TODO 先不写棋子堆叠（默认一个棋子）
              let chess = {};
              if (selectArray.length === 1) {
                chess = selectArray[0];
              } else if (selectArray.length > 1) {
                //todo 棋子堆叠时处理选中棋子的action Point改变
                chess = selectArray[0];
                //展示棋子列表
                // if(chess.chessPiecesCampId == that.campId){
                that.pointChessList = selectArray;
                that.chessClick(e, 'chess');
                // }

              } else {
                chess = {
                  id:"",
                  offset: h[0] + ',' + h[1],
                  coordinate: hex.hexToPointNumber(h[1], h[0], that.mapInfo.row, that.mapInfo.col)
                };
              }
              console.log("chess",chess)
              if (chess.chessPiecesNumber && chess.chessPiecesCampId === that.campId) {
                that.chessClick(e, 'action');
                that.selCellInfo = chess;
              } else {
                // if (that.isAttack && chess.chessPiecesNumber && chess.status != 20) {
                // 	that.targetCellInfo = chess;
                // 	that.attackNumber = chess.chessPiecesNumber;
                // 	that.$refs.attackConfirm.open();
                // }
              }
            }
          }
        }
      });
      // 	map.on(['pointermove', 'click'], function (e) {
      // 		// Coords
      // 		var h = grid.coord2hex(e.coordinate);
      // 		if (e.type != 'click' && h[0] == current[0] && h[1] == current[1]) return;
      // 		current = h;
      // 		console.log(e);
      // 		Move
      // 		if (!text) {
      // 			vector.getSource().clear();
      // 			var c = grid.hex2cube(grid.coord2hex(e.coordinate));
      // 			if (e.type == 'click') start = c;
      // 			if (start) {
      // 				var l = grid.cube_line(start, c);
      // 				for (var i = 0; i < l.length; i++) {
      // 					var ex = grid.getHexagon(grid.cube2hex(l[i]));
      // 					var f = new Feature(new Polygon([ex]));
      // 					f.setStyle(redStyle);
      // 					vector.getSource().addFeature(f);
      // 				}
      // 				// popup.show(e.coordinate, 'Move = ' + (l.length - 1) + ' hexagon' + (l.length > 2 ? 's' : ''));
      // 			}
      // 			return;
      // 		}

      // 		popup.hide();

      // 		vector.getSource().clear();
      // 		var ex = grid.getHexagon(h);
      // 		var f = new Feature(new Polygon([ex]));
      // 		vector.getSource().addFeature(f);

      // 		var size = map.getSize();
      // 		size = Math.round(
      // 			((Math.max(size[0], size[1]) / grid.getSize()) * map.getView().getResolution()) / Math.sqrt(3)
      // 		);
      // 		switch (text) {
      // 			case 'cube':
      // 				var c = grid.hex2cube(h);
      // 				// popup.show(e.coordinate, 'x: ' + c[0] + ', y: ' + c[1] + ', z: ' + c[2]);
      // 				for (var x = -size; x <= size; x++) {
      // 					if (x) {
      // 						ex = grid.getHexagon(grid.cube2hex([c[0] + x, c[1] - x, c[2]]));
      // 						f = new Feature(new Polygon([ex]));
      // 						f.setStyle(greenStyle);
      // 						vector.getSource().addFeature(f);
      // 						ex = grid.getHexagon(grid.cube2hex([c[0] + x, c[1], c[2] - x]));
      // 						f = new Feature(new Polygon([ex]));
      // 						f.setStyle(blueStyle);
      // 						vector.getSource().addFeature(f);
      // 						ex = grid.getHexagon(grid.cube2hex([c[0], c[1] + x, c[2] - x]));
      // 						f = new Feature(new Polygon([ex]));
      // 						f.setStyle(redStyle);
      // 						vector.getSource().addFeature(f);
      // 					}
      // 				}
      // 				break;
      // 			case 'axial':
      // 				// popup.show(e.coordinate, 'x: ' + h[0] + ', y: ' + h[1]);
      // 				for (var x = -size; x <= size; x++) {
      // 					if (x) {
      // 						ex = grid.getHexagon([h[0] + x, h[1]]);
      // 						f = new Feature(new Polygon([ex]));
      // 						f.setStyle(greenStyle);
      // 						vector.getSource().addFeature(f);
      // 						ex = grid.getHexagon([h[0], h[1] + x]);
      // 						f = new Feature(new Polygon([ex]));
      // 						f.setStyle(blueStyle);
      // 						vector.getSource().addFeature(f);
      // 					}
      // 				}
      // 				break;
      // 			case 'offset':
      // 				var o = grid.hex2offset(h);
      // 				// popup.show(e.coordinate, 'x: ' + o[0] + ', y: ' + o[1]);
      // 				for (var x = -size; x <= size; x++) {
      // 					if (x) {
      // 						ex = grid.getHexagon(grid.offset2hex([o[0] + x, o[1]]));
      // 						f = new Feature(new Polygon([ex]));
      // 						f.setStyle(greenStyle);
      // 						vector.getSource().addFeature(f);
      // 						ex = grid.getHexagon(grid.offset2hex([o[0], o[1] + x]));
      // 						f = new Feature(new Polygon([ex]));
      // 						f.setStyle(blueStyle);
      // 						vector.getSource().addFeature(f);
      // 					}
      // 				}
      // 				break;
      // 			default:
      // 				break;
      // 		}
      // 	});
    },
    continueAddChess() {
      //向同一格内堆叠棋子
      console.log("continueAddChess")
      this.showChessOptionInfo.visible = false;
      this.$refs.showSelPiece.open();
    },
    switchChess() {
      //选择同格棋子进行操作
      this.showChessOptionInfo.visible = false;
      // for(let i=0;i<this.mapChessArray.length;i++){
      //   if(JSON.stringify(this.pointOffset).slice(1,-1)===this.mapChessArray[i].offset){
      //     this.pointInfoList=this.mapChessArray[i].infoList
      //     this.selectedIndexInMapChessArray=i;
      //     break;
      //   }
      // }
      this.$refs.switchChess.open();
    },
    switchPiece(item) {
      this.mapChessArray[this.selectedIndexInMapChessArray].info = item;
      this.$refs.switchChess.close();
      this.hex.moveChessImage(this.mapChessArray);
    },
    delChess() {
      //删除显示在最上层的棋子
      this.showChessOptionInfo.visible = false;
      if (this.mapChessArray[this.selectedIndexInMapChessArray].infoList.length > 1) {
        for (let i = 0; i < this.mapChessArray[this.selectedIndexInMapChessArray].infoList.length; i++) {
          if (this.mapChessArray[this.selectedIndexInMapChessArray].infoList[i] == this.mapChessArray[this.selectedIndexInMapChessArray].info) {
            this.mapChessArray[this.selectedIndexInMapChessArray].infoList.splice(i, 1);
            this.undeployChessPiecesFunc(this.mapChessArray[this.selectedIndexInMapChessArray].info, true);
            break;
          }
        }
        this.mapChessArray[this.selectedIndexInMapChessArray].info = this.mapChessArray[this.selectedIndexInMapChessArray].infoList[0];
      } else {
        this.undeployChessPiecesFunc(this.mapChessArray[this.selectedIndexInMapChessArray].info, true);
        this.mapChessArray.splice(this.selectedIndexInMapChessArray, 1);
      }
      this.hex.moveChessImage(this.mapChessArray);

    },
    setIsMoveEmploy(){
      this.showChessOptionInfo.visible=false;
      this.isMoveEmploy=true;
    },
    moveChessConfirm(){
      // console.log(this.selCellInfo)
      let data= {
        id:this.selCellInfo.id,
        offset:this.targetCellInfo.offset,
        coordinate:this.targetCellInfo.coordinate,
      }
      console.log("data",data)
      moveChess(data);
      sendMsg(
          JSON.stringify({
            action: 'takeAction',
            verdictRecordId: this.verdictRecordId
          })
      );
    },

    drawRoad(data) {
      console.log("接受drawroad", (this.initType === "watch" || this.userType === "admin" || this.campId === data.campId) && this.user.id !== data.userId);
      if ((this.initType === "watch" || this.userType === "admin" || this.campId === data.campId) && this.user.id !== data.userId) {
        var feature = vector.getSource().getFeatureById(data.chessNumber)
        if (feature) {
          vector.getSource().removeFeature(feature);
        }
        var flowStyle = new FlowLine({
          color: 'red',
          color2: 'red',
          width: 8,
          width2: 8,
          _acolor: 'red',
          arrow: 1
        });
        var l = new Feature({
          geometry: new LineString(data.array),
          style: flowStyle,
          type: 'LineString'
        });
        l.setId(data.chessNumber);
        vector.getSource().addFeature(l);
      }

    },
    chessMove(offset) {
      if (this.chessMoveArray.length === 0) {
        let data = {
          offset: this.selCellInfo.offset,
          coordinate: this.selCellInfo.coordinate
        };
        this.chessMoveArray.push(data);
      }
      let actionValue = this.selCellInfo.maneuverValue;
      let data = this.actionUseUp(offset);
      if (data.useUp === -1 || data.useUp > this.selCellInfo.maneuverValue) {
        uni.showToast({
          title: '行动失败！'
        });
        this.selCellInfo.attackResult = '行动失败';
        data.residue = this.selCellInfo.maneuverValue - data.useUp;
        this.isAttack = false;
        this.isMove = false;
        this.chessPiecesActionFunc(10, this.selCellInfo, this.targetCellInfo, false);
      } else {
        this.selCellInfo.maneuverValue = this.selCellInfo.maneuverValue - data.useUp;
        data.residue = this.selCellInfo.maneuverValue;
      }

      if (this.selCellInfo.actionInfoArray === undefined) {
        this.selCellInfo.actionInfoArray = [];
      }

      this.selCellInfo.actionInfoArray.push(data);
    },
    actionUseUp(offset) {
      let data = {
        slope: 0,
        terrain: 0,
        road: 0,
        useUp: 0,
        residue: 0,
        offset: '',
        coordinate: ''
      };
      let offsetString = offset.join(',');
      data.offset = offsetString;

      //获取上一个点的信息
      let previousPoint = this.coordinateMap[this.chessMoveArray[this.chessMoveArray.length - 1].offset];
      //获取当前点信息
      let thisPoint = this.coordinateMap[offsetString];
      data.coordinate = thisPoint.coordinate;
      let useUp = 1; //初始消耗1
      //坡度修正
      let podu = Math.abs(thisPoint.elevation - previousPoint.elevation);
      let poduLevel = Math.ceil(podu / 20);
      if (poduLevel === 1) {
        useUp += 0.2;
        data.slope = 0.2;
      } else if (poduLevel === 2) {
        useUp += 0.5;
        data.slope = 0.5;
      } else if (poduLevel === 3) {
        useUp += 0.5;
        data.slope = 0.5;
      } else if (poduLevel === 4) {
        useUp += 1;
        data.slope = 1;
      } else if (poduLevel === 5) {
        useUp += 1.5;
      } else if (poduLevel === 6) {
        useUp += 2;
        data.slope = 2;
      } else if (poduLevel >= 7) {
        return -1; //机动失败
      }
      //区域修正
      if (
          thisPoint.terrainName === '树林' ||
          thisPoint.terrainName === '灌木' ||
          thisPoint.terrainName === '居民地' ||
          thisPoint.terrainName === '居民地（古典）'
      ) {
        useUp += 1;
        data.terrain = 1;
        console.log('地形类型：' + thisPoint.terrainName + '修正系数：' + 1);
      } else if (thisPoint.terrainName === '湖泊') {
        useUp += 1;
        data.terrain = 1;
        console.log('地形类型：' + thisPoint.terrainName + '修正系数：' + 1);
      }
      //道路修正
      let previousCoordinate = this.chessMoveArray[this.chessMoveArray.length - 1].coordinate;
      let thisCoordinate = this.hex.hexToPointNumber(offset[1], offset[0], this.mapInfo.row, this.mapInfo.col);
      console.log('当前点坐标：' + thisCoordinate);
      //是否是路
      let roadArray = []; //点位道路集合
      if (thisPoint.roadVoList) {
        roadArray = roadArray.concat(thisPoint.roadVoList);
      }
      if (previousCoordinate.roadVoList) {
        roadArray = roadArray.concat(previousCoordinate.roadVoList);
      }
      let correctRoadArray = [];
      for (let item of roadArray) {
        if (
            (item.toCoordinate === previousCoordinate && item.fromCoordinate === thisCoordinate) ||
            (item.toCoordinate === thisCoordinate && item.fromCoordinate === previousCoordinate)
        ) {
          correctRoadArray.push(item);
        }
      }
      if (correctRoadArray.length > 0) {
        correctRoadArray = correctRoadArray.sort((a, b) => a.terrainActionValue - b.terrainActionValue);
        useUp -= correctRoadArray[0].terrainActionValue;
        console.log('道路类型修正系数：' + correctRoadArray[0].terrainActionValue);
        data.road = -correctRoadArray[0].terrainActionValue;
      }
      //隔间地物（湖泊为区域修正）
      console.log('消耗行动值: ', useUp);
      data.useUp = useUp;
      let chessMoveData = {
        offset: offsetString,
        coordinate: thisCoordinate
      };
      this.chessMoveArray.push(chessMoveData);
      this.hex.chessMoveChange(this.chessMoveArray);
      return data;
    },
    checkCanAttack() {
      return this.game.roundPeriod === 1 || this.game.roundPeriod === 4;
    },
    attackPoint() {
      console.log("this.selCellInfo",this.selCellInfo)
      if(this.game.status==2) this.periodActionChessList.push(this.selCellInfo);
      // const tmp = this.mapChessArray.find(function (ttt) {
      //   return this.selCellInfo.offset === ttt.offset;
      // });
      // tmp.info.roundActionPoint=0;
      this.isAttack = false;
      this.isMove = false;
      this.$refs.moveConfirm.close();
      this.$refs.attackConfirm.close();
      console.log(this.attackLine)
      vector.getSource().addFeature(this.attackLine);
      this.flowLineArr = [];
      this.chessPiecesActionFunc(20, this.selCellInfo, this.targetCellInfo, true);
    },
    cancelAttack() {
      this.isAttack = false;
      this.isMove = false;
      this.$refs.moveConfirm.close();
      this.$refs.attackConfirm.close();
      this.flowLineArr = [];
    },

    scoutPoint() {
      this.isScout = false;
      this.$refs.scoutConfirm.close();
      this.chessPiecesActionFunc(40, this.selCellInfo, this.targetCellInfo, false);
    },
    reactancePoint() {
      this.isReactance = false;
      this.$refs.reactanceConfirm.close();
      this.chessPiecesActionFunc(60, this.selCellInfo, this.targetCellInfo, false);
    },
    communicationPoint() {
      this.isCommunication = false;
      this.$refs.communicationConfirm.close();
      this.chessPiecesActionFunc(50, this.selCellInfo, this.targetCellInfo, false);
    },
    movePoint() {
      this.isAttack = false;
      this.isMove = false;
      this.$refs.moveConfirm.close();
      this.$refs.attackConfirm.close();

      this.chessPiecesActionFunc(this.selCellInfo, this.targetCellInfo, false);
    },
    async moveStop() {
      console.log("this.selCellInfo",this.selCellInfo)
      if(this.game.status==2) this.periodActionChessList.push(this.selCellInfo);
      // const tmp = this.mapChessArray.find(function (ttt) {
      //   return this.selCellInfo.offset === ttt.offset;
      // });
      // tmp.info.roundActionPoint=0;
      this.isAttack = false;
      this.isMove = false;
      // this.selCellInfo.attackResult = '行动成功';
      this.selCellInfo.moveInfo = this.flowLineArr;

      this.flowLineArr = [];

      this.chessPiecesActionFunc(10, this.selCellInfo, this.targetCellInfo, false);
      // sendMsg(
      //     JSON.stringify({
      //       action: 'clearRoad',
      //       verdictRecordId: this.verdictRecordId
      //     })
      // );
    },
    async chessPiecesActionFunc(actionMode, source, target, isAttack, isHide) {
      let data = {
        actionMode: actionMode,
        campId: this.campId,
        chessPiecesNumber: source.chessPiecesNumber,
        selfCoordinate: source.coordinate,
        selfOffset: source.offset,
        targetCoordinate: target.coordinate,
        targetOffset: target.offset,
        userId: this.user.id,
        verdictRecordId: this.verdictRecordId,
        targetChessPiecesNumber: target.chessPiecesNumber,
        chessRound: this.roundActive,
        roundPeriod: this.stageActive + 1,
        moveInfo: JSON.stringify(source.moveInfo),
        attackResult: source.attackResult,
        roundActionPoint:false
      };
      isHide && (data.actionMode = 30);
      console.log(data)

      await chessPiecesActionNew(data);
      if (actionMode === 10) {
        this.queryUsChessPiecesInfoFunc();
        sendMsg(
            JSON.stringify({
              action: 'refresh',
              verdictRecordId: this.verdictRecordId
            })
        );
      }

      // let index = this.selectIndex[0];
      // let itemArray = this.mapList[index];
      // let item = itemArray[this.selectIndex[1]];
      // item.isAction = true;
      // this.$set(itemArray, this.selectIndex[1], item);
      // this.$set(this.mapList, index, itemArray);
      await this.queryPromptFunc();
    },
    showChessAction(e, item) {

      this.selCellInfo = item;

      setTimeout(() => {
        let x = e.detail.x; //这个应该是相对于整个浏览器页面的x坐标，左上角为坐标原点（0,0）
        let y = e.detail.y; //这个应该是相对于整个浏览器页面的y坐标，左上角为坐标原点（0,0）
        this.showChessButtonInfo.top = y;
        this.showChessButtonInfo.left = x;
        console.log("11111",typeof this.selCellInfo.roundActionPoint)
        // if(this.selCellInfo.roundActionPoint=='1'){
        //   uni.showToast({
        //     title: '该棋子在本回合已无行动能力！',
        //     icon: 'none',
        //     duration: 1500
        //   });
        // }
        this.showChessButtonInfo.visible = true;
      }, 100);
    },
    chessClick(e, type) {
      console.log("this.game.roundPeriod",typeof this.game.roundPeriod)
      if (type === 'action') {
        setTimeout(() => {
          let x = e.originalEvent.pageX; //这个应该是相对于整个浏览器页面的x坐标，左上角为坐标原点（0,0）
          let y = e.originalEvent.pageY; //这个应该是相对于整个浏览器页面的y坐标，左上角为坐标原点（0,0）
          this.showChessButtonInfo.top = y;
          this.showChessButtonInfo.left = x;
          console.log("11111",this.selCellInfo)
          if(this.selCellInfo.status=='PRESS'){
            uni.showToast({
              title: '该棋子受到压制，解除压制前无法行动！',
              icon: 'none',
              duration: 1500
            });
          }
          else if(this.selCellInfo.roundActionPoint=='0'){
            uni.showToast({
              title: '该棋子在本回合已无行动能力！',
              icon: 'none',
              duration: 1500
            });
          }
          if(this.selCellInfo.status=="PRESS"){
            //todo 棋子状态被压制

          }else if(this.selCellInfo.status=="FIRE"){
            //todo 棋子失火

          }
          if(this.selCellInfo.status=="KILL"){
            // todo 棋子被毁
            return ;
          }
          this.showChessButtonInfo.visible = true;
        }, 100);
      } else if (type === 'chess') {
        setTimeout(() => {
          let x = e.originalEvent.pageX; //这个应该是相对于整个浏览器页面的x坐标，左上角为坐标原点（0,0）
          let y = e.originalEvent.pageY; //这个应该是相对于整个浏览器页面的y坐标，左上角为坐标原点（0,0）
          this.showChessListInfo.top = y;
          this.showChessListInfo.left = x;
          this.showChessListInfo.visible = true;
        }, 100);
      }
    },
    attack() {
      this.isAttack = true;
      this.isMove = false;
      this.showChessButtonInfo.visible = false;
      this.showChessListInfo.visible = false;
      this.showChessOptionInfo.visible = false;
    },
    reactance() {
      this.isReactance = true
      this.showChessButtonInfo.visible = false;
      this.showChessListInfo.visible = false;
      this.showChessOptionInfo.visible = false;
    },
    releasePress(){
      if(this.game.status==2){
        this.periodActionChessList.push(this.selCellInfo);
        this.changeChessStatus_('RELEASE_PRESS');
      }else{
        this.showChessButtonInfo.visible = false;
        this.showChessListInfo.visible = false;
        this.showChessOptionInfo.visible = false;
        this.isAttack = false;
        this.isMove = false;
        this.chessPiecesActionFunc(80, this.selCellInfo, this.targetCellInfo, false);
      }

      // this.removePress();
    },

    // removePress() {
    //   this.showChessButtonInfo.visible = false;
    //   this.showChessListInfo.visible = false;
    //   this.showChessOptionInfo.visible = false;
    //   // let data = {
    //   //   campId: this.campId,
    //   //   chessPiecesNumber: this.selCellInfo.chessPiecesNumber,
    //   //   selfCoordinate: this.selCellInfo.coordinate,
    //   //   selfOffset: this.selCellInfo.offset,
    //   //   userId: this.user.id,
    //   //   verdictRecordId: this.verdictRecordId,
    //   //   chessRound: this.roundActive,
    //   //   roundPeriod: this.stageActive + 1,
    //   //   status: "",
    //   // };
    //   // this.periodActionChessList.push(this.selCellInfo);
    //   // const tmp = this.mapChessArray.find(function (ttt) {
    //   //   return this.selCellInfo.offset === ttt.offset;
    //   // });
    //   // tmp.info.roundActionPoint=0;
    //   this.isAttack = false;
    //   this.isMove = false;
    //   this.chessPiecesActionFunc(80, this.selCellInfo, this.targetCellInfo, false);
    //   // changeChessStatus(data)
    //   // sendMsg(
    //   //     JSON.stringify({
    //   //       action: 'takeAction',
    //   //       verdictRecordId: this.verdictRecordId
    //   //     })
    //   // );
    //
    // },
    move() {
      this.isAttack = false;
      this.isMove = true;
      this.showChessButtonInfo.visible = false;
      this.showChessListInfo.visible = false;
      this.showChessOptionInfo.visible = false;
      // this.flowLineArr
    },
    scout() {
      this.isScout = true;
      this.showChessButtonInfo.visible = false;
      this.showChessListInfo.visible = false;
      this.showChessOptionInfo.visible = false;
    },
    communication() {
      this.isCommunication = true;
      this.showChessButtonInfo.visible = false;
      this.showChessListInfo.visible = false;
      this.showChessOptionInfo.visible = false;
      uni.showToast({
        title: '请点击通信点位！',
        icon: 'none',
        duration: 1500
      });
    },
    hide() {
      this.isAttack = false;
      this.isMove = false;
      this.showChessButtonInfo.visible = false;
      this.showChessListInfo.visible = false;
      this.showChessOptionInfo.visible = false;
      this.chessPiecesActionFunc(this.selCellInfo, this.selCellInfo, false, true);
    },
    getChessByOffset(offset) {
      let selectArray = [];
      for (let item of this.mapChessArray) {
        if (item.offset === offset) {
          selectArray.push(item.info);
        }
      }
      return selectArray;
    },
    async queryAllFunc(round) {
      uni.hideLoading()
      let data = {
        id: this.verdictRecordId
      };
      let rst = await queryVerdictResult(data);
      let resultData = rst.data.data;
      for (var key in resultData) {
        this.game[key] = resultData[key];
      }
      console.log('this.game', this.game)
      this.roundActive = this.game.chessRound;
      //格式化用户
      this.formatterUser();
      //格式化campList

      this.chessRoundLimit = resultData.chessRoundLimit;
      this.initialRoundOptions(this.chessRoundLimit);
      await this.getRoundStatus();
      if (this.game.status < 30) {
        this.game.nowRound = 0;
      } else {
        this.game.nowRound = this.game.chessRound;
      }

      // if (this.game.status === 50) {
      //   this.getFinalSummary();
      // }
      this.queryUsChessPiecesInfoFunc();
      if(round!=null && round != this.game.nowRound){
        await this.resetRoundActionPoint()
      }

    },
    formatterUser() {
      if (this.user.id === this.game.inviterUserId) {
        this.userType = 'admin';
        this.avatarText = '导演';
      }
      if (this.user.id === this.game.firstUserId || this.user.id === this.game.secondUserId) {
        this.userType = 'user';
        if (this.user.id === this.game.firstUserId) {
          this.avatarText = this.game.firstCampName;
        } else if (this.user.id === this.game.secondUserId) {
          this.avatarText = this.game.secondCampName;
        }
        this.avatarDesc = '操作员';
      }
      if (this.user.id === this.game.firstJudgeUserId || this.user.id === this.game.secondJudgeUserId) {
        this.userType = 'judge';
        if (this.user.id === this.game.firstJudgeUserId) {
          this.avatarText = this.game.firstCampName;
        } else if (this.user.id === this.game.secondJudgeUserId) {
          this.avatarText = this.game.secondCampName;
        }
        this.avatarDesc = '裁决员';
      }
      if (this.user.id === this.game.firstCommanderUserId || this.user.id === this.game.secondCommanderUserId) {
        this.userType = 'commander';
        if (this.user.id === this.game.firstCommanderUserId) {
          this.avatarText = this.game.firstCampName;
        } else if (this.user.id === this.game.secondCommanderUserId) {
          this.avatarText = this.game.secondCampName;
        }
        this.avatarDesc = '指挥员';
      }

      this.formatterCampList();
    },
    initialRoundOptions(round) {
      this.stageOptions = [];
      console.log('round', round);
      console.log(this.game)
      let stageArray = this.game.stageStr.split(',');
      for (let item of stageArray) {
        this.stageOptions.push({
          title: item
        });
      }
      this.roundOptions = [{title: '准备阶段'}];
      for (let i = 0; i <= round - 1; i++) {
        this.roundOptions.push({title: '回   合   ' + Number(i + 1)});
      }
      this.stageActive = this.game.roundPeriod - 1;

      this.queryPromptFunc();
    },
    formatterCampList() {
      this.campList = [];
      let dataFirst = {
        campId: this.game.firstCampId,
        campName: this.game.firstCampName,
        userId: this.game.firstUserId,
        userName: this.game.firstUserName,
        verdictRecordId: this.verdictRecordId
      };
      this.campList.push(dataFirst);
      let dataSecond = {
        campId: this.game.secondCampId,
        campName: this.game.secondCampName,
        userId: this.game.secondUserId,
        userName: this.game.secondUserName,
        verdictRecordId: this.verdictRecordId
      };
      this.campList.push(dataSecond);
    },
    async queryPromptFunc() {
      let data = {
        id: this.verdictRecordId
      };
      data.userId = this.user.id;
      let prompt = await queryPrompt(data);
      console.log('prompt', prompt);
      let array = [];
      this.historyList = prompt.data.data.verdictRecordHistoryList;
      for (let i in this.historyList) {
        array.push(this.historyList[i].actionDesc);
      }
      array.filter(function (s) {
        return s && s.trim();
      });
      this.game.actionDescList = array;
    },
    async getRoundStatus() {
      let data = {
        verdictRecordId: this.verdictRecordId,
        chessRound: this.roundActive,
        roundPeriod: this.stageActive + 1
      };
      this.roundStatusList = [];
      let result = await getRoundStatus(data);
      this.roundStatusList = result.data.data;
      this.formatterStatusDesc(this.roundStatusList);
    },
    formatterStatusDesc(newVal) {
      if (this.userType === 'admin') {
        let sum = 0;
        for (let item of newVal) {
          sum += item.status;
        }
        if (sum === 0) {
          this.statusDesc = '未提交';
          this.statusIndex = 0;
        } else if (sum === 1) {
          this.statusDesc = '未提交';
          this.statusIndex = 0;
        } else if (sum === 2) {
          this.statusDesc = '待裁决';
          this.statusIndex = 1;
        } else if (sum === 3) {
          this.statusDesc = '待裁决';
          this.statusIndex = 1;
        } else if (sum === 4) {
          this.statusDesc = '已裁决';
          this.statusIndex = 2;
        } else if (sum === 5) {
          this.statusDesc = '待修正';
          this.statusIndex = 2;
        } else if (sum === 6) {
          this.statusDesc = '已修正';
          // if (this.userType === 'admin'){
          //   uni.showToast({
          //     title: '到您操作啦！',
          //     icon: 'none',
          //     duration: 2000
          //   })
          // }
          if(this.game.status !== 50){
            this.nextStageFlag = true;
          }
          this.userModify = false
          this.statusIndex = 1;
        }
      } else {
        this.roundEnd = false;
        for (let item of newVal) {
          if (item.campId === this.campId) {
            if (item.campId === this.campId) {
              if (item.status === 0) {
                this.statusDesc = '未提交';
                this.statusIndex = 0;
                this.userStageNotSubmit = true;
                // if (this.userType === 'user'){
                //   uni.showToast({
                //     title: '到您操作啦！',
                //     icon: 'none',
                //     duration: 2000
                //   })
                // }
              } else if (item.status === 1) {
                this.statusDesc = '待裁决';
                this.statusIndex = 1;
                this.userStageNotSubmit = false;
                if (this.userType === 'judge') {
                  this.roundEnd = true;
                  // this.showCustomToast('到您操作啦！')
                  // uni.showToast({
                  //   title: '到您操作啦！',
                  //   icon: 'none',
                  //   duration: 2000
                  // })
                }
              } else if (item.status === 2) {
                this.statusDesc = '待修正';
                this.statusIndex = 2;
                this.userStageNotSubmit = false;
                this.userModify = true
                // if (this.userType === 'user'){
                //   uni.showToast({
                //     title: '到您操作啦！',
                //     icon: 'none',
                //     duration: 2000
                //   })
                // }
              } else if (item.status === 3) {
                this.statusDesc = '已修正';
                this.statusIndex = 2;
                this.userModify = false
              }
            }
          }
        }
      }

      if (this.nextStageFlag && this.stageActive === this.stageOptions.length - 1 && this.roundActive === this.chessRoundLimit) {
        this.nextBtnText = "游戏结束";
      }
    },
    async queryUsChessPiecesInfoFunc() {
      let data = {
        verdictRecordId: this.verdictRecordId,
        chessRound: this.game.chessRound,
        roundPeriod: this.stageActive + 1
      };

      let res = '';
      if (this.userType === 'user') {
        data.campId = this.campId;
        console.log("data", data)
        res = await queryAllChessPiecesInfo(data);
      } else {
        res = await queryAllChessPiecesInfo(data);
      }
      console.log("res", res)
      this.game.userPiece = [];
      let array = res.data.data;
      for (let item of array) {
        item.isAdd = false;
        item.canMove = true;
        item.isDie = false;
        let oss = await getOssById(item.chessPiecesCover);
        let coverUrl = this.baseOssIpPort + oss.data.data.fileName;
        item.chessPiecesCover = coverUrl;
        this.game.userPiece.push(item);
      }
      console.log("this.game.userPiece", this.game)
      this.formatterAllChessPiecesInfo(array);
    },
    formatterAllChessPiecesInfo(array) {
      console.log("suoyouqizixinxi",array)
      // todo 每次获取会重置导致刷新后保存信息发生改变
      this.mapChessArray = [];
      for (let item of array) {
        console.log("item", item)

        if (item.offset) {
          const tmp = this.mapChessArray.find(function (ttt) {
            return item.offset === ttt.offset;
          });

// 检查是否找到了对应的项
          if (tmp) {
            console.log('找到对应的项:');
            tmp.info = item;
            tmp.infoList.push(item);
          } else {
            console.log('没有找到对应的项');
            this.mapChessArray.push({
              offset: item.offset,
              info: item,
              infoList: [item]
            });
          }
        }
      }


      // this.mapChessArray = [];
      // for (let item of array) {
      //
      // 	if (item.offset) {
      // 		this.mapChessArray.push({
      // 			offset: item.offset,
      // 			info: item
      // 		});
      // 	}
      // }
      this.hex.moveChessImage(this.mapChessArray);
    },
    async getRealTimeScore() {
      if (!this.showRealTimeScoreFlag) {
        let queryScoreData = {
          verdictRecordId: this.verdictRecordId
        };
        let scoreListResult = await getRealTimeScore(queryScoreData);
        let realTimeScoreList = scoreListResult.data.data;
        this.realTimeScore.firstScoretypeTotal = 0;
        this.realTimeScore.secondScoretypeTotal = 0;
        this.realTimeScore.firstCampName = this.campList[0].campName;
        this.realTimeScore.secondCampName = this.campList[1].campName;
        for (var i in realTimeScoreList) {
          if (this.campList[0].campId === realTimeScoreList[i].campId) {
            if (realTimeScoreList[i].type === 1) {
              this.realTimeScore.firstScoretype1 = realTimeScoreList[i].score;
            } else if (realTimeScoreList[i].type === 2) {
              this.realTimeScore.firstScoretype2 = realTimeScoreList[i].score;
            } else if (realTimeScoreList[i].type === 3) {
              this.realTimeScore.firstScoretype3 = realTimeScoreList[i].score;
            }
            this.realTimeScore.firstScoretypeTotal += realTimeScoreList[i].score;
          } else {
            if (realTimeScoreList[i].type === 1) {
              this.realTimeScore.secondScoretype1 = realTimeScoreList[i].score;
            } else if (realTimeScoreList[i].type === 2) {
              this.realTimeScore.secondScoretype2 = realTimeScoreList[i].score;
            } else if (realTimeScoreList[i].type === 3) {
              this.realTimeScore.secondScoretype3 = realTimeScoreList[i].score;
            }
            this.realTimeScore.secondScoretypeTotal += realTimeScoreList[i].score;
          }
        }
        this.$refs.showRealTimeScore.open();
      } else {
        this.$refs.showRealTimeScore.close();
      }
      this.showRealTimeScoreFlag = !this.showRealTimeScoreFlag;
    },
    getJudgeTable() {
      this.judgeTableShowInfo = {
        type: 'input',
        verdictRecordId: this.verdictRecordId,
        campId: this.campId,
        chessRound: this.roundActive,
        roundPeriod: this.stageActive + 1,
        roundPeriodName: this.stageOptions[this.stageActive].title
      };
      if (this.userType === 'user' || this.userType === 'judge') {
        this.judgeTableShowInfo.campId = this.campId;
      }
      this.$refs.judgeTable.open();
    },
    async scoreTableShow(item, index) {
      item.chessRound = index;
      this.campListItem = item;
      //查询历史打分结果
      let queryScoreData = {
        verdictRecordId: item.verdictRecordId,
        campId: item.campId,
        chessRound: index
      };
      let scoreListResult = await queryScoreList(queryScoreData);
      this.scoreList = scoreListResult.data.data;
      console.log('this.scoreList', this.scoreList);
      this.$refs.scoreTable.open();
      this.showScoreButtonInfo.visible = false;
    },
    getJudgeResult() {
      this.judgeTableShowInfo = {
        type: 'record',
        verdictRecordId: this.verdictRecordId
      };
      // if (this.userType === 'user' || this.userType === 'judge') {
      //   this.judgeTableShowInfo.campId = this.campId;
      // }
      if (this.userType === 'judge') {
        this.judgeTableShowInfo.campId = this.campId;
      }
      this.$refs.judgeTable.open();
    },
    async getTableScoreFinal() {
      this.finalData = this.campList;
      //获取推演打分记录
      let queryScoreData = {
        verdictRecordId: this.verdictRecordId,
        typeString: '4,5'
      };
      let scoreListResult = await queryScoreList(queryScoreData);
      this.finalScoreList = scoreListResult.data.data;
      this.$refs.scoreTableFinal.open();
    },
    async submitScoreFinal(scoreList) {
      let res = await submitScore(scoreList);
      if (res.data.code === 200) {
        uni.showToast({
          title: '提交成功',
          icon: 'none',
          duration: 1500
        });
        this.$refs.scoreTableFinal.close();
      } else {
        uni.showToast({
          title: '提交失败！',
          icon: 'error',
          duration: 1500
        });
      }
    },
    async getFinalSummary() {
      let queryScoreData = {
        verdictRecordId: this.verdictRecordId
      };
      let res = await getSummaryScoreNew(queryScoreData);
      this.chartRound = this.chessRoundLimit;
      this.summaryScoreData = res.data.data;
      console.log(this.summaryScoreData);
      this.$refs.finalSummary.open();
    },
    selPiece(val) {
      this.selCellInfo.chessPiecesNumber = val.chessPiecesNumber;
      this.selCellInfo.coordinate = this.hex.hexToPointNumber(
          this.pointOffset[1],
          this.pointOffset[0],
          this.mapInfo.row,
          this.mapInfo.col
      );
      this.selCellInfo.offset = this.pointOffset.join(',');
      this.deployChessPiecesFunc(this.selCellInfo, true);
      val.isAdd = true;
      this.$refs.showSelPiece.close();
      //更新地图棋子数组
      this.formatterMapChessArray(this.selCellInfo.offset, val);
    },
    formatterMapChessArray(offset, info) {
      //查询是否有重复的棋子
      let isHave = false;
      for (let item of this.mapChessArray) {
        // if (item.offset == offset && item.info.chessPiecesNumber == info.chessPiecesNumber) {
        // 	item.infoList.push(info);
        //   item.info=info;
        // 	isHave = true;
        // }
        if (item.offset == offset) {
          item.infoList.push(info);
          item.info = info;
          isHave = true;
        }
      }
      if (!isHave) {
        this.mapChessArray.push({
          offset: offset,
          info: info,
          infoList: [info]
        });
      }
      this.hex.moveChessImage(this.mapChessArray);
    },
    deployChessPiecesFunc(val, isAdd) {
      let data = {
        actionMode: 10,
        campId: this.campId,
        chessPiecesNumber: val.chessPiecesNumber,
        selfCoordinate: 'string',
        targetCoordinate: 'string',
        userId: this.user.id,
        verdictRecordId: this.verdictRecordId
      };
      if (isAdd) {
        data.selfCoordinate = '0000';
        data.targetCoordinate = val.coordinate;
        data.targetOffset = val.offset;
      } else {
        data.selfCoordinate = val.coordinate;
        data.selfOffset = val.offset;
        data.targetCoordinate = '0000';
      }
      deployChessPieces(data);
    },
    undeployChessPiecesFunc(val, isAdd) {
      let data = {
        actionMode: 10,
        campId: this.campId,
        chessPiecesNumber: val.chessPiecesNumber,
        selfCoordinate: 'string',
        targetCoordinate: 'string',
        userId: this.user.id,
        verdictRecordId: this.verdictRecordId
      };
      if (isAdd) {
        data.selfCoordinate = '0000';
        data.targetCoordinate = val.coordinate;
        data.targetOffset = val.offset;
      } else {
        data.selfCoordinate = val.coordinate;
        data.selfOffset = val.offset;
        data.targetCoordinate = '0000';
      }
      console.log(data)
      undeployChessPieces(data);
    },
    endDeployFunc() {
      this.clearCountdown();
      let data = {
        verdictRecordId: this.verdictRecordId,
        userId: this.user.id
      };
      endDeploy(data).then((res) => {
        if (res.data.code == 200) {
          sendMsg(
              JSON.stringify({
                action: 'takeAction',
                verdictRecordId: this.verdictRecordId
              })
          );
        }
      });
      this.game.isDeplaoy = false;
      //TODO 导演打分

    },

    changeChessStatus_(status){
      this.showChessButtonInfo.visible = false;
      this.showChessListInfo.visible = false;
      this.showChessOptionInfo.visible = false;
      let data = {
        campId: this.campId,
        chessPiecesNumber: this.selCellInfo.chessPiecesNumber,
        selfCoordinate: this.selCellInfo.coordinate,
        selfOffset: this.selCellInfo.offset,
        userId: this.user.id,
        verdictRecordId: this.verdictRecordId,
        chessRound: this.roundActive,
        roundPeriod: this.stageActive + 1,
        status: status,
      };
      changeChessStatus(data)
      sendMsg(
          JSON.stringify({
            action: 'takeAction',
            verdictRecordId: this.verdictRecordId
          })
      );
    },

    shakeDice(diceArr) {
      this.$refs.popup.open();
      this.$nextTick(() => {
        for (var i = 0; i < this.diceCount; i++) {
          this.$refs[`dice${i}`][0].throwDice(diceArr[i]);
        }
      });
    },
    getRuleListAsync() {
      return new Promise((resolve, reject) => {
        getRuleList({verdictType: 10}).then((res) => {
          resolve(res.data.data);
        });
      });
    },
    async getRuleList() {
      let data = {
        verdictType: 10
      };
      let ruleRes = await getRuleList(data);
      this.ruleArray = ruleRes.data.data;
      this.$refs.popupRule.open();
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async judgeShow(dataArray) {
      let that = this;
      for (let i = 0; i < dataArray.length; i++) {
        let data = {
          verdictType: 10
        };
        let ruleRes = await getRuleList(data);
        that.ruleArray = ruleRes.data.data;
        console.log('打开规则表');
        that.$refs.popupRule.open();
        await that.sleep(5000);
        console.log('关闭规则表' + i);
        that.$refs.popupRule.close();
        await that.sleep(2000);
        that.shakeDice(dataArray[i].dice);
        await that.sleep(5000);
        that.$refs.popup.close();
        await that.sleep(2000);
        let blowEffectRes = await getBlowEffectList(data);
        this.blowEffectList = blowEffectRes.data.data;
        console.log('打开结果表');
        this.$refs.blowEffectTable.open();
        await that.sleep(5000);
        console.log('关闭结果表' + i);
        that.$refs.blowEffectTable.close();
      }
      sendMsg(
          JSON.stringify({
            action: 'takeAction',
            verdictRecordId: this.verdictRecordId
          })
      );
    },
    async getBlowEffectList() {
      let data = {
        verdictType: 10
      };
      let blowEffectRes = await getBlowEffectList(data);
      this.blowEffectList = blowEffectRes.data.data;
      this.$refs.blowEffectTable.open();
    },
    async refresh() {
      await this.queryUsChessPiecesInfoFunc();
      await this.queryPromptFunc();
    },
    async endRoundFuncAndSetRoundActionPoint(){
      let data={
        // id:this.periodActionChessList[i].id,
        verdictRecordId:this.verdictRecordId,
        roundPeriod:this.game.roundPeriod,
        chessRound:this.game.chessRound,
        userId: this.user.id,
        campId:this.campId,
      }
      await changePiecesActionPoint(data);
      // console.log("this.periodActionChessList[i].id",this.periodActionChessList[i].id)
      await this.endRoundFunc();

    },
    async endRoundFunc() {
      // this.showCustomToast("修正成功")

      let data = {
        id: this.verdictRecordId,
        userId: this.user.id,
        chessRound: this.roundActive,
        roundPeriod: this.stageActive + 1
      };

      this.periodActionChessList=[];
      await endRound(data);
      sendMsg(
          JSON.stringify({
            action: 'endRound',
            verdictRecordId: this.verdictRecordId
          })
      );
      sendMsg(
          JSON.stringify({
            action: 'takeAction',
            verdictRecordId: this.verdictRecordId
          })
      );
    },
    async judge() {
      if (this.userType === 'admin') {
        this.judgeTableShowInfo = {
          userType: this.userType,
          type: 'judge',
          verdictRecordId: this.verdictRecordId,
        };
      }
      else {
        this.judgeTableShowInfo = {
          userType: this.userType,
          type: 'judge',
          verdictRecordId: this.verdictRecordId,
          campId: this.campId,
          chessRound: this.roundActive,
          roundPeriod: this.stageActive + 1
        };
      }
      this.$refs.judgeTable.open();
      // let data = {
      // 	verdictRecordId: this.verdictRecordId,
      // 	chessRound: this.roundActive,
      // 	roundPeriod: this.stageActive + 1
      // };
      // let res = await judge(data);
      // let resultData = res.data.data;
      // console.log('resultData: ', resultData.length);
      // if (resultData.length > 0) {
      // 	sendMsg(
      // 		JSON.stringify({
      // 			action: 'judge',
      // 			verdictRecordId: this.verdictRecordId,
      // 			data: resultData
      // 		})
      // 	);
      // } else {
      // 	sendMsg(
      // 		JSON.stringify({
      // 			action: 'takeAction',
      // 			verdictRecordId: this.verdictRecordId
      // 		})
      // 	);
      // }
    },
    async submitScore(scoreList) {
      for (let i in scoreList) {
        scoreList[i].campId = this.campListItem.campId;
        scoreList[i].campName = this.campListItem.campName;
        scoreList[i].userId = this.campListItem.userId;
        scoreList[i].userName = this.campListItem.userName;
        scoreList[i].verdictRecordId = this.campListItem.verdictRecordId;
        scoreList[i].chessRound = this.campListItem.chessRound;
      }
      let res = await submitScore(scoreList);
      if (res.data.code === 200) {
        uni.showToast({
          title: '提交成功',
          icon: 'none',
          duration: 1500
        });
        this.$refs.scoreTable.close();
        this.scoreList = [];
      } else {
        uni.showToast({
          title: '提交失败！',
          icon: 'error',
          duration: 1500
        });
      }
    },
    showActionDescFunc() {
      if (!this.showActionDescFlag) {
        this.$refs.showActionDesc.open();
      } else {
        this.$refs.showActionDesc.close();
      }
      this.showActionDescFlag = !this.showActionDescFlag;
    },
    judgeComplete() {
      sendMsg(
          JSON.stringify({
            action: 'takeAction',
            verdictRecordId: this.verdictRecordId
          })
      );
      sendMsg(
          JSON.stringify({
            action: 'clearRoad',
            verdictRecordId: this.verdictRecordId
          })
      );
    },
    stepJudge(){
      console.log('stepJudge')
      let data = {
        verdictRecordId: this.verdictRecordId,
        chessRound: this.roundActive,
        roundPeriod: this.stageActive + 1,
        campId: this.campId,
      }
      let res = stepJudge(data);
      console.log(res)
      sendMsg(
          JSON.stringify({
            action: 'takeAction',
            verdictRecordId: this.verdictRecordId
          })
      );
    },
    nextStage() {
      if (this.nextBtnText === '游戏结束'){
        this.$refs.njustScore.open()
        return;
      }
      // let tmp = this.game.nowRound;
      nextStage(this.verdictRecordId).then((res) => {
        console.log('res: ', res);
        sendMsg(
            JSON.stringify({
              action: 'takeAction',
              verdictRecordId: this.verdictRecordId,
              round: this.game.nowRound
            })
        );
        // if(this.game.nowRound === tmp){
        //   sendMsg(
        //       JSON.stringify({
        //         action: 'nextRound',
        //         verdictRecordId: this.verdictRecordId
        //       })
        //   );
        // }
        this.nextStageFlag = false;
      });

    },
    async resetRoundActionPoint(){
      console.log('resetRoundActionPoint')
      let data={
        verdictRecordId:this.verdictRecordId
      }
      await resetPiecesActionPoint(data);
    },
    getScore(){
      this.$refs.njustScore.open()
    },
    async setFinalScore(firstScore, secondScore, game) {
      console.log('First Score:', firstScore);
      console.log('Second Score:', secondScore);
      console.log('Game:', game);
      const data = {
        id: game.id,
        firstScore: firstScore,
        secondScore: secondScore
      }
      const res = await setScore(data)
      console.log('setScore res', res)
      nextStage(this.verdictRecordId).then((res) => {
        console.log('res: ', res);
        sendMsg(
            JSON.stringify({
              action: 'takeAction',
              verdictRecordId: this.verdictRecordId
            })
        );
        this.nextStageFlag = false;
      });

    }
  }
};
</script>

<style lang="scss" scoped>
.xinyi-content {
  background-image: url('@/static/image/login/bg.jpg');
  background-size: 100% 100%;
}

#map {
  width: 100vw;
  height: 100vh;
  z-index: 998;
}

.middleBtn {
  position: fixed;
  bottom: 100px;
  width: 100px;
  left: calc(50vw - 50px);
  z-index: 1000;

  .btnView {
    background-color: rgba(87, 64, 50, 0.8);
    color: white;
    text-align: center;
    font-size: 20px;
    margin-top: 2px;
    align-items: center;
    padding: 10px 5px 10px 5px;
    border-radius: 5px;
  }

  .btnView:hover{
    color: #4cf5e3;
  }
}

.rightBtn {
  position: fixed;
  top: 100px;
  right: 0;
  z-index: 1000;
  text-align: center;

  .btnView {
    writing-mode: vertical-rl;
    background: linear-gradient(to bottom, #1e839b 0%, #62a8b9 100%);
    color: #ffffff;
    text-align: center;
    align-items: center;
    //padding: 10px 5px 10px 5px;
    width: 30px;
    height: 100px;
    margin-top: 30px;
    position: relative; /* 为了使用伪元素 */
  }

  .btnView::before {
    content: '';
    position: absolute;
    top: -30px;
    left: 0;
    border-right: 30px solid #1e839b; /* 显示左边框 */
    border-top: 30px solid transparent; /* 隐藏上边框 */

    width: 0;
    height: 0;
  }

  .btnView::after {
    content: '';
    position: absolute;
    bottom: -30px;
    left: 0;
    border-bottom: 30px solid transparent; /* 隐藏下边框 */
    border-right: 30px solid #62a8b9; /* 显示左边框 */
    width: 0;
    height: 0;
  }
}

.top{
  position: fixed;
  width: 100vw;
  height: 15vh;
  display: flex;
  flex-direction: row;
  z-index: 999;
}

.top-head{
  width: 30vw;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}

.top-middle{
  width: 40vw;
  text-align: center;
  align-items: center;
  .react-left {
    &.react-l-s {
      width: 500px;
      text-align: left;
    }
    font-size: 18px;
    width: 80%;
    margin-left: 10%;
    margin-top: 10px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    transform: skewX(45deg);
    background-color: rgba(87, 64, 50, 0.8);
    border: 4px solid transparent; /* 移除dashed，使用border-image */


    /* 设置虚线效果 */

    .react-left {
      position: absolute;
      left: -25px;
      top: 0;
      height: 50px;
      width: 50px;
      background-color: rgba(87, 64, 50, 0.8);
      transform: skewX(-45deg);
    }

    .text {
      color: #4cf5e3;
      font-size: 25px;
      font-weight: bold;
      display: inline-block;
      transform: skewX(-45deg);
    }
  }
}

.top-tail{
  width: 30vw;
  display: flex;
  flex-direction: row;

  .react-right {
    &.react-l-s {
      text-align: right;
      width: 500px;
    }
    font-size: 18px;
    width: 80%;
    margin-left: 20%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    transform: skewX(45deg);
    background-color: rgba(87, 64, 50, 1);
    .react-after {
      position: absolute;
      right: -25px;
      top: 0;
      height: 60px;
      width: 60px;
      background-color: rgba(87, 64, 50, 1);
      transform: skewX(-45deg);
    }

    .text {
      color: #4cf5e3;
      font-size: 18px;
      font-weight: bold;
      display: inline-block;
      transform: skewX(-45deg);
    }
  }

  .top-tail-action{
    color: white;
  }
  .hover-top-tail-action{
    color: #4cf5e3;
  }
}



.top__view {
  position: fixed;
  display: flex;
  width: 96vw;
  height: 10vh;
  z-index: 999;
  align-items: center;
  // background: rgba(255, 255, 255, 0.5);

  .dice-toolbar__veiw {
    display: flex;
    align-items: center;
    width: 80rpx;
    margin-left: 10rpx;

    button {
      margin-left: 10rpx;
    }
  }

  .avatar-view {
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10rpx;
  }
}

.foot-view {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 96vw;
  height: 7vh;
  z-index: 1000;
  // margin-top: 20px;
}

.newcontextmenu {
  position: absolute;
  width: 100px;
  z-index: 1000;
  background-color: #10292f;
}

.score-btn-view {
  text-align: center;
  background-color: #10292f;
  // padding: 10px 10px 10px 10px;
  cursor: pointer;
  border-radius: 10px;

  .uv-text {
    width: 100%;
    padding: 10px 10px 10px 10px;
  }

  .chess-view {
    width: 100%;
    text-align: left;
    padding: 10px 10px 10px 10px;
    color: #ffffff;
  }
}


</style>
