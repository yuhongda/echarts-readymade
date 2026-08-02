import { describe, expect, test, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import React, { useRef } from 'react'
import { ChartProvider, ChartContext } from '../packages/core/src/index'
import type { Field, LegendPosition } from '../packages/core/src/index'
import { Stack } from '../packages/stack/src/index'

type StackTestProps = {
  data?: any[]
  dimension?: Field[]
  compareDimension?: Field[]
  valueList?: Field[]
  echartsOptions?: any
  xAxisData?: any[]
  isPercentMode?: boolean
  isLineStack?: boolean
  echartsSeries?: any[]
  setOption?: (option: any) => any
  legendPosition?: LegendPosition
}

async function renderStack(props: StackTestProps, ref = React.createRef<any>()) {
  const screen = await render(
    <div style={{ width: 500, height: 500 }}>
      <ChartProvider data={props.data} echartsOptions={props.echartsOptions}>
        <Stack
          context={ChartContext}
          dimension={props.dimension}
          compareDimension={props.compareDimension}
          valueList={props.valueList}
          legendPosition={props.legendPosition || 'top'}
          xAxisData={props.xAxisData}
          isPercentMode={props.isPercentMode}
          isLineStack={props.isLineStack}
          echartsSeries={props.echartsSeries}
          setOption={props.setOption}
          ref={ref}
        />
      </ChartProvider>
    </div>
  )
  await vi.waitFor(
    () => {
      const opt = ref.current?.getEchartsInstance()?.getOption()
      expect(opt && Array.isArray(opt.series) && opt.series.length > 0).toBe(true)
    },
    { timeout: 10000 }
  )
  return { screen, instance: ref.current.getEchartsInstance() }
}

describe('testing <Stack /> chart', () => {
  test('<Stack /> chart works fine', async () => {
    const ref = React.createRef<any>()

    const StackChart: React.FC<{ ref: React.RefObject<any> }> = ({ ref }) => {
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
            <Stack
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

    const screen = await render(<StackChart ref={ref} />)
    if (ref.current) {
      await vi.waitFor(() => {
        expect(ref.current?.getEchartsInstance()).toBeDefined()
      })
    }
    await screen.unmount()
  })

  test('<Stack /> chart return null if valueList is null', async () => {
    const ref = React.createRef<any>()

    const StackChart: React.FC<{ ref: React.RefObject<any> }> = ({ ref }) => {
      const dimension: Field[] = [
        {
          fieldKey: 'd1',
          fieldName: '日期'
        }
      ]

      const valueList: Field[] = []

      return (
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
              ref={ref}
            />
          </ChartProvider>
        </div>
      )
    }

    const screen = await render(<StackChart ref={ref} />)
    if (ref.current) {
      const instance = ref.current.getEchartsInstance()
      expect(instance).toBeUndefined()
    }
    await screen.unmount()
  })

  test('<Stack /> chart return null if dimension is null', async () => {
    const ref = React.createRef<any>()

    const StackChart: React.FC<{ ref: React.RefObject<any> }> = ({ ref }) => {
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

      return (
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
              ref={ref}
            />
          </ChartProvider>
        </div>
      )
    }

    const screen = await render(<StackChart ref={ref} />)
    if (ref.current) {
      const instance = ref.current.getEchartsInstance()
      expect(instance).toBeUndefined()
    }
    await screen.unmount()
  })

  test('setOption() works fine', async () => {
    const ref = React.createRef<any>()

    const StackChart: React.FC<{ ref: React.RefObject<any> }> = ({ ref }) => {
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
            <Stack
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

    const screen = await render(<StackChart ref={ref} />)
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

  test('testing label formatter', async () => {
    const ref = React.createRef<any>()

    const StackChart: React.FC<{ ref: React.RefObject<any> }> = ({ ref }) => {
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

      return (
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
              isPercentMode
              ref={ref}
            />
          </ChartProvider>
        </div>
      )
    }

    const screen = await render(<StackChart ref={ref} />)
    if (ref.current) {
      await vi.waitFor(() => {
        expect(ref.current?.getEchartsInstance().getOption()).toBeDefined()
      })
      const instance = ref.current.getEchartsInstance()
      const option = instance.getOption()
      const seriesData = option.series
      expect(seriesData[0].data[0].label.formatter({ value: '123' })).toBe('123%')
    }
    await screen.unmount()
  })

  test('testing numberWithCommas()', async () => {
    const ref = React.createRef<any>()

    const StackChart: React.FC<{ ref: React.RefObject<any> }> = ({ ref }) => {
      const data = [
        {
          d1: '2020-12-31',
          d2: '北京'
        },
        {
          d1: '2020-12-31',
          d2: '上海'
        },
        {
          d1: '2021-01-31',
          d2: '北京'
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
              isPercentMode
              ref={ref}
            />
          </ChartProvider>
        </div>
      )
    }

    const screen = await render(<StackChart ref={ref} />)
    if (ref.current) {
      await vi.waitFor(() => {
        expect(ref.current?.getEchartsInstance().getOption()).toBeDefined()
      })
      const instance = ref.current.getEchartsInstance()
      const option = instance.getOption()
      const seriesData = option.series
      expect(seriesData[0].data[0].label.formatter({ value: null })).toBe('--%')
    }
    await screen.unmount()
  })

  // ===== 以下为新增测试，用于提高 Stack 组件覆盖率 =====

  test('renders nothing when data is empty', async () => {
    const ref = React.createRef<any>()
    const screen = await render(
      <div style={{ width: 500, height: 500 }}>
        <ChartProvider>
          <Stack
            context={ChartContext}
            dimension={[{ fieldKey: 'd1', fieldName: '日期' }]}
            valueList={[{ fieldKey: 'v6', fieldName: '占比' }]}
            ref={ref}
          />
        </ChartProvider>
      </div>
    )
    expect(ref.current).toBeNull()
    await screen.unmount()
  })

  test('renders with compareDimension and stacks values', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderStack(
      {
        data: [
          { d1: '2020-01', d2: '北京', v6: 1 },
          { d1: '2020-01', d2: '上海', v6: 2 },
          { d1: '2020-02', d2: '北京', v6: 3 }
        ],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        compareDimension: [{ fieldKey: 'd2', fieldName: '城市' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }]
      },
      ref
    )
    const option = instance.getOption()
    expect(option.series.map((s: any) => s.name)).toEqual(['北京', '上海'])
    expect(option.series[0].stack).toBe('总量')
    // 北京 [1, 3]；上海 [2, 空 -> 0]
    expect(option.series[0].data.map((d: any) => d.value)).toEqual([1, 3])
    expect(option.series[1].data.map((d: any) => d.value)).toEqual([2, 0])
    await screen.unmount()
  })

  test('renders in percent mode with compareDimension', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderStack(
      {
        data: [
          { d1: '2020-01', d2: '北京', v6: 1 },
          { d1: '2020-01', d2: '上海', v6: 3 }
        ],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        compareDimension: [{ fieldKey: 'd2', fieldName: '城市' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }],
        isPercentMode: true
      },
      ref
    )
    const option = instance.getOption()
    // 北京 1/(1+3)*100 = 25，上海 3/4*100 = 75
    expect(option.series[0].data[0].value).toBeCloseTo(25)
    expect(option.series[1].data[0].value).toBeCloseTo(75)
    // 百分比模式下 yAxis max 为 100
    expect(option.yAxis[0].max).toBe(100)
    await screen.unmount()
  })

  test('renders line stack when isLineStack is enabled', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderStack(
      {
        data: [
          { d1: '2020-01', d2: '北京', v6: 1 },
          { d1: '2020-02', d2: '北京', v6: 2 }
        ],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        compareDimension: [{ fieldKey: 'd2', fieldName: '城市' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }],
        isLineStack: true
      },
      ref
    )
    const option = instance.getOption()
    expect(option.series[0].type).toBe('line')
    await screen.unmount()
  })

  test('uses xAxisData', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderStack(
      {
        data: [
          { d1: '2020-01', v6: 1 },
          { d1: '2020-02', v6: 2 }
        ],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }],
        xAxisData: ['a', 'b']
      },
      ref
    )
    const option = instance.getOption()
    const xAxis = Array.isArray(option.xAxis) ? option.xAxis[0] : option.xAxis
    expect(xAxis.data).toEqual(['a', 'b'])
    await screen.unmount()
  })

  test('uses custom echartsSeries', async () => {
    const ref = React.createRef<any>()
    const customSeries = [{ name: 'custom', type: 'bar', stack: '总量', data: [{ value: 1 }] }]
    const { screen, instance } = await renderStack(
      {
        data: [{ d1: '2020-01', v6: 1 }],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }],
        echartsSeries: customSeries
      },
      ref
    )
    const option = instance.getOption()
    expect(option.series[0].name).toBe('custom')
    expect(option.series).toHaveLength(1)
    await screen.unmount()
  })

  test('renders percent mode without compareDimension with decimalLength', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderStack(
      {
        data: [
          { d1: '2020-01', v6: 1 },
          { d1: '2020-02', v6: 3 }
        ],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比', decimalLength: 1 }],
        isPercentMode: true
      },
      ref
    )
    const option = instance.getOption()
    // 无对比维度 sumData 为 [1, 3]，百分比均为 100
    const values = option.series[0].data.map((d: any) => d.value)
    expect(values).toEqual([100, 100])
    // 无对比维度 + isPercentMode 的 label formatter
    const formatter = option.series[0].data[0].label.formatter
    expect(formatter({ value: 50 })).toBe('50%')
    expect(formatter({ value: null })).toBe('--%')
    await screen.unmount()
  })

  test('merges repeated dimension and compare values', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderStack(
      {
        data: [
          { d1: '2020-01', d2: '北京', v6: 1 },
          { d1: '2020-01', d2: '北京', v6: 2 },
          { d1: '2020-01', d2: '上海', v6: 3 }
        ],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        compareDimension: [{ fieldKey: 'd2', fieldName: '城市' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }]
      },
      ref
    )
    const option = instance.getOption()
    // 同 d1+d2 的数据会合并：北京 1+2=3
    const beijing = option.series.find((s: any) => s.name === '北京')
    expect(beijing.data[0].value).toBe(3)
    await screen.unmount()
  })

  test('formats stack labels in percent mode with compare', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderStack(
      {
        data: [
          { d1: '2020-01', d2: '北京', v6: 1 },
          { d1: '2020-01', d2: '上海', v6: 3 }
        ],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        compareDimension: [{ fieldKey: 'd2', fieldName: '城市' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }],
        isPercentMode: true
      },
      ref
    )
    const option = instance.getOption()
    const formatter = option.series[0].data[0].label.formatter
    expect(formatter({ value: 25 })).toBe('25%')
    expect(formatter({ value: null })).toBe('--%')
    await screen.unmount()
  })

  test('renders line stack without compareDimension and formats labels', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderStack(
      {
        data: [
          { d1: '2020-01', v6: 1 },
          { d1: '2020-02', v6: 2 }
        ],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }],
        isLineStack: true
      },
      ref
    )
    const option = instance.getOption()
    expect(option.series[0].type).toBe('line')
    const formatter = option.series[0].data[0].label.formatter
    expect(formatter({ value: 50 })).toBe('50')
    expect(formatter({ value: null })).toBe('--')
    await screen.unmount()
  })

  test('formats stack labels without percent mode with compare', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderStack(
      {
        data: [
          { d1: '2020-01', d2: '北京', v6: 1 },
          { d1: '2020-01', d2: '上海', v6: 2 }
        ],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        compareDimension: [{ fieldKey: 'd2', fieldName: '城市' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }]
      },
      ref
    )
    const option = instance.getOption()
    const formatter = option.series[0].data[0].label.formatter
    expect(formatter({ value: 1 })).toBe('1')
    expect(formatter({ value: null })).toBe('--')
    await screen.unmount()
  })
})
