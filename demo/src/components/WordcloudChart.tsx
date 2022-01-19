import React, { useState } from 'react'
import { ChartProvider, Wordcloud } from 'echarts-readymade'
import type { Field } from 'echarts-readymade'
import styled from 'styled-components'
import { Button, Row, Col } from 'antd'
import maskBad from '../assets/mask-bad.png'

const Container = styled.div`
  width: 100%;
  height: 500px;
`

export const WordcloudChart: React.FC = () => {
  const [data, setData] = useState([
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
    },
    {
      d1: '精酿',
      v1: 1627002
    },
    {
      d1: 1664,
      v1: 1546317
    },
    {
      d1: '燕京',
      v1: 1331882
    },
    {
      d1: '京东超市',
      v1: 1311626
    },
    {
      d1: '整箱',
      v1: 1282018
    },
    {
      d1: '雪花',
      v1: 1199154
    },
    {
      d1: '乌苏',
      v1: 1168907
    },
    {
      d1: '哈尔滨',
      v1: 981333
    },
    {
      d1: '科罗娜',
      v1: 873413
    },
    {
      d1: '福佳',
      v1: 872439
    },
    {
      d1: '白啤',
      v1: 857355
    },
    {
      d1: '进口',
      v1: 744488
    },
    {
      d1: '菠萝啤',
      v1: 623366
    },
    {
      d1: '黑啤',
      v1: 603007
    },
    {
      d1: '喜力',
      v1: 601554
    },
    {
      d1: '小麦',
      v1: 559529
    },
    {
      d1: '教士',
      v1: 411186
    },
    {
      d1: '泰山',
      v1: 392475
    },
    {
      d1: '麒麟',
      v1: 365579
    },
    {
      d1: '柏龙',
      v1: 314261
    },
    {
      d1: '勇闯天涯',
      v1: 300359
    },
    {
      d1: '瓦伦丁',
      v1: 298168
    },
    {
      d1: '原浆',
      v1: 289474
    },
    {
      d1: '珠江',
      v1: 262216
    },
    {
      d1: '嘉士伯',
      v1: 257401
    },
    {
      d1: '小麦王',
      v1: 254176
    },
    {
      d1: '三得利',
      v1: 245959
    },
    {
      d1: '蓝妹',
      v1: 235297
    },
    {
      d1: 'IPA',
      v1: 227707
    },
    {
      d1: '奥丁格',
      v1: 224843
    },
    {
      d1: '奥古特',
      v1: 205754
    },
    {
      d1: '瓶装',
      v1: 202846
    },
    {
      d1: '比利时',
      v1: 194663
    },
    {
      d1: '桶装',
      v1: 192736
    },
    {
      d1: '白熊',
      v1: 191719
    },
    {
      d1: '500ML',
      v1: 168866
    },
    {
      d1: '范佳乐',
      v1: 165310
    },
    {
      d1: '迷失海岸',
      v1: 161727
    },
    {
      d1: '爱士堡',
      v1: 153587
    },
    {
      d1: '罗斯福',
      v1: 145594
    },
    {
      d1: '青岛纯生',
      v1: 145401
    },
    {
      d1: '哈啤',
      v1: 138180
    },
    {
      d1: '粉象',
      v1: 136496
    },
    {
      d1: '林德曼',
      v1: 127835
    },
    {
      d1: '凯撒',
      v1: 118245
    },
    {
      d1: '科罗纳',
      v1: 114709
    },
    {
      d1: '一番榨',
      v1: 114202
    },
    {
      d1: '7天',
      v1: 112067
    },
    {
      d1: '桃红',
      v1: 109009
    },
    {
      d1: '秒杀',
      v1: 108253
    },
    {
      d1: '乐堡',
      v1: 105861
    },
    {
      d1: '风花雪月',
      v1: 105410
    },
    {
      d1: 330,
      v1: 103140
    },
    {
      d1: '千岛湖',
      v1: 103008
    },
    {
      d1: '芙力',
      v1: 97064
    },
    {
      d1: '全麦',
      v1: 95966
    },
    {
      d1: '天湖',
      v1: 93732
    },
    {
      d1: '24听',
      v1: 91857
    },
    {
      d1: '保拉纳',
      v1: 90790
    },
    {
      d1: '听装',
      v1: 88889
    },
    {
      d1: '国产',
      v1: 86575
    },
    {
      d1: '德啤',
      v1: 83950
    },
    {
      d1: '鹅岛',
      v1: 81538
    },
    {
      d1: '百帝王',
      v1: 78969
    },
    {
      d1: '龙山泉',
      v1: 76457
    },
    {
      d1: '雪花纯生',
      v1: 74749
    },
    {
      d1: '智美',
      v1: 72897
    },
    {
      d1: '世涛',
      v1: 71566
    },
    {
      d1: '俄罗斯',
      v1: 71369
    },
    {
      d1: '干啤',
      v1: 70428
    },
    {
      d1: '5L',
      v1: 65722
    },
    {
      d1: '5.0啤酒',
      v1: 63811
    },
    {
      d1: '费尔德堡',
      v1: 63766
    },
    {
      d1: '金威',
      v1: 63215
    },
    {
      d1: '重庆',
      v1: 62995
    },
    {
      d1: '贝克',
      v1: 62673
    },
    {
      d1: '督威',
      v1: 60467
    },
    {
      d1: '鲜啤',
      v1: 59729
    },
    {
      d1: '青海湖',
      v1: 57830
    },
    {
      d1: '珠江纯生',
      v1: 57137
    },
    {
      d1: '广氏',
      v1: 56822
    },
    {
      d1: '日本',
      v1: 56414
    },
    {
      d1: '健力士',
      v1: 55231
    },
    {
      d1: '冰纯',
      v1: 52766
    },
    {
      d1: '凯尔特人',
      v1: 49676
    },
    {
      d1: '草莓',
      v1: 48392
    },
    {
      d1: '雪熊',
      v1: 47589
    },
    {
      d1: '匠心营造',
      v1: 47314
    },
    {
      d1: '波克',
      v1: 46595
    },
    {
      d1: '玫瑰',
      v1: 45941
    },
    {
      d1: '皮尔森',
      v1: 43646
    },
    {
      d1: '豪铂熊',
      v1: 43527
    },
    {
      d1: '斯坦根',
      v1: 43523
    },
    {
      d1: '特价',
      v1: 42988
    },
    {
      d1: '黄河',
      v1: 42983
    },
    {
      d1: '虎牌',
      v1: 41452
    },
    {
      d1: '山城',
      v1: 40365
    },
    {
      d1: '脸谱',
      v1: 37157
    },
    {
      d1: '皇冠',
      v1: 36681
    },
    {
      d1: '萨罗娜',
      v1: 35461
    },
    {
      d1: '狩猎神',
      v1: 34983
    },
    {
      d1: 1964,
      v1: 34874
    },
    {
      d1: '小棕金',
      v1: 32786
    },
    {
      d1: '拉格',
      v1: 32656
    },
    {
      d1: '小瓶',
      v1: 32112
    },
    {
      d1: '高度',
      v1: 31844
    },
    {
      d1: '蓝帽',
      v1: 31406
    },
    {
      d1: '大跃',
      v1: 30515
    },
    {
      d1: '清爽',
      v1: 29023
    },
    {
      d1: '艾尔',
      v1: 28893
    },
    {
      d1: '礼盒',
      v1: 28549
    },
    {
      d1: '修道院',
      v1: 28062
    },
    {
      d1: '新疆',
      v1: 25964
    },
    {
      d1: '樱桃',
      v1: 24164
    },
    {
      d1: '鸿运当头',
      v1: 24154
    },
    {
      d1: 'PAULANER',
      v1: 24049
    },
    {
      d1: '无酒精',
      v1: 24000
    },
    {
      d1: '熊猫',
      v1: 23350
    },
    {
      d1: '打嗝海狸',
      v1: 22685
    },
    {
      d1: '金尊',
      v1: 22551
    },
    {
      d1: '临期',
      v1: 22544
    },
    {
      d1: '铝罐',
      v1: 22089
    },
    {
      d1: 'HOEGAARDEN',
      v1: 21198
    },
    {
      d1: '雪花脸谱',
      v1: 20354
    },
    {
      d1: '沃夫狼',
      v1: 19758
    },
    {
      d1: '青岛1903',
      v1: 19140
    },
    {
      d1: '黄啤',
      v1: 18571
    },
    {
      d1: '28天',
      v1: 18511
    },
    {
      d1: '超级波克',
      v1: 18152
    },
    {
      d1: '组合',
      v1: 17431
    },
    {
      d1: '大桶',
      v1: 17038
    },
    {
      d1: '无糖',
      v1: 15756
    },
    {
      d1: '青岛啤酒一厂',
      v1: 15585
    },
    {
      d1: '蓝带',
      v1: 15501
    },
    {
      d1: '水果啤酒',
      v1: 15220
    },
    {
      d1: '勇闯天涯superx',
      v1: 14921
    },
    {
      d1: '百香果',
      v1: 13595
    },
    {
      d1: '博龙',
      v1: 13335
    },
    {
      d1: '桃子',
      v1: 13034
    },
    {
      d1: '生啤',
      v1: 12975
    },
    {
      d1: '柠檬',
      v1: 12909
    },
    {
      d1: '330ml*24',
      v1: 12805
    },
    {
      d1: '啤酒组合',
      v1: 12734
    },
    {
      d1: '老米勒',
      v1: 12162
    },
    {
      d1: '泰国',
      v1: 11968
    },
    {
      d1: '五大连池',
      v1: 11829
    },
    {
      d1: '捷克',
      v1: 11201
    },
    {
      d1: '怡乐仙地',
      v1: 11120
    },
    {
      d1: 'CASS',
      v1: 11000
    },
    {
      d1: '札幌',
      v1: 10815
    },
    {
      d1: '高大师',
      v1: 10806
    },
    {
      d1: '三宝乐',
      v1: 10769
    },
    {
      d1: '猛士',
      v1: 10753
    },
    {
      d1: '果味',
      v1: 10525
    },
    {
      d1: '婴儿肥',
      v1: 10398
    },
    {
      d1: '慕尼黑',
      v1: 10341
    },
    {
      d1: '烈性',
      v1: 9552
    },
    {
      d1: '淡色',
      v1: 9537
    },
    {
      d1: '外国',
      v1: 9466
    },
    {
      d1: 'TIGER',
      v1: 9309
    },
    {
      d1: '牛奶世涛',
      v1: 9136
    },
    {
      d1: '印度',
      v1: 8951
    },
    {
      d1: '大麦',
      v1: 8947
    },
    {
      d1: 'KAISERDOM',
      v1: 8277
    },
    {
      d1: '韩国',
      v1: 8275
    },
    {
      d1: '时代',
      v1: 8117
    },
    {
      d1: 'LEO',
      v1: 7894
    },
    {
      d1: 'ASAHI',
      v1: 7639
    },
    {
      d1: '无醇',
      v1: 7548
    },
    {
      d1: '夺命',
      v1: 7538
    },
    {
      d1: '瑞可德林',
      v1: 6710
    },
    {
      d1: '啤酒杯',
      v1: 6621
    },
    {
      d1: '马尔斯绿啤酒',
      v1: 6621
    },
    {
      d1: '高度数',
      v1: 6568
    },
    {
      d1: '西班牙',
      v1: 6452
    },
    {
      d1: '特级',
      v1: 6370
    },
    {
      d1: '水果味',
      v1: 6264
    },
    {
      d1: '杜威',
      v1: 6070
    },
    {
      d1: '帝国世涛',
      v1: 5799
    },
    {
      d1: '酵母型',
      v1: 5721
    },
    {
      d1: '金星',
      v1: 5684
    },
    {
      d1: 'KIRIN',
      v1: 5479
    },
    {
      d1: '崂山',
      v1: 5353
    },
    {
      d1: '甜',
      v1: 5328
    },
    {
      d1: '三料',
      v1: 5252
    },
    {
      d1: '琥珀',
      v1: 5123
    },
    {
      d1: 'VEDETT',
      v1: 4929
    },
    {
      d1: '女士',
      v1: 4872
    },
    {
      d1: 'SUPER BOCK',
      v1: 4439
    },
    {
      d1: '开勒',
      v1: 3922
    },
    {
      d1: '修士',
      v1: 3809
    },
    {
      d1: '橙色',
      v1: 3797
    },
    {
      d1: '菠萝',
      v1: 3752
    },
    {
      d1: 1998,
      v1: 3500
    },
    {
      d1: '特制啤酒',
      v1: 3444
    },
    {
      d1: '促销',
      v1: 3438
    },
    {
      d1: '罗森桥',
      v1: 3171
    },
    {
      d1: '黄鹤楼',
      v1: 2957
    },
    {
      d1: '洪门',
      v1: 2947
    },
    {
      d1: 'PLUS',
      v1: 2782
    },
    {
      d1: '混搭',
      v1: 2690
    },
    {
      d1: '酒花大师',
      v1: 2621
    },
    {
      d1: '老挝',
      v1: 2485
    },
    {
      d1: '四料',
      v1: 2471
    },
    {
      d1: '七天鲜活',
      v1: 2328
    },
    {
      d1: '漓泉',
      v1: 2267
    },
    {
      d1: '新疆大乌苏',
      v1: 2147
    },
    {
      d1: '蓝带将军',
      v1: 2123
    },
    {
      d1: '毒蛇',
      v1: 1968
    },
    {
      d1: '台湾',
      v1: 1869
    },
    {
      d1: '荷兰',
      v1: 1678
    },
    {
      d1: '啤酒花',
      v1: 1674
    },
    {
      d1: 'STOUT',
      v1: 1655
    },
    {
      d1: '双料',
      v1: 1558
    },
    {
      d1: 'HB',
      v1: 1432
    },
    {
      d1: '扎啤',
      v1: 1388
    },
    {
      d1: 'OJ',
      v1: 1354
    },
    {
      d1: '生力',
      v1: 1292
    },
    {
      d1: '咖啡',
      v1: 1144
    },
    {
      d1: '废墟',
      v1: 1006
    },
    {
      d1: '博克',
      v1: 905
    },
    {
      d1: '四海',
      v1: 865
    },
    {
      d1: '波特',
      v1: 834
    },
    {
      d1: '24度',
      v1: 744
    },
    {
      d1: 'ROCHEFORT',
      v1: 645
    },
    {
      d1: 'SUPERBOCK',
      v1: 635
    },
    {
      d1: '诱惑',
      v1: 635
    },
    {
      d1: '黑麦',
      v1: 610
    },
    {
      d1: '美式拉格',
      v1: 593
    },
    {
      d1: '法柔',
      v1: 499
    },
    {
      d1: '淡色拉格',
      v1: 499
    },
    {
      d1: '维森',
      v1: 485
    },
    {
      d1: '三只熊',
      v1: 472
    },
    {
      d1: '卢云堡',
      v1: 425
    },
    {
      d1: 'PILSNER',
      v1: 420
    },
    {
      d1: '不含糖',
      v1: 409
    },
    {
      d1: '司陶特',
      v1: 408
    },
    {
      d1: '苦瓜',
      v1: 401
    },
    {
      d1: '帝都海盐',
      v1: 370
    },
    {
      d1: '巧克力世涛',
      v1: 328
    },
    {
      d1: '捷克皇家',
      v1: 316
    },
    {
      d1: '烈性艾尔',
      v1: 316
    },
    {
      d1: '百得福',
      v1: 316
    },
    {
      d1: '苦啤',
      v1: 309
    },
    {
      d1: '深色',
      v1: 271
    },
    {
      d1: '德国宝莱纳',
      v1: 268
    },
    {
      d1: '堡拉纳',
      v1: 222
    },
    {
      d1: '柑橘',
      v1: 207
    },
    {
      d1: '过桶',
      v1: 185
    },
    {
      d1: '格鲁特',
      v1: 151
    },
    {
      d1: '艾丁格',
      v1: 149
    },
    {
      d1: '壹号',
      v1: 137
    },
    {
      d1: '深色拉格',
      v1: 130
    },
    {
      d1: '赛松',
      v1: 129
    },
    {
      d1: '青岛蓝宝石',
      v1: 129
    },
    {
      d1: '烟熏',
      v1: 109
    },
    {
      d1: '麦芽味',
      v1: 100
    },
    {
      d1: 'LAMBIC',
      v1: 94
    },
    {
      d1: '南瓜',
      v1: 88
    },
    {
      d1: '泰谷',
      v1: 83
    },
    {
      d1: '青西小镇',
      v1: 83
    },
    {
      d1: '橙色啤酒18',
      v1: 79
    },
    {
      d1: 'ORION',
      v1: 77
    },
    {
      d1: '汉斯小木屋',
      v1: 72
    },
    {
      d1: '大星',
      v1: 70
    },
    {
      d1: '贵兹',
      v1: 67
    },
    {
      d1: '橘皮',
      v1: 62
    },
    {
      d1: '牡蛎',
      v1: 58
    },
    {
      d1: '棕色艾尔',
      v1: 55
    },
    {
      d1: '漓泉1998',
      v1: 51
    },
    {
      d1: '酿酒狗',
      v1: 39
    },
    {
      d1: '诱惑7号',
      v1: 38
    },
    {
      d1: '蛇毒',
      v1: 37
    },
    {
      d1: '漓泉啤酒1998',
      v1: 33
    },
    {
      d1: '女武神',
      v1: 32
    },
    {
      d1: '波罗的海',
      v1: 32
    },
    {
      d1: '艾帝达姆',
      v1: 30
    },
    {
      d1: '干世涛',
      v1: 26
    },
    {
      d1: '辣椒',
      v1: 24
    },
    {
      d1: '兰比克',
      v1: 20
    },
    {
      d1: '诱惑七号',
      v1: 18
    },
    {
      d1: '角头鲨',
      v1: 17
    },
    {
      d1: '诱惑9号',
      v1: 14
    },
    {
      d1: 'ABBEY',
      v1: 13
    },
    {
      d1: '卡尔斯特',
      v1: 13
    },
    {
      d1: '自然发酵',
      v1: 13
    },
    {
      d1: '黄瓜',
      v1: 13
    },
    {
      d1: '卡斯特巧克力',
      v1: 12
    },
    {
      d1: '香菜',
      v1: 12
    },
    {
      d1: '燕麦世涛',
      v1: 11
    }
  ])

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
    <Container>
      <Button
        onClick={() => {
          setData(
            data.map((d) => ({
              ...d,
              v1: Math.random()
            }))
          )
        }}
      >
        Reload
      </Button>
      <ChartProvider data={data}>
        <Row gutter={16} style={{ height: 500 }}>
          <Col span={12}>
            <Wordcloud dimension={dimension} valueList={valueList} />
          </Col>
          <Col span={12}>
            <Wordcloud
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
            />
          </Col>
        </Row>
      </ChartProvider>
    </Container>
  )
}