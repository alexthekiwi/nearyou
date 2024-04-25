import { router, usePage } from '@inertiajs/react';
import type { ErrorBag, Errors, Page, PageProps } from '@inertiajs/core';
import { Dispatch } from '@reduxjs/toolkit';
import { App } from '@/types';
import socket, { closeSocket } from './socket';

type AuthContext = {
    user: App['Models']['User'];
    isAuth: boolean;
    can: (ability: string) => boolean;
    logout: () => void;
    jwt: string;
};

type AppPage = {
    props: PageProps & SharedProps;
} & Page;

type SharedProps = {
    auth: AuthContext;
    errors: Errors & ErrorBag;
    jwt: string;
};

export function useAuth(dispatch?: Dispatch): AuthContext {
    const { props } = usePage() as AppPage;
    const isAuth = Boolean(props.auth.user);

    const { jwt } = props;

    function can(ability: string): boolean {
        if (!isAuth) {
            return false;
        }

        return props.auth.user.is_admin;
    }

    function logout() {
        router.post(route('logout'));
    }

    if (isAuth) socket({ dispatch, jwt });
    else closeSocket();

    return {
        user: props.auth.user,
        isAuth,
        can,
        logout,
        jwt,
    };
}
