import Vue from 'vue';
import Router from 'vue-router';
import LastPath from '../services/LastPath';

//layouts
import DefaultLayout from '../layouts/DefaultLayout';

//pages
import SignIn from '../views/Auth/SignIn';
import NotFound from '../views/Errors/NotFound';

import Teams from '../views/Teams/index';
import TeamsCreate from '../views/Teams/create'
import TeamsEdit from '../views/Teams/edit'

import Players from '../views/Players/index';
import PlayersCreate from '../views/Players/create'
import PlayersEdit from '../views/Players/edit'

//guards
import GuestGuard from './guards/guest';
import AuthGuard from './guards/auth';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    linkActiveClass: 'open active',
    routes: [
        {
            path: '/sign-in',
            name: 'sign-in',
            component: SignIn,
            beforeEnter: GuestGuard,
        },
        {
            path: '/',
            redirect: '/teams',
        },
        {
            path: '/',
            name: 'home',
            component: DefaultLayout,
            beforeEnter: AuthGuard,
            children: [
                {
                    path: '/teams',
                    name: 'teams',
                    component: Teams,
                },
                {
                    path: '/teams/create',
                    name: 'TeamsCreate',
                    component: TeamsCreate,
                },
                {
                    path: '/teams/:id/edit',
                    name: 'TeamsEdit',
                    component: TeamsEdit,
                },
                {
                    path: '/players',
                    name: 'players',
                    component: Players,
                },
                {
                    path: '/players/create',
                    name: 'PlayersCreate',
                    component: PlayersCreate,
                },
                {
                    path: '/players/:id/edit',
                    name: 'PlayersEdit',
                    component: PlayersEdit,
                },
            ]
        },
        {
            path: '*',
            name: 'notFound',
            component: NotFound,
        },
    ],
});

router.afterEach((to) => {
    LastPath.remember(to);
});

export default router;
