import '@testing-library/jest-dom'
import { render, waitFor, screen, act } from '@testing-library/react'
import React, { useRef } from 'react'
import { ChartProvider, ChartContext } from '../packages/core/src/index'
import type { Field } from '../packages/core/src/index'
import { Stack } from '../packages/stack/src/index'

describe('testing <Stack /> chart', () => {
  it('<Stack /> chart works fine', async () => {
    const data = [
      {
        v6: 0.8141021277904137,
        d1: '2020-12-31',
        d2: '北京',
        v4: 50.028318723339325,
        v5: 27.577454409512264
      },
      {
        v6: 0.8141021277904137,
        d1: '2020-12-31',
        d2: '北京',
        v4: 50.028318723339325,
        v5: 27.577454409512264
      },
      {
        v6: 0.3141021277904137,
        d1: '2020-12-31',
        d2: '上海',
        v4: 60.028318723339325,
        v5: 47.577454409512264
      },
      {
        v6: 0.8982190959595345,
        d1: '2021-01-31',
        d2: '北京',
        v4: 41.51820080195095,
        v5: 21.872185824241658
      },
      {
        v6: 0.3141021277904137,
        d1: '2021-01-31',
        d2: '上海',
        v4: 60.028318723339325,
        v5: 47.577454409512264
      },
      {
        v6: 0.33504289914191104,
        d1: '2021-02-28',
        d2: '北京',
        v4: 41.70814809361097,
        v5: 31.24105459114353
      },
      {
        v6: 0.33504289914191104,
        d1: '2021-02-28',
        d2: '上海',
        v4: 41.70814809361097,
        v5: 31.24105459114353
      },
      {
        v6: 0.4784536385273675,
        d1: '2021-03-31',
        d2: '北京',
        v4: 51.538285808269066,
        v5: 34.85958873867998
      },
      {
        v6: 2.070474009247233,
        d1: '2021-04-30',
        d2: '北京',
        v4: 99.60320028422093,
        v5: 32.43903058102744
      },
      {
        v6: 0.5949555806051605,
        d1: '2021-05-31',
        d2: '北京',
        v4: 51.233048361500714,
        v5: 32.12192802389004
      },
      {
        v6: 0.5378606644046801,
        d1: '2021-06-30',
        d2: '北京',
        v4: 76.84375204981437,
        v5: 49.96795472336324
      },
      {
        v6: 0.5816593218744337,
        d1: '2021-07-31',
        d2: '北京',
        v4: 46.878570132378925,
        v5: 29.63885426149979
      },
      {
        v6: 0.662148789567416,
        d1: '2021-08-31',
        d2: '北京',
        v4: 65.13936674312322,
        v5: 39.1898530095348
      },
      {
        v6: 0.326598530255224,
        d1: '2021-09-30',
        d2: '北京',
        v4: 56.245232663930274,
        v5: 42.39808154552174
      },
      {
        v6: 0.5967677847481455,
        d1: '2021-10-31',
        d2: '北京',
        v4: 66.81265781236482,
        v5: 41.8424384876371
      },
      { v6: 0.6310820851864044, d1: '2021-11-30', d2: '北京', v4: 100.0, v5: 61.308992912255384 }
    ]

    const dimension: Field[] = [
      {
        fieldKey: 'd1',
        fieldName: '日期'
      }
    ]

    const compareDimension: Field[] = [
      {
        fieldKey: 'd2',
        fieldName: '城市'
      }
    ]

    const valueList: Field[] = [
      {
        fieldKey: 'v6',
        fieldName: '占比1',
        isPercent: true
      },
      {
        fieldKey: 'v4',
        fieldName: '占比2'
      },
      {
        fieldKey: 'v5',
        fieldName: '占比3'
      }
    ]

    let instance: any
    let instance2: any

    render(
      <div style={{ width: 500, height: 500 }}>
        <ChartProvider
          data={data}
          echartsOptions={{
            option: {
              title: {
                text: 'Bar Chart'
              },
              yAxis: [
                {
                  axisLabel: {
                    formatter: '{value}%'
                  }
                }
              ]
            }
          }}
        >
          <Stack
            context={ChartContext}
            dimension={dimension}
            valueList={valueList}
            legendPosition="top"
            ref={(node) => {
              instance = node
            }}
          />
          <Stack
            context={ChartContext}
            dimension={dimension}
            compareDimension={compareDimension}
            valueList={valueList}
            legendPosition="top"
            ref={(node) => {
              instance2 = node
            }}
          />
        </ChartProvider>
      </div>
    )
    expect(instance).toBeDefined()
    expect(instance.getEchartsInstance()).toBeDefined()
    expect(instance2).toBeDefined()
    expect(instance2.getEchartsInstance()).toBeDefined()
  })

  it('<Stack /> chart return null if data is null', async () => {
    const dimension: Field[] = [
      {
        fieldKey: 'd1',
        fieldName: '日期'
      }
    ]

    const valueList: Field[] = [
      {
        fieldKey: 'v6',
        fieldName: '占比1',
        isPercent: true
      },
      {
        fieldKey: 'v4',
        fieldName: '占比2'
      },
      {
        fieldKey: 'v5',
        fieldName: '占比3'
      }
    ]

    let instance: any

    render(
      <div style={{ width: 500, height: 500 }}>
        <ChartProvider
          echartsOptions={{
            option: {
              title: {
                text: 'Bar Chart'
              },
              yAxis: [
                {
                  axisLabel: {
                    formatter: '{value}%'
                  }
                }
              ]
            }
          }}
        >
          <Stack
            context={ChartContext}
            dimension={dimension}
            valueList={valueList}
            legendPosition="top"
            ref={(node) => {
              instance = node
            }}
          />
        </ChartProvider>
      </div>
    )

    expect(instance).toBeUndefined()
  })

  it('<Stack /> chart return null if valueList is null', async () => {
    const dimension: Field[] = [
      {
        fieldKey: 'd1',
        fieldName: '日期'
      }
    ]

    const valueList: Field[] = []

    let instance: any

    render(
      <div style={{ width: 500, height: 500 }}>
        <ChartProvider
          data={[]}
          echartsOptions={{
            option: {
              title: {
                text: 'Bar Chart'
              },
              yAxis: [
                {
                  axisLabel: {
                    formatter: '{value}%'
                  }
                }
              ]
            }
          }}
        >
          <Stack
            context={ChartContext}
            dimension={dimension}
            valueList={valueList}
            legendPosition="top"
            ref={(node) => {
              instance = node
            }}
          />
        </ChartProvider>
      </div>
    )

    expect(instance).toBeUndefined()
  })

  it('<Stack /> chart return null if dimension is null', async () => {
    const dimension: Field[] = []

    const valueList: Field[] = [
      {
        fieldKey: 'v6',
        fieldName: '占比1',
        isPercent: true
      },
      {
        fieldKey: 'v4',
        fieldName: '占比2'
      },
      {
        fieldKey: 'v5',
        fieldName: '占比3'
      }
    ]

    let instance: any

    render(
      <div style={{ width: 500, height: 500 }}>
        <ChartProvider
          data={[]}
          echartsOptions={{
            option: {
              title: {
                text: 'Bar Chart'
              },
              yAxis: [
                {
                  axisLabel: {
                    formatter: '{value}%'
                  }
                }
              ]
            }
          }}
        >
          <Stack
            context={ChartContext}
            dimension={dimension}
            valueList={valueList}
            legendPosition="top"
            ref={(node) => {
              instance = node
            }}
          />
        </ChartProvider>
      </div>
    )

    expect(instance).toBeUndefined()
  })

  it('setOption() works fine', async () => {
    const data = [
      {
        v6: 0.8141021277904137,
        d1: '2020-12-31',
        d2: '北京',
        v4: 50.028318723339325,
        v5: 27.577454409512264
      },
      {
        v6: 0.3141021277904137,
        d1: '2020-12-31',
        d2: '上海',
        v4: 60.028318723339325,
        v5: 47.577454409512264
      },
      {
        v6: 0.8982190959595345,
        d1: '2021-01-31',
        d2: '北京',
        v4: 41.51820080195095,
        v5: 21.872185824241658
      }
    ]

    const dimension: Field[] = [
      {
        fieldKey: 'd1',
        fieldName: '日期'
      }
    ]

    const valueList: Field[] = [
      {
        fieldKey: 'v6',
        fieldName: '占比1',
        isPercent: true
      },
      {
        fieldKey: 'v4',
        fieldName: '占比2'
      },
      {
        fieldKey: 'v5',
        fieldName: '占比3'
      }
    ]

    let instance: any

    render(
      <div style={{ width: 500, height: 500 }}>
        <ChartProvider
          data={data}
          echartsOptions={{
            option: {
              title: {
                text: 'Bar Chart'
              },
              yAxis: [
                {
                  axisLabel: {
                    formatter: '{value}%'
                  }
                }
              ]
            }
          }}
        >
          <Stack
            context={ChartContext}
            dimension={dimension}
            valueList={valueList}
            legendPosition="top"
            ref={(node) => {
              instance = node
            }}
            setOption={(option: any) => {
              option.title.text = 'tada!!'
              return option
            }}
          />
        </ChartProvider>
      </div>
    )

    expect(instance).toBeDefined()
    expect(instance.getEchartsInstance()).toBeDefined()
    const title = instance.getEchartsInstance().getOption().title
    expect(title[0].text).toBe('tada!!')
  })

  it('testing label formatter', async () => {
    const data = [
      {
        v6: 0.8141021277904137,
        d1: '2020-12-31',
        d2: '北京',
        v4: 50.028318723339325,
        v5: 27.577454409512264
      },
      {
        v6: 0.3141021277904137,
        d1: '2020-12-31',
        d2: '上海',
        v4: 60.028318723339325,
        v5: 47.577454409512264
      },
      {
        v6: 0.8982190959595345,
        d1: '2021-01-31',
        d2: '北京',
        v4: 41.51820080195095,
        v5: 21.872185824241658
      }
    ]

    const dimension: Field[] = [
      {
        fieldKey: 'd1',
        fieldName: '日期'
      }
    ]

    const compareDimension: Field[] = [
      {
        fieldKey: 'd2',
        fieldName: '城市'
      }
    ]

    const valueList: Field[] = [
      {
        fieldKey: 'v6',
        fieldName: '占比1',
        isPercent: true
      },
      {
        fieldKey: 'v4',
        fieldName: '占比2'
      },
      {
        fieldKey: 'v5',
        fieldName: '占比3'
      }
    ]

    let instance: any
    let instance2: any
    let instanceIsPercentMode: any
    let instanceIsPercentMode2: any

    render(
      <div style={{ width: 500, height: 500 }}>
        <ChartProvider
          data={data}
          echartsOptions={{
            option: {
              title: {
                text: 'BarHorizontal Chart'
              },
              yAxis: [
                {
                  axisLabel: {
                    formatter: '{value}%'
                  }
                }
              ]
            }
          }}
        >
          <Stack
            context={ChartContext}
            dimension={dimension}
            valueList={valueList}
            legendPosition="top"
            ref={(node) => {
              instance = node
            }}
          />
          <Stack
            context={ChartContext}
            dimension={dimension}
            compareDimension={compareDimension}
            valueList={valueList}
            legendPosition="top"
            ref={(node) => {
              instance2 = node
            }}
          />
          <Stack
            context={ChartContext}
            dimension={dimension}
            valueList={valueList}
            legendPosition="top"
            isPercentMode
            ref={(node) => {
              instanceIsPercentMode = node
            }}
          />
          <Stack
            context={ChartContext}
            dimension={dimension}
            compareDimension={compareDimension}
            valueList={valueList}
            legendPosition="top"
            isPercentMode
            ref={(node) => {
              instanceIsPercentMode2 = node
            }}
          />
        </ChartProvider>
      </div>
    )

    expect(instance).toBeDefined()
    expect(instance.getEchartsInstance()).toBeDefined()
    const series = instance.getEchartsInstance().getOption().series
    expect(series[0].data[0].label.formatter({ value: '123' })).toBe('123')

    expect(instance2).toBeDefined()
    expect(instance2.getEchartsInstance()).toBeDefined()
    const series2 = instance2.getEchartsInstance().getOption().series
    expect(series2[0].data[0].label.formatter({ value: '123' })).toBe('123')

    expect(instanceIsPercentMode).toBeDefined()
    expect(instanceIsPercentMode.getEchartsInstance()).toBeDefined()
    const seriesIsPercentMode = instanceIsPercentMode.getEchartsInstance().getOption().series
    expect(seriesIsPercentMode[0].data[0].label.formatter({ value: '123' })).toBe('123%')
    
    expect(instanceIsPercentMode2).toBeDefined()
    expect(instanceIsPercentMode2.getEchartsInstance()).toBeDefined()
    const seriesIsPercentMode2 = instanceIsPercentMode2.getEchartsInstance().getOption().series
    expect(seriesIsPercentMode2[0].data[0].label.formatter({ value: '123' })).toBe('123%')
  })

  it('testing numberWithCommas()', async () => {
    const data = [
      {
        d1: '2020-12-31',
        d2: '北京',
      },
      {
        d1: '2020-12-31',
        d2: '上海',
      },
      {
        d1: '2021-01-31',
        d2: '北京',
      }
    ]

    const dimension: Field[] = [
      {
        fieldKey: 'd1',
        fieldName: '日期'
      }
    ]

    const compareDimension: Field[] = [
      {
        fieldKey: 'd2',
        fieldName: '城市'
      }
    ]

    const valueList: Field[] = [
      {
        fieldKey: 'v6',
        fieldName: '占比1',
        isPercent: true
      },
      {
        fieldKey: 'v4',
        fieldName: '占比2'
      },
      {
        fieldKey: 'v5',
        fieldName: '占比3'
      }
    ]

    let instance: any
    let instance2: any
    let instanceIsPercentMode: any
    let instanceIsPercentMode2: any

    render(
      <div style={{ width: 500, height: 500 }}>
        <ChartProvider
          data={data}
          echartsOptions={{
            option: {
              title: {
                text: 'BarHorizontal Chart'
              },
              yAxis: [
                {
                  axisLabel: {
                    formatter: '{value}%'
                  }
                }
              ]
            }
          }}
        >
          <Stack
            context={ChartContext}
            dimension={dimension}
            valueList={valueList}
            legendPosition="top"
            ref={(node) => {
              instance = node
            }}
          />
          <Stack
            context={ChartContext}
            dimension={dimension}
            compareDimension={compareDimension}
            valueList={valueList}
            legendPosition="top"
            ref={(node) => {
              instance2 = node
            }}
          />
          <Stack
            context={ChartContext}
            dimension={dimension}
            valueList={valueList}
            legendPosition="top"
            isPercentMode
            ref={(node) => {
              instanceIsPercentMode = node
            }}
          />
          <Stack
            context={ChartContext}
            dimension={dimension}
            compareDimension={compareDimension}
            valueList={valueList}
            legendPosition="top"
            isPercentMode
            ref={(node) => {
              instanceIsPercentMode2 = node
            }}
          />
        </ChartProvider>
      </div>
    )

    expect(instance).toBeDefined()
    expect(instance.getEchartsInstance()).toBeDefined()
    const series = instance.getEchartsInstance().getOption().series
    expect(series[0].data[0].label.formatter({ value: null })).toBe('--')

    expect(instance2).toBeDefined()
    expect(instance2.getEchartsInstance()).toBeDefined()
    const series2 = instance2.getEchartsInstance().getOption().series
    expect(series2[0].data[0].label.formatter({ value: null })).toBe('--')

    expect(instanceIsPercentMode).toBeDefined()
    expect(instanceIsPercentMode.getEchartsInstance()).toBeDefined()
    const seriesIsPercentMode = instanceIsPercentMode.getEchartsInstance().getOption().series
    expect(seriesIsPercentMode[0].data[0].label.formatter({ value: null })).toBe('--%')
    
    expect(instanceIsPercentMode2).toBeDefined()
    expect(instanceIsPercentMode2.getEchartsInstance()).toBeDefined()
    const seriesIsPercentMode2 = instanceIsPercentMode2.getEchartsInstance().getOption().series
    expect(seriesIsPercentMode2[0].data[0].label.formatter({ value: null })).toBe('--%')
  })
})
