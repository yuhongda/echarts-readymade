import { describe, expect, test, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import React, { useRef } from 'react'
import { ChartProvider, ChartContext } from '../packages/core/src/index'
import type { Field, LegendPosition } from '../packages/core/src/index'
import { Scatter } from '../packages/scatter/src/index'

type ScatterTestProps = {
  data?: any[]
  dimension?: Field[]
  compareDimension?: Field[]
  valueList?: Field[]
  echartsOptions?: any
  minDotSize?: number
  maxDotSize?: number
  colorMap?: { name: string; color: string }[]
  echartsSeries?: any[]
  setOption?: (option: any) => any
  legendPosition?: LegendPosition
}

async function renderScatter(props: ScatterTestProps, ref = React.createRef<any>()) {
  const screen = await render(
    <div style={{ width: 500, height: 500 }}>
      <ChartProvider data={props.data} echartsOptions={props.echartsOptions}>
        <Scatter
          context={ChartContext}
          dimension={props.dimension}
          compareDimension={props.compareDimension}
          valueList={props.valueList}
          legendPosition={props.legendPosition || 'top'}
          minDotSize={props.minDotSize}
          maxDotSize={props.maxDotSize}
          colorMap={props.colorMap}
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

describe('testing <Scatter /> chart', () => {
  test('<Scatter /> chart works fine', async () => {
    const ref = React.createRef<any>()

    const ScatterChart: React.FC<{ ref: React.RefObject<any> }> = ({ ref }) => {
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
                  text: 'Scatter Chart'
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
            <Scatter
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

    const screen = await render(<ScatterChart ref={ref} />)
    if (ref.current) {
      await vi.waitFor(() => {
        expect(ref.current?.getEchartsInstance()).toBeDefined()
      })
    }
    await screen.unmount()
  })

  test('use color from setOption()', async () => {
    const ref = React.createRef<any>()

    const ScatterChart: React.FC<{ ref: React.RefObject<any> }> = ({ ref }) => {
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
                  text: 'Scatter Chart'
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
            <Scatter
              context={ChartContext}
              dimension={dimension}
              valueList={valueList}
              legendPosition="top"
              ref={ref}
              setOption={(option) => {
                option.color = ['#ccc']
                return option
              }}
            />
          </ChartProvider>
        </div>
      )
    }

    const screen = await render(<ScatterChart ref={ref} />)
    if (ref.current) {
      await vi.waitFor(() => {
        expect(ref.current?.getEchartsInstance().getOption()).toBeDefined()
      })
      const instance = ref.current.getEchartsInstance()
      const option = instance.getOption()
      expect(option.color).toEqual(['#ccc'])
    }
    await screen.unmount()
  })

  test('use color from echartsOptions', async () => {
    const ref = React.createRef<any>()

    const ScatterChart: React.FC<{ ref: React.RefObject<any> }> = ({ ref }) => {
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
                  text: 'Scatter Chart'
                },
                yAxis: [
                  {
                    axisLabel: {
                      formatter: '{value}%'
                    }
                  }
                ],
                color: ['#ccc']
              }
            }}
          >
            <Scatter
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

    const screen = await render(<ScatterChart ref={ref} />)
    if (ref.current) {
      await vi.waitFor(() => {
        expect(ref.current?.getEchartsInstance().getOption()).toBeDefined()
      })
      const instance = ref.current.getEchartsInstance()
      const option = instance.getOption()
      expect(option.color).toEqual(['#ccc'])
    }
    await screen.unmount()
  })

  test('setOption() works fine', async () => {
    const ref = React.createRef<any>()

    const ScatterChart: React.FC<{ ref: React.RefObject<any> }> = ({ ref }) => {
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
                  text: 'Scatter Chart'
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
            <Scatter
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

    const screen = await render(<ScatterChart ref={ref} />)
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

  // ===== 以下为新增测试，用于提高 Scatter 组件覆盖率 =====

  test('renders nothing when data is empty', async () => {
    const ref = React.createRef<any>()
    const screen = await render(
      <div style={{ width: 500, height: 500 }}>
        <ChartProvider>
          <Scatter
            context={ChartContext}
            dimension={[{ fieldKey: 'd1', fieldName: '日期' }]}
            valueList={[
              { fieldKey: 'v6', fieldName: '占比X' },
              { fieldKey: 'v4', fieldName: '占比Y' }
            ]}
            ref={ref}
          />
        </ChartProvider>
      </div>
    )
    expect(ref.current).toBeNull()
    await screen.unmount()
  })

  test('renders nothing when valueList has less than 2 items', async () => {
    const ref = React.createRef<any>()
    const screen = await render(
      <div style={{ width: 500, height: 500 }}>
        <ChartProvider data={[{ d1: 'A', v6: 1 }]}>
          <Scatter
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

  test('renders with compareDimension and applies isPercent', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderScatter(
      {
        data: [
          { d1: '2020-01', d2: '北京', v6: 0.5, v4: 2, v5: 3 },
          { d1: '2020-02', d2: '北京', v6: 0.25, v4: 4, v5: 5 }
        ],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        compareDimension: [{ fieldKey: 'd2', fieldName: '城市' }],
        valueList: [
          { fieldKey: 'v6', fieldName: '占比X', isPercent: true },
          { fieldKey: 'v4', fieldName: '占比Y' },
          { fieldKey: 'v5', fieldName: '大小' }
        ]
      },
      ref
    )
    const option = instance.getOption()
    const series = option.series[0]
    expect(series.name).toBe('北京')
    expect(series.type).toBe('scatter')
    // v6 isPercent 会乘以 100
    expect(series.data[0].value[0]).toBe(50) // 0.5 * 100
    expect(series.data[0].value[1]).toBe(2)
    expect(series.data[0].value[2]).toBe(3)
    await screen.unmount()
  })

  test('renders without compareDimension with 2 values', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderScatter(
      {
        data: [
          { d1: 'A', v6: 1, v4: 2 },
          { d1: 'B', v6: 3, v4: 4 }
        ],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        valueList: [
          { fieldKey: 'v6', fieldName: '占比X' },
          { fieldKey: 'v4', fieldName: '占比Y' }
        ]
      },
      ref
    )
    const option = instance.getOption()
    const series = option.series[0]
    expect(series.type).toBe('scatter')
    // 无对比维度 2 值时 value = [v6, v4, 1, 维度值, 原始数据]
    expect(series.data[0].value[0]).toBe(1)
    expect(series.data[0].value[2]).toBe(1)
    expect(series.data[0].name).toBe('A')
    await screen.unmount()
  })

  test('applies colorMap colors with compareDimension', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderScatter(
      {
        data: [
          { d1: '2020-01', d2: '北京', v6: 1, v4: 2 },
          { d1: '2020-02', d2: '北京', v6: 3, v4: 4 }
        ],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        compareDimension: [{ fieldKey: 'd2', fieldName: '城市' }],
        valueList: [
          { fieldKey: 'v6', fieldName: '占比X' },
          { fieldKey: 'v4', fieldName: '占比Y' }
        ],
        colorMap: [{ name: '北京', color: '#ff0000' }]
      },
      ref
    )
    const option = instance.getOption()
    const series = option.series[0]
    expect(series.data[0].itemStyle.color).toBe('#ff0000')
    await screen.unmount()
  })

  test('applies custom minDotSize and maxDotSize', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderScatter(
      {
        data: [
          { d1: '2020-01', d2: '北京', v6: 1, v4: 2, v5: 3 },
          { d1: '2020-02', d2: '北京', v6: 3, v4: 4, v5: 5 }
        ],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        compareDimension: [{ fieldKey: 'd2', fieldName: '城市' }],
        valueList: [
          { fieldKey: 'v6', fieldName: '占比X' },
          { fieldKey: 'v4', fieldName: '占比Y' },
          { fieldKey: 'v5', fieldName: '大小' }
        ],
        minDotSize: 10,
        maxDotSize: 30
      },
      ref
    )
    const option = instance.getOption()
    const symbolSize = option.series[0].symbolSize
    // v5 范围 [3,5]，scale = (5-3)/(30-10) = 0.1，最小值对应 size 10
    expect(symbolSize([0, 0, 3])).toBe(10)
    await screen.unmount()
  })

  test('uses custom echartsSeries', async () => {
    const ref = React.createRef<any>()
    const customSeries = [{ name: 'custom', type: 'scatter', data: [[1, 2]] }]
    const { screen, instance } = await renderScatter(
      {
        data: [{ d1: 'A', v6: 1, v4: 2 }],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        valueList: [
          { fieldKey: 'v6', fieldName: '占比X' },
          { fieldKey: 'v4', fieldName: '占比Y' }
        ],
        echartsSeries: customSeries
      },
      ref
    )
    const option = instance.getOption()
    expect(option.series[0].name).toBe('custom')
    await screen.unmount()
  })
})
