import { describe, expect, test, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import React from 'react'
import { ChartProvider, ChartContext } from '../packages/core/src/index'
import type { Field, LegendPosition } from '../packages/core/src/index'
import { Pie } from '../packages/pie/src/index'

type PieTestProps = {
  data?: any[]
  dimension?: Field[]
  valueList?: Field[]
  echartsOptions?: any
  showInRing?: boolean
  echartsSeries?: any[]
  setOption?: (option: any) => any
  legendPosition?: LegendPosition
}

async function renderPie(props: PieTestProps, ref = React.createRef<any>()) {
  const screen = await render(
    <div style={{ width: 500, height: 500 }}>
      <ChartProvider data={props.data} echartsOptions={props.echartsOptions}>
        <Pie
          context={ChartContext}
          dimension={props.dimension}
          valueList={props.valueList}
          legendPosition={props.legendPosition || 'top'}
          showInRing={props.showInRing}
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

describe('testing <Pie /> chart', () => {
  test('<Pie /> chart works fine', async () => {
    const ref = React.createRef<any>()

    const PieChart: React.FC<{ ref: React.RefObject<any> }> = ({ ref }) => {
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
            <Pie
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

    const screen = await render(<PieChart ref={ref} />)
    if (ref.current) {
      await vi.waitFor(() => {
        expect(ref.current?.getEchartsInstance()).toBeDefined()
      })
    }
    await screen.unmount()
  })

  test('The value will be 0, if could not find value in data', async () => {
    const ref = React.createRef<any>()

    const PieChart: React.FC<{ ref: React.RefObject<any> }> = ({ ref }) => {
      const data = [
        {
          d1: '2020-12-31',
          v6: 1
        },
        {
          d1: '2020-12-31',
          v6: 1
        },
        {
          d1: '2021-01-31',
          v6: 1
        },
        {
          d1: '2021-02-28',
          v6: 1
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
            <Pie
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

    const screen = await render(<PieChart ref={ref} />)
    if (ref.current) {
      await vi.waitFor(() => {
        expect(ref.current?.getEchartsInstance().getOption()).toBeDefined()
      })
      const instance = ref.current.getEchartsInstance()
      const option = instance.getOption()
      const seriesData = option.series
      expect(Array.isArray(seriesData) && seriesData.length > 0).toBe(true)
      expect(
        seriesData.map((item: any) => item.data.map((d: any) => d.value)).flat()
      ).toStrictEqual(seriesData.map((item: any) => item.data.map((d: any) => '1.0000')).flat())
    }
    await screen.unmount()
  })

  test('setOption() works fine', async () => {
    const ref = React.createRef<any>()

    const PieChart: React.FC<{ ref: React.RefObject<any> }> = ({ ref }) => {
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
            <Pie
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

    const screen = await render(<PieChart ref={ref} />)
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

  test('getCenter() works fine while legendPosition changed to left', async () => {
    const ref = React.createRef<any>()

    const PieChart: React.FC<{ ref: React.RefObject<any> }> = ({ ref }) => {
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
            <Pie
              context={ChartContext}
              dimension={dimension}
              valueList={valueList}
              legendPosition="left"
              ref={ref}
            />
          </ChartProvider>
        </div>
      )
    }

    const screen = await render(<PieChart ref={ref} />)
    if (ref.current) {
      await vi.waitFor(() => {
        expect(ref.current?.getEchartsInstance().getOption()).toBeDefined()
      })
      const instance = ref.current.getEchartsInstance()
      const option = instance.getOption()
      expect(option.series[0].center).toEqual(['55%', '50%'])
    }
    await screen.unmount()
  })

  // ===== 以下为新增测试，用于提高 Pie 组件覆盖率 =====

  test('renders nothing when data is empty', async () => {
    const ref = React.createRef<any>()
    const screen = await render(
      <div style={{ width: 500, height: 500 }}>
        <ChartProvider>
          <Pie
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

  test('renders without dimension using valueList as pie data', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderPie(
      {
        data: [{ v6: 10, v4: 20 }],
        valueList: [
          { fieldKey: 'v6', fieldName: '占比1' },
          { fieldKey: 'v4', fieldName: '占比2' }
        ]
      },
      ref
    )
    const option = instance.getOption()
    const series = option.series[0]
    expect(series.name).toBe('')
    // 无维度时 data 项按 valueList 的 fieldName 命名，值大于 1 保留 2 位小数
    expect(series.data.map((d: any) => d.name)).toEqual(['占比1', '占比2'])
    expect(series.data[0].value).toBe('10.00')
    await screen.unmount()
  })

  test('renders ring when showInRing is enabled', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderPie(
      {
        data: [
          { d1: 'A', v6: 1 },
          { d1: 'B', v6: 2 }
        ],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }],
        showInRing: true
      },
      ref
    )
    const option = instance.getOption()
    expect(option.series[0].radius).toEqual(['30%', '50%'])
    await screen.unmount()
  })

  test('getCenter adjusts for right/top/bottom legend positions', async () => {
    const refRight = React.createRef<any>()
    const { screen: s1, instance: i1 } = await renderPie(
      {
        data: [{ d1: 'A', v6: 1 }],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }],
        legendPosition: 'right'
      },
      refRight
    )
    expect(i1.getOption().series[0].center).toEqual(['45%', '50%'])
    await s1.unmount()

    const refTop = React.createRef<any>()
    const { screen: s2, instance: i2 } = await renderPie(
      {
        data: [{ d1: 'A', v6: 1 }],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }],
        legendPosition: 'top'
      },
      refTop
    )
    expect(i2.getOption().series[0].center).toEqual(['50%', '55%'])
    await s2.unmount()

    const refBottom = React.createRef<any>()
    const { screen: s3, instance: i3 } = await renderPie(
      {
        data: [{ d1: 'A', v6: 1 }],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }],
        legendPosition: 'bottom'
      },
      refBottom
    )
    expect(i3.getOption().series[0].center).toEqual(['50%', '45%'])
    await s3.unmount()
  })

  test('uses custom echartsSeries', async () => {
    const ref = React.createRef<any>()
    const customSeries = [{ name: 'custom', type: 'pie', data: [{ name: 'a', value: 1 }] }]
    const { screen, instance } = await renderPie(
      {
        data: [{ d1: 'A', v6: 1 }],
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

  test('uses 0 as value when missing in data with dimension', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderPie(
      {
        data: [
          { d1: 'A', v6: 1 },
          { d1: 'B' }
        ],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }]
      },
      ref
    )
    const option = instance.getOption()
    const values = option.series[0].data.map((d: any) => d.value)
    // |1| <= 1 → toFixed(4)，缺失值 → 0
    expect(values).toEqual(['1.0000', 0])
    await screen.unmount()
  })

  test('formats label percent or dash', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderPie(
      {
        data: [
          { d1: 'A', v6: 1 },
          { d1: 'B', v6: 3 }
        ],
        dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }]
      },
      ref
    )
    const option = instance.getOption()
    const formatter = option.series[0].label.formatter
    expect(formatter({ value: 1 })).toBe('25%') // 1/4*100 = 25
    expect(formatter({ value: 0 })).toBe('--%')
    await screen.unmount()
  })

  test('renders without dimension with missing value and default radius', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderPie(
      {
        data: [{ other: 'x' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }]
      },
      ref
    )
    const option = instance.getOption()
    // 无维度时取第一行数据，缺失字段 → value 0；showInRing 缺省 → radius '50%'
    expect(option.series[0].data[0].value).toBe(0)
    expect(option.series[0].radius).toBe('50%')
    await screen.unmount()
  })

  test('renders without dimension with empty data', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderPie(
      {
        data: [],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }]
      },
      ref
    )
    const option = instance.getOption()
    // 空数据 → d 为 {} → value 0
    expect(option.series[0].data[0].value).toBe(0)
    await screen.unmount()
  })

  test('renders without dimension with small value', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderPie(
      {
        data: [{ v6: 0.5 }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }]
      },
      ref
    )
    const option = instance.getOption()
    // |0.5| <= 1 → toFixed(4)
    expect(option.series[0].data[0].value).toBe('0.5000')
    await screen.unmount()
  })

  test('renders without dimension with string value', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderPie(
      {
        data: [{ v6: 'abc' }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }]
      },
      ref
    )
    const option = instance.getOption()
    // 非数字字符串 → 原样返回
    expect(option.series[0].data[0].value).toBe('abc')
    await screen.unmount()
  })

  test('renders ring without dimension', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderPie(
      {
        data: [{ v6: 1 }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }],
        showInRing: true
      },
      ref
    )
    const option = instance.getOption()
    expect(option.series[0].radius).toEqual(['30%', '50%'])
    await screen.unmount()
  })

  test('formats label without dimension', async () => {
    const ref = React.createRef<any>()
    const { screen, instance } = await renderPie(
      {
        data: [{ v6: 1 }],
        valueList: [{ fieldKey: 'v6', fieldName: '占比' }]
      },
      ref
    )
    const option = instance.getOption()
    const formatter = option.series[0].data[0].label.formatter
    // _sum = 1，1/1*100 = 100%
    expect(formatter({ value: 1 })).toBe('100%')
    await screen.unmount()
  })
})
