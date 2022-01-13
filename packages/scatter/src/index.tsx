import React, { useContext, useState, useCallback } from 'react'
import { multiply, round, divide, add, abs, fix } from 'mathjs/number'
import cloneDeep from 'lodash/cloneDeep'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import type { ChartProps, LegendPosition, Field } from '@echarts-readymade/core'
import { mergeOption, buildChartOption, COLOR_LIST, truncate } from '@echarts-readymade/core'
import { ScatterChart } from 'echarts/charts'
import {
  GridSimpleComponent,
  GridComponent,
  SingleAxisComponent,
  GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  AxisPointerComponent,
  BrushComponent,
  TitleComponent,
  TimelineComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
  LegendComponent,
  LegendScrollComponent,
  LegendPlainComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,
  AriaComponent,
  TransformComponent,
  DatasetComponent
} from 'echarts/components'

import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'
import { EChartsOption } from 'echarts-for-react'

echarts.use([
  ScatterChart,
  CanvasRenderer,
  SVGRenderer,
  GridSimpleComponent,
  GridComponent,
  SingleAxisComponent,
  GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  AxisPointerComponent,
  BrushComponent,
  TitleComponent,
  TimelineComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
  LegendComponent,
  LegendScrollComponent,
  LegendPlainComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,
  AriaComponent,
  TransformComponent,
  DatasetComponent
])

export interface ScatterChartProps extends ChartProps {
  /**
   * 图例位置
   */
  legendPosition?: LegendPosition
}

export const Scatter: React.FC<ScatterChartProps> = (props) => {
  const {
    context,
    dimension,
    compareDimension,
    valueList,
    echartsSeries,
    setOption,
    ...restSettings
  } = props
  const { data, echartsOptions, echartsOptionsBase: chartOption, userOptions } = useContext(context)
  const { option, ...resetOptions } = echartsOptions || {}

  if (!data) {
    return null
  }

  const _dimension = dimension && dimension.slice(0, 1)
  const _valueList = valueList && valueList.slice(0, 3)
  const _chartOption = cloneDeep(chartOption || {})

  if (!_dimension || !_valueList || _dimension.length < 1 || _valueList.length < 2) {
    return null
  }

  const [dataZoomX, setDataZoomX] = useState<{ start: number; end: number } | null>(null)
  const [dataZoomY, setDataZoomY] = useState<{ start: number; end: number } | null>(null)
  if (_chartOption) {
    if (compareDimension && compareDimension.length > 0) {
      // 有对比维度
      let _preProcessData: { name: string; data: any[] }[] = []
      let _processData: { name: string; data: any[] }[] = []
      let compareDimensionValues: string[] = []
      let dotValueMin = 0
      let dotValueMax = 0

      // 对比维度全量值
      compareDimensionValues = [
        ...new Set<string>(
          data?.map((d: any) => d[compareDimension[0] && compareDimension[0].fieldKey])
        )
      ]

      // 按维度分组
      data?.forEach((d: any) => {
        const _index = _preProcessData.findIndex(
          (item) => item.name == d[_dimension[0] && _dimension[0].fieldKey]
        )
        if (_index != -1) {
          _preProcessData[_index].data.push(d)
        } else {
          _preProcessData.push({
            name: d[_dimension[0] && _dimension[0].fieldKey],
            data: [d]
          })
        }
      })

      // 在维度分组基础上，分组对比维度
      _processData = compareDimensionValues.map((item) => {
        return {
          name: item,
          data: _preProcessData.map((pd) => {
            const v = pd.data.find(
              (d) => d[compareDimension[0] && compareDimension[0].fieldKey] == item
            )

            if (v) {
              // 有散点值字段， valueList的第三个字段
              if (valueList.length == 3) {
                dotValueMin = Math.min(v[valueList[2].fieldKey], dotValueMin)
                dotValueMax = Math.max(v[valueList[2].fieldKey], dotValueMax)
              }

              return v
            } else {
              const _v: { [key: string]: string } = {}
              _v[_dimension[0] && _dimension[0].fieldKey] = pd.name
              return _v
            }
          })
        }
      })

      // 散点颜色
      let userColorFromSetOption: string[] | null = null
      if (setOption) {
        const option = setOption({})
        userColorFromSetOption = option.color
      }

      const getColor = useCallback(
        (index: number) => {
          let userColor = userOptions.color

          if (userColorFromSetOption) {
            return userColorFromSetOption[index % userColorFromSetOption.length]
          } else if (userColor) {
            return userColor[index % userColor.length]
          } else {
            return COLOR_LIST[index % COLOR_LIST.length]
          }
        },
        [userOptions.color, userColorFromSetOption]
      )

      // 散点大小
      const minSymbolSize = 50
      const maxSymbolSize = 100
      const getSymbolSize = useCallback(
        (dotValue: number) => {
          const scale = divide(dotValueMax - dotValueMin, maxSymbolSize - minSymbolSize) || 1
          return _valueList.length === 3
            ? round(divide(dotValue - dotValueMin, scale) + minSymbolSize, 2)
            : 80
        },
        [getColor]
      )

      _chartOption.grid.x = 70
      _chartOption.grid.x2 = 130
      _chartOption.grid.top = 50
      _chartOption.grid.bottom = 130
      _chartOption.xAxis.name = _valueList[0].fieldName
      _chartOption.xAxis.nameLocation = 'center'
      _chartOption.xAxis.nameTextStyle = {
        color: '#666'
      }
      _chartOption.xAxis.nameGap = 40
      _chartOption.xAxis.type = 'value'
      _chartOption.xAxis.show = true
      _chartOption.xAxis.axisLabel.formatter = (value: any) => {
        return `${value}${_valueList[0].isPercent ? '%' : ''}`
      }

      _chartOption.yAxis[0].show = true

      _chartOption.yAxis[0].name = _valueList[1].fieldName
      // _chartOption.yAxis[0].nameRotate = -90;
      _chartOption.yAxis[0].nameGap = 60
      _chartOption.yAxis[0].nameLocation = 'center'
      _chartOption.yAxis[0].nameTextStyle = {
        color: '#666'
      }
      _chartOption.yAxis[0].axisLabel.formatter = (value: any) => {
        return `${value}${_valueList[1].isPercent ? '%' : ''}`
      }

      _chartOption.xAxis.boundaryGap = ['1%', '1%']
      _chartOption.xAxis.axisLine.show = false
      _chartOption.xAxis.axisTick.show = false
      _chartOption.xAxis.offset = 20
      _chartOption.yAxis[0].axisLine.show = false
      _chartOption.yAxis[0].axisTick.show = false
      _chartOption.yAxis[0].boundaryGap = ['1%', '1%']
      _chartOption.yAxis[0].offset = 20

      _chartOption.tooltip = {
        show: true,
        trigger: 'item',
        backgroundColor: 'rgba(255,255,255,0.9)',
        extraCssText:
          'box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.25); border-radius: 2px; padding:10px 14px',
        formatter: (item: any) => {
          return `<div style="color: #c8c8c8;">
                  <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${
                    item.color
                  }"></span>
                  <span>${truncate(item.name, 6)}:</span>
                  <div><span style="color: #595959;">${
                    _valueList[0].fieldName
                  }</span>:<span style="color: #262626;">${item.value[0]}${
            _valueList[0].isPercent ? '%' : ''
          }</span></div>
                  <div><span style="color: #595959;">${
                    _valueList[1].fieldName
                  }</span>:<span style="color: #262626;">${item.value[1]}${
            _valueList[1].isPercent ? '%' : ''
          }</span></div>
              </div>`
        }
      }

      _chartOption.series =
        echartsSeries ||
        _processData.map((pd, i: number) => {
          const _d =
            (pd.data &&
              pd.data.map((d: any, j: number) => {
                const itemColor = getColor(i)

                let _value = _valueList.map((v: Field) => {
                  let _v = 0
                  if (d[v.fieldKey] != null) {
                    _v = d[v.fieldKey]
                    if (v.isPercent) {
                      _v = multiply(d[v.fieldKey], 100)
                    }
                    _v = round(_v, v.decimalLength || 0)
                  }
                  return _v
                })

                return {
                  name: pd.name + '-' + d[_dimension[0].fieldKey],
                  value: _value,
                  itemStyle: {
                    color: itemColor
                  },
                  label: {
                    show: true,
                    position: 'inside',
                    color: '#000',
                    formatter: (params: any) => {
                      const {
                        data: { name }
                      } = params
                      return truncate(name, 6)
                    },
                    fontSize: 12,
                    rich: {
                      text: {
                        color: '#000'
                      }
                    }
                  }
                }
              })) ||
            []

          return {
            name: pd.name,
            type: 'scatter',
            symbolSize: (item: any[]) => {
              return item[2] != null ? getSymbolSize(item[2]) : 20
            },
            data: _d
          }
        })

      let xMin = 0,
        xMax = 0,
        yMin = 0,
        yMax = 0

      _processData?.forEach((item) => {
        item.data.forEach((d) => {
          xMin = Math.min(round(d[_valueList[0].fieldKey] || 0, 0), xMin)
          xMax = Math.max(round(d[_valueList[0].fieldKey] || 0, 0), xMax)
          yMin = Math.min(round(d[_valueList[1].fieldKey] || 0, 0), yMin)
          yMax = Math.max(round(d[_valueList[1].fieldKey] || 0, 0), yMax)
        })
      })

      if (_valueList[0].isPercent) {
        xMin = multiply(xMin, 100)
        xMax = multiply(xMax, 100)
      }

      if (_valueList[1].isPercent) {
        yMin = multiply(yMin, 100)
        yMax = multiply(yMax, 100)
      }

      const _dataZoom: any = [
        // {
        //   type: 'inside',
        //   show: true,
        //   xAxisIndex: [0],
        //   bottom: 30,
        //   start: 0,
        //   end: 100,
        //   labelFormatter: '',
        // },
        // {
        //   type: 'inside',
        //   show: true,
        //   yAxisIndex: [0],
        //   right: 0,
        //   start: 0,
        //   end: 100,
        //   labelFormatter: '',
        // },
      ]

      if (dataZoomX) {
        _dataZoom.push({
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          bottom: 30,
          start: dataZoomX.start,
          end: dataZoomX.end,
          throttle: 150
        })
      } else {
        _dataZoom.push({
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          bottom: 30,
          startValue: xMin || 0,
          endValue: (xMax && add(xMax, abs(fix(multiply(xMax, 0.1))))) || 100,
          throttle: 150
        })
      }

      if (dataZoomY) {
        _dataZoom.push({
          type: 'slider',
          show: true,
          yAxisIndex: [0],
          right: 30,
          start: dataZoomY.start,
          end: dataZoomY.end
        })
      } else {
        _dataZoom.push({
          type: 'slider',
          show: true,
          yAxisIndex: [0],
          right: 30,
          startValue: yMin || 0,
          endValue: yMax || 100
        })
      }

      _chartOption.dataZoom = _dataZoom

      // 为了使dataZoom中x轴的endValue生效，这里要设置下x轴的max
      _chartOption.xAxis.max = (xMax && add(xMax, abs(fix(multiply(xMax, 0.1))))) || 100
      _chartOption.yAxis[0].max = (yMax && add(yMax, abs(fix(multiply(yMax, 0.1))))) || 100
      _chartOption.xAxis.axisLabel.formatter = (value: any) => {
        if (xMax <= 100 && value > 100) {
          return ''
        }
        return `${value}${_valueList[0].isPercent ? '%' : ''}`
      }
      _chartOption.yAxis[0].axisLabel.formatter = (value: any) => {
        if (yMax <= 100 && value > 100) {
          return ''
        }
        return `${value}${_valueList[1].isPercent ? '%' : ''}`
      }
    } else {
      // 无对比维度
      const processedData = data?.map((d) => {
        const values: any[] = new Array(_valueList.length).fill(0)

        _valueList.map((v: Field, i: number) => {
          if (d[v.fieldKey] != null) {
            values[i] = d[v.fieldKey]
            if (v.isPercent) {
              values[i] = multiply(d[v.fieldKey], 100)
            }
            values[i] = round(values[i], v.decimalLength || 0)
          }
        })

        return [...values, d[_dimension[0].fieldKey]]
      })

      let userColorFromSetOption: string[] | null = null
      if (setOption) {
        const option = setOption({})
        userColorFromSetOption = option.color
      }

      const getColor = useCallback(
        (index: number) => {
          let userColor = userOptions.color

          if (userColorFromSetOption) {
            return userColorFromSetOption[index % userColorFromSetOption.length]
          } else if (userColor) {
            return userColor[index % userColor.length]
          } else {
            return COLOR_LIST[index % COLOR_LIST.length]
          }
        },
        [userOptions.color, userColorFromSetOption]
      )

      const minSymbolSize = 50
      const maxSymbolSize = 100
      const getSymbolSize = useCallback(
        (list: any[]) => {
          const symbolList = list
            .map((item) => item[2])
            .sort((value1: number, value2: number) => {
              return value1 - value2
            })
          const min = symbolList[0]
          const max = symbolList[symbolList.length - 1]
          const scale = divide(max - min, maxSymbolSize - minSymbolSize) || 1

          list.forEach((item, index) => {
            item[4] =
              _valueList.length === 3 ? round(divide(item[2] - min, scale) + minSymbolSize, 2) : 80
            item[5] = getColor(index)
          })
          return list
        },
        [getColor]
      )

      _chartOption.grid.x = 70
      _chartOption.grid.x2 = 130
      _chartOption.grid.top = 50
      _chartOption.grid.bottom = 130
      _chartOption.xAxis.name = _valueList[0].fieldName
      _chartOption.xAxis.nameLocation = 'center'
      _chartOption.xAxis.nameTextStyle = {
        color: '#666'
      }
      _chartOption.xAxis.nameGap = 40
      _chartOption.xAxis.type = 'value'
      _chartOption.xAxis.show = true
      _chartOption.xAxis.axisLabel.formatter = (value: any) => {
        return `${value}${_valueList[0].isPercent ? '%' : ''}`
      }

      _chartOption.yAxis[0].show = true

      _chartOption.yAxis[0].name = _valueList[1].fieldName
      // _chartOption.yAxis[0].nameRotate = -90;
      _chartOption.yAxis[0].nameGap = 60
      _chartOption.yAxis[0].nameLocation = 'center'
      _chartOption.yAxis[0].nameTextStyle = {
        color: '#666'
      }
      _chartOption.yAxis[0].axisLabel.formatter = (value: any) => {
        return `${value}${_valueList[1].isPercent ? '%' : ''}`
      }

      _chartOption.xAxis.boundaryGap = ['1%', '1%']
      _chartOption.xAxis.axisLine.show = false
      _chartOption.xAxis.axisTick.show = false
      _chartOption.xAxis.offset = 20
      _chartOption.yAxis[0].axisLine.show = false
      _chartOption.yAxis[0].axisTick.show = false
      _chartOption.yAxis[0].boundaryGap = ['1%', '1%']
      _chartOption.yAxis[0].offset = 20

      _chartOption.tooltip = {
        show: true,
        trigger: 'item',
        backgroundColor: 'rgba(255,255,255,0.9)',
        extraCssText:
          'box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.25); border-radius: 2px; padding:10px 14px',
        formatter: (item: any) => {
          return `<div style="color: #c8c8c8;">
                  <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${
                    item.color
                  }"></span>
                  <span>${truncate(item.name, 6)}:</span>
                  <div><span style="color: #595959;">${
                    _valueList[0].fieldName
                  }</span>:<span style="color: #262626;">${item.value[0]}${
            _valueList[0].isPercent ? '%' : ''
          }</span></div>
                  <div><span style="color: #595959;">${
                    _valueList[1].fieldName
                  }</span>:<span style="color: #262626;">${item.value[1]}${
            _valueList[1].isPercent ? '%' : ''
          }</span></div>
              </div>`
        }
      }

      _chartOption.series = echartsSeries || [
        {
          type: 'scatter',
          symbolSize: (data: any[]) => {
            return data[4]
          },
          itemStyle: {
            normal: {
              color: (seriesIndex: any) => {
                return seriesIndex.value[5]
              }
            }
          },
          data: getSymbolSize(processedData || []).map((item) => {
            return {
              name: `${item[3]}`,
              value: item,
              label: {
                show: true,
                position: 'inside',
                color: '#000',
                formatter: (params: any) => {
                  const {
                    data: { name }
                  } = params
                  return truncate(name, 6)
                },
                fontSize: 12,
                rich: {
                  text: {
                    color: '#000'
                  }
                }
              }
            }
          })
        }
      ]

      let xMin = processedData && processedData[0] && processedData[0][0],
        xMax = processedData && processedData[0] && processedData[0][0],
        yMin = processedData && processedData[0] && processedData[0][1],
        yMax = processedData && processedData[0] && processedData[0][1]

      processedData?.forEach((item) => {
        xMin = Math.min(item[0], xMin)
        xMax = Math.max(item[0], xMax)
        yMin = Math.min(item[1], yMin)
        yMax = Math.max(item[1], yMax)
      })

      const _dataZoom: any = [
        // {
        //   type: 'inside',
        //   show: true,
        //   xAxisIndex: [0],
        //   bottom: 30,
        //   start: 0,
        //   end: 100,
        //   labelFormatter: '',
        // },
        // {
        //   type: 'inside',
        //   show: true,
        //   yAxisIndex: [0],
        //   right: 0,
        //   start: 0,
        //   end: 100,
        //   labelFormatter: '',
        // },
      ]

      if (dataZoomX) {
        _dataZoom.push({
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          bottom: 30,
          start: dataZoomX.start,
          end: dataZoomX.end,
          throttle: 150
        })
      } else {
        _dataZoom.push({
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          bottom: 30,
          startValue: xMin || 0,
          endValue: (xMax && add(xMax, abs(fix(multiply(xMax, 0.1))))) || 100,
          throttle: 150
        })
      }

      if (dataZoomY) {
        _dataZoom.push({
          type: 'slider',
          show: true,
          yAxisIndex: [0],
          right: 30,
          start: dataZoomY.start,
          end: dataZoomY.end
        })
      } else {
        _dataZoom.push({
          type: 'slider',
          show: true,
          yAxisIndex: [0],
          right: 30,
          startValue: yMin || 0,
          endValue: yMax || 100
        })
      }
      _chartOption.dataZoom = _dataZoom

      // 为了使dataZoom中x轴的endValue生效，这里要设置下x轴的max
      _chartOption.xAxis.max = (xMax && add(xMax, abs(fix(multiply(xMax, 0.1))))) || 100
      _chartOption.xAxis.axisLabel.formatter = (value: any) => {
        if (xMax <= 100 && value > 100) {
          return ''
        }
        return `${value}${_valueList[0].isPercent ? '%' : ''}`
      }
    }
  }

  const builtOption = buildChartOption(_chartOption, restSettings, 'scatter')
  let options = mergeOption(builtOption, userOptions)

  if (setOption) {
    options = setOption(cloneDeep(options))
  }

  const onDataZoomChange = useCallback((params: any) => {
    if (params.dataZoomId == '\u0000series\u00000\u00000') {
      setDataZoomX({
        start: params?.start,
        end: params?.end
      })
    } else if (params.dataZoomId == '\u0000series\u00001\u00000') {
      setDataZoomY({
        start: params?.start,
        end: params?.end
      })
    }
  }, [])

  const onEvents = {
    datazoom: onDataZoomChange
  }

  return (
    <>
      <ReactEChartsCore
        echarts={echarts}
        option={{ ...cloneDeep(options) }}
        notMerge={true}
        opts={{ renderer: 'svg' }}
        style={{ height: '100%', width: '100%' }}
        onEvents={onEvents}
        {...resetOptions}
      />
    </>
  )
}
