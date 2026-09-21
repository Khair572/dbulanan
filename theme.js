/*
 * theme.js - Mode Siang (terang) / Mode Malam (gelap)
 * Dipakai bersama oleh index.html, admin/admin.html, dan admin/login.html.
 *
 * Cara kerja:
 *  - Pilihan disimpan di localStorage (kunci "dbulanan-theme"), jadi sama untuk
 *    halaman publik dan halaman admin.
 *  - Kalau belum pernah memilih, mengikuti pengaturan sistem/HP (prefers-color-scheme).
 *  - Tombol apa pun dengan atribut [data-theme-toggle] otomatis menjadi tombol ganti mode.
 *  - Script ini harus dipasang di <head> (sebelum konten tampil) supaya tidak ada
 *    kedipan putih saat halaman dibuka dalam mode malam.
 */
(function () {
    'use strict';

    var KEY = 'dbulanan-theme';
    var root = document.documentElement;
    var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

    var LIGHT_META = '#0E5C52';
    var DARK_META = '#0A3D38';

    /* ---------- CSS mode malam ----------
       Halaman memakai kelas utilitas Tailwind (bg-white, text-slate-500, dst),
       jadi cara paling rapi adalah menimpa kelas-kelas itu saat <html> punya
       kelas "dark". Tidak ada markup lain yang perlu diubah. */
    var css = [
        'html.dark{color-scheme:dark}',
        'html.dark body{background-color:#0B1512}',
        'html.dark select option{background-color:#14211E;color:#E6EEEB}',

        /* latar */
        'html.dark .bg-\\[\\#F5F7F6\\]{background-color:#0B1512}',
        'html.dark .bg-white{background-color:#14211E}',
        'html.dark .bg-slate-50{background-color:#1A2A26}',
        'html.dark .bg-slate-100{background-color:#213430}',
        'html.dark .bg-slate-200{background-color:#2A3D38}',
        'html.dark .bg-slate-300{background-color:#3B4F49}',
        'html.dark .bg-slate-800{background-color:#2C403B}',
        'html.dark .bg-slate-900\\/40{background-color:rgba(0,0,0,.62)}',
        'html.dark .bg-slate-900\\/50{background-color:rgba(0,0,0,.68)}',
        'html.dark .bg-emerald-50{background-color:rgba(16,185,129,.12)}',
        'html.dark .bg-emerald-100{background-color:rgba(16,185,129,.20)}',
        'html.dark .bg-amber-100{background-color:rgba(245,158,11,.20)}',
        'html.dark .bg-rose-50{background-color:rgba(244,63,94,.10)}',
        'html.dark .bg-rose-50\\/60{background-color:rgba(244,63,94,.08)}',
        'html.dark .bg-rose-100{background-color:rgba(244,63,94,.20)}',
        'html.dark .bg-\\[\\#12695F\\]\\/10{background-color:rgba(52,211,153,.13)}',

        /* latar saat fokus / hover */
        'html.dark .focus\\:bg-white:focus{background-color:#1E322D}',
        'html.dark .hover\\:bg-slate-100:hover{background-color:#213430}',
        'html.dark .hover\\:bg-slate-200:hover{background-color:#2A3D38}',
        'html.dark .hover\\:bg-slate-50\\/80:hover{background-color:rgba(33,52,48,.7)}',
        'html.dark .hover\\:bg-emerald-100:hover{background-color:rgba(16,185,129,.26)}',
        'html.dark .hover\\:bg-rose-100:hover{background-color:rgba(244,63,94,.26)}',
        'html.dark .hover\\:bg-\\[\\#12695F\\]\\/20:hover{background-color:rgba(52,211,153,.22)}',

        /* teks */
        'html.dark .text-slate-800{color:#E6EEEB}',
        'html.dark .text-slate-700{color:#D5E0DC}',
        'html.dark .text-slate-600{color:#B7C6C1}',
        'html.dark .text-slate-500{color:#93A7A1}',
        'html.dark .text-slate-400{color:#7A8F89}',
        'html.dark .text-slate-300{color:#5F736D}',
        'html.dark .text-\\[\\#0B4A43\\]{color:#86D9CA}',
        'html.dark .text-\\[\\#0E5C52\\]{color:#5EC9B6}',
        'html.dark .text-emerald-600{color:#34D399}',
        'html.dark .text-emerald-700{color:#6EE7B7}',
        'html.dark .text-amber-600{color:#FBBF24}',
        'html.dark .text-amber-700{color:#FCD34D}',
        'html.dark .text-rose-500,html.dark .text-rose-600{color:#FB7185}',
        'html.dark .text-rose-700{color:#FDA4AF}',
        'html.dark .text-sky-600{color:#38BDF8}',
        'html.dark .hover\\:text-slate-600:hover{color:#B7C6C1}',
        'html.dark .hover\\:text-\\[\\#0E5C52\\]:hover{color:#5EC9B6}',

        /* garis / border / ring */
        'html.dark .border-slate-100{border-color:#22352F}',
        'html.dark .border-slate-200{border-color:#2B3F39}',
        'html.dark .border-slate-200\\/70{border-color:rgba(43,63,57,.8)}',
        'html.dark .border-slate-300{border-color:#3B4F49}',
        'html.dark .border-emerald-200{border-color:rgba(16,185,129,.35)}',
        'html.dark .divide-slate-100>:not([hidden])~:not([hidden]){border-color:#22352F}',
        'html.dark .ring-slate-900\\/5{--tw-ring-color:rgba(255,255,255,.08)}',
        'html.dark .ring-black\\/5{--tw-ring-color:rgba(255,255,255,.12)}',

        /* tombol pilih file (import) */
        'html.dark .file\\:bg-\\[\\#12695F\\]\\/10::file-selector-button{background-color:rgba(52,211,153,.14)}',
        'html.dark .file\\:text-\\[\\#0E5C52\\]::file-selector-button{color:#5EC9B6}',
        'html.dark .hover\\:file\\:bg-\\[\\#12695F\\]\\/20:hover::file-selector-button{background-color:rgba(52,211,153,.24)}',

        /* scrollbar tabel */
        'html.dark .scrollbar-thin::-webkit-scrollbar-thumb{background:#3B4F49}',

        /* ikon tombol ganti mode: bulan di mode siang, matahari di mode malam */
        '.theme-icon-sun{display:none}',
        'html.dark .theme-icon-sun{display:block}',
        'html.dark .theme-icon-moon{display:none}'
    ].join('\n');

    var style = document.createElement('style');
    style.id = 'theme-css';
    style.textContent = css;
    (document.head || root).appendChild(style);

    /* ---------- logika tema ---------- */
    function readSaved() {
        try {
            var v = localStorage.getItem(KEY);
            return v === 'dark' || v === 'light' ? v : null;
        } catch (e) {
            return null;
        }
    }

    function writeSaved(theme) {
        try { localStorage.setItem(KEY, theme); } catch (e) { /* mode privat / storage diblokir: abaikan */ }
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

    // Terapkan secepat mungkin (sebelum <body> digambar)
    applyTheme(readSaved() || systemTheme());

    document.addEventListener('DOMContentLoaded', refreshButtons);

    // Klik tombol mana pun yang punya atribut data-theme-toggle
    document.addEventListener('click', function (e) {
        var btn = e.target.closest ? e.target.closest('[data-theme-toggle]') : null;
        if (!btn) return;
        var next = currentTheme() === 'dark' ? 'light' : 'dark';
        writeSaved(next);
        applyTheme(next);
    });

    // Ikuti perubahan tema sistem, selama pengguna belum memilih sendiri
    if (media) {
        var onSystemChange = function () {
            if (!readSaved()) applyTheme(systemTheme());
        };
        if (media.addEventListener) media.addEventListener('change', onSystemChange);
        else if (media.addListener) media.addListener(onSystemChange);
    }

    // Sinkron antar tab / antar halaman (publik <-> admin)
    window.addEventListener('storage', function (e) {
        if (e.key === KEY) applyTheme(readSaved() || systemTheme());
    });
})();
