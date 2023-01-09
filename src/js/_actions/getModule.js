let getModule;

if(process.env.NODE_ENV === 'development') {
    /*
    Reduces compiling time by only using one file instead of splitting into chunks during development
    */
    getModule = (module) => import(/*
        webpackMode: 'lazy-once',
        webpackChunkName: 'module-bundle'
      */ `../modules/${module}`).then((x) => x).catch((err) => console.warn(err));
} else {
    getModule = (module) => import(`../modules/${module}`).then((x) => x).catch((err) => console.warn(err));
}

export default getModule;
