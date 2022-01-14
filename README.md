# 📦 echarts-readymade
> A collection of echarts templates for React. Based on echarts-for-react

![CC0328C6BAADA3C93D3DA9B093ED5908 (1)](https://user-images.githubusercontent.com/259410/149259067-f410c199-bf21-4f84-9121-35d46a75e465.jpeg)

## 🎨 Features

- 🌈 Easy to use (provide default layout and style)
- 🌟 Available components: `<Bar />` `<Line />` `<Pie />` `<Stack />` `<Scatter />`
- 🎁 Support `Compare Dimension`, which means you can indicate another dimension field to compare base on one dimension.
- 💪 Typescript support

## Installation
> There're some differences between the two ways of installation below?
> 1. Obviously, the way of 'Install What You Need' will keep the bundle size down.
> 2. If you choose the way of 'Install What You Need', then you will need to pass `ChartContext` down to every chart component manually.
> 3. If you choose the way of 'Full Installation', then we keep the `ChartContext` in charge.

### Why this difference?
> ...


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

## Usage

```jsx
// Full Installation
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

```jsx
// Installation What You Need
import { ChartProvider, ChartContext } from '@echarts-readymade/core'
import { Bar } from '@echarts-readymade/Bar'

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

## Roadmap

- [ ] `<Wordcloud />` Chart component
- [ ] `<Polar /> ` Chart component
- [ ] Online demo
- [ ] Test
- [ ] More detail docs & examples
