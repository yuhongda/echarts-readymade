import { describe, expect, test, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import React from 'react'
import { ChartProvider, Field } from '../packages/echarts-readymade/src/index'
import {
  Bar,
  Line,
  Pie,
  Scatter,
  Stack,
  Wordcloud,
  BarHorizontal,
  Table
} from '../packages/echarts-readymade/src/index'

describe('testing echarts-readymade', () => {
  test('echarts-readymade works fine', async () => {
    const barRef = React.createRef<any>()
    const lineRef = React.createRef<any>()
    const pieRef = React.createRef<any>()
    const scatterRef = React.createRef<any>()
    const stackRef = React.createRef<any>()
    const barHorizontalRef = React.createRef<any>()

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

    const data2 = [
      {
        d1: '啤酒',
        v1: 39878014
      },
      {
        d1: '自营',
        v1: 7388903
      },
      {
        d1: '青岛',
        v1: 2475055
      },
      {
        d1: '百威',
        v1: 2454790
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

    // bar
    const screen = await render(
      <div style={{ width: 500, height: 500 }}>
        <ChartProvider data={data}>
          <Bar dimension={dimension} valueList={valueList} legendPosition="top" ref={barRef} />
        </ChartProvider>
      </div>
    )
    if (barRef.current) {
      await vi.waitFor(() => {
        expect(barRef.current?.getEchartsInstance()).toBeDefined()
      })
    }
    await screen.unmount()

    // line
    const screen2 = await render(
      <div style={{ width: 500, height: 500 }}>
        <ChartProvider data={data}>
          <Line dimension={dimension} valueList={valueList} legendPosition="top" ref={lineRef} />
        </ChartProvider>
      </div>
    )
    if (lineRef.current) {
      await vi.waitFor(() => {
        expect(lineRef.current?.getEchartsInstance()).toBeDefined()
      })
    }
    await screen2.unmount()

    // pie
    const screen3 = await render(
      <div style={{ width: 500, height: 500 }}>
        <ChartProvider data={data}>
          <Pie dimension={dimension} valueList={valueList} ref={pieRef} />
        </ChartProvider>
      </div>
    )
    if (pieRef.current) {
      await vi.waitFor(() => {
        expect(pieRef.current?.getEchartsInstance()).toBeDefined()
      })
    }
    await screen3.unmount()

    // scatter
    const screen4 = await render(
      <div style={{ width: 500, height: 500 }}>
        <ChartProvider data={data}>
          <Scatter dimension={dimension} valueList={valueList} ref={scatterRef} />
        </ChartProvider>
      </div>
    )
    if (scatterRef.current) {
      await vi.waitFor(() => {
        expect(scatterRef.current?.getEchartsInstance()).toBeDefined()
      })
    }
    await screen4.unmount()

    // stack
    const screen5 = await render(
      <div style={{ width: 500, height: 500 }}>
        <ChartProvider data={data}>
          <Stack dimension={dimension} valueList={valueList} ref={stackRef} />
        </ChartProvider>
      </div>
    )
    if (stackRef.current) {
      await vi.waitFor(() => {
        expect(stackRef.current?.getEchartsInstance()).toBeDefined()
      })
    }
    await screen5.unmount()

    // barHorizontal
    const screen6 = await render(
      <div style={{ width: 500, height: 500 }}>
        <ChartProvider data={data}>
          <BarHorizontal dimension={dimension} valueList={valueList} ref={barHorizontalRef} />
        </ChartProvider>
      </div>
    )
    if (barHorizontalRef.current) {
      await vi.waitFor(() => {
        expect(barHorizontalRef.current?.getEchartsInstance()).toBeDefined()
      })
    }
    await screen6.unmount()

    // wordcloud
    const screen7 = await render(
      <div style={{ width: 500, height: 500 }}>
        <ChartProvider data={data2}>
          <Wordcloud
            dimension={[{ fieldKey: 'd1', fieldName: '词' }]}
            valueList={[{ fieldKey: 'v1', fieldName: '词频' }]}
          />
        </ChartProvider>
      </div>
    )
    await screen7.unmount()

    // table
    const screen8 = await render(
      <div style={{ width: 800, height: 500 }}>
        <ChartProvider data={data}>
          <Table
            dimension={dimension}
            valueList={[{ fieldKey: 'v6', fieldName: '占比' }]}
          />
        </ChartProvider>
      </div>
    )
    await vi.waitFor(() => {
      expect(document.querySelector('.ant-table')).toBeTruthy()
    })
    await screen8.unmount()
  })
})
