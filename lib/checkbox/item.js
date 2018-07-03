/*
 * @Author: senze.fan
 * @Date: 2017-10-09 09:39:37
 * @Description: CheckBox Item No Symbol
 */
import React, { PureComponent } from 'react'
import {
  Text,
  StyleSheet,
  PixelRatio,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'

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
    alignItems: 'center'
  },
  noSymbolItem: {
    borderWidth: borderWidth,
    borderColor: '#eee',
    borderRadius: 3,
    justifyContent: 'center'
  }
})

export default class NoSymbolItem extends PureComponent {
  static propTypes = {
    dataSource: PropTypes.object.isRequired, // data source, 数据源, 默认数组单元格式 { label: '', value: '', isChecked: Boolean }
    labelName: PropTypes.string.isRequired, // 指定数据源每个数据单元对应的label的key名
    valName: PropTypes.string.isRequired, // 指定数据源每个数据单元对应的value的key名
    checkedItem: PropTypes.func.isRequired, // 提交触发的函数
    checkedColor: PropTypes.string.isRequired, // 选中的颜字体颜色
    itemStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]) // 每一个选项的样式
  }

  /**
   * @desc 选中Item
   */
  _checkedItem = () => {
    const { labelName, valName, checkedItem, dataSource } = this.props
    checkedItem({
      [labelName]: dataSource[labelName],
      [valName]: dataSource[valName]
    })
  }

  render () {
    const { labelName, checkedColor, itemStyle, dataSource } = this.props
    const { isChecked } = dataSource
    const checkedStyle = isChecked ? { backgroundColor: checkedColor } : void 0
    const textColor = isChecked ? '#fff' : '#000'
    if (typeof itemStyle === 'object' && itemStyle.width) {
      itemStyle.flex = -1
    }
    return (
      <TouchableOpacity
        style={[s.itemWrapper, s.noSymbolItem, itemStyle, checkedStyle]}
        onPress={this._checkedItem}
      >
        <Text style={{ fontSize: 15, color: textColor }} numberOfLines={1}>{dataSource[labelName]}</Text>
      </TouchableOpacity>
    )
  }
}
