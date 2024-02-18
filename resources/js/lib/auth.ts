import { router, usePage } from '@inertiajs/react';
import type { ErrorBag, Errors, Page, PageProps } from '@inertiajs/core';
import { App } from '@/types';

type AuthContext = {
    user: App['Models']['User'];
    isAuth: boolean;
    can: (ability: string) => boolean;
    logout: () => void;
    sessionID: string;
};

type AppPage = {
    props: PageProps & SharedProps;
} & Page;

type SharedProps = {
    auth: AuthContext;
    errors: Errors & ErrorBag;
    session_id: string;
};

export function useAuth(): AuthContext {
    const { props } = usePage() as AppPage;
    const isAuth = Boolean(props.auth.user);

    const sessionID = props.session_id;

    function can(ability: string): boolean {
        if (!isAuth) {
            return false;
        }

        return props.auth.user.is_admin;
    }

    function logout() {
        router.post(route('logout'));
    }

    return {
        user: props.auth.user,
        isAuth,
        can,
        logout,
        sessionID,
    };
}
