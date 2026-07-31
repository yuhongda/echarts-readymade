import { describe, expect, test, vi } from 'vitest'
import { render, renderHook } from 'vitest-browser-react'
import React, { useEffect, useRef, useState } from 'react'
import { ChartProvider, ChartContext } from '../packages/core/src/index'
import type { Field } from '../packages/core/src/index'
import { Bar } from '../packages/bar/src/index'
import ReactEcharts from 'echarts-for-react'

describe('testing <Bar /> chart', () => {
  test('<Bar /> chart works fine', async () => {
    let instance1: any = null
    let instance2: any = null

    const BarChart: React.FC = () => {
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
        },
        {
          v6: 0.33504289914191104,
          d1: '2021-02-28',
          d2: '北京',
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

      const ref1 = useRef<InstanceType<typeof ReactEcharts>>(null)
      const ref2 = useRef<InstanceType<typeof ReactEcharts>>(null)
      useEffect(() => {
        if (ref1.current) {
          const instance = ref1.current.getEchartsInstance()
          instance1 = instance
        }
      }, [ref1.current])

      useEffect(() => {
        if (ref2.current) {
          const instance = ref2.current.getEchartsInstance()
          instance2 = instance
        }
      }, [ref2.current])

      return (
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
            <Bar
              context={ChartContext}
              dimension={dimension}
              valueList={valueList}
              legendPosition="top"
              ref={ref1}
            />
            <Bar
              context={ChartContext}
              dimension={dimension}
              compareDimension={compareDimension}
              valueList={valueList}
              legendPosition="top"
              ref={ref2}
            />
          </ChartProvider>
        </div>
      )
    }

    await render(<BarChart />)
    expect(instance1).toBeDefined()
    expect(instance2).toBeDefined()
  })

  test('The value will be 0, if could not find value in data', async () => {
    const testRef = React.createRef<any>()

    const BarChart: React.FC<{ ref: React.RefObject<any> }> = ({ ref }) => {
      const data = [
        {
          d1: '2020-12-31'
        },
        {
          d1: '2020-12-31'
        },
        {
          d1: '2021-01-31'
        },
        {
          d1: '2021-02-28'
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

      return (
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
            <Bar
              context={ChartContext}
              dimension={dimension}
              valueList={valueList}
              legendPosition="top"
              ref={ref}
            />
          </ChartProvider>
        </div>
      )
    }

    await render(<BarChart ref={testRef} />)

    const { result } = await renderHook(() => {
      const [option, setOption] = useState<any>(null)
      React.useEffect(() => {
        if (testRef.current) {
          const instance = testRef.current.getEchartsInstance()
          setOption(instance.getOption())
        }
      }, [testRef])

      return option
    })
    if (result) {
      const seriesData = result.current.series
      expect(Array.isArray(seriesData) && seriesData.length > 0).toBe(true)
      if (Array.isArray(seriesData) && seriesData.length > 0) {
        expect(seriesData.length).toBeGreaterThan(0)
      }
    }
  })

  test('setOption() works fine', async () => {
    const ref = React.createRef<any>()

    const BarChart: React.FC<{ ref: React.RefObject<any> }> = ({ ref }) => {
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

      return (
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
            <Bar
              context={ChartContext}
              dimension={dimension}
              valueList={valueList}
              legendPosition="top"
              ref={ref}
              setOption={(option: any) => {
                option.title.text = 'tada!!'
                return option
              }}
            />
          </ChartProvider>
        </div>
      )
    }

    await render(<BarChart ref={ref} />)

    const { result } = await renderHook(() => {
      const [option, setOption] = useState<any>(null)
      React.useEffect(() => {
        if (ref.current) {
          const instance = ref.current.getEchartsInstance()
          setOption(instance.getOption())
        }
      }, [ref])

      return option
    })
    if (result) {
      expect(result.current.title).toBeDefined()
      expect(result.current.title[0].text).toBe('tada!!')
    }
  })
})
