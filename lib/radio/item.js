/*
 * @Author: senze.fan
 * @Date: 2017-10-09 09:22:06
 * @Description: Radio List Item
 */
import React, { Component } from 'react'
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  PixelRatio
} from 'react-native'
import PropTypes from 'prop-types'
import Symbol from '../symbol'

const borderWidth = 1 / PixelRatio.get()
const s = StyleSheet.create({
  itemWrapper: {
    height: 44,
    flex: 1,
    paddingHorizontal: 15,
    borderBottomWidth: borderWidth,
    borderColor: '#eee',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default class RadioItem extends Component {
  static propTypes = {
    dataSource: PropTypes.object.isRequired, // data source, 数据源, 默认数组单元格式 { label: '', value: '', isChecked: Boolean }
    labelName: PropTypes.string.isRequired, // 指定数据源每个数据单元对应的label的key名
    valName: PropTypes.string.isRequired, // 指定数据源每个数据单元对应的value的key名
    onSubmit: PropTypes.func.isRequired, // 提交触发的函数
    checkedColor: PropTypes.string.isRequired, // 选中的颜字体颜色
    itemStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]) // 每一个选项的样式
  }

  shouldComponentUpdate (nextProps, nextState) {
    return false
  }

  /**
   * @desc 渲染内容
   */
  _renderContent = () => {
    const { labelName, checkedColor, itemStyle, dataSource } = this.props
    const { isChecked } = dataSource
    const color = isChecked ? (checkedColor || '#1394F6') : '#021D33'
    return (
      <View style={[s.itemWrapper, itemStyle]}>
        <Text style={{ fontSize: 15, color }} allowFontScaling={false} numberOfLines={1}>{dataSource[labelName]}</Text>
        {
          isChecked && <Symbol color={checkedColor || '#0C90FF'} />
        }
      </View>
    )
  }

  /**
   * @desc 选中Item
   */
  _checkedItem = () => {
    const { labelName, valName, onSubmit, dataSource } = this.props
    onSubmit({
      [labelName]: dataSource[labelName],
      [valName]: dataSource[valName]
    })
  }

  render () {
    return (
      <TouchableHighlight
        style={{ flex: 1 }}
        underlayColor='#F7F7FA'
        activeOpacity={0.8}
        onPress={this._checkedItem}
      >
        {this._renderContent()}
      </TouchableHighlight>
    )
  }
}
