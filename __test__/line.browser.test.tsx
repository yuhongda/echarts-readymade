import { describe, expect, test, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import React from 'react'
import { ChartProvider, ChartContext } from '../packages/core/src/index'
import type { Field } from '../packages/core/src/index'
import { Line } from '../packages/line/src/index'

describe('testing <Line /> chart', () => {
  test('<Line /> chart works fine', async () => {
    const ref = React.createRef<any>()

    const LineChart: React.FC<{ ref: React.RefObject<any> }> = ({ ref }) => {
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
            <Line
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
    
    const screen = await render(<LineChart ref={ref} />)
    if (ref.current) {
      await vi.waitFor(() => {
        expect(ref.current?.getEchartsInstance()).toBeDefined()
      })
    }
    await screen.unmount()
  })

  test('The value will be 0, if could not find value in data', async () => {
    const testRef = React.createRef<any>()

    const LineChart: React.FC<{ ref: React.RefObject<any> }> = ({ ref }) => {
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
            <Line
              context={ChartContext}
              dimension={dimension}
              valueList={valueList}
              legendPosition="top"
              ref={testRef}
            />
          </ChartProvider>
        </div>
      )
    }

    const screen = await render(<LineChart ref={testRef} />)
    if (testRef.current) {
      await vi.waitFor(() => {
        expect(testRef.current?.getEchartsInstance().getOption()).toBeDefined()
      })
      const instance = testRef.current.getEchartsInstance()
      const option = instance.getOption()
      const seriesData = option.series
      expect(Array.isArray(seriesData) && seriesData.length > 0).toBe(true)
      expect(
        seriesData.map((item: any) => item.data.map((d: any) => d.value)).flat()
      ).toStrictEqual(seriesData.map((item: any) => item.data.map((d: any) => null)).flat())
    }
    await screen.unmount()
  })

  test('setOption() works fine', async () => {
    const ref = React.createRef<any>()

    const LineChart: React.FC<{ ref: React.RefObject<any> }> = ({ ref }) => {
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
            <Line
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

    const screen = await render(<LineChart ref={ref} />)
    if (ref.current) {
      await vi.waitFor(() => {
        expect(ref.current?.getEchartsInstance().getOption()).toBeDefined()
      })
      const instance = ref.current.getEchartsInstance()
      const option = instance.getOption()
      expect(option.title).toBeDefined()
      expect(option.title[0].text).toBe('tada!!')
    }
    await screen.unmount()
  })
})
