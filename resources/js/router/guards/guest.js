import store from '../../store';

export default (to, from, next) => {
    if (store.getters['user/isNotSet']) {
        next();
    } else {
        next('/');
    }
};
