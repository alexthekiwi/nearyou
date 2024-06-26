import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import Providers from '@/Components/common/Providers';

const appName =
    window.document.getElementsByTagName('title')[0]?.innerText || 'Near You';

console.log(`Rendering ${appName}...`);

createInertiaApp({
    title: (title) => `${title} | ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx')
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        document.body.style.marginBottom = '0';

        root.render(
            <Providers>
                <App {...props} />
            </Providers>
        );
    },
    progress: {
        color: '#000',
    },
});
