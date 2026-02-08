import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface ColorPickerProps {
	value: string;
	onChange: (value: string) => void;
	label: string;
}

export function ColorPicker({ value, onChange, label }: ColorPickerProps) {
	// Convert rgb(r,g,b) to hex for color input
	const rgbToHex = (rgb: string): string => {
		if (!rgb || !rgb.startsWith('rgb')) {
			return '#3b82f6'; // default
		}

		const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
		if (!match) return '#3b82f6';

		const r = parseInt(match[1]);
		const g = parseInt(match[2]);
		const b = parseInt(match[3]);

		return (
			'#' +
			[r, g, b]
				.map((x) => {
					const hex = x.toString(16);
					return hex.length === 1 ? '0' + hex : hex;
				})
				.join('')
		);
	};

	// Convert hex to rgb(r,g,b)
	const hexToRgb = (hex: string): string => {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		if (!result) return 'rgb(59,130,246)';

		const r = parseInt(result[1], 16);
		const g = parseInt(result[2], 16);
		const b = parseInt(result[3], 16);

		return `rgb(${r},${g},${b})`;
	};

	const [hexValue, setHexValue] = useState(rgbToHex(value));

	const handleChange = (hex: string) => {
		setHexValue(hex);
		onChange(hexToRgb(hex));
	};

	return (
		<div className="space-y-2">
			<Label>{label}</Label>
			<div className="flex items-center gap-3">
				<Input
					type="color"
					value={hexValue}
					onChange={(e) => handleChange(e.target.value)}
					className="h-12 w-20 cursor-pointer"
				/>
				<div className="flex-1">
					<Input
						type="text"
						value={value}
						readOnly
						className="font-mono text-sm"
					/>
				</div>
			</div>
		</div>
	);
}
