import { describe, expect, test, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import React from 'react'
import { ChartProvider, ChartContext } from '../packages/core/src/index'
import type { Field } from '../packages/core/src/index'
import { Table } from '../packages/table/src/index'

type TableTestProps = {
  data?: any[]
  dimension?: Field[]
  compareDimension?: Field[]
  valueList?: Field[]
  colorList?: string[]
  showRank?: boolean
  showSum?: boolean
  hideDimensionCompareTitle?: boolean
  blockWrapHeight?: number
  sortKey?: string
  setTableOption?: (columns: any[], dataSource: any[]) => {
    columns: any[]
    dataSource: any[]
  }
}

async function renderTable(props: TableTestProps, ref = React.createRef<any>()) {
  const screen = await render(
    <div style={{ width: 800, height: 600 }}>
      <ChartProvider data={props.data}>
        <Table
          context={ChartContext}
          dimension={props.dimension}
          compareDimension={props.compareDimension}
          valueList={props.valueList}
          colorList={props.colorList}
          showRank={props.showRank}
          showSum={props.showSum}
          hideDimensionCompareTitle={props.hideDimensionCompareTitle}
          blockWrapHeight={props.blockWrapHeight}
          sortKey={props.sortKey}
          setTableOption={props.setTableOption}
          ref={ref}
        />
      </ChartProvider>
    </div>
  )
  await vi.waitFor(
    () => {
      expect(document.querySelector('.ant-table')).toBeTruthy()
    },
    { timeout: 10000 }
  )
  return { screen }
}

describe('testing <Table /> chart', () => {
  test('renders nothing when data is empty', async () => {
    const screen = await render(
      <ChartProvider>
        <Table
          context={ChartContext}
          dimension={[{ fieldKey: 'd1', fieldName: '日期' }]}
          valueList={[{ fieldKey: 'v6', fieldName: '占比' }]}
        />
      </ChartProvider>
    )
    // data 为空时组件直接返回 null，不渲染表格
    expect(document.querySelector('.ant-table')).toBeNull()
    await screen.unmount()
  })

  test('renders without compareDimension', async () => {
    const { screen } = await renderTable({
      data: [
        { d1: '2020-01', v6: 1 },
        { d1: '2020-02', v6: 2 }
      ],
      dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
      valueList: [{ fieldKey: 'v6', fieldName: '占比' }]
    })
    expect(screen.getByText('日期')).toBeTruthy()
    expect(screen.getByText('2020-01')).toBeTruthy()
    await screen.unmount()
  })

  test('renders with showSum', async () => {
    const { screen } = await renderTable({
      data: [
        { d1: '2020-01', v6: 1 },
        { d1: '2020-02', v6: 3 }
      ],
      dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
      valueList: [{ fieldKey: 'v6', fieldName: '占比' }],
      showSum: true
    })
    expect(screen.getByText('总计')).toBeTruthy()
    await screen.unmount()
  })

  test('renders with showRank', async () => {
    const { screen } = await renderTable({
      data: [
        { d1: '2020-01', v6: 1 },
        { d1: '2020-02', v6: 2 }
      ],
      dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
      valueList: [{ fieldKey: 'v6', fieldName: '占比' }],
      showRank: true
    })
    // 排名 1、2 应显示
    expect(screen.getByText('1')).toBeTruthy()
    expect(screen.getByText('2')).toBeTruthy()
    await screen.unmount()
  })

  test('renders isPercent values', async () => {
    const { screen } = await renderTable({
      data: [{ d1: '2020-01', v6: 0.5 }],
      dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
      valueList: [{ fieldKey: 'v6', fieldName: '占比', isPercent: true, decimalLength: 1 }]
    })
    // 0.5 * 100 = 50 → '50.0%'
    expect(screen.getByText('50.0%')).toBeTruthy()
    await screen.unmount()
  })

  test('renders with compareDimension', async () => {
    const { screen } = await renderTable({
      data: [
        { d1: '2020-01', d2: '北京', v6: 1 },
        { d1: '2020-01', d2: '上海', v6: 2 }
      ],
      dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
      compareDimension: [{ fieldKey: 'd2', fieldName: '城市' }],
      valueList: [{ fieldKey: 'v6', fieldName: '占比' }]
    })
    expect(screen.getByText('北京')).toBeTruthy()
    expect(screen.getByText('上海')).toBeTruthy()
    await screen.unmount()
  })

  test('renders with compareDimension and showSum', async () => {
    const { screen } = await renderTable({
      data: [
        { d1: '2020-01', d2: '北京', v6: 1 },
        { d1: '2020-01', d2: '上海', v6: 2 }
      ],
      dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
      compareDimension: [{ fieldKey: 'd2', fieldName: '城市' }],
      valueList: [{ fieldKey: 'v6', fieldName: '占比' }],
      showSum: true
    })
    expect(screen.getByText('总计')).toBeTruthy()
    await screen.unmount()
  })

  test('renders with hideDimensionCompareTitle', async () => {
    const { screen } = await renderTable({
      data: [{ d1: '2020-01', d2: '北京', v6: 1 }],
      dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
      compareDimension: [{ fieldKey: 'd2', fieldName: '城市' }],
      valueList: [{ fieldKey: 'v6', fieldName: '占比' }],
      hideDimensionCompareTitle: true
    })
    expect(screen.getByText('北京')).toBeTruthy()
    await screen.unmount()
  })

  test('uses setTableOption to customize data', async () => {
    const { screen } = await renderTable({
      data: [{ d1: '2020-01', v6: 1 }],
      dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
      valueList: [{ fieldKey: 'v6', fieldName: '占比' }],
      setTableOption: (columns, dataSource) => ({
        columns,
        dataSource: dataSource.map((d: any) => ({ ...d, v6: 999 }))
      })
    })
    expect(screen.getByText('999')).toBeTruthy()
    await screen.unmount()
  })

  test('renders with sortKey', async () => {
    const { screen } = await renderTable({
      data: [{ d1: '2020-01', v6: 1 }],
      dimension: [{ fieldKey: 'd1', fieldName: '日期' }],
      valueList: [{ fieldKey: 'v6', fieldName: '占比' }],
      sortKey: 'test-sort-key'
    })
    expect(screen.getByText('2020-01')).toBeTruthy()
    await screen.unmount()
  })
})
