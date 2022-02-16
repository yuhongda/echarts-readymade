import '@testing-library/jest-dom'
import { render, waitFor, screen, act, fireEvent, createEvent } from '@testing-library/react'
import { findByText } from '@testing-library/dom'
import React, { useEffect, useRef } from 'react'
import { ChartProvider, Field } from '../packages/echarts-readymade/src/index'
import {
  Bar,
  Line,
  Pie,
  Scatter,
  Stack,
  Wordcloud,
  BarHorizontal
} from '../packages/echarts-readymade/src/index'

describe('testing echarts-readymade', () => {
  it('echarts-readymade works fine', async () => {
    expect(Bar).toBeDefined()
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

    let instanceBar1: any
    let instanceBar2: any
    let instanceLine1: any
    let instanceLine2: any
    let instanceBarHorizontal1: any
    let instanceBarHorizontal2: any
    let instancePie: any
    let instanceScatter: any
    let instanceStack: any

    let done = false

    const { container } = await render(
      <div style={{ width: 500, height: 500 }}>
        <ChartProvider data={data}>
          <Bar
            dimension={dimension}
            valueList={valueList}
            legendPosition="top"
            ref={(node) => {
              instanceBar1 = node
            }}
          />
          <Bar
            dimension={dimension}
            compareDimension={compareDimension}
            valueList={valueList}
            legendPosition="top"
            ref={(node) => {
              instanceBar2 = node
            }}
          />
          <Line
            dimension={dimension}
            valueList={valueList}
            legendPosition="top"
            ref={(node) => {
              instanceLine1 = node
            }}
          />
          <Line
            dimension={dimension}
            compareDimension={compareDimension}
            valueList={valueList}
            legendPosition="top"
            ref={(node) => {
              instanceLine2 = node
            }}
          />
          <BarHorizontal
            dimension={dimension}
            valueList={valueList}
            legendPosition="top"
            ref={(node) => {
              instanceBarHorizontal1 = node
            }}
          />
          <BarHorizontal
            dimension={dimension}
            compareDimension={compareDimension}
            valueList={valueList}
            legendPosition="top"
            ref={(node) => {
              instanceBarHorizontal2 = node
            }}
          />
          <Pie
            dimension={dimension}
            valueList={valueList}
            ref={(node) => {
              instancePie = node
            }}
          />
          <Scatter
            dimension={dimension}
            valueList={valueList}
            ref={(node) => {
              instanceScatter = node
            }}
          />
          <Stack
            dimension={dimension}
            valueList={valueList}
            ref={(node) => {
              instanceStack = node
            }}
          />
        </ChartProvider>
        <ChartProvider data={data2}>
          <Wordcloud
            dimension={dimension}
            valueList={valueList}
            wordcloudStop={() => {
              done = true
            }}
          />
        </ChartProvider>
      </div>
    )

    expect(instanceBar1).toBeDefined()
    expect(instanceBar1.getEchartsInstance()).toBeDefined()
    expect(instanceBar2).toBeDefined()
    expect(instanceBar2.getEchartsInstance()).toBeDefined()
    expect(instanceLine1).toBeDefined()
    expect(instanceLine1.getEchartsInstance()).toBeDefined()
    expect(instanceLine2).toBeDefined()
    expect(instanceLine2.getEchartsInstance()).toBeDefined()
    expect(instanceBarHorizontal1).toBeDefined()
    expect(instanceBarHorizontal1.getEchartsInstance()).toBeDefined()
    expect(instanceBarHorizontal2).toBeDefined()
    expect(instanceBarHorizontal2.getEchartsInstance()).toBeDefined()
    expect(instancePie).toBeDefined()
    expect(instancePie.getEchartsInstance()).toBeDefined()
    expect(instanceScatter).toBeDefined()
    expect(instanceScatter.getEchartsInstance()).toBeDefined()
    expect(instanceStack).toBeDefined()
    expect(instanceStack.getEchartsInstance()).toBeDefined()
    expect(container.getElementsByTagName('canvas')[0]).toBeVisible()
    // await waitFor(async () => expect(done).toBe(true), { timeout: 5000 })
  })
})
