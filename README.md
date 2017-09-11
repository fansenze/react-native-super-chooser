# react-native-super-chooser

## Getting Started  

### Installation  
```shell
yarn add react-native-super-chooser
  or
npm i react-native-super-chooser
```
#### 本组件依赖 react-native 提供的Art库
> Android默认就包含ART库，IOS需要单独添加依赖库。
+ 在你自己项目的xcode中右键点击项目 -> ‘Add Files to ProjectName -> 选择 node_modules/react-native/React/Libraries/ART/ART.xcodeproj’
+ 将 libART.a 添加到 Linked Frameworks and Libraries  

----

### Props
| name | type | value | defaultValue | desc |
|:----:|:----:|:-----:|:------------:|:----:|
|       dataSource      |    Array     |            |         |  isRequired, 数据源, 默认数组子元素格式 { label: '', value: '' } |
|       labelName       |    String    |            | 'label' |  数据源内元素对应的展示字段label的key  |
|       valName         |    String    |            | 'value' |  数据源内元素对应的value的key  |
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

### Example

> 基础调用, 单选
```javascript
const data = [
  { label: 'fisrt', value: 1 },
  { label: 'second', value: 2 },
  { label: 'third', value: 3 },
  { label: 'fourth', value: 4 },
  { label: 'fifth', value: 5 },
  { label: 'sixth', value: 6 }
]

<SuperChooser
  ref={(e) => { this._SuperChooser = e }}
  dataSource={data}
  onSubmit={(item) => console.log('onSubmit: ', item)}
  contentStyle={{ paddingTop: 20, height: 300 }}
/>

本组件暴露了setVisible方法，参数类型为boolean，来进行组件的显示和隐藏调用
this._SuperChooser.setVisible(true) // 显示组件
this._SuperChooser.setVisible(false) // 隐藏组件
```
![基础调用, 单选](http://ow3gtvu02.bkt.clouddn.com/react-native-chooser/3.png?imageView2/4/w/200/h/300)  


> chooser定位到底部, 显示取消按钮, 单选
```javascript
<SuperChooser
  ref={(e) => { this._SuperChooser = e }}
  dataSource={data}
  position='bottom'
  showCancelBtn
/>
```
![chooser定位到底部, 显示取消按钮, 单选](http://ow3gtvu02.bkt.clouddn.com/react-native-chooser/4.png?imageView2/4/w/200/h/300)   

----

> 多列, 单选
```javascript
<SuperChooser
  ref={(e) => { this._SuperChooser = e }}
  dataSource={data}
  numColumns={3}
  containerStyle={{ paddingTop: 64 }}
  itemStyle={{ borderRightWidth: 0.5 }}
/>
```
![多列, 单选](http://ow3gtvu02.bkt.clouddn.com/react-native-chooser/6.png?imageView2/4/w/200/h/300)  

----

> 单列, 多选
```javascript
<SuperChooser
  ref={(e) => { this._SuperChooser = e }}
  dataSource={data}
  position='bottom'
  multiple
  containerStyle={{ paddingTop: 20 }}
  contentStyle={{ height: 300 }}
/>
```
![单列, 多选](http://ow3gtvu02.bkt.clouddn.com/react-native-chooser/5.png?imageView2/4/w/200/h/300)  

----

> 多列, 多选, 自定义选中颜色、选项样式和提交按钮, 无取消按钮（取消按钮也可以自定义哦）
```javascript
<SuperChooser
  ref={(e) => { this._SuperChooser = e }}
  dataSource={data}
  multiple
  numColumns={3}
  position='bottom'
  checkedColor='#000'
  itemStyle={{ width: 105, height: 44, flex: -1 }}
  contentStyle={{ height: 500, paddingTop: 20 }}
  submitBtn={
    <View style={{ backgroundColor: 'orange', borderRadius: 5, height: 50, width: 300, alignItems: 'center', justifyContent: 'center', marginBottom: 15 }}>
    <Text style={{ color: '#fff', fontSize: 17 }}>一顿提交操作</Text>
    </View>}
  onSubmit={(item) => console.log('自定义提交按钮 提交的结果: ', item)}
/>
```
![多列, 多选](http://ow3gtvu02.bkt.clouddn.com/react-native-chooser/7.png?imageView2/4/w/200/h/300)  

----

> 多列, 多选, 自定义选项样式, 带取消按钮， 默认选中2个选项
```javascript
<SuperChooser
  ref={(e) => { this._SuperChooser = e }}
  dataSource={data}
  multiple
  numColumns={2}
  position='bottom'
  checkedColor='#000'
  defaultVal={[{ label: 'first', value: 1 }, { label: 'sixth', value: 6 }]}
  itemStyle={{ width: 105, height: 44, flex: -1, borderColor: '#000', backgroundColor: '#eee' }}
  showCancelBtn
  columnWrapperStyle={{ justifyContent: 'space-around' }}
  contentStyle={{ height: 500, paddingTop: 20 }}
/>
```
![多列, 多选](http://ow3gtvu02.bkt.clouddn.com/react-native-chooser/8.png?imageView2/4/w/200/h/300)  
