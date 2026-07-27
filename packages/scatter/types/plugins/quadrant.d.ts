import type { EChartsOption } from 'echarts';
export type QuadrantSettingOptionProps = {
    show: boolean;
    bgColors: string[];
    quadrant1Name: string;
    quadrant2Name: string;
    quadrant3Name: string;
    quadrant4Name: string;
    quadrantType: 'median' | 'equal' | 'max' | 'min' | 'average';
} | undefined;
export declare const quadrantSetting: (option: EChartsOption, quadrantSettingOption: QuadrantSettingOptionProps) => void;
