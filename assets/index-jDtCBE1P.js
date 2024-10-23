var a=Object.defineProperty;var h=(r,e,i)=>e in r?a(r,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):r[e]=i;var c=(r,e,i)=>h(r,typeof e!="symbol"?e+"":e,i);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function i(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=i(t);fetch(t.href,s)}})();class d{constructor(){c(this,"navLinks");c(this,"sections");this.navLinks=this.getNavLinks(),this.sections=this.getSections(),this.hashHandler=this.hashHandler.bind(this),this.handleScroll=this.handleScroll.bind(this),this.init()}throw(e){throw new Error(`Element with selector ${e} is missing`)}getNavLinks(){const e=document.querySelectorAll(".nav-link");return e.length===0&&this.throw(".nav-link"),e}getSections(){const e=document.querySelectorAll(".section");return e.length===0&&this.throw(".section"),e}handleScroll(){const e=new IntersectionObserver(i=>{i.forEach(n=>{if(n.isIntersecting){const t=n.target.getAttribute("id");this.navLinks.forEach(s=>{var l;((l=s.getAttribute("href"))==null?void 0:l.substring(1))===t?s.classList.add("active"):s.classList.remove("active")})}})},{threshold:.5});this.sections.forEach(i=>{e.observe(i)})}hashHandler(){const e=window.location.hash.split("#")[1];window.history.pushState({},"Page Title","/"+e)}init(){window.addEventListener("hashchange",this.hashHandler,!1),this.handleScroll()}}const u=()=>{new d};window.addEventListener("load",u);