import { describe, expect, test } from 'vitest'
import React from 'react'
import { buildChartOption } from '../packages/core/src/index'
import { echartsOptionsBase, mergeOption, truncate, numberWithCommas } from '../packages/core/src/misc'

describe('testing buildChartOption()', () => {
  test('legendPosition top works fine', async () => {
    const option = buildChartOption(echartsOptionsBase, { legendPosition: 'top' }, 'bar')
    expect(option).toMatchSnapshot()
  })

  test('legendPosition left works fine', async () => {
    const option = buildChartOption(echartsOptionsBase, { legendPosition: 'left' }, 'bar')
    expect(option).toMatchSnapshot()
  })

  test('legendPosition right works fine', async () => {
    const option = buildChartOption(echartsOptionsBase, { legendPosition: 'right' }, 'bar')
    expect(option).toMatchSnapshot()
  })

  test('legendPosition bottom works fine', async () => {
    const option = buildChartOption(echartsOptionsBase, { legendPosition: 'bottom' }, 'bar')
    expect(option).toMatchSnapshot()
  })

  test('mergeOption() works fine', async () => {
    const mergedOption = mergeOption({ a: 1 }, { b: 2 })
    expect(mergedOption).toEqual({ a: 1, b: 2 })
  })

  test('truncate() works fine', async () => {
    const truncatedString = truncate('1234567890', 3)
    expect(truncatedString).toBe('123...')
  })

  test('numberWithCommas() works fine', async () => {
    const n = numberWithCommas(1234567890)
    expect(n).toBe('1,234,567,890')
  })

  // ===== 以下为新增测试，用于提高 core 覆盖率 =====

  test('buildChartOption pie builds legend data from series', async () => {
    const option = buildChartOption(
      {
        series: [
          { type: 'pie', data: [{ name: 'a', value: 1 }, { name: 'b', value: 2 }] }
        ]
      } as any,
      { legendPosition: 'top' },
      'pie'
    ) as any
    expect(option.legend.data.map((i: any) => i.name)).toEqual(['a', 'b'])
    expect(option.tooltip.trigger).toBe('item')
  })

  test('buildChartOption tooltip trigger for scatter', async () => {
    const option = buildChartOption(echartsOptionsBase, { legendPosition: 'top' }, 'scatter') as any
    expect(option.tooltip.trigger).toBe('item')
  })

  test('buildChartOption with falsy legendPosition uses default layout', async () => {
    const option = buildChartOption(echartsOptionsBase, { legendPosition: '' } as any, 'bar') as any
    expect(option.legend.bottom).toBe('6%')
  })

  test('buildChartOption hidden legend', async () => {
    const option = buildChartOption(
      { ...echartsOptionsBase, legend: { ...echartsOptionsBase.legend, show: false } },
      { legendPosition: 'top' },
      'bar'
    ) as any
    expect(option.legend.top).toBe(60)
    expect(option.grid.top).toBe(100)
  })

  test('buildChartOption stack legend reversed when left/right', async () => {
    const option = buildChartOption(
      {
        legend: { show: true },
        series: [{ name: 'a', type: 'bar' }, { name: 'b', type: 'bar' }]
      } as any,
      { legendPosition: 'left' },
      'stack'
    ) as any
    expect(option.legend.data.map((i: any) => i.name)).toEqual(['b', 'a'])
  })

  test('buildChartOption legend formatter truncates long text', async () => {
    const option = buildChartOption(echartsOptionsBase, { legendPosition: 'top' }, 'bar') as any
    expect(option.legend.formatter('一二三四五六七八九十一二三四五六七八九十')).toContain('...')
    expect(option.legend.formatter('123')).toBe('123')
  })

  test('tooltip formatter handles pie/line/default series', async () => {
    const formatter = echartsOptionsBase.tooltip.formatter as any
    const html = formatter([
      { name: 'a', seriesType: 'pie', color: '#fff', data: { value: 1, isPercent: true } },
      {
        name: 'b',
        seriesType: 'line',
        color: '#000',
        data: { value: 2, isPercent: false, decimalLength: 2 }
      },
      { name: 'c', seriesType: 'bar', color: '#111', data: { value: null } }
    ])
    expect(html).toContain('column-count')
    expect(html).toContain('a')
  })

  test('tooltip formatter handles single data', async () => {
    const formatter = echartsOptionsBase.tooltip.formatter as any
    const html = formatter({ name: 'c', seriesType: 'bar', color: '#111', data: { value: null } })
    expect(html).toContain('--')
  })

  test('truncate() edge cases', async () => {
    expect(truncate('', 3)).toBe('')
    expect(truncate('一二三四五六七八九十', 5)).toContain('...')
  })

  test('numberWithCommas() edge cases', async () => {
    expect(numberWithCommas(null)).toBe('--')
    expect(numberWithCommas(undefined)).toBe('--')
    expect(numberWithCommas(1234.5)).toBe('1,234.5')
  })
})
