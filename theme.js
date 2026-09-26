(function () {
    'use strict';

    var KEY = 'dbulanan-theme';
    var root = document.documentElement;
    var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

    var LIGHT_META = '#0E5C52';
    var DARK_META = '#0B0B0B';

    var css = [
        'html.dark{color-scheme:dark}',
        'html.dark body{background-color:#0B0B0B}',
        'html.dark select option{background-color:#161616;color:#ECECEC}',

        'html.dark .bg-\\[\\#F5F7F6\\]{background-color:#0B0B0B}',
        'html.dark .bg-white{background-color:#161616}',
        'html.dark .bg-slate-50{background-color:#1E1E1E}',
        'html.dark .bg-slate-100{background-color:#262626}',
        'html.dark .bg-slate-200{background-color:#303030}',
        'html.dark .bg-slate-300{background-color:#404040}',
        'html.dark .bg-slate-800{background-color:#2E2E2E}',
        'html.dark .bg-slate-900\\/40{background-color:rgba(0,0,0,.62)}',
        'html.dark .bg-slate-900\\/50{background-color:rgba(0,0,0,.68)}',
        'html.dark .bg-emerald-50{background-color:rgba(16,185,129,.12)}',
        'html.dark .bg-emerald-100{background-color:rgba(16,185,129,.20)}',
        'html.dark .bg-amber-100{background-color:rgba(245,158,11,.20)}',
        'html.dark .bg-rose-50{background-color:rgba(244,63,94,.10)}',
        'html.dark .bg-rose-50\\/60{background-color:rgba(244,63,94,.08)}',
        'html.dark .bg-rose-100{background-color:rgba(244,63,94,.20)}',
        'html.dark .bg-\\[\\#12695F\\]\\/10{background-color:rgba(255,255,255,.08)}',

        'html.dark .focus\\:bg-white:focus{background-color:#222222}',
        'html.dark .hover\\:bg-slate-100:hover{background-color:#262626}',
        'html.dark .hover\\:bg-slate-200:hover{background-color:#303030}',
        'html.dark .hover\\:bg-slate-50\\/80:hover{background-color:rgba(38,38,38,.7)}',
        'html.dark .hover\\:bg-emerald-100:hover{background-color:rgba(16,185,129,.26)}',
        'html.dark .hover\\:bg-rose-100:hover{background-color:rgba(244,63,94,.26)}',
        'html.dark .hover\\:bg-\\[\\#12695F\\]\\/20:hover{background-color:rgba(255,255,255,.14)}',

        'html.dark .text-slate-800{color:#ECECEC}',
        'html.dark .text-slate-700{color:#DADADA}',
        'html.dark .text-slate-600{color:#BDBDBD}',
        'html.dark .text-slate-500{color:#A0A0A0}',
        'html.dark .text-slate-400{color:#808080}',
        'html.dark .text-slate-300{color:#626262}',
        'html.dark .text-\\[\\#0B4A43\\]{color:#F2F2F2}',
        'html.dark .text-\\[\\#0E5C52\\]{color:#D4D4D4}',
        'html.dark .text-emerald-600{color:#34D399}',
        'html.dark .text-emerald-700{color:#6EE7B7}',
        'html.dark .text-amber-600{color:#FBBF24}',
        'html.dark .text-amber-700{color:#FCD34D}',
        'html.dark .text-rose-500,html.dark .text-rose-600{color:#FB7185}',
        'html.dark .text-rose-700{color:#FDA4AF}',
        'html.dark .text-sky-600{color:#38BDF8}',
        'html.dark .hover\\:text-slate-600:hover{color:#BDBDBD}',
        'html.dark .hover\\:text-\\[\\#0E5C52\\]:hover{color:#D4D4D4}',

        'html.dark .focus\\:ring-\\[\\#12695F\\]:focus{--tw-ring-color:#737373}',
        'html.dark .focus\\:border-\\[\\#12695F\\]:focus{border-color:#737373}',
        'html.dark .border-slate-100{border-color:#262626}',
        'html.dark .border-slate-200{border-color:#303030}',
        'html.dark .border-slate-200\\/70{border-color:rgba(48,48,48,.8)}',
        'html.dark .border-slate-300{border-color:#404040}',
        'html.dark .border-emerald-200{border-color:rgba(16,185,129,.35)}',
        'html.dark .divide-slate-100>:not([hidden])~:not([hidden]){border-color:#262626}',
        'html.dark .ring-slate-900\\/5{--tw-ring-color:rgba(255,255,255,.08)}',
        'html.dark .ring-black\\/5{--tw-ring-color:rgba(255,255,255,.12)}',

        'html.dark .file\\:bg-\\[\\#12695F\\]\\/10::file-selector-button{background-color:rgba(255,255,255,.08)}',
        'html.dark .file\\:text-\\[\\#0E5C52\\]::file-selector-button{color:#D4D4D4}',
        'html.dark .hover\\:file\\:bg-\\[\\#12695F\\]\\/20:hover::file-selector-button{background-color:rgba(255,255,255,.14)}',

        'html.dark .scrollbar-thin::-webkit-scrollbar-thumb{background:#404040}',

        '.theme-icon-sun{display:none}',
        'html.dark .theme-icon-sun{display:block}',
        'html.dark .theme-icon-moon{display:none}'
    ].join('\n');

    var style = document.createElement('style');
    style.id = 'theme-css';
    style.textContent = css;
    (document.head || root).appendChild(style);

    function readSaved() {
        try {
            var v = localStorage.getItem(KEY);
            return v === 'dark' || v === 'light' ? v : null;
        } catch (e) {
            return null;
        }
    }

    function writeSaved(theme) {
        try { localStorage.setItem(KEY, theme); } catch (e) {}
    }

    function systemTheme() {
        return media && media.matches ? 'dark' : 'light';
    }

    function currentTheme() {
        return root.classList.contains('dark') ? 'dark' : 'light';
    }

    function refreshButtons() {
        var dark = currentTheme() === 'dark';
        var label = dark ? 'Ganti ke Mode Siang' : 'Ganti ke Mode Malam';
        var buttons = document.querySelectorAll('[data-theme-toggle]');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute('aria-label', label);
            buttons[i].setAttribute('title', label);
            buttons[i].setAttribute('aria-pressed', dark ? 'true' : 'false');
        }
    }

    function applyTheme(theme) {
        var dark = theme === 'dark';
        root.classList.toggle('dark', dark);
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', dark ? DARK_META : LIGHT_META);
        refreshButtons();
    }

    applyTheme(readSaved() || systemTheme());

    document.addEventListener('DOMContentLoaded', refreshButtons);

    document.addEventListener('click', function (e) {
        var btn = e.target.closest ? e.target.closest('[data-theme-toggle]') : null;
        if (!btn) return;
        var next = currentTheme() === 'dark' ? 'light' : 'dark';
        writeSaved(next);
        applyTheme(next);
    });

    if (media) {
        var onSystemChange = function () {
            if (!readSaved()) applyTheme(systemTheme());
        };
        if (media.addEventListener) media.addEventListener('change', onSystemChange);
        else if (media.addListener) media.addListener(onSystemChange);
    }

    window.addEventListener('storage', function (e) {
        if (e.key === KEY) applyTheme(readSaved() || systemTheme());
    });
})();
