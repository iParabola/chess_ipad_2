<template>
  <view>
    <uni-popup ref="popup" :mask-click="false">

      <view class="rule__view">

        <svg v-if="showInfo.type === 'input'" xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%"
             viewBox="491 252 887 624">
          <defs>
            <linearGradient id="linear-gradient" x1="0.442" y1="0.061" x2="0.678" y2="1"
                            gradientUnits="objectBoundingBox">
              <stop offset="0" stop-color="#fff"/>
              <stop offset="1" stop-color="#00cedb"/>
            </linearGradient>
            <linearGradient id="linear-gradient-2" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0" stop-color="#00cedb"/>
              <stop offset="1" stop-color="#fff"/>
            </linearGradient>
            <filter x="-40.85" y="-5" width="156.686" height="156.686" filterUnits="userSpaceOnUse">
              <feOffset input="SourceAlpha"/>
              <feGaussianBlur stdDeviation="2" result="blur-11"/>
              <feFlood flood-color="#00f0ff"/>
              <feComposite operator="in" in2="blur-11"/>
            </filter>
            <filter x="-40.85" y="-5" width="156.686" height="156.686" filterUnits="userSpaceOnUse">
              <feOffset input="SourceAlpha"/>
              <feGaussianBlur stdDeviation="10" result="blur-12"/>
              <feFlood flood-color="#00cedb" flood-opacity="0.8" result="color-6"/>
              <feComposite operator="out" in="SourceGraphic" in2="blur-12"/>
              <feComposite operator="in" in="color-6"/>
              <feComposite operator="in" in2="SourceGraphic"/>
            </filter>
            <filter x="11.381" y="44.942" width="48.016" height="42.367" filterUnits="userSpaceOnUse">
              <feOffset input="SourceAlpha"/>
              <feGaussianBlur stdDeviation="2" result="blur-13"/>
              <feFlood flood-color="#fff" flood-opacity="0.702"/>
              <feComposite operator="in" in2="blur-13"/>
            </filter>
            <filter x="11.381" y="44.942" width="48.016" height="42.367" filterUnits="userSpaceOnUse">
              <feOffset input="SourceAlpha"/>
              <feGaussianBlur stdDeviation="1.5" result="blur-14"/>
              <feFlood flood-color="#fff" flood-opacity="0.352" result="color-7"/>
              <feComposite operator="out" in="SourceGraphic" in2="blur-14"/>
              <feComposite operator="in" in="color-7"/>
              <feComposite operator="in" in2="SourceGraphic"/>
            </filter>
            <filter x="22.516" y="1014.37" width="243.081" height="67.263" filterUnits="userSpaceOnUse">
              <feOffset input="SourceAlpha"/>
              <feGaussianBlur stdDeviation="3" result="blur-15"/>
              <feFlood flood-color="#00f0ff"/>
              <feComposite operator="in" in2="blur-15"/>
            </filter>
            <filter x="22.516" y="1014.37" width="243.081" height="67.263" filterUnits="userSpaceOnUse">
              <feOffset input="SourceAlpha"/>
              <feGaussianBlur stdDeviation="5" result="blur-16"/>
              <feFlood flood-color="#00f0ff" flood-opacity="0.102" result="color-8"/>
              <feComposite operator="out" in="SourceGraphic" in2="blur-16"/>
              <feComposite operator="in" in="color-8"/>
              <feComposite operator="in" in2="SourceGraphic"/>
            </filter>
            <linearGradient id="linear-gradient-3" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0" stop-color="#fa0" stop-opacity="0.702"/>
              <stop offset="1" stop-color="#00464a" stop-opacity="0.702"/>
            </linearGradient>
            <filter x="217.712" y="1014.37" width="243.081" height="67.263" filterUnits="userSpaceOnUse">
              <feOffset input="SourceAlpha"/>
              <feGaussianBlur stdDeviation="3" result="blur-17"/>
              <feFlood flood-color="#fb0" flood-opacity="0.502"/>
              <feComposite operator="in" in2="blur-17"/>
            </filter>
            <filter x="217.712" y="1014.37" width="243.081" height="67.263" filterUnits="userSpaceOnUse">
              <feOffset input="SourceAlpha"/>
              <feGaussianBlur stdDeviation="5" result="blur-18"/>
              <feFlood flood-color="#fb0" flood-opacity="0.502" result="color-9"/>
              <feComposite operator="out" in="SourceGraphic" in2="blur-18"/>
              <feComposite operator="in" in="color-9"/>
              <feComposite operator="in" in2="SourceGraphic"/>
            </filter>
            <filter x="413.925" y="1014.37" width="243.081" height="67.263" filterUnits="userSpaceOnUse">
              <feOffset input="SourceAlpha"/>
              <feGaussianBlur stdDeviation="3" result="blur-19"/>
              <feFlood flood-color="#00f0ff"/>
              <feComposite operator="in" in2="blur-19"/>
            </filter>
            <filter x="413.925" y="1014.37" width="243.081" height="67.263" filterUnits="userSpaceOnUse">
              <feOffset input="SourceAlpha"/>
              <feGaussianBlur stdDeviation="5" result="blur-20"/>
              <feFlood flood-color="#00f0ff" flood-opacity="0.102" result="color-10"/>
              <feComposite operator="out" in="SourceGraphic" in2="blur-20"/>
              <feComposite operator="in" in="color-10"/>
              <feComposite operator="in" in2="SourceGraphic"/>
            </filter>

            <linearGradient id="linear-gradient-5" x1="0.008" y1="0.459" x2="0.996" y2="0.454"
                            gradientUnits="objectBoundingBox">
              <stop offset="0" stop-color="#00f0ff"/>
              <stop offset="0.285" stop-color="#00b4c0" stop-opacity="0"/>
              <stop offset="0.73" stop-color="#00c7d4" stop-opacity="0"/>
              <stop offset="1" stop-color="#00f0ff"/>
            </linearGradient>
            <linearGradient id="linear-gradient-7" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0" stop-color="#00adb7" stop-opacity="0.8"/>
              <stop offset="0.439" stop-color="#002123" stop-opacity="0.902"/>
              <stop offset="0.517" stop-color="#002123" stop-opacity="0.898"/>
              <stop offset="1" stop-color="#00a8b3" stop-opacity="0.8"/>
            </linearGradient>
            <filter id="路径_59" x="491" y="252.231" width="886.844" height="624.229" filterUnits="userSpaceOnUse">
              <feOffset dy="3" input="SourceAlpha"/>
              <feGaussianBlur stdDeviation="5" result="blur-22"/>
              <feFlood flood-color="#00f0ff"/>
              <feComposite operator="in" in2="blur-22"/>
            </filter>
            <filter id="路径_59-2" x="491" y="252.231" width="886.844" height="624.229" filterUnits="userSpaceOnUse">
              <feOffset dy="3" input="SourceAlpha"/>
              <feGaussianBlur stdDeviation="15" result="blur-23"/>
              <feFlood flood-color="#00f0ff" flood-opacity="0.902" result="color-11"/>
              <feComposite operator="out" in="SourceGraphic" in2="blur-23"/>
              <feComposite operator="in" in="color-11"/>
              <feComposite operator="in" in2="SourceGraphic"/>
            </filter>
            <filter id="指令上传表" x="540" y="270" width="196" height="79" filterUnits="userSpaceOnUse">
              <feOffset dy="3" input="SourceAlpha"/>
              <feGaussianBlur stdDeviation="6" result="blur-24"/>
              <feFlood flood-color="#00c1cd"/>
              <feComposite operator="in" in2="blur-24"/>
              <feComposite in="SourceGraphic"/>
            </filter>
            <linearGradient id="linear-gradient-9" y1="0.5" x2="1" y2="0.5" gradientUnits="objectBoundingBox">
              <stop offset="0" stop-color="#00ddeb"/>
              <stop offset="1" stop-color="#007a82"/>
            </linearGradient>

          </defs>
          <g id="指令上传表">
            <rect id="矩形_26" data-name="矩形 26" class="cls-40" width="100%" height="100%"/>
            <g>
              <path class="cls-41" d="M2974.924,1585.89H2866.262l-28.445,26.739v53.477"
                    transform="translate(-2323.563 -1332.89)"/>
              <path class="cls-42"
                    d="M3104.151,2156.031l-17.942,12.691H2871.338l-32.821-31.509V1807.249l10.5,9.846v315.961l22.756,22.975Z"
                    transform="translate(-2323.454 -1298.397)"/>
              <path class="cls-41" d="M3245.61,2133.229h131.417l31.29-31.639v-66.562"
                    transform="translate(-2051.02 -1262.903)"/>
              <path class="cls-43"
                    d="M3218.417,1598.512l17.776-11.392h145.071l29.014,28.445v298.789l-9.408-8.079V1622.749l-25.583-24.237Z"
                    transform="translate(-2055.257 -1332.698)"/>
              <g data-type="innerShadowGroup">
                <g class="cls-62" transform="matrix(1, 0, 0, 1, 0, 0)">
                  <path class="cls-44"
                        d="M2874.209,1596.472l-24.463,23.894v51.2l-18.2,15.929v145.07l18.2,17.636v316.31l24.463,22.188h770.646l24.463-22.188v-68.837l17.067-16.5V1919.609l-17.067-13.654v-285.59l-24.463-23.894Z"
                        transform="translate(-2324.54 -1331.24)"/>
                </g>
                <path class="cls-45"
                      d="M2874.209,1596.472l-24.463,23.894v51.2l-18.2,15.929v145.07l18.2,17.636v316.31l24.463,22.188h770.646l24.463-22.188v-68.837l17.067-16.5V1919.609l-17.067-13.654v-285.59l-24.463-23.894Z"
                      transform="translate(-2324.541 -1331.241)"/>
                <g class="cls-61" transform="matrix(1, 0, 0, 1, 0, 0)">
                  <path class="cls-4"
                        d="M2874.209,1596.472l-24.463,23.894v51.2l-18.2,15.929v145.07l18.2,17.636v316.31l24.463,22.188h770.646l24.463-22.188v-68.837l17.067-16.5V1919.609l-17.067-13.654v-285.59l-24.463-23.894Z"
                        transform="translate(-2324.54 -1331.24)"/>
                </g>
                <path class="cls-5"
                      d="M2874.209,1596.472l-24.463,23.894v51.2l-18.2,15.929v145.07l18.2,17.636v316.31l24.463,22.188h770.646l24.463-22.188v-68.837l17.067-16.5V1919.609l-17.067-13.654v-285.59l-24.463-23.894Z"
                      transform="translate(-2324.541 -1331.241)"/>
              </g>
            </g>
            <foreignObject x="555" y="290" width="500" height="50">
              <div style="font-size: 40px; font-weight: 700; color: #fff;">
                指令上传表
              </div>
            </foreignObject>

            <foreignObject x="580" y="358" width="100" height="50">
              <div style="font-size: 32px; font-weight: 700; color: #fff;">
                回合
              </div>
            </foreignObject>


            <foreignObject x="767" y="358" width="100" height="50">
              <div style="font-size: 32px;  font-weight: 700; color: #fff;">
                阶段
              </div>
            </foreignObject>

            <foreignObject x="1000" y="358" width="300" height="50">
              <div style="font-size: 32px;  font-weight: 700; color: #fff;">
                指挥员指令
              </div>
            </foreignObject>

            <!--            上传图片表格可能要修改-->
            <foreignObject x="565" y="410" width="800" height="180">
              <body xmlns="http://www.w3.org/1999/xhtml">
              <table background-color=transparent width=90%>
                <tr class="row" >
                  <td rowspan="3"
                      style="font-size: 28px; width: 20% ;background-color: rgb(12,52,54);color: #fff ; text-align: center">
                    第{{ showInfo.chessRound }}回合
                  </td>
                  <td rowspan="2"
                      style="font-size: 28px; width: 35% ;background-color: rgb(12,52,54);color: #fff ; text-align: center">
                    {{ showInfo.roundPeriodName }}
                  </td>
                  <td rowspan="2" style="font-size: 28px; width: 40% ;background-color: rgb(12,52,54);">
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
                  </td>
                </tr>
              </table>
              </body>
            </foreignObject>

            <path class="cls-50"
                  d="M646.5,398.107s153.393-.724,408.961-.724,356.156.724,356.156.724-64.2,2.209-356.156,2.209S646.5,398.107,646.5,398.107Z"
                  transform="translate(-96.504 7.831)"/>
            <foreignObject x="592" y="759" width="320" height="52">
              <body xmlns="http://www.w3.org/1999/xhtml">
              <button @click="submitInstruct"
                      style="width: 100%; height: 100%; font-size: 30px; background: linear-gradient(to right, #00ddeb, #007a82); color: #fff; border: 2px solid #00f0ff; cursor: pointer; display: flex; justify-content: center; align-items: center;">
                保存指令
              </button>
              </body>
            </foreignObject>

            <foreignObject x="974" y="759" width="320" height="52">
              <body xmlns="http://www.w3.org/1999/xhtml">
              <button @click="close"
                      style="width: 100%; height: 100%; font-size: 30px; background: linear-gradient(to right, #00ddeb, #007a82); color: #fff; border: 2px solid #00f0ff; cursor: pointer; display: flex; justify-content: center; align-items: center;">
                关闭
              </button>
              </body>
            </foreignObject>
            <!--            <image id="图片" width="83" height="83" transform="translate(1051 409)" xlink:href="default_pic.png"/>-->
          </g>
        </svg>

        <svg v-else
             xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             width="1400" height="626.46" viewBox="0 0 1465.642 626.46">
          <defs>
            <filter id="路径_59" x="0" y="2.231" width="1465.642" height="624.229" filterUnits="userSpaceOnUse">
              <feOffset dy="3" input="SourceAlpha"/>
              <feGaussianBlur stdDeviation="5" result="blur"/>
              <feFlood flood-color="#00f0ff"/>
              <feComposite operator="in" in2="blur"/>
            </filter>
            <filter id="路径_59-2" x="0" y="2.231" width="1465.642" height="624.229" filterUnits="userSpaceOnUse">
              <feOffset dy="3" input="SourceAlpha"/>
              <feGaussianBlur stdDeviation="15" result="blur-2"/>
              <feFlood flood-color="#00f0ff" flood-opacity="0.902" result="color"/>
              <feComposite operator="out" in="SourceGraphic" in2="blur-2"/>
              <feComposite operator="in" in="color"/>
              <feComposite operator="in" in2="SourceGraphic"/>
            </filter>
            <filter id="指令裁决表" x="49" y="20" width="196" height="79" filterUnits="userSpaceOnUse">
              <feOffset dy="3" input="SourceAlpha"/>
              <feGaussianBlur stdDeviation="6" result="blur-3"/>
              <feFlood flood-color="#00c1cd"/>
              <feComposite operator="in" in2="blur-3"/>
              <feComposite in="SourceGraphic"/>
            </filter>
            <linearGradient id="linear-gradient" y1="0.5" x2="1" y2="0.5" gradientUnits="objectBoundingBox">
              <stop offset="0" stop-color="#00ddeb"/>
              <stop offset="1" stop-color="#007a82"/>
            </linearGradient>
            <image id="image" width="83" height="83"
                   xlink:href="data:image/png;base64,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"/>
          </defs>
          <g id="组_41" data-name="组 41" transform="translate(-227.295 -250)">
            <g id="组_6" data-name="组 6" transform="translate(-263.705)">
              <path id="路径_60" data-name="路径 60" d="M2974.924,1585.89H2866.262l-28.445,26.739v53.477"
                    transform="translate(-2323.563 -1332.89)" fill="none" stroke="#00f0ff" stroke-width="6"/>
              <path id="路径_61" data-name="路径 61"
                    d="M3104.151,2156.031l-17.942,12.691H2871.338l-32.821-31.509V1807.249l10.5,9.846v315.961l22.756,22.975Z"
                    transform="translate(-2323.454 -1298.397)" fill="rgba(0,82,87,0.8)" stroke="#00f0ff"
                    stroke-width="1" opacity="0.85"/>
              <path id="路径_62" data-name="路径 62" d="M3245.61,2133.229h131.417l31.29-31.639v-66.562"
                    transform="translate(-1472.316 -1262.903)" fill="none" stroke="#00f0ff" stroke-width="6"/>
              <path id="路径_63" data-name="路径 63"
                    d="M3218.417,1598.512l17.776-11.392h145.071l29.014,28.445v298.789l-9.408-8.079V1622.749l-25.583-24.237Z"
                    transform="translate(-1476.554 -1332.698)" fill="rgba(0,82,87,0.8)" stroke="#00f0ff"
                    stroke-width="1" opacity="0.74"/>
              <g data-type="innerShadowGroup">
                <g transform="matrix(1, 0, 0, 1, 491, 250)" filter="url(#路径_59)">
                  <path id="路径_59-3" data-name="路径 59"
                        d="M2874.209,1596.472l-24.463,23.894v51.2l-18.2,15.929v145.07l18.2,17.636v316.31l24.463,22.188H4223.653l24.463-22.187v-68.837l17.067-16.5V1919.609l-17.067-13.654v-285.59l-24.463-23.894Z"
                        transform="translate(-2815.54 -1581.24)" fill="rgba(12,33,34,0.9)" stroke="#00f0ff"
                        stroke-width="2"/>
                </g>
                <path id="路径_59-4" data-name="路径 59"
                      d="M2874.209,1596.472l-24.463,23.894v51.2l-18.2,15.929v145.07l18.2,17.636v316.31l24.463,22.188H4223.653l24.463-22.187v-68.837l17.067-16.5V1919.609l-17.067-13.654v-285.59l-24.463-23.894Z"
                      transform="translate(-2324.541 -1331.241)" fill="rgba(12,33,34,0.9)"/>
                <g transform="matrix(1, 0, 0, 1, 491, 250)" filter="url(#路径_59-2)">
                  <path id="路径_59-5" data-name="路径 59"
                        d="M2874.209,1596.472l-24.463,23.894v51.2l-18.2,15.929v145.07l18.2,17.636v316.31l24.463,22.188H4223.653l24.463-22.187v-68.837l17.067-16.5V1919.609l-17.067-13.654v-285.59l-24.463-23.894Z"
                        transform="translate(-2815.54 -1581.24)" fill="#fff"/>
                </g>
                <path id="路径_59-6" data-name="路径 59"
                      d="M2874.209,1596.472l-24.463,23.894v51.2l-18.2,15.929v145.07l18.2,17.636v316.31l24.463,22.188H4223.653l24.463-22.187v-68.837l17.067-16.5V1919.609l-17.067-13.654v-285.59l-24.463-23.894Z"
                      transform="translate(-2324.541 -1331.241)" fill="none" stroke="#00f0ff" stroke-width="2"/>
              </g>
            </g>
            <g v-if="showInfo.userType === 'admin'" transform="matrix(1, 0, 0, 1, 227.29, 250)" filter="url(#导演评分表)">
              <foreignObject x="67" y="50" width="200" height="40">
                <div xmlns="http://www.w3.org/1999/xhtml"
                     style="color: #fff; font-size: 32px;
                      font-weight: 700;">
                  导演评分表
                </div>
              </foreignObject>
            </g>
            <g v-else transform="matrix(1, 0, 0, 1, 227.29, 250)" filter="url(#指令裁决表)">
              <foreignObject x="67" y="50" width="200" height="40">
                <div xmlns="http://www.w3.org/1999/xhtml"
                     style="color: #fff; font-size: 32px;
                      font-weight: 700;">
                  指令裁决表
                </div>
              </foreignObject>
            </g>

            <g transform="translate(320 350)">
              <foreignObject width="100" height="40">
                <div xmlns="http://www.w3.org/1999/xhtml"
                     style="font-size: 30px;
                      font-weight: 700;
                      color: #00f0ff;">
                  回合
                </div>
              </foreignObject>
            </g>
            <g transform="translate(415 350)">
              <foreignObject width="100" height="40">
                <div xmlns="http://www.w3.org/1999/xhtml"
                     style="color: #00f0ff;
                     font-size: 30px;
                     font-weight: 700;">
                  阶段
                </div>
              </foreignObject>
            </g>
            <g transform="translate(595 350)">
              <foreignObject width="200" height="40">
                <div xmlns="http://www.w3.org/1999/xhtml"
                     style="color: #00f0ff;
                     font-size: 30px;
                     font-weight: 700;">
                  指挥员指令
                </div>
              </foreignObject>
            </g>
            <g transform="translate(860 350)">
              <foreignObject width="100" height="40">
                <div xmlns="http://www.w3.org/1999/xhtml"
                     style="color: #00f0ff;
                     font-size: 30px;
                     font-weight: 700;">
                  单位
                </div>
              </foreignObject>
            </g>

            <g transform="translate(1040 350)">
              <foreignObject width="200" height="40">
                <div xmlns="http://www.w3.org/1999/xhtml"
                     style="color: #00f0ff; font-size: 30px;
                     font-weight: 700;">
                  部队动作
                </div>
              </foreignObject>
            </g>
            <g transform="translate(1270 350)">
              <foreignObject width="200" height="40">
                <div xmlns="http://www.w3.org/1999/xhtml"
                     style="color: #00f0ff; font-size: 30px;
                     font-weight: 700;">
                  裁决结果
                </div>
              </foreignObject>
            </g>
            <g transform="translate(1440 350)">
              <foreignObject width="200" height="40">
                <div xmlns="http://www.w3.org/1999/xhtml"
                     style="color: #00f0ff; font-size: 30px;
                     font-weight: 700;">
                  裁决得分
                </div>
              </foreignObject>
            </g>

            <path data-name="路径 64"
                  d="M646.5,398.471s264.974-1.087,706.448-1.087,615.232,1.087,615.232,1.087-110.9,3.318-615.232,3.318S646.5,398.471,646.5,398.471Z"
                  transform="translate(-360.209 7.095)" fill="#00f0ff"/>

            <foreignObject x="300" y="420" width="1300" height="335">
              <div xmlns="http://www.w3.org/1999/xhtml" style="height: 100%; overflow-y: auto; font-size: 21px">
                <div v-for="(value, key) in recordMap" :key="key + 'map'">
                  <div v-for="(item, index) in value" :key="index" style="width: 100%">
                    <table style="width: 100% ;background-color: transparent">
                      <tr v-for="(eitem, eindex) in item.historyVoList" :key="eindex">
                        <td v-if="eindex === 0" :rowspan="item.historyVoList.length" align="center"
                            style="width: 6% ; background-color: transparent ;color: white;">第{{ key }}回合
                        </td>
                        <td v-if="eindex === 0" :rowspan="item.historyVoList.length" align="center"
                            style="width: 11% ; background-color: transparent ;color: white">
                          {{ item.roundPeriod | roundPeriodFormatter }}
                        </td>
                        <td v-if="eindex === 0" :rowspan="item.historyVoList.length" align="center"
                            style="width: 10% ; background-color: transparent ;color: white">
                          <uv-image @click="imageClick(item.coverUrl)" :src="item.coverUrl"></uv-image>
                        </td>
                        <td align="center" style="color: white ;width: 10%">{{ eitem.chessPiecesNumber }}</td>
                        <td align="center" style="color: white ;width: 24%">{{ eitem.actionDesc }}</td>
                        <td v-if="showInfo.type === 'record' || showInfo.userType === 'admin'" align="center"
                            style="width: 10% ;color: white ">{{ eitem.attackResult }}
                        </td>
                        <td v-else-if="showInfo.type === 'judge'" style="text-align:left; padding: 0;" >
                          <button @click="judgeOneByOne(eitem, key, index, eindex)" :disabled="eitem.status === 2" style="width: 120px;white-space: nowrap;margin: 0;">
                            {{ eitem.status !== 2 ? '裁决' : '已裁决' }}
                          </button>
                        </td>
                        <td v-if="showInfo.type === 'record'" align="center" class="col6" style="color: white">
                          {{ eitem.attackScore }}
                        </td>
                        <td v-if="showInfo.userType === 'admin' && eitem.attackScore" align="center" class="col6"
                            style="color: white">
                          <button @click="judgeOneByOne(eitem, key, index, eindex)">{{ eitem.attackScore }}</button>
                        </td>
                        <td v-else-if="showInfo.userType === 'admin' && !eitem.attackScore" align="center" class="col6"
                            style="color: white">
                          <button @click="judgeOneByOne(eitem, key, index, eindex)">打分</button>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </foreignObject>

            <g v-if="Object.keys(recordMap).length === 0 && showInfo.userType === 'judge'" transform="translate(1200 759)">
              <foreignObject width="320" height="52">
                <div xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%;">
                  <button
                      @click="stepJudge"
                      style="width: 100%;
                      height: 100%; font-size: 24px;
                      font-weight: 700; color: #fff;
                      background: #afafaf;
                      border: none; cursor: pointer;
                      display: flex; justify-content: center; align-items: center;">
                    跳过
                  </button>
                </div>
              </foreignObject>
            </g>

<!--            translate(605 759)-->
            <g :transform="Object.keys(recordMap).length !== 0? 'translate(785, 759)' : 'translate(785, 759)'">
              <foreignObject width="320" height="52">
                <div xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%;">
                  <button
                      @click="close"
                      style="width: 100%;
                      height: 100%; font-size: 24px;
                      font-weight: 700; color: #fff;
                      background: linear-gradient(to right, #00ddeb, #007a82);
                      border: 2px solid #00f0ff; cursor: pointer;
                      display: flex; justify-content: center; align-items: center;">
                    关闭
                  </button>
                </div>
              </foreignObject>
            </g>


            <line id="直线_10" data-name="直线 10" y2="441" transform="translate(1637.702 296.616)" fill="none"
                  stroke="#00f0ff" stroke-linecap="round" stroke-width="6"/>
          </g>
        </svg>
      </view>


    </uni-popup>

    <uni-popup ref="judge_" :mask-click="false">
      <view style="width: 1000px;" class="rule__view">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="886.844" height="626.46" viewBox="0 0 886.844 626.46">
          <defs>
<!--            <filter id="请输入裁决结果" x="49" y="38.521" width="260" height="79" filterUnits="userSpaceOnUse">-->
<!--              <feOffset dy="3" input="SourceAlpha"/>-->
<!--              <feGaussianBlur stdDeviation="6" result="blur-3"/>-->
<!--              <feFlood flood-color="#00c1cd"/>-->
<!--              <feComposite operator="in" in2="blur-3"/>-->
<!--              <feComposite in="SourceGraphic"/>-->
<!--            </filter>-->
            <linearGradient id="linear-gradient" y1="0.5" x2="1" y2="0.5" gradientUnits="objectBoundingBox">
              <stop offset="0" stop-color="#00ddeb"/>
              <stop offset="1" stop-color="#007a82"/>
            </linearGradient>
          </defs>
          <g id="组_44" data-name="组 44" transform="translate(-516.578 -252)">
            <g id="组_7" data-name="组 7" transform="translate(25.578 2)">
              <path d="M2974.924,1585.89H2866.262l-28.445,26.739v53.477" transform="translate(-2323.563 -1332.89)" fill="none" stroke="#00f0ff" stroke-width="6"/>
              <path d="M3104.151,2156.031l-17.942,12.691H2871.338l-32.821-31.509V1807.249l10.5,9.846v315.961l22.756,22.975Z" transform="translate(-2323.454 -1298.397)" fill="rgba(0,82,87,0.8)" stroke="#00f0ff" stroke-width="1" opacity="0.85"/>
              <path d="M3245.61,2133.229h131.417l31.29-31.639v-66.562" transform="translate(-2051.02 -1262.903)" fill="none" stroke="#00f0ff" stroke-width="6"/>
              <path d="M3218.417,1598.512l17.776-11.392h145.071l29.014,28.445v298.789l-9.408-8.079V1622.749l-25.583-24.237Z" transform="translate(-2055.257 -1332.698)" fill="rgba(0,82,87,0.8)" stroke="#00f0ff" stroke-width="1" opacity="0.74"/>
              <g data-type="innerShadowGroup">
                <g transform="matrix(1, 0, 0, 1, 491, 250)" filter="url(#路径_59)">
                  <path id="路径_59-3" data-name="路径 59" d="M2874.209,1596.472l-24.463,23.894v51.2l-18.2,15.929v145.07l18.2,17.636v316.31l24.463,22.188h770.646l24.463-22.188v-68.837l17.067-16.5V1919.609l-17.067-13.654v-285.59l-24.463-23.894Z" transform="translate(-2815.54 -1581.24)" fill="rgba(12,33,34,0.9)" stroke="#00f0ff" stroke-width="2"/>
                </g>
                <path id="路径_59-4" data-name="路径 59" d="M2874.209,1596.472l-24.463,23.894v51.2l-18.2,15.929v145.07l18.2,17.636v316.31l24.463,22.188h770.646l24.463-22.188v-68.837l17.067-16.5V1919.609l-17.067-13.654v-285.59l-24.463-23.894Z" transform="translate(-2324.541 -1331.241)" fill="rgba(12,33,34,0.9)"/>
                <g transform="matrix(1, 0, 0, 1, 491, 250)" filter="url(#路径_59-2)">
                  <path id="路径_59-5" data-name="路径 59" d="M2874.209,1596.472l-24.463,23.894v51.2l-18.2,15.929v145.07l18.2,17.636v316.31l24.463,22.188h770.646l24.463-22.188v-68.837l17.067-16.5V1919.609l-17.067-13.654v-285.59l-24.463-23.894Z" transform="translate(-2815.54 -1581.24)" fill="#fff"/>
                </g>
                <path id="路径_59-6" data-name="路径 59" d="M2874.209,1596.472l-24.463,23.894v51.2l-18.2,15.929v145.07l18.2,17.636v316.31l24.463,22.188h770.646l24.463-22.188v-68.837l17.067-16.5V1919.609l-17.067-13.654v-285.59l-24.463-23.894Z" transform="translate(-2324.541 -1331.241)" fill="none" stroke="#00f0ff" stroke-width="2"/>
              </g>
            </g>
            <g transform="matrix(1, 0, 0, 1, 516.58, 252)">
              <foreignObject x="67" y="50" width="250" height="40">
                <div xmlns="http://www.w3.org/1999/xhtml" style="color: #fff; font-size: 32px; font-weight: bold; text-shadow: 0 0 1px #00f0ff, 0 0 1px #00f0ff, 0 0 3px #00f0ff, 0 0 3px #00f0ff;">
                  请输入裁决结果
                </div>
              </foreignObject>
            </g>
            <g transform="matrix(1, 0, 0, 1, 516.58, 252)">
              <foreignObject x="67" y="110" width=740px height="50">
                <div xmlns="http://www.w3.org/1999/xhtml" style="color: #00f0ff; font-size: 20px; height: 100%; white-space: nowrap; font-weight: bold;">
                  部队行动： {{ actionInfo.actionDesc }}
                </div>
              </foreignObject>
              <foreignObject x="67" y="170" width="740" height="500">
                <div xmlns="http://www.w3.org/1999/xhtml">
                  <div style ="height: 200px; text-align: center; color: transparent; width: 99%; word-wrap: break-word;">
                    <input v-if="showInfo.userType !== 'admin'" type="text" v-model="judge_result"
                           placeholder="请输入裁决内容" style="width: 100%; height: 270px; background-color: transparent; color: white; font-size: 20px; font-weight: bold; border: none" placeholder-style="color: white; opacity:0.3;"/>
                    <input v-if="showInfo.userType === 'admin'" type="number" v-model="judge_score"
                           placeholder="请输入裁决得分" style="width: 100%; height: 270px; background-color: transparent; color: white; font-size: 20px; font-weight: bold; border: none" placeholder-style="color: white; opacity:0.3;"/>
                  </div>
                </div>
              </foreignObject>
            </g>

            <foreignObject x="858" y="684" width="300" height="40">
              <body xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: center;">
              <button @click="openNewWindow" style="display: flex; align-items: center; width: 100%; height: 100%; background: none; border: none; color: #fff; font-size: 20px; font-weight: bold; cursor: pointer;">
                <img src="@/static/image/v_logo.png" alt="Guide" style="width: 40px; height: 40px; margin-right: 10px;" />
                打开裁决规则表
              </button>
              </body>
            </foreignObject>

            <path id="路径_65" data-name="路径 65" d="M646.5,398.107s153.393-.724,408.961-.724,356.156.724,356.156.724-64.2,2.209-356.156,2.209S646.5,398.107,646.5,398.107Z" transform="translate(-70.926 9.831)" fill="#00f0ff"/>
            <foreignObject x="617.578" y="761" width="320" height="52">
              <body xmlns="http://www.w3.org/1999/xhtml">
              <button class="custom-button" @click="Judge">确认裁决</button>
              </body>
            </foreignObject>

            <foreignObject x="999.578" y="761" width="320" height="52">
              <body xmlns="http://www.w3.org/1999/xhtml">
              <button class="custom-button" @click="closeJudge">关闭</button>
              </body>
            </foreignObject>
          </g>
        </svg>
<!--        <uni-table border>-->
<!--          <uni-tr class="rowTitle">-->
<!--            <uni-td align="center" class="color-light-blue">部队行动： {{ actionInfo.actionDesc }}</uni-td>-->
<!--          </uni-tr>-->
<!--          <uni-tr class="rowTitle" style="height: 200px">-->
<!--            <uni-td align="center" class="color-white" style="width: 120px; word-wrap: break-word">-->
<!--              <input v-if="showInfo.userType !== 'admin'" type="text" v-model="judge_result"-->
<!--                     placeholder="请输入裁决内容" style="width: 100%; height: 200px"/>-->
<!--              <input v-if="showInfo.userType === 'admin'" type="number" v-model="judge_score"-->
<!--                     placeholder="请输入裁决得分" style="width: 100%; height: 200px;"/>-->
<!--            </uni-td>-->
<!--          </uni-tr>-->
<!--        </uni-table>-->
<!--        <button @click="openNewWindow">打开裁决规则表</button>-->
<!--        <view class="foot">-->
<!--          <view style="flex: 1" class="color-blue" @click="Judge">确认裁决</view>-->
<!--          <view style="flex: 1" @click="closeJudge" class="color-red">关闭</view>-->

<!--        </view>-->
      </view>
    </uni-popup>


    <uni-popup ref="judge_final" :mask-click="false">
      <view style="width: 1000px;" class="rule__view">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="886.844" height="626.46" viewBox="0 0 886.844 626.46">
          <defs>
            <!--            <filter id="请输入裁决结果" x="49" y="38.521" width="260" height="79" filterUnits="userSpaceOnUse">-->
            <!--              <feOffset dy="3" input="SourceAlpha"/>-->
            <!--              <feGaussianBlur stdDeviation="6" result="blur-3"/>-->
            <!--              <feFlood flood-color="#00c1cd"/>-->
            <!--              <feComposite operator="in" in2="blur-3"/>-->
            <!--              <feComposite in="SourceGraphic"/>-->
            <!--            </filter>-->
            <linearGradient id="linear-gradient" y1="0.5" x2="1" y2="0.5" gradientUnits="objectBoundingBox">
              <stop offset="0" stop-color="#00ddeb"/>
              <stop offset="1" stop-color="#007a82"/>
            </linearGradient>
          </defs>
          <g id="组_44" data-name="组 44" transform="translate(-516.578 -252)">
            <g id="组_7" data-name="组 7" transform="translate(25.578 2)">
              <path d="M2974.924,1585.89H2866.262l-28.445,26.739v53.477" transform="translate(-2323.563 -1332.89)" fill="none" stroke="#00f0ff" stroke-width="6"/>
              <path d="M3104.151,2156.031l-17.942,12.691H2871.338l-32.821-31.509V1807.249l10.5,9.846v315.961l22.756,22.975Z" transform="translate(-2323.454 -1298.397)" fill="rgba(0,82,87,0.8)" stroke="#00f0ff" stroke-width="1" opacity="0.85"/>
              <path d="M3245.61,2133.229h131.417l31.29-31.639v-66.562" transform="translate(-2051.02 -1262.903)" fill="none" stroke="#00f0ff" stroke-width="6"/>
              <path d="M3218.417,1598.512l17.776-11.392h145.071l29.014,28.445v298.789l-9.408-8.079V1622.749l-25.583-24.237Z" transform="translate(-2055.257 -1332.698)" fill="rgba(0,82,87,0.8)" stroke="#00f0ff" stroke-width="1" opacity="0.74"/>
              <g data-type="innerShadowGroup">
                <g transform="matrix(1, 0, 0, 1, 491, 250)" filter="url(#路径_59)">
                  <path id="路径_59-3" data-name="路径 59" d="M2874.209,1596.472l-24.463,23.894v51.2l-18.2,15.929v145.07l18.2,17.636v316.31l24.463,22.188h770.646l24.463-22.188v-68.837l17.067-16.5V1919.609l-17.067-13.654v-285.59l-24.463-23.894Z" transform="translate(-2815.54 -1581.24)" fill="rgba(12,33,34,0.9)" stroke="#00f0ff" stroke-width="2"/>
                </g>
                <path id="路径_59-4" data-name="路径 59" d="M2874.209,1596.472l-24.463,23.894v51.2l-18.2,15.929v145.07l18.2,17.636v316.31l24.463,22.188h770.646l24.463-22.188v-68.837l17.067-16.5V1919.609l-17.067-13.654v-285.59l-24.463-23.894Z" transform="translate(-2324.541 -1331.241)" fill="rgba(12,33,34,0.9)"/>
                <g transform="matrix(1, 0, 0, 1, 491, 250)" filter="url(#路径_59-2)">
                  <path id="路径_59-5" data-name="路径 59" d="M2874.209,1596.472l-24.463,23.894v51.2l-18.2,15.929v145.07l18.2,17.636v316.31l24.463,22.188h770.646l24.463-22.188v-68.837l17.067-16.5V1919.609l-17.067-13.654v-285.59l-24.463-23.894Z" transform="translate(-2815.54 -1581.24)" fill="#fff"/>
                </g>
                <path id="路径_59-6" data-name="路径 59" d="M2874.209,1596.472l-24.463,23.894v51.2l-18.2,15.929v145.07l18.2,17.636v316.31l24.463,22.188h770.646l24.463-22.188v-68.837l17.067-16.5V1919.609l-17.067-13.654v-285.59l-24.463-23.894Z" transform="translate(-2324.541 -1331.241)" fill="none" stroke="#00f0ff" stroke-width="2"/>
              </g>
            </g>
            <g transform="matrix(1, 0, 0, 1, 516.58, 252)">
              <foreignObject x="67" y="50" width="250" height="40">
                <div xmlns="http://www.w3.org/1999/xhtml" style="color: #fff; font-size: 32px; font-weight: bold; text-shadow: 0 0 1px #00f0ff, 0 0 1px #00f0ff, 0 0 3px #00f0ff, 0 0 3px #00f0ff;">
                  请输入评分结果
                </div>
              </foreignObject>
            </g>
            <g transform="matrix(1, 0, 0, 1, 516.58, 252)">
              <foreignObject x="67" y="110" width=740px height="50">
                <div xmlns="http://www.w3.org/1999/xhtml" style="color: #00f0ff; font-size: 20px; height: 100%; white-space: nowrap; font-weight: bold;">
                  部队行动： {{ actionInfo.actionDesc }}
                </div>
              </foreignObject>
              <foreignObject x="67" y="170" width="740" height="500">
                <div xmlns="http://www.w3.org/1999/xhtml">
                  <div style ="height: 200px; text-align: center; color: transparent; width: 99%; word-wrap: break-word;">
                    <input v-if="showInfo.userType !== 'admin'" type="text" v-model="judge_result"
                           placeholder="请输入裁决内容" style="width: 100%; height: 270px; background-color: transparent; color: white; font-size: 20px; font-weight: bold; border: none" placeholder-style="color: white; opacity:0.3;"/>
                    <input v-if="showInfo.userType === 'admin'" type="number" v-model="judge_score"
                           placeholder="请输入评分" style="width: 100%; height: 270px; background-color: transparent; color: white; font-size: 20px; font-weight: bold; border: none" placeholder-style="color: white; opacity:0.3;"/>
                  </div>
                </div>
              </foreignObject>
            </g>

            <foreignObject x="858" y="684" width="300" height="40">
              <body xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: center;">
              <button @click="openNewWindow_v2" style="display: flex; align-items: center; width: 100%; height: 100%; background: none; border: none; color: #fff; font-size: 20px; font-weight: bold; cursor: pointer;">
                <img src="@/static/image/v_logo.png" alt="Guide" style="width: 40px; height: 40px; margin-right: 10px;" />
                想定得分计算表
              </button>
              </body>
            </foreignObject>

            <path id="路径_65" data-name="路径 65" d="M646.5,398.107s153.393-.724,408.961-.724,356.156.724,356.156.724-64.2,2.209-356.156,2.209S646.5,398.107,646.5,398.107Z" transform="translate(-70.926 9.831)" fill="#00f0ff"/>
            <foreignObject x="617.578" y="761" width="320" height="52">
              <body xmlns="http://www.w3.org/1999/xhtml">
              <button class="custom-button" @click="Judge">确认评分</button>
              </body>
            </foreignObject>

            <foreignObject x="999.578" y="761" width="320" height="52">
              <body xmlns="http://www.w3.org/1999/xhtml">
              <button class="custom-button" @click="closeJudge">关闭</button>
              </body>
            </foreignObject>
          </g>
        </svg>

<!--        <view class="title">请输入评分结果</view>-->
<!--        <uni-table border>-->
<!--          <uni-tr class="rowTitle">-->
<!--      n="center" class="color-li      <uni-td aligght-blue">部队行动： {{ actionInfo.actionDesc }}</uni-td>-->
<!--          </uni-tr>-->
<!--          <uni-tr class="rowTitle" style="height: 200px">-->
<!--            <uni-td align="center" class="color-white" style="width: 120px; word-wrap: break-word">-->
<!--              <input v-if="showInfo.userType !== 'admin'" type="text" v-model="judge_result"-->
<!--                     placeholder="请输入裁决内容" style="width: 100%; height: 200px"/>-->
<!--              <input v-if="showInfo.userType === 'admin'" type="number" v-model="judge_score"-->
<!--                     placeholder="请输入裁决得分" style="width: 100%; height: 200px;"/>-->
<!--            </uni-td>-->
<!--          </uni-tr>-->
<!--        </uni-table>-->
<!--        <button @click="openNewWindow_v2">想定得分统计表</button>-->
<!--        <view class="foot">-->
<!--          <view style="flex: 1" class="color-blue" @click="Judge">确认裁决</view>-->
<!--          <view style="flex: 1" @click="closeJudge" class="color-red">关闭</view>-->

<!--        </view>-->
      </view>
    </uni-popup>


    <view v-if="showToast" class="custom-toast">
      {{ toastMessage }}
    </view>

    <judge-fire-attack-table
        ref="judgeFireAttackTable"
        :actionInfo="actionInfo"
        @confirmJudge="confirmJudge"
    ></judge-fire-attack-table>
    <judge-action-table
        ref="judgeActionTable"
        :actionInfo="actionInfo"
        @confirmJudge="confirmJudge"
    ></judge-action-table>
    <judge-investigate-table
        ref="judgeInvestigateTable"
        :actionInfo="actionInfo"
        @confirmJudge="confirmJudge"
    ></judge-investigate-table>
    <judge-communication-table
        ref="judgeCommunicationTable"
        :actionInfo="actionInfo"
        @confirmJudge="confirmJudge"
    ></judge-communication-table>
    <judge-reactance-table
        ref="judgeReactanceTable"
        :actionInfo="actionInfo"
        @confirmJudge="confirmJudge"
    ></judge-reactance-table>
    <judge-command-control-table
        ref="judgeCommandControlTable"
        :actionInfo="actionInfo"
        @confirmJudge="confirmJudge"
    ></judge-command-control-table>
  </view>
</template>

<script>
import {baseURL, getUserTokenStorage} from '@/api/http.js';
import {saveRoundCover, getHistoryTreeByRound, confirmJudge} from '@/api/verdictRecord.js';

export default {
  name: 'judge-table',
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
          campId: undefined
        };
      }
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
    buttonWidth() {
      const hasSaveBtn = this.showInfo.type === 'input';
      const hasSkipBtn = Object.keys(this.recordMap).length === 0 && this.showInfo.userType === 'judge' && this.showInfo.type !== 'input';
      const hasCloseBtn = true; // Close button is always present

      const buttonCount = [hasSaveBtn, hasSkipBtn, hasCloseBtn].filter(Boolean).length;
      return buttonCount > 1 ? '50%' : '100%';
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
      judge_score: '',

      toastMessage: '',
      showToast: false,
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
    showCustomToast(message) {
      this.toastMessage = message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 1500); // Toast 显示 1.5 秒
    },

    openNewWindow_v2() {
      window.open(
          '/#/pages/tables/index_v2',
          '裁决表窗口',
          'height=600,width=1000,top=300,left=200,toolbar=no,menubar=no, scrollbars=no,resizable=no,location=no, status=no'
      )
      // 监听来自新窗口的消息
      window.addEventListener('message', this.handleMessage);
    },

    openNewWindow() {
      window.open(
          '/#/pages/tables/index',
          '裁决表窗口',
          'height=600,width=1000,top=300,left=200,toolbar=no,menubar=no, scrollbars=no,resizable=no,location=no, status=no'
      )
      // 监听来自新窗口的消息
      window.addEventListener('message', this.handleMessage);
    },
    handleMessage(event) {
      // 确保消息来自正确的窗口
      if (event.origin !== window.location.origin) return;

      // 获取数据
      const data = event.data;
      console.log('从新窗口接收到数据:', data);
      if (data) {
        this.judge_result += data.message
      }

    },
    Judge() {
      if (this.judge_result === '' && this.showInfo.userType !== 'admin') {
        this.showCustomToast("请输入裁决结果")
        // alert('请补全内容')
        return;
      }

      if (this.judge_score === '' && this.showInfo.userType === 'admin') {
        this.showCustomToast("请输入裁决得分")
        return;
      }

      if (this.showInfo.userType === 'admin') {
        this.actionInfo.attackScore = this.judge_score;
      } else {
        this.actionInfo.attackResult = this.judge_result;
      }
      confirmJudge(this.actionInfo).then((res) => {
        if (res.data.code === 200) {
          this.showCustomToast("提交成功")
          this.confirmJudge(res.data.data)

          this.judge_result = ''
          this.judge_score = ''

          setTimeout(() => {
            this.$refs.judge_.close();
            this.$refs.judge_final.close();
            this.close();
          }, 1000);
        } else {
          uni.showToast({
            title: res.data.msg,
            icon: 'none'
          });
        }
      });
    },
    checkRule() {

    },
    stepJudge() {
      this.$refs.popup.close();
      this.$emit('stepJudge');
    },
    judgeOneByOne(eitem, key, index, eindex) {
      this.key = key;
      this.index = index;
      this.eindex = eindex;
      this.actionInfo = eitem;
      if (this.showInfo.userType === 'admin') {
        this.$refs.judge_final.open();
      } else {
        this.$refs.judge_.open();
      }
    },
    open() {
      this.$refs.popup.open();
      // this.sign();
    },
    close() {
      this.$refs.popup.close();
    },
    closeJudge() {
      if (this.showInfo.userType === 'admin') {
        this.$refs.judge_final.close();
      } else {
        this.$refs.judge_.close();
      }
      this.judge_result = '';
      this.judge_score = '';
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
        item.historyVoList = item.historyVoList.filter((eitem) => eitem.actionDesc);
        return item.historyVoList.length > 0;
      });
      if (resArray.length === 0) {
        console.log('resArray is empty');
        // 这里可以处理resArray为空的情况
        // 由于resArray为空，this.recordMap也将为空，所以可以直接判断this.recordMap
        this.recordMap = {}; // 初始化为空对象，因为没有数据可以分组
      } else {
        this.recordMap = this.groupBy(resArray, 'chessRound');
        console.log('this.recordMap: ', this.recordMap);
      }
      if (this.recordMap[0]) {
        console.log('第 0 回合数据: ', this.recordMap[0]);
      } else {
        console.log('第 0 回合数据不存在');
      }

    },
    getMapIndexByKey(key) {
      // 依次获取map对象值
      let index = 0;
      for (var k in this.recordMap) {
        if (k === key) {
          return index;
        }
        index++;
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
      let urlList = [];
      this.fileList.map((item) => {
        urlList.push(item.url);
      });
    },
    async afterRead(event) {
      // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式afterRead
      let lists = [].concat(event.file);
      console.log('lists',lists);
      let fileListLen = this.fileList.length;
      console.log('fileListLen',fileListLen);
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
      let urlList = [];
      this.fileList.map((item) => {
        urlList.push(item.url);
      });
      console.log('this.fileList: ', this.fileList);
    },
    uploadFilePromise(avatarUrl) {
      let that = this;
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
          }
        });
      });
    },
    async submitInstruct() {
      if (this.fileList.length === 0) {
        return uni.showToast({
          title: '请上传指令图片',
          icon: 'none',
          duration: 2500
        });
      }
      this.showInfo.coverUrl = this.fileList[0].url;
      let res = await saveRoundCover(this.showInfo);
      if (res.data.code === 200) {
        uni.showToast({
          title: '保存成功',
          icon: 'none',
          duration: 2500
        });
        this.fileList = [];
        this.$refs.popup.close();
      } else {
        uni.showToast({
          title: '保存失败',
          icon: 'none',
          duration: 2500
        });
      }
    },
    confirmJudge(notJudgeNumber) {
      this.recordMap[this.key][this.index].historyVoList[this.eindex].status = 2;
      console.log('裁决完毕')
      this.$emit('judgeComplete');
      // if (notJudgeNumber === 0) {
      // 	//所有记录裁决完毕
      // 	this.$emit('judgeComplete');
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
@import url('@/common/css/judge-table.scss');
.custom-button {
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #00ddeb, #007a82);
  border: 2px solid #00f0ff;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-button:hover {
  background: linear-gradient(to right, #007a82, #00ddeb);
}



.rule__view {
  min-width: 300rpx;

  .title {
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-weight: bolder;
    background-color: #1cade4;
    font-size: $uni-font-size-title;
    color: $uni-text-color-inverse;
  }

  .foot {
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-weight: bolder;
    font-size: $uni-font-size-title;
    color: $uni-text-color-inverse;
    display: flex;
    justify-content: space-between; /* 确保按钮之间有足够的空间 */
    width: 100%;

    .save-btn, .skip-btn, .close-btn {
      width: v-bind(buttonWidth); /* 使用计算属性 */
    }

    .save-btn, .skip-btn, .close-btn {
      height: 20px;
      line-height: 20px;
      padding: 10px 20px; /* Padding */
      border-radius: 5px; /* Border radius */
      cursor: pointer; /* Pointer cursor */
      transition: background-color 0.3s ease; /* Transition effect */
      margin: auto; /* Center button */
      text-align: center; /* Center text */
    }

    .save-btn {
      background-color: #4caf50; /* Background color */
      color: #ffffff; /* Text color */
    }

    .save-btn:hover {
      background-color: #45a049; /* Hover background color */
    }

    .skip-btn {
      background-color: #1cade4; /* Background color */
      color: #ffffff; /* Text color */
      white-space: nowrap; /* 防止文字换行 */
    }

    .skip-btn:hover {
      background-color: #1b9cd4; /* Hover background color */
    }

    .close-btn {
      background-color: #ea9d00; /* Background color */
      color: #ffffff; /* Text color */
    }

    .close-btn:hover {
      background-color: #d88a00; /* Hover background color */
    }
  }

  td {
    color: black;
  }

  .rowTitle {
    color: #ffffff;
    background-color: #1cade4;
  }

  .row:nth-child(odd) {
    background-color: #cce3f5;
  }

  .row:nth-child(even) {
    background-color: #e7f1fa;
  }

  .col1 {
    color: #ffffff;
    background-color: #1cade4;
  }
}

.line {
  position: fixed;
  height: 2px;
  background-color: rgba(255, 0, 0, 0.2);
  animation: stretch-line 1s ease-in-out forwards;
  animation-delay: 1s;
}

@keyframes stretch-line {
  0% {
    width: 0;
  }
  100% {
    width: 75vw; /* 指定直线长度 */
  }
}

.v-line {
  position: fixed;
  width: 2px;
  background-color: rgba(255, 0, 0, 0.2);
  animation: stretch-v-line 1s ease-in-out forwards;
  visibility: hidden;
  animation-delay: 1s;
}

@keyframes stretch-v-line {
  0% {
    height: 0;
  }
  100% {
    height: 70vh; /* 指定直线长度 */
  }
}

.circle {
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 1px red solid;
  visibility: hidden;
}

table td {
  vertical-align: middle !important;
}

.recordTable {
  height: 40vh;
  overflow-y: scroll;
}

.col1 {
  width: 120px;
  background-color: transparent;
}

.col2 {
  width: 150px;
}

.col3 {
  width: 120px;
}

.col4 {
  width: 80px;
}

.col5 {
  width: 300px;
}

.col6 {
  width: 120px;
}

.custom-toast {
  position: fixed;
  top: 50%; /* 你可以根据需要调整位置 */
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  z-index: 10000; /* 保证在 popup 之上 */
}

.cls-17,
.cls-2,
.cls-24,
.cls-3,
.cls-42,
.cls-43,
.cls-6,
.cls-7 {
  fill: rgba(0, 82, 87, 0.8);
}

.cls-17,
.cls-18,
.cls-2,
.cls-41,
.cls-42,
.cls-43,
.cls-44,
.cls-5,
.cls-52,
.cls-6,
.cls-9 {
  stroke: #00f0ff;
}

.cls-2,
.cls-44,
.cls-5,
.cls-52 {
  stroke-width: 2px;
}

.cls-12,
.cls-15,
.cls-21,
.cls-31,
.cls-39,
.cls-4,
.cls-46,
.cls-48,
.cls-54,
.cls-8 {
  fill: #fff;
}

.cls-18,
.cls-25,
.cls-28,
.cls-32,
.cls-38,
.cls-41,
.cls-5,
.cls-51,
.cls-59,
.cls-9 {
  fill: none;
}

.cls-6,
.cls-7,
.cls-8,
.cls-9 {
  opacity: 0.9;
}

.cls-10 {
  fill: #a7faff;
  font-size: 40px;
}

.cls-10,
.cls-15,
.cls-22,
.cls-35,
.cls-39,
.cls-46,
.cls-47,
.cls-54 {
  font-family: YuGothicUI-Bold, Yu Gothic UI;
}

.cls-10,
.cls-15,
.cls-22,
.cls-23,
.cls-35,
.cls-39,
.cls-46,
.cls-47,
.cls-54 {
  font-weight: 700;
}

.cls-11,
.cls-21,
.cls-49 {
  font-family: MicrosoftJhengHeiUIBold, Microsoft JhengHei UI;
}

.cls-11 {
  font-weight: 400;
}

.cls-12 {
  font-size: 20px;
}

.cls-12,
.cls-48 {
  font-family: YuGothicUI-Regular, Yu Gothic UI;
}

.cls-13 {
  font-family: MicrosoftJhengHeiUIRegular, Microsoft JhengHei UI;
}

.cls-14 {
  font-family: SegoeUI, Segoe UI;
}

.cls-15,
.cls-21,
.cls-47,
.cls-49 {
  font-size: 28px;
}

.cls-16,
.cls-23 {
  font-family: SegoeUI-Bold, Segoe UI;
}

.cls-19 {
  fill: url(#linear-gradient);
}

.cls-20 {
  fill: url(#linear-gradient-2);
}

.cls-26,
.cls-27 {
  fill: rgba(255, 255, 255, 0.5);
}

.cls-26,
.cls-28 {
  stroke: #fff;
}

.cls-29,
.cls-30 {
  fill: rgba(0, 50, 53, 0.1);
}

.cls-29,
.cls-30,
.cls-31,
.cls-32,
.cls-42 {
  opacity: 0.85;
}

.cls-33,
.cls-34 {
  fill: url(#linear-gradient-3);
}

.cls-35 {
  fill: #9c9c9c;
}

.cls-35,
.cls-39,
.cls-48 {
  font-size: 22px;
}

.cls-36 {
  fill: url(#linear-gradient-5);
}

.cls-37 {
  fill: url(#linear-gradient-7);
}

.cls-38 {
  stroke: #99f9ff;
  stroke-linecap: round;
}

.cls-40 {
  fill: #002b3d;
  opacity: 0;
}

.cls-41 {
  stroke-width: 6px;
}

.cls-43 {
  opacity: 0.74;
}

.cls-44,
.cls-45 {
  fill: rgba(12, 33, 34, 0.9);
}

.cls-46 {
  font-size: 32px;
}

.cls-47,
.cls-49,
.cls-50 {
  fill: #00f0ff;
}

.cls-51 {
  stroke: #005f65;
}

.cls-52 {
  fill: url(#linear-gradient-9);
}

.cls-53 {
  fill: #afafaf;
}

.cls-54 {
  font-size: 24px;
}

.cls-55,
.cls-56,
.cls-57,
.cls-58 {
  stroke: none;
}

.cls-56 {
  fill: #00f0ff;
}

.cls-57 {
  fill: #fb0;
}

.cls-58 {
  fill: rgba(0, 45, 48, 0.8);
}

.cls-60 {
  filter: url(#指令上传表);
}

.cls-61 {
  filter: url(#路径_59-2);
}

.cls-62 {
  filter: url(#路径_59);
}

.cls-63 {
  filter: url(#回合1);
}

.cls-64 {
  filter: url(#路径_46-2);
}

.cls-65 {
  filter: url(#路径_46);
}

.cls-66 {
  filter: url(#路径_45-2);
}

.cls-67 {
  filter: url(#路径_45);
}

.cls-68 {
  filter: url(#路径_44-2);
}

.cls-69 {
  filter: url(#路径_44);
}

.cls-70 {
  filter: url(#路径_42-2);
}

.cls-71 {
  filter: url(#路径_42);
}

.cls-72 {
  filter: url(#路径_41-2);
}

.cls-73 {
  filter: url(#路径_41);
}
</style>
