(function () {
    'use strict';

    var STORAGE_KEY = 'rpc-settings';

    /** Temas válidos: escuro (dark), claro (light), terceira paleta (ocean). */
    function normalizeTheme(t) {
        if (t === 'light') return 'light';
        if (t === 'ocean' || t === 'blue-dark' || t === 'purple-dark') return 'ocean';
        return 'dark';
    }

    function applyFromObject(data) {
        var root = document.documentElement;
        root.style.removeProperty('--primary');
        root.style.removeProperty('--secondary');
        root.style.removeProperty('--accent');

        if (!data || !data.appearance) {
            root.setAttribute('data-rpc-theme', 'dark');
            return;
        }

        var theme = normalizeTheme(data.appearance.theme);
        data.appearance.theme = theme;
        root.setAttribute('data-rpc-theme', theme);
    }

    function apply() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                applyFromObject(null);
                return;
            }
            var data = JSON.parse(raw);
            if (data.appearance) {
                data.appearance.theme = normalizeTheme(data.appearance.theme);
            }
            applyFromObject(data);
        } catch (e) {
            applyFromObject(null);
        }
    }

    apply();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', apply);
    }

    window.addEventListener('storage', function (e) {
        if (e.key === STORAGE_KEY) apply();
    });

    window.rpcApplyRpcTheme = function (settingsOverride) {
        if (settingsOverride && settingsOverride.appearance) {
            settingsOverride.appearance.theme = normalizeTheme(settingsOverride.appearance.theme);
            applyFromObject(settingsOverride);
            return;
        }
        apply();
    };
})();
