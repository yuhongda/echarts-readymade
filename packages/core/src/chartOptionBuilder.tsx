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
  | 'scatter-quadrant'

export const buildChartOption = (
  chartOptions: EChartsOption,
  settings: ChartSettings,
  chartType: ChartType
) => {
  const _option = chartOptions || {}
  const { legendPosition = 'top' } = settings || {}

  // legend
  if (legendPosition) {
    // position
    switch (legendPosition) {
      case 'top':
        _option.legend.top = 60
        _option.legend.bottom = 'auto'
        _option.legend.left = 'center'
        _option.legend.padding = [5, 100]
        _option.grid.top = 110
        _option.grid.left = 20
        _option.grid.right =
          'scatter-quadrant' == chartType ? 50 : 'bar-horizontal' == chartType ? 50 : 20
        _option.grid.bottom = 'scatter-quadrant' == chartType ? 70 : 45
        _option.legend.orient = 'horizontal'
        break
      case 'bottom':
        _option.legend.top = 'auto'
        _option.legend.bottom = 'scatter-quadrant' == chartType ? 40 : 20
        _option.legend.left = 'center'
        _option.legend.padding = [5, 100]
        _option.grid.top = 70
        _option.grid.left = 20
        _option.grid.right =
          'scatter-quadrant' == chartType ? 50 : 'bar-horizontal' == chartType ? 50 : 20
        _option.grid.bottom = 'scatter-quadrant' == chartType ? 70 : 45
        _option.legend.orient = 'horizontal'
        break
      case 'left':
        _option.legend.top = 60
        _option.legend.bottom = 60
        _option.legend.left = 20
        _option.legend.right = 'auto'
        _option.legend.padding = [5, 5]
        _option.grid.top = 70
        _option.grid.left = 150
        _option.grid.right = 'scatter-quadrant' == chartType ? 50 : 20
        _option.grid.bottom = 'scatter-quadrant' == chartType ? 75 : 20
        _option.legend.orient = 'vertical'
        break
      case 'right':
        _option.legend.top = 60
        _option.legend.bottom = 60
        _option.legend.left = 'auto'
        _option.legend.right = 'scatter-quadrant' == chartType ? 50 : 20
        _option.legend.padding = [5, 5]
        _option.grid.top = 70
        _option.grid.left = 20
        _option.grid.right = 'scatter-quadrant' == chartType ? 170 : 200
        _option.grid.bottom = 'scatter-quadrant' == chartType ? 75 : 20
        _option.legend.orient = 'vertical'
        break
      default:
        _option.legend.top = 'auto'
        _option.legend.bottom = '6%'
        _option.legend.left = 'center'
        // _option.legend.right = 'center';
        _option.grid.top = '18%'
        _option.grid.left = '8%'
        _option.grid.right = '8%'
        _option.grid.bottom = '15%'
        break
    }

    // show
    if (_option.legend.show == false) {
      _option.legend.top = 60
      _option.legend.bottom = 'auto'
      _option.legend.left = 'center'
      _option.legend.padding = [5, 100]
      _option.grid.top = 100
      _option.grid.left = 20
      _option.grid.right = 'scatter-quadrant' == chartType ? 50 : 20
      _option.grid.bottom = 'scatter-quadrant' == chartType ? 60 : 20
    }
  } else {
    _option.legend.top = 'auto'
    _option.legend.bottom = '6%'
    _option.legend.left = 'center'
    // _option.legend.right = 'center';
    _option.grid.top = '18%'
    _option.grid.left = '8%'
    _option.grid.right = '8%'
    _option.grid.bottom = '15%'
    _option.legend.orient = 'horizontal'
  }

  const iconRect =
    'path://M 0 4 A 4 4 0 0 1 4 0 L 10 0 A 4 4 0 0 1 14 4 L 14 10 A 4 4 0 0 1 10 14 L 4 14 A 4 4 0 0 1 0 10 Z'
  const iconLine =
    'path://M 0 2 A 2 2 0 0 1 2 0 L 12 0 A 2 2 0 0 1 14 2 L 14 0 A 2 2 0 0 1 12 2 L 2 2 A 2 2 0 0 1 0 0 Z'
  const iconLineWithRing =
    'path://M14,4h-2.1C11.4,1.7,9.4,0,7,0S2.6,1.7,2.1,4H0v2h2.1c0.5,2.3,2.5,4,4.9,4s4.4-1.7,4.9-4H14V4z M7,8  C5.3,8,4,6.7,4,5s1.3-3,3-3s3,1.3,3,3S8.7,8,7,8z'
  if (chartType == 'pie') {
    _option.legend.data =
      _option.series[0] &&
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
  } else {
    const _legendData = _option.series.map((item: any) => {
      let icon = 'circle'
      const textStyle = {
        padding: [2, 0, 0, 0]
        // color: 'rgba(0,0,0,0.85)',
        // fontWeight: 'lighter',
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
        textStyle
      }
    })

    if (
      _option.legend.show &&
      legendPosition &&
      ['left', 'right'].includes(legendPosition) &&
      (chartType == 'stack' || chartType == 'line-stack')
    ) {
      _option.legend.data = _legendData.reverse()
      _option.tooltip.formatter = function (data: any) {
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

  return _option
}
