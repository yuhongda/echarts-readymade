import React, { useContext, useState, useCallback, useImperativeHandle, forwardRef } from 'react'
import type { ECharts } from 'echarts'
import Big from 'big.js'
import cloneDeep from 'clone'
import type { ChartProps, LegendPosition } from '@echarts-readymade/core'
import { mergeOption, buildChartOption } from '@echarts-readymade/core'
import ReactEcharts from 'echarts-for-react'

export interface PieChartProps extends ChartProps {
  showInRing?: boolean
  legendPosition?: LegendPosition
}

export const Pie = forwardRef<
  {
    getEchartsInstance: () => ECharts | undefined
  },
  PieChartProps
>((props, ref) => {
  const { context, dimension, valueList, echartsSeries, showInRing, setOption, ...restSettings } =
    props
  const { data, echartsOptions, echartsOptionsBase: chartOption, userOptions } = useContext(context)
  const { option, ...resetOptions } = echartsOptions || {}

  if (!data) {
    return null
  }

  const getCenter = () => {
    let _centerLeft = '50%'
    let _centerTop = '50%'
    if (props.legendPosition === 'left') {
      _centerLeft = '55%'
    } else if (props.legendPosition === 'right') {
      _centerLeft = '45%'
    } else if (props.legendPosition === 'top') {
      _centerTop = '55%'
    } else if (props.legendPosition === 'bottom') {
      _centerTop = '45%'
    }

    return {
      top: _centerTop,
      left: _centerLeft
    }
  }

  const _chartOption = cloneDeep(chartOption || {})

  _chartOption.xAxis = { show: false }
  _chartOption.yAxis = { show: false }
  let _series: any[] = []

  if (_chartOption) {
    if (dimension && dimension.length > 0) {
      // 有维度
      _series =
        (valueList &&
          valueList.slice(0, 1).map((item, i) => {
            const _sum = data?.reduce((s, c) => {
              s = s + (c[item.fieldKey] || 0)
              return s
            }, 0)

            return {
              name: dimension?.[0].fieldName,
              type: 'pie',
              minAngle: 5,
              radius: showInRing ? ['30%', '50%'] : '50%',
              center: [getCenter().left, getCenter().top],
              data: data?.map((d) => {
                let text = d[dimension?.[0].fieldKey]

                return {
                  name: text,
                  value: d[item.fieldKey]
                    ? d[item.fieldKey] != null && !isNaN(d[item.fieldKey])
                      ? d[item.fieldKey].toFixed(Math.abs(d[item.fieldKey]) > 1 ? 2 : 4)
                      : d[item.fieldKey]
                    : 0
                }
              }),
              label: {
                show: true,
                position: 'outside',
                formatter: (params: any) => {
                  const _percent = Big(params.value)
                    .round(4)
                    .div(_sum)
                    .times(100)
                    .round(2)
                    .toNumber()

                  return `${_percent || '--'}%`
                },
                fontSize: 12
              }
            }
          })) ||
        []
    } else {
      // 无维度
      const d = (data && cloneDeep(data)[0]) || {}
      const _valueListClone = cloneDeep(valueList)

      const _sum =
        _valueListClone?.reduce((s, c) => {
          s = s + (d[c.fieldKey] || 0)
          return s
        }, 0) || 0

      _series = [
        {
          name: '',
          type: 'pie',
          minAngle: 5,
          radius: showInRing ? ['30%', '50%'] : '50%',
          center: [getCenter().left, getCenter().top],
          data: _valueListClone?.map((item) => {
            return {
              name: item.fieldName,
              value: d[item.fieldKey]
                ? d[item.fieldKey] != null && !isNaN(d[item.fieldKey])
                  ? parseFloat(d[item.fieldKey]).toFixed(Math.abs(d[item.fieldKey]) > 1 ? 2 : 4)
                  : d[item.fieldKey]
                : 0,
              emphasis: {
                label: {
                  show: true
                }
              },
              label: {
                show: true,
                position: 'outside',
                formatter: (params: any) => {
                  try {
                    const _percent = Big(params.value)
                      .round(4)
                      .div(_sum)
                      .times(100)
                      .round(2)
                      .toNumber()

                    return `${_percent || '--'}%`
                  } catch (e) {
                    return '--'
                  }
                },
                fontSize: 12
              }
            }
          })
        }
      ]
    }
  }

  _chartOption.series = echartsSeries || _series
  const builtOption = buildChartOption(_chartOption, restSettings, 'pie')
  let options = mergeOption(builtOption, userOptions)

  if (setOption) {
    options = setOption(cloneDeep(options))
  }

  /**
   * forward the ref for getEchartsInstance()
   */
  const [reactEchartsNode, setReactEchartsNode] = useState<ReactEcharts | null>(null)
  const reactEchartsRef = useCallback((node) => {
    if (node !== null) {
      setReactEchartsNode(node)
    }
  }, [])
  useImperativeHandle(
    ref,
    () => ({
      getEchartsInstance: () => {
        return reactEchartsNode?.getEchartsInstance()
      }
    }),
    [reactEchartsNode]
  )

  return (
    <>
      <ReactEcharts
        ref={reactEchartsRef}
        option={{ ...cloneDeep(options) }}
        notMerge={true}
        opts={{ renderer: 'svg' }}
        style={{ height: '100%', width: '100%' }}
        {...resetOptions}
      />
    </>
  )
})
