[在线演示,左侧导航栏](https://static-mp-c3d2938e-a10f-4b38-b1d5-791a37326313.next.bspapp.com/webUI/#/)

# props

| 属性                    | 类型            | 默认      | 必须  | 说明         |
| --------------------- | ------------- | ------- | --- | ---------- |
| active                | string/number | -       | 是   | 当前值        |
| treeList              | `item[]`      | -       | 是   | 下拉列表       |
| color                 | string        | #ffffff | 否   | 默认文案颜色     |
| selectColor           | string        | #409eff | 否   | 选中文案颜色     |
| backgroundColor       | string        | #304156 | 否   | 背景色        |
| selectBackgroundColor | string        | -       | 否   | 选中背景色      |
| hoverColor            | string        | -       | 否   | 鼠标壹移上去文案颜色 |
| hoverBackgroundColor  | string        | #1e2732 | 否   | 鼠标移上去背景色   |
| collapse              | boolean       | false   | 否   | 是否折叠       |



## item

| 属性         | 类型            | 必须  | 说明                          |
| ---------- | ------------- | --- | --------------------------- |
| text       | string        | 是   | 选项名称                        |
| value      | string/number | 是   | 选项值                         |
| icon       | string        | 否   | 默认图标，支持图片、字体图标              |
| selectIcon | string        | 否   | 选中图标，若无则以icon为主，字体图标选中颜色同文案 |
| chidrens   | `item[]`      | 否   | 子集                          |

# emits

| 事件        | 说明               |
| --------- | ---------------- |
| menuClick | 菜单点击事件，回调参数为item |



# slots

无

# event

无
