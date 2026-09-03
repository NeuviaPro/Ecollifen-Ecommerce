import{n as e,t}from"./buscador.BXKJ-SVB.js";var n=6,r=null,i=null;async function a(){return r||(i||=fetch(`/buscador.json`).then(e=>e.ok?e.json():[]).then(e=>r=e).catch(e=>(console.error(`[buscador] No se pudo cargar el índice:`,e),[])),i)}function o(t){let n=t.imagen?`<img src="${t.imagen}" alt="" loading="lazy" class="h-full w-full object-contain" />`:``,r=t.stock===`instock`?``:`<span class="font-mono text-[10px] text-muted">SIN STOCK</span>`;return`
            <li>
                <a href="/producto/${t.id}" class="flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-surface-alt">
                    <span class="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-white p-1">${n}</span>
                    <span class="flex min-w-0 flex-1 flex-col">
                        <span class="truncate text-sm font-medium text-foreground">${t.nombre}</span>
                        <span class="truncate font-mono text-[10px] tracking-wide text-muted">${t.categoria}</span>
                    </span>
                    <span class="flex shrink-0 flex-col items-end gap-0.5">
                        <span class="text-sm font-semibold text-green-700 tabular-nums">${e(t.precio)}</span>
                        ${r}
                    </span>
                </a>
            </li>
        `}function s(e){let r=e.querySelector(`[data-buscador-input]`),i=e.querySelector(`[data-buscador-panel]`),s=e.querySelector(`[data-buscador-resultados]`),c=e.querySelector(`[data-buscador-vacio]`),l=e.querySelector(`[data-buscador-eco]`),u=e.querySelector(`[data-buscador-todos]`),d=e.querySelector(`[data-buscador-limpiar]`);if(!r||!i||!s||!c||!u||!d)return;let f=0;function p(){i.hidden=!0}async function m(){let e=r.value.trim();if(d.hidden=e.length===0,e.length<2){p();return}let f=t(await a(),e),m=f.slice(0,n);s.innerHTML=m.map(o).join(``),c.hidden=f.length>0,l&&(l.textContent=`"${e}"`);let h=f.length-m.length;u.hidden=h<=0,u.href=`/busqueda?q=${encodeURIComponent(e)}`,u.textContent=`Ver los ${f.length} resultados →`,i.hidden=!1}r.addEventListener(`focus`,()=>{a()}),r.addEventListener(`input`,()=>{window.clearTimeout(f),f=window.setTimeout(m,120)}),r.addEventListener(`keydown`,e=>{e.key===`Escape`&&(p(),r.blur())}),d.addEventListener(`click`,()=>{r.value=``,d.hidden=!0,p(),r.focus()}),document.addEventListener(`click`,t=>{t.target instanceof Node&&!e.contains(t.target)&&p()})}function c(){document.querySelectorAll(`[data-buscador]`).forEach(s)}document.addEventListener(`astro:page-load`,c);