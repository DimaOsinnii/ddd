import { Button } from '@kobalte/core';
import { createSignal } from 'solid-js';

export function User() {
    const [count, setCount] = createSignal(0);

    return (
        <Button.Root class="bg-blue-500 rounded" onClick={() => setCount((prev) => prev + 1)}>
            user count: {count()}
        </Button.Root>
    );
}
