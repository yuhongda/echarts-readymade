English ｜ [简体中文](./README.zh-CN.md) ｜ [AI Doc](https://chat.openai.com/g/g-XkL1Qzyrb-echarts-readymade)

# 📦 echarts-readymade
> Make echarts come in handy for React. Based on [echarts-for-react](https://github.com/hustcc/echarts-for-react)

![CC0328C6BAADA3C93D3DA9B093ED5908 (1)](https://user-images.githubusercontent.com/259410/149259067-f410c199-bf21-4f84-9121-35d46a75e465.jpeg)


## Content
- [Features](#-features)
- [Installation](#installation)
  - [Explanations](#therere-some-differences-between-the-two-ways-of-installation-below)
- [Usage](#usage)
- [Options](#options)
- [Q/A](#qa)
- [Roadmap](#roadmap)


## 🎨 Features

- 🌈 Easy to use (provide default layout and style)
- 🌟 Available components: `<Bar />` `<Line />` `<Pie />` `<Stack />` `<Scatter />` `<Wordcloud />` `<BarHorizontal />` `<Table />`
- 🎁 Support `Compare Dimension`, which means you can indicate another dimension field to compare base on one dimension.
- 💪 Typescript support

## Installation

👉 Full Installation
```js
npm install --save echarts-readymade

OR

yarn add echarts-readymade
```
👉 Install What You Need
```js
npm install --save @echarts-readymade/core
npm install --save @echarts-readymade/line

OR

yarn add @echarts-readymade/core
yarn add @echarts-readymade/line
```

### There're some differences between the two ways of installation below.
> 1. Obviously, the way of 'Install What You Need' will keep the bundle size down.
> 2. If you choose the way of 'Install What You Need', then you will need to pass `ChartContext` down to every chart component manually.
> 3. If you choose the way of 'Full Installation', then we take the `ChartContext` in charge.

### Why the difference?
> In order to reduce the bundle size, we divided the whole package into several packages based on chart type. But the `ChartContext` exported from `@echarts-readymade/core` can not share with other packages in this situation. So you need pass it down to chart component manually. check [the example](#example) below.

### For `<Bar />` and `<Line />` and `<Scatter />`, we import the three chart components from `echarts-for-react`

> I think there is no need to import full components from echarts-for-react, so we just import useful components for some chart components. But in some scenarios, user may want to show Line on a Scatter chart. So like in `<Line />` component, we also import `<BarChart />` and `<ScatterChart />`, so you can use them on one chart. Maybe there are other scenarios, feel free to let me know.

## Usage

### For `Full Installation`
```jsx
import { ChartProvider, Bar } from 'echarts-readymade'

const data = [
  {
    v6: 0.8141021277904137,
    d1: '2020-12-31',
    d2: '北京',
    v4: 50.028318723339325,
    v5: 27.577454409512264
  },
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

<ChartProvider data={data}>
  <Bar dimension={dimension} valueList={valueList} />
</ChartProvider>

```

### <a name="example"></a>For `Install What You Need`
```jsx
import { ChartProvider, ChartContext } from '@echarts-readymade/core'
import { Bar } from '@echarts-readymade/bar'

const data = [
  {
    v6: 0.8141021277904137,
    d1: '2020-12-31',
    d2: '北京',
    v4: 50.028318723339325,
    v5: 27.577454409512264
  },
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

<ChartProvider data={data}>
  <Bar 
    // Note: here you need pass context down
    context={ChartContext} 
    dimension={dimension} 
    valueList={valueList} 
  />
</ChartProvider>

```

🪄 Boom!

![截屏2022-04-29 16 07 37](https://user-images.githubusercontent.com/259410/165907177-d2e72b14-1da5-420c-9192-b49691208dbb.png)


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

## Roadmap

- [x] `<Wordcloud />` Chart component
- [x] `<BarHorizontal /> ` Chart component
- [x] `<Table /> ` Chart component
- [ ] `<Polar /> ` Chart component
- [x] Online demo
- [ ] Test
- [ ] More detail docs & examples
