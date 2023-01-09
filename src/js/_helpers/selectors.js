export const qs = (selector, ctx = document) => ctx.querySelector(selector);
export const qsa = (selector, ctx = document) => Array.from(ctx.querySelectorAll(selector));
export const id = id => document.getElementById(id);
export const data = (attr, ctx) => ctx.hasAttribute('data-' + attr) ? ctx.getAttribute('data-' + attr) : '';
export const className = (selector, ctx = document) => {
    Array.toArray(ctx.getElementsByClassName(selector));
};