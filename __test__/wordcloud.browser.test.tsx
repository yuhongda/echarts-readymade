import { describe, expect, test, vi, beforeEach } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-react'
import React from 'react'
import { ChartProvider, ChartContext } from '../packages/core/src/index'
import type { Field } from '../packages/core/src/index'
import { Wordcloud } from '../packages/wordcloud/src/index'

describe('testing <Wordcloud /> chart', () => {
  // test('<Wordcloud /> chart works fine', async () => {
  //   const WordcloudChart: React.FC<{ onDone: (result: boolean) => void }> = ({ onDone }) => {
  //     const data = [
  //       {
  //         d1: '啤酒',
  //         v1: 39878014
  //       },
  //       {
  //         d1: '自营',
  //         v1: 7388903
  //       },
  //       {
  //         d1: '青岛',
  //         v1: 2475055
  //       },
  //       {
  //         d1: '百威',
  //         v1: 2454790
  //       },
  //       {
  //         d1: '德国',
  //         v1: 1667918
  //       }
  //     ]

  //     const dimension: Field[] = [
  //       {
  //         fieldKey: 'd1',
  //         fieldName: '日期'
  //       }
  //     ]

  //     const valueList: Field[] = [
  //       {
  //         fieldKey: 'v1',
  //         fieldName: '词频'
  //       }
  //     ]

  //     return (
  //       <ChartProvider data={data}>
  //         <div style={{ width: 500, height: 500 }}>
  //           <Wordcloud
  //             context={ChartContext}
  //             dimension={dimension}
  //             valueList={valueList}
  //             colorList={[
  //               '#5657af',
  //               '#c94682',
  //               '#6197db',
  //               '#7f285d',
  //               '#727de4',
  //               '#dc81b7',
  //               '#553080',
  //               '#bb83d4',
  //               '#be509c',
  //               '#be5abb'
  //             ]}
  //             fontSizeMode="byValue"
  //             shape="mask-cloud"
  //             wordcloudStop={() => {
  //               onDone?.(true)
  //               console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>done')
  //             }}
  //           />
  //         </div>
  //       </ChartProvider>
  //     )
  //   }

  //   let done = false
  //   const screen = await render(<WordcloudChart onDone={(result) => (done = result)} />)
  //   await vi.waitFor(
  //     () => {
  //       expect(done).toBe(true)
  //     },
  //     {
  //       timeout: 5000
  //     }
  //   )
  //   screen.unmount()
  // })

  test('<Wordcloud /> chart tooltip works fine', async () => {
    const width = 1500
    const height = 1500

    const WordcloudChart: React.FC<{ onDone: (result: boolean) => void }> = ({ onDone }) => {
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

      return (
        <ChartProvider data={data}>
          <div style={{ width, height }}>
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
                onDone?.(true)
                console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>done')
              }}
            />
          </div>
        </ChartProvider>
      )
    }

    let done = false
    const screen = await render(<WordcloudChart onDone={(result) => (done = result)} />)
    await vi.waitFor(
      () => {
        expect(done).toBe(true)
        const canvas = document.querySelector('canvas') as HTMLCanvasElement
        if (canvas) {
          canvas.setAttribute('data-testid', 'my-canvas')
        }
      },
      {
        timeout: 5000
      }
    )
    expect(done).toBe(true)
    const canvasLocator = page.getByTestId('my-canvas')
    await canvasLocator.hover({ position: { x: 691, y: 799 } })
    const text = screen.getByText('啤酒').first()
    expect(text).toBeVisible()

  })

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
