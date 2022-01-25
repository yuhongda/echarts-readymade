import React, { useContext } from 'react'
import Big from 'big.js'
import cloneDeep from 'lodash/cloneDeep'
import type { ChartProps, LegendPosition, Field } from '@echarts-readymade/core'
import { mergeOption, buildChartOption, numberWithCommas } from '@echarts-readymade/core'
import ReactEcharts from 'echarts-for-react'

export interface BarHorizontalChartProps extends ChartProps {
  yAxisData?: any[]
  legendPosition?: LegendPosition
}

export const BarHorizontal: React.FC<BarHorizontalChartProps> = (props) => {
  const {
    context,
    dimension,
    compareDimension,
    valueList,
    echartsSeries,
    yAxisData,
    setOption,
    ...restSettings
  } = props
  const { data, echartsOptions, echartsOptionsBase: chartOption, userOptions } = useContext(context)
  const { option, ...resetOptions } = echartsOptions || {}

  if (!data) {
    return null
  }

  const _dimension = dimension && dimension.slice(0, 1)
  const _chartOption = cloneDeep(chartOption || {})

  if (_chartOption) {
    const _preProcessData: any[] = []
    let _processData: any[] = []
    let compareDimensionValues = []
    let _seriesValueList: any = []

    if (compareDimension && compareDimension.length > 0) {
      // 对比维度全量值
      compareDimensionValues = [
        ...new Set(data.map((d) => d[compareDimension[0] && compareDimension[0].fieldKey]))
      ]

      // 按维度分组
      data.forEach((d) => {
        const _index = _preProcessData.findIndex(
          (item) => item.name == (_dimension && d[_dimension?.[0].fieldKey])
        )
        if (_index != -1) {
          _preProcessData[_index].data.push(d)
        } else {
          _preProcessData.push({
            name: _dimension && d[_dimension?.[0].fieldKey],
            data: [d]
          })
        }
      })

      // 在维度分组基础上，分组对比维度
      _processData = compareDimensionValues.map((item) => {
        return {
          name: `${item}`,
          data: _preProcessData.map((pd) => {
            const v = pd.data.find(
              (d: any) => d[compareDimension[0] && compareDimension[0].fieldKey] == item
            )
            return v || {}
          })
        }
      })

      for (let i = 0; i < _processData.length; i++) {
        let compareDimensionName = _processData[i].name
        _processData[i].data = _processData[i].data.reverse()

        valueList?.forEach((v) => {
          _seriesValueList.push({
            name:
              valueList.length > 1
                ? `${compareDimensionName}-${v.fieldName}`
                : compareDimensionName,
            type: 'bar',
            barGap: 0,
            barMaxWidth: 60,
            lineStyle: {
              shadowColor: 'rgba(0,0,0,0.15)',
              shadowBlur: 3,
              shadowOffsetX: 0,
              shadowOffsetY: 1
            },
            data: _processData[i].data.map((d: any) => {
              let _value: Big | number = 0
              if (d[v.fieldKey] != null) {
                _value = new Big(d[v.fieldKey])

                if (v.isPercent) {
                  _value = _value.times(100)
                }

                _value = _value.round(v.decimalLength || 0).toNumber()
              }

              return {
                value: _value,
                label: {
                  show: true,
                  position: 'right',
                  fontSize: 10,
                  formatter: function (params: any) {
                    try {
                      return params.value != null && !isNaN(params.value)
                        ? `${numberWithCommas(
                            params.value.toFixed(
                              typeof v.decimalLength == 'number' ? v.decimalLength : 0
                            )
                          )}${v.isPercent ? '%' : ''}`
                        : `--${v.isPercent ? '%' : ''}`
                    } catch {
                      return params.value || `--${v.isPercent ? '%' : ''}`
                    }
                  }
                },
                isPercent: v.isPercent
              }
            })
          })
        })
      }
    } else {
      // 无对比维度
      let _data = cloneDeep(data) || []
      _data = _data.reverse()

      _seriesValueList = valueList?.map((v, i) => {
        return {
          name: v.fieldName,
          type: 'bar',
          barGap: 0,
          barMaxWidth: 60,
          data: _data.map((d) => {
            let _value: Big | number = 0
            if (d[v.fieldKey] != null) {
              _value = new Big(d[v.fieldKey])

              if (v.isPercent) {
                _value = _value.times(100)
              }

              _value = _value.round(v.decimalLength || 0).toNumber()
            }

            return {
              value: _value,
              label: {
                show: true,
                position: 'right',
                fontSize: 10,
                formatter: function (params: any) {
                  try {
                    return params.value != null && !isNaN(params.value)
                      ? `${numberWithCommas(
                          params.value.toFixed(
                            typeof v.decimalLength == 'number' ? v.decimalLength : 0
                          )
                        )}${v.isPercent ? '%' : ''}`
                      : `--${v.isPercent ? '%' : ''}`
                  } catch {
                    return params.value || `--${v.isPercent ? '%' : ''}`
                  }
                }
              },
              isPercent: v.isPercent
            }
          })
        }
      })
    }

    let _dataYAxis = [
      ...new Set(
        data.map((d) => {
          return _dimension && d[_dimension[0] && _dimension[0].fieldKey]
        })
      )
    ]

    _chartOption.xAxis = {
      type: 'value',
      axisLabel: {
        rotate: 30
      },
      axisLine: {
        show: true,
        lineStyle: {}
      },
      axisTick: {
        show: true,
        lineStyle: {}
      }
    }

    _chartOption.yAxis = [
      {
        type: 'category',
        splitLine: {
          show: false,
          lineStyle: {}
        },
        axisLine: {
          show: true,
          lineStyle: {}
        },
        axisTick: {
          show: true,
          lineStyle: {}
        },
        axisLabel: {
          rotate: 30
        },
        data: yAxisData || _dataYAxis
      }
    ]

    _chartOption.series = _seriesValueList
  }

  const builtOption = buildChartOption(_chartOption, restSettings, 'bar-horizontal')
  let options = mergeOption(builtOption, userOptions)

  if (setOption) {
    options = setOption(cloneDeep(options))
  }

  return (
    <>
      <ReactEcharts
        option={{ ...cloneDeep(options) }}
        notMerge={true}
        opts={{ renderer: 'svg' }}
        style={{ height: '100%', width: '100%' }}
        {...resetOptions}
      />
    </>
  )
}
