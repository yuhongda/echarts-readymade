import React from 'react';
import { ChartProps, LegendPosition } from '@echarts-readymade/core';
import { EChartsOption } from 'echarts';

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
declare const Scatter: (props: ScatterChartProps) => React.JSX.Element | null;

type QuadrantSettingOptionProps = {
    show: boolean;
    bgColors: string[];
    quadrant1Name: string;
    quadrant2Name: string;
    quadrant3Name: string;
    quadrant4Name: string;
    quadrantType: 'median' | 'equal' | 'max' | 'min' | 'average';
} | undefined;
declare const quadrantSetting: (option: EChartsOption, quadrantSettingOption: QuadrantSettingOptionProps) => void;

export { Scatter, quadrantSetting };
export type { QuadrantSettingOptionProps, ScatterChartProps };
