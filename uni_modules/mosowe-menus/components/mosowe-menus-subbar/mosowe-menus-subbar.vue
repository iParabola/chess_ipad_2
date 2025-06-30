<!--
 
 author:mosowe
 createTime: 2023-04-01 15:42:13
-->

<template>
  <view
    class="mosowe-menus-subbar"
    :style="{
      '--m-menu-item-color': color,
      '--m-menu-item-select-color': selectColor,
      '--m-menu-item-background-color': backgroundColor,
      '--m-menu-item-select-background-color': selectBackgroundColor,
      '--m-menu-item-hover-color': hoverColor || color,
      '--m-menu-item-hover-background-color': hoverBackgroundColor || selectBackgroundColor
    }"
  >
    <view class="mosowe-menus-subbar-title" @mouseenter="mouseenter" @mouseleave="mouseleave">
      <mosowe-menus-item
        :isOne="isOne"
        :collapse="collapse"
        :item="data"
        @menuItemClick="menuSubbarClick"
      ></mosowe-menus-item>

      <text
        v-if="!collapse"
        class="right-icon uni-icons-arrowdown"
        :class="{
          open: showSubList
        }"
      ></text>
      <view class="collapse-position-title" v-show="showTooltip">{{ data.text }}</view>
    </view>
    <!-- 下拉菜单 -->
    <view
      :class="{
        'mosowe-menus-subbar-list-position': collapse
      }"
    >
      <view
        class="mosowe-menus-subbar-list"
        :style="{
          height: showHeight
        }"
      >
        <view ref="mosoweMenusSubbarList">
          <template v-for="item in data.childrens">
            <mosowe-menus-item
              v-if="!item.childrens || !item.childrens.length"
              :item="item"
              :current="current"
              @menuItemClick="menuItemClick"
            ></mosowe-menus-item>
            <mosowe-menus-subbar
              v-else
              :data="item"
              :current="current"
              :collapse="collapse"
              :subCurrents="subCurrents"
              @menuItemClick="menuItemClick"
              @menuSubbarClick="menuSubbarClick"
            ></mosowe-menus-subbar>
          </template>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  inject: [
    'treeList',
    'color',
    'selectColor',
    'backgroundColor',
    'selectBackgroundColor',
    'hoverColor',
    'hoverBackgroundColor'
  ],
  props: {
    data: {
      type: Object,
      default: () => ({
        text: '',
        value: '',
        icon: '',
        childrens: []
      })
    },
    isOne: {
      type: Boolean,
      default: false
    },
    collapse: {
      type: Boolean,
      default: false
    },
    current: {
      type: String,
      default: ''
    },
    subCurrents: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showSubList: false,
      listHeight: 0,
      showHeight: 0,
      showTooltip: false
    };
  },
  created() {
    this.$nextTick(() => {
      this.listHeight = this.$refs.mosoweMenusSubbarList.$el.clientHeight + 'px';
      this.showSubList = this.subCurrents.includes(this.data.value);
    });
  },
  watch: {
    showSubList() {
      this.showHeight = this.listHeight;
      let t = setTimeout(
        () => {
          clearTimeout(t);
          t = null;
          this.showHeight = this.showSubList ? 'auto' : 0;
        },
        this.showSubList ? 200 : 0
      );
      if (this.showSubList) {
        this.showTooltip = false;
      }
    },
    subCurrents() {
      this.showSubList = this.subCurrents.includes(this.data.value);
    }
  },
  methods: {
    // 点击分组菜单
    menuItemClick(item) {
      this.$emit('menuItemClick', item);
    },
    // 点击分组标题-非collapse
    menuSubbarClick(value) {
      if (Array.isArray(value)) {
        this.$emit('menuSubbarClick', [this.data.value, ...value]);
      } else {
        this.$emit('menuSubbarClick', !this.showSubList ? [this.data.value] : []);
      }
    },
    // 鼠标移入-collapse
    mouseenter() {
      if (!this.collapse) {
        return;
      }
      if (this.showSubList) {
        this.showTooltip = false;
      } else {
        this.showTooltip = true;
      }
    },
    // 鼠标移除-collapse
    mouseleave() {
      if (!this.collapse) {
        return;
      }
      this.showTooltip = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.mosowe-menus-subbar {
  position: relative;
  .mosowe-menus-subbar-title {
    position: relative;
    .right-icon {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: #fff;
      font-size: 16px;
      transition: all 0.2s;
      &.open {
        transform: rotate(-180deg) translateY(50%);
      }
    }
  }
  .mosowe-menus-subbar-list {
    overflow: hidden;
    transform: translate3d(0, 0, 0);
    transition: 0.2s all;
    background-color: var(--m-menu-item-background-color);
  }
  .mosowe-menus-subbar-list-position {
    position: absolute;
    left: 100%;
    top: 0;
    width: 240px;
  }
  .hidden {
    height: 0 !important;
  }
  .collapse-position-title {
    position: absolute;
    left: 130%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    padding: 5px 10px;
    white-space: nowrap;
    &::after {
      display: block;
      content: '';
      width: 0;
      height: 0;
      border: 5px solid;
      border-color: transparent rgba(0, 0, 0, 0.8) transparent transparent;
      position: absolute;
      left: -10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
