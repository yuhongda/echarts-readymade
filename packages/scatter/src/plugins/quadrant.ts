/* eslint-disable no-nested-ternary */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-underscore-dangle */
import type { EChartsOption, MarkLineComponentOption } from 'echarts'
import cloneDeep from 'clone'

export type QuadrantSettingOptionProps =
  | {
      show: boolean
      bgColors: string[]
      quadrant1Name: string
      quadrant2Name: string
      quadrant3Name: string
      quadrant4Name: string
      quadrantType: 'median' | 'equal' | 'max' | 'min' | 'average'
    }
  | undefined
export const quadrantSetting = (option: EChartsOption, quadrantSettingOption: QuadrantSettingOptionProps): void => {
  if (quadrantSettingOption && quadrantSettingOption.show) {
    const _data =
      Array.isArray(option.series) && option.series?.length
        ? (cloneDeep(option.series[0].data) as any[])
        : null
    const len = _data && _data.length

    if (len) {
      // 象限图相关
      const { quadrantType, quadrant1Name, quadrant2Name, quadrant3Name, quadrant4Name, bgColors } =
        quadrantSettingOption
      let maxX = 0
      let maxY = 0
      let medianX = 0
      let medianY = 0

      // 计算最大最小值
      _data.map((item: any) => {
        maxX = Math.max(item.value[0], maxX)
        maxY = Math.max(item.value[1], maxY)
        return item
      })

      // 计算中位数
      if (len && quadrantType === 'median') {
        const medianXDataList = cloneDeep(_data).sort(
          (prev: { value: number[] }, next: { value: number[] }) => prev.value[0] - next.value[0]
        )
        const medianYDataList = cloneDeep(_data).sort(
          (prev: { value: number[] }, next: { value: number[] }) => prev.value[1] - next.value[1]
        )
        medianX =
          len % 2 === 1
            ? medianXDataList[Math.floor(len / 2)]?.value[0]
            : (medianXDataList[Math.floor(len / 2) - 1]?.value[0] +
                medianXDataList[Math.floor(len / 2)]?.value[0]) /
              2
        medianY =
          len % 2 === 1
            ? medianYDataList[Math.floor(len / 2)]?.value[1]
            : (medianYDataList[Math.floor(len / 2) - 1]?.value[1] +
                medianYDataList[Math.floor(len / 2)]?.value[1]) /
              2
      }

      option.xAxis = option.xAxis || {}

      if (!Array.isArray(option.xAxis)) {
        option.xAxis.max = maxX
      }
      option.grid = option.grid || {}
      if (!Array.isArray(option.grid)) {
        option.grid.right = 70
      }

      if (Array.isArray(option.series) && option.series?.[0]) {
        option.series[0].markLine = {
          ...option.series[0].markLine,
          ...{
            silent: true,
            symbol: 'none',
            label: {
              show: false
            },
            lineStyle: {
              normal: {
                color: 'rgba(255,255,255,0.5)',
                // color: 'rgba(0,0,0,0.5)',
                type: 'dotted',
                width: 1
              }
            },
            data:
              quadrantType === 'equal'
                ? [
                    [
                      { xAxis: '0', yAxis: `${maxY / 2}` },
                      { xAxis: 'max', yAxis: `${maxY / 2}` }
                    ],
                    [
                      { xAxis: `${maxX / 2}`, yAxis: '0' },
                      { xAxis: `${maxX / 2}`, yAxis: 'max' }
                    ]
                  ]
                : [
                    {
                      type: quadrantType,
                      valueIndex: 0
                    },
                    {
                      valueIndex: 1,
                      type: quadrantType
                    }
                  ]
          }
        }
        option.series[0].markArea = {
          ...option.series[0].markArea,
          ...{
            silent: true,
            label: {
              position: 'insideTop'
            },
            data: [
              [
                {
                  name: quadrant1Name,
                  itemStyle: {
                    color: bgColors[0]
                  },
                  xAxis:
                    quadrantType === 'equal'
                      ? `${maxX / 2}`
                      : quadrantType === 'median'
                      ? `${medianX}`
                      : quadrantType,
                  yAxis:
                    quadrantType === 'equal'
                      ? `${maxY / 2}`
                      : quadrantType === 'median'
                      ? `${medianY}`
                      : quadrantType
                },
                {
                  xAxis: 'max',
                  yAxis: 'max'
                }
              ],
              [
                {
                  name: quadrant2Name,
                  itemStyle: {
                    color: bgColors[1]
                  },
                  xAxis:
                    quadrantType === 'equal'
                      ? `${maxX / 2}`
                      : quadrantType === 'median'
                      ? `${medianX}`
                      : quadrantType,
                  yAxis: 0
                },
                {
                  xAxis: 'max',
                  yAxis:
                    quadrantType === 'equal'
                      ? `${maxY / 2}`
                      : quadrantType === 'median'
                      ? `${medianY}`
                      : quadrantType
                }
              ],
              [
                {
                  name: quadrant4Name,
                  itemStyle: {
                    color: bgColors[3]
                  },
                  xAxis: 0,
                  yAxis:
                    quadrantType === 'equal'
                      ? `${maxY / 2}`
                      : quadrantType === 'median'
                      ? `${medianY}`
                      : quadrantType
                },
                {
                  xAxis:
                    quadrantType === 'equal'
                      ? `${maxX / 2}`
                      : quadrantType === 'median'
                      ? `${medianX}`
                      : quadrantType,
                  yAxis: 'max'
                }
              ],
              [
                {
                  name: quadrant3Name,
                  itemStyle: {
                    color: bgColors[2]
                  },
                  xAxis: 0,
                  yAxis: 0
                },
                {
                  xAxis:
                    quadrantType === 'equal'
                      ? `${maxX / 2}`
                      : quadrantType === 'median'
                      ? `${medianX}`
                      : quadrantType,
                  yAxis:
                    quadrantType === 'equal'
                      ? `${maxY / 2}`
                      : quadrantType === 'median'
                      ? `${medianY}`
                      : quadrantType
                }
              ]
            ]
          }
        }
      }
    }
  }
}
