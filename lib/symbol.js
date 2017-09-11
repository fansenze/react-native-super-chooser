/*
 * @Author: senze.fan
 * @Date: 2017-09-08 15:15:15
 * @Last Modified by: senze.fan
 * @Last Modified time: 2017-09-11 09:27:04
 * @desc: symbol
 */
import React, { Component } from 'react'
import { ART, View } from 'react-native'
import PropTypes from 'prop-types'

const { Surface, Group, Shape, Path } = ART

export default class Symbol extends Component {
  static propTypes = {
    color: PropTypes.string, // 符号颜色, transparent表示不显示符号
    showCircle: PropTypes.bool, // 是否显示圆圈
    backgroundColor: PropTypes.string, // 圆圈背景颜色
    borderColor: PropTypes.string // 圆圈边框颜色
  }

  /**
   * @desc 渲染圆
   */
  drawCircle = () => {
    const { showCircle, backgroundColor, borderColor } = this.props
    if (!showCircle) return null
    const path = new Path().moveTo(12, 1).arc(0, 22, 11).arc(0, -22, 11).close()
    return <Shape d={path} stroke={borderColor || '#C4C6CF'} fill={backgroundColor || '#fff'} strokeWidth={1} />
  }
  /**
   * @desc 渲染勾
   */
  drawTick = () => {
    const { color } = this.props
    if (color === 'transparent') return null
    const path = new Path().moveTo(7, 12.5).lineTo(10, 16).lineTo(17.5, 8.5).lineTo(10, 15).close()
    return <Shape d={path} stroke={color || '#000'} strokeWidth={1.5} />
  }


  render () {
    return (
      <View style={this.props.style}>
        <Surface width={24} height={24}>
          {this.drawCircle()}
          {this.drawTick()}
        </Surface>
      </View>
    );
  }
}
