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
		
		<!-- 调试控制按钮 -->
		<view class="debugControlBtn">
			<view class="btnView" @click="toggleMapLayer">
				{{ mapLayerVisible ? '隐藏地图' : '显示地图' }}
			</view>
			<view class="btnView" @click="toggleChessLayer">
				{{ chessLayerVisible ? '隐藏棋子' : '显示棋子' }}
			</view>
			<view class="btnView" @click="getLayerStatus" style="background: linear-gradient(to bottom, #4CAF50 0%, #45a049 100%);">
				调试
			</view>
			<view class="btnView" @click="testCoordinateConversion" style="background: linear-gradient(to bottom, #FF9800 0%, #F57C00 100%);">
				测试坐标
			</view>
			<view class="btnView" @click="testZoomListener" style="background: linear-gradient(to bottom, #607D8B 0%, #455A64 100%);">
				测试缩放
			</view>
		</view>
		<view class="middleBtn">
			<view class="btnView" v-if="isMove" @click="moveStop">移动结束</view>
			<view class="btnView" v-if="nextStageFlag" @click="nextStage">{{ nextBtnText }}</view>
		</view>

    <view class="top">
      <view class="top-head">
        <!-- <view class="back-btn" @click="goHall()" hover-class="hover-back-btn">← 返回</view> -->
        <image src="/static/image/wargame/火力.svg" style="width: 15%; height: 7vh;"></image>
        <view class="top-title">火力战</view>
        <view class="top-subtitle">房间号：{{game.inviteCode}}</view>
      </view>
      <view class="top-middle">
        <div class="react-left ml-3">
          <span v-if="game.nowRound === 0 && game.isDeplaoy && userType === 'user'" class="text">准备阶段</span>
          <span v-else-if="game.nowRound === 0 && game.isDeplaoy && userType !== 'user'" class="text">准备阶段</span>
          <span v-else-if="game.chessRound === 0" class="text">准备阶段</span>
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
              <view v-if="userType === 'user' && game.nowRound !== 0 && userModify"
                    @click="endRoundFuncAndSetRoundActionPoint()">
                 结束走棋
              </view>
              <view v-if="userType === 'admin' && roundEnd"
                  @click="judge()">
                打分裁决
              </view>
            </view>
          </span>
          <span>
          </span>
          <span style="width: 50%;" class="text top-identity">{{ avatarText }}{{ avatarDesc }}: {{user.userName}}</span>
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
        <!-- 删除移动棋子按钮，改为拖拽移动 -->
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
import DragAndDrop from 'ol/interaction/DragAndDrop.js';
import Translate from 'ol/interaction/Translate.js';
import DragPan from 'ol/interaction/DragPan.js';
// import Select from 'ol/interaction/Select.js';
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

      // 地图分层控制
      mapLayerVisible: true, // 地图层是否渲染
      chessLayerVisible: true, // 棋子层是否渲染
      
      // 地图层和棋子层实例
      mapLayer: null,
      chessLayer: null,
      map: null, // 地图实例引用
      vector: null, // 路径图层实例
      grid: null, // 六角格网格实例
      lastZoom: 15, // 记录上一次的缩放级别

      // 拖拽相关
      isDragging: false, // 是否正在拖拽
      draggedChess: null, // 当前拖拽的棋子
      dragStartPosition: null, // 拖拽开始位置
      dragOverlay: null, // 拖拽时的视觉反馈
      dragInteraction: null, // 拖拽交互器
      selectInteraction: null, // 选择交互器（长按模式下不再使用）
      dragFeatures: null, // 长按时参与拖拽的要素集合
      longPressTimer: null, // 长按计时器
      longPressDelay: 300, // 长按判定时长（毫秒）
      longPressActive: false, // 长按已激活标记
      longPressStartPixel: null, // 长按起点像素坐标

      // 临时开关：仅渲染六角格地图（不加载棋子与状态图层）
      mapOnly: false,

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
      if (!this.mapOnly) {
        let chessImageData = {
          verdictRecordId: this.verdictRecordId
        };
        let chessImageRes = await getMapChessImage(chessImageData);
        this.mapChessImageMap = chessImageRes.data.data;
        console.log('this.mapChessImageMap: ', this.mapChessImageMap);
      }
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
      if (!this.mapOnly) {
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
      
      // 创建地图实例
      var map = new Map({
        target: 'map',
        view: new View({
          minZoom: 13,
          maxZoom: 17,
          zoom: 15,
          center: [13240200, 3767000],
          enableRotation: false
        }),
        layers: [], // 先创建空图层数组，后续动态添加
        controls: defaultControls({
          zoom: false,
          rotate: false,
          attribution: false
        })
      });
      
      // 保存地图实例引用
      this.map = map;

      // 创建六角格网格
      var grid = new HexGrid({
        size: 200,
        origin: map.getView().getCenter(),
        row: this.mapInfo.row,
        col: this.mapInfo.col,
        coordinateMap: this.coordinateMap,
        imageMap: this.imageMap
      });
      
      // 保存grid引用用于坐标转换
      this.grid = grid;
      
      // 创建地图层（地形层）- 包含六角格、地形贴图、坐标显示等
      var hex = new HexMap({hexGrid: grid});
      this.hex = hex;
      this.mapLayer = new ImageLayer({ 
        source: hex,
        visible: this.mapLayerVisible, // 设置初始可见性
        zIndex: 1 // 地图层在最底层
      });
      this.mapLayer.set('name', '地图层');
      
      // 创建棋子层（VectorLayer用于后续拖拽）- 将用于放置可拖拽的棋子Feature
      this.chessLayer = new VectorLayer({
        source: new VectorSource(),
        visible: this.chessLayerVisible, // 设置初始可见性
        zIndex: 10 // 确保棋子层在地图层之上
      });
      this.chessLayer.set('name', '棋子层');
      
      // 根据可见性标志添加图层
      if (this.mapLayerVisible) {
        map.addLayer(this.mapLayer);
        // 只有地图层可见时才显示坐标
        hex.set('text', 'offset');
        hex.showCoordiantes('offset');
      }
      if (this.chessLayerVisible) {
        map.addLayer(this.chessLayer);
        // 如果棋子层可见，初始化完成后会渲染棋子
      }
      
      console.log('origin', grid.getOrigin());
      
      if (!this.mapOnly) {
        this.queryAllFunc();
      }
      
      // 初始化完成后输出图层状态
      setTimeout(() => {
        this.getLayerStatus();
      }, 1000);
      
      // 监听地图缩放事件，自动调整棋子大小
      map.getView().on('change:zoom', () => {
        console.log('地图缩放级别变化，自动同步棋子缩放');
        setTimeout(() => {
          this.syncChessScale();
        }, 100); // 延迟一点确保缩放完成
      });
      
      // 备用监听器：监听地图移动结束事件
      map.on('moveend', () => {
        const currentZoom = map.getView().getZoom();
        if (this.lastZoom !== currentZoom) {
          console.log('地图移动结束，缩放级别变化:', this.lastZoom, '->', currentZoom);
          this.lastZoom = currentZoom;
          this.syncChessScale();
        }
      });
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

      // 创建路径图层（用于显示移动箭头）
      this.vector = new VectorImageLayer({
        source: new VectorSource({features: new Collection()}),
        style: getStyle
      });
      this.vector.set('name', '路径层');
      
      // 将路径图层添加到棋子层中，这样路径的显示也会受棋子层控制
      if (this.chessLayerVisible) {
        map.addLayer(this.vector);
      }
      
      // 初始化拖拽交互器
      this.initDragInteraction();

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
        if (that.mapOnly) {
          // 仅打印坐标/偏移信息
          let ehex = grid.coord2hex(e.coordinate);
          var h = grid.hex2offset(ehex);
          console.log('hex offset', h);
          return;
        }

        // 隐藏所有弹窗
        that.showChessOptionInfo.visible = false;
        that.showChessListInfo.visible = false;
        that.showChessButtonInfo.visible = false;
        
        // 如果正在拖拽，不处理点击事件
        if (that.isDragging) {
          return;
        }
        
        if (that.userType !== 'user') {
          return;
        }
        
        let ehex = grid.coord2hex(e.coordinate);
        var h = grid.hex2offset(ehex);
        
        if (that.game.nowRound === 0) {
          console.log("部署阶段 - 点击位置:", h);
          that.pointOffset = h;
        } else {
          console.log("游戏阶段 - 点击位置:", h);
          // 保留其他游戏逻辑，但不包括棋子移动
          
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
                          var feature = that.vector.getSource().getFeatureById(that.selCellInfo.chessPiecesNumber)
            if (feature) {
              that.vector.getSource().removeFeature(feature);
            }
            that.vector.getSource().clear();
                          var l = new Feature({
              geometry: new LineString(that.flowLineArr),
              style: getStyle,
              type: 'LineString'
            });
            l.setId(that.selCellInfo.chessPiecesNumber)
            that.vector.getSource().addFeature(l);
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
                          var feature = that.vector.getSource().getFeatureById(that.selCellInfo.chessPiecesNumber)
            if (feature) {
              that.vector.getSource().removeFeature(feature);
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

      // 地图渲染完成，关闭loading
      uni.hideLoading();
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
      this.renderChessToVectorLayer();
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
      this.renderChessToVectorLayer();

    },
    // 删除原有的移动方法，改为拖拽移动

    drawRoad(data) {
      console.log("接受drawroad", (this.initType === "watch" || this.userType === "admin" || this.campId === data.campId) && this.user.id !== data.userId);
      if ((this.initType === "watch" || this.userType === "admin" || this.campId === data.campId) && this.user.id !== data.userId) {
        var feature = this.vector.getSource().getFeatureById(data.chessNumber)
        if (feature) {
          this.vector.getSource().removeFeature(feature);
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
        this.vector.getSource().addFeature(l);
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
      this.vector.getSource().addFeature(this.attackLine);
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
        this.avatarDesc = '导演';
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
      // 将裁决员功能合并到导演端，如果是裁决员也设置为admin类型
      if (this.user.id === this.game.firstJudgeUserId || this.user.id === this.game.secondJudgeUserId) {
        this.userType = 'admin';
        if (this.user.id === this.game.firstJudgeUserId) {
          this.avatarText = this.game.firstCampName;
        } else if (this.user.id === this.game.secondJudgeUserId) {
          this.avatarText = this.game.secondCampName;
        }
        this.avatarDesc = '导演';
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
          this.roundEnd = false;
        } else if (sum === 1) {
          this.statusDesc = '未提交';
          this.statusIndex = 0;
          this.roundEnd = false;
        } else if (sum === 2) {
          this.statusDesc = '待裁决';
          this.statusIndex = 1;
          this.roundEnd = true;
        } else if (sum === 3) {
          this.statusDesc = '待裁决';
          this.statusIndex = 1;
          this.roundEnd = true;
        } else if (sum === 4) {
          this.statusDesc = '已裁决';
          this.statusIndex = 2;
          this.roundEnd = false;
        } else if (sum === 5) {
          this.statusDesc = '待修正';
          this.statusIndex = 2;
          this.roundEnd = false;
        } else if (sum === 6) {
          this.statusDesc = '已修正';
          this.roundEnd = false;
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
                if (this.userType === 'admin') {
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
      this.formatterAllChessPiecesInfo(this.game.userPiece);
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

      // 尝试渲染棋子到棋子层（VectorLayer）
      this.renderChessToVectorLayer();
      
      // 如果VectorLayer渲染失败，回退到原来的渲染方式
      setTimeout(() => {
        if (this.mapChessArray.length > 0 && this.chessLayer.getSource().getFeatures().length === 0) {
          console.log('VectorLayer渲染失败，回退到原渲染方式');
          this.hex.moveChessImage(this.mapChessArray);
        }
      }, 1000);
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
      if (this.userType === 'user') {
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
      // 导演端不需要设置campId，可以查看所有阵营的裁决结果
      if (this.userType === 'user') {
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
      this.renderChessToVectorLayer();
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

    },
    
    // 图层控制方法
    toggleMapLayer() {
      this.mapLayerVisible = !this.mapLayerVisible;
      if (this.map && this.mapLayer) {
        if (this.mapLayerVisible) {
          // 添加地图层
          this.map.addLayer(this.mapLayer);
          // 显示坐标
          this.hex.set('text', 'offset');
          this.hex.showCoordiantes('offset');
        } else {
          // 移除地图层
          this.map.removeLayer(this.mapLayer);
        }
      }
      console.log('地图层可见性:', this.mapLayerVisible);
    },
    
    toggleChessLayer() {
      this.chessLayerVisible = !this.chessLayerVisible;
      if (this.map) {
        if (this.chessLayerVisible) {
          // 添加棋子层
          if (this.chessLayer) {
            this.map.addLayer(this.chessLayer);
          }
          // 添加路径图层
          if (this.vector) {
            this.map.addLayer(this.vector);
          }
          // 重新渲染棋子
          this.renderChessToVectorLayer();
        } else {
          // 移除棋子层
          if (this.chessLayer) {
            this.map.removeLayer(this.chessLayer);
          }
          // 移除路径图层
          if (this.vector) {
            this.map.removeLayer(this.vector);
          }
        }
      }
      console.log('棋子层可见性:', this.chessLayerVisible);
    },
    
    // 获取当前图层状态信息
    getLayerStatus() {
      console.log('=== 图层状态信息 ===');
      console.log('地图层可见性:', this.mapLayerVisible);
      console.log('棋子层可见性:', this.chessLayerVisible);
      console.log('地图层实例:', this.mapLayer);
      console.log('棋子层实例:', this.chessLayer);
      console.log('地图实例:', this.map);
      
      if (this.map) {
        console.log('地图上的图层数量:', this.map.getLayers().getLength());
        console.log('地图上的图层列表:');
        this.map.getLayers().forEach((layer, index) => {
          console.log(`图层${index}:`, layer.get('name') || layer.constructor.name, '可见性:', layer.getVisible());
        });
      }
      
      if (this.chessLayer) {
        console.log('棋子层Feature数量:', this.chessLayer.getSource().getFeatures().length);
      }
      console.log('==================');
    },
    
    // 将棋子渲染到VectorLayer
    renderChessToVectorLayer() {
      console.log('开始渲染棋子到VectorLayer');
      console.log('棋子层状态:', this.chessLayer);
      console.log('棋子数组:', this.mapChessArray);
      console.log('棋子层可见性:', this.chessLayerVisible);
      
      if (!this.chessLayer || !this.mapChessArray) {
        console.log('棋子层或棋子数组未初始化');
        return;
      }
      
      if (this.mapChessArray.length === 0) {
        console.log('棋子数组为空，跳过渲染');
        return;
      }
      
      // 确保棋子层可见
      if (!this.chessLayerVisible) {
        console.log('棋子层当前不可见，设置为可见');
        this.chessLayerVisible = true;
        if (this.map && this.chessLayer) {
          this.map.addLayer(this.chessLayer);
        }
        if (this.map && this.vector) {
          this.map.addLayer(this.vector);
        }
      }
      
      // 清空棋子层
      this.chessLayer.getSource().clear();
      
      // 为每个棋子创建Feature
      for (let chessItem of this.mapChessArray) {
        console.log('处理棋子:', chessItem);
        
        if (chessItem.info && chessItem.info.offset) {
          // 解析offset坐标
          let offsetParts = chessItem.info.offset.split(',');
          let q = parseInt(offsetParts[0]);
          let r = parseInt(offsetParts[1]);
          
          console.log('offset坐标:', q, r);
          
          // 将offset坐标转换为地图坐标
          let coord;
          if (this.grid && this.grid.hex2coord) {
            // 先将offset转换为hex坐标，再转换为地图坐标
            let hexCoord = this.grid.offset2hex([q, r]);
            coord = this.grid.hex2coord(hexCoord);
          } else {
            console.error('无法找到grid或hex2coord方法');
            console.log('grid对象:', this.grid);
            // 使用默认坐标作为回退
            coord = [13240200 + q * 200, 3767000 + r * 200];
          }
          console.log('转换后的地图坐标:', coord);
          
          // 创建棋子Feature
          let chessFeature = new Feature({
            geometry: new Point(coord),
            chessData: chessItem.info, // 保存棋子数据
            offset: chessItem.info.offset
          });
          
          // 设置棋子样式（使用棋子图片）
          let chessStyle = new Style({
            image: new Icon({
              src: chessItem.info.chessPiecesCover,
              scale: this.getChessScale(), // 根据缩放级别动态调整
              anchor: [0.5, 0.5] // 居中显示
            })
          });
          
          chessFeature.setStyle(chessStyle);
          chessFeature.setId(chessItem.info.chessPiecesNumber);
          
          // 添加拖拽属性
          chessFeature.set('draggable', true);
          chessFeature.set('chessInfo', chessItem.info);
          
          // 添加到棋子层
          this.chessLayer.getSource().addFeature(chessFeature);
          console.log('棋子已添加到图层:', chessItem.info.chessPiecesName);
        }
      }
      
      console.log('棋子渲染完成，共', this.mapChessArray.length, '个棋子');
      console.log('棋子层Feature数量:', this.chessLayer.getSource().getFeatures().length);
    },
    
    // 测试坐标转换
    testCoordinateConversion() {
      console.log('=== 测试坐标转换 ===');
      if (this.grid) {
        console.log('grid对象存在');
        console.log('grid方法:', Object.getOwnPropertyNames(this.grid));
        
        // 测试一个简单的坐标转换
        let testOffset = [0, 0];
        console.log('测试offset坐标:', testOffset);
        
        if (this.grid.offset2hex) {
          let hexCoord = this.grid.offset2hex(testOffset);
          console.log('转换为hex坐标:', hexCoord);
          
          if (this.grid.hex2coord) {
            let mapCoord = this.grid.hex2coord(hexCoord);
            console.log('转换为地图坐标:', mapCoord);
          }
        }
      } else {
        console.log('grid对象不存在');
      }
      console.log('==================');
    },
    
    // 根据地图缩放级别获取棋子缩放比例
    getChessScale() {
      if (!this.map) {
        return 0.3; // 默认缩放比例
      }
      
      const zoom = this.map.getView().getZoom();
      console.log('当前地图缩放级别:', zoom);
      
      // 直接根据缩放级别设置棋子大小
      // 缩放级别范围：13-17
      let scale;
      switch (zoom) {
        case 13:
          scale = 0.15; // 最远视图，棋子最小
          break;
        case 14:
          scale = 0.2;
          break;
        case 15:
          scale = 0.3; // 初始级别
          break;
        case 16:
          scale = 0.4;
          break;
        case 17:
          scale = 0.5; // 最近视图，棋子最大
          break;
        default:
          // 对于其他缩放级别，使用线性插值
          if (zoom < 13) {
            scale = 0.1; // 最小缩放
          } else if (zoom > 17) {
            scale = 0.6; // 最大缩放
          } else {
            // 线性插值
            scale = 0.15 + (zoom - 13) * 0.0875; // 每级增加0.0875
          }
      }
      
      console.log('棋子缩放比例:', scale);
      return scale;
    },
    
    // 更新所有棋子的缩放比例
    updateChessScale() {
      if (!this.chessLayer || !this.mapChessArray) {
        console.log('棋子层或棋子数组未初始化，跳过缩放更新');
        return;
      }
      
      const newScale = this.getChessScale();
      console.log('更新棋子缩放比例:', newScale);
      
      let updatedCount = 0;
      
      // 更新所有棋子的样式
      this.chessLayer.getSource().getFeatures().forEach(feature => {
        const currentStyle = feature.getStyle();
        if (currentStyle && currentStyle.getImage()) {
          currentStyle.getImage().setScale(newScale);
          updatedCount++;
        }
      });
      
      console.log('已更新', updatedCount, '个棋子的缩放比例');
      
      // 触发图层重新渲染
      this.chessLayer.changed();
    },
    
    // 测试缩放监听器
    testZoomListener() {
      console.log('=== 测试缩放监听器 ===');
      if (this.map) {
        const view = this.map.getView();
        console.log('当前缩放级别:', view.getZoom());
        console.log('当前分辨率:', view.getResolution());
        
        // 手动触发一次缩放更新
        this.updateChessScale();
      } else {
        console.log('地图实例不存在');
      }
      console.log('==================');
    },
    
    // 手动同步棋子缩放
    syncChessScale() {
      console.log('=== 手动同步棋子缩放 ===');
      if (this.map) {
        const zoom = this.map.getView().getZoom();
        console.log('当前地图缩放级别:', zoom);
        
        // 直接根据缩放级别设置棋子大小
        let scale;
        switch (zoom) {
          case 13: scale = 0.15; break;
          case 14: scale = 0.2; break;
          case 15: scale = 0.3; break;
          case 16: scale = 0.4; break;
          case 17: scale = 0.5; break;
          default: scale = 0.3;
        }
        
        console.log('设置棋子缩放比例:', scale);
        // 直接更新所有棋子的缩放比例
        if (this.chessLayer) {
          this.chessLayer.getSource().getFeatures().forEach(feature => {
            const currentStyle = feature.getStyle();
            if (currentStyle && currentStyle.getImage()) {
              currentStyle.getImage().setScale(scale);
            }
          });
          this.chessLayer.changed();
        }
      } else {
        console.log('地图实例不存在');
      }
      console.log('==================');
    },
    
    // 初始化拖拽交互器
    initDragInteraction() {
      if (!this.map || !this.chessLayer) {
        console.log('地图或棋子层未初始化，无法设置拖拽');
        return;
      }
      
      // 长按拖拽：使用Translate并在长按后动态设置features
      this.dragFeatures = new Collection();
      this.dragInteraction = new Translate({
        features: this.dragFeatures
      });
      // 长按自定义拖拽，禁用Translate默认行为
      this.dragInteraction.setActive(false);
      
      // 不使用Translate的事件，由自定义pointermove/pointerup处理
      
      // 添加交互器到地图
      this.map.addInteraction(this.dragInteraction);
      
      // 地图层指针事件：实现长按触发拖拽
      this.map.on('pointerdown', (evt) => {
        if (!this.chessLayerVisible) return;
        this.longPressActive = false;
        this.longPressStartPixel = evt.pixel.slice();
        const feature = this.map.forEachFeatureAtPixel(evt.pixel, f => f, { layerFilter: l => l === this.chessLayer });
        if (feature && feature.get('draggable')) {
          // 启动长按计时器
          this.longPressTimer = setTimeout(() => {
            this.longPressActive = true;
            this.isDragging = true;
            this.dragFeatures.clear();
            this.dragFeatures.push(feature);
            // 禁用地图拖拽平移，避免与棋子拖动冲突
            this.map.getInteractions().forEach(interaction => {
              if (interaction instanceof DragPan) {
                interaction.setActive(false);
              }
            });
            this.draggedChess = feature;
            this.dragStartPosition = feature.getGeometry().getCoordinates();
            // 手动触发一次选中态的半透明
            const currentStyle = feature.getStyle();
            if (currentStyle && currentStyle.getImage && currentStyle.getImage()) {
              const img = currentStyle.getImage();
              const originalOpacity = (img.getOpacity && img.getOpacity()) != null ? img.getOpacity() : 1;
              feature.set('origOpacity', originalOpacity);
              if (img.setOpacity) {
                img.setOpacity(0.7);
                this.chessLayer && this.chessLayer.changed();
              }
            }
            // 清理计时器引用，避免后续pointermove误判
            this.longPressTimer = null;
          }, this.longPressDelay);
        }
      });

      this.map.on('pointermove', (evt) => {
        // 若在等待长按，检测位移阈值以取消长按
        if (this.longPressTimer) {
          const dx = evt.pixel[0] - this.longPressStartPixel[0];
          const dy = evt.pixel[1] - this.longPressStartPixel[1];
          if (Math.sqrt(dx*dx + dy*dy) > 6) {
            clearTimeout(this.longPressTimer);
            this.longPressTimer = null;
          }
          return;
        }
        // 已长按激活且正在拖拽：手动更新棋子位置
        if (this.longPressActive && this.isDragging && this.draggedChess) {
          const geom = this.draggedChess.getGeometry();
          if (geom && geom.setCoordinates) {
            geom.setCoordinates(evt.coordinate);
            this.chessLayer && this.chessLayer.changed();
          }
        }
      });

      const clearLongPress = () => {
        if (this.longPressTimer) {
          clearTimeout(this.longPressTimer);
          this.longPressTimer = null;
        }
      };

      this.map.on('pointerup', (evt) => {
        clearLongPress();
        // 如果长按未激活，保持原状；若已激活，Translate会处理拖拽结束事件恢复不透明度
        // 恢复地图拖拽平移
        this.map.getInteractions().forEach(interaction => {
          if (interaction instanceof DragPan) {
            interaction.setActive(true);
          }
        });
        // 若长按激活且存在被拖拽棋子：吸附并提交移动
        if (this.longPressActive && this.draggedChess) {
          const endCoord = this.draggedChess.getGeometry().getCoordinates();
          const nearestHex = this.findNearestHex(endCoord);
          if (nearestHex) {
            this.moveChessToHex(this.draggedChess, nearestHex);
          }
          // 恢复不透明度
          const currentStyle = this.draggedChess.getStyle();
          const origOpacity = this.draggedChess.get('origOpacity');
          if (currentStyle && currentStyle.getImage && currentStyle.getImage()) {
            const img = currentStyle.getImage();
            if (img.setOpacity) {
              img.setOpacity(origOpacity != null ? origOpacity : 1);
              this.chessLayer && this.chessLayer.changed();
            }
          }
          this.dragFeatures && this.dragFeatures.clear();
        }
        // 重置标志，要求再次长按才能继续拖拽
        this.longPressActive = false;
        this.isDragging = false;
        this.draggedChess = null;
        this.dragStartPosition = null;
      });
      
      console.log('拖拽交互器初始化完成');
    },
    
    // 找到最近的六角格位置
    findNearestHex(coord) {
      if (!this.grid) {
        console.log('六角格网格未初始化');
        return null;
      }
      
      // 将坐标转换为六角格坐标
      const hexCoord = this.grid.coord2hex(coord);
      const offsetCoord = this.grid.hex2offset(hexCoord);
      
      // 将offset坐标转换回地图坐标（确保位置准确）
      const finalCoord = this.grid.hex2coord(hexCoord);
      
      console.log('坐标转换:', {
        original: coord,
        hex: hexCoord,
        offset: offsetCoord,
        final: finalCoord
      });
      
      return {
        coord: finalCoord,
        offset: offsetCoord.join(','),
        hex: hexCoord
      };
    },
    
    // 移动棋子到指定六角格
    moveChessToHex(chessFeature, hexInfo) {
      if (!chessFeature || !hexInfo) {
        console.log('棋子或六角格信息无效');
        return;
      }
      
      const chessInfo = chessFeature.get('chessInfo');
      console.log('移动棋子:', chessInfo.chessPiecesName, '到位置:', hexInfo.offset);
      
      // 更新棋子的几何位置
      chessFeature.getGeometry().setCoordinates(hexInfo.coord);
      
      // 更新棋子数据
      chessInfo.offset = hexInfo.offset;
      chessInfo.coordinate = hexInfo.offset;
      
      // 更新mapChessArray中对应的棋子位置
      this.updateChessPositionInArray(chessInfo.chessPiecesNumber, hexInfo.offset);
      
      // 触发图层更新
      this.chessLayer.changed();
      
      // 发送移动请求到后端
      this.sendMoveRequest(chessInfo, hexInfo);
    },
    
    // 更新棋子数组中的位置
    updateChessPositionInArray(chessNumber, newOffset) {
      for (let i = 0; i < this.mapChessArray.length; i++) {
        if (this.mapChessArray[i].info.chessPiecesNumber === chessNumber) {
          this.mapChessArray[i].offset = newOffset;
          this.mapChessArray[i].info.offset = newOffset;
          console.log('更新棋子数组位置:', chessNumber, '->', newOffset);
          break;
        }
      }
    },
    
    // 发送移动请求到后端
    sendMoveRequest(chessInfo, hexInfo) {
      console.log('发送移动请求:', {
        chessNumber: chessInfo.chessPiecesNumber,
        fromOffset: this.dragStartPosition ? this.findNearestHex(this.dragStartPosition).offset : chessInfo.offset,
        toOffset: hexInfo.offset
      });
      
      // 调用后端移动API
      let data = {
        id: chessInfo.id,
        offset: hexInfo.offset,
        coordinate: hexInfo.offset
      };
      
      moveChess(data);
      sendMsg(
        JSON.stringify({
          action: 'takeAction',
          verdictRecordId: this.verdictRecordId
        })
      );
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
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    cursor: pointer;
    color: #ffffff;
    text-shadow: 0 1px 0 rgba(0,0,0,0.25);
    width: 140px;
    height: 40px;
    margin: 16px 12px;
    border-radius: 14px; /* 圆润外观 */
    background-color: rgba(82, 120, 42, 0.78); /* 更高透明度，贴近顶部导航的磨砂风格 */
    border: 1px solid rgba(255,255,255,0.26);
    /* 主阴影 + 轻微赛博感外发光 */
    box-shadow: 0 12px 26px rgba(0,0,0,0.22), 0 0 12px rgba(76,245,227,0.18), inset 0 1px 0 rgba(255,255,255,0.08);
    -webkit-backdrop-filter: saturate(180%) blur(10px);
    backdrop-filter: saturate(180%) blur(10px); /* macOS 磨砂玻璃效果 */
    transition: background-color .15s ease, box-shadow .15s ease, transform .08s ease;
    position: relative;
  }

  .btnView::before { display: none; }
  /* 霓虹描边与高光覆层，增强科技感 */
  .btnView::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    box-shadow: inset 0 0 0 1px rgba(76,245,227,0.20);
    background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0) 60%);
  }

  .btnView:hover {
    background-color: rgba(82, 120, 42, 0.80);
    box-shadow: 0 14px 30px rgba(0,0,0,0.26), 0 0 16px rgba(76,245,227,0.28), inset 0 1px 0 rgba(255,255,255,0.10);
  }
  .btnView:active {
    transform: translateY(1px) scale(0.99);
    box-shadow: 0 10px 22px rgba(0,0,0,0.22), 0 0 12px rgba(76,245,227,0.22), inset 0 1px 0 rgba(255,255,255,0.08);
  }
}

.debugControlBtn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .btnView {
    background: linear-gradient(to bottom, #8b4513 0%, #d2691e 100%);
    color: #ffffff;
    text-align: center;
    align-items: center;
    padding: 8px 12px;
    font-size: 12px;
    cursor: pointer;
    border-radius: 5px;
    min-width: 80px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  .btnView:hover {
    background: linear-gradient(to bottom, #a0522d 0%, #cd853f 100%);
  }
}

.top{
  position: fixed;
  top: 10px; /* 悬浮于顶部，留出圆角显示空间 */
  left: 12px;
  width: calc(100vw - 24px);
  height: 48px; /* 统一菜单栏高度 */
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 999;
  padding: 0 12px;
  background-color: rgba(82, 120, 42, 0.78); /* 更淡一些的军绿 */
  border-radius: 16px; /* 圆润外观 */
  border: 1px solid rgba(255,255,255,0.18); /* 细腻浅色描边 */
  box-shadow: 0 10px 22px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.06); /* 柔和投影与高光 */
  -webkit-backdrop-filter: saturate(180%) blur(10px);
  backdrop-filter: saturate(180%) blur(10px); /* 苹果风半透明磨砂 */
  box-sizing: border-box;
}

/* 顶栏分区的细分隔线 */
.top > .top-head,
.top > .top-middle{
  border-right: 1px solid rgba(255,255,255,0.10);
}
.top > .top-tail{ border-right: none; }

.top-head{
  width: 30vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0;
  padding: 0 8px;
  height: 100%;
  line-height: 48px;
  background: transparent; /* 由顶栏负责背景 */
  border: none;
  border-radius: 0;
  clip-path: none;
}

/* 顶部文字样式，适配玻璃导航栏 */
.top-title{
  margin-left: 8px;
  font-size: 22px;
  font-weight: 700;
  color: #4cf5e3;
  letter-spacing: 1px;
  text-shadow: 0 1px 0 rgba(0,0,0,.25), 0 0 10px rgba(76,245,227,.35);
  height: 48px;
  line-height: 48px;
}
.top-subtitle{
  margin-left: 10px;
  font-size: 16px;
  color: rgba(255,255,255,.92);
  text-shadow: 0 1px 0 rgba(0,0,0,.25);
  height: 48px;
  line-height: 48px;
}
.top-identity{
  color: rgba(255,255,255,.95);
  font-size: 16px;
  letter-spacing: .5px;
  text-shadow: 0 1px 0 rgba(0,0,0,.3), 0 0 8px rgba(76,245,227,.35);
}

.top-middle{
  width: 40vw;
  text-align: center;
  align-items: center;
  .react-left {
    &.react-l-s { width: auto; text-align: left; }
    font-size: 18px;
    width: auto;
    margin-left: 0;
    margin-top: 0;
    height: 48px;
    line-height: 48px;
    text-align: center;
    transform: none;
    background: transparent;
    border: none;
    border-radius: 0;
    overflow: visible;
    .react-left { display: none; }
    .text { color: #4cf5e3; font-size: 22px; font-weight: bold; display: inline-block; transform: none; }
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
    width: 100%;
    margin-left: 0;
    height: 48px;
    line-height: 48px;
    text-align: right;
    transform: none;
    position: relative;
    background: transparent; /* 由顶栏负责背景 */
    border-radius: 0;
    box-shadow: none;
    &::before { content: ''; display: none; }
    .react-after {
      display: none;
    }
  
    .text {
      color: #4cf5e3;
      font-size: 18px;
      font-weight: bold;
      display: inline-block;
      transform: none;
      letter-spacing: 0.5px;
      text-shadow: 0 1px 0 rgba(0,0,0,0.3), 0 0 8px rgba(76,245,227,0.45);
    }
  }

  .top-tail-action{
    color: #ffffff;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    user-select: none;
  }
  /* action 内的每个按钮在 H5 悬停时呈现可点击样式 */
  .top-tail-action > view{
    cursor: pointer;
    padding: 0 6px;
    border-radius: 6px;
    transition: color .15s ease, background-color .15s ease, text-shadow .15s ease;
    color: inherit;
  }
  .top-tail-action > view:hover{
    color: #4cf5e3;
    background-color: rgba(76,245,227,0.08);
    text-shadow: 0 0 8px rgba(76,245,227,0.45);
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

.back-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  line-height: 32px;
  padding: 0 12px;
  margin-right: 8px;
  border-radius: 10px;
  color: #ffffff;
  cursor: pointer;
  text-shadow: 0 1px 0 rgba(0,0,0,0.25);
  background-color: rgba(82, 120, 42, 0.78);
  border: 1px solid rgba(255,255,255,0.26);
  box-shadow: 0 8px 18px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.08);
  -webkit-backdrop-filter: saturate(180%) blur(10px);
  backdrop-filter: saturate(180%) blur(10px);
}
.hover-back-btn {
  background-color: rgba(82, 120, 42, 0.82);
}

</style>
