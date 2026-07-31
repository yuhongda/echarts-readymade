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
})
