/**
 * RPC Suite — idioma global (lê general.language em localStorage rpc-settings).
 * Uso: data-i18n="chave", data-i18n-placeholder, data-i18n-title, data-i18n-aria
 * document.title: atributo data-rpc-i18n-title no <body>
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'rpc-settings';

    function normalizeLang(code) {
        if (!code) return 'pt-br';
        var c = String(code).toLowerCase();
        if (c === 'en' || c === 'en-us' || c === 'en_us') return 'en-us';
        if (c === 'es' || c === 'es-es' || c === 'es_es') return 'es-es';
        return 'pt-br';
    }

    function getLanguage() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                var d = JSON.parse(raw);
                if (d.general && d.general.language) {
                    return normalizeLang(d.general.language);
                }
            }
        } catch (e) {}
        return 'pt-br';
    }

    function htmlLangAttr(lang) {
        if (lang === 'en-us') return 'en-US';
        if (lang === 'es-es') return 'es';
        return 'pt-BR';
    }

    var STRINGS = {
        'pt-br': {},
        'en-us': {},
        'es-es': {}
    };

    var KEYS_PT = {
        'nav.section.main': 'Principal',
        'nav.section.analytics': 'Analytics',
        'nav.section.system': 'Sistema',
        'nav.dashboard': 'Dashboard',
        'nav.monitoring': 'Monitoramento',
        'nav.orders': 'Ordens de Produção',
        'nav.maintenance': 'Manutenção',
        'nav.reports': 'Relatórios',
        'nav.energy': 'Energia',
        'nav.stock': 'Estoque',
        'nav.analytics': 'Análises',
        'nav.settings': 'Configurações',
        'nav.users': 'Usuários',
        'nav.history': 'Histórico',
        'common.demo': 'DEMO',
        'common.demoEnv': 'AMBIENTE DE DEMONSTRAÇÃO',
        'common.backToSite': 'Voltar ao site',
        'common.visitor': 'visitante',
        'common.operator': 'Operador',
        'common.export': 'Exportar',
        'common.filter': 'Filtrar',
        'common.filters': 'Filtros',
        'common.refresh': 'Atualizar',
        'common.save': 'Salvar Alterações',
        'common.saved': 'Salvo!',
        'common.resetDefaults': 'Restaurar Padrões',
        'common.print': 'Imprimir',
        'common.lastUpdate': 'Última atualização:',
        'footer.suite': 'RPC Industrial Suite',
        'footer.company': 'RP Caconde',
        'title.doc.dashboard': 'RPC Industrial Suite — Dashboard',
        'title.doc.monitoring': 'RPC Industrial Suite — Monitoramento',
        'title.doc.history': 'RPC Industrial Suite — Histórico',
        'title.doc.settings': 'RPC Industrial Suite — Configurações',
        'title.doc.login': 'RPC Industrial Suite — Login',
        'title.doc.users': 'RPC Industrial Suite — Usuários',
        'title.doc.reports': 'RPC Industrial Suite — Relatórios',
        'title.doc.orders': 'RPC Industrial Suite — Ordens',
        'title.doc.maintenance': 'RPC Industrial Suite — Manutenção',
        'title.doc.inventory': 'RPC Industrial Suite — Estoque',
        'title.doc.energy': 'RPC Industrial Suite — Energia',
        'title.doc.analytics': 'RPC Industrial Suite — Análises',
        'index.alertTitle': '⚠️ AMBIENTE DE DEMONSTRAÇÃO',
        'index.alertBody': 'Todos os dados são simulados e atualizados em tempo real para fins de demonstração do RPC Industrial Suite.',
        'index.pageTitle': 'Dashboard de Produção',
        'settings.alertTitle': '⚙️ CONFIGURAÇÕES DO SISTEMA',
        'settings.alertBody': 'Configure as preferências do sistema, aparência, notificações e integrações.',
        'settings.pageTitle': 'Configurações do Sistema',
        'settings.pageSubtitle': 'Personalize o sistema conforme suas necessidades',
        'settings.nav.general': 'Geral',
        'settings.nav.appearance': 'Aparência',
        'settings.nav.notifications': 'Notificações',
        'settings.nav.integrations': 'Integrações',
        'settings.nav.security': 'Segurança',
        'settings.nav.backup': 'Backup',
        'settings.nav.api': 'API',
        'settings.nav.about': 'Sobre o Sistema',
        'settings.generalHeading': 'Configurações Gerais',
        'settings.companySettings': 'Configurações da Empresa',
        'settings.companyName': 'Nome da Empresa',
        'settings.timezone': 'Fuso Horário',
        'settings.language': 'Idioma',
        'settings.productionSettings': 'Configurações de Produção',
        'settings.unitSystem': 'Unidade de Medida Padrão',
        'settings.shiftMax': 'Tempo Máximo de Turno (horas)',
        'settings.hours': 'horas',
        'settings.dataSettings': 'Configurações de Dados',
        'settings.autoCleanHistory': 'Limpeza Automática de Histórico',
        'settings.autoCleanHint': 'Remove automaticamente dados antigos após 90 dias',
        'settings.dataRetention': 'Retenção de Dados (dias)',
        'settings.appearanceHeading': 'Aparência e Tema',
        'settings.systemTheme': 'Tema do Sistema',
        'settings.themeApplies': 'Aparência (vale para todo o sistema)',
        'settings.themeHint': 'O tema é salvo no navegador e aplicado em todas as telas da demo (Dashboard, Ordens, Usuários, etc.).',
        'settings.theme.dark': 'Escuro',
        'settings.theme.light': 'Claro',
        'settings.theme.ocean': 'Azul industrial',
        'settings.layoutUi': 'Layout da Interface',
        'settings.uiDensity': 'Densidade da Interface',
        'settings.animations': 'Animações e Transições',
        'settings.density.comfortable': 'Confortável',
        'settings.density.compact': 'Compacta',
        'settings.density.spacious': 'Espaçosa',
        'settings.notifHeading': 'Configurações de Notificações',
        'settings.notifTypes': 'Tipos de Notificação',
        'settings.machineAlerts': 'Alertas de Máquina',
        'settings.maintNotif': 'Notificações de Manutenção',
        'settings.prodAlerts': 'Alertas de Produção',
        'settings.notifMethods': 'Métodos de Notificação',
        'settings.systemNotif': 'Notificações no Sistema',
        'settings.emailNotif': 'Notificações por E-mail',
        'settings.smsNotif': 'Notificações por SMS',
        'settings.notifEmail': 'E-mail para Notificações',
        'settings.emailCardTitle': 'Configurações de Email',
        'settings.notifFreq': 'Frequência de Resumo',
        'settings.integrationsHeading': 'Integrações',
        'settings.securityHeading': 'Segurança',
        'settings.backupHeading': 'Backup e Restauração',
        'settings.apiHeading': 'API e Webhooks',
        'settings.aboutHeading': 'Sobre o Sistema',
        'login.welcome': 'Bem-vindo de volta',
        'login.subtitle': 'Faça login para acessar o sistema',
        'login.error': 'Credenciais inválidas. Tente novamente.',
        'login.demoCredsTitle': 'Credenciais para Demo',
        'login.userLabel': 'Usuário:',
        'login.passLabel': 'Senha:',
        'login.demoHint': 'Clique em "Entrar como Visitante" para login automático',
        'login.fieldUser': 'Usuário',
        'login.fieldPass': 'Senha',
        'login.phUser': 'Digite seu usuário',
        'login.phPass': 'Digite sua senha',
        'login.remember': 'Lembrar-me',
        'login.forgot': 'Esqueceu a senha?',
        'login.submit': 'Entrar',
        'login.asVisitor': 'Entrar como Visitante',
        'login.footer': '© 2024 RP Caconde. Todos os direitos reservados.',
        'mon.alertTitle': '⚠️ MONITORAMENTO EM TEMPO REAL',
        'mon.alertBody': 'Visualização em tempo real de todas as máquinas e equipamentos do parque fabril.',
        'mon.pageTitle': 'Monitoramento de Máquinas',
        'mon.machinesActive': 'Máquinas Ativas',
        'mon.export': 'Exportar',
        'mon.filter': 'Filtrar',
        'mon.refresh': 'Atualizar',
        'mon.filtersTitle': 'Filtros Ativos',
        'mon.clearFilters': 'Limpar Filtros',
        'mon.filter.all': 'Todas',
        'mon.filter.running': 'Rodando',
        'mon.filter.stopped': 'Paradas',
        'mon.filter.warning': 'Alertas',
        'mon.filter.maintenance': 'Manutenção',
        'mon.mapTitle': 'Planta do galpão',
        'mon.mapHint': 'Vista em planta · docas à esquerda',
        'mon.legend.running': 'Rodando',
        'mon.legend.warning': 'Alerta',
        'mon.legend.stopped': 'Parada',
        'mon.legend.maint': 'Manutenção',
        'mon.alarmLinkTitle': 'Histórico e alarmes',
        'hist.export': 'Exportar',
        'hist.filters': 'Filtros',
        'hist.refresh': 'Atualizar',
        'hist.tab.all': 'Todos os Eventos',
        'hist.tab.production': 'Produção',
        'hist.tab.maintenance': 'Manutenção',
        'hist.tab.alarms': 'Alarmes',
        'hist.tab.system': 'Sistema',
        'hist.alertTitle': '⚠️ REGISTRO DE HISTÓRICO',
        'hist.alertBody': 'Visualização completa de todos os eventos e atividades registradas no sistema.',
        'hist.pageTitle': 'Histórico do Sistema',
        'hist.eventLog': 'Registro completo de eventos',
        'hist.totalLabel': 'Total de registros:',
        'hist.stat.prod': 'Eventos de Produção',
        'hist.stat.maint': 'Eventos de Manutenção',
        'hist.stat.alarm': 'Alarmes Registrados',
        'hist.stat.sys': 'Eventos de Sistema',
        'hist.filterPanelTitle': 'Filtrar Histórico',
        'notify.settingsSaved': 'Configurações salvas com sucesso!',
        'notify.exported': 'Configurações exportadas com sucesso!',
        'notify.reset': 'Configurações restauradas para os padrões!',
        'notify.backupOk': 'Backup executado com sucesso!',
        'unit.metric': 'Sistema Métrico',
        'unit.imperial': 'Sistema Imperial'
    };

    var KEYS_EN = {
        'nav.section.main': 'Main',
        'nav.section.analytics': 'Analytics',
        'nav.section.system': 'System',
        'nav.dashboard': 'Dashboard',
        'nav.monitoring': 'Monitoring',
        'nav.orders': 'Production orders',
        'nav.maintenance': 'Maintenance',
        'nav.reports': 'Reports',
        'nav.energy': 'Energy',
        'nav.stock': 'Inventory',
        'nav.analytics': 'Analytics',
        'nav.settings': 'Settings',
        'nav.users': 'Users',
        'nav.history': 'History',
        'common.demo': 'DEMO',
        'common.demoEnv': 'DEMO ENVIRONMENT',
        'common.backToSite': 'Back to website',
        'common.visitor': 'guest',
        'common.operator': 'Operator',
        'common.export': 'Export',
        'common.filter': 'Filter',
        'common.filters': 'Filters',
        'common.refresh': 'Refresh',
        'common.save': 'Save changes',
        'common.saved': 'Saved!',
        'common.resetDefaults': 'Restore defaults',
        'common.print': 'Print',
        'common.lastUpdate': 'Last update:',
        'footer.suite': 'RPC Industrial Suite',
        'footer.company': 'RP Caconde',
        'title.doc.dashboard': 'RPC Industrial Suite — Dashboard',
        'title.doc.monitoring': 'RPC Industrial Suite — Monitoring',
        'title.doc.history': 'RPC Industrial Suite — History',
        'title.doc.settings': 'RPC Industrial Suite — Settings',
        'title.doc.login': 'RPC Industrial Suite — Login',
        'title.doc.users': 'RPC Industrial Suite — Users',
        'title.doc.reports': 'RPC Industrial Suite — Reports',
        'title.doc.orders': 'RPC Industrial Suite — Orders',
        'title.doc.maintenance': 'RPC Industrial Suite — Maintenance',
        'title.doc.inventory': 'RPC Industrial Suite — Inventory',
        'title.doc.energy': 'RPC Industrial Suite — Energy',
        'title.doc.analytics': 'RPC Industrial Suite — Analytics',
        'index.alertTitle': '⚠️ DEMO ENVIRONMENT',
        'index.alertBody': 'All data is simulated and updated in real time for demonstration purposes.',
        'index.pageTitle': 'Production dashboard',
        'settings.alertTitle': '⚙️ SYSTEM SETTINGS',
        'settings.alertBody': 'Configure preferences, appearance, notifications and integrations.',
        'settings.pageTitle': 'System settings',
        'settings.pageSubtitle': 'Customize the system to your needs',
        'settings.nav.general': 'General',
        'settings.nav.appearance': 'Appearance',
        'settings.nav.notifications': 'Notifications',
        'settings.nav.integrations': 'Integrations',
        'settings.nav.security': 'Security',
        'settings.nav.backup': 'Backup',
        'settings.nav.api': 'API',
        'settings.nav.about': 'About',
        'settings.generalHeading': 'General settings',
        'settings.companySettings': 'Company settings',
        'settings.companyName': 'Company name',
        'settings.timezone': 'Time zone',
        'settings.language': 'Language',
        'settings.productionSettings': 'Production settings',
        'settings.unitSystem': 'Default unit system',
        'settings.shiftMax': 'Maximum shift length (hours)',
        'settings.hours': 'hours',
        'settings.dataSettings': 'Data settings',
        'settings.autoCleanHistory': 'Automatic history cleanup',
        'settings.autoCleanHint': 'Automatically removes old data after 90 days',
        'settings.dataRetention': 'Data retention (days)',
        'settings.appearanceHeading': 'Appearance and theme',
        'settings.systemTheme': 'System theme',
        'settings.themeApplies': 'Appearance (applies to the whole system)',
        'settings.themeHint': 'The theme is saved in the browser and applied on all demo screens.',
        'settings.theme.dark': 'Dark',
        'settings.theme.light': 'Light',
        'settings.theme.ocean': 'Industrial blue',
        'settings.layoutUi': 'Interface layout',
        'settings.uiDensity': 'UI density',
        'settings.animations': 'Animations and transitions',
        'settings.density.comfortable': 'Comfortable',
        'settings.density.compact': 'Compact',
        'settings.density.spacious': 'Spacious',
        'settings.notifHeading': 'Notification settings',
        'settings.notifTypes': 'Notification types',
        'settings.machineAlerts': 'Machine alerts',
        'settings.maintNotif': 'Maintenance notifications',
        'settings.prodAlerts': 'Production alerts',
        'settings.notifMethods': 'Notification methods',
        'settings.systemNotif': 'In-app notifications',
        'settings.emailNotif': 'Email notifications',
        'settings.smsNotif': 'SMS notifications',
        'settings.notifEmail': 'Notification email',
        'settings.emailCardTitle': 'Email settings',
        'settings.notifFreq': 'Digest frequency',
        'settings.integrationsHeading': 'Integrations',
        'settings.securityHeading': 'Security',
        'settings.backupHeading': 'Backup and restore',
        'settings.apiHeading': 'API and webhooks',
        'settings.aboutHeading': 'About the system',
        'login.welcome': 'Welcome back',
        'login.subtitle': 'Sign in to access the system',
        'login.error': 'Invalid credentials. Please try again.',
        'login.demoCredsTitle': 'Demo credentials',
        'login.userLabel': 'User:',
        'login.passLabel': 'Password:',
        'login.demoHint': 'Click “Enter as guest” for automatic login',
        'login.fieldUser': 'User',
        'login.fieldPass': 'Password',
        'login.phUser': 'Enter your username',
        'login.phPass': 'Enter your password',
        'login.remember': 'Remember me',
        'login.forgot': 'Forgot password?',
        'login.submit': 'Sign in',
        'login.asVisitor': 'Enter as guest',
        'login.footer': '© 2024 RP Caconde. All rights reserved.',
        'mon.alertTitle': '⚠️ REAL-TIME MONITORING',
        'mon.alertBody': 'Real-time view of all machines and equipment.',
        'mon.pageTitle': 'Machine monitoring',
        'mon.machinesActive': 'Active machines',
        'mon.export': 'Export',
        'mon.filter': 'Filter',
        'mon.refresh': 'Refresh',
        'mon.filtersTitle': 'Active filters',
        'mon.clearFilters': 'Clear filters',
        'mon.filter.all': 'All',
        'mon.filter.running': 'Running',
        'mon.filter.stopped': 'Stopped',
        'mon.filter.warning': 'Alerts',
        'mon.filter.maintenance': 'Maintenance',
        'mon.mapTitle': 'Shop floor layout',
        'mon.mapHint': 'Floor plan · docks on the left',
        'mon.legend.running': 'Running',
        'mon.legend.warning': 'Alert',
        'mon.legend.stopped': 'Stopped',
        'mon.legend.maint': 'Maintenance',
        'mon.alarmLinkTitle': 'History and alarms',
        'hist.export': 'Export',
        'hist.filters': 'Filters',
        'hist.refresh': 'Refresh',
        'hist.tab.all': 'All events',
        'hist.tab.production': 'Production',
        'hist.tab.maintenance': 'Maintenance',
        'hist.tab.alarms': 'Alarms',
        'hist.tab.system': 'System',
        'hist.alertTitle': '⚠️ HISTORY LOG',
        'hist.alertBody': 'Full view of all events and activities recorded in the system.',
        'hist.pageTitle': 'System history',
        'hist.eventLog': 'Complete event log',
        'hist.totalLabel': 'Total records:',
        'hist.stat.prod': 'Production events',
        'hist.stat.maint': 'Maintenance events',
        'hist.stat.alarm': 'Recorded alarms',
        'hist.stat.sys': 'System events',
        'hist.filterPanelTitle': 'Filter history',
        'notify.settingsSaved': 'Settings saved successfully!',
        'notify.exported': 'Settings exported successfully!',
        'notify.reset': 'Settings restored to defaults!',
        'notify.backupOk': 'Backup completed successfully!',
        'unit.metric': 'Metric',
        'unit.imperial': 'Imperial'
    };

    var KEYS_ES = {
        'nav.section.main': 'Principal',
        'nav.section.analytics': 'Analytics',
        'nav.section.system': 'Sistema',
        'nav.dashboard': 'Dashboard',
        'nav.monitoring': 'Monitoreo',
        'nav.orders': 'Órdenes de producción',
        'nav.maintenance': 'Mantenimiento',
        'nav.reports': 'Informes',
        'nav.energy': 'Energía',
        'nav.stock': 'Inventario',
        'nav.analytics': 'Análisis',
        'nav.settings': 'Configuración',
        'nav.users': 'Usuarios',
        'nav.history': 'Historial',
        'common.demo': 'DEMO',
        'common.demoEnv': 'ENTORNO DE DEMOSTRACIÓN',
        'common.backToSite': 'Volver al sitio',
        'common.visitor': 'visitante',
        'common.operator': 'Operador',
        'common.export': 'Exportar',
        'common.filter': 'Filtrar',
        'common.filters': 'Filtros',
        'common.refresh': 'Actualizar',
        'common.save': 'Guardar cambios',
        'common.saved': '¡Guardado!',
        'common.resetDefaults': 'Restaurar valores predeterminados',
        'common.print': 'Imprimir',
        'common.lastUpdate': 'Última actualización:',
        'footer.suite': 'RPC Industrial Suite',
        'footer.company': 'RP Caconde',
        'title.doc.dashboard': 'RPC Industrial Suite — Panel',
        'title.doc.monitoring': 'RPC Industrial Suite — Monitoreo',
        'title.doc.history': 'RPC Industrial Suite — Historial',
        'title.doc.settings': 'RPC Industrial Suite — Configuración',
        'title.doc.login': 'RPC Industrial Suite — Inicio de sesión',
        'title.doc.users': 'RPC Industrial Suite — Usuarios',
        'title.doc.reports': 'RPC Industrial Suite — Informes',
        'title.doc.orders': 'RPC Industrial Suite — Órdenes',
        'title.doc.maintenance': 'RPC Industrial Suite — Mantenimiento',
        'title.doc.inventory': 'RPC Industrial Suite — Inventario',
        'title.doc.energy': 'RPC Industrial Suite — Energía',
        'title.doc.analytics': 'RPC Industrial Suite — Análisis',
        'index.alertTitle': '⚠️ ENTORNO DE DEMOSTRACIÓN',
        'index.alertBody': 'Todos los datos son simulados y se actualizan en tiempo real para fines de demostración.',
        'index.pageTitle': 'Panel de producción',
        'settings.alertTitle': '⚙️ CONFIGURACIÓN DEL SISTEMA',
        'settings.alertBody': 'Configure preferencias, apariencia, notificaciones e integraciones.',
        'settings.pageTitle': 'Configuración del sistema',
        'settings.pageSubtitle': 'Personalice el sistema según sus necesidades',
        'settings.nav.general': 'General',
        'settings.nav.appearance': 'Apariencia',
        'settings.nav.notifications': 'Notificaciones',
        'settings.nav.integrations': 'Integraciones',
        'settings.nav.security': 'Seguridad',
        'settings.nav.backup': 'Copia de seguridad',
        'settings.nav.api': 'API',
        'settings.nav.about': 'Acerca del sistema',
        'settings.generalHeading': 'Configuración general',
        'settings.companySettings': 'Datos de la empresa',
        'settings.companyName': 'Nombre de la empresa',
        'settings.timezone': 'Zona horaria',
        'settings.language': 'Idioma',
        'settings.productionSettings': 'Configuración de producción',
        'settings.unitSystem': 'Sistema de unidades predeterminado',
        'settings.shiftMax': 'Duración máxima del turno (horas)',
        'settings.hours': 'horas',
        'settings.dataSettings': 'Configuración de datos',
        'settings.autoCleanHistory': 'Limpieza automática del historial',
        'settings.autoCleanHint': 'Elimina automáticamente datos antiguos después de 90 días',
        'settings.dataRetention': 'Retención de datos (días)',
        'settings.appearanceHeading': 'Apariencia y tema',
        'settings.systemTheme': 'Tema del sistema',
        'settings.themeApplies': 'Apariencia (vale para todo el sistema)',
        'settings.themeHint': 'El tema se guarda en el navegador y se aplica en todas las pantallas de la demo.',
        'settings.theme.dark': 'Oscuro',
        'settings.theme.light': 'Claro',
        'settings.theme.ocean': 'Azul industrial',
        'settings.layoutUi': 'Diseño de la interfaz',
        'settings.uiDensity': 'Densidad de la interfaz',
        'settings.animations': 'Animaciones y transiciones',
        'settings.density.comfortable': 'Cómoda',
        'settings.density.compact': 'Compacta',
        'settings.density.spacious': 'Espaciosa',
        'settings.notifHeading': 'Configuración de notificaciones',
        'settings.notifTypes': 'Tipos de notificación',
        'settings.machineAlerts': 'Alertas de máquina',
        'settings.maintNotif': 'Notificaciones de mantenimiento',
        'settings.prodAlerts': 'Alertas de producción',
        'settings.notifMethods': 'Métodos de notificación',
        'settings.systemNotif': 'Notificaciones en el sistema',
        'settings.emailNotif': 'Notificaciones por correo',
        'settings.smsNotif': 'Notificaciones por SMS',
        'settings.notifEmail': 'Correo para notificaciones',
        'settings.emailCardTitle': 'Configuración de correo',
        'settings.notifFreq': 'Frecuencia del resumen',
        'settings.integrationsHeading': 'Integraciones',
        'settings.securityHeading': 'Seguridad',
        'settings.backupHeading': 'Copia de seguridad y restauración',
        'settings.apiHeading': 'API y webhooks',
        'settings.aboutHeading': 'Acerca del sistema',
        'login.welcome': 'Bienvenido de nuevo',
        'login.subtitle': 'Inicie sesión para acceder al sistema',
        'login.error': 'Credenciales no válidas. Inténtelo de nuevo.',
        'login.demoCredsTitle': 'Credenciales de demostración',
        'login.userLabel': 'Usuario:',
        'login.passLabel': 'Contraseña:',
        'login.demoHint': 'Pulse «Entrar como visitante» para inicio automático',
        'login.fieldUser': 'Usuario',
        'login.fieldPass': 'Contraseña',
        'login.phUser': 'Introduzca su usuario',
        'login.phPass': 'Introduzca su contraseña',
        'login.remember': 'Recordarme',
        'login.forgot': '¿Olvidó la contraseña?',
        'login.submit': 'Entrar',
        'login.asVisitor': 'Entrar como visitante',
        'login.footer': '© 2024 RP Caconde. Todos los derechos reservados.',
        'mon.alertTitle': '⚠️ MONITOREO EN TIEMPO REAL',
        'mon.alertBody': 'Vista en tiempo real de todas las máquinas y equipos.',
        'mon.pageTitle': 'Monitoreo de máquinas',
        'mon.machinesActive': 'Máquinas activas',
        'mon.export': 'Exportar',
        'mon.filter': 'Filtrar',
        'mon.refresh': 'Actualizar',
        'mon.filtersTitle': 'Filtros activos',
        'mon.clearFilters': 'Limpiar filtros',
        'mon.filter.all': 'Todas',
        'mon.filter.running': 'En marcha',
        'mon.filter.stopped': 'Paradas',
        'mon.filter.warning': 'Alertas',
        'mon.filter.maintenance': 'Mantenimiento',
        'mon.mapTitle': 'Plano de planta',
        'mon.mapHint': 'Vista en planta · muelles a la izquierda',
        'mon.legend.running': 'En marcha',
        'mon.legend.warning': 'Alerta',
        'mon.legend.stopped': 'Parada',
        'mon.legend.maint': 'Mantenimiento',
        'mon.alarmLinkTitle': 'Historial y alarmas',
        'hist.export': 'Exportar',
        'hist.filters': 'Filtros',
        'hist.refresh': 'Actualizar',
        'hist.tab.all': 'Todos los eventos',
        'hist.tab.production': 'Producción',
        'hist.tab.maintenance': 'Mantenimiento',
        'hist.tab.alarms': 'Alarmas',
        'hist.tab.system': 'Sistema',
        'hist.alertTitle': '⚠️ REGISTRO DE HISTORIAL',
        'hist.alertBody': 'Vista completa de todos los eventos y actividades registradas en el sistema.',
        'hist.pageTitle': 'Historial del sistema',
        'hist.eventLog': 'Registro completo de eventos',
        'hist.totalLabel': 'Total de registros:',
        'hist.stat.prod': 'Eventos de producción',
        'hist.stat.maint': 'Eventos de mantenimiento',
        'hist.stat.alarm': 'Alarmas registradas',
        'hist.stat.sys': 'Eventos de sistema',
        'hist.filterPanelTitle': 'Filtrar historial',
        'notify.settingsSaved': '¡Configuración guardada correctamente!',
        'notify.exported': '¡Configuración exportada correctamente!',
        'notify.reset': '¡Configuración restaurada a los valores predeterminados!',
        'notify.backupOk': '¡Copia de seguridad completada!',
        'unit.metric': 'Sistema métrico',
        'unit.imperial': 'Sistema imperial'
    };

    STRINGS['pt-br'] = KEYS_PT;
    STRINGS['en-us'] = KEYS_EN;
    STRINGS['es-es'] = KEYS_ES;

    function t(key) {
        var lang = getLanguage();
        var pack = STRINGS[lang] || STRINGS['pt-br'];
        var fallback = STRINGS['pt-br'];
        if (pack[key]) return pack[key];
        if (fallback[key]) return fallback[key];
        return key;
    }

    function apply(root) {
        root = root || document;

        var titleKey = document.body && document.body.getAttribute('data-rpc-i18n-title');
        if (titleKey) {
            document.title = t(titleKey);
        }

        root.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (!key) return;
            el.textContent = t(key);
        });

        root.querySelectorAll('[data-i18n-html]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-html');
            if (!key) return;
            el.innerHTML = t(key);
        });

        root.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-placeholder');
            if (!key) return;
            el.setAttribute('placeholder', t(key));
        });

        root.querySelectorAll('[data-i18n-title]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-title');
            if (!key) return;
            el.setAttribute('title', t(key));
        });

        root.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-aria');
            if (!key) return;
            el.setAttribute('aria-label', t(key));
        });
    }

    function run() {
        var lang = getLanguage();
        document.documentElement.setAttribute('lang', htmlLangAttr(lang));
        document.documentElement.setAttribute('data-rpc-lang', lang);
        apply(document);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }

    window.addEventListener('storage', function (e) {
        if (e.key === STORAGE_KEY) run();
    });

    window.rpcApplyRpcI18n = run;
    window.rpcT = t;
    window.rpcGetLanguage = getLanguage;
})();
