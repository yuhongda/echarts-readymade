import '@testing-library/jest-dom'
import { render, waitFor, screen, act, fireEvent } from '@testing-library/react'
import React, { useRef } from 'react'
import { ChartProvider, ChartContext } from '../packages/core/src/index'
import type { Field } from '../packages/core/src/index'
import { Wordcloud } from '../packages/wordcloud/src/index'

jest.useRealTimers()
beforeEach((): void => {
  jest.useRealTimers()
})

describe('testing <Wordcloud /> chart', () => {
  it('<Wordcloud /> chart works fine', async () => {
    const data = [
      {
        d1: '啤酒',
        v1: 39878014
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
        fieldKey: 'v1',
        fieldName: '词频'
      }
    ]

    let done = false

    const { debug, queryByText } = await render(
      <div style={{ width: 500, height: 500 }}>
        <ChartProvider data={data}>
          <Wordcloud
            context={ChartContext}
            dimension={dimension}
            valueList={valueList}
            colorList={[
              '#5657af',
              '#c94682',
              '#6197db',
              '#7f285d',
              '#727de4',
              '#dc81b7',
              '#553080',
              '#bb83d4',
              '#be509c',
              '#be5abb'
            ]}
            fontSizeMode="byValue"
            shape="mask-cloud"
            wordcloudStop={() => {
              done = true
            }}
          />
        </ChartProvider>
      </div>
    )

    await waitFor(async () => expect(done).toEqual(true), { timeout: 10000 })
  })
})
