declare module 'rc-slider' {
  import React from 'react';

  export interface Mark {
    style?: React.CSSProperties;
    label: React.ReactNode;
  }

  export interface RangeSliderProps {
    className?: string;
    defaultValue?: number | number[];
    min?: number;
    max?: number;
    count?: number;
    pushable?: boolean;
    range?: boolean;
    allowCross?: boolean;
    marks?: { [key: number]: React.ReactNode | Mark };
    step?: number | null;
    tipFormatter?: (value: number) => string;
    vertical?: boolean;
    dots?: boolean;
    trackStyle?: React.CSSProperties[];
    handleStyle?: React.CSSProperties[];
    railStyle?: React.CSSProperties;
    included?: boolean;
    disabled?: boolean;
    pushable?: number | boolean;
    onChange?: Object;
    onAfterChange?: Object;
  }

  const RangeSlider: React.FC<RangeSliderProps>;
  export default RangeSlider;
}
