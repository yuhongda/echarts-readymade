import React, { useContext, useState, useCallback, useEffect } from 'react'
import Big from 'big.js'
import cloneDeep from 'clone'
import type { ChartProps, Field } from '@echarts-readymade/core'
import { mergeOption, COLOR_LIST, numberWithCommas } from '@echarts-readymade/core'
import styled from 'styled-components'
import { Table as AntdTable, Tooltip } from 'antd'
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined'
import CaretLeftOutlined from '@ant-design/icons/CaretLeftOutlined'
import CaretRightOutlined from '@ant-design/icons/CaretRightOutlined'
import useLocalStorageState from 'use-local-storage-state'

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

const StyledTable = styled(AntdTable)<{
  color: string[]
  dimensionCount: number
  columnWidth: number
  isCompareMode: boolean
}>`
  width: 100% !important;
  border-right: ${(props) => (props.isCompareMode ? 1 : 0)}px solid ${(props) => props.color[0]} !important;
  .ant-table {
    background: ${(props) => props.color[3]} !important;
  }
  .ant-table-thead > tr > th {
    background: ${(props) => props.color[0]} !important;
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
    border-bottom: 1px solid ${(props) => props.color[0]};
    border-right: 1px solid ${(props) => props.color[0]};
    text-align: center;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: ${(props) => props.columnWidth}px !important;
  }
  .ant-table-thead > tr:first-child > th:first-child {
    border-left: 1px solid ${(props) => props.color[0]};
  }
  .ant-table-thead > tr > th {
    color: ${(props) => props.color[1]};
  }
  .ant-table-tbody > tr > td {
    color: ${(props) => props.color[5]};
  }
  .ant-table-tbody > tr:hover > td {
    background: ${(props) => props.color[4]};
  }
  .ant-table-tbody > tr > td:first-child {
    text-align: left;
    border-left: 1px solid ${(props) => props.color[0]};
  }
  .ant-table-cell-fix-left,
  .ant-table-cell-fix-right {
    /* background: ${(props) => props.color[0]} !important; */
  }
  .ant-table-fixed {
    /* background: ${(props) => props.color[0]} !important; */
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
      return props.dimensionCount * props.columnWidth
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
      ? (props.colors && props.colors[2]) || 'color: rgba(0, 0, 0, 0.65)'
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
  /**
   * @description ['边框和表头', '表头文字', '汇总列', '表格背景', '行hover背景', '表格字体']
   */
  colorList?: string[]
  showRank?: boolean
  showSum?: boolean
  hideDimensionCompareTitle?: boolean
  blockWrapHeight?: number
  antdOptions?: any
  sortKey?: string // 用于记录列排序的key
  columnWidth?: number
  setOption?: <T, K>(columns: any[], dataSource: any[]) => { columns: T[]; dataSource: K[] }
}

export const Table: React.FC<TableChartProps> = (props) => {
  const {
    context,
    dimension = [],
    compareDimension,
    valueList = [],
    colorList = ['#fafafa'],
    showRank,
    showSum,
    hideDimensionCompareTitle,
    blockWrapHeight = 500,
    antdOptions,
    sortKey,
    columnWidth,
    setOption,
    ...restSettings
  } = props
  const { data } = useContext(context)
  const COLUMN_WIDTH = columnWidth || 150

  if (!data) {
    return null
  }

  const colors = colorList || COLOR_LIST

  // feat: move columns
  const [moveItem, setMoveItem] = useState<any>(null)
  const [moveUpdateKey, setMoveUpdateKey] = useState<number | null>(null)
  const [sortedTableColumnsKeys, setSortedTableColumnsKeys] = useLocalStorageState<string[]>(
    `[@echarts-readymade/table]sortedTableColumnsKeys-${sortKey}`,
    {
      defaultValue: []
    }
  )

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
          width: v.width || COLUMN_WIDTH,
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
                isSum={'总计' == c || '总计' == row[dimension[0].fieldKey]}
              >
                {_value}
              </ValueCell>
            )
          }
        }
      }

      const dimensionListCompareColumn = compareDimension.map((item) => {
        return columns.map((c, index) => {
          if (valueList.length == 1 && hideDimensionCompareTitle) {
            // 隐藏对比维度
            return getColumn(valueList[0], index, item, c, true)
          } else {
            // 显示对比维度
            let _c = c

            return {
              key: _c,
              className: 'columnTitleCell',
              title: (
                <>
                  <TitleSortLeft
                    className="sortBtn"
                    onClick={() => {
                      setMoveItem({ key: _c, direction: 'left', hasCompare: true })
                      setMoveUpdateKey(+new Date())
                    }}
                  >
                    <CaretLeftOutlined />
                  </TitleSortLeft>
                  <span title={_c}>{_c}</span>
                  <TitleSortRight
                    className="sortBtn"
                    onClick={() => {
                      setMoveItem({ key: _c, direction: 'right', hasCompare: true })
                      setMoveUpdateKey(+new Date())
                    }}
                  >
                    <CaretRightOutlined />
                  </TitleSortRight>
                </>
              ),
              children: valueList.map((v) => {
                return getColumn(v, index, item, c, false)
              })
            }
          }
        })
      })

      const sumColumn = showSum
        ? [
            {
              key: 'sum',
              title: '总计',
              dataIndex: 'sum',
              width: COLUMN_WIDTH
            }
          ]
        : []

      // feat: move columns
      let originColumns = [...(dimensionListCompareColumn[0] || [])]
      const sortedColumns: any[] = []
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
        ...dimension.map((item, i) => {
          return {
            key: item.fieldKey,
            title: <span title={item.fieldName}>{item.fieldName}</span>,
            dataIndex: item.fieldKey,
            width: item.width || COLUMN_WIDTH,
            fixed: 'left',
            render: (text: any, row: any, index: number) => {
              let _value = ''
              try {
                _value = numberWithCommas(text.toFixed(item.decimalLength || 0))
              } catch {
                _value = text
              }

              return {
                children: (
                  <ValueCell
                    title={_value}
                    colors={colors}
                    isSum={'总计' == row[dimension[0].fieldKey]}
                  >
                    {i == 0 && showRank ? (
                      showSum ? (
                        index > 0 ? (
                          <Rank color={colors[0]}>{index}</Rank>
                        ) : (
                          ''
                        )
                      ) : (
                        <Rank color={colors[0]}>{index + 1}</Rank>
                      )
                    ) : (
                      ''
                    )}
                    {_value || ''}
                  </ValueCell>
                ),
                props: {
                  colSpan: getColSpan(text, index, dimensionListAndValueList, item.fieldKey)
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

      return returnColumns
    } else {
      // 无对比维度
      const sumColumn = showSum
        ? [
            {
              key: 'sum',
              title: '总计',
              dataIndex: 'sum',
              width: COLUMN_WIDTH,
              render: (text: string, row: any, index: number) => {
                const isAllPercent =
                  valueList
                    .map((v) => {
                      return v.isPercent
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
                  <ValueCell title={text} colors={colors} isSum={true}>
                    {_value}
                  </ValueCell>
                )
              }
            }
          ]
        : []

      const mapFunc = (isDimensionList: boolean) => (item: Field, i: number) => {
        return {
          key: item.fieldKey,
          className: 'columnTitleCell',
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
              <span title={item.fieldName}>{item.fieldName}</span>
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
          dataIndex: item.fieldKey,
          width: item.width || COLUMN_WIDTH,
          render: (text: any, row: any, index: number) => {
            let _value = ''

            if (item.isPercent) {
              try {
                _value =
                  row[item.fieldKey] && !isNaN(text)
                    ? `${numberWithCommas(
                        (parseFloat(text) * 100).toFixed(item.decimalLength || 0)
                      )}%`
                    : ''
              } catch {
                _value = text
              }
            } else {
              try {
                _value = numberWithCommas(text.toFixed(item.decimalLength || 0))
              } catch {
                _value = text
              }
            }

            return {
              children: (
                <ValueCell
                  title={_value}
                  colors={colors}
                  isSum={'总计' == row[dimension[0].fieldKey]}
                >
                  {i == 0 && showRank && isDimensionList ? (
                    showSum ? (
                      index > 0 ? (
                        <Rank color={colors[0]}>{index}</Rank>
                      ) : (
                        ''
                      )
                    ) : (
                      <Rank color={colors[0]}>{index + 1}</Rank>
                    )
                  ) : (
                    ''
                  )}
                  {_value || ''}
                </ValueCell>
              ),
              props: {
                colSpan: getColSpan(text, index, dimensionListAndValueList, item.fieldKey)
              }
            }
          }
        }
      }

      let originColumns = [
        ...(dimension.map(mapFunc(true)) || []),
        ...sumColumn,
        ...(valueList.map(mapFunc(false)) || [])
      ].filter((item) => item != null)

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
    const compareColumns = [
      ...new Set(data.map((d) => d[(compareDimension && compareDimension[0].fieldKey) || '']))
    ]

    const valueKeyList = valueList.map((item) => {
      return item.fieldKey
    })

    if (compareDimension && compareDimension.length > 0 && dimension.length > 0) {
      let progressData = []
      for (let i = 0; i < data.length; i++) {
        const d = data[i]
        const progressDataItem: any = progressData.find((pData: any) => {
          // [deprecated!] 这里只汇总前两个维度 dimensionList.slice(0, 2).forEach
          let result = true
          dimension.forEach((dimension) => {
            if (pData[dimension.fieldKey] != d[dimension.fieldKey]) {
              result = false
            }
          })
          return result
        })
        if (progressDataItem) {
          const _index = progressDataItem.compareList.findIndex(
            (item: any) => item.name == d[compareDimension[0] && compareDimension[0].fieldKey]
          )
          valueList.forEach((v) => {
            progressDataItem.compareList[_index][v.fieldKey] = d[v.fieldKey]
          })
        } else {
          const dimensions: { [key: string]: any } = {}
          dimension.forEach((dim) => {
            dimensions[dim.fieldKey] = d[dim.fieldKey]
          })
          const compareListSample = compareColumns.map((item) => {
            const _item: { [key: string]: any } = {
              name: item
            }
            valueList.forEach((v) => {
              _item[v.fieldKey] = null
            })
            return _item
          })

          const _index = compareListSample.findIndex(
            (item) => item.name == d[compareDimension[0] && compareDimension[0].fieldKey]
          )
          valueList.forEach((v) => {
            compareListSample[_index][v.fieldKey] = d[v.fieldKey]
          })

          progressData.push({
            ...dimensions,
            compareList: compareListSample
          })
        }
      }

      let sumRowData: any
      // 计算总计（对比维度）
      if (showSum) {
        if (progressData.length > 0) {
          sumRowData = cloneDeep(progressData[0])
          dimension.forEach((dim, i) => {
            sumRowData[dim.fieldKey] = i == 0 ? '总计' : ''
          })
          sumRowData.compareList = compareColumns.map((item) => {
            const _item: any = {}
            valueList.forEach((v) => {
              _item[v.fieldKey] = 0
            })
            _item.name = item
            return _item
          })

          sumRowData = progressData.reduce((s, c) => {
            s.compareList.forEach((item: any, i: number) => {
              valueList.forEach((v) => {
                s.compareList[i][v.fieldKey] =
                  s.compareList[i][v.fieldKey] +
                  (c.compareList[i] ? c.compareList[i][v.fieldKey] : 0)
              })
            })
            return s
          }, sumRowData)
        }

        progressData = showSum ? [sumRowData, ...progressData] : progressData

        // 列总计
        progressData = progressData.map((d) => {
          const compareSum = cloneDeep(d.compareList[0])
          compareSum.name = '总计'
          valueList.forEach((v) => {
            compareSum[v.fieldKey] = 0
          })

          d.compareList.slice(0, top).forEach((item: any) => {
            valueList.forEach((v) => {
              compareSum[v.fieldKey] = (compareSum[v.fieldKey] || 0) + (item[v.fieldKey] || 0)
            })
          })

          d.compareList.push(compareSum)
          return d
        })
      }

      const _data = progressData.map((item, i) => {
        item.key = i
        return item
      })

      return _data
    } else {
      // 计算总计
      let sumRowData: { [key: string]: any } = {}
      let _data = cloneDeep(data)

      // 行总计
      dimension.forEach((dim, i) => {
        sumRowData[dim.fieldKey] = i == 0 ? '总计' : ''
      })
      valueList.forEach((v) => {
        sumRowData[v.fieldKey] = 0
      })
      sumRowData = _data.reduce((s, c) => {
        valueList.forEach((v) => {
          s[v.fieldKey] = (s[v.fieldKey] || 0) + c[v.fieldKey]
        })
        return s
      }, sumRowData)

      _data = showSum ? [sumRowData, ...data] : data

      // 列总计
      _data = _data.map((d) => {
        d.sum = valueList.reduce((s, c) => {
          return s + d[c.fieldKey]
        }, 0)
        return d
      })

      const rdata = _data.map((item, i) => {
        item.key = i
        return item
      })

      return rdata
    }
  }

  const scroll: { [key: string]: any } = {}
  const [rect, setRect] = useState<any>(null)
  const wrapperRef = useCallback((node) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect())
    }
  }, [])

  if (rect && rect.height < tableData().length * 53 + 50 + 40) {
    scroll.y =
      blockWrapHeight - 40 - ((compareDimension && compareDimension.length > 0 ? 40 : 0) || 0)
  }

  const _blockWidth = rect?.width
  const compareColumns = [
    ...new Set(data.map((d) => compareDimension && d[compareDimension[0].fieldKey]))
  ]

  if (compareDimension && compareDimension.length > 0) {
    const _compareColumnsCount = Math.min(
      dimension.length - (showSum ? 1 : 0),
      compareColumns.length
    )

    const dimensionWidth = valueList.reduce((s, c) => {
      s = s + (c.width || COLUMN_WIDTH)
      return s
    }, 0)

    const valueListWidth = valueList.reduce((s, c) => {
      s = s + (c.width || COLUMN_WIDTH)
      return s
    }, 0)

    if (_blockWidth < _compareColumnsCount * valueListWidth + dimensionWidth) {
      scroll.x = _compareColumnsCount * valueListWidth + dimensionWidth
    }
  } else {
    if (_blockWidth < tableColumns().length * COLUMN_WIDTH + 100) {
      scroll.x = '100%'
    }
  }

  // feat: move columns
  useEffect(() => {
    if (moveItem) {
      const _index = sortedTableColumnsKeys.findIndex((item) => item == moveItem.key)
      if (moveItem.direction == 'left') {
        if (_index > 0) {
          sortedTableColumnsKeys.splice(_index - 1, 0, sortedTableColumnsKeys.splice(_index, 1)[0])
          setSortedTableColumnsKeys(sortedTableColumnsKeys)
        }
      } else if (moveItem.direction == 'right') {
        if (_index < sortedTableColumnsKeys.length - 1) {
          sortedTableColumnsKeys.splice(_index + 1, 0, sortedTableColumnsKeys.splice(_index, 1)[0])
          setSortedTableColumnsKeys(sortedTableColumnsKeys)
        }
      }
      setMoveItem(null)
    } else {
      setSortedTableColumnsKeys(tableColumns().map((item: any) => item.key))
    }
  }, [moveUpdateKey])

  const options = {
    columns: tableColumns(),
    dataSource: tableData()
  }
  if (setOption) {
    const { columns, dataSource } = setOption(options.columns, options.dataSource)
    options.columns = columns
    options.dataSource = dataSource
  }

  return (
    <div ref={wrapperRef} style={{ height: blockWrapHeight || 500 }}>
      <StyledTable
        size="small"
        color={colors}
        dimensionCount={dimension.length}
        columns={options.columns}
        dataSource={options.dataSource}
        pagination={false}
        scroll={scroll}
        columnWidth={COLUMN_WIDTH}
        isCompareMode={compareDimension && compareDimension.length > 0}
        {...antdOptions}
      />
    </div>
  )
}
