import { usePage } from '@inertiajs/react';
import type { ErrorBag, Errors, Page, PageProps } from '@inertiajs/core';
import { App } from '@/types';

type AuthContext = {
    user: App['Models']['User'];
    isAuth: boolean;
    can: (ability: string) => boolean;
};

type AppPage = {
    props: PageProps & SharedProps;
} & Page;

type SharedProps = {
    auth: AuthContext;
    errors: Errors & ErrorBag;
};

export function useAuth(): AuthContext {
    const { props } = usePage() as AppPage;
    const isAuth = Boolean(props.auth.user);

    function can(ability: string): boolean {
        if (!isAuth) {
            return false;
        }

        return props.auth.user.is_admin;
    }

    return {
        user: props.auth.user,
        isAuth,
        can,
    };
}
