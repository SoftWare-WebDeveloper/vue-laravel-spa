import store from '../../store';

export default (to, from, next) => {
    if (store.getters['user/isSet']) {
        next();
    } else {
        next('/sign-in');
    }
};
