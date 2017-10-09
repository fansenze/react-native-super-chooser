/*
 * @Author: senze.fan
 * @Date: 2017-10-09 09:39:58
 * @Last Modified by: senze.fan
 * @Last Modified time: 2017-10-09 10:54:33
 * @Description: CheckBox Item With Symbol
 */
import React, { PureComponent } from 'react'
import {
  Text,
  StyleSheet,
  PixelRatio,
  TouchableOpacity
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
    alignItems: 'center'
  }
})

export default class SymbolItem extends PureComponent {
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
    return (
      <TouchableOpacity
        style={[s.itemWrapper, itemStyle]}
        underlayColor='#F7F7FA'
        onPress={this._checkedItem}
      >
        <Symbol
          color={isChecked ? '#fff' : 'transparent'}
          showCircle
          backgroundColor={isChecked ? checkedColor : '#fff'}
          borderColor={isChecked ? checkedColor : void 0}
        />
        <Text style={{ fontSize: 15, marginLeft: 10 }} numberOfLines={1}>{dataSource[labelName]}</Text>
      </TouchableOpacity>
    )
  }
}
