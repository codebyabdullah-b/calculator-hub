
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';

createInertiaApp({
    resolve: async (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx');
        const page = pages[`./Pages/${name}.jsx`];

        if (!page) {
            throw new Error(`Page not found: ${name}`);
        }

        return await page();
    },

    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
