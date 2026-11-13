"""Light pulses traced to the original hero artwork's 1774 × 887 coordinate space."""

def energy_overlay():
    # Trace only visible cables. The original image supplies the static wiring.
    circuits = [
        ('floor-a', 'lime', 'M1238 701 V729 Q1238 738 1250 741 L1277 749 Q1285 752 1300 749 L1741 707 Q1790 701 1773 687 L1651 642 Q1629 633 1658 628 L1779 615', 6.8, -1.3),
        ('floor-b', 'lime', 'M1264 701 V726 Q1264 733 1274 736 L1288 740 Q1294 741 1307 738 L1718 687 Q1746 683 1733 675 L1681 647 Q1665 638 1686 633 L1779 623', 6.8, -4.4),
        ('motor-a', 'copper', 'M1000 706 Q979 713 972 694 Q967 680 965 654 Q962 626 936 624', 5.4, -2.0),
        ('motor-b', 'copper', 'M998 696 Q982 701 978 680 L974 649 Q971 621 944 620', 5.4, -3.0),
        ('feed', 'copper', 'M1340 668 V192 Q1340 179 1330 176', 6.2, -3.8),
        ('upper', 'copper', 'M1139 143 Q1137 124 1115 119 L1051 112', 5.4, -1.5),
        ('supply-a', 'copper', 'M1060 289 Q1074 290 1076 305 L1078 319', 5.4, -1.0),
        ('supply-b', 'copper', 'M1172 295 Q1184 297 1186 311 L1188 325', 5.4, -2.7),
        ('return-a', 'copper', 'M1079 405 V418 Q1079 429 1070 434', 5.4, -1.8),
        ('return-b', 'copper', 'M1199 408 V422 Q1199 431 1191 436', 5.4, -3.5),
        ('terminals-a', 'copper', 'M1189 525 L1186 547 Q1185 554 1180 558', 5.4, -0.9),
        ('terminals-b', 'copper', 'M1113 636 L1110 650 Q1109 657 1103 661', 5.4, -2.8),
    ]
    definitions = ''.join(f'<path id="hero-cable-{name}" pathLength="1000" d="{path}"/>' for name, _, path, _, _ in circuits)
    pulses = ''.join(f'''<g class="energy-circuit energy-{color}" style="--energy-cycle:{duration}s;--energy-phase:{phase}s"><use href="#hero-cable-{name}" class="energy-pulse energy-bloom"/><use href="#hero-cable-{name}" class="energy-pulse energy-filament"/><use href="#hero-cable-{name}" class="energy-pulse energy-tip"/></g>''' for name, color, _, duration, phase in circuits)
    return f'''<svg class="hero-energy" viewBox="0 0 1774 887" fill="none" aria-hidden="true" focusable="false"><defs><filter id="hero-energy-bloom" x="-60%" y="-60%" width="220%" height="220%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="3"/></filter>{definitions}</defs>{pulses}</svg>'''
