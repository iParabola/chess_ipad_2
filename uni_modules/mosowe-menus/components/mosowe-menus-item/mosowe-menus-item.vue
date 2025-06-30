<!--
 
 author:mosowe
 createTime: 2023-04-01 14:20:27
-->

<template>
  <view
    class="mosowe-menus-item"
    :class="{
      current: current === item.value
    }"
    :style="{
      '--m-menu-item-color': color,
      '--m-menu-item-select-color': selectColor,
      '--m-menu-item-background-color': backgroundColor,
      '--m-menu-item-select-background-color': selectBackgroundColor,
      '--m-menu-item-hover-color': hoverColor || color,
      '--m-menu-item-hover-background-color': hoverBackgroundColor || selectBackgroundColor,
      'padding-left': paddingLeft
    }"
    @click="menuItemClick"
  >
    <template v-if="icon">
      <!-- 图片图标 -->
      <template v-if="icon && icon.indexOf('/') > -1">
        <image :src="icon" class="image-icon menu-icon"></image>
      </template>
      <!-- 字体图标 -->
      <template v-else>
        <text :class="icon" class="text-icon menu-icon"></text>
      </template>
    </template>
    <text v-if="!icon && isOne && collapse">{{ item.text.substring(0, 1) }}</text>
    <text class="text" v-if="!collapse">{{ item.text }}</text>
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
    current: {
      type: String,
      default: ''
    },
    isOne: {
      type: Boolean,
      default: false
    },
    collapse: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => ({
        text: '',
        value: '',
        icon: ''
      })
    }
  },
  data() {
    return {
      rootMenu: {
        NavMenu: [],
        SubMenu: []
      }
    };
  },
  computed: {
    icon() {
      const icon =
        this.current === this.item.value && this.item.selectIcon
          ? this.item.selectIcon
          : this.item.icon;
      return icon;
    },
    paddingLeft() {
      return 15 + 15 * this.rootMenu.SubMenu.length + 'px';
    }
  },
  created() {
    this.$nextTick(() => {
      this.getParentAll('mosowe-menus-subbar-list', this);
    });
  },
  methods: {
    menuItemClick() {
      this.$emit('menuItemClick', this.item);
    },
    getParentAll(name, parent) {
      parent = this.getParent(name, parent);
      if (parent) {
        this.rootMenu.SubMenu.push(parent);
        this.getParentAll(name, parent);
      }
    },
    getParent(name, parent, type) {
      parent = parent.$parent;
      let parentClassName = parent.$el.className;
      while (parentClassName.indexOf(name) === -1) {
        parent = parent.$parent;
        if (!parent) return false;
        parentClassName = parent.$el.className;
      }
      return parent;
    }
  }
};
</script>

<style lang="scss" scoped>
.mosowe-menus-item {
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  padding-left: 15px;
  padding-right: 15px;
  cursor: pointer;
  color: var(--m-menu-item-color);
  background-color: var(--m-menu-item-background-color);
  .menu-icon {
    font-size: 18px;
    margin-right: 5px;
    display: inline-block;
    vertical-align: middle;
    &.image-icon {
      width: 18px;
      height: 18px;
    }
  }
  .text {
    display: inline-block;
    vertical-align: middle;
  }
  &.current {
    color: var(--m-menu-item-select-color);
    background-color: var(--m-menu-item-select-background-color);
    &:hover {
      color: var(--m-menu-item-select-color);
      // background-color: var(--m-menu-item-select-background-color);
    }
  }
  &:hover {
    color: var(--m-menu-item-hover-color);
    background-color: var(--m-menu-item-hover-background-color);
  }
}
</style>
