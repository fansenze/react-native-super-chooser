/*
 * @Author: senze.fan
 * @Date: 2017-09-08 10:45:42
 * @Last Modified by: senze.fan
 * @Last Modified time: 2017-09-14 16:40:05
 * @desc: react-native-super-chooser
 */
import React, { Component } from 'react'
import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native'
import PropTypes from 'prop-types'
import RadioList from './radio_list'
import CheckBoxList from './checkbox_list'
import { isStr, isBool, isIncludes, cbFns } from './utils'

const { width, height } = Dimensions.get('window')

const s = StyleSheet.create({
  container: {
    width,
    ...Platform.select({
      ios: {
        height
      },
      android: {
        // 安卓5.0以下版本(及api版本小于21)时, 状态栏无法沉浸式，所以减去状态栏高度, 5.0以上默认屏幕高度
        height: Platform.Version < 21 ? height - 20 : height
      }
    }),
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: 'transparent'
  },
  content: {
    height: 210,
    backgroundColor: '#F7F7FA'
  }
})

export default class SuperChooser extends Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired, // data source, 数据源, 默认每个数组元素格式 { label: '', value: '' }
    labelName: PropTypes.string, // 指定数据源每个数据单元对应的label的key名
    valName: PropTypes.string, // 指定数据源每个数据单元对应的value的key名
    multiple: PropTypes.bool, // 是否开启多选模式, 默认 false
    isRemoveWhileSelected: PropTypes.bool, // 选中的单元是否从列表中删除，多选模式时无效
    showCancelBtn: PropTypes.bool, // 是否显示取消按钮
    defaultVal: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]), // 默认选中项，多选模式未开启时，传入数组的话，只选中数组第一位
    onSubmit: PropTypes.func, // 提交触发的函数
    onCancel: PropTypes.func, // 取消触发的函数
    submitBtn: PropTypes.element, // 自定义渲染提交按钮
    cancelBtn: PropTypes.element, // 自定义渲染取消按钮
    numColumns: PropTypes.number, // 与 React-Native 原生组件 Flat 的 numColumns 相同, 大与1时，每一个列表项icon不存在
    btnContainerStyle: PropTypes.object, // 按钮容器 自定义样式
    columnWrapperStyle: PropTypes.object, // 与 React-Native 原生组件 Flat 的 columnWrapperStyle 相同
    duration: PropTypes.number, // 背景动画效果持续时间, 默认 300
    position: PropTypes.oneOf(['top', 'bottom']), // 选择框的定位, 默认: top
    backgroundColor: PropTypes.string, // 遮罩层颜色， 默认 rgba(0, 0, 0, 0.3)
    containerStyle: PropTypes.object, // chooser外部容器 自定义样式
    contentStyle: PropTypes.object, // chooser内容 自定义样式
    checkedColor: PropTypes.string, // 选中的颜字体颜色
    itemStyle: PropTypes.object // 每一个选项的样式
  }

  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      conf: this.initConf(this.props),
      fade: new Animated.Value(0)
    }
  }

  /**
   * @desc 配置信息初始化
   * @param  {Object} props
   * @return {Object} 返回正确配置的对象
   */
  initConf = (props) => {
    const {
      backgroundColor,
      containerStyle,
      contentStyle,
      checkedColor,
      itemStyle,
      duration,
      position,
      numColumns,
      columnWrapperStyle,
      multiple,
      isRemoveWhileSelected,
      showCancelBtn,
      labelName,
      valName,
      defaultVal,
      dataSource,
      submitBtn,
      onCancel,
      btnContainerStyle,
      cancelBtn
    } = props

    if (containerStyle && containerStyle.top && !containerStyle.height) {
      // containerStyle中的top值存在，height不存在时，自动改变高度
      containerStyle.height = height - containerStyle.top
    }

    const _labelName = isStr(labelName, 'label')
    const _valName = isStr(valName, 'value')
    const _multiple = isBool(multiple, false)
    const _isRemoveWhileSelected = _multiple ? false : isBool(isRemoveWhileSelected, false)
    const _dataSource = this.initDataSource(dataSource, defaultVal, _labelName, _valName, _isRemoveWhileSelected, _multiple)

    return {
      backgroundColor: isStr(backgroundColor, 'rgba(0, 0, 0, .3)'),
      containerStyle: containerStyle || {},
      contentStyle: contentStyle || {},
      checkedColor: isStr(checkedColor, '#2296F3'),
      itemStyle: itemStyle || {},
      duration: duration >= 0 ? duration : 222,
      position: isIncludes(['top', 'bottom'], position, 'top'),
      numColumns: numColumns > 1 ? Number(numColumns) : 1,
      btnContainerStyle: btnContainerStyle || {},
      columnWrapperStyle: columnWrapperStyle || {},
      multiple: _multiple,
      isRemoveWhileSelected: _isRemoveWhileSelected,
      showCancelBtn: isBool(showCancelBtn, false),
      labelName: _labelName,
      valName: _valName,
      dataSource: _dataSource,
      submitBtn,
      onCancel: cbFns(onCancel, () => this.setVisible(false)),
      cancelBtn
    }
  }

  /**
   * @desc 转换成指定的数据源
   * @param  {Array} dataSource // 源数据
   * @param  {Array, Object} defaultVal // 默认选中的单元
   * @param  {String} labelName
   * @param  {String} valName
   * @param  {Boolean} isRemoveWhileSelected // 是否从转换后的数据源中删除选中项
   * @param  {Boolean} multiple // 是否为多选模式，单选模式的时候，只取defaultVal的第一个值
   * @return {Array} 返回对应格式的数组
   */
  initDataSource = (dataSource, defaultVal, labelName, valName, isRemoveWhileSelected, multiple) => {
    if (!defaultVal) {
      return dataSource.slice().map(e => {
        return {
          ...e,
          isChecked: false
        }
      })
    }
    // 判断默认选中是不是数组，最终转化为数组格式
    const _defaultVal = Array.isArray(defaultVal) ? (multiple ? defaultVal : defaultVal.slice(0, 1)) : [defaultVal]
    return dataSource.reduce((total, item) => {
      // 判断是否选中
      const isChecked = _defaultVal.some(e => e[labelName] === item[labelName] && e[valName] === item[valName])
      // 判断是否需要移除选中项
      if (!isRemoveWhileSelected || !isChecked) {
        total.push({
          ...item,
          isChecked
        })
      }
      return total
    }, [])
  }

  /**
   * @desc 设置组件可见状态
   * @param  {Boolean} status
   */
  setVisible = (status) => {
    const { visible } = this.state
    status = isBool(status, !visible)
    if (status === visible) return
    status
      ? this.setState({
        visible: status
      }, () => this._toggleAnimation(status))
      : this._toggleAnimation(status, () => {
        this.setState({
          visible: status
        })
      })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      conf: this.initConf(nextProps)
    })
  }

  /**
   * @desc 动画调用方法
   * @param  {Boolean} status, 动画开始或关闭标志
   * @param  {Function} fn, 动画结束后的回调函数
   */
  _toggleAnimation = (status, fn) => {
    Animated.timing(
      this.state.fade,
      {
        toValue: status ? 1 : 0,
        duration: this.state.conf.duration
      }
    ).start(() => {
      fn && fn()
    })
  }

  /**
   * @desc 提交选择结果
   * @param  {Object, Array} result
   */
  _onSubmit = (result = {}) => {
    const { onSubmit } = this.props
    const { conf } = this.state
    const { dataSource, labelName, valName } = conf
    const _res = Array.isArray(result) ? result : [result]
    this.setState({
      conf: Object.assign({}, conf, {
        dataSource: dataSource.slice().map(item => {
          item.isChecked = _res.some(e => item[labelName] === e[labelName] && item[valName] === e[valName])
          return item
        })
      })
    }, () => {
      this.setVisible(false)
      typeof onSubmit === 'function' && onSubmit(result)
    })
  }

  /**
   * @desc 渲染选择框内容
   * @return element
   */
  renderContent = () => {
    const {
      multiple,
      dataSource,
      labelName,
      valName,
      isRemoveWhileSelected,
      numColumns,
      showCancelBtn,
      onCancel,
      submitBtn,
      cancelBtn,
      position,
      checkedColor,
      columnWrapperStyle,
      btnContainerStyle,
      itemStyle
    } = this.state.conf
    const props = {
      dataSource,
      labelName,
      valName,
      isRemoveWhileSelected,
      numColumns,
      showCancelBtn,
      onSubmit: this._onSubmit,
      onCancel,
      submitBtn,
      cancelBtn,
      position,
      checkedColor,
      columnWrapperStyle,
      btnContainerStyle,
      itemStyle
    }
    return multiple ? <CheckBoxList {...props} /> : <RadioList {...props} />
  }

  render () {
    const { visible, conf, fade } = this.state
    const { containerStyle, contentStyle, backgroundColor, onCancel, dataSource, position } = conf
    if (!dataSource || !dataSource.length || !visible) return null
    const bottomStyle = position === 'bottom' ? { flexDirection: 'column', justifyContent: 'flex-end' } : undefined
    return (
      <Animated.View
        style={[s.container, containerStyle, { opacity: fade }]}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={onCancel}
          style={[{ flex: 1, backgroundColor }, bottomStyle]}
        >
          <View
            onStartShouldSetResponder={() => true}
            style={[s.content, contentStyle]}
          >
            {this.renderContent()}
          </View>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}
