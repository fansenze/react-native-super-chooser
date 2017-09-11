# react-native-super-chooser

## Getting Started  

### Installation  
```shell
yarn add react-native-super-chooser
  or
npm i react-native-super-chooser
```
#### 本组件依赖 react-native 原生Art组件
> Android默认就包含ART库，IOS需要单独添加依赖库。
+ 在你自己项目的xcode中右键点击项目 -> ‘Add Files to ProjectName -> 选择 node_modules/react-native/React/Libraries/ART/ART.xcodeproj’
+ 将 libART.a 添加到 Linked Frameworks and Libraries  

----

### Props
| name | type | value | defaultValue | desc |
|:----:|:----:|:-----:|:------------:|:----:|
|       dataSource      |    Array     |            |         |  isRequired, 数据源, 默认数组子元素单元格式 { label: '', value: '' } |
|       labelName       |    String    |            | 'label' |  数据源内元素对应的展示字段label的key  |
|       valName         |    String    |            | 'value' |  数据源内元素对应的value的key  |
|       multiple        |    Boolean   | true/false |  false  |  是否开启多选模式  |
| isRemoveWhileSelected |    Boolean   | true/false |  false  |  选中的单元是否从列表中删除，多选模式时无效  |
|     showCancelBtn     |    Boolean   | true/false |  false  |  是否显示取消按钮  |
|       defaultVal      | Array/Object |            |         |  默认选中项 (多选模式未开启时，传入数组的话，只选中数组第一位)  |
|       onSubmit        |    Function  |            |         |  提交触发的函数  |
|       onCancel        |    Function  |            |         |  取消触发的函数  |
|       submitBtn       |    Element   |            |         |  自定义渲染提交按钮  |
|       cancelBtn       |    Element   |            |         |  自定义渲染取消按钮  |
|       numColumns      |    Number    |            |    1    |  与 React-Native 原生组件 Flat 的 numColumns 相同 (其大与1，且为多选模式时，每一个列表项勾选icon不存在) |
|   columnWrapperStyle  |    Object    |            |         |  与 React-Native 原生组件 Flat 的 columnWrapperStyle 相同  |
|       duration        |    Number    |            |   300   |  背景动画效果持续时间  |
|       position        |'top'/'bottom'|            |  'top'  |  选择框的定位  |
|    backgroundColor    |    String    |            | rgba(0, 0, 0, 0.3) |  遮罩层颜色  |
|    containerStyle     |    Object    |            |         |  chooser外部容器 自定义样式  |
|       contentStyle    |    Object    |            |         |  select内容 自定义样式  |
|       checkedColor    |    String    |            |'#2296F3'|  选中的颜字体颜色  |
|       itemStyle       |    Object    |            |         |  每一个选项的样式  |
----

