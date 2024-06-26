import ReactDOMServer from 'react-dom/server';
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import route from '../../vendor/tightenco/ziggy/dist/index.m';
import Providers from '@/Components/common/Providers';

const appName = 'Near You';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} | ${appName}`,
        resolve: (name) =>
            resolvePageComponent(
                `./Pages/${name}.tsx`,
                import.meta.glob('./Pages/**/*.tsx')
            ),
        setup: ({ App, props }) => {
            global.route = (name, params, absolute) =>
                route(name, params, absolute, {
                    // @ts-expect-error
                    ...page.props.ziggy,
                    location: 'http://test.com/',
                });

            return (
                <Providers>
                    <App {...props} />
                </Providers>
            );
        },
    })
);
