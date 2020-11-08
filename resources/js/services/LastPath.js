export default class LastPath {
    static remember(route) {
        if (LastPath.noExcluded(route)) {
            window.localStorage.setItem('lastPath', route.fullPath);
        }
    }

    static get() {
        const fullPath = window.localStorage.getItem('lastPath');
        return fullPath || '/';
    }

    static noExcluded(route) {
      return ['sign-in', 'notFound'].includes(route.name) === false;
    }
}
