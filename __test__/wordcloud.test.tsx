import '@testing-library/jest-dom'
import { render, waitFor, screen, act, fireEvent, createEvent } from '@testing-library/react'
import { findByText } from '@testing-library/dom'
import React, { useEffect, useRef } from 'react'
import { ChartProvider, ChartContext } from '../packages/core/src/index'
import type { Field } from '../packages/core/src/index'
import { Wordcloud } from '../packages/wordcloud/src/index'

jest.useRealTimers()

beforeEach((): void => {
  jest.useRealTimers()
  window.HTMLElement.prototype.getBoundingClientRect = function () {
    return {
      x: 851.671875,
      y: 200.046875,
      width: 500,
      height: 500,
      top: 967.046875,
      right: 860.015625,
      bottom: 984.046875,
      left: 851.671875
    }
  }
})

describe('testing <Wordcloud /> chart', () => {
  it('<Wordcloud /> chart works fine', async () => {
    const data = [
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
      },
      {
        d1: '德国',
        v1: 1667918
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

    const { container, rerender } = await render(
      <ChartProvider data={data}>
        <div style={{ width: 500, height: 500 }}>
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
              console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>done')
            }}
          />
        </div>
      </ChartProvider>
    )
    expect(container.getElementsByTagName('canvas')[0]).toBeVisible()
    await waitFor(async () => expect(done).toBe(true), { timeout: 5000 })

    // const MyComponent: React.FC<{ onDone: () => void }> = ({ onDone }) => {
    //   const ref = useRef<any>(null)
    //   useEffect(() => {
    //     if (onDone && ref.current) {
    //       ref.current.addEventListener('wordcloudstop', () => {
    //         console.log('>>>>>>>>>>>>>>>>>>>>')
    //         onDone()
    //       })
    //     }
    //     return () => {
    //       if (onDone && ref.current) {
    //         ref.current.removeEventListener('wordcloudstop', () => {
    //           onDone()
    //         })
    //       }
    //     }
    //   }, [ref?.current])

    //   useEffect(() => {
    //     if (ref.current) {
    //       setTimeout(() => {
    //         const event = new CustomEvent('wordcloudstop', {
    //           detail: {}
    //         })
    //         const res = ref.current.dispatchEvent(event)
    //         console.log('>>>>>>>>>>>>>>>>>>>>', res)
    //       }, 3000)
    //     }
    //   }, [ref?.current])
    //   return <canvas ref={ref}>123</canvas>
    // }

    // const { container, rerender } = await render(
    //   <MyComponent
    //     onDone={() => {
    //       console.log(22222222222222)
    //       done = true
    //     }}
    //   />
    // )
    // expect(await findByText(container, '123')).toBeVisible()
    // await rerender(
    //   <MyComponent
    //     onDone={() => {
    //       console.log(22222222222222)
    //       done = true
    //     }}
    //   />
    // )
    // await waitFor(async () => expect(done).toEqual(true), { timeout: 10000 })
  })
})
