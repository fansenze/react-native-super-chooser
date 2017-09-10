/*
 * @Author: senze.fan
 * @Date: 2017-09-10 15:14:57
 * @Last Modified by: senze.fan
 * @Last Modified time: 2017-09-10 17:42:01
 * @desc: 
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  PixelRatio,
  Animated,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native'
import PropTypes from 'prop-types'
import Symbol from './symbol'

const borderWidth = 1 / PixelRatio.get()

const s = StyleSheet.create({
  btnWrapper: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    borderTopWidth: borderWidth,
    borderColor: '#eee'
  },
  btn: {
    height: 44,
    flex: 1,
    marginBottom: 15,
    backgroundColor: '#2296F3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3
  },
  cancelBtn: {
    backgroundColor: '#fff',
    borderColor: '#021D33',
    borderWidth: borderWidth,
    marginLeft: 15
  },
  text: {
    fontSize: 17,
    color: '#fff'
  },
  flatList: {
    flex: 1
  },
  itemWrapper: {
    height: 44,
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: borderWidth,
    borderColor: '#eee',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  noSymbolItem: {
    borderWidth: borderWidth,
    borderColor: '#eee',
    borderRadius: 3,
    justifyContent: 'center'
  },
  columnWrapperStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 7.5,
    paddingBottom: 7.5
  }
})

export default class CheckBoxList extends Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired, // data source, 数据源, 默认数组单元格式 { label: '', value: '' }
    labelName: PropTypes.string.isRequired, // 指定数据源每个数据单元对应的label的key名
    valName: PropTypes.string.isRequired, // 指定数据源每个数据单元对应的value的key名
    numColumns: PropTypes.number, // 与 React-Native 原生组件 Flat 的 numColumns 相同, 大与1时，每一个列表项icon不存在
    columnWrapperStyle: PropTypes.object, // 与 React-Native 原生组件 Flat 的 columnWrapperStyle 相同
    onSubmit: PropTypes.func.isRequired, // 提交触发的函数
    onCancel: PropTypes.func.isRequired, // 取消触发的函数
    submitBtn: PropTypes.element, // 自定义渲染提交按钮
    showCancelBtn: PropTypes.bool.isRequired, // 是否显示取消按钮, 若已自定义渲染，则该项无效
    cancelBtn: PropTypes.element, // 自定义渲染取消按钮
    position: PropTypes.oneOf(['top', 'bottom']), // 选择框的定位, 默认: top
    checkedColor: PropTypes.string.isRequired, // 选中的颜字体颜色
    itemStyle: PropTypes.object // 每一个选项的样式
  }

  constructor (props) {
    super(props)
    this.state = {
      dataSource: this.props.dataSource.slice()
    }
  }
  
  /**
   * @desc 选中项目
   * @param  {Object} item
   */
  _checkedItem = (item) => {
    const { labelName, valName } = this.props
    this.setState({
      dataSource: this.state.dataSource.slice().map(e => {
        e[labelName] === item[labelName] && e[valName] === item[valName] && (e.isChecked = !e.isChecked)
        return e
      })
    })
  }

  /**
   * @desc 提交函数
   */
  _onSubmit = () => {
    const checkedItems = this.state.dataSource.filter(e => e.isChecked)
    this.props.onSubmit(checkedItems)
  }

  /**
   * @desc 渲染列表
   */
  renderList = () => {
    const { numColumns, labelName, valName, itemStyle, columnWrapperStyle } = this.props
    const { dataSource } = this.state
    return (
      <FlatList
        style={s.flatList}
        data={dataSource}
        renderItem={this.renderItem}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? [s.columnWrapperStyle, columnWrapperStyle] : void 0}
        keyExtractor={(item, index) => item[labelName] + item[valName]}
      />
    )
  }

  /**
   * @desc 渲染列表单元
   */
  renderItem = ({ item }) => this.props.numColumns > 1 ? this.renderNoSymbolItem({ item }) : this.renderSymbolItem({ item })

  /**
   * @desc 渲染有勾选icon的单元
   */
  renderSymbolItem = ({ item }) => {
    const { labelName, valName, onSubmit, checkedColor, itemStyle, numColumns } = this.props
    const { isChecked } = item
    return (
      <TouchableOpacity
        style={[s.itemWrapper, itemStyle]}
        underlayColor='#F7F7FA'
        onPress={() => {
          this._checkedItem({
            [labelName]: item[labelName],
            [valName]: item[valName]
          })
        }}
      >
        <Symbol
          color={isChecked ? '#fff' : 'transparent'}
          showCircle
          backgroundColor={isChecked ? checkedColor : '#fff'}
          borderColor={isChecked ? checkedColor : void 0}
        />
        <Text style={{ fontSize: 15, marginLeft: 10 }}>{item[labelName]}</Text>
      </TouchableOpacity>
    )
  }

  /**
   * @desc 渲染没有勾选icon的单元
   */
  renderNoSymbolItem = ({ item }) => {
    const { labelName, valName, onSubmit, checkedColor, itemStyle, numColumns } = this.props
    const { isChecked } = item
    const checkedStyle = isChecked ? { backgroundColor: checkedColor } : void 0
    const textColor = isChecked ? '#fff' : '#000'
    if (typeof itemStyle === 'object' && itemStyle.width) {
      itemStyle.flex = -1
    }
    return (
      <TouchableOpacity
        style={[s.itemWrapper, s.noSymbolItem, checkedStyle, itemStyle]}
        onPress={() => {
          this._checkedItem({
            [labelName]: item[labelName],
            [valName]: item[valName]
          })
        }}
      >
        <Text style={{ fontSize: 15, color: textColor }}>{item[labelName]}</Text>
      </TouchableOpacity>
    )
  }

  /**
   * @desc 渲染取消按钮
   */
  renderCancelBtn = () => {
    const { showCancelBtn, cancelBtn, onCancel } = this.props
    if (cancelBtn) return <TouchableOpacity onPress={onCancel}>{cancelBtn}</TouchableOpacity>
    if (!showCancelBtn) return null
    return (
      <TouchableOpacity
        style={[s.btn, s.cancelBtn]}
        onPress={onCancel}
      >
        <Text style={[s.text, { color: '#021D33' }]} allowFontScaling={false}>取消</Text>
      </TouchableOpacity>
    )
  }
  /**
   * @desc 渲染提交按钮
   */
  renderSubmitBtn = () => {
    const { submitBtn } = this.props
    if (submitBtn) return <TouchableOpacity onPress={this._onSubmit}>{submitBtn}</TouchableOpacity>
    return (
      <TouchableOpacity
        style={s.btn}
        onPress={this._onSubmit}
        activeOpacity={0.7}
      >
        <Text style={s.text} allowFontScaling={false}>确认</Text>
      </TouchableOpacity>
    )
  }

  /**
   * @desc 渲染按钮模块
   */
  renderBtn = () => {
    return (
      <View style={s.btnWrapper}>
        {this.renderSubmitBtn()}
        {this.renderCancelBtn()}
      </View>
    )
  }
  
  render () {
    return (
      <View style={{ flex: 1 }}>
        {this.renderList()}
        {this.renderBtn()}
      </View>
    )
  }
}
