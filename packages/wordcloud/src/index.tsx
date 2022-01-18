import React, { useContext, useRef, useCallback, useState, useEffect } from 'react'
import { multiply, round } from 'mathjs/number'
import cloneDeep from 'lodash/cloneDeep'
import type { ChartProps, LegendPosition, Field } from '@echarts-readymade/core'
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
      // 按数值排序计算字体大小
      const getFontSizeBySorting = (d: any[], index: number) => {
        const fontSizeRange = 200
        const per = (index / d.length) * 100
        let fontSize = 16
        const _width = wrapperRect?.width || 500
        let ratio = 1

        // 如果排名第一个词的字体长度超出画布，则计算缩放比例
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

        return round(fontSize * ratio, 0)
      }

      let fontSizeRatio = 1
      const minFontSize = 20
      const maxFontSize = 360
      const getFontSize = (d: any[], v: number, index: number) => {
        const max = d[0][1]
        const min = d[d.length - 1][1]
        const scale = (max - min) / (maxFontSize - minFontSize)

        const _fontSize = round((v - min) / scale + minFontSize, 0)

        let _width = wrapperRect?.width || 500

        // 如果排名第一个词的字体长度超出画布，则计算缩放比例
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
          let value = 0
          if (d[_valueList[0].fieldKey]) {
            value = d[_valueList[0].fieldKey]
            if (_valueList[0].isPercent) {
              value = multiply(d[_valueList[0].fieldKey], 100)
            }
            value = round(value, _valueList[0].decimalLength || 0)
          }
          return [text || '--', value]
        }) || []
      // progressData = [
      //   ['啤酒', 39878014],
      //   ['自营', 7388903],
      //   ['青岛', 2475055],
      //   ['百威', 2454790],
      //   ['德国', 1667918],
      //   ['精酿', 1627002],
      //   [1664, 1546317],
      //   ['燕京', 1331882],
      //   ['京东超市', 1311626],
      //   ['整箱', 1282018],
      //   ['雪花', 1199154],
      //   ['乌苏', 1168907],
      //   ['哈尔滨', 981333],
      //   ['科罗娜', 873413],
      //   ['福佳', 872439],
      //   ['白啤', 857355],
      //   ['进口', 744488],
      //   ['菠萝啤', 623366],
      //   ['黑啤', 603007],
      //   ['喜力', 601554],
      //   ['小麦', 559529],
      //   ['教士', 411186],
      //   ['泰山', 392475],
      //   ['麒麟', 365579],
      //   ['柏龙', 314261],
      //   ['勇闯天涯', 300359],
      //   ['瓦伦丁', 298168],
      //   ['原浆', 289474],
      //   ['珠江', 262216],
      //   ['嘉士伯', 257401],
      //   ['小麦王', 254176],
      //   ['三得利', 245959],
      //   ['蓝妹', 235297],
      //   ['IPA', 227707],
      //   ['奥丁格', 224843],
      //   ['奥古特', 205754],
      //   ['瓶装', 202846],
      //   ['比利时', 194663],
      //   ['桶装', 192736],
      //   ['白熊', 191719],
      //   ['500ML', 168866],
      //   ['范佳乐', 165310],
      //   ['迷失海岸', 161727],
      //   ['爱士堡', 153587],
      //   ['罗斯福', 145594],
      //   ['青岛纯生', 145401],
      //   ['哈啤', 138180],
      //   ['粉象', 136496],
      //   ['林德曼', 127835],
      //   ['凯撒', 118245],
      //   ['科罗纳', 114709],
      //   ['一番榨', 114202],
      //   ['7天', 112067],
      //   ['桃红', 109009],
      //   ['秒杀', 108253],
      //   ['乐堡', 105861],
      //   ['风花雪月', 105410],
      //   [330, 103140],
      //   ['千岛湖', 103008],
      //   ['芙力', 97064],
      //   ['全麦', 95966],
      //   ['天湖', 93732],
      //   ['24听', 91857],
      //   ['保拉纳', 90790],
      //   ['听装', 88889],
      //   ['国产', 86575],
      //   ['德啤', 83950],
      //   ['鹅岛', 81538],
      //   ['百帝王', 78969],
      //   ['龙山泉', 76457],
      //   ['雪花纯生', 74749],
      //   ['智美', 72897],
      //   ['世涛', 71566],
      //   ['俄罗斯', 71369],
      //   ['干啤', 70428],
      //   ['5L', 65722],
      //   ['5.0啤酒', 63811],
      //   ['费尔德堡', 63766],
      //   ['金威', 63215],
      //   ['重庆', 62995],
      //   ['贝克', 62673],
      //   ['督威', 60467],
      //   ['鲜啤', 59729],
      //   ['青海湖', 57830],
      //   ['珠江纯生', 57137],
      //   ['广氏', 56822],
      //   ['日本', 56414],
      //   ['健力士', 55231],
      //   ['冰纯', 52766],
      //   ['凯尔特人', 49676],
      //   ['草莓', 48392],
      //   ['雪熊', 47589],
      //   ['匠心营造', 47314],
      //   ['波克', 46595],
      //   ['玫瑰', 45941],
      //   ['皮尔森', 43646],
      //   ['豪铂熊', 43527],
      //   ['斯坦根', 43523],
      //   ['特价', 42988],
      //   ['黄河', 42983],
      //   ['虎牌', 41452],
      //   ['山城', 40365],
      //   ['脸谱', 37157],
      //   ['皇冠', 36681],
      //   ['萨罗娜', 35461],
      //   ['狩猎神', 34983],
      //   [1964, 34874],
      //   ['小棕金', 32786],
      //   ['拉格', 32656],
      //   ['小瓶', 32112],
      //   ['高度', 31844],
      //   ['蓝帽', 31406],
      //   ['大跃', 30515],
      //   ['清爽', 29023],
      //   ['艾尔', 28893],
      //   ['礼盒', 28549],
      //   ['修道院', 28062],
      //   ['新疆', 25964],
      //   ['樱桃', 24164],
      //   ['鸿运当头', 24154],
      //   ['PAULANER', 24049],
      //   ['无酒精', 24000],
      //   ['熊猫', 23350],
      //   ['打嗝海狸', 22685],
      //   ['金尊', 22551],
      //   ['临期', 22544],
      //   ['铝罐', 22089],
      //   ['HOEGAARDEN', 21198],
      //   ['雪花脸谱', 20354],
      //   ['沃夫狼', 19758],
      //   ['青岛1903', 19140],
      //   ['黄啤', 18571],
      //   ['28天', 18511],
      //   ['超级波克', 18152],
      //   ['组合', 17431],
      //   ['大桶', 17038],
      //   ['无糖', 15756],
      //   ['青岛啤酒一厂', 15585],
      //   ['蓝带', 15501],
      //   ['水果啤酒', 15220],
      //   ['勇闯天涯superx', 14921],
      //   ['百香果', 13595],
      //   ['博龙', 13335],
      //   ['桃子', 13034],
      //   ['生啤', 12975],
      //   ['柠檬', 12909],
      //   ['330ml*24', 12805],
      //   ['啤酒组合', 12734],
      //   ['老米勒', 12162],
      //   ['泰国', 11968],
      //   ['五大连池', 11829],
      //   ['捷克', 11201],
      //   ['怡乐仙地', 11120],
      //   ['CASS', 11000],
      //   ['札幌', 10815],
      //   ['高大师', 10806],
      //   ['三宝乐', 10769],
      //   ['猛士', 10753],
      //   ['果味', 10525],
      //   ['婴儿肥', 10398],
      //   ['慕尼黑', 10341],
      //   ['烈性', 9552],
      //   ['淡色', 9537],
      //   ['外国', 9466],
      //   ['TIGER', 9309],
      //   ['牛奶世涛', 9136],
      //   ['印度', 8951],
      //   ['大麦', 8947],
      //   ['KAISERDOM', 8277],
      //   ['韩国', 8275],
      //   ['时代', 8117],
      //   ['LEO', 7894],
      //   ['ASAHI', 7639],
      //   ['无醇', 7548],
      //   ['夺命', 7538],
      //   ['瑞可德林', 6710],
      //   ['啤酒杯', 6621],
      //   ['马尔斯绿啤酒', 6621],
      //   ['高度数', 6568],
      //   ['西班牙', 6452],
      //   ['特级', 6370],
      //   ['水果味', 6264],
      //   ['杜威', 6070],
      //   ['帝国世涛', 5799],
      //   ['酵母型', 5721],
      //   ['金星', 5684],
      //   ['KIRIN', 5479],
      //   ['崂山', 5353],
      //   ['甜', 5328],
      //   ['三料', 5252],
      //   ['琥珀', 5123],
      //   ['VEDETT', 4929],
      //   ['女士', 4872],
      //   ['SUPER BOCK', 4439],
      //   ['开勒', 3922],
      //   ['修士', 3809],
      //   ['橙色', 3797],
      //   ['菠萝', 3752],
      //   [1998, 3500],
      //   ['特制啤酒', 3444],
      //   ['促销', 3438],
      //   ['罗森桥', 3171],
      //   ['黄鹤楼', 2957],
      //   ['洪门', 2947],
      //   ['PLUS', 2782],
      //   ['混搭', 2690],
      //   ['酒花大师', 2621],
      //   ['老挝', 2485],
      //   ['四料', 2471],
      //   ['七天鲜活', 2328],
      //   ['漓泉', 2267],
      //   ['新疆大乌苏', 2147],
      //   ['蓝带将军', 2123],
      //   ['毒蛇', 1968],
      //   ['台湾', 1869],
      //   ['荷兰', 1678],
      //   ['啤酒花', 1674],
      //   ['STOUT', 1655],
      //   ['双料', 1558],
      //   ['HB', 1432],
      //   ['扎啤', 1388],
      //   ['OJ', 1354],
      //   ['生力', 1292],
      //   ['咖啡', 1144],
      //   ['废墟', 1006],
      //   ['博克', 905],
      //   ['四海', 865],
      //   ['波特', 834],
      //   ['24度', 744],
      //   ['ROCHEFORT', 645],
      //   ['SUPERBOCK', 635],
      //   ['诱惑', 635],
      //   ['黑麦', 610],
      //   ['美式拉格', 593],
      //   ['法柔', 499],
      //   ['淡色拉格', 499],
      //   ['维森', 485],
      //   ['三只熊', 472],
      //   ['卢云堡', 425],
      //   ['PILSNER', 420],
      //   ['不含糖', 409],
      //   ['司陶特', 408],
      //   ['苦瓜', 401],
      //   ['帝都海盐', 370],
      //   ['巧克力世涛', 328],
      //   ['捷克皇家', 316],
      //   ['烈性艾尔', 316],
      //   ['百得福', 316],
      //   ['苦啤', 309],
      //   ['深色', 271],
      //   ['德国宝莱纳', 268],
      //   ['堡拉纳', 222],
      //   ['柑橘', 207],
      //   ['过桶', 185],
      //   ['格鲁特', 151],
      //   ['艾丁格', 149],
      //   ['壹号', 137],
      //   ['深色拉格', 130],
      //   ['赛松', 129],
      //   ['青岛蓝宝石', 129],
      //   ['烟熏', 109],
      //   ['麦芽味', 100],
      //   ['LAMBIC', 94],
      //   ['南瓜', 88],
      //   ['泰谷', 83],
      //   ['青西小镇', 83],
      //   ['橙色啤酒18', 79],
      //   ['ORION', 77],
      //   ['汉斯小木屋', 72],
      //   ['大星', 70],
      //   ['贵兹', 67],
      //   ['橘皮', 62],
      //   ['牡蛎', 58],
      //   ['棕色艾尔', 55],
      //   ['漓泉1998', 51],
      //   ['酿酒狗', 39],
      //   ['诱惑7号', 38],
      //   ['蛇毒', 37],
      //   ['漓泉啤酒1998', 33],
      //   ['女武神', 32],
      //   ['波罗的海', 32],
      //   ['艾帝达姆', 30],
      //   ['干世涛', 26],
      //   ['辣椒', 24],
      //   ['兰比克', 20],
      //   ['诱惑七号', 18],
      //   ['角头鲨', 17],
      //   ['诱惑9号', 14],
      //   ['ABBEY', 13],
      //   ['卡尔斯特', 13],
      //   ['自然发酵', 13],
      //   ['黄瓜', 13],
      //   ['卡斯特巧克力', 12],
      //   ['香菜', 12],
      //   ['燕麦世涛', 11]
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

      // 文字重复填充
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

    if (wrapperRect) {
      ref.current.height = wrapperRect.width * 2
      ref.current.style.height = `${wrapperRect.width}px`
      ref.current.width = wrapperRect.width * 2
      ref.current.style.width = `${wrapperRect.width}px`
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

    if (maskImage) {
      await new Promise<void>((resolve, reject) => {
        const img = new Image()
        img.onload = async () => {
          maskCanvas.width = img.width
          maskCanvas.height = img.height
          const ctx = maskCanvas.getContext('2d')
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
          // 按colorList顺序
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
        shape: wordcloudOptions?.shape || 'mask-joy', // https://wordcloud2-js.timdream.org/shape-generator.html
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
          setIsShowKeywordValueComp(true)
          setPos({
            top: dimension.y / 2 - 50,
            left: dimension.x / 2 + 150,
            width: dimension.w / 2,
            height: dimension.h / 2
          })
          setVal(`${item[3] || item[0]}: ${item[2] != null ? round(item[2], 2) : '--'}`)
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
    JSON.stringify(wrapperRect),
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

  return (
    <>
      {data && data.length > 0 ? (
        <Wrapper ref={wrapperRef}>
          <canvas ref={ref}></canvas>
          <KeywordValueComp position={pos} value={val} visible={isShowKeywordValueComp} />
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
  position: IPosition
  value: string
  visible: boolean
}

const KeywordValueComp: React.FC<IKeywordValueCompProps> = (props) => {
  const { position, value, visible } = props
  return (
    <span
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
}
