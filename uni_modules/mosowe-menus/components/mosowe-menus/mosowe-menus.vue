<!-- 多级菜单组件 -->
<template>
  <view class="mosowe-menus-component">
    <template v-for="item in treeList">
      <mosowe-menus-item
        v-if="!item.childrens || !item.childrens.length"
        :item="item"
        isOne
        :collapse="collapse"
        :current="active"
        @menuItemClick="menuItemClick"
      ></mosowe-menus-item>
      <mosowe-menus-subbar
        v-else
        :data="item"
        isOne
        :collapse="collapse"
        :current="active"
        :subCurrents="showSubMenuCurrents"
        @menuItemClick="menuItemClick"
        @menuSubbarClick="menuSubbarClick"
      ></mosowe-menus-subbar>
    </template>
  </view>
</template>

<script>
// import { sessions } from '@mosowe2/js';
export default {
  name: 'mosowe-menus',
  props: {
    treeList: {
      type: Array,
      default: () => []
    },
    collapse: {
      type: Boolean,
      default: false
    },
    active: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#ffffff'
    },
    selectColor: {
      type: String,
      default: '#409eff'
    },
    backgroundColor: {
      type: String,
      default: '#304156'
    },
    selectBackgroundColor: {
      type: String,
      default: ''
    },
    hoverColor: {
      type: String,
      default: ''
    },
    hoverBackgroundColor: {
      type: String,
      default: '#1e2732'
    }
  },
  watch: {
    collapse() {
      if (this.collapse) {
        this.showSubMenuCurrents = [];
      }
    }
  },
  provide() {
    // 使用函数的形式，可以访问到 `this`
    return {
      treeList: this.treeList,
      color: this.color,
      selectColor: this.selectColor,
      backgroundColor: this.backgroundColor,
      selectBackgroundColor: this.selectBackgroundColor,
      hoverColor: this.hoverColor,
      hoverBackgroundColor: this.hoverBackgroundColor
    };
  },
  data() {
    return {
      showSubMenuCurrents: []
    };
  },
  created() {
    this.$nextTick(() => {
      this.getMenuParentValue();
      window.addEventListener('click', this.watchClick);
    });
  },
  onUnload() {
    window.removeEventListener('click', this.watchClick);
  },
  methods: {
    // 初始时，获取菜单父级value数组
    getMenuParentValue() {
      const list = this.getValueByKeyForObject({
        value: this.active,
        source: this.treeList,
        valueKey: 'value',
        targetKey: 'value',
        treeDataAll: true,
        treeChildKey: 'childrens'
      })[0];
      this.showSubMenuCurrents = list?.replace('/' + this.active, '').split('/');
    },
    menuItemClick(item) {
      if (this.collapse) {
        this.showSubMenuCurrents = [];
      }
      this.$emit('menuClick', item);
    },
    menuSubbarClick(values) {
      this.showSubMenuCurrents = values;
    },
    watchClick(e) {
      const classNames = e.path
        .map(item => {
          return item.className;
        })
        .join(',');
      // 页面上左键点击事件处理
      if (classNames.indexOf('mosowe-menus-component') === -1 && this.collapse) {
        this.showSubMenuCurrents = [];
      }
    },
    // 根据特定值，返回相关的父级数据
    getValueByKeyForObject(options) {
      if (!options) {
        return [];
      }
      const {
        value,
        source,
        valueKey,
        targetKey,
        treeDataAll = false,
        treeChildKey = 'leaf'
      } = options;
      let treePrefix = '';
      let result = [];
      if (!(value ?? '') || !source || !valueKey || !targetKey) {
        ZoRequiredKey(options, ['value', 'source', 'valueKey', 'targetKey']);
        return [];
      }
      let val = value;
      if (typeof value === 'string') {
        val = [value];
      }
      // 树数据处理
      const treeDeal = data => {
        if (data[treeChildKey]) {
          // 是个树
          let r = this.getValueByKeyForObject({
            ...options,
            source: data[treeChildKey]
          });
          if (treeDataAll && r.length) {
            // 需要返回父级数据
            treePrefix = data[targetKey];
            r = r.map(item => {
              return treePrefix + '/' + item;
            });
          }
          result.push(...r);
        }
      };
      if (Object.prototype.toString.call(source) === '[object Object]') {
        // object类型，假设是树
        if (val.includes(source[valueKey])) {
          result.push(source[targetKey]);
        }
        treeDeal(source);
      } else {
        // 数组，也可能是数组树
        source.forEach(item => {
          if (Object.prototype.toString.call(item) === '[object Object]') {
            // object类型，假设是树
            if (val.includes(item[valueKey])) {
              result.push(item[targetKey]);
            }
            treeDeal(item); // 树处理
          }
          if (Array.isArray(item)) {
            // 多维数组
            result.push(
              ...this.getValueByKeyForObject({
                ...options,
                source: item
              })
            );
          }
        });
      }
      return result;
    }
  }
};
</script>

<style lang="scss">
.mosowe-menus-component {
}
</style>
