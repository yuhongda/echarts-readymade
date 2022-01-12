# 📦 echarts-readymade
A collection of echarts templates for React. Based on echarts-for-react

![image](https://user-images.githubusercontent.com/259410/149125342-642de741-e3e0-43ec-9df7-b546f462dd38.png)


## Installation

👉 完整安装
```js
npm install --save echarts-readymade

OR

yarn add echarts-readymade
```
👉 按需安装
```js
npm install --save @echarts-readymade/core
npm install --save @echarts-readymade/line

OR

yarn add @echarts-readymade/core
yarn add @echarts-readymade/line
```

## Usage

```jsx
import { ChartProvider } from '@echarts-readymade/core'
import { Line } from '@echarts-readymade/line'

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
  <Line dimension={dimension} valueList={valueList} />
</ChartProvider>

```

## Roadmap

- [ ] `<Wordcloud />` Chart component
- [ ] `<Polar /> ` Chart component
- [ ] Online demo
- [ ] Test
- [ ] More detail docs & examples
