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
      return `<div style="color: #c8c8c8;">${_data[0].name}</div><div style="column-count: ${ceil(
        _data.length / 10
      )};">${_data
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
                          ? d.data.value + (d.data.hideUnit ? '' : '%')
                          : numeral(d.data.value).format(
                              `0,0.${
                                d.data.decimalLength != null
                                  ? new Array(d.data.decimalLength).fill('0').join('')
                                  : '00'
                              }`
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
                          : numeral(d.data.value).format(
                              `0,0.${
                                d.data.decimalLength != null
                                  ? new Array(d.data.decimalLength).fill('0').join('')
                                  : '00'
                              }`
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
                          ? d.data.value + (d.data.hideUnit ? '' : '%')
                          : numeral(d.data.value).format(
                              `0,0.${
                                d.data.decimalLength != null
                                  ? new Array(d.data.decimalLength).fill('0').join('')
                                  : '00'
                              }`
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
      rotate: 0,
      align: 'center',
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
    top: 30,
    left: 24,
    selectedMode: false,
    textStyle: {
      padding: [2, 0, 0, -5]
    },
    show: true,
    position: 'bottom',
    fontSize: 12,
    icon: 'circle'
  },
  series: null
}
