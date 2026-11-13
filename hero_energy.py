"""Cable choreography and the HMI, in the artwork's 1774 × 887 coordinates."""

def hmi_display():
    # The affine projection matches the four corners of the glass inside the bezel.
    return '''<g class="hero-hmi" transform="matrix(1.025 -.15 0 1 1450 280)">
<defs><clipPath id="hero-hmi-window"><rect width="120" height="108" rx="2"/></clipPath><linearGradient id="hero-hmi-glass" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".12"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#a0d8e3" stop-opacity=".04"/></linearGradient></defs>
<g clip-path="url(#hero-hmi-window)" class="hmi-screen">
<rect width="120" height="108" fill="#061c25"/><path d="M8 19H112M8 94H112" stroke="#28434b" stroke-width=".6"/>
<text x="8" y="12" font-size="6.5">RP Connect</text><circle cx="108" cy="9" r="2" fill="#cfeb83"/>
<g class="hmi-page hmi-page-operation hero-loop" data-hmi-page="Operação">
<text x="8" y="31" font-size="7">Motor em operação</text><text x="8" y="54" class="hmi-value">1.480</text><text x="66" y="54" font-size="7">rpm</text>
<circle cx="100" cy="49" r="10" stroke="#5c7b4b" stroke-width="1.5"/><path d="M100 40V49L106 53" stroke="#cfeb83" stroke-width="1.7" stroke-linecap="round"/>
<text x="8" y="68" font-size="5.5" fill="#94aeb5">Rotação do acionamento</text><path d="M8 87H112" stroke="#26434b" stroke-width=".6"/>
<path class="hmi-trend hero-loop" d="M8 83L19 81L29 83L39 74L48 77L59 72L70 74L81 70L91 73L102 69L112 71" pathLength="100" stroke="#cfeb83" stroke-width="1.7"/>
</g>
<g class="hmi-page hmi-page-electric hero-loop" data-hmi-page="Energia">
<text x="8" y="31" font-size="7">Grandezas elétricas</text><text x="8" y="54" class="hmi-value">380</text><text x="49" y="54" font-size="8">V</text><text x="8" y="66" font-size="5.5" fill="#94aeb5">Tensão entre fases</text>
<text x="8" y="78" font-size="5.5">L1</text><text x="8" y="88" font-size="5.5">L2</text><text x="65" y="78" font-size="5.5">L3</text>
<path d="M21 76H52M21 86H51M78 76H108" stroke="#d4eb89" stroke-width="3" stroke-linecap="round"/><path d="M65 86H109" stroke="#24404b" stroke-width="3"/>
<path class="hmi-trend hero-loop" d="M66 86L72 86L76 80L81 91L86 81L91 89L96 83L101 86H109" pathLength="100" stroke="#9ad2e0" stroke-width="1.2"/>
</g>
<g class="hmi-page hmi-page-production hero-loop" data-hmi-page="Produção">
<text x="8" y="31" font-size="7">Visão da produção</text><text x="8" y="54" class="hmi-value">96,2</text><text x="58" y="54" font-size="8">%</text><text x="8" y="66" font-size="5.5" fill="#94aeb5">Disponibilidade</text>
<circle cx="98" cy="50" r="11" stroke="#28434b" stroke-width="3"/><circle cx="98" cy="50" r="11" stroke="#cfe983" stroke-width="3" stroke-dasharray="64 6" transform="rotate(-90 98 50)"/>
<path d="M8 87H112" stroke="#28434b" stroke-width=".6"/><path class="hmi-trend hero-loop" d="M8 85L20 83L32 84L44 80L56 78L68 81L80 75L92 76L103 72L112 73" pathLength="100" stroke="#cfeb83" stroke-width="1.7"/>
</g>
<text x="8" y="103" font-size="5.2" fill="#9eb7be">Automático</text><text x="112" y="103" text-anchor="end" font-size="5.2" fill="#9eb7be">DEMO</text>
<path d="M0 0H120L43 108H0Z" fill="url(#hero-hmi-glass)"/>
</g></g>'''

def energy_overlay():
    # Trace only visible cables. The original image supplies the static wiring.
    circuits = [
        ('floor-a', 'lime', 'M1238 701 V729 Q1238 738 1250 741 L1277 749 Q1285 752 1300 749 L1741 707 Q1790 701 1773 687 L1651 642 Q1629 633 1658 628 L1779 615', 6, -1.8),
        ('floor-b', 'lime', 'M1264 701 V726 Q1264 733 1274 736 L1288 740 Q1294 741 1307 738 L1718 687 Q1746 683 1733 675 L1681 647 Q1665 638 1686 633 L1779 623', 6, -1.6),
        ('motor-a', 'copper', 'M936 624 Q962 626 965 654 Q967 680 972 694 Q979 713 1000 706', 6, 0),
        ('motor-b', 'copper', 'M944 620 Q971 621 974 649 L978 680 Q982 701 998 696', 6, -5.8),
        ('feed', 'copper', 'M1340 668 V192 Q1340 179 1330 176', 6, -4.8),
        ('upper', 'copper', 'M1139 143 Q1137 124 1115 119 L1051 112', 6, -2.35),
        ('supply-a', 'copper', 'M1060 289 Q1074 290 1076 305 L1078 319', 6, -3.6),
        ('supply-b', 'copper', 'M1172 295 Q1184 297 1186 311 L1188 325', 6, -3.4),
        ('return-a', 'copper', 'M1079 405 V418 Q1079 429 1070 434', 6, -3.0),
        ('return-b', 'copper', 'M1199 408 V422 Q1199 431 1191 436', 6, -2.9),
        ('terminals-a', 'copper', 'M1180 558 Q1185 554 1186 547 L1189 525', 6, -5.0),
        ('terminals-b', 'copper', 'M1103 661 Q1109 657 1110 650 L1113 636', 6, -5.1),
    ]
    definitions = ''.join(f'<path id="hero-cable-{name}" pathLength="1000" d="{path}"/>' for name, _, path, _, _ in circuits)
    pulses = ''.join(f'''<g class="energy-circuit energy-{color} energy-route-{name}" style="--energy-cycle:{duration}s;--energy-phase:{phase}s"><use href="#hero-cable-{name}" class="energy-pulse energy-bloom hero-loop"/><use href="#hero-cable-{name}" class="energy-pulse energy-filament hero-loop"/><use href="#hero-cable-{name}" class="energy-pulse energy-tip hero-loop"/></g>''' for name, color, _, duration, phase in circuits)
    return f'''<svg class="hero-energy" viewBox="0 0 1774 887" fill="none" aria-hidden="true" focusable="false"><defs><filter id="hero-energy-bloom" x="-60%" y="-60%" width="220%" height="220%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="3.5"/></filter>{definitions}</defs>{pulses}<circle class="energy-emission hero-loop" cx="936" cy="624" r="4.5" stroke="#ffe6ae" stroke-width="1.5"/>{hmi_display()}</svg>'''
