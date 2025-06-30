(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/wargame/index"],{

/***/ 134:
/*!***********************************************************************************!*\
  !*** D:/chess/code/new-wargame-uniapp/main.js?{"page":"pages%2Fwargame%2Findex"} ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/wargame/index.vue */ 135));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 135:
/*!****************************************************************!*\
  !*** D:/chess/code/new-wargame-uniapp/pages/wargame/index.vue ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_5c8a2998_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=5c8a2998&scoped=true& */ 136);
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ 139);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _index_vue_vue_type_style_index_0_id_5c8a2998_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&id=5c8a2998&lang=scss&scoped=true& */ 142);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 57);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_5c8a2998_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_5c8a2998_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5c8a2998",
  null,
  false,
  _index_vue_vue_type_template_id_5c8a2998_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/wargame/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 136:
/*!***********************************************************************************************************!*\
  !*** D:/chess/code/new-wargame-uniapp/pages/wargame/index.vue?vue&type=template&id=5c8a2998&scoped=true& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_5c8a2998_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=template&id=5c8a2998&scoped=true& */ 137);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_5c8a2998_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_5c8a2998_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_5c8a2998_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_5c8a2998_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 137:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/chess/code/new-wargame-uniapp/pages/wargame/index.vue?vue&type=template&id=5c8a2998&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uvText: function () {
      return Promise.all(/*! import() | uni_modules/uv-text/components/uv-text/uv-text */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uv-text/components/uv-text/uv-text")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uv-text/components/uv-text/uv-text.vue */ 295))
    },
    uvModal: function () {
      return Promise.all(/*! import() | uni_modules/uv-modal/components/uv-modal/uv-modal */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uv-modal/components/uv-modal/uv-modal")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uv-modal/components/uv-modal/uv-modal.vue */ 202))
    },
    uvImage: function () {
      return Promise.all(/*! import() | uni_modules/uv-image/components/uv-image/uv-image */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uv-image/components/uv-image/uv-image")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uv-image/components/uv-image/uv-image.vue */ 280))
    },
    xinyiSteps: function () {
      return __webpack_require__.e(/*! import() | uni_modules/xinyi-steps/components/xinyi-steps/xinyi-steps */ "uni_modules/xinyi-steps/components/xinyi-steps/xinyi-steps").then(__webpack_require__.bind(null, /*! @/uni_modules/xinyi-steps/components/xinyi-steps/xinyi-steps.vue */ 306))
    },
    uvAvatar: function () {
      return Promise.all(/*! import() | uni_modules/uv-avatar/components/uv-avatar/uv-avatar */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uv-avatar/components/uv-avatar/uv-avatar")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uv-avatar/components/uv-avatar/uv-avatar.vue */ 313))
    },
    uniDrawer: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-drawer/components/uni-drawer/uni-drawer */ "uni_modules/uni-drawer/components/uni-drawer/uni-drawer").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-drawer/components/uni-drawer/uni-drawer.vue */ 321))
    },
    uniCard: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-card/components/uni-card/uni-card */ "uni_modules/uni-card/components/uni-card/uni-card").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-card/components/uni-card/uni-card.vue */ 231))
    },
    uniTable: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-table/components/uni-table/uni-table */ "uni_modules/uni-table/components/uni-table/uni-table").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-table/components/uni-table/uni-table.vue */ 328))
    },
    uniTr: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-table/components/uni-tr/uni-tr */ "uni_modules/uni-table/components/uni-tr/uni-tr").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-table/components/uni-tr/uni-tr.vue */ 335))
    },
    uniTd: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-table/components/uni-td/uni-td */ "uni_modules/uni-table/components/uni-td/uni-td").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-table/components/uni-td/uni-td.vue */ 342))
    },
    finalSummary: function () {
      return __webpack_require__.e(/*! import() | uni_modules/final-summary/components/final-summary/final-summary */ "uni_modules/final-summary/components/final-summary/final-summary").then(__webpack_require__.bind(null, /*! @/uni_modules/final-summary/components/final-summary/final-summary.vue */ 349))
    },
    uniPopup: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-popup/components/uni-popup/uni-popup */ "uni_modules/uni-popup/components/uni-popup/uni-popup").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-popup/components/uni-popup/uni-popup.vue */ 251))
    },
    xinyiDice: function () {
      return Promise.all(/*! import() | uni_modules/xinyi-dice/components/xinyi-dice/xinyi-dice */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/xinyi-dice/components/xinyi-dice/xinyi-dice")]).then(__webpack_require__.bind(null, /*! @/uni_modules/xinyi-dice/components/xinyi-dice/xinyi-dice.vue */ 356))
    },
    ruleTable: function () {
      return __webpack_require__.e(/*! import() | uni_modules/rule-table/components/rule-table/rule-table */ "uni_modules/rule-table/components/rule-table/rule-table").then(__webpack_require__.bind(null, /*! @/uni_modules/rule-table/components/rule-table/rule-table.vue */ 363))
    },
    blowEffectTable: function () {
      return __webpack_require__.e(/*! import() | uni_modules/blow-effect-table/components/blow-effect-table/blow-effect-table */ "uni_modules/blow-effect-table/components/blow-effect-table/blow-effect-table").then(__webpack_require__.bind(null, /*! @/uni_modules/blow-effect-table/components/blow-effect-table/blow-effect-table.vue */ 370))
    },
    ruleResult: function () {
      return __webpack_require__.e(/*! import() | uni_modules/rule-result/components/rule-result/rule-result */ "uni_modules/rule-result/components/rule-result/rule-result").then(__webpack_require__.bind(null, /*! @/uni_modules/rule-result/components/rule-result/rule-result.vue */ 377))
    },
    scoreTable: function () {
      return __webpack_require__.e(/*! import() | uni_modules/score-table/components/score-table/score-table */ "uni_modules/score-table/components/score-table/score-table").then(__webpack_require__.bind(null, /*! @/uni_modules/score-table/components/score-table/score-table.vue */ 384))
    },
    scoreTableFinal: function () {
      return __webpack_require__.e(/*! import() | uni_modules/score-table-final/components/score-table-final/score-table-final */ "uni_modules/score-table-final/components/score-table-final/score-table-final").then(__webpack_require__.bind(null, /*! @/uni_modules/score-table-final/components/score-table-final/score-table-final.vue */ 391))
    },
    judgeTable: function () {
      return Promise.all(/*! import() | uni_modules/judge-table/components/judge-table/judge-table */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/judge-table/components/judge-table/judge-table")]).then(__webpack_require__.bind(null, /*! @/uni_modules/judge-table/components/judge-table/judge-table.vue */ 398))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var m0 = _vm.showChessButtonInfo.visible ? _vm.checkCanAttack() : null
  var m1 = __webpack_require__(/*! @/static/image/map.jpg */ 138)
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      return _vm.$refs.showActionDesc.open()
    }
    _vm.e1 = function ($event) {
      _vm.game.showSettlement = false
    }
    _vm.e2 = function ($event) {
      _vm.game.showSettlement = false
    }
    _vm.e3 = function ($event) {
      _vm.attackConfirm = false
    }
    _vm.e4 = function ($event) {
      _vm.moveConfirm = false
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
        m1: m1,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 139:
/*!*****************************************************************************************!*\
  !*** D:/chess/code/new-wargame-uniapp/pages/wargame/index.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=script&lang=js& */ 140);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 140:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/chess/code/new-wargame-uniapp/pages/wargame/index.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 31));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 33));
var _websocket = __webpack_require__(/*! @/api/websocket.js */ 30);
var _arbiterMap = __webpack_require__(/*! ../../api/arbiterMap.js */ 141);
__webpack_require__(/*! vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css */ 64);
var _verdictRecord = __webpack_require__(/*! ../../api/verdictRecord.js */ 115);
var _vue = __webpack_require__(/*! vue */ 25);
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var VueDraggableResizable = function VueDraggableResizable() {
  __webpack_require__.e(/*! require.ensure | node-modules/vue-draggable-resizable-gorkys/dist/VueDraggableResizable.umd.min */ "common/vendor").then((function () {
    return resolve(__webpack_require__(/*! vue-draggable-resizable-gorkys */ 168));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  components: {
    VueDraggableResizable: VueDraggableResizable
  },
  data: function data() {
    return {
      diceCount: 2,
      diceCountList: [{
        value: 1,
        text: '1'
      }, {
        value: 2,
        text: '2'
      }],
      game: {
        status: 0,
        chessRound: 1,
        nowRound: 0,
        baseRound: 0,
        userPiece: '',
        isDeplaoy: true,
        isOwn: false,
        isUser: false,
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
      map: {},
      attackConfirm: false,
      attackNumber: '',
      moveConfirm: false,
      verdictRecordId: '',
      campId: '',
      mapLongTmp: 1,
      mapWidthTmp: 1,
      boxWith: 66,
      mapLong: 1,
      mapWidth: 1,
      showOp: false,
      showDown: false,
      showSelPiece: false,
      selCellInfo: '',
      targetCellInfo: '',
      tmQuery: '',
      isMove: false,
      isAttack: false,
      mapList: [],
      user: {},
      roundOptions: [],
      stageOptions: [{
        title: '直瞄射击阶段'
      }, {
        title: '机动阶段'
      }, {
        title: '解除压制阶段'
      }, {
        title: '间瞄射击阶段'
      }],
      roundActive: 0,
      stageActive: 0,
      isAdmin: false,
      historyList: [],
      ruleArray: [],
      blowEffectList: [],
      verdictRule: {},
      diceValue: [],
      showScoreButtonInfo: {
        visible: false,
        top: 0,
        left: 0
      },
      showChessButtonInfo: {
        visible: false,
        top: 0,
        left: 0
      },
      campList: [],
      campListItem: {},
      isUser: false,
      scoreTableHistory: [],
      scoreList: [],
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
      summaryDataArray: [],
      finalData: [],
      finalScoreList: [],
      summaryScoreData: [],
      chessRoundLimit: 0,
      chartRound: 0,
      selectIndex: [],
      selectTargetIndex: [],
      roundStatusList: [],
      statusDesc: '',
      roundEnd: false,
      userStageNotSubmit: false,
      avatarText: '',
      statusIndex: 0,
      judgeTableShowInfo: {}
    };
  },
  onLoad: function onLoad(res) {
    var _this = this;
    // 注册websocket监听;
    this.onMessage();
    setTimeout(function () {
      _this.arrange();
    }, 5);
    this.user = uni.getStorageSync('user');
    this.verdictRecordId = res.verdictRecordId;
    this.campId = res.campId;
    this.isUser = res.isUser == 'true';
    this.queryAllFunc();
    this.queryMapInfoFunc();
    // this.initChessRound();
    setTimeout(function () {
      _this.queryUsChessPiecesInfoFunc();
    }, 2121);
  },
  computed: {
    cssVars: function cssVars() {
      return {
        '--mapTop': this.map.mapTop + 'px',
        '--mapLeft': this.map.mapLeft + 'px',
        '--mapWidth': this.map.mapWidth + 'px',
        '--mapHeight': this.map.mapHeight + 'px',
        '--marginTop': -this.map.mapRadius / 2 + 'px',
        '--cellWidth': Math.cos(2 * Math.PI / 360 * 30) * this.map.mapRadius * 2 + 'px',
        '--cellHeight': this.map.mapRadius * 2 + 'px',
        '--chessMapPaddingTop': this.map.mapRadius / 4 + 'px',
        '--chessMapWidth': Math.cos(2 * Math.PI / 360 * 30) * this.map.mapRadius + 'px',
        '--chessMapHeight': Math.cos(2 * Math.PI / 360 * 30) * this.map.mapRadius + 'px',
        '--chessMapMarginLeft': Math.cos(2 * Math.PI / 360 * 30) * this.map.mapRadius / 2 + 'px'
      };
    }
  },
  methods: {
    // websocket 接收信息
    onMessage: function onMessage() {
      var _this2 = this;
      uni.$on('onMessage', function (res) {
        var jsonRes = JSON.parse(res.data);
        var action = jsonRes.action;
        switch (action) {
          case 'shakeDice':
            _this2.$refs.popupRule.close();
            var diceArr = jsonRes.data;
            _this2.shakeDice(diceArr);
            break;
          case 'lookUpTable':
            _this2.getRuleList();
            break;
          case 'colseTable':
            break;
          case 'takeAction':
            _this2.queryAllFunc();
            break;
          case 'endRound':
            //更新管理员看到的提交状态
            _this2.getRoundStatus();
            break;
          case 'judge':
            //裁决结果展示
            var judgeData = jsonRes.data;
            _this2.judgeShow(judgeData);
            break;
          case 'refresh':
            _this2.refresh();
            break;
          default:
            break;
        }
      });
    },
    getJudgeTable: function getJudgeTable() {
      this.judgeTableShowInfo = {
        type: 'input',
        verdictRecordId: this.verdictRecordId,
        chessRound: this.roundActive,
        roundPeriod: this.stageActive + 1,
        roundPeriodName: this.stageOptions[this.stageActive].title,
        campId: this.campId
      };
      this.$refs.judgeTable.open();
    },
    getJudgeResult: function getJudgeResult() {
      var index;
      console.log('this.stageActive: ', this.stageActive + 1);
      this.judgeTableShowInfo = {
        type: 'record',
        verdictRecordId: this.verdictRecordId,
        // chessRound: this.roundActive,
        // roundPeriod: this.stageActive + 1,
        campId: this.campId
      };
      this.$refs.judgeTable.open();
    },
    judge: function judge() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var data, res, resultData;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data = {
                  verdictRecordId: _this3.verdictRecordId,
                  chessRound: _this3.roundActive,
                  roundPeriod: _this3.stageActive + 1
                };
                _context.next = 3;
                return (0, _verdictRecord.judge)(data);
              case 3:
                res = _context.sent;
                resultData = res.data.data;
                console.log('resultData: ', resultData.length);
                if (resultData.length > 0) {
                  (0, _websocket.sendMsg)(JSON.stringify({
                    action: 'judge',
                    verdictRecordId: _this3.verdictRecordId,
                    data: resultData
                  }));
                } else {
                  (0, _websocket.sendMsg)(JSON.stringify({
                    action: 'takeAction',
                    verdictRecordId: _this3.verdictRecordId
                  }));
                }
              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    testAsync: function testAsync() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var that, i;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                that = _this4; // this.$refs.popupRule.open();
                for (i = 0; i < 5; i++) {}
              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    sleep: function sleep(ms) {
      return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
      });
    },
    judgeShow: function judgeShow(dataArray) {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var that, i, data, ruleRes, blowEffectRes;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                that = _this5;
                i = 0;
              case 2:
                if (!(i < dataArray.length)) {
                  _context3.next = 36;
                  break;
                }
                console.log('i: ', i);
                data = {
                  verdictType: 10
                };
                _context3.next = 7;
                return (0, _verdictRecord.getRuleList)(data);
              case 7:
                ruleRes = _context3.sent;
                that.ruleArray = ruleRes.data.data;
                console.log('打开规则表');
                that.$refs.popupRule.open();
                _context3.next = 13;
                return that.sleep(5000);
              case 13:
                console.log('关闭规则表' + i);
                that.$refs.popupRule.close();
                _context3.next = 17;
                return that.sleep(2000);
              case 17:
                that.shakeDice(dataArray[i].dice);
                _context3.next = 20;
                return that.sleep(5000);
              case 20:
                that.$refs.popup.close();
                _context3.next = 23;
                return that.sleep(2000);
              case 23:
                _context3.next = 25;
                return (0, _verdictRecord.getBlowEffectList)(data);
              case 25:
                blowEffectRes = _context3.sent;
                _this5.blowEffectList = blowEffectRes.data.data;
                console.log('打开结果表');
                _this5.$refs.blowEffectTable.open();
                _context3.next = 31;
                return that.sleep(5000);
              case 31:
                console.log('关闭结果表' + i);
                that.$refs.blowEffectTable.close();
              case 33:
                i++;
                _context3.next = 2;
                break;
              case 36:
                (0, _websocket.sendMsg)(JSON.stringify({
                  action: 'takeAction',
                  verdictRecordId: _this5.verdictRecordId
                }));
              case 37:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    getRuleListAsync: function getRuleListAsync() {
      return new Promise(function (resolve, reject) {
        (0, _verdictRecord.getRuleList)({
          verdictType: 10
        }).then(function (res) {
          resolve(res.data.data);
        });
      });
    },
    getRuleList: function getRuleList() {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var data, ruleRes;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                data = {
                  verdictType: 10
                };
                _context4.next = 3;
                return (0, _verdictRecord.getRuleList)(data);
              case 3:
                ruleRes = _context4.sent;
                _this6.ruleArray = ruleRes.data.data;
                console.log('打开规则表');
                _this6.$refs.popupRule.open();
              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    getRoundStatus: function getRoundStatus() {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var data, result;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                data = {
                  verdictRecordId: _this7.verdictRecordId,
                  chessRound: _this7.roundActive,
                  roundPeriod: _this7.stageActive + 1
                };
                _this7.roundStatusList = [];
                _context5.next = 4;
                return (0, _verdictRecord.getRoundStatus)(data);
              case 4:
                result = _context5.sent;
                _this7.roundStatusList = result.data.data;
                _this7.formatterStatusDesc(_this7.roundStatusList);
              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    formatterStatusDesc: function formatterStatusDesc(newVal) {
      if (this.isAdmin) {
        var n = 0;
        for (var i in newVal) {
          if (newVal[i].status == 1) {
            n++;
          }
        }
        if (n == 0) {
          this.statusDesc = '未提交';
          this.roundEnd = false;
        } else if (n == 1) {
          this.statusDesc = '一方已提交';
          this.roundEnd = false;
        } else {
          this.statusDesc = '已提交';
          this.roundEnd = true;
        }
      } else {
        var _n = 0;
        for (var _i in newVal) {
          if (newVal[_i].campId == this.campId && newVal[_i].status == 1) {
            _n++;
          }
        }
        if (_n == 0) {
          this.statusDesc = '未提交';
          this.userStageNotSubmit = true;
        } else if (_n == 1) {
          this.statusDesc = '已提交';
          this.userStageNotSubmit = false;
        }
      }
      this.statusIndex = 1;
      console.log('this.statusDesc: ', this.statusDesc);
    },
    getRealTimeScore: function getRealTimeScore() {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var queryScoreData, scoreListResult, realTimeScoreList, i;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                queryScoreData = {
                  verdictRecordId: _this8.verdictRecordId
                };
                _context6.next = 3;
                return (0, _verdictRecord.getRealTimeScore)(queryScoreData);
              case 3:
                scoreListResult = _context6.sent;
                realTimeScoreList = scoreListResult.data.data;
                console.log('realTimeScoreList: ', realTimeScoreList);
                _this8.realTimeScore.firstScoretypeTotal = 0;
                _this8.realTimeScore.secondScoretypeTotal = 0;
                _this8.realTimeScore.firstCampName = _this8.campList[0].campName;
                _this8.realTimeScore.secondCampName = _this8.campList[1].campName;
                for (i in realTimeScoreList) {
                  if (_this8.campList[0].campId == realTimeScoreList[i].campId) {
                    if (realTimeScoreList[i].type == 1) {
                      _this8.realTimeScore.firstScoretype1 = realTimeScoreList[i].score;
                    } else if (realTimeScoreList[i].type == 2) {
                      _this8.realTimeScore.firstScoretype2 = realTimeScoreList[i].score;
                    } else if (realTimeScoreList[i].type == 3) {
                      _this8.realTimeScore.firstScoretype3 = realTimeScoreList[i].score;
                    }
                    _this8.realTimeScore.firstScoretypeTotal += realTimeScoreList[i].score;
                  } else {
                    if (realTimeScoreList[i].type == 1) {
                      _this8.realTimeScore.secondScoretype1 = realTimeScoreList[i].score;
                    } else if (realTimeScoreList[i].type == 2) {
                      _this8.realTimeScore.secondScoretype2 = realTimeScoreList[i].score;
                    } else if (realTimeScoreList[i].type == 3) {
                      _this8.realTimeScore.secondScoretype3 = realTimeScoreList[i].score;
                    }
                    _this8.realTimeScore.secondScoretypeTotal += realTimeScoreList[i].score;
                  }
                }
                _this8.$refs.showRealTimeScore.open();
              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    getFinalSummary: function getFinalSummary() {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var queryScoreData, res;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                queryScoreData = {
                  verdictRecordId: _this9.verdictRecordId
                };
                _context7.next = 3;
                return (0, _verdictRecord.getSummaryScore)(queryScoreData);
              case 3:
                res = _context7.sent;
                _this9.chartRound = _this9.chessRoundLimit;
                console.log('res: ', res);
                _this9.summaryScoreData = res.data.data;
                _this9.$refs.finalSummary.open();
              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },
    ruleTableMaskClick: function ruleTableMaskClick() {
      (0, _websocket.sendMsg)(JSON.stringify({
        action: 'colseTable',
        verdictRecordId: this.verdictRecordId,
        data: 0
      }));
    },
    blowEffectMaskClick: function blowEffectMaskClick() {
      (0, _websocket.sendMsg)(JSON.stringify({
        action: 'colseTable',
        verdictRecordId: this.verdictRecordId,
        data: 1
      }));
    },
    scoreBtnClose: function scoreBtnClose() {
      this.showScoreButtonInfo.visible = false;
    },
    scoreTableShow: function scoreTableShow(item, index) {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var queryScoreData, scoreListResult;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                item.chessRound = _this10.roundActive;
                _this10.campListItem = item;
                //查询历史打分结果
                queryScoreData = {
                  verdictRecordId: item.verdictRecordId,
                  campId: item.campId,
                  chessRound: index
                };
                _context8.next = 5;
                return (0, _verdictRecord.queryScoreList)(queryScoreData);
              case 5:
                scoreListResult = _context8.sent;
                _this10.scoreList = scoreListResult.data.data;
                _this10.$refs.scoreTable.open();
                _this10.showScoreButtonInfo.visible = false;
              case 9:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    },
    submitScore: function submitScore(scoreList) {
      var _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        var i, res;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                for (i in scoreList) {
                  scoreList[i].campId = _this11.campListItem.campId;
                  scoreList[i].campName = _this11.campListItem.campName;
                  scoreList[i].userId = _this11.campListItem.userId;
                  scoreList[i].userName = _this11.campListItem.userName;
                  scoreList[i].verdictRecordId = _this11.campListItem.verdictRecordId;
                  scoreList[i].chessRound = _this11.campListItem.chessRound;
                }
                _context9.next = 3;
                return (0, _verdictRecord.submitScore)(scoreList);
              case 3:
                res = _context9.sent;
                if (res.data.code == 200) {
                  uni.showToast({
                    title: '提交成功',
                    icon: 'none',
                    duration: 1500
                  });
                  _this11.$refs.scoreTable.close();
                  _this11.scoreList = [];
                } else {
                  uni.showToast({
                    title: '提交失败！',
                    icon: 'error',
                    duration: 1500
                  });
                }
                console.log(res);
              case 6:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))();
    },
    getTableScoreFinal: function getTableScoreFinal() {
      var _this12 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10() {
        var queryScoreData, scoreListResult;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _this12.finalData = _this12.campList;
                //获取推演打分记录
                queryScoreData = {
                  verdictRecordId: _this12.verdictRecordId,
                  typeString: '4,5'
                };
                _context10.next = 4;
                return (0, _verdictRecord.queryScoreList)(queryScoreData);
              case 4:
                scoreListResult = _context10.sent;
                _this12.finalScoreList = scoreListResult.data.data;
                _this12.$refs.scoreTableFinal.open();
              case 7:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }))();
    },
    submitScoreFinal: function submitScoreFinal(scoreList) {
      var _this13 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11() {
        var res;
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return (0, _verdictRecord.submitScore)(scoreList);
              case 2:
                res = _context11.sent;
                if (res.data.code == 200) {
                  uni.showToast({
                    title: '提交成功',
                    icon: 'none',
                    duration: 1500
                  });
                  _this13.$refs.scoreTableFinal.close();
                } else {
                  uni.showToast({
                    title: '提交失败！',
                    icon: 'error',
                    duration: 1500
                  });
                }
                console.log(res);
              case 5:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }))();
    },
    refresh: function refresh() {
      var _this14 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12() {
        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return _this14.queryUsChessPiecesInfoFunc();
              case 2:
                _context12.next = 4;
                return _this14.queryPromptFunc();
              case 4:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }))();
    },
    getBlowEffectList: function getBlowEffectList() {
      var _this15 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13() {
        var data, blowEffectRes;
        return _regenerator.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                data = {
                  verdictType: 10
                };
                _context13.next = 3;
                return (0, _verdictRecord.getBlowEffectList)(data);
              case 3:
                blowEffectRes = _context13.sent;
                _this15.blowEffectList = blowEffectRes.data.data;
                console.log('打开结果表');
                _this15.$refs.blowEffectTable.open();
              case 7:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }))();
    },
    cjResult: function cjResult(index) {
      if (this.stageActive == 0 || this.stageActive == 3) {
        this.$refs.ruleResult.open();
      }
    },
    shakeDice: function shakeDice(diceArr) {
      var _this16 = this;
      console.log('打开骰子');
      this.$refs.popup.open();
      this.$nextTick(function () {
        for (var i = 0; i < _this16.diceCount; i++) {
          _this16.$refs["dice".concat(i)][0].throwDice(diceArr[i]);
        }
      });
    },
    initChessRound: function initChessRound() {
      var _this17 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee14() {
        var data, res;
        return _regenerator.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                data = {
                  id: _this17.verdictRecordId
                };
                _context14.next = 3;
                return (0, _verdictRecord.queryGameStatus)(data);
              case 3:
                res = _context14.sent;
                _this17.chessRoundLimit = res.data.data.chessRoundLimit;
                _this17.initialRoundOptions(_this17.chessRoundLimit);
              case 6:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }))();
    },
    initialRoundOptions: function initialRoundOptions(round) {
      this.roundOptions = [{
        title: '部署阶段'
      }];
      for (var i = 0; i <= round - 1; i++) {
        this.roundOptions.push({
          title: '回   合   ' + Number(i + 1)
        });
      }
    },
    showOpView: function showOpView(e, val, index, idx) {
      this.showChessButtonInfo.visible = false;
      if (!this.isUser) {
        return;
      }
      if (this.game.nowRound == 0) {
        this.selCellInfo = val;
        if (val.chessPiecesNumber) {
          this.$refs.showDown.open();
        } else {
          this.$refs.showSelPiece.open();
        }
      } else {
        // if (this.game.isOwn) {
        if (val.chessPiecesNumber && val.chessPiecesCampId == this.campId && !val.isAction && val.status == 10) {
          // this.$refs.showOp.open();
          this.chessClick(e);
          this.selCellInfo = val;
          this.selectIndex = [];
          this.selectIndex.push(index);
          this.selectIndex.push(idx);
        } else {
          if (this.isAttack && val.chessPiecesNumber && val.status != 20) {
            this.targetCellInfo = val;
            this.attackNumber = val.chessPiecesNumber;
            this.$refs.attackConfirm.open();
          }
          if (this.isMove) {
            this.targetCellInfo = val;
            this.$refs.moveConfirm.open();
          }
          this.selectTargetIndex = [];
          this.selectTargetIndex.push(index);
          this.selectTargetIndex.push(idx);
        }
        // }
      }
    },
    chessClick: function chessClick(e) {
      var _this18 = this;
      setTimeout(function () {
        var x = e.detail.x; //这个应该是相对于整个浏览器页面的x坐标，左上角为坐标原点（0,0）
        var y = e.detail.y; //这个应该是相对于整个浏览器页面的y坐标，左上角为坐标原点（0,0）
        _this18.showChessButtonInfo.top = y;
        _this18.showChessButtonInfo.left = x;
        _this18.showChessButtonInfo.visible = true;
      }, 100);
    },
    queryMapInfoFunc: function queryMapInfoFunc() {
      var _this19 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee15() {
        var data;
        return _regenerator.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                data = {
                  id: _this19.verdictRecordId
                };
                (0, _arbiterMap.queryMapInfo)(data).then(function (res) {
                  _this19.map = res.data.data;
                  _this19.gen();
                });
              case 2:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      }))();
    },
    gen: function gen() {
      var _this20 = this;
      this.mapLong = this.map.longitudinalDimension;
      this.mapWidth = this.map.transverseDimension;
      this.mapList = [];
      for (var i = 0; i < this.mapLong; i++) {
        this.mapList.push([]);
        for (var j = 0; j < this.mapWidth; j++) {
          var data = {
            coordinate: (this.mapLong - i).toString().padStart(2, '0') + (j + 1).toString().padStart(2, '0'),
            chessPiecesNumber: '',
            chessPiecesName: '',
            chessPiecesCover: ''
          };
          this.mapList[i].push(data);
        }
      }
      setTimeout(function () {
        _this20.arrange();
      }, 5);
    },
    arrange: function arrange() {
      var offsetTop = 0;
      var lineIndex = 0;
      document.querySelectorAll('.block').forEach(function (item) {
        item.style.marginLeft = '0px';
        if (offsetTop !== item.offsetTop) {
          ++lineIndex;
          if (lineIndex % 2 === 0) {
            item.style.marginLeft = 66.8 * 0.5 + 'px';
            // parseInt(this.width) * 0.5 + parseInt(this.marginLeftRight) * 0.5 + 0 + 'px';
          }
        }

        offsetTop = item.offsetTop;
      });
    },
    queryAllFunc: function queryAllFunc() {
      var _this21 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee16() {
        var data, rst, resultData, key, result, _data;
        return _regenerator.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                data = {
                  id: _this21.verdictRecordId
                };
                _context16.next = 3;
                return (0, _verdictRecord.queryVerdictResult)(data);
              case 3:
                rst = _context16.sent;
                resultData = rst.data.data;
                for (key in resultData) {
                  _this21.game[key] = resultData[key];
                }
                _this21.roundActive = _this21.game.chessRound;
                if (_this21.user.id == _this21.game.inviterUserId) {
                  _this21.isAdmin = true;
                }
                //格式化campList
                _this21.formatterCampList();
                _this21.chessRoundLimit = resultData.chessRoundLimit;
                _this21.initialRoundOptions(_this21.chessRoundLimit);
                _this21.queryChessRoundFunc();
                _this21.getRoundStatus();
                if (_this21.game.status < 30) {
                  _this21.game.nowRound = 0;
                } else {
                  _this21.game.nowRound = _this21.game.chessRound;
                }
                if (_this21.game.status == 50) {
                  result = _this21.game.verdictResult;
                  _this21.game.resultStr = '';
                  if (result == 20) {
                    _this21.game.result = 0;
                    _this21.game.resultStr = '双方平局';
                  } else if (result == 10) {
                    if (_this21.game.firstCampId == _this21.campId) {
                      _this21.game.result = 1;
                    } else {
                      _this21.game.result = 2;
                    }
                    _this21.game.resultStr = _this21.game.firstCampName + '击败了' + _this21.game.secondCampName;
                  } else {
                    if (_this21.game.firstCampId == _this21.campId) {
                      _this21.game.result = 2;
                    } else {
                      _this21.game.result = 1;
                    }
                    _this21.game.resultStr = _this21.game.secondCampName + '击败了' + _this21.game.firstCampName;
                  }
                  if (_this21.isAdmin) {
                    _this21.getTableScoreFinal();
                    // this.$refs.scoreTableFinal.open();
                  } else {
                    _this21.$refs.showResult.open();
                  }
                  // this.$refs.showResult.open();
                  // this.$refs.showSettlement.open();
                }

                if (_this21.game.baseRound != _this21.game.chessRound) {
                  _this21.isAttack = false;
                  _this21.isMove = false;
                  _data = {
                    chessRound: _this21.game.chessRound,
                    userId: _this21.user.id,
                    verdictRecordId: _this21.verdictRecordId
                  };
                  (0, _verdictRecord.queryActionEffect)(_data).then(function (res) {
                    _this21.game.settlement = res.data.data;
                    //this.game.showSettlement = true
                    _this21.game.baseRound = _this21.game.chessRound;
                  });
                }
                // if (this.game.status >= 30) {
                // 	this.isOwnRoundFunc();
                // }

                // if (!this.isUser | !this.game.isOwn) {
                _this21.queryUsChessPiecesInfoFunc();
                // }
              case 17:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      }))();
    },
    queryChessRoundFunc: function queryChessRoundFunc() {
      if (this.game.roundPeriod == 1) {
        this.game.roundDesc = '直瞄射击阶段';
        this.stageActive = 0;
      }
      if (this.game.roundPeriod == 2) {
        this.game.roundDesc = '机动阶段';
        this.stageActive = 1;
      }
      if (this.game.roundPeriod == 3) {
        this.game.roundDesc = '压制标记的移除阶段';
        this.stageActive = 2;
      }
      if (this.game.roundPeriod == 4) {
        this.game.roundDesc = '间射击阶段';
        this.stageActive = 3;
      }
      this.queryPromptFunc();
    },
    formatterCampList: function formatterCampList() {
      this.campList = [];
      var dataFirst = {
        campId: this.game.firstCampId,
        campName: this.game.firstCampName,
        userId: this.game.firstUserId,
        userName: this.game.firstUserName,
        verdictRecordId: this.verdictRecordId
      };
      this.campList.push(dataFirst);
      var dataSecond = {
        campId: this.game.secondCampId,
        campName: this.game.secondCampName,
        userId: this.game.secondUserId,
        userName: this.game.secondUserName,
        verdictRecordId: this.verdictRecordId
      };
      this.campList.push(dataSecond);
      if (this.isAdmin) {
        this.avatarText = '导演';
      } else if (this.user.id == this.game.firstUserId) {
        this.avatarText = this.game.firstCampName;
      } else if (this.user.id == this.game.secondUserId) {
        this.avatarText = this.game.secondCampName;
      }
      console.log('this.user.id: ', this.user.id);
      console.log('this.game.firstUserId: ', this.game.firstUserId);
      console.log('this.game.secondUserId: ', this.game.secondUserId);
    },
    isOwnRoundFunc: function isOwnRoundFunc() {
      var _this22 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee17() {
        var data, res;
        return _regenerator.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                data = {
                  id: _this22.verdictRecordId,
                  userId: _this22.user.id
                };
                _context17.next = 3;
                return (0, _verdictRecord.isOwnRound)(data);
              case 3:
                res = _context17.sent;
                _this22.game.isOwn = res.data.data;
              case 5:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17);
      }))();
    },
    queryUsChessPiecesInfoFunc: function queryUsChessPiecesInfoFunc() {
      var _this23 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee18() {
        var data, res, _iterator, _step, itemk, _iterator3, _step3, h, _iterator2, _step2, item, _iterator4, _step4, _itemk, _iterator5, _step5, _h;
        return _regenerator.default.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                data = {
                  verdictRecordId: _this23.verdictRecordId,
                  chessRound: _this23.game.chessRound,
                  roundPeriod: _this23.stageActive + 1
                };
                res = '';
                if (!_this23.isUser) {
                  _context18.next = 9;
                  break;
                }
                data.campId = _this23.campId;
                _context18.next = 6;
                return (0, _verdictRecord.queryAllChessPiecesInfo)(data);
              case 6:
                res = _context18.sent;
                _context18.next = 12;
                break;
              case 9:
                _context18.next = 11;
                return (0, _verdictRecord.queryAllChessPiecesInfo)(data);
              case 11:
                res = _context18.sent;
              case 12:
                _iterator = _createForOfIteratorHelper(_this23.mapList);
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    itemk = _step.value;
                    _iterator3 = _createForOfIteratorHelper(itemk);
                    try {
                      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                        h = _step3.value;
                        h.chessPiecesNumber = '';
                        h.chessPiecesName = '';
                        h.chessPiecesCover = '';
                        h.chessPiecesCampId = '';
                        h.statusDesc = '';
                        h.status = 10;
                      }
                    } catch (err) {
                      _iterator3.e(err);
                    } finally {
                      _iterator3.f();
                    }
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
                _this23.game.userPiece = [];
                _iterator2 = _createForOfIteratorHelper(res.data.data);
                _context18.prev = 16;
                _iterator2.s();
              case 18:
                if ((_step2 = _iterator2.n()).done) {
                  _context18.next = 67;
                  break;
                }
                item = _step2.value;
                item.isAdd = false;
                item.canMove = true;
                item.isDie = false;
                _this23.game.userPiece.push(item);
                _iterator4 = _createForOfIteratorHelper(_this23.mapList);
                _context18.prev = 25;
                _iterator4.s();
              case 27:
                if ((_step4 = _iterator4.n()).done) {
                  _context18.next = 57;
                  break;
                }
                _itemk = _step4.value;
                _iterator5 = _createForOfIteratorHelper(_itemk);
                _context18.prev = 30;
                _iterator5.s();
              case 32:
                if ((_step5 = _iterator5.n()).done) {
                  _context18.next = 47;
                  break;
                }
                _h = _step5.value;
                if (!(_h.coordinate == item.coordinate)) {
                  _context18.next = 45;
                  break;
                }
                _h.chessPiecesNumber = item.chessPiecesNumber;
                _h.chessPiecesName = item.chessPiecesName;
                _h.chessPiecesCover = item.chessPiecesCover;
                _h.chessPiecesCampId = item.chessPiecesCampId;
                _h.chessPiecesTypeName = item.chessPiecesTypeName;
                _h.statusDesc = item.statusDesc;
                _h.isAction = item.isAction;
                _h.status = item.status;
                item.isAdd = true;
                return _context18.abrupt("break", 47);
              case 45:
                _context18.next = 32;
                break;
              case 47:
                _context18.next = 52;
                break;
              case 49:
                _context18.prev = 49;
                _context18.t0 = _context18["catch"](30);
                _iterator5.e(_context18.t0);
              case 52:
                _context18.prev = 52;
                _iterator5.f();
                return _context18.finish(52);
              case 55:
                _context18.next = 27;
                break;
              case 57:
                _context18.next = 62;
                break;
              case 59:
                _context18.prev = 59;
                _context18.t1 = _context18["catch"](25);
                _iterator4.e(_context18.t1);
              case 62:
                _context18.prev = 62;
                _iterator4.f();
                return _context18.finish(62);
              case 65:
                _context18.next = 18;
                break;
              case 67:
                _context18.next = 72;
                break;
              case 69:
                _context18.prev = 69;
                _context18.t2 = _context18["catch"](16);
                _iterator2.e(_context18.t2);
              case 72:
                _context18.prev = 72;
                _iterator2.f();
                return _context18.finish(72);
              case 75:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, null, [[16, 69, 72, 75], [25, 59, 62, 65], [30, 49, 52, 55]]);
      }))();
    },
    cancelPiece: function cancelPiece() {
      var number = this.selCellInfo.chessPiecesNumber;
      this.deployChessPiecesFunc(this.selCellInfo, false);
      this.selCellInfo.chessPiecesNumber = '';
      this.selCellInfo.chessPiecesName = '';
      this.selCellInfo.chessPiecesCover = '';
      this.showDown = false;
      var _iterator6 = _createForOfIteratorHelper(this.game.userPiece),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var item = _step6.value;
          if (item.chessPiecesNumber == number) {
            item.isAdd = false;
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    },
    endDeployFunc: function endDeployFunc() {
      var _this24 = this;
      var data = {
        verdictRecordId: this.verdictRecordId,
        userId: this.user.id
      };
      (0, _verdictRecord.endDeploy)(data).then(function (res) {
        if (res.data.code == 200) {
          (0, _websocket.sendMsg)(JSON.stringify({
            action: 'takeAction',
            verdictRecordId: _this24.verdictRecordId
          }));
        }
      });
      this.game.isDeplaoy = false;
    },
    attackPoint: function attackPoint() {
      this.isAttack = false;
      this.isMove = false;
      this.$refs.moveConfirm.close();
      this.$refs.attackConfirm.close();
      this.chessPiecesActionFunc(this.selCellInfo, this.targetCellInfo, true);
    },
    movePoint: function movePoint() {
      this.isAttack = false;
      this.isMove = false;
      this.$refs.moveConfirm.close();
      this.$refs.attackConfirm.close();
      this.chessPiecesActionFunc(this.selCellInfo, this.targetCellInfo, false);
    },
    attack: function attack() {
      this.isAttack = true;
      this.isMove = false;
      this.showChessButtonInfo.visible = false;
    },
    move: function move() {
      this.isAttack = false;
      this.isMove = true;
      this.showChessButtonInfo.visible = false;
    },
    hide: function hide() {
      this.isAttack = false;
      this.isMove = false;
      this.showChessButtonInfo.visible = false;
      this.chessPiecesActionFunc(this.selCellInfo, this.selCellInfo, false, true);
    },
    chessPiecesActionFunc: function chessPiecesActionFunc(source, target, isAttack, isHide) {
      var _this25 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee19() {
        var data;
        return _regenerator.default.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                data = {
                  actionMode: isAttack ? 20 : 10,
                  campId: _this25.campId,
                  chessPiecesNumber: source.chessPiecesNumber,
                  selfCoordinate: source.coordinate,
                  targetCoordinate: target.coordinate,
                  userId: _this25.user.id,
                  verdictRecordId: _this25.verdictRecordId,
                  targetChessPiecesNumber: target.chessPiecesNumber,
                  chessRound: _this25.roundActive,
                  roundPeriod: _this25.stageActive + 1
                };
                isHide && (data.actionMode = 30);

                // if (data.actionMode == 20 && this.game.roundPeriod != 60 && this.game.roundPeriod != 70) {selectTargetIndex
                _context19.next = 4;
                return (0, _verdictRecord.chessPiecesActionNew)(data);
              case 4:
                if (data.actionMode == 10) {
                  _this25.queryUsChessPiecesInfoFunc();
                  (0, _websocket.sendMsg)(JSON.stringify({
                    action: 'refresh',
                    verdictRecordId: _this25.verdictRecordId
                  }));
                }

                // let index = this.selectIndex[0];
                // let itemArray = this.mapList[index];
                // let item = itemArray[this.selectIndex[1]];
                // item.isAction = true;
                // this.$set(itemArray, this.selectIndex[1], item);
                // this.$set(this.mapList, index, itemArray);
                _context19.next = 7;
                return _this25.queryPromptFunc();
              case 7:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19);
      }))();
    },
    queryPromptFunc: function queryPromptFunc() {
      var _this26 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee20() {
        var data, prompt, array, i;
        return _regenerator.default.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                data = {
                  // chessRound: this.roundActive,
                  id: _this26.verdictRecordId
                  // roundPeriod: this.stageActive + 1
                };

                data.userId = _this26.user.id;
                _context20.next = 4;
                return (0, _verdictRecord.queryPrompt)(data);
              case 4:
                prompt = _context20.sent;
                // let array = prompt.data.data.actionDescList;
                array = [];
                _this26.historyList = prompt.data.data.verdictRecordHistoryList;
                for (i in _this26.historyList) {
                  array.push(_this26.historyList[i].actionDesc);
                }
                array.filter(function (s) {
                  return s && s.trim();
                });
                // array.reverse();
                // for (let i in array) {
                // 	array[i] = array[i].replaceAll(
                // 		'裁决结果',
                // 		'<a style="color:blue" @click="cjResult(' + i + ')" >裁决结果</a>'
                // 	);
                // }
                _this26.game.actionDescList = array;
              case 10:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20);
      }))();
    },
    checkCanAttack: function checkCanAttack() {
      //TODO   A表示什么
      // if (
      // 	//this.selCellInfo.chessPiecesTypeName == 'A' &&
      // 	this.game.roundPeriod == 60 ||
      // 	this.game.roundPeriod == 70
      // ) {
      // 	return true;
      // } else
      if (this.game.roundPeriod == 1 || this.game.roundPeriod == 4) {
        return true;
      } else {
        return false;
      }
    },
    gameOver: function gameOver() {
      // clearInterval(this.tmQuery);
      this.$refs.showResult.close();
      // if (this.isUser) {
      // 	uni.navigateTo({
      // 		url: '/pages/mode/select'
      // 	});
      // } else {
      // 	uni.navigateTo({
      // 		url: '/pages/mode/select'
      // 	});
      // }
    },
    selPiece: function selPiece(val) {
      this.selCellInfo.chessPiecesNumber = val.chessPiecesNumber;
      this.selCellInfo.chessPiecesName = val.chessPiecesName;
      this.selCellInfo.chessPiecesCover = val.chessPiecesCover;
      this.selCellInfo.statusDesc = '-';
      this.deployChessPiecesFunc(this.selCellInfo, true);
      val.isAdd = true;
      this.$refs.showSelPiece.close();
    },
    deployChessPiecesFunc: function deployChessPiecesFunc(val, isAdd) {
      var data = {
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
      } else {
        data.selfCoordinate = val.coordinate;
        data.targetCoordinate = '0000';
      }
      (0, _verdictRecord.deployChessPieces)(data);
    },
    endRoundFunc: function endRoundFunc() {
      var _this27 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee21() {
        var data;
        return _regenerator.default.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                data = {
                  id: _this27.verdictRecordId,
                  userId: _this27.user.id,
                  chessRound: _this27.roundActive,
                  roundPeriod: _this27.stageActive + 1
                };
                _context21.next = 3;
                return (0, _verdictRecord.endRound)(data);
              case 3:
                (0, _websocket.sendMsg)(JSON.stringify({
                  action: 'endRound',
                  verdictRecordId: _this27.verdictRecordId
                }));
              case 4:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21);
      }))();
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 142:
/*!**************************************************************************************************************************!*\
  !*** D:/chess/code/new-wargame-uniapp/pages/wargame/index.vue?vue&type=style&index=0&id=5c8a2998&lang=scss&scoped=true& ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_5c8a2998_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=style&index=0&id=5c8a2998&lang=scss&scoped=true& */ 143);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_5c8a2998_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_5c8a2998_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_5c8a2998_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_5c8a2998_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_5c8a2998_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 143:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/chess/code/new-wargame-uniapp/pages/wargame/index.vue?vue&type=style&index=0&id=5c8a2998&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[134,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/wargame/index.js.map