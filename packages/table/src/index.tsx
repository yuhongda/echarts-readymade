import React, { useContext, useState, useCallback } from 'react'
import Big from 'big.js'
import cloneDeep from 'clone'
import type { ChartProps, Field } from '@echarts-readymade/core'
import { mergeOption, COLOR_LIST, numberWithCommas } from '@echarts-readymade/core'
import styled from 'styled-components'
import { Table as AntdTable, Tooltip } from 'antd'
import { InfoCircleOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'

const COLUMN_WIDTH = 100

const Rank = styled.span`
  display: inline-block;
  font-size: 14px;
  width: 24px;
  height: 24px;
  line-height: 24px;
  border-radius: 24px;
  text-align: center;
  margin-right: 10px;
  background: ${(props) => props.color};
`

const StyledInfoCircleOutlined = styled(InfoCircleOutlined)`
  position: absolute;
  top: 5px;
  right: 5px;
`

const StyledTable = styled(AntdTable)<{ color: string[]; dimensionCount: number }>`
  width: 100% !important;
  .ant-table {
    background: ${(props) => props.color[0]} !important;
  }
  .ant-table-thead > tr > th {
    background: ${(props) => props.color[1]} !important;
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    text-align: center;
    padding: '5px' !important;
    &.ant-table-cell-scrollbar {
      border-right: 0;
    }
    .ant-table-header-column {
      white-space: nowrap;
    }
  }
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    border-bottom: 1px solid ${(props) => props.color[1]};
    border-right: 1px solid ${(props) => props.color[1]};
    text-align: center;
    max-width: 150px;
    /* font-size: ${(props) => props.fontSize}px; */
  }
  .ant-table-thead > tr:first-child > th:first-child {
    /* text-align: ${(props) => (props.reverse ? 'center' : 'left')}; */
    border-left: 1px solid ${(props) => props.color[1]};
  }
  .ant-table-tbody > tr > td:first-child {
    text-align: left;
    border-left: 1px solid ${(props) => props.color[1]};
  }
  .ant-table-cell-fix-left,
  .ant-table-cell-fix-right {
    background: ${(props) => props.color[0]} !important;
  }
  .ant-table-fixed {
    background: ${(props) => props.color[0]} !important;
  }
  .ant-table-thead
    > tr.ant-table-row-hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
    > td,
  .ant-table-tbody
    > tr.ant-table-row-hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
    > td {
    background: ${(props) => props.color[0]} !important;
  }
  .ant-table-fixed-left {
    width: ${(props) => {
      return props.dimensionCount * COLUMN_WIDTH
    }}px;
  }
  .columnTitleCell {
    position: relative;
    &:hover {
      & > .sortBtn {
        opacity: 1;
        visibility: visible;
      }
    }
  }
`

const ValueCell = styled.span<{ colors: string[]; isSum: boolean }>`
  color: ${(props) =>
    props.isSum
      ? (props.colors && props.colors[1]) || 'color: rgba(0, 0, 0, 0.65)'
      : 'color: rgba(0, 0, 0, 0.65)'};
`

const TitleSortLeft = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease;
  padding: 0 5px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
`

const TitleSortRight = styled.span`
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease;
  padding: 0 5px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
`

export interface TableChartProps extends Omit<ChartProps, 'echartsSeries' | 'setOption'> {
  colorList?: string[]
  showRank?: boolean
  showSum?: boolean
}

export const Table: React.FC<TableChartProps> = (props, ref) => {
  const {
    context,
    dimension = [],
    compareDimension,
    valueList = [],
    colorList,
    showRank,
    showSum,
    ...restSettings
  } = props
  const { data } = useContext(context)

  if (!data) {
    return null
  }

  const colors = colorList || COLOR_LIST

  // feat: move columns
  const [moveItem, setMoveItem] = useState(null)
  const [moveUpdateKey, setMoveUpdateKey] = useState(null)

  const getColSpan = (text: string, index: number, dimAndVal: Field[], fieldKey: string) => {
    let count = 1
    for (let i = index; i < dimAndVal.length; i++) {
      const d = dimAndVal[i]
      if (d.fieldKey === fieldKey && d.fieldName == text && text != null) {
        count++
      } else {
        break
      }
    }
    return count
  }

  const tableColumns = () => {
    const dimensionListAndValueList = [...dimension, ...valueList]

    // 对比维度
    if (compareDimension && compareDimension.length > 0) {
      let columns = [...new Set(data.map((d) => d[compareDimension[0].fieldKey]))]

      if (showSum) {
        columns = ['总计', ...columns]
      }

      const getColumn = (
        v: Field,
        index: number,
        item: Field,
        c: string,
        isShowCompareColumnTitle: boolean
      ) => {
        return {
          title: isShowCompareColumnTitle ? (
            <span title={c}>{c}</span>
          ) : (
            <span title={v.fieldName}>{v.fieldName}</span>
          ),
          key: `${v.fieldKey}_${index}`,
          dataIndex: v.fieldKey,
          width: COLUMN_WIDTH,
          render: (text: string, row: any, i: number) => {
            if ('总计' == c && i == 0) {
              return ''
            }

            const { compareList } = row
            const itemOfColumn =
              compareList.find((compareListItem: any) => compareListItem.name == c) || {}
            let _value = itemOfColumn[v.fieldKey] != null ? itemOfColumn[v.fieldKey] : ''

            if (v.isPercent) {
              try {
                _value =
                  itemOfColumn[v.fieldKey] != null && !isNaN(itemOfColumn[v.fieldKey])
                    ? `${numberWithCommas(
                        (parseFloat(itemOfColumn[v.fieldKey]) * 100).toFixed(v.decimalLength || 0)
                      )}%`
                    : ''
              } catch {
                _value = itemOfColumn[v.fieldKey] != null ? itemOfColumn[v.fieldKey] : ''
              }
            } else {
              try {
                _value =
                  itemOfColumn[v.fieldKey] != null
                    ? numberWithCommas(itemOfColumn[v.fieldKey].toFixed(v.decimalLength || 0))
                    : ''
              } catch {
                _value = itemOfColumn[v.fieldKey] != null ? itemOfColumn[v.fieldKey] : ''
              }
            }

            return (
              <ValueCell
                title={_value}
                colors={colors}
                isSum={
                  '总计' == c || '总计' == row[dimensionList[0] && dimensionList[0].fieldKeyAlias]
                }
              >
                {_value}
              </ValueCell>
            )
          }
        }
      }

      const dimensionListCompareColumn = dimensionListCompare.map((item) => {
        return columns.map((c, index) => {
          if (
            valueList.length == 1 &&
            source.chartData.chartOption.table &&
            source.chartData.chartOption.table.hideDimensionCompareTitle != undefined &&
            !source.chartData.chartOption.table.hideDimensionCompareTitle
          ) {
            // 隐藏对比维度
            return getColumn(valueList[0], index, item, c, true)
          } else {
            // 显示对比维度
            let _c = c
            if (item.isTimeSimplify && source.chartData.chartOption.timeSimplify) {
              if (!isNaN(moment(c).month())) {
                _c = `${moment(c).month() + 1}月`
              }
            }

            if (item.isChannel) {
              _c =
                (source.store.common.channelLabelMap.find((c) => c.code == _c) &&
                  source.store.common.channelLabelMap.find((c) => c.code == _c).name) ||
                _c
            } else if (item.isDataType) {
              _c = getDataTypeName(_c)
            }

            return {
              key: _c,
              className: cx({
                columnTitleCell: true
              }),
              title: (
                <>
                  <if condition={!is4ReportEditor}>
                    <TitleSortLeft
                      className="sortBtn"
                      onClick={() => {
                        setMoveItem({ key: _c, direction: 'left', hasCompare: true })
                        setMoveUpdateKey(+new Date())
                      }}
                    >
                      <CaretLeftOutlined />
                    </TitleSortLeft>
                  </if>
                  <span title={_c}>{_c}</span>
                  <if condition={!is4ReportEditor}>
                    <TitleSortRight
                      className="sortBtn"
                      onClick={() => {
                        setMoveItem({ key: _c, direction: 'right', hasCompare: true })
                        setMoveUpdateKey(+new Date())
                      }}
                    >
                      <CaretRightOutlined />
                    </TitleSortRight>
                  </if>
                </>
              ),
              children: source.chartData.valueList.map((v) => {
                return getColumn(v, index, item, c, false)
              })
            }
          }
        })
      })

      const isShowRank =
        source.chartData.chartOption.table && source.chartData.chartOption.table.showRank
      const needFixed =
        dimensionListCompare.length > 0 &&
        source.blockWrapRect &&
        source.blockWrapRect.width * ((source.blockWidth || 100) / 100) <
          columns.length * source.chartData.valueList.length * 100 + (isShowRank ? 300 : 100)

      const sumColumn = isShowSum
        ? [
            {
              key: 'sum',
              title: '总计',
              dataIndex: 'sum',
              width: COLUMN_WIDTH
            }
          ]
        : []

      let top =
        (source.chartData.chartOption.table &&
          source.chartData.chartOption.table.showTop &&
          source.chartData.chartOption.table.top) ||
        10

      if (is4ReportEditor && top > 50) {
        top = 50
      }

      // feat: move columns
      const sortedTableColumnsKeys =
        source.chartData.chartOption.table &&
        source.chartData.chartOption.table.sortedTableColumnsKeys
      let originColumns = [...(dimensionListCompareColumn[0] || [])]
      const sortedColumns = []
      ;(sortedTableColumnsKeys || []).forEach((key) => {
        let found = false
        originColumns = originColumns.filter((item) => {
          if (!found && item.key == key) {
            sortedColumns.push(item)
            found = true
            return false
          } else return true
        })
      })

      const dimensionListColumns = [
        ...dimensionList.map((item, i) => {
          return {
            key: item.fieldKeyAlias,
            title: (
              <span title={item.fieldNameAlias || item.fieldName}>
                {item.fieldNameAlias || item.fieldName}
              </span>
            ),
            dataIndex: item.fieldKeyAlias,
            width: COLUMN_WIDTH,
            fixed: needFixed ? 'left' : false,
            render: (text, row, index) => {
              let _value = ''
              try {
                _value = numberWithCommas(text.toFixed(item.isRoundNumber ? 0 : 2))
              } catch {
                _value = text
              }

              if (item.isTimeSimplify && source.chartData.chartOption.timeSimplify) {
                if (!isNaN(moment(_value).month())) {
                  _value = `${moment(_value).month() + 1}月`
                }
              }

              if (item.isChannel) {
                _value =
                  (source.store.common.channelLabelMap.find((c) => c.code == _value) &&
                    source.store.common.channelLabelMap.find((c) => c.code == _value).name) ||
                  _value
              } else if (item.isDataType) {
                _value = getDataTypeName(_value)
              }

              return {
                children: (
                  <ValueCell
                    title={_value}
                    color={localStore.colors}
                    isSum={'总计' == row[dimensionList[0] && dimensionList[0].fieldKeyAlias]}
                  >
                    {i == 0 &&
                    source.chartData.chartOption.table &&
                    source.chartData.chartOption.table.showRank ? (
                      isShowSum && !source.chartData.chartOption.table.reverseRow ? (
                        index > 0 ? (
                          <Rank color={localStore.colors[1]}>{index}</Rank>
                        ) : (
                          ''
                        )
                      ) : (
                        <Rank color={localStore.colors[1]}>{index + 1}</Rank>
                      )
                    ) : (
                      ''
                    )}
                    {_value || ''}
                  </ValueCell>
                ),
                props: {
                  colSpan: getColSpan(text, index, dimensionListAndValueList, item.fieldKeyAlias)
                }
              }
            }
          }
        })
      ]

      let returnColumns = sortedTableColumnsKeys
        ? [
            ...dimensionListColumns,
            ...sortedColumns, //支持一个对比字段
            ...originColumns
          ].filter((item) => item != null)
        : [...dimensionListColumns, ...originColumns].filter((item) => item != null)

      // 截取last top
      if (source.chartData.chartOption.table && source.chartData.chartOption.table.reverse) {
        returnColumns.reverse()
      }

      returnColumns = returnColumns.slice(0, top)

      // 截取last top
      if (source.chartData.chartOption.table && source.chartData.chartOption.table.reverse) {
        returnColumns.reverse()
      }

      return returnColumns
    } else {
      const sumColumn = isShowSum
        ? [
            {
              key: 'sum',
              title: '总计',
              dataIndex: 'sum',
              width: COLUMN_WIDTH,
              render: (text, row, index) => {
                if (
                  index == 0 &&
                  source.chartData.chartOption.table &&
                  !source.chartData.chartOption.table.reverseRow
                ) {
                  return ''
                }

                const isAllPercent =
                  source.chartData.valueList
                    .map((v) => {
                      return v.chartDataOption && v.chartDataOption.label.formatType == 'percent'
                    })
                    .filter((item) => !item).length == 0

                let _value = row.sum
                if (isAllPercent) {
                  _value =
                    _value && !isNaN(_value)
                      ? `${numberWithCommas((parseFloat(_value) * 100).toFixed(2))}%`
                      : ''
                } else {
                  _value = row.sum ? row.sum.toFixed(2) : ''
                }

                return (
                  <ValueCell title={text} color={localStore.colors} isSum={true}>
                    {_value}
                  </ValueCell>
                )
              }
            }
          ]
        : []

      const mapFunc = (isDimensionList) => (item, i) => {
        return {
          key: item.fieldKeyAlias,
          className: cx({
            columnTitleCell: true
          }),
          title: (
            <>
              {/* <TitleSortLeft
                      className="sortBtn"
                      onClick={() => {
                        setMoveItem({ key: item.fieldKeyAlias, direction: 'left', hasCompare: false });
                        setMoveUpdateKey(+new Date());
                      }}>
                      <CaretLeftOutlined />
                    </TitleSortLeft> */}
              <span title={item.fieldNameAlias || item.fieldName}>
                {item.fieldNameAlias || item.fieldName}
              </span>
              {/* <TitleSortRight
                      className="sortBtn"
                      onClick={() => {
                        setMoveItem({ key: item.fieldKeyAlias, direction: 'right', hasCompare: false });
                        setMoveUpdateKey(+new Date());
                      }}>
                      <CaretRightOutlined />
                    </TitleSortRight> */}
            </>
          ),
          dataIndex: item.fieldKeyAlias,
          width: 100,
          render: (text, row, index) => {
            let _value = ''

            if (item.chartDataOption) {
              if (item.chartDataOption.label.formatType == 'percent') {
                try {
                  _value =
                    row[item.fieldKeyAlias] && !isNaN(text)
                      ? `${numberWithCommas(
                          (parseFloat(text) * 100).toFixed(
                            typeof item.chartDataOption.label.decimalLength == 'number'
                              ? item.chartDataOption.label.decimalLength
                              : 2
                          )
                        )}%`
                      : ''
                } catch {
                  _value = text
                }
              } else if (item.chartDataOption.label.formatType == 'decimal') {
                try {
                  _value = numberWithCommas(
                    text.toFixed(
                      typeof item.chartDataOption.label.decimalLength == 'number'
                        ? item.chartDataOption.label.decimalLength
                        : 2
                    )
                  )
                } catch {
                  _value = text
                }
              } else {
                try {
                  _value = numberWithCommas(text.toFixed(item.isRoundNumber ? 0 : 2))
                } catch {
                  _value = text
                }
              }
            } else {
              try {
                _value = numberWithCommas(text.toFixed(item.isRoundNumber ? 0 : 2))
              } catch {
                _value = text
              }
            }

            if (isDimensionList) {
              if (item.isTimeSimplify && source.chartData.chartOption.timeSimplify) {
                if (!isNaN(moment(_value).month())) {
                  _value = `${moment(_value).month() + 1}月`
                }
              }

              if (item.isChannel) {
                _value =
                  (source.store.common.channelLabelMap.find((c) => c.code == _value) &&
                    source.store.common.channelLabelMap.find((c) => c.code == _value).name) ||
                  _value
              } else if (item.isDataType) {
                _value = getDataTypeName(_value)
              }
            }

            return {
              children: (
                <ValueCell
                  title={_value}
                  color={localStore.colors}
                  isSum={'总计' == row[dimensionList[0] && dimensionList[0].fieldKeyAlias]}
                >
                  {i == 0 &&
                  source.chartData.chartOption.table &&
                  source.chartData.chartOption.table.showRank &&
                  isDimensionList ? (
                    isShowSum && !source.chartData.chartOption.table.reverseRow ? (
                      index > 0 ? (
                        <Rank color={localStore.colors[1]}>{index}</Rank>
                      ) : (
                        ''
                      )
                    ) : (
                      <Rank color={localStore.colors[1]}>{index + 1}</Rank>
                    )
                  ) : (
                    ''
                  )}
                  {_value || ''}
                </ValueCell>
              ),
              props: {
                colSpan: getColSpan(text, index, dimensionListAndValueList, item.fieldKeyAlias)
              }
            }
          }
        }
      }

      let top =
        (source.chartData.chartOption.table &&
          source.chartData.chartOption.table.showTop &&
          source.chartData.chartOption.table.top) ||
        10

      if (is4ReportEditor && top > 50) {
        top = 50
      }

      // feat: move columns
      const sortedTableColumnsKeys =
        source.chartData.chartOption.table &&
        source.chartData.chartOption.table.sortedTableColumnsKeys

      let originColumns = [
        ...(dimensionList.map(mapFunc(true)) || []),
        ...sumColumn,
        ...(valueList.map(mapFunc()) || [])
      ].filter((item) => item != null)

      // 截取last top
      if (source.chartData.chartOption.table && source.chartData.chartOption.table.reverse) {
        originColumns.reverse()
      }

      originColumns = originColumns.slice(0, top)

      // 截取last top
      if (source.chartData.chartOption.table && source.chartData.chartOption.table.reverse) {
        originColumns.reverse()
      }
      // const sortedColumns = [];
      // (sortedTableColumnsKeys || []).forEach((key) => {
      //   let found = false;
      //   originColumns = originColumns.filter((item) => {
      //     if (!found && item.key == key) {
      //       sortedColumns.push(item);
      //       found = true;
      //       return false;
      //     } else return true;
      //   });
      // });
      // return sortedTableColumnsKeys ? [...sortedColumns, ...originColumns] : originColumns;
      return originColumns
    }
  }

  const tableData = () => {
    const data = useWhere(source.chartData)
    const dimensionList = source.chartData.dimension.filter((item) => !item.isCompare)
    const dimensionListCompare = source.chartData.dimension.filter((item) => item.isCompare)
    const isShowSum =
      source.chartData.chartOption.table && source.chartData.chartOption.table.showSum
    const compareColumns = [
      ...new Set(
        source.chartData.data.map(
          (d) => d[dimensionListCompare[0] && dimensionListCompare[0].fieldKeyAlias]
        )
      )
    ]
    // 合并为其他
    let _others
    const valueKeyList = source.chartData.valueList.map((item) => {
      return getFieldKeyAlias(item)
    })
    if (
      source.chartData.chartOption.hasCompare &&
      dimensionListCompare.length > 0 &&
      dimensionList.length > 0
    ) {
      let progressData = []
      for (let i = 0; i < data.length; i++) {
        const d = data[i]
        const progressDataItem = progressData.find((pData) => {
          // [deprecated!] 这里只汇总前两个维度 dimensionList.slice(0, 2).forEach
          let result = true
          dimensionList.forEach((dimension) => {
            if (pData[dimension.fieldKeyAlias] != d[dimension.fieldKeyAlias]) {
              result = false
            }
          })
          return result
        })
        if (progressDataItem) {
          const _index = progressDataItem.compareList.findIndex(
            (item) =>
              item.name == d[dimensionListCompare[0] && dimensionListCompare[0].fieldKeyAlias]
          )
          source.chartData.valueList.forEach((v) => {
            progressDataItem.compareList[_index][v.fieldKeyAlias] = d[v.fieldKeyAlias]
          })
        } else {
          const dimensions = {}
          dimensionList.forEach((dimension) => {
            dimensions[dimension.fieldKeyAlias] = d[dimension.fieldKeyAlias]
          })
          const compareListSample = compareColumns.map((item) => {
            const _item = {
              name: item
            }
            source.chartData.valueList.forEach((v) => {
              _item[v.fieldKeyAlias] = null
            })
            return _item
          })

          const _index = compareListSample.findIndex(
            (item) =>
              item.name == d[dimensionListCompare[0] && dimensionListCompare[0].fieldKeyAlias]
          )
          source.chartData.valueList.forEach((v) => {
            compareListSample[_index][v.fieldKeyAlias] = d[v.fieldKeyAlias]
          })

          progressData.push({
            ...dimensions,
            compareList: compareListSample
          })
        }
      }

      let sumRowData
      // 计算总计（对比维度）
      if (isShowSum) {
        if (progressData.length > 0) {
          sumRowData = cloneDeep(progressData[0])
          dimensionList.forEach((dim, i) => {
            sumRowData[dim.fieldKeyAlias] = i == 0 ? '总计' : ''
          })
          sumRowData.compareList = compareColumns.map((item) => {
            const _item = {}
            source.chartData.valueList.forEach((v) => {
              _item[v.fieldKeyAlias] = 0
            })
            _item.name = item
            return _item
          })

          if (
            source.chartData.chartOption.table &&
            source.chartData.chartOption.table.showTopRow &&
            source.chartData.chartOption.table.topRow
          ) {
            // 截取last top
            if (source.chartData.chartOption.table.reverseRow) {
              progressData.reverse()
            }

            if (is4ReportEditor && source.chartData.chartOption.table.topRow > 50) {
              progressData = progressData.slice(0, 50 - 1)
            } else {
              progressData = progressData.slice(0, source.chartData.chartOption.table.topRow - 1)
            }

            // 截取last top
            if (source.chartData.chartOption.table.reverseRow) {
              progressData.reverse()
            }
          } else {
            // 截取last top
            if (
              source.chartData.chartOption.table &&
              source.chartData.chartOption.table.reverseRow
            ) {
              progressData.reverse()
            }

            progressData = progressData.slice(0, 10)

            // 截取last top
            if (
              source.chartData.chartOption.table &&
              source.chartData.chartOption.table.reverseRow
            ) {
              progressData.reverse()
            }
          }

          sumRowData = progressData.reduce((s, c) => {
            s.compareList.forEach((item, i) => {
              source.chartData.valueList.forEach((v) => {
                s.compareList[i][v.fieldKeyAlias] =
                  s.compareList[i][v.fieldKeyAlias] +
                  (c.compareList[i] ? c.compareList[i][v.fieldKeyAlias] : 0)
              })
            })
            return s
          }, sumRowData)
        }

        progressData = isShowSum ? [sumRowData, ...progressData] : progressData

        // 列总计
        progressData = progressData.map((d) => {
          const compareSum = cloneDeep(d.compareList[0])
          compareSum.name = '总计'
          source.chartData.valueList.forEach((v) => {
            compareSum[v.fieldKeyAlias] = 0
          })

          let top =
            (source.chartData.chartOption.table &&
              source.chartData.chartOption.table.showTop &&
              source.chartData.chartOption.table.top - dimensionList.length - 1) ||
            10 - dimensionList.length - 1

          if (is4ReportEditor && top > 50) {
            top = 50
          }

          // 截取last top
          if (source.chartData.chartOption.table && source.chartData.chartOption.table.reverse) {
            d.compareList.reverse()
          }

          d.compareList.slice(0, top).forEach((item) => {
            source.chartData.valueList.forEach((v) => {
              compareSum[v.fieldKeyAlias] =
                (compareSum[v.fieldKeyAlias] || 0) + (item[v.fieldKeyAlias] || 0)
            })
          })

          // 截取last top
          if (source.chartData.chartOption.table && source.chartData.chartOption.table.reverse) {
            d.compareList.reverse()
          }

          d.compareList.push(compareSum)
          return d
        })
      }

      let topRow =
        (source.chartData.chartOption.table &&
          source.chartData.chartOption.table.showTopRow &&
          source.chartData.chartOption.table.topRow) ||
        10

      if (is4ReportEditor && topRow > 50) {
        topRow = 50
      }

      // 截取last top
      if (source.chartData.chartOption.table && source.chartData.chartOption.table.reverseRow) {
        progressData.reverse()
      }
      if (
        source.chartData.chartOption.table &&
        source.chartData.chartOption.table.showTopRow &&
        source.chartData.chartOption.table.topRow &&
        source.chartData.chartOption.isCombineOthers &&
        topRow < progressData.length
      ) {
        _others = progressData.slice(topRow).reduce((prev, current) => {
          const _tmp = _.cloneDeep(prev)
          _tmp.compareList = _tmp.compareList.map((item, i) => {
            const _item = _.cloneDeep(item)
            valueKeyList.forEach((key) => {
              _item[key] =
                (_item[key] ? _item[key] : 0) +
                (current.compareList[i][key] ? current.compareList[i][key] : 0)
            })
            return _item
          })
          return _tmp
        })

        _others[
          dimensionList[dimensionList.length - 1] &&
            getFieldKeyAlias(dimensionList[dimensionList.length - 1])
        ] = '其他'
        _others.key = topRow
      }
      const _data = progressData
        .map((item, i) => {
          item.key = i
          return item
        })
        .slice(0, topRow)

      // 截取last top
      if (source.chartData.chartOption.table && source.chartData.chartOption.table.reverseRow) {
        _data.reverse()
      }

      if (_others) {
        _data.push(_others)
      }
      return _data
    } else {
      // 计算总计
      let sumRowData = {}
      let _data = cloneDeep(data)

      if (
        source.chartData.chartOption.table &&
        source.chartData.chartOption.table.showTopRow &&
        source.chartData.chartOption.table.topRow
      ) {
        // 截取last top
        if (source.chartData.chartOption.table.reverseRow) {
          _data.reverse()
        }

        if (is4ReportEditor && source.chartData.chartOption.table.topRow > 50) {
          _data = _data.slice(0, 50 - 1)
        } else {
          _data = _data.slice(0, source.chartData.chartOption.table.topRow - 1)
        }

        // 截取last top
        if (source.chartData.chartOption.table.reverseRow) {
          _data.reverse()
        }
      } else {
        // 截取last top
        if (source.chartData.chartOption.table && source.chartData.chartOption.table.reverseRow) {
          _data.reverse()
        }

        _data = _data.slice(0, 10)

        // 截取last top
        if (source.chartData.chartOption.table && source.chartData.chartOption.table.reverseRow) {
          _data.reverse()
        }
      }

      // 行总计
      dimensionList.forEach((dim, i) => {
        sumRowData[dim.fieldKeyAlias] = i == 0 ? '总计' : ''
      })
      source.chartData.valueList.forEach((v) => {
        sumRowData[v.fieldKeyAlias] = 0
      })
      sumRowData = _data.reduce((s, c) => {
        source.chartData.valueList.forEach((v) => {
          s[v.fieldKeyAlias] = (s[v.fieldKeyAlias] || 0) + c[v.fieldKeyAlias]
        })
        return s
      }, sumRowData)

      _data = isShowSum ? [sumRowData, ...data] : data

      let top =
        (source.chartData.chartOption.table &&
          source.chartData.chartOption.table.showTop &&
          source.chartData.chartOption.table.top - dimensionList.length - 1) ||
        10 - dimensionList.length - 1

      if (is4ReportEditor && top > 50) {
        top = 50
      }

      // 截取last top
      if (source.chartData.chartOption.table && source.chartData.chartOption.table.reverse) {
        _data.reverse()
      }

      // 列总计
      _data = _data.map((d) => {
        d.sum = source.chartData.valueList.slice(0, top).reduce((s, c) => {
          return s + d[c.fieldKeyAlias]
        }, 0)
        return d
      })

      // 截取last top
      if (source.chartData.chartOption.table && source.chartData.chartOption.table.reverse) {
        _data.reverse()
      }

      let topRow =
        (source.chartData.chartOption.table &&
          source.chartData.chartOption.table.showTopRow &&
          source.chartData.chartOption.table.topRow) ||
        10

      if (is4ReportEditor && topRow > 50) {
        topRow = 50
      }

      // 截取last top
      if (source.chartData.chartOption.table && source.chartData.chartOption.table.reverseRow) {
        _data.reverse()
      }
      if (
        source.chartData.chartOption.isCombineOthers &&
        source.chartData.chartOption.table.topRow < _data.length
      ) {
        _others = _data.slice(topRow).reduce((prev, current) => {
          const _tmp = _.cloneDeep(prev)
          const _item = _.cloneDeep(_tmp)
          valueKeyList.forEach((key) => {
            _item[key] = (_item[key] ? _item[key] : 0) + (current[key] ? current[key] : 0)
          })
          return _item
        })
        _others[
          dimensionList[dimensionList.length - 1] &&
            getFieldKeyAlias(dimensionList[dimensionList.length - 1])
        ] = '其他'
        _others.key = source.chartData.chartOption.table.topRow
      }
      const rdata = _data
        .map((item, i) => {
          item.key = i
          return item
        })
        .slice(0, topRow)

      // 截取last top
      if (source.chartData.chartOption.table && source.chartData.chartOption.table.reverseRow) {
        rdata.reverse()
      }

      if (_others) {
        rdata.push(_others)
      }
      return rdata
    }
  }

  return (
    <StyledTable
      size="small"
      color={colors}
      dimensionCount={chartData.dimension.filter((item) => !item.isCompare).length}
      className={cx({
        tableStyle: true,
        tableShowBorder: chartData.chartOption.table && !!chartData.chartOption.table.showBorder
      })}
      columns={toJS(localStore.tableColumns)}
      dataSource={localStore.tableData}
      pagination={false}
      scroll={scroll}
    />
  )
}
