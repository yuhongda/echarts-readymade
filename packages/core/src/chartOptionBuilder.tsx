import type { EChartsOption } from 'echarts-for-react'
import { truncate } from './misc'

type ChartSettings = {
  legendPosition?: 'top' | 'right' | 'bottom' | 'left'
}

type ChartType =
  | 'line'
  | 'bar'
  | 'pie'
  | 'stack'
  | 'line-stack'
  | 'line-bar'
  | 'bar-horizontal'
  | 'table'
  | 'high-relation-scatter'
  | 'map'
  | 'wordcloud'
  | 'scatter'

export const buildChartOption = (
  chartOptions: EChartsOption,
  settings: ChartSettings,
  chartType: ChartType
): EChartsOption => {
  const _option = chartOptions || {}
  const { legendPosition = 'top' } = settings || {}
  _option.legend = _option.legend || {}
  _option.grid = _option.grid || {}
  _option.tooltip = _option.tooltip || {}

  // legend
  if (legendPosition) {
    // position
    switch (legendPosition) {
      case 'top':
        _option.legend = {
          ..._option.legend,
          top: 60,
          bottom: 'auto',
          left: 'center',
          padding: [5, 5],
          orient: 'horizontal'
        }

        _option.grid = {
          ..._option.grid,
          top: 110,
          left: 'scatter' == chartType ? 70 : 20,
          right: 'scatter' == chartType ? 100 : 'bar-horizontal' == chartType ? 50 : 20,
          bottom: 'scatter' == chartType ? 100 : 45
        }
        break
      case 'bottom':
        _option.legend = {
          ..._option.legend,
          top: 'auto',
          bottom: 'scatter' == chartType ? 40 : 20,
          left: 'center',
          padding: [5, 5],
          orient: 'horizontal'
        }
        _option.grid = {
          ..._option.grid,
          top: 70,
          left: 'scatter' == chartType ? 70 : 20,
          right: 'scatter' == chartType ? 50 : 'bar-horizontal' == chartType ? 50 : 20,
          bottom: 'scatter' == chartType ? 100 : 45
        }
        break
      case 'left':
        _option.legend = {
          ..._option.legend,
          top: 60,
          bottom: 60,
          left: 20,
          right: 'auto',
          padding: [5, 5],
          orient: 'vertical'
        }
        
        _option.grid = {
          ..._option.grid,
          top: 70,
          left: 150,
          right: 'scatter' == chartType ? 50 : 20,
          bottom: 'scatter' == chartType ? 100 : 20
        }
        break
      case 'right':
        _option.legend = {
          ..._option.legend,
          top: 60,
          bottom: 60,
          left: 'auto',
          right: 'scatter' == chartType ? 50 : 20,
          padding: [5, 5],
          orient: 'vertical'
        }

        _option.grid = {
          ..._option.grid,
          top: 70,
          left: 'scatter' == chartType ? 70 : 20,
          right: 'scatter' == chartType ? 170 : 200,
          bottom: 'scatter' == chartType ? 100 : 20
        }
        break
      default:
        _option.legend = {
          ..._option.legend,
          top: 'auto',
          bottom: '6%',
          left: 'center',
        }
        
        _option.grid = {
          ..._option.grid,
          top: '18%',
          left: '8%',
          right: '8%',
          bottom: '15%'
        }
        break
    }

    // show
    if (_option.legend.show == false) {
      _option.legend.top = 60
      _option.legend.bottom = 'auto'
      _option.legend.left = 'center'
      _option.legend.padding = [5, 5]
      _option.grid.top = 100
      _option.grid.left = 20
      _option.grid.right = 'scatter' == chartType ? 50 : 20
      _option.grid.bottom = 'scatter' == chartType ? 60 : 20
    }
  } else {
    _option.legend = {
      ..._option.legend,
      top: 'auto',
      bottom: '6%',
      left: 'center',
      orient: 'horizontal'
    }
    
    _option.grid = {
      ..._option.grid,
      top: '18%',
      left: '8%',
      right: '8%',
      bottom: '15%'
    }
  }

  const iconRect =
    'path://M 0 4 A 4 4 0 0 1 4 0 L 10 0 A 4 4 0 0 1 14 4 L 14 10 A 4 4 0 0 1 10 14 L 4 14 A 4 4 0 0 1 0 10 Z'
  const iconLine =
    'path://M 0 2 A 2 2 0 0 1 2 0 L 12 0 A 2 2 0 0 1 14 2 L 14 0 A 2 2 0 0 1 12 2 L 2 2 A 2 2 0 0 1 0 0 Z'
  const iconLineWithRing =
    'path://M14,4h-2.1C11.4,1.7,9.4,0,7,0S2.6,1.7,2.1,4H0v2h2.1c0.5,2.3,2.5,4,4.9,4s4.4-1.7,4.9-4H14V4z M7,8  C5.3,8,4,6.7,4,5s1.3-3,3-3s3,1.3,3,3S8.7,8,7,8z'
  if (chartType == 'pie') {
    if(_option.series && Array.isArray(_option.series) && _option.series[0].data && Array.isArray(_option.series[0].data)) {
      _option.legend.data =
      _option.series[0].data.map((item: any) => {
        const textStyle = {
          padding: [2, 0, 0, 0]
        }
        return {
          name: item.name,
          icon: 'circle',
          textStyle
        }
      })
    }
  } else {
    const _legendData = (Array.isArray(_option.series) && _option.series.map((item: any) => {
      let icon = 'circle'
      const textStyle = {
        padding: [2, 0, 0, 0]
        // color: 'rgba(0,0,0,0.85)',
        // fontWeight: 'lighter',
      }
      let itemStyle: any
      if (item.data?.[0]?.itemStyle?.color) {
        itemStyle = {
          color: item.data[0].itemStyle.color
        }
      }

      switch (item.type) {
        case 'bar':
          icon = 'circle' //iconRect;
          // textStyle = {
          //   padding: [2, 0, 0, 0],
          // };
          break
        case 'line':
          icon = iconLineWithRing
          break
      }

      return {
        name: `${item.name}`, //`${item.name}`
        icon: icon,
        textStyle,
        itemStyle
      }
    })) || []

    if (
      _option.legend.show &&
      legendPosition &&
      ['left', 'right'].includes(legendPosition) &&
      (chartType == 'stack' || chartType == 'line-stack')
    ) {
      _option.legend.data = _legendData.reverse()
      _option.tooltip = {
        ..._option.tooltip,
        formatter: function (data: any) {
          return `<div>${data[0].name}</div>${data
            .reverse()
            .map((d: any) => {
              switch (d.seriesType) {
                case 'pie':
                  return `<div>
                          <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${
                            d.color
                          }"></span>
                          <span>${
                            d.data.label ? d.data.label.formatter(d, true) : d.data.value
                          }</span>
                      </div>`
                default:
                  return `<div>
                          <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${
                            d.color
                          }"></span>
                          <span>${d.seriesName}:</span>
                          <span>${
                            d.data.label ? d.data.label.formatter(d, true) : d.data.value
                          }</span>
                      </div>`
              }
            })
            .join('')}`
        }
      }
    } else {
      _option.legend.data = _legendData
    }
  }

  // legend style
  _option.legend.formatter = (text: any) => {
    if (isNaN(text)) {
      return truncate(text, 12)
    } else {
      return text
    }
  }

  // tooltip
  _option.tooltip = {
    ..._option.tooltip,
    trigger: ['pie', 'scatter'].includes(chartType) ? 'item' : 'axis'
  }

  return _option
}
