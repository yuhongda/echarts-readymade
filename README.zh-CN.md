[English](./README.md) ｜ 简体中文

# 📦 echarts-readymade
> 三行代码画出echarts图表。 基于 [echarts-for-react](https://github.com/hustcc/echarts-for-react)

![CC0328C6BAADA3C93D3DA9B093ED5908 (1)](https://user-images.githubusercontent.com/259410/149259067-f410c199-bf21-4f84-9121-35d46a75e465.jpeg)


## 目录
- [功能](#-features)
- [安装](#installation)
  - [解释说明](#therere-some-differences-between-the-two-ways-of-installation-below)
- [如何使用](#usage)
- [配置参数](#options)
- [常见问题](#qa)
- [开发计划](#roadmap)


## 🎨 功能 <a name="-features"></a>

- 🌈 使用简单，并提供默认布局、配色和样式
- 🌟 目前支持图表: `<Bar />` `<Line />` `<Pie />` `<Stack />` `<Scatter />` `<Wordcloud />` `<BarHorizontal />` `<Table />`
- 🎁 支持`对比维度`。 （对比维度：比如画出每个`城市`在每`月`的`收入`对比增长曲线。其中`城市`就是对比维度。）
- 💪 支持Typescript，类型安全

## 安装 <a name="installation"></a>

👉 完整安装
```js
npm install --save echarts-readymade

或者

yarn add echarts-readymade
```
👉 按需安装
```js
npm install --save @echarts-readymade/core
npm install --save @echarts-readymade/line

或者

yarn add @echarts-readymade/core
yarn add @echarts-readymade/line
```

### `完整安装`和`按需安装`的区别 <a name="therere-some-differences-between-the-two-ways-of-installation-below"></a>
> 1. 很明显，`按需安装`将有利于缩小打包尺寸；
> 2. 如果你选择`按需安装`，你将需要手动传递`ChartContext`到每个图表组件；
> 3. 如果你选择`完整安装`，无需手动显式传递`ChartContext`；

### 为什么会有这种区别
> 为了减少打包尺寸，我将组件整体按照图表类型拆分到各个独立的包中。这样，如果只需要折线图，则只需要引入`@echarts-readymade/core`和`@echarts-readymade/line`即可。但这样处理之后，从`@echarts-readymade/core`导出的`ChartContext`就无法与其他图表共享，所以需要用户手动传递到每个图表组件的context中。可以查看这个 [例子](#example)。

### 对于 `<Bar />`、 `<Line />`和 `<Scatter />`这三个组件，都会引入彼此

> 我认为每个图表组件都应该尽量引入较少的图表类型，来降低组件的包大小。比如饼图，我只需从echarts-for-react中引入饼图组件。但在某些场景下，用户在一张图上可能需要同时使用多种类型的图表。比如，用户可能要在散点图上用折线图画弥合曲线。因此，对于散点图，我也加入了折线图和柱状图的支持。（另一种比较好的做法可能是，开放一个可传入所需组件的配置属性来实现）

## 使用 <a name="usage"></a>

### 完整安装
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

### <a name="example"></a> 按需安装
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

🪄 完成!

![截屏2022-04-29 16 07 37](https://user-images.githubusercontent.com/259410/165907177-d2e72b14-1da5-420c-9192-b49691208dbb.png)


## 配置参数 <a name="options"></a>
###  `<ChartProvider />`

| 属性 | 描述 | 类型 | 默认值 |
| :------- | :---------- | :--- | ------: |
| data | 图表数据 | `any[]` | `undefined` |
| echartsOptions | `echarts-for-react`的配置属性 | `EChartsReactProps` | `undefined` |

###  `ChartProps`
> 每个图表的基础Props类型

| 属性 | 描述 | 类型 | 默认值 |
| :------- | :---------- | :--- | ------: |
| context | 对于`按需安装`,需要手动传递的`ChartContext`，从`@echarts-readymade/core`导出。如果是`完整安装`可忽略 | `typeof ChartContext` | `undefined`(需要) |
| dimension | 维度字段 | `Field[]` | `undefined` |
| compareDimension | 对比维度字段 | `Field[]` | `undefined` |
| valueList | 数值字段 | `Field[]` | `undefined` |
| echartsSeries | echarts的series字段 | `any[]` | `undefined` |
| setOption | 可对应设置echarts的option，优先级最高。 | `(option: EChartsOption) => EChartsOption` | `undefined` |

###  `Field`

| 属性 | 描述 | 类型 | 默认值 |
| :------- | :---------- | :--- | ------: |
| fieldKey | `data`中的key | `string` | `undefined`(需要) |
| fieldName | `data`中的key | `string` | `undefined`(需要) |
| type | 图表类型 | `'line' \| 'bar' \| 'pie' \| 'scatter'` | `undefined` |
| yAxisIndex | 数值显示在哪个Y轴 | `number` | `undefined` |
| isPercent | 百分比字段，如果设置`true`，值将自动乘以100 | `boolean` | `undefined` |
| decimalLength | 保留小数位数 | `number` | `undefined` |

###  `<Bar />` & `<Line />`

| 属性 | 描述 | 类型 | 默认值 |
| :------- | :---------- | :--- | ------: |
| xAxisData | X轴数据数组 | `any[]` | `undefined` |
| legendPosition | 图例位置 | `'top' \| 'left' \| 'right' \| 'bottom'` | `undefined` |

###  `<Pie />`

| 属性 | 描述 | 类型 | 默认值 |
| :------- | :---------- | :--- | ------: |
| showInRing | 是否是环形图 | `boolean` | `undefined` |
| legendPosition | 图例位置 | `'top' \| 'left' \| 'right' \| 'bottom'` | `undefined` |

###  `<Scatter />`

| 属性 | 描述 | 类型 | 默认值 |
| :------- | :---------- | :--- | ------: |
| legendPosition | 图例位置 | `'top' \| 'left' \| 'right' \| 'bottom'` | `undefined` |

###  `<Stack />`

| 属性 | 描述 | 类型 | 默认值 |
| :------- | :---------- | :--- | ------: |
| xAxisData | X轴数据数组 | `any[]` | `undefined` |
| legendPosition | 图例位置 | `'top' \| 'left' \| 'right' \| 'bottom'` | `undefined` |
| isPercentMode | 是否是百分比模式，如果设置为`true`，则Y轴最大值为100  | `boolean` | `undefined` |
| isLineStack | 是否是折现堆积图 | `boolean` | `undefined` |

###  `<Wordcloud />` (1.0.3)

基于 [wordcloud2.js](https://github.com/timdream/wordcloud2.js)

| 属性 | 描述 | 类型 | 默认值 |
| :------- | :---------- | :--- | ------: |
| colorList | 词云颜色数组 | `string[]` | `undefined` |
| fontSizeMode | 词云文字大小设置模式 `bySort`-按照排序设置大小；`byValue`-按照词的数值（如：词频）设置字体大小 | `'bySort' \| 'byValue'` | `undefined` |
| shape | 词云形状 | `'mask-joy' \| 'mask-great' \| 'mask-bad' \| 'mask-oval' \| 'mask-rect' \| 'mask-cloud' \| 'mask-circle' \| 'mask-diamond'` Or `image string from import` | `undefined` |
| wordcloudOptions | `wordcloud2.js` 配置 | `WordcloudOptions` | `undefined` |
| setOption | 可设置处理后的list数据 | `<T>(list: any[]) => T[]` | `undefined` |

###  `<BarHorizontal />` (1.0.6)

| 属性 | 描述 | 类型 | 默认值 |
| :------- | :---------- | :--- | ------: |
| yAxisData | Y轴数据数组 | `any[]` | `undefined` |
| legendPosition | 图例位置 | `'top' \| 'left' \| 'right' \| 'bottom'` | `undefined` |

###  `<Table />` (1.0.21)

| 属性 | 描述 | 类型 | 默认值 |
| :------- | :---------- | :--- | ------: |
| colorList | 表格颜色数组，影响 ['边框、表头背景色', '表头文字颜色', '汇总列文字颜色', 'body 背景色', 'row hover背景色', 'body 文字颜色'] | `string[]` | `undefined` |
| showRank | 显示排序列 | `boolean` | `undefined` |
| showSum | 显示汇总列 | `boolean` | `undefined` |
| hideDimensionCompareTitle | 再对比维度模式下，隐藏相同列表头 | `boolean` | `undefined` |
| blockWrapHeight | wrapper高度 | `number` | `500` |
| sortKey | 表格列排序localstorage的key | `string` | `undefined` |
| columnWidth | 列宽度 | `150` | `undefined` |
| antdOptions | Ant Design table 配置  | `TableProps` | `undefined` |
| setOption | 可用来设置处理后的 `columns` 和 `dataSource` | `<T, K>(columns: any[], dataSource: any[]) => { columns: T[]; dataSource: K[] }` | `undefined` |


## 常见问题 <a name="qa"></a>
### Q: 如何获取`echarts`的实例?
### A: 每个图表组件都支持 `ref` 传递，你可以参照下面的例子：

```jsx
import { ChartProvider, Bar } from 'echarts-readymade'
import { useRef } from 'react'

const ref = useRef(null)

useEffect(() => {
  if (ref.current) {
    // 当当!!
    const instance = ref.current.getEchartsInstance()
    // so next, you can use Echarts instance api
    // instance.setOption(...)
  }
}, [ref.current])

<ChartProvider data={data}>
  <Bar ref={ref} dimension={dimension} valueList={valueList} />
</ChartProvider>
```

## 开发计划 <a name="roadmap"></a>

- [x] `<Wordcloud />` Chart component
- [x] `<BarHorizontal /> ` Chart component
- [x] `<Table /> ` Chart component
- [ ] `<Polar /> ` Chart component
- [x] Online demo
- [ ] Test
- [ ] More detail docs & examples
