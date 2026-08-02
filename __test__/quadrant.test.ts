import { describe, expect, test } from 'vitest'
import { quadrantSetting } from '../packages/scatter/src/plugins/quadrant'

// quadrant 插件期望的数据项为 { value: [x, y] }（scatter 标准格式）
const baseOption = (data: number[][]) => ({
  series: [{ data: data.map((v) => ({ value: v })) }]
}) as any

const baseSetting = (quadrantType: string) => ({
  show: true,
  quadrantType,
  quadrant1Name: 'q1',
  quadrant2Name: 'q2',
  quadrant3Name: 'q3',
  quadrant4Name: 'q4',
  bgColors: ['c1', 'c2', 'c3', 'c4']
})

describe('quadrantSetting()', () => {
  test('does nothing when option is undefined', () => {
    const option = baseOption([[1, 2]])
    quadrantSetting(option, undefined)
    expect(option.series[0].markLine).toBeUndefined()
  })

  test('does nothing when show is false', () => {
    const option = baseOption([[1, 2]])
    quadrantSetting(option, { show: false } as any)
    expect(option.series[0].markLine).toBeUndefined()
  })

  test('does nothing when series data is empty', () => {
    const option = baseOption([])
    quadrantSetting(option, baseSetting('equal'))
    expect(option.series[0].markLine).toBeUndefined()
  })

  test('equal quadrantType', () => {
    const option = baseOption([
      [1, 2],
      [3, 4]
    ])
    quadrantSetting(option, baseSetting('equal'))
    expect(option.xAxis.max).toBe(3)
    expect(option.grid.right).toBe(70)
    // markLine 中位线从 0 到 max
    expect(option.series[0].markLine.data[0][0].xAxis).toBe('0')
    expect(option.series[0].markArea).toBeDefined()
    // 第一个象限从 maxX/2 开始
    expect(option.series[0].markArea.data[0][0].xAxis).toBe('1.5')
    expect(option.series[0].markArea.data[0][0].itemStyle.color).toBe('c1')
  })

  test('median quadrantType with odd length', () => {
    const option = baseOption([
      [10, 1],
      [5, 3],
      [2, 8]
    ])
    quadrantSetting(option, baseSetting('median'))
    // 按 x 排序后中位数 5，按 y 排序后中位数 3
    expect(option.series[0].markArea.data[0][0].xAxis).toBe('5')
    expect(option.series[0].markArea.data[0][0].yAxis).toBe('3')
    expect(option.series[0].markLine.data[0].type).toBe('median')
  })

  test('median quadrantType with even length', () => {
    const option = baseOption([
      [1, 2],
      [3, 4]
    ])
    quadrantSetting(option, baseSetting('median'))
    // medianX = (1+3)/2 = 2，medianY = (2+4)/2 = 3
    expect(option.series[0].markArea.data[0][0].xAxis).toBe('2')
    expect(option.series[0].markArea.data[0][0].yAxis).toBe('3')
  })

  test('average quadrantType uses type for axes', () => {
    const option = baseOption([
      [1, 2],
      [3, 4]
    ])
    quadrantSetting(option, baseSetting('average'))
    expect(option.series[0].markLine.data[0].type).toBe('average')
    expect(option.series[0].markArea.data[0][0].xAxis).toBe('average')
  })

  test('keeps existing xAxis and grid when they are arrays', () => {
    const option = {
      xAxis: [{ type: 'value' }],
      grid: [{ left: 10 }],
      series: [{ data: [{ value: [1, 2] }] }]
    } as any
    quadrantSetting(option, baseSetting('max'))
    // 数组形式的 xAxis/grid 不会被覆盖
    expect(option.xAxis[0].type).toBe('value')
    expect(option.grid[0].left).toBe(10)
    expect(option.series[0].markLine.data[0].type).toBe('max')
  })
})
