type ValuePiece = Date | null;

export type SelectedValue = ValuePiece | [ValuePiece, ValuePiece];

export interface TileDisabledProps {
  date: Date;
  view: 'month' | 'year' | 'decade' | 'century';
}

export interface DatePickerDisabledProps {
  useClickOutside: (ref: React.RefObject<HTMLElement>, callback: () => void) => void; // Expect the hook as a prop
}
