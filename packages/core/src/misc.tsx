import type { EChartsOption } from 'echarts-for-react'
import Big from 'big.js'

export const COLOR_LIST = [
  '#FF7C7C',
  '#ADD4EF',
  '#BFDAA7',
  '#FCAC65',
  '#C6C1D2',
  '#7598E4',
  '#CF6D6C',
  '#4979CF',
  '#E1934B',
  '#829649',
  '#7D70AC',
  '#2559B7'
]

export const echartsOptionsBase: any = {
  title: {
    show: true,
    text: '',
    top: 30,
    left: 24,
    textAlign: 'left',
    textStyle: {
      color: 'rgba(0,0,0,0.65)',
      fontSize: 16,
      lineHeight: 1
    }
  },
  grid: {
    x: 30,
    x2: 30,
    top: 90,
    bottom: 30,
    containLabel: true
  },
  toolbox: { show: false },
  tooltip: {
    show: true,
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.9)',
    extraCssText:
      'box-shadow:  0px 0px 4px 0px rgba(0,0,0,0.25); border-radius: 2px; padding:10px 14px',
    formatter: function (data: any) {
      const _data = Array.isArray(data) ? data : [data]

      const _len = Big(_data.length)
      const _count = _len.div(10).round(0, Big.roundUp).toNumber()

      return `<div style="color: #c8c8c8;">${
        _data[0].name
      }</div><div style="column-count: ${_count};">${_data
        .map((d: any) => {
          switch (d.seriesType) {
            case 'pie':
              return `<div>
                      <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${
                        d.color
                      }"></span>
                      <span style="color: #595959;">${d.seriesName}:</span>
                      <span style="color: #262626;">${
                        d.data.isShowPercentValue
                          ? d.percent + '%'
                          : d.data.value == null
                          ? '--'
                          : d.data.isPercent
                          ? d.data.value + '%'
                          : Big(d.data.value).toFixed(
                              d.data.decimalLength != null ? d.data.decimalLength : 2
                            )
                      }</span>
                  </div>`
            case 'line':
              return `<div>
                      <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${
                        d.color
                      }"></span>
                      <span style="color: #595959;">${d.seriesName}:</span>
                      <span style="color: #262626;">${
                        d.data.value == null
                          ? '--'
                          : d.data.isPercent
                          ? d.data.value != null
                            ? `${d.data.value}%`
                            : `--`
                          : Big(d.data.value).toFixed(
                              d.data.decimalLength != null ? d.data.decimalLength : 2
                            )
                      }</span>
                  </div>`
            default:
              return `<div>
                      <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${
                        d.color
                      }"></span>
                      <span style="color: #595959;">${d.seriesName}:</span>
                      <span style="color: #262626;">${
                        d.data.value == null
                          ? '--'
                          : d.data.isPercent
                          ? d.data.value + '%'
                          : Big(d.data.value).toFixed(
                              d.data.decimalLength != null ? d.data.decimalLength : 2
                            )
                      }</span>
                  </div>`
          }
        })
        .join('')}</div>`
    }
  },
  xAxis: {
    type: 'category',
    offset: 0,
    axisLine: {
      show: true,
      lineStyle: {
        color: '#D9D9D9'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {}
    },
    splitLine: {
      show: false,
      lineStyle: {}
    },
    axisLabel: {
      rotate: 45,
      align: 'right',
      textStyle: {
        color: '#8C8C8C'
      }
    },
    data: []
  },
  yAxis: [
    {
      show: true,
      type: 'value',
      name: '',
      // scale: true,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#E7EAEF',
          type: 'dashed'
        }
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#D9D9D9'
        }
      },
      axisLabel: {
        textStyle: {
          color: '#8C8C8C'
        }
      },
      axisTick: {
        show: false,
        lineStyle: {}
      }
      // min: 0,
    },
    {
      show: false,
      type: 'value',
      name: '',
      // scale: true,
      splitLine: {
        show: false,
        lineStyle: {}
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#D9D9D9'
        }
      },
      axisLabel: {
        textStyle: {
          color: '#8C8C8C'
        }
      },
      axisTick: {
        show: false,
        lineStyle: {}
      }
      // min: 0,
    }
  ],
  color: COLOR_LIST,
  textStyle: {},
  legend: {
    itemWidth: 10,
    itemHeight: 10,
    top: 30,
    left: 24,
    selectedMode: false,
    textStyle: {
      padding: [2, 0, 0, 0]
    },
    show: true,
    type: 'scroll',
    position: 'bottom',
    fontSize: 12,
    icon: 'circle'
  },
  series: null
}

export const mergeOption = (
  baseOptions: EChartsOption,
  userOptions: EChartsOption = {}
): EChartsOption => {
  const _baseOptions = baseOptions || {}
  const _userOptions = userOptions || {}
  const _mergeOptions = {
    ..._baseOptions,
    ..._userOptions
  }
  return _mergeOptions
}

export const truncate = (str: string, n: number) => {
  const r = /[^\x00-\xff]/g
  let m

  if (!str) {
    return ''
  }

  if (str.replace(r, '**').length > n) {
    m = Math.floor(n / 2)

    for (let i = m, l = str.length; i < l; i++) {
      if (str.slice(0, i).replace(r, '**').length >= n) {
        return str.slice(0, i) + '...'
      }
    }
  }

  return str
}

export function numberWithCommas(x: string | number) {
  if (!x) {
    return '--'
  }
  const parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}
