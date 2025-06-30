(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/verdict/detail"],{

/***/ 144:
/*!************************************************************************************!*\
  !*** D:/chess/code/new-wargame-uniapp/main.js?{"page":"pages%2Fverdict%2Fdetail"} ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _detail = _interopRequireDefault(__webpack_require__(/*! ./pages/verdict/detail.vue */ 145));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_detail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 145:
/*!*****************************************************************!*\
  !*** D:/chess/code/new-wargame-uniapp/pages/verdict/detail.vue ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _detail_vue_vue_type_template_id_c09cc300___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detail.vue?vue&type=template&id=c09cc300& */ 146);
/* harmony import */ var _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detail.vue?vue&type=script&lang=js& */ 148);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detail.vue?vue&type=style&index=0&lang=scss& */ 150);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 57);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _detail_vue_vue_type_template_id_c09cc300___WEBPACK_IMPORTED_MODULE_0__["render"],
  _detail_vue_vue_type_template_id_c09cc300___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _detail_vue_vue_type_template_id_c09cc300___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/verdict/detail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 146:
/*!************************************************************************************************!*\
  !*** D:/chess/code/new-wargame-uniapp/pages/verdict/detail.vue?vue&type=template&id=c09cc300& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_c09cc300___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=template&id=c09cc300& */ 147);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_c09cc300___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_c09cc300___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_c09cc300___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_c09cc300___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 147:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/chess/code/new-wargame-uniapp/pages/verdict/detail.vue?vue&type=template&id=c09cc300& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    uvModal: function () {
      return Promise.all(/*! import() | uni_modules/uv-modal/components/uv-modal/uv-modal */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uv-modal/components/uv-modal/uv-modal")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uv-modal/components/uv-modal/uv-modal.vue */ 202))
    },
    xinyiSteps: function () {
      return __webpack_require__.e(/*! import() | uni_modules/xinyi-steps/components/xinyi-steps/xinyi-steps */ "uni_modules/xinyi-steps/components/xinyi-steps/xinyi-steps").then(__webpack_require__.bind(null, /*! @/uni_modules/xinyi-steps/components/xinyi-steps/xinyi-steps.vue */ 306))
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
    finalSummary: function () {
      return __webpack_require__.e(/*! import() | uni_modules/final-summary/components/final-summary/final-summary */ "uni_modules/final-summary/components/final-summary/final-summary").then(__webpack_require__.bind(null, /*! @/uni_modules/final-summary/components/final-summary/final-summary.vue */ 349))
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
  var m0 = __webpack_require__(/*! @/static/image/map.jpg */ 138)
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
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 148:
/*!******************************************************************************************!*\
  !*** D:/chess/code/new-wargame-uniapp/pages/verdict/detail.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=script&lang=js& */ 149);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 149:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/chess/code/new-wargame-uniapp/pages/verdict/detail.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _arbiterMap = __webpack_require__(/*! ../../api/arbiterMap.js */ 141);
var _verdictRecord = __webpack_require__(/*! ../../api/verdictRecord.js */ 115);
__webpack_require__(/*! vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css */ 64);
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
      value: 1,
      range: [{
        value: 0,
        text: '1'
      }, {
        value: 1,
        text: '2'
      }, {
        value: 2,
        text: '3'
      }],
      game: {
        status: 0,
        chessRound: 1,
        nowRound: 0,
        baseRound: 1,
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
      legendList: [{
        name: '1212'
      }],
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
      stageParam: '10,20',
      historyList: [],
      ruleArray: [],
      blowEffectList: [],
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
      campList: [],
      chartRound: 0,
      summaryScoreData: []
    };
  },
  onLoad: function onLoad(res) {
    var _this = this;
    this.user = uni.getStorageSync('user');
    setTimeout(function () {
      _this.arrange();
    }, 5);
    this.verdictRecordId = res.id;
    this.campId = res.camp;
    this.game.isUser = res.isuser == 'true';
    this.queryMapInfoFunc();
    setTimeout(function () {
      _this.init();
    }, 123);
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
        '--chessMapPaddingTop': this.map.mapRadius / 2.5 + 'px',
        '--chessMapWidth': Math.cos(2 * Math.PI / 360 * 30) * this.map.mapRadius + 'px',
        '--chessMapHeight': Math.cos(2 * Math.PI / 360 * 30) * this.map.mapRadius + 'px',
        '--chessMapMarginLeft': Math.cos(2 * Math.PI / 360 * 30) * this.map.mapRadius / 2 + 'px'
      };
    }
  },
  onReady: function onReady() {},
  methods: {
    init: function init() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var data, res, resultData, key;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                //复盘进入页面默认第一回合的第一阶段
                //获取该记录回合数
                data = {
                  id: _this2.verdictRecordId
                };
                _context.next = 3;
                return (0, _verdictRecord.queryGameStatus)(data);
              case 3:
                res = _context.sent;
                resultData = res.data.data;
                for (key in resultData) {
                  _this2.game[key] = resultData[key];
                }
                _this2.game.status = res.data.data.status;
                _this2.game.chessRound = res.data.data.chessRound;
                _this2.initialRoundOptions(_this2.game.chessRound);
                _this2.queryEachAction();
                _this2.formatterCampList();
                // this.getRuleList();
              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    getRuleList: function getRuleList() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var data, ruleRes, blowEffectRes;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                data = {
                  verdictType: 10
                };
                _context2.next = 3;
                return (0, _verdictRecord.getRuleList)(data);
              case 3:
                ruleRes = _context2.sent;
                console.log('ruleRes: ', ruleRes);
                _this3.ruleArray = ruleRes.data.data;
                _this3.$refs.popupRule.open();
                _context2.next = 9;
                return (0, _verdictRecord.getBlowEffectList)(data);
              case 9:
                blowEffectRes = _context2.sent;
                _this3.blowEffectList = blowEffectRes.data.data;
                // this.$refs.blowEffectTable.open();
              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    queryEachAction: function queryEachAction() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var data, prompt, array, i;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                data = {
                  chessRound: _this4.roundActive + 1,
                  id: _this4.verdictRecordId,
                  type: 'record',
                  stageParam: _this4.stageParam
                }; // let res = await queryEachAction(data);
                // console.log('res1111: ', res);
                _context3.next = 3;
                return (0, _verdictRecord.queryPrompt)(data);
              case 3:
                prompt = _context3.sent;
                console.log('prompt: ', prompt);
                array = prompt.data.data.actionDescList;
                _this4.historyList = prompt.data.data.verdictRecordHistoryList;
                for (i in _this4.historyList) {
                  array.push(_this4.historyList[i].actionDesc);
                }
                array.filter(function (s) {
                  return s && s.trim();
                });
                array.reverse();
                // for (let i in array) {
                // 	array[i] = array[i].replaceAll(
                // 		'裁决结果',
                // 		'<a style="color:blue" @click="cjResult(' + i + ')" >裁决结果</a>'
                // 	);
                // 	console.log('s: ', array[i]);
                // }
                _this4.game.actionDescList = array.reverse();
              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    cjResult: function cjResult(index) {
      if (this.stageActive == 0 || this.stageActive == 3) {
        this.$refs.ruleResult.open();
      }
    },
    queryChessRecordByRound: function queryChessRecordByRound() {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var data, res, _iterator, _step, itemk, _iterator3, _step3, h, _iterator2, _step2, item, _iterator4, _step4, _itemk, _iterator5, _step5, _h, jsonArray, sItem, i;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                data = {
                  verdictRecordId: _this5.verdictRecordId,
                  chessRound: _this5.roundActive + 1,
                  stageParam: _this5.stageParam
                };
                _context4.next = 3;
                return (0, _verdictRecord.queryChessRecordByRound)(data);
              case 3:
                res = _context4.sent;
                console.log('res.data.data: ', res.data.data);
                _iterator = _createForOfIteratorHelper(_this5.mapList);
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
                _iterator2 = _createForOfIteratorHelper(res.data.data);
                _context4.prev = 8;
                _iterator2.s();
              case 10:
                if ((_step2 = _iterator2.n()).done) {
                  _context4.next = 61;
                  break;
                }
                item = _step2.value;
                item.isAdd = false;
                item.canMove = true;
                item.isDie = false;
                _iterator4 = _createForOfIteratorHelper(_this5.mapList);
                _context4.prev = 16;
                _iterator4.s();
              case 18:
                if ((_step4 = _iterator4.n()).done) {
                  _context4.next = 51;
                  break;
                }
                _itemk = _step4.value;
                _iterator5 = _createForOfIteratorHelper(_itemk);
                _context4.prev = 21;
                _iterator5.s();
              case 23:
                if ((_step5 = _iterator5.n()).done) {
                  _context4.next = 41;
                  break;
                }
                _h = _step5.value;
                if (!(_h.coordinate == item.targetCoordinate)) {
                  _context4.next = 39;
                  break;
                }
                jsonArray = JSON.parse(item.chessPiecesInfo);
                sItem = {};
                for (i in jsonArray) {
                  if (jsonArray[i].chessPiecesNumber == item.chessPiecesNumber) {
                    sItem = jsonArray[i];
                  }
                }
                _h.chessPiecesNumber = item.chessPiecesNumber;
                _h.chessPiecesName = item.chessPiecesName;
                _h.chessPiecesCover = item.chessPiecesCover;
                _h.chessPiecesCampId = item.campId;
                _h.chessPiecesTypeName = item.chessPiecesTypeName;
                _h.statusDesc = sItem.statusDesc;
                _h.isAction = item.isAction;
                _h.status = item.status;
                item.isAdd = true;
                return _context4.abrupt("break", 41);
              case 39:
                _context4.next = 23;
                break;
              case 41:
                _context4.next = 46;
                break;
              case 43:
                _context4.prev = 43;
                _context4.t0 = _context4["catch"](21);
                _iterator5.e(_context4.t0);
              case 46:
                _context4.prev = 46;
                _iterator5.f();
                return _context4.finish(46);
              case 49:
                _context4.next = 18;
                break;
              case 51:
                _context4.next = 56;
                break;
              case 53:
                _context4.prev = 53;
                _context4.t1 = _context4["catch"](16);
                _iterator4.e(_context4.t1);
              case 56:
                _context4.prev = 56;
                _iterator4.f();
                return _context4.finish(56);
              case 59:
                _context4.next = 10;
                break;
              case 61:
                _context4.next = 66;
                break;
              case 63:
                _context4.prev = 63;
                _context4.t2 = _context4["catch"](8);
                _iterator2.e(_context4.t2);
              case 66:
                _context4.prev = 66;
                _iterator2.f();
                return _context4.finish(66);
              case 69:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[8, 63, 66, 69], [16, 53, 56, 59], [21, 43, 46, 49]]);
      }))();
    },
    initialRoundOptions: function initialRoundOptions(round) {
      this.roundOptions = [];
      for (var i = 0; i <= round - 1; i++) {
        this.roundOptions.push({
          title: '回合' + Number(i + 1)
        });
      }
    },
    stageChange: function stageChange(index) {
      console.log('index: ', index);
      if (this.stageActive != index) {
        this.stageActive = index;
        this.formateStageParam();
        this.queryEachAction();
        this.queryChessRecordByRound();
      }
    },
    roundChange: function roundChange(index) {
      console.log('index: ', index);
      if (this.roundActive != index) {
        this.roundActive = index;
        this.queryEachAction();
        this.queryChessRecordByRound();
      }
    },
    formateStageParam: function formateStageParam() {
      if (this.stageActive == 0) {
        this.stageParam = '10,20';
      } else if (this.stageActive == 1) {
        this.stageParam = '30,40';
      } else if (this.stageActive == 2) {
        this.stageParam = '50';
      } else if (this.stageActive == 3) {
        this.stageParam = '60,70';
      }
    },
    dice: function dice() {
      var _this6 = this;
      this.$refs.popup.open();
      this.$nextTick(function () {
        _this6.$refs.d.throwDice();
        _this6.$refs.d2.throwDice();
      });
    },
    showOpView: function showOpView(val) {
      console.log('val: ', val);
      if (!this.game.isUser) {
        return;
      }
      if (this.game.nowRound == 1) {
        this.selCellInfo = val;
        if (val.chessPiecesNumber) {
          this.showDown = true;
        } else {
          this.showSelPiece = true;
        }
      } else {
        if (this.game.isOwn) {
          if (val.chessPiecesNumber && val.chessPiecesCampId == this.campId && !val.isAction && val.status == 10) {
            this.showOp = true;
            this.selCellInfo = val;
          } else {
            if (this.isAttack && val.chessPiecesNumber && val.status != 20) {
              this.targetCellInfo = val;
              this.attackNumber = val.chessPiecesNumber;
              this.attackConfirm = true;
            }
            if (this.isMove) {
              this.targetCellInfo = val;
              this.moveConfirm = true;
            }
          }
        }
      }
    },
    queryMapInfoFunc: function queryMapInfoFunc() {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var data;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                data = {
                  id: _this7.verdictRecordId
                };
                (0, _arbiterMap.queryMapInfo)(data).then(function (res) {
                  _this7.map = res.data.data;
                  console.log('this.map.maps: ', _this7.map);
                  var RoundList = [{
                    actionList: [{
                      pieceList: [],
                      tips: ''
                    }],
                    tips: ''
                  }];
                  _this7.gen();
                });
              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    gen: function gen() {
      var _this8 = this;
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
        _this8.arrange();
        _this8.queryChessRecordByRound();
      }, 5);
    },
    arrange: function arrange() {
      var _this9 = this;
      var offsetTop = 0;
      var lineIndex = 0;
      document.querySelectorAll('.block').forEach(function (item) {
        item.style.marginLeft = '0px';
        if (offsetTop !== item.offsetTop) {
          ++lineIndex;
          if (lineIndex % 2 === 0) {
            item.style.marginLeft = Math.cos(2 * Math.PI / 360 * 30) * _this9.map.mapRadius + 'px';
            // parseInt(this.width) * 0.5 + parseInt(this.marginLeftRight) * 0.5 + 0 + 'px';
          }
        }

        offsetTop = item.offsetTop;
      });
    },
    queryUsChessPiecesInfoFunc: function queryUsChessPiecesInfoFunc() {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var data, res, _iterator6, _step6, itemk, _iterator8, _step8, h, _iterator7, _step7, item, _iterator9, _step9, _itemk2, _iterator10, _step10, _h2;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                data = {
                  verdictRecordId: _this10.verdictRecordId,
                  chessRound: _this10.game.chessRound
                };
                res = '';
                if (!_this10.game.isUser) {
                  _context6.next = 9;
                  break;
                }
                data.campId = _this10.campId;
                _context6.next = 6;
                return (0, _verdictRecord.queryAllChessPiecesInfo)(data);
              case 6:
                res = _context6.sent;
                _context6.next = 12;
                break;
              case 9:
                _context6.next = 11;
                return (0, _verdictRecord.queryAllChessPiecesInfo)(data);
              case 11:
                res = _context6.sent;
              case 12:
                _iterator6 = _createForOfIteratorHelper(_this10.mapList);
                try {
                  for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                    itemk = _step6.value;
                    _iterator8 = _createForOfIteratorHelper(itemk);
                    try {
                      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                        h = _step8.value;
                        h.chessPiecesNumber = '';
                        h.chessPiecesName = '';
                        h.chessPiecesCover = '';
                        h.chessPiecesCampId = '';
                        h.statusDesc = '';
                        h.status = 10;
                      }
                    } catch (err) {
                      _iterator8.e(err);
                    } finally {
                      _iterator8.f();
                    }
                  }
                } catch (err) {
                  _iterator6.e(err);
                } finally {
                  _iterator6.f();
                }
                _this10.game.userPiece = [];
                _iterator7 = _createForOfIteratorHelper(res.data.data);
                _context6.prev = 16;
                _iterator7.s();
              case 18:
                if ((_step7 = _iterator7.n()).done) {
                  _context6.next = 67;
                  break;
                }
                item = _step7.value;
                item.isAdd = false;
                item.canMove = true;
                item.isDie = false;
                _this10.game.userPiece.push(item);
                _iterator9 = _createForOfIteratorHelper(_this10.mapList);
                _context6.prev = 25;
                _iterator9.s();
              case 27:
                if ((_step9 = _iterator9.n()).done) {
                  _context6.next = 57;
                  break;
                }
                _itemk2 = _step9.value;
                _iterator10 = _createForOfIteratorHelper(_itemk2);
                _context6.prev = 30;
                _iterator10.s();
              case 32:
                if ((_step10 = _iterator10.n()).done) {
                  _context6.next = 47;
                  break;
                }
                _h2 = _step10.value;
                if (!(_h2.coordinate == item.coordinate)) {
                  _context6.next = 45;
                  break;
                }
                _h2.chessPiecesNumber = item.chessPiecesNumber;
                _h2.chessPiecesName = item.chessPiecesName;
                _h2.chessPiecesCover = item.chessPiecesCover;
                _h2.chessPiecesCampId = item.chessPiecesCampId;
                _h2.chessPiecesTypeName = item.chessPiecesTypeName;
                _h2.statusDesc = item.statusDesc;
                _h2.isAction = item.isAction;
                _h2.status = item.status;
                item.isAdd = true;
                return _context6.abrupt("break", 47);
              case 45:
                _context6.next = 32;
                break;
              case 47:
                _context6.next = 52;
                break;
              case 49:
                _context6.prev = 49;
                _context6.t0 = _context6["catch"](30);
                _iterator10.e(_context6.t0);
              case 52:
                _context6.prev = 52;
                _iterator10.f();
                return _context6.finish(52);
              case 55:
                _context6.next = 27;
                break;
              case 57:
                _context6.next = 62;
                break;
              case 59:
                _context6.prev = 59;
                _context6.t1 = _context6["catch"](25);
                _iterator9.e(_context6.t1);
              case 62:
                _context6.prev = 62;
                _iterator9.f();
                return _context6.finish(62);
              case 65:
                _context6.next = 18;
                break;
              case 67:
                _context6.next = 72;
                break;
              case 69:
                _context6.prev = 69;
                _context6.t2 = _context6["catch"](16);
                _iterator7.e(_context6.t2);
              case 72:
                _context6.prev = 72;
                _iterator7.f();
                return _context6.finish(72);
              case 75:
                console.log('maplist===', _this10.mapList);
              case 76:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[16, 69, 72, 75], [25, 59, 62, 65], [30, 49, 52, 55]]);
      }))();
    },
    endDeployFunc: function endDeployFunc() {
      var data = {
        verdictRecordId: this.verdictRecordId,
        userId: this.user.id
      };
      (0, _verdictRecord.endDeploy)(data);
      this.game.isDeplaoy = false;
    },
    getRealTimeScore: function getRealTimeScore() {
      var _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var queryScoreData, scoreListResult, realTimeScoreList, i;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                queryScoreData = {
                  verdictRecordId: _this11.verdictRecordId
                };
                _context7.next = 3;
                return (0, _verdictRecord.getRealTimeScore)(queryScoreData);
              case 3:
                scoreListResult = _context7.sent;
                realTimeScoreList = scoreListResult.data.data;
                console.log('realTimeScoreList: ', realTimeScoreList);
                _this11.realTimeScore.firstScoretypeTotal = 0;
                _this11.realTimeScore.secondScoretypeTotal = 0;
                _this11.realTimeScore.firstCampName = _this11.campList[0].campName;
                _this11.realTimeScore.secondCampName = _this11.campList[1].campName;
                for (i in realTimeScoreList) {
                  if (_this11.campList[0].campId == realTimeScoreList[i].campId) {
                    if (realTimeScoreList[i].type == 1) {
                      _this11.realTimeScore.firstScoretype1 = realTimeScoreList[i].score;
                    } else if (realTimeScoreList[i].type == 2) {
                      _this11.realTimeScore.firstScoretype2 = realTimeScoreList[i].score;
                    } else if (realTimeScoreList[i].type == 3) {
                      _this11.realTimeScore.firstScoretype3 = realTimeScoreList[i].score;
                    }
                    _this11.realTimeScore.firstScoretypeTotal += realTimeScoreList[i].score;
                  } else {
                    if (realTimeScoreList[i].type == 1) {
                      _this11.realTimeScore.secondScoretype1 = realTimeScoreList[i].score;
                    } else if (realTimeScoreList[i].type == 2) {
                      _this11.realTimeScore.secondScoretype2 = realTimeScoreList[i].score;
                    } else if (realTimeScoreList[i].type == 3) {
                      _this11.realTimeScore.secondScoretype3 = realTimeScoreList[i].score;
                    }
                    _this11.realTimeScore.secondScoretypeTotal += realTimeScoreList[i].score;
                  }
                }
                _this11.$refs.showRealTimeScore.open();
              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
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
      console.log('dataSecond: ', dataSecond);
      this.campList.push(dataSecond);
    },
    getFinalSummary: function getFinalSummary() {
      var _this12 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var queryScoreData, res;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                queryScoreData = {
                  verdictRecordId: _this12.verdictRecordId
                };
                _context8.next = 3;
                return (0, _verdictRecord.getSummaryScore)(queryScoreData);
              case 3:
                res = _context8.sent;
                _this12.chartRound = _this12.chessRoundLimit;
                console.log('res: ', res);
                _this12.summaryScoreData = res.data.data;
                _this12.$refs.finalSummary.open();
              case 8:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 150:
/*!***************************************************************************************************!*\
  !*** D:/chess/code/new-wargame-uniapp/pages/verdict/detail.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=style&index=0&lang=scss& */ 151);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 151:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/chess/code/new-wargame-uniapp/pages/verdict/detail.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[144,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/verdict/detail.js.map