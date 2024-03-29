import React, { useState } from 'react'
import { ChartProvider, ChartContext } from '../../../packages/core/src'
import { Table } from '../../../packages/table/src'
import styled from 'styled-components'
import type { Field } from '@echarts-readymade/core'
import { Button, Row, Col } from 'antd'

const Container = styled.div`
  width: 100%;
`

export const TableChart: React.FC = () => {
  const [data, setData] = useState([
    {
      v6: 0.8141021277904137,
      d1: '2020年',
      d2: '北京',
      v4: 50.028318723339325,
      v5: 27.577454409512264,
      children: [
        {
          v6: 0.8141021277904137,
          d1: '2020-Q4',
          d2: '北京',
          v4: 50.028318723339325,
          v5: 27.577454409512264,
          children: [
            {
              v6: 0.8141021277904137,
              d1: '2020-12-31',
              d2: '北京',
              v4: 50.028318723339325,
              v5: 27.577454409512264,
              children: []
            }
          ]
        }
      ]
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
      isPercent: true,
      width: 100
    },
    {
      fieldKey: 'v4',
      fieldName: '占比2',
      decimalLength: 3
    },
    {
      fieldKey: 'v5',
      fieldName: '占比3'
    }
  ]

  return (
    <Container>
      Table
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
      <ChartProvider data={data}>
        <Row gutter={16} style={{ height: 500 }}>
          <Col span={12}>
            <Table
              context={ChartContext}
              dimension={dimension}
              valueList={valueList}
              sortKey={'normal'}
              blockWrapHeight={500}
              showSum
              // colorList={['#fafafa', '#333', '#ffc000', '#333', 'rgba(0, 0, 0, 0.5)', '#fff']}
              setOption={(columns, dataSource) => {
                console.log({ columns, dataSource })
                return {
                  columns,
                  dataSource
                }
              }}
            />
          </Col>
          <Col span={12}>
            <Table
              context={ChartContext}
              dimension={dimension}
              compareDimension={compareDimension}
              valueList={valueList}
              // colorList={['#002fa7', '#fff', '#ffc000']}
              // antdOptions={{
              //   size: 'small'
              // }}
              sortKey={'compare'}
            />
          </Col>
        </Row>
      </ChartProvider>
    </Container>
  )
}
