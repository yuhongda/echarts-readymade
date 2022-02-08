import '@testing-library/jest-dom'
import { render, waitFor, screen, act } from '@testing-library/react'
import React from 'react'
import { buildChartOption } from '../packages/core/src/index'
import { echartsOptionsBase } from '../packages/core/src/misc'

describe('testing buildChartOption()', () => {
  it('buildChartOption() work fine', async () => {
    const option = buildChartOption(echartsOptionsBase, { legendPosition: 'top' }, 'bar')
    expect(option).toMatchSnapshot('buildChartOption() work fine 1')
  })
})
