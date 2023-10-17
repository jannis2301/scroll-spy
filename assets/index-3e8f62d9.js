var a=Object.defineProperty;var h=(n,t,i)=>t in n?a(n,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):n[t]=i;var l=(n,t,i)=>(h(n,typeof t!="symbol"?t+"":t,i),i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();class d{constructor(){l(this,"navLinks");l(this,"sections");this.navLinks=this.getNavLinks(),this.sections=this.getSections(),this.hashHandler=this.hashHandler.bind(this),this.handleScroll=this.handleScroll.bind(this),this.init()}throw(t){throw new Error(`Element with selector ${t} is missing`)}getNavLinks(){const t=document.querySelectorAll(".nav-link");return t.length===0&&this.throw(".nav-link"),t}getSections(){const t=document.querySelectorAll(".section");return t.length===0&&this.throw(".section"),t}handleScroll(){var i;const t=window.scrollY;for(const o of this.sections){const e=o.offsetTop-150,s=o.offsetHeight,r=o.getAttribute("id");if(t>=e&&t<e+s)for(const c of this.navLinks)c.classList.remove("active"),((i=c.getAttribute("href"))==null?void 0:i.substring(1))===r&&c.classList.add("active")}}hashHandler(){const t=window.location.hash.split("#")[1];window.history.pushState({},"Page Title","/"+t)}init(){window.addEventListener("scroll",this.handleScroll),window.addEventListener("hashchange",this.hashHandler,!1)}}const f=()=>{new d};window.addEventListener("load",f);