import { Alert, List } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

export default function AlertError({
    errors,
    title,
}: {
    errors: string[];
    title?: string;
}) {
    return (
        <Alert
            icon={<IconAlertCircle size="1rem" />}
            title={title || 'Something went wrong.'}
            color="red"
            variant="light"
        >
            <List size="sm" spacing="xs">
                {Array.from(new Set(errors)).map((error, index) => (
                    <List.Item key={index}>{error}</List.Item>
                ))}
            </List>
        </Alert>
    );
}
