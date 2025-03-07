import React, { useEffect, useRef, useState } from 'react'
// import { ChartContext, ChartProvider } from '@echarts-readymade/core'
// import { Bar } from '@echarts-readymade/bar'
// import { ChartProvider, Bar } from 'echarts-readymade'
// import type { LegendPosition, Field } from 'echarts-readymade'
import { ChartProvider, ChartContext, LegendPosition } from '../../../packages/core/src'
import { Bar } from '../../../packages/bar/src'
import styled from 'styled-components'
import { Radio, Button, Row, Col } from 'antd'

const Container = styled.div`
  width: 100%;
  height: 500px;
`

export const BarChart: React.FC = () => {
  const ref = useRef<any>(null)
  useEffect(() => {
    if (ref.current) {
      // boom!!
      const instance = ref.current.getEchartsInstance()
      console.log(instance)
      // so next, you can use Echarts instance api
      // instance.setOption(...)
    }
  }, [ref.current])

  const [data, setData] = useState([
    {
      v6: 0.8141021277904137,
      d1: '2020-12-31',
      d2: '北京',
      v4: null,
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
  ])

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

  const [legendPosition, setLegendPosition] = useState('top')

  return (
    <Container>
      <Radio.Group
        value={legendPosition}
        buttonStyle="solid"
        onChange={(e) => setLegendPosition(e.target.value)}
      >
        <Radio.Button value="top">Top</Radio.Button>
        <Radio.Button value="right">Right</Radio.Button>
        <Radio.Button value="bottom">Bottom</Radio.Button>
        <Radio.Button value="left">Left</Radio.Button>
      </Radio.Group>
      <Button
        onClick={() => {
          setData(
            data.map((d) => ({
              ...d,
              v6: Math.random(),
              v4: Math.random() * 100,
              v5: Math.random() * 100
            }))
          )
        }}
      >
        Reload
      </Button>
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
            // color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
          }
        }}
      >
        <Row gutter={16} style={{ height: 500 }}>
          <Col span={12}>
            <Bar
              ref={ref}
              context={ChartContext}
              dimension={dimension}
              valueList={valueList}
              legendPosition={legendPosition as LegendPosition}
            />
          </Col>
          <Col span={12}>
            <Bar
              context={ChartContext}
              dimension={dimension}
              compareDimension={compareDimension}
              valueList={valueList}
              legendPosition={legendPosition as LegendPosition}
            />
          </Col>
        </Row>
      </ChartProvider>
    </Container>
  )
}
