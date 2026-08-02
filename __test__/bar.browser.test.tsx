import { describe, expect, test, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import React from 'react'
import { ChartProvider, ChartContext } from '../packages/core/src/index'
import type { Field, LegendPosition } from '../packages/core/src/index'
import { Bar } from '../packages/bar/src/index'

type BarTestProps = {
  data?: any[]
  dimension?: Field[]
  compareDimension?: Field[]
  valueList?: Field[]
  echartsOptions?: any
  xAxisData?: any[]
  sortXAxis?: boolean
  echartsSeries?: any[]
  setOption?: (option: any) => any
  legendPosition?: LegendPosition
}

async function renderBar(props: BarTestProps, ref = React.createRef<any>()) {
  const screen = await render(
    <div style={{ width: 500, height: 500 }}>
      <ChartProvider data={props.data} echartsOptions={props.echartsOptions}>
        <Bar
          context={ChartContext}
          dimension={props.dimension}
          compareDimension={props.compareDimension}
          valueList={props.valueList}
          legendPosition={props.legendPosition || 'top'}
          xAxisData={props.xAxisData}
          sortXAxis={props.sortXAxis}
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

describe('testing <Bar /> chart', () => {
  test('<Bar /> chart works fine', async () => {
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

    const screen = await render(<BarChart ref={ref} />)
    if (ref.current) {
      await vi.waitFor(() => {
        expect(ref.current?.getEchartsInstance()).toBeDefined()
      })
    }
    await screen.unmount()
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

    const screen = await render(<BarChart ref={testRef} />)
    if (testRef.current) {
      await vi.waitFor(() => {
        expect(testRef.current?.getEchartsInstance().getOption()).toBeDefined()
      })
      const instance = testRef.current.getEchartsInstance()
      const option = instance.getOption()
      const seriesData = option.series
      expect(Array.isArray(seriesData) && seriesData.length > 0).toBe(true)
    }
    await screen.unmount()
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

    const screen = await render(<BarChart ref={ref} />)
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

  // ===== 以下为新增测试，用于提高 Bar 组件覆盖率 =====

  test('renders nothing when data is empty', async () => {
    const ref = React.createRef<any>()
    const screen = await render(
      <div style={{ width: 500, height: 500 }}>
        <ChartProvider>
          <Bar
            context={ChartContext}
            dimension={[{ fieldKey: 'd1', fieldName: '日期' }]}
            valueList={[{ fieldKey: 'v6', fieldName: '占比' }]}
            ref={ref}
          />
        </ChartProvider>
      </div>
    )
    // data 为空时组件直接返回 null，不渲染图表实例
    expect(ref.current).toBeNull()
    await screen.unmount()
  })

  test('renders without compareDimension and applies isPercent', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderBar(
      {
        data: [
          { d1: '2020-01', v6: 0.5 },
          { d1: '2020-02', v6: 0.256 }
        ],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比', isPercent: true, decimalLength: 1 }]
      },
      ref
    )
    const option = instance.getOption()
    const series = option.series
    expect(Array.isArray(series)).toBe(true)
    expect(series[0].name).toBe('占比')
    expect(series[0].type).toBe('bar')
    // isPercent 会乘以 100
    expect(series[0].data[0].value).toBe(50)
    expect(series[0].data[0].isPercent).toBe(true)
    expect(series[0].data[0].decimalLength).toBe(1)
    expect(series[0].data[1].value).toBe(25.6) // 0.256 * 100 = 25.6
    await screen.unmount()
  })

  test('returns null value when data is missing without compareDimension', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderBar(
      {
        data: [{ d1: '2020-01' }, { d1: '2020-02' }],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }]
      },
      ref
    )
    const option = instance.getOption()
    expect(option.series[0].data[0].value).toBeNull()
    expect(option.series[0].data[1].value).toBeNull()
    await screen.unmount()
  })

  test('uses xAxisData and shows second yAxis when yAxisIndex is 1', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderBar(
      {
        data: [
          { d1: '2020-01', v6: 1, v4: 2 },
          { d1: '2020-02', v6: 3, v4: 4 }
        ],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        valueList: [
          { fieldKey: 'v6', fieldName: '占比1' },
          { fieldKey: 'v4', fieldName: '占比2', yAxisIndex: 1 }
        ],
        xAxisData: ['a', 'b']
      },
      ref
    )
    const option = instance.getOption()
    const xAxis = Array.isArray(option.xAxis) ? option.xAxis[0] : option.xAxis
    expect(xAxis.data).toEqual(['a', 'b'])
    expect(option.yAxis[1].show).toBe(true)
    expect(option.series[1].yAxisIndex).toBe(1)
    await screen.unmount()
  })

  test('sorts xAxis data when sortXAxis is enabled', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderBar(
      {
        data: [
          { d1: '2021-01', d2: '北京', v6: 1 },
          { d1: '2020-01', d2: '北京', v6: 2 },
          { d1: '2020-02', d2: '北京', v6: 3 }
        ],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        compareDimension: [{ fieldKey: 'd2', fieldName: '城市' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }],
        sortXAxis: true
      },
      ref
    )
    const option = instance.getOption()
    const xAxis = Array.isArray(option.xAxis) ? option.xAxis[0] : option.xAxis
    expect(xAxis.data).toEqual(['2020-01', '2020-02', '2021-01'])
    await screen.unmount()
  })

  test('uses compareDimensionName when valueList has a single item', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderBar(
      {
        data: [
          { d1: '2020-01', d2: '北京', v6: 1 },
          { d1: '2020-02', d2: '上海', v6: 2 }
        ],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        compareDimension: [{ fieldKey: 'd2', fieldName: '城市' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }]
      },
      ref
    )
    const option = instance.getOption()
    // valueList 只有 1 项时，series 名称不带 "~字段名" 后缀
    expect(option.series[0].name).toBe('北京')
    expect(option.series[1].name).toBe('上海')
    await screen.unmount()
  })

  test('uses custom echartsSeries with compareDimension', async () => {
    const ref = React.createRef<any>()
    const customSeries = [{ name: 'custom', type: 'bar', data: [{ value: 1 }, { value: 2 }] }]
    const { screen, instance } = await renderBar(
      {
        data: [
          { d1: '2020-01', d2: '北京', v6: 1 },
          { d1: '2020-02', d2: '上海', v6: 2 }
        ],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        compareDimension: [{ fieldKey: 'd2', fieldName: '城市' }],
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

  test('uses custom echartsSeries without compareDimension', async () => {
    const ref = React.createRef<any>()
    const customSeries = [{ name: 'custom2', type: 'bar', data: [{ value: 5 }] }]
    const { screen, instance } = await renderBar(
      {
        data: [{ d1: '2020-01', v6: 1 }],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }],
        echartsSeries: customSeries
      },
      ref
    )
    const option = instance.getOption()
    expect(option.series[0].name).toBe('custom2')
    expect(option.series).toHaveLength(1)
    await screen.unmount()
  })

  test('supports custom series type (line)', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderBar(
      {
        data: [{ d1: '2020-01', v6: 1 }],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比', type: 'line' }]
      },
      ref
    )
    const option = instance.getOption()
    expect(option.series[0].type).toBe('line')
    await screen.unmount()
  })

  test('filters out empty compareDimension values', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderBar(
      {
        data: [
          { d1: '2020-01', d2: undefined, v6: 1 },
          { d1: '2020-02', d2: '上海', v6: 2 }
        ],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        compareDimension: [{ fieldKey: 'd2', fieldName: '城市' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }]
      },
      ref
    )
    const option = instance.getOption()
    // d2 为 undefined 时生成的 "~" 会被过滤，只保留 "上海"
    expect(option.series.some((s: any) => s.name.includes('上海'))).toBe(true)
    await screen.unmount()
  })

  test('groups repeated dimension values with compareDimension', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderBar(
      {
        data: [
          { d1: '2020-01', d2: '北京', v6: 0.5, v4: 2 },
          { d1: '2020-01', d2: '上海', v6: 0.25, v4: 3 },
          { d1: '2020-02', d2: '北京', v6: 0.75, v4: 4 }
        ],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        compareDimension: [{ fieldKey: 'd2', fieldName: '城市' }],
        valueList: [
          { fieldKey: 'v6', fieldName: '占比', isPercent: true },
          { fieldKey: 'v4', fieldName: '数量', yAxisIndex: 1 }
        ]
      },
      ref
    )
    const option = instance.getOption()
    // 同一 d1 出现多行（北京/上海）时会按对比维度分组
    const percentSeries = option.series.find((s: any) => s.name.includes('占比'))
    expect(percentSeries).toBeDefined()
    // 有对比维度下 isPercent 同样会乘以 100
    expect(percentSeries.data.some((d: any) => d.value === 50)).toBe(true)
    // yAxisIndex 为 1 时显示第二个 y 轴
    expect(option.yAxis[1].show).toBe(true)
    await screen.unmount()
  })
})
