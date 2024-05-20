import React from 'react';
import { ECharts, EChartsOption } from 'echarts';
import { ChartProps, LegendPosition } from '@echarts-readymade/core';

interface ScatterChartProps extends ChartProps {
    /**
     * 图例位置
     */
    legendPosition?: LegendPosition;
    minDotSize?: number;
    maxDotSize?: number;
    colorMap?: {
        name: string;
        color: string;
    }[];
}
declare const Scatter: React.ForwardRefExoticComponent<ScatterChartProps & React.RefAttributes<{
    getEchartsInstance: () => ECharts | undefined;
}>>;

declare type QuadrantSettingOptionProps = {
    show: boolean;
    bgColors: string[];
    quadrant1Name: string;
    quadrant2Name: string;
    quadrant3Name: string;
    quadrant4Name: string;
    quadrantType: 'median' | 'equal' | 'max' | 'min' | 'average';
} | undefined;
declare const quadrantSetting: (option: EChartsOption, quadrantSettingOption: QuadrantSettingOptionProps) => void;

export { QuadrantSettingOptionProps, Scatter, ScatterChartProps, quadrantSetting };
