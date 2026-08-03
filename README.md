English ｜ [简体中文](./README.zh-CN.md) ｜ 🤖 [AI Doc](https://chat.openai.com/g/g-XkL1Qzyrb-echarts-readymade)

# 📦 echarts-readymade
> Make echarts come in handy for React. Based on [echarts-for-react](https://github.com/hustcc/echarts-for-react)

![CC0328C6BAADA3C93D3DA9B093ED5908 (1)](https://user-images.githubusercontent.com/259410/149259067-f410c199-bf21-4f84-9121-35d46a75e465.jpeg)

## Coverage

| Statements | Branches | Functions | Lines |
| ---------- | -------- | --------- | ----- |
| ![Statements](https://img.shields.io/badge/statements-91.73%25-brightgreen.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-80%25-yellow.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-93.82%25-brightgreen.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-91.8%25-brightgreen.svg?style=flat) |

## Content
- [Features](#-features)
- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [Q/A](#qa)
- [Roadmap](#roadmap)


## 🎨 Features

- 🌈 Easy to use
- 🌟 Available components: `<Bar />` `<Line />` `<Pie />` `<Stack />` `<Scatter />` `<Wordcloud />` `<BarHorizontal />` `<Table />`
- 🎁 Support `Comparative Dimension`, which means you can indicate another dimension field to compare base on one dimension.
- 💪 Typescript support

## Installation

👉 Full Installation
```js
pnpm add echarts-readymade
```
👉 Install What You Need
```js
pnpm add @echarts-readymade/core
pnpm add @echarts-readymade/line
```

## Usage

### For `Full Installation`
```jsx
import { ChartProvider, Line } from 'echarts-readymade'

<ChartProvider data={data}>
  <Line dimension={dimension} valueList={values} />
</ChartProvider>
```


### <a name="example"></a>For `Install What You Need`

```jsx
import { ChartProvider, ChartContext } from '@echarts-readymade/core'
import { Line } from '@echarts-readymade/line'

<ChartProvider data={data}>
  <Line 
    // Note: here you need pass context down
    context={ChartContext} 
    dimension={dimension} 
    valueList={values} 
  />
</ChartProvider>
```

🪄 Boom!

![screenshot](https://github.com/user-attachments/assets/771f2ad9-9573-4e2f-b232-6b5b3750935b)

<details>
<summary>data, dimension, values</summary>

```jsx
const data = [
  {
    v6: 0.8141021277904137,
    d1: '2020-12-31',
    d2: '北京',
    v4: 0,
    v5: 27.577454409512264
  },
  {
    v6: 0.8982190959595345,
    d1: '2021-01-31',
    d2: '上海',
    v4: 41.51820080195095,
    v5: 21.872185824241658
  },
  {
    v6: 0.33504289914191104,
    d1: '2021-02-28',
    d2: '北京',
    v4: 41.70814809361097,
    v5: 31.24105459114353
  },
  {
    v6: 0.4784536385273675,
    d1: '2021-03-31',
    d2: '北京',
    v4: 51.538285808269066,
    v5: 34.85958873867998
  },
  {
    v6: 2.070474009247233,
    d1: '2021-04-30',
    d2: '北京',
    v4: 99.60320028422093,
    v5: 32.43903058102744
  },
  {
    v6: 0.5949555806051605,
    d1: '2021-05-31',
    d2: '北京',
    v4: 51.233048361500714,
    v5: 32.12192802389004
  },
  {
    v6: 0.5378606644046801,
    d1: '2021-06-30',
    d2: '北京',
    v4: 76.84375204981437,
    v5: 49.96795472336324
  },
  {
    v6: 0.5816593218744337,
    d1: '2021-07-31',
    d2: '北京',
    v4: 46.878570132378925,
    v5: 29.63885426149979
  },
  {
    v6: 0.662148789567416,
    d1: '2021-08-31',
    d2: '北京',
    v4: 65.13936674312322,
    v5: 39.1898530095348
  },
  {
    v6: 0.326598530255224,
    d1: '2021-09-30',
    d2: '北京',
    v4: 56.245232663930274,
    v5: 42.39808154552174
  },
  {
    v6: 0.5967677847481455,
    d1: '2021-10-31',
    d2: '北京',
    v4: 66.81265781236482,
    v5: 41.8424384876371
  },
  { v6: 0.6310820851864044, d1: '2021-11-30', d2: '北京', v4: 100.0, v5: 61.308992912255384 },
  {
    v6: 0.3141021277904137,
    d1: '2020-12-31',
    d2: '上海',
    v4: 60.028318723339325,
    v5: 47.577454409512264
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
    fieldKey: 'v6',
    fieldName: '占比1',
    isPercent: true
  },
  {
    fieldKey: 'v4',
    fieldName: '占比2'
  },
  {
    fieldKey: 'v5',
    fieldName: '占比3'
  }
]
```
</details>

### Comparative Dimension

```jsx
import { ChartProvider, Line } from 'echarts-readymade'

<ChartProvider data={data}>
  <Line 
    dimension={dimension} 
    compareDimension={comparativeDimension} // 👈
    valueList={values} />
</ChartProvider>
```

![screenshot2](https://github.com/user-attachments/assets/763ece8e-0007-461c-9a71-3259f724d2cd)

<details>
<summary>data, dimension, <strong>comparativeDimension</strong>, values</summary>

```jsx
const data = [
  {
    v6: 0.8141021277904137,
    d1: '2020-12-31',
    d2: '北京',
    v4: 0,
    v5: 27.577454409512264
  },
  {
    v6: 0.8982190959595345,
    d1: '2021-01-31',
    d2: '上海',
    v4: 41.51820080195095,
    v5: 21.872185824241658
  },
  {
    v6: 0.33504289914191104,
    d1: '2021-02-28',
    d2: '北京',
    v4: 41.70814809361097,
    v5: 31.24105459114353
  },
  {
    v6: 0.4784536385273675,
    d1: '2021-03-31',
    d2: '北京',
    v4: 51.538285808269066,
    v5: 34.85958873867998
  },
  {
    v6: 2.070474009247233,
    d1: '2021-04-30',
    d2: '北京',
    v4: 99.60320028422093,
    v5: 32.43903058102744
  },
  {
    v6: 0.5949555806051605,
    d1: '2021-05-31',
    d2: '北京',
    v4: 51.233048361500714,
    v5: 32.12192802389004
  },
  {
    v6: 0.5378606644046801,
    d1: '2021-06-30',
    d2: '北京',
    v4: 76.84375204981437,
    v5: 49.96795472336324
  },
  {
    v6: 0.5816593218744337,
    d1: '2021-07-31',
    d2: '北京',
    v4: 46.878570132378925,
    v5: 29.63885426149979
  },
  {
    v6: 0.662148789567416,
    d1: '2021-08-31',
    d2: '北京',
    v4: 65.13936674312322,
    v5: 39.1898530095348
  },
  {
    v6: 0.326598530255224,
    d1: '2021-09-30',
    d2: '北京',
    v4: 56.245232663930274,
    v5: 42.39808154552174
  },
  {
    v6: 0.5967677847481455,
    d1: '2021-10-31',
    d2: '北京',
    v4: 66.81265781236482,
    v5: 41.8424384876371
  },
  { v6: 0.6310820851864044, d1: '2021-11-30', d2: '北京', v4: 100.0, v5: 61.308992912255384 },
  {
    v6: 0.3141021277904137,
    d1: '2020-12-31',
    d2: '上海',
    v4: 60.028318723339325,
    v5: 47.577454409512264
  }
]

const dimension: Field[] = [
  {
    fieldKey: 'd1',
    fieldName: '日期'
  }
]

const comparativeDimension: Field[] = [
    {
      fieldKey: 'd2',
      fieldName: '城市'
    }
  ]

const valueList: Field[] = [
  {
    fieldKey: 'v6',
    fieldName: '占比1',
    isPercent: true
  },
  {
    fieldKey: 'v4',
    fieldName: '占比2'
  },
  {
    fieldKey: 'v5',
    fieldName: '占比3'
  }
]
```
</details>


### Shared Raw Data

> The raw data in ```<ChartProvider />``` is shared, so you can use it in different chart components at the same time.

```jsx
import { ChartProvider, Line, Bar } from 'echarts-readymade'

<ChartProvider data={data}>
  <Line 
    dimension={dimensionForLine} 
    valueList={valuesForLine} />
  <Bar
    dimension={dimensionForBar}
    valueList={valuesForBar}
  />
</ChartProvider>
```


## Options
###  `<ChartProvider />`

| Property | Description | Type | Default |
| :------- | :---------- | :--- | ------: |
| data | The data to render. | `any[]` | `undefined` |
| echartsOptions | The option of `echarts-for-react` | `EChartsReactProps` | `undefined` |

###  `ChartProps`
> The base props for each chart component

| Property | Description | Type | Default |
| :------- | :---------- | :--- | ------: |
| context | The `ChartContext` exported from `@echarts-readymade/core`. If you use full import from `echarts-readymade`, don't care about this. | `typeof ChartContext` | `undefined`(required) |
| dimension | The key and name list of dimensions. | `Field[]` | `undefined` |
| compareDimension | you can indicate compareDimension to compare base on dimension above. | `Field[]` | `undefined` |
| valueList | The key and name list of values, usually show on Y axis. | `Field[]` | `undefined` |
| echartsSeries | The `series` option of `echarts`. This can be used to replace `series` generated by chart components. | `any[]` | `undefined` |
| setOption | You last chance to adjust echarts's option by using this function. | `(option: EChartsOption) => EChartsOption` | `undefined` |

###  `Field`

| Property | Description | Type | Default |
| :------- | :---------- | :--- | ------: |
| fieldKey | key in `data` | `string` | `undefined`(required) |
| fieldName | key in `data` | `string` | `undefined`(required) |
| type | The type of series | `'line' \| 'bar' \| 'pie' \| 'scatter'` | `undefined` |
| yAxisIndex | Which axis to show on | `number` | `undefined` |
| isPercent | If set `true`, the value will be multiply by 100. | `boolean` | `undefined` |
| decimalLength | round number in `mathjs/number/round`. round(v, decimalLength) | `number` | `undefined` |

###  `<Bar />` & `<Line />`

| Property | Description | Type | Default |
| :------- | :---------- | :--- | ------: |
| xAxisData | Will replace the data of xAxis with this | `any[]` | `undefined` |
| legendPosition | Position of legend | `'top' \| 'left' \| 'right' \| 'bottom'` | `undefined` |

###  `<Pie />`

| Property | Description | Type | Default |
| :------- | :---------- | :--- | ------: |
| showInRing | It's literary meaning | `boolean` | `undefined` |
| legendPosition | Position of legend | `'top' \| 'left' \| 'right' \| 'bottom'` | `undefined` |

###  `<Scatter />`

| Property | Description | Type | Default |
| :------- | :---------- | :--- | ------: |
| legendPosition | Position of legend | `'top' \| 'left' \| 'right' \| 'bottom'` | `undefined` |

###  `<Stack />`

| Property | Description | Type | Default |
| :------- | :---------- | :--- | ------: |
| xAxisData | will replace the data of xAxis with this | `any[]` | `undefined` |
| legendPosition | position of legend | `'top' \| 'left' \| 'right' \| 'bottom'` | `undefined` |
| isPercentMode | The stack bar will fill full the Y axis, which max value is 100.  | `boolean` | `undefined` |
| isLineStack | transform bar stack to line stack | `boolean` | `undefined` |

###  `<Wordcloud />` (1.0.3)

Base on [wordcloud2.js](https://github.com/timdream/wordcloud2.js)

| Property | Description | Type | Default |
| :------- | :---------- | :--- | ------: |
| colorList | Color of the text, by random | `string[]` | `undefined` |
| fontSizeMode | The mode of calculating font size | `'bySort' \| 'byValue'` | `undefined` |
| shape | The shape of wordcloud | `'mask-joy' \| 'mask-great' \| 'mask-bad' \| 'mask-oval' \| 'mask-rect' \| 'mask-cloud' \| 'mask-circle' \| 'mask-diamond'` Or `image string from import` | `undefined` |
| wordcloudOptions | `wordcloud2.js` options | `WordcloudOptions` | `undefined` |
| setWordcloudOption | An opportunity to change the data list | `<T>(list: any[]) => T[]` | `undefined` |

###  `<BarHorizontal />` (1.0.6)

| Property | Description | Type | Default |
| :------- | :---------- | :--- | ------: |
| yAxisData | Will replace the data of yAxis with this | `any[]` | `undefined` |
| legendPosition | Position of legend | `'top' \| 'left' \| 'right' \| 'bottom'` | `undefined` |

###  `<Table />` (1.0.21)

| Property | Description | Type | Default |
| :------- | :---------- | :--- | ------: |
| colorList | A set of color to decorate table. ['border and header bg', 'header text', 'sum column text', 'body bg', 'row bg on hover', 'body text'] | `string[]` | `undefined` |
| showRank | Show the index column | `boolean` | `undefined` |
| showSum | Show the sum column | `boolean` | `undefined` |
| hideDimensionCompareTitle | Hide the same header for compare dimension | `boolean` | `undefined` |
| blockWrapHeight | The height of the table wrapper | `number` | `500` |
| sortKey | The unique string that use to save the order of table column | `string` | `undefined` |
| columnWidth | Column width | `150` | `undefined` |
| antdOptions | Ant Design table options  | `TableProps` | `undefined` |
| setTableOption | An opportunity to change the `columns` and `dataSource` of Table | `<T, K>(columns: any[], dataSource: any[]) => { columns: T[]; dataSource: K[] }` | `undefined` |


## Q/A
### Q: How to get the instance of `echarts`?
### A: Each chart component support forwarding `ref` down to `echarts-for-react` in order to get Echarts instance, you can do it like below:

```jsx
import { ChartProvider, Bar } from 'echarts-readymade'
import { useRef } from 'react'

const ref = useRef(null)

useEffect(() => {
  if (ref.current) {
    // boom!!
    const instance = ref.current.getEchartsInstance()
    // so next, you can use Echarts instance api
    // instance.setOption(...)
  }
}, [ref.current])

<ChartProvider data={data}>
  <Bar ref={ref} dimension={dimension} valueList={valueList} />
</ChartProvider>
```

### Q: There're some differences between the two ways of installation below.
> 1. Obviously, the way of 'Install What You Need' will keep the bundle size down.
> 2. If you choose the way of 'Install What You Need', then you will need to pass `ChartContext` down to every chart component manually.
> 3. If you choose the way of 'Full Installation', then we take the `ChartContext` in charge.

### Q: Why the difference?
> In order to reduce the bundle size, we divided the whole package into several packages based on chart type. But the `ChartContext` exported from `@echarts-readymade/core` can not share with other packages in this situation. So you need pass it down to chart component manually.

### Q: For `<Bar />` and `<Line />` and `<Scatter />`, we import the three chart components from `echarts-for-react`

> I think there is no need to import full components from echarts-for-react, so we just import useful components for some chart components. But in some scenarios, user may want to show Line on a Scatter chart. So like in `<Line />` component, we also import `<BarChart />` and `<ScatterChart />`, so you can use them on one chart. Maybe there are other scenarios, feel free to let me know.

## Roadmap

- [x] `<Wordcloud />` Chart component
- [x] `<BarHorizontal /> ` Chart component
- [x] `<Table /> ` Chart component
- [ ] `<Polar /> ` Chart component
- [x] Online demo
- [ ] Test
- [ ] More detail docs & examples
