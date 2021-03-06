import React, {
  useContext,
  useRef,
  useCallback,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef
} from 'react'
import Big from 'big.js'
import type { ChartProps } from '@echarts-readymade/core'
import { mergeOption } from '@echarts-readymade/core'
import { COLOR_LIST } from '@echarts-readymade/core'
import WordCloud from 'wordcloud'
import maskCircle from './assets/mask-circle.png'
import maskDiamond from './assets/mask-diamond.png'
import maskJoy from './assets/mask-joy.png'
import maskGreat from './assets/mask-great.png'
import maskBad from './assets/mask-bad.png'
import maskOval from './assets/mask-oval.png'
import maskRect from './assets/mask-rect.png'
import maskCloud from './assets/mask-cloud.png'
import styled from 'styled-components'
import { useRect } from './useRect'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

export type WordcloudShape =
  | 'mask-joy'
  | 'mask-great'
  | 'mask-bad'
  | 'mask-oval'
  | 'mask-rect'
  | 'mask-cloud'
  | 'mask-circle'
  | 'mask-diamond'

export interface WordcloudOptions extends Omit<WordCloudTypes.Options, 'shape'> {
  shrinkToFit?: boolean
  shape?: WordcloudShape | string | ((theta: number) => number) | undefined
}

export interface WordcloudChartProps
  extends Omit<ChartProps, 'compareDimension' | 'echartsSeries' | 'setOption'> {
  colorList?: string[]
  fontSizeMode?: 'bySort' | 'byValue'
  shape?: WordcloudShape | string
  wordcloudOptions?: WordcloudOptions
  wordcloudStop?: () => void
}

export const Wordcloud: React.FC<WordcloudChartProps> = (props) => {
  const {
    context,
    dimension,
    valueList,
    colorList,
    fontSizeMode = 'bySort',
    wordcloudOptions,
    shape,
    wordcloudStop,
    ...restSettings
  } = props
  const { data } = useContext(context)

  if (!data) {
    return null
  }

  const ref = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef(null)
  const wrapperRect = useRect(wrapperRef)
  const textRef = useRef<HTMLSpanElement>(null)
  const tooltipRef = useRef<HTMLSpanElement & { getRect: () => DOMRect | undefined }>(null)
  const [isShowKeywordValueComp, setIsShowKeywordValueComp] = useState(false)
  const [pos, setPos] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0
  })
  const [val, setVal] = useState('')
  const _dimension = dimension && dimension.slice(0, 1)
  const _valueList = valueList && valueList.slice(0, 1)

  if (!(_dimension && _valueList && _dimension.length > 0 && _valueList.length > 0)) {
    return null
  }

  const getColor = useCallback(
    (index: number) => {
      if (colorList && colorList.length > 0) {
        return colorList[index % colorList.length]
      } else {
        return COLOR_LIST[index % COLOR_LIST.length]
      }
    },
    [colorList && colorList.join(',')]
  )

  const wordCloudCallback = useCallback(async () => {
    if (!ref || !ref.current) {
      return
    }

    const sortedData = () => {
      // ?????????????????????????????????
      const getFontSizeBySorting = (d: any[], index: number) => {
        const fontSizeRange = 200
        const per = (index / d.length) * 100
        let fontSize = 16
        const _width = wrapperRect?.width || 500
        let ratio = 1

        // ???????????????????????????????????????????????????????????????????????????
        if (d && d[0] && d[0][0] && d[0][0].length * 200 > _width) {
          ratio = _width / (360 + 50)
        }

        if (index == 0) {
          fontSize = 360
        } else if (index == 1) {
          fontSize = 200
        } else if (index == 2) {
          fontSize = 100
        } else {
          if (per < 10) {
            fontSize = 60
          } else if (per >= 10 && per < 20) {
            fontSize = 50
          } else if (per >= 20 && per < 30) {
            fontSize = 40
          } else if (per >= 30 && per < 40) {
            fontSize = 30
          } else if (per >= 40) {
            fontSize = 20
          }
        }

        return Big(fontSize * ratio)
          .round(0)
          .toNumber()
      }

      let fontSizeRatio = 1
      const minFontSize = 20
      const maxFontSize = 360
      const getFontSize = (d: any[], v: number, index: number) => {
        const max = d[0][1]
        const min = d[d.length - 1][1]
        const scale = (max - min) / (maxFontSize - minFontSize)

        const _fontSize = Big(v - min)
          .div(scale)
          .plus(minFontSize)
          .round(0)
          .toNumber()

        let _width = wrapperRect?.width || 500

        // ???????????????????????????????????????????????????????????????????????????
        if (textRef && textRef.current && index == 0) {
          textRef.current.innerText = d[0][0]
          textRef.current.style.fontSize = 360 + 'px'
          if (textRef.current.clientWidth > _width) {
            fontSizeRatio = _width / textRef.current.clientWidth
          }
        }
        return Math.round(_fontSize * fontSizeRatio)
      }

      let progressData =
        data?.map((d, i) => {
          const text = d[_dimension[0].fieldKey]
          let value: number | Big = 0
          if (d[_valueList[0].fieldKey]) {
            value = Big(d[_valueList[0].fieldKey])
            if (_valueList[0].isPercent) {
              value = value.times(100)
            }
            value = value.round(_valueList[0].decimalLength || 0).toNumber()
          }
          return [text || '--', value]
        }) || []
      // progressData = [
      //   ['??????', 39878014],
      //   ['??????', 7388903],
      //   ['??????', 2475055],
      //   ['??????', 2454790],
      //   ['??????', 1667918],
      //   ['??????', 1627002],
      //   [1664, 1546317],
      //   ['??????', 1331882],
      //   ['????????????', 1311626],
      //   ['??????', 1282018],
      //   ['??????', 1199154],
      //   ['??????', 1168907],
      //   ['?????????', 981333],
      //   ['?????????', 873413],
      //   ['??????', 872439],
      //   ['??????', 857355],
      //   ['??????', 744488],
      //   ['?????????', 623366],
      //   ['??????', 603007],
      //   ['??????', 601554],
      //   ['??????', 559529],
      //   ['??????', 411186],
      //   ['??????', 392475],
      //   ['??????', 365579],
      //   ['??????', 314261],
      //   ['????????????', 300359],
      //   ['?????????', 298168],
      //   ['??????', 289474],
      //   ['??????', 262216],
      //   ['?????????', 257401],
      //   ['?????????', 254176],
      //   ['?????????', 245959],
      //   ['??????', 235297],
      //   ['IPA', 227707],
      //   ['?????????', 224843],
      //   ['?????????', 205754],
      //   ['??????', 202846],
      //   ['?????????', 194663],
      //   ['??????', 192736],
      //   ['??????', 191719],
      //   ['500ML', 168866],
      //   ['?????????', 165310],
      //   ['????????????', 161727],
      //   ['?????????', 153587],
      //   ['?????????', 145594],
      //   ['????????????', 145401],
      //   ['??????', 138180],
      //   ['??????', 136496],
      //   ['?????????', 127835],
      //   ['??????', 118245],
      //   ['?????????', 114709],
      //   ['?????????', 114202],
      //   ['7???', 112067],
      //   ['??????', 109009],
      //   ['??????', 108253],
      //   ['??????', 105861],
      //   ['????????????', 105410],
      //   [330, 103140],
      //   ['?????????', 103008],
      //   ['??????', 97064],
      //   ['??????', 95966],
      //   ['??????', 93732],
      //   ['24???', 91857],
      //   ['?????????', 90790],
      //   ['??????', 88889],
      //   ['??????', 86575],
      //   ['??????', 83950],
      //   ['??????', 81538],
      //   ['?????????', 78969],
      //   ['?????????', 76457],
      //   ['????????????', 74749],
      //   ['??????', 72897],
      //   ['??????', 71566],
      //   ['?????????', 71369],
      //   ['??????', 70428],
      //   ['5L', 65722],
      //   ['5.0??????', 63811],
      //   ['????????????', 63766],
      //   ['??????', 63215],
      //   ['??????', 62995],
      //   ['??????', 62673],
      //   ['??????', 60467],
      //   ['??????', 59729],
      //   ['?????????', 57830],
      //   ['????????????', 57137],
      //   ['??????', 56822],
      //   ['??????', 56414],
      //   ['?????????', 55231],
      //   ['??????', 52766],
      //   ['????????????', 49676],
      //   ['??????', 48392],
      //   ['??????', 47589],
      //   ['????????????', 47314],
      //   ['??????', 46595],
      //   ['??????', 45941],
      //   ['?????????', 43646],
      //   ['?????????', 43527],
      //   ['?????????', 43523],
      //   ['??????', 42988],
      //   ['??????', 42983],
      //   ['??????', 41452],
      //   ['??????', 40365],
      //   ['??????', 37157],
      //   ['??????', 36681],
      //   ['?????????', 35461],
      //   ['?????????', 34983],
      //   [1964, 34874],
      //   ['?????????', 32786],
      //   ['??????', 32656],
      //   ['??????', 32112],
      //   ['??????', 31844],
      //   ['??????', 31406],
      //   ['??????', 30515],
      //   ['??????', 29023],
      //   ['??????', 28893],
      //   ['??????', 28549],
      //   ['?????????', 28062],
      //   ['??????', 25964],
      //   ['??????', 24164],
      //   ['????????????', 24154],
      //   ['PAULANER', 24049],
      //   ['?????????', 24000],
      //   ['??????', 23350],
      //   ['????????????', 22685],
      //   ['??????', 22551],
      //   ['??????', 22544],
      //   ['??????', 22089],
      //   ['HOEGAARDEN', 21198],
      //   ['????????????', 20354],
      //   ['?????????', 19758],
      //   ['??????1903', 19140],
      //   ['??????', 18571],
      //   ['28???', 18511],
      //   ['????????????', 18152],
      //   ['??????', 17431],
      //   ['??????', 17038],
      //   ['??????', 15756],
      //   ['??????????????????', 15585],
      //   ['??????', 15501],
      //   ['????????????', 15220],
      //   ['????????????superx', 14921],
      //   ['?????????', 13595],
      //   ['??????', 13335],
      //   ['??????', 13034],
      //   ['??????', 12975],
      //   ['??????', 12909],
      //   ['330ml*24', 12805],
      //   ['????????????', 12734],
      //   ['?????????', 12162],
      //   ['??????', 11968],
      //   ['????????????', 11829],
      //   ['??????', 11201],
      //   ['????????????', 11120],
      //   ['CASS', 11000],
      //   ['??????', 10815],
      //   ['?????????', 10806],
      //   ['?????????', 10769],
      //   ['??????', 10753],
      //   ['??????', 10525],
      //   ['?????????', 10398],
      //   ['?????????', 10341],
      //   ['??????', 9552],
      //   ['??????', 9537],
      //   ['??????', 9466],
      //   ['TIGER', 9309],
      //   ['????????????', 9136],
      //   ['??????', 8951],
      //   ['??????', 8947],
      //   ['KAISERDOM', 8277],
      //   ['??????', 8275],
      //   ['??????', 8117],
      //   ['LEO', 7894],
      //   ['ASAHI', 7639],
      //   ['??????', 7548],
      //   ['??????', 7538],
      //   ['????????????', 6710],
      //   ['?????????', 6621],
      //   ['??????????????????', 6621],
      //   ['?????????', 6568],
      //   ['?????????', 6452],
      //   ['??????', 6370],
      //   ['?????????', 6264],
      //   ['??????', 6070],
      //   ['????????????', 5799],
      //   ['?????????', 5721],
      //   ['??????', 5684],
      //   ['KIRIN', 5479],
      //   ['??????', 5353],
      //   ['???', 5328],
      //   ['??????', 5252],
      //   ['??????', 5123],
      //   ['VEDETT', 4929],
      //   ['??????', 4872],
      //   ['SUPER BOCK', 4439],
      //   ['??????', 3922],
      //   ['??????', 3809],
      //   ['??????', 3797],
      //   ['??????', 3752],
      //   [1998, 3500],
      //   ['????????????', 3444],
      //   ['??????', 3438],
      //   ['?????????', 3171],
      //   ['?????????', 2957],
      //   ['??????', 2947],
      //   ['PLUS', 2782],
      //   ['??????', 2690],
      //   ['????????????', 2621],
      //   ['??????', 2485],
      //   ['??????', 2471],
      //   ['????????????', 2328],
      //   ['??????', 2267],
      //   ['???????????????', 2147],
      //   ['????????????', 2123],
      //   ['??????', 1968],
      //   ['??????', 1869],
      //   ['??????', 1678],
      //   ['?????????', 1674],
      //   ['STOUT', 1655],
      //   ['??????', 1558],
      //   ['HB', 1432],
      //   ['??????', 1388],
      //   ['OJ', 1354],
      //   ['??????', 1292],
      //   ['??????', 1144],
      //   ['??????', 1006],
      //   ['??????', 905],
      //   ['??????', 865],
      //   ['??????', 834],
      //   ['24???', 744],
      //   ['ROCHEFORT', 645],
      //   ['SUPERBOCK', 635],
      //   ['??????', 635],
      //   ['??????', 610],
      //   ['????????????', 593],
      //   ['??????', 499],
      //   ['????????????', 499],
      //   ['??????', 485],
      //   ['?????????', 472],
      //   ['?????????', 425],
      //   ['PILSNER', 420],
      //   ['?????????', 409],
      //   ['?????????', 408],
      //   ['??????', 401],
      //   ['????????????', 370],
      //   ['???????????????', 328],
      //   ['????????????', 316],
      //   ['????????????', 316],
      //   ['?????????', 316],
      //   ['??????', 309],
      //   ['??????', 271],
      //   ['???????????????', 268],
      //   ['?????????', 222],
      //   ['??????', 207],
      //   ['??????', 185],
      //   ['?????????', 151],
      //   ['?????????', 149],
      //   ['??????', 137],
      //   ['????????????', 130],
      //   ['??????', 129],
      //   ['???????????????', 129],
      //   ['??????', 109],
      //   ['?????????', 100],
      //   ['LAMBIC', 94],
      //   ['??????', 88],
      //   ['??????', 83],
      //   ['????????????', 83],
      //   ['????????????18', 79],
      //   ['ORION', 77],
      //   ['???????????????', 72],
      //   ['??????', 70],
      //   ['??????', 67],
      //   ['??????', 62],
      //   ['??????', 58],
      //   ['????????????', 55],
      //   ['??????1998', 51],
      //   ['?????????', 39],
      //   ['??????7???', 38],
      //   ['??????', 37],
      //   ['????????????1998', 33],
      //   ['?????????', 32],
      //   ['????????????', 32],
      //   ['????????????', 30],
      //   ['?????????', 26],
      //   ['??????', 24],
      //   ['?????????', 20],
      //   ['????????????', 18],
      //   ['?????????', 17],
      //   ['??????9???', 14],
      //   ['ABBEY', 13],
      //   ['????????????', 13],
      //   ['????????????', 13],
      //   ['??????', 13],
      //   ['??????????????????', 12],
      //   ['??????', 12],
      //   ['????????????', 11]
      // ]

      let result: any[] = []
      if (progressData && progressData.length > 0) {
        result = progressData.sort((a, b) => {
          return b[1] - a[1]
        })
        result = result.map((item, index) => {
          if (fontSizeMode === 'bySort') {
            return [item[0], getFontSizeBySorting(result, index), item[1]]
          } else {
            return [item[0], getFontSize(result, item[1], index), item[1]]
          }
        })
      }

      // ??????????????????
      // if (progressData.length < FILL_LENGTH) {
      //   result = fillArray(result, FILL_LENGTH, (arr, i) => {
      //     if (arr[1] >= 60) {
      //       arr[1] = arr[1] * 0.2;
      //     }
      //     return arr;
      //   });
      // }

      return result
    }

    let maskImage: string = maskJoy
    if (typeof shape === 'string' && shape.includes('mask-')) {
      switch (shape) {
        case 'mask-circle':
          maskImage = maskCircle
          break
        case 'mask-diamond':
          maskImage = maskDiamond
          break
        case 'mask-joy':
          maskImage = maskJoy
          break
        case 'mask-great':
          maskImage = maskGreat
          break
        case 'mask-bad':
          maskImage = maskBad
          break
        case 'mask-oval':
          maskImage = maskOval
          break
        case 'mask-rect':
          maskImage = maskRect
          break
        case 'mask-cloud':
          maskImage = maskCloud
          break
        default:
          maskImage = shape
          break
      }
    }
    const maskCanvas = document.createElement('canvas')

    if (maskImage && process.env.NODE_ENV !== 'test') {
      await new Promise<void>((resolve, reject) => {
        const img = new Image()
        img.onload = async () => {
          maskCanvas.width = img.width
          maskCanvas.height = img.height
          const ctx = maskCanvas.getContext('2d')

          if (ref.current && wrapperRect) {
            ref.current.width = wrapperRect.width * 2
            ref.current.style.width = `${wrapperRect.width}px`
            const _height = (wrapperRect.width * img.height) / img.width
            ref.current.height = _height * 2
            ref.current.style.height = `${_height}px`
          }

          if (ctx) {
            ctx.drawImage(img, 0, 0, img.width, img.height)
            const imageData = ctx.getImageData(0, 0, maskCanvas.width, maskCanvas.height)
            const newImageData = ctx.createImageData(imageData)

            for (let i = 0; i < imageData.data.length; i += 4) {
              const tone = imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]
              const alpha = imageData.data[i + 3]

              if (alpha < 128 || tone > 128 * 3) {
                newImageData.data[i] = newImageData.data[i + 1] = newImageData.data[i + 2] = 255
                newImageData.data[i + 3] = 0
              } else {
                newImageData.data[i] = newImageData.data[i + 1] = newImageData.data[i + 2] = 0
                newImageData.data[i + 3] = 255
              }
            }

            ctx.putImageData(newImageData, 0, 0)
          }
          resolve()
        }
        img.src = maskImage
      })
    }

    if (maskCanvas) {
      /* Determine bgPixel by creating
       another canvas and fill the specified background color. */
      let bctx = document.createElement('canvas').getContext('2d')
      let bgPixel: ImageData | Uint8ClampedArray | null = null
      if (bctx) {
        bctx.fillStyle = (colorList && colorList.length > 0 ? colorList[0] : COLOR_LIST[0]) + '22'
        bctx.fillRect(0, 0, 1, 1)
        bgPixel = bctx.getImageData(0, 0, 1, 1).data
      }

      let maskCanvasScaled: HTMLCanvasElement | null = document.createElement('canvas')
      if (ref && ref.current) {
        maskCanvasScaled.width = ref.current.width
        maskCanvasScaled.height = ref.current.height
      }
      let ctx = maskCanvasScaled.getContext('2d')
      let imageData: ImageData | null = null
      let newImageData: ImageData | null = null
      if (ctx) {
        ctx.drawImage(
          maskCanvas,
          0,
          0,
          maskCanvas.width,
          maskCanvas.height,
          0,
          0,
          maskCanvasScaled.width,
          maskCanvasScaled.height
        )

        if (ref && ref.current) {
          imageData = ctx.getImageData(0, 0, ref.current.width, ref.current.height)
          newImageData = ctx.createImageData(imageData)
        }
      }
      if (imageData && newImageData && bgPixel) {
        for (let i = 0; i < imageData.data.length; i += 4) {
          if (imageData.data[i + 3] > 128) {
            newImageData.data[i] = bgPixel[0]
            newImageData.data[i + 1] = bgPixel[1]
            newImageData.data[i + 2] = bgPixel[2]
            newImageData.data[i + 3] = bgPixel[3]
          } else {
            // This color must not be the same w/ the bgPixel.
            newImageData.data[i] = bgPixel[0]
            newImageData.data[i + 1] = bgPixel[1]
            newImageData.data[i + 2] = bgPixel[2]
            newImageData.data[i + 3] = 0
          }
        }

        if (ctx) {
          ctx.putImageData(newImageData, 0, 0)
          if (ref && ref.current) {
            ctx = ref.current.getContext('2d')
          }
          if (ctx) {
            ctx.drawImage(maskCanvasScaled, 0, 0)
          }
        }
      }

      maskCanvasScaled = ctx = imageData = newImageData = bctx = bgPixel = null
    }

    const bgColor = (colorList && colorList.length > 0 ? colorList[0] : COLOR_LIST[0]) + '22'

    let _locker: NodeJS.Timeout | null = null
    if (ref.current) {
      const _list = sortedData()
      const _defaultOptions: WordcloudOptions = {
        list: _list,
        gridSize: 20, //Math.round(100 * ref.current.clientWidth / 1024),
        fontFamily: 'Microsoft YaHei',
        fontWeight: 600,
        color: function (word: any, _weight: any, fontSize: any, distance: any, theta: any) {
          // ???colorList??????
          const _index = _list.findIndex((item) => item[0] == word)
          let _alpha = '66'
          if (fontSize >= 100) {
            _alpha = 'FF'
          } else if (fontSize < 100 && fontSize > 30) {
            _alpha = 'AA'
          } else {
            _alpha = '66'
          }
          return getColor(_index) + _alpha
        },
        rotateRatio: 0,
        shape: shape || 'mask-joy', // https://wordcloud2-js.timdream.org/shape-generator.html
        drawOutOfBound: false,
        shrinkToFit: true,
        backgroundColor: bgColor,
        // minSize: '30px',
        clearCanvas: !maskCanvas,
        abortThreshold: 1000 * 5,
        hover: (item: any, dimension: any, event: any) => {
          if (!dimension) {
            setIsShowKeywordValueComp(false)
            return
          }

          function getLeft(x: number) {
            const rect = tooltipRef.current?.getRect()
            if (rect && x + rect.width + 100 >= window.innerWidth) {
              return (x - (x + rect.width - window.innerWidth)) / 2 - 50
            }
            return x / 2
          }

          setIsShowKeywordValueComp(true)
          setPos({
            top: dimension.y / 2 - 50,
            left: getLeft(dimension.x),
            width: dimension.w / 2,
            height: dimension.h / 2
          })
          setVal(
            `${item[3] || item[0]}: ${item[2] != null ? Big(item[2]).round(2).toNumber() : '--'}`
          )
          if (_locker) {
            clearTimeout(_locker)
          }
          _locker = setTimeout(() => {
            setIsShowKeywordValueComp(false)
          }, 5000)
        }
      }

      const options = mergeOption(_defaultOptions, wordcloudOptions)
      WordCloud(ref.current, options)
    }
  }, [
    _dimension && JSON.stringify(_dimension),
    _valueList && JSON.stringify(_valueList),
    getColor,
    // JSON.stringify(wrapperRect),
    ref.current,
    data,
    props
  ])

  useEffect(() => {
    if (ref.current) {
      ref.current.getContext('2d')?.clearRect(0, 0, ref.current.width, ref.current.height)
    }

    const timer = setTimeout(() => {
      wordCloudCallback()
    }, 100)

    return () => {
      WordCloud.stop()
      clearTimeout(timer)
    }
  }, [wordCloudCallback])

  useEffect(() => {
    if (wordcloudStop && ref.current) {
      ref.current.addEventListener('wordcloudstop', () => {
        wordcloudStop()
      })
    }
    return () => {
      if (wordcloudStop && ref.current) {
        ref.current.removeEventListener('wordcloudstop', () => {
          wordcloudStop()
        })
      }
    }
  }, [ref?.current])

  return (
    <>
      {data && data.length > 0 ? (
        <Wrapper ref={wrapperRef}>
          <canvas ref={ref}></canvas>
          <KeywordValueComp
            ref={tooltipRef}
            position={pos}
            value={val}
            visible={isShowKeywordValueComp}
          />
          <span
            ref={textRef}
            style={{ display: 'none', visibility: 'hidden', position: 'absolute' }}
          ></span>
        </Wrapper>
      ) : null}
    </>
  )
}

export interface IPosition {
  top: number
  left: number
  width: number
  height: number
}

export interface IKeywordValueCompProps {
  ref: React.Ref<any>
  position: IPosition
  value: string
  visible: boolean
}

const KeywordValueComp: React.FC<IKeywordValueCompProps> = forwardRef<
  { getRect: () => DOMRect | undefined },
  IKeywordValueCompProps
>((props, ref) => {
  const { position, value, visible } = props
  const [tooltipNode, setTooltipNode] = useState<HTMLSpanElement | null>(null)
  const tooltipRef = useCallback((node) => {
    if (node !== null) {
      setTooltipNode(node)
    }
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      getRect: () => {
        return tooltipNode?.getBoundingClientRect()
      }
    }),
    [tooltipNode]
  )

  return (
    <span
      ref={tooltipRef}
      style={{
        display: visible ? 'block' : 'none',
        position: 'absolute',
        top: position.top + 'px',
        left: position.left + 'px',
        padding: '5px',
        background: 'rgba(0,0,0,.5)',
        color: '#fff',
        borderRadius: '3px',
        transition: 'all .2s ease .1s',
        fontSize: '12px',
        whiteSpace: 'nowrap'
      }}
    >
      {value}
    </span>
  )
})
