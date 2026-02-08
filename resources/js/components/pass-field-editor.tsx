import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { PassField } from '@/types/pass';
import { Plus, Trash2 } from 'lucide-react';

interface PassFieldEditorProps {
	fields: PassField[];
	onChange: (fields: PassField[]) => void;
	label: string;
	maxFields?: number;
}

export function PassFieldEditor({
	fields,
	onChange,
	label,
	maxFields = 10,
}: PassFieldEditorProps) {
	const handleAddField = () => {
		if (fields.length >= maxFields) return;
		onChange([...fields, { key: '', label: '', value: '' }]);
	};

	const handleRemoveField = (index: number) => {
		onChange(fields.filter((_, i) => i !== index));
	};

	const handleFieldChange = (
		index: number,
		field: 'key' | 'label' | 'value',
		value: string,
	) => {
		const newFields = [...fields];
		newFields[index] = { ...newFields[index], [field]: value };
		onChange(newFields);
	};

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<Label className="text-base">{label}</Label>
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={handleAddField}
					disabled={fields.length >= maxFields}
				>
					<Plus className="mr-1 h-4 w-4" />
					Add Field
				</Button>
			</div>

			{fields.length === 0 && (
				<div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
					No fields added yet. Click "Add Field" to create one.
				</div>
			)}

			<div className="space-y-3">
				{fields.map((field, index) => (
					<div
						key={index}
						className="flex items-end gap-2 rounded-lg border p-3"
					>
						<div className="flex-1 space-y-2">
							<div className="grid grid-cols-3 gap-2">
								<div>
									<Label className="text-xs">Key</Label>
									<Input
										value={field.key}
										onChange={(e) =>
											handleFieldChange(index, 'key', e.target.value)
										}
										placeholder="field_key"
										className="h-9"
									/>
								</div>
								<div>
									<Label className="text-xs">Label</Label>
									<Input
										value={field.label}
										onChange={(e) =>
											handleFieldChange(index, 'label', e.target.value)
										}
										placeholder="Label"
										className="h-9"
									/>
								</div>
								<div>
									<Label className="text-xs">Value</Label>
									<Input
										value={field.value}
										onChange={(e) =>
											handleFieldChange(index, 'value', e.target.value)
										}
										placeholder="Value"
										className="h-9"
									/>
								</div>
							</div>
						</div>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							onClick={() => handleRemoveField(index)}
							className="h-9 w-9 text-destructive"
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				))}
			</div>
		</div>
	);
}
