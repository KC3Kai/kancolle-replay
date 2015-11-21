//equip type (can equip)
const MAINGUNS = 1;
const MAINGUNM = 2;
const MAINGUNL = 3;
const MAINGUNXL = 4;
const SECGUN = 5;
const AAGUN = 6;
const AAFD = 7;
const TORPEDO = 8;
const TORPEDOSS = 9;
const MIDGETSUB = 10;
const FIGHTER = 11;
const TORPBOMBER = 12;
const DIVEBOMBER = 13;
const SEAPLANE = 14;
const SEAPLANEBOMBER = 15;
const CARRIERSCOUT = 16;
const AUTOGYRO = 17;
const ASWPLANE = 18;
const RADARS = 19;
const RADARL = 20;
const RADARXL = 21;
const SONARS = 22;
const SONARL = 23;
const DEPTHCHARGE = 24;
const ENGINE = 25;
const APSHELL = 26;
const TYPE3SHELL = 27;
const BULGEM = 28;
const BULGEL = 29;
const LANDINGCRAFT = 30;
const SEARCHLIGHTS = 31;
const SEARCHLIGHTL = 32;
const STARSHELL = 33;
const PICKET = 34;
const WG42 = 35;
const SRF = 36;
const FCF = 37;
const DRUM = 38;
const SCAMP = 39;
const FLYINGBOAT = 40;
const NIGHTSCOUT = 41;
const OTHER = 99;

var EQNAMES = {}; EQNAMES[MAINGUNS]='Main Gun (S)';EQNAMES[MAINGUNM]='Main Gun (M)';EQNAMES[MAINGUNL]='Main Gun (L)';EQNAMES[MAINGUNXL]='Main Gun (L+)';EQNAMES[SECGUN]='Secondary Gun';EQNAMES[AAGUN]='Anti-Air Gun';EQNAMES[AAFD]='Fire Director';EQNAMES[TORPEDO]='Torpedo';EQNAMES[TORPEDOSS]='Torpedo';EQNAMES[MIDGETSUB]='Midget Sub';EQNAMES[FIGHTER]='Fighter';EQNAMES[TORPBOMBER]='Torpedo Bomber';EQNAMES[DIVEBOMBER]='Dive Bomber';EQNAMES[SEAPLANE]='Recon Seaplane';EQNAMES[SEAPLANEBOMBER]='Seaplane Bomber';EQNAMES[CARRIERSCOUT]='Scout Plane';EQNAMES[AUTOGYRO]='Anti-Sub Plane';EQNAMES[ASWPLANE]='Anti-Sub Plane';EQNAMES[RADARS]='Radar (S)';EQNAMES[RADARL]='Radar (L)';EQNAMES[RADARXL]='Radar (L+)';EQNAMES[SONARS]='Sonar';EQNAMES[SONARL]='Sonar';EQNAMES[DEPTHCHARGE]='Depth Charge';EQNAMES[ENGINE]='Engine';EQNAMES[APSHELL]='AP Shell';EQNAMES[TYPE3SHELL]='Anti-Air Shell';EQNAMES[BULGEM]='Torpedo Bulge';EQNAMES[BULGEL]='Torpedo Bulge';EQNAMES[SEARCHLIGHTS]='Night Equip';EQNAMES[SEARCHLIGHTL]='Night Equip';EQNAMES[STARSHELL]='Night Equip';EQNAMES[PICKET]='Night Equip';EQNAMES[FLYINGBOAT]='Recon Seaplane';EQNAMES[NIGHTSCOUT]='Recon Seaplane';EQNAMES[LANDINGCRAFT]='Misc';EQNAMES[WG42]='Misc';EQNAMES[SCAMP]='Misc';EQNAMES[FCF]='Misc';EQNAMES[SRF]='Misc';EQNAMES[DRUM]='Misc';EQNAMES[OTHER]='Misc';
var IMPROVEDATA = {};
IMPROVEDATA[MAINGUNS] = {FPD:1,FPN:1,ACC:1.5};
IMPROVEDATA[MAINGUNM] = {FPD:1,FPN:1,ACC:1.5};
IMPROVEDATA[MAINGUNL] = {FPD:1.5,FPN:1,ACC:1.5};
IMPROVEDATA[SECGUN] = {FPD:1,FPN:1,ACC:1.5};
IMPROVEDATA[APSHELL] = {FPD:1,FPN:1,ACC:1.5};
IMPROVEDATA[TORPEDO] = {TPD:1.2,TPN:1,ACC:1.5};
IMPROVEDATA[AAGUN] = {FPD:1,TPD:1.2,AA:4.2};
IMPROVEDATA[SONARS] = {FPD:.75,ASW:1};
IMPROVEDATA[DEPTHCHARGE] = {FPD:.75,ASW:1};
// AAFD:{FPD:1,AA:2.8},
// SEARCHLIGHTS:{},
// SEARCHLIGHTL:{},

//artillery spot/night battle/other combat type
const B_MAINGUN = 1;
const B_SECGUN = 2;
const B_RECON = 3
const B_RADAR = 4;
const B_APSHELL = 5;
const B_SONAR = 6;
const B_DEPTHCHARGE = 7;
const B_TORPEDO = 8;
const B_TYPE3SHELL = 9;
const B_OTHER = 0;

//anti-air type
const A_HAGUN = 1;
const A_AAFD = 2;
const A_HAFD = 3;
const A_MAINGUNL = 4;
const A_TYPE3SHELL = 5;
const A_AIRRADAR = 6;
const A_AAGUN = 7;
const A_GUN = 8;

function Equip(equipid,level) {
	for(var key in EQDATA[equipid]) this[key] = EQDATA[equipid][key];
	this.mid = equipid;
	if (level) this.setImprovement(level);
}
Equip.prototype.setImprovement = function(level) {
	//if level: reset original stats
	//add stats, do I want to do it like this? maybe give separate dayFP and nightFP prop to ships
	// this.FPbonus = 1;
	// this.FPbonusNB = 1;
	// this.ACCbonus = 1;
	//set level
	if (this.improveType == 1) {
		var improve = IMPROVEDATA[this.type];
		if (!improve) return;
		for (var key in improve) {
			this[key+'bonus'] = improve[key]*Math.sqrt(level);
		}
	} else if (this.improveType == 2) {
		if (this.type == FIGHTER) this.APbonus = 25;
		else if (this.isfighter) this.APbonus = 9;
	}
	this.level = level;
}

var EQDATA = {
    0: {
        name: ''
    },
    1: {
        name: '12cm Single Cannon',
        type: MAINGUNS,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 1,
        AA: 1,
        RNG: 1
    },
    2: {
        name: '12.7cm Twin Cannon',
        type: MAINGUNS,
		btype: B_MAINGUN,
		atype: A_GUN,
		improveType: 1,
		FP: 2,
        AA: 2,
        RNG: 1
    },
    3: {
        name: '10cm Twin High-Angle Cannon',
        type: MAINGUNS,
		btype: B_MAINGUN,
		atype: A_HAGUN,
        FP: 2,
        AA: 7,
        RNG: 1
    },
    4: {
        name: '14cm Single Cannon',
        type: MAINGUNM,
		btype: B_MAINGUN,
		atype: A_GUN,
		improveType: 1,
		FP: 2,
        RNG: 2,
		ACC: 1
    },
    5: {
        name: '15.5cm Triple Cannon',
        type: MAINGUNM,
		btype: B_MAINGUN,
		atype: A_GUN,
		improveType: 1,
		FP: 7,
        AA: 4,
        RNG: 2,
		ACC: 1
    },
    6: {
        name: '20.3cm Twin Cannon',
        type: MAINGUNM,
		btype: B_MAINGUN,
		atype: A_GUN,
		improveType: 1,
		FP: 8,
        AA: 3,
        RNG: 2
    },
    7: {
        name: '35.6cm Twin Cannon',
        type: MAINGUNL,
		btype: B_MAINGUN,
		atype: A_GUN,
		improveType: 1,
		FP: 15,
        AA: 4,
        RNG: 3
    },
    8: {
        name: '41cm Twin Cannon',
        type: MAINGUNL,
		btype: B_MAINGUN,
		atype: A_GUN,
		improveType: 1,
		FP: 20,
        AA: 4,
        RNG: 3
    },
    9: {
        name: '46cm Triple Cannon',
        type: MAINGUNL,
		btype: B_MAINGUN,
		atype: A_GUN,
		improveType: 1,
		FP: 26,
        AA: 5,
        RNG: 4
    },
    10: {
        name: '12.7cm Twin High-Angle Cannon',
        type: SECGUN,
		btype: B_SECGUN,
		atype: A_HAGUN,
        FP: 2,
        AA: 4,
        RNG: 1,
		ACC: 1
    },
    11: {
        name: '15.2cm Single Cannon',
        type: SECGUN,
		btype: B_SECGUN,
        atype: A_GUN,
		improveType: 1,
		FP: 2,
        RNG: 2,
		ACC: 1
    },
    12: {
        name: '15.5cm Triple Secondary Cannon',
        type: SECGUN,
		btype: B_SECGUN,
        atype: A_GUN,
		FP: 7,
        AA: 3,
        RNG: 2,
		ACC: 2
    },
    13: {
        name: '61cm Triple Torpedo',
        type: TORPEDO,
        btype: B_TORPEDO,
		improveType: 1,
        TP: 5,
        RNG: 1
    },
    14: {
        name: '61cm Quad Torpedo',
        type: TORPEDO,
        btype: B_TORPEDO,
		improveType: 1,
        TP: 7,
        RNG: 1
    },
    15: {
        name: '61cm Quad (Oxygen) Torpedo',
        type: TORPEDO,
        btype: B_TORPEDO,
		improveType: 1,
        TP: 10,
        RNG: 1
    },
    16: {
        name: 'Type 97 Torpedo Bomber',
        type: TORPBOMBER,
		istorpbomber: true,
        TP: 5,
        ASW: 4,
        LOS: 1
    },
    17: {
        name: 'Tenzan',
        type: TORPBOMBER,
		istorpbomber: true,
        TP: 7,
        ASW: 3,
        LOS: 1
    },
    18: {
        name: 'Ryuusei',
        type: TORPBOMBER,
		istorpbomber: true,
        TP: 10,
        ASW: 4,
        LOS: 1
    },
    19: {
        name: 'Type 96 Fighter',
        type: FIGHTER,
		isfighter: true,
        AA: 2
    },
    20: {
        name: 'Type 21 Zero Fighter',
        type: FIGHTER,
		isfighter: true,
        AA: 5
    },
    21: {
        name: 'Type 52 Zero Fighter',
        type: FIGHTER,
		isfighter: true,
        AA: 6
    },
    22: {
        name: 'Reppuu',
        type: FIGHTER,
		isfighter: true,
		improveType: 2,
        AA: 10
    },
    23: {
        name: 'Type 99 Bomber',
        type: DIVEBOMBER,
		isdivebomber: true,
        ASW: 3,
        DIVEBOMB: 5
    },
    24: {
        name: 'Suisei',
        type: DIVEBOMBER,
		isdivebomber: true,
        ASW: 3,
        DIVEBOMB: 8
    },
    25: {
        name: 'Type 0 Recon Seaplane',
        type: SEAPLANE,
		btype: B_RECON,
        AA: 1,
        ASW: 2,
        LOS: 5,
        DIVEBOMB: 1,
		ACC: 1
    },
    26: {
        name: 'Zuiun',
        type: SEAPLANEBOMBER,
		btype: B_RECON,
		isfighter: true,
		isdivebomber: true,
		improveType: 2,
        AA: 2,
        ASW: 4,
        LOS: 6,
        DIVEBOMB: 4,
		ACC: 1
    },
    27: {
        name: 'Type 13 Air RADAR',
        type: RADARS,
		btype: B_RADAR,
		atype: A_AIRRADAR,
		improveType: 1,
        AA: 2,
        LOS: 3,
		ACC: 1
    },
    28: {
        name: 'Type 22 Surface RADAR',
        type: RADARS,
		btype: B_RADAR,
		improveType: 1,
        LOS: 5,
		ACC: 3
    },
    29: {
        name: 'Type 33 Surface RADAR',
        type: RADARS,
		btype: B_RADAR,
        LOS: 7,
		ACC: 5
    },
    30: {
        name: 'Type 21 Air RADAR',
        type: RADARL,
		btype: B_RADAR,
		atype: A_AIRRADAR,
		improveType: 1,
        AA: 4,
        LOS: 4,
		ACC: 2
    },
    31: {
        name: 'Type 32 Surface RADAR',
        type: RADARL,
		btype: B_RADAR,
		improveType: 1,
        LOS: 10,
		ACC: 8
    },
    32: {
        name: 'Type 14 Air RADAR',
        type: RADARL,
		btype: B_RADAR,
		atype: A_AIRRADAR,
        AA: 6,
        LOS: 5,
		ACC: 4
    },
    33: {
        name: 'Improved Steam Turbine',
        type: ENGINE,
        EV: 6
    },
    34: {
        name: 'Enhanced Steam Turbine',
        type: ENGINE,
        EV: 10
    },
    35: {
        name: 'Type 3 Shell',
        type: TYPE3SHELL,
		btype: B_TYPE3SHELL,
		atype: A_TYPE3SHELL,
        AA: 5
    },
    36: {
        name: 'Type 91 AP Shell',
        type: APSHELL,
        btype: B_APSHELL,
		improveType: 1,
        FP: 8,
		ACC: 1
    },
    37: {
        name: '7.7mm Gun',
        type: AAGUN,
		atype: A_AAGUN,
        AA: 2,
        EV: 1
    },
    38: {
        name: '12.7mm Gun',
        type: AAGUN,
		atype: A_AAGUN,
        AA: 3,
        EV: 1
    },
    39: {
        name: '25mm Dual Gun',
        type: AAGUN,
		atype: A_AAGUN,
		improveType: 1,
        AA: 5,
        EV: 1
    },
    40: {
        name: '25mm Triple Gun',
        type: AAGUN,
		atype: A_AAGUN,
		improveType: 1,
        AA: 6,
        EV: 1
    },
    41: {
        name: 'Type A Ko-hyoteki',
        type: MIDGETSUB,
        TP: 12
    },
    42: {
        name: 'Repair Team',
        type: OTHER
    },
    43: {
        name: 'Repair Goddess',
        type: OTHER
    },
    44: {
        name: 'Type 94 Depth Charge',
        type: DEPTHCHARGE,
		btype: B_DEPTHCHARGE,
		improveType: 1,
        ASW: 5
    },
    45: {
        name: 'Type 3 Depth Charge',
        type: DEPTHCHARGE,
		btype: B_DEPTHCHARGE,
		improveType: 1,
        ASW: 8
    },
    46: {
        name: 'Type 93 SONAR',
        type: SONARS,
		btype: B_SONAR,
		improveType: 1,
        ASW: 6,
		ACC: 1
    },
    47: {
        name: 'Type 3 SONAR',
        type: SONARS,
		btype: B_SONAR,
		improveType: 1,
        ASW: 10,
		ACC: 2
    },
    48: {
        name: '12.7 cm Single High-Angle Cannon',
        type: SECGUN,
		btype: B_SECGUN,
        atype: A_HAGUN,
		FP: 1,
        AA: 3,
        RNG: 1
    },
    49: {
        name: '25mm Single Gun',
        type: AAGUN,
		atype: A_AAGUN,
        AA: 4,
        EV: 1
    },
    50: {
        name: '20.3cm(no.3) Dual Cannon',
        type: MAINGUNM,
		btype: B_MAINGUN,
		atype: A_GUN,
		improveType: 1,
		FP: 10,
        AA: 4,
        RNG: 2
    },
    51: {
        name: '12cm 30-tube Rocket Launcher',
        type: AAGUN,
		atype: A_AAGUN,
        AA: 8
    },
    52: {
        name: 'Ryuusei Kai',
        type: TORPBOMBER,
		istorpbomber: true,
        TP: 13,
        ASW: 3,
        LOS: 2
    },
    53: {
        name: 'Reppuu Kai',
        type: FIGHTER,
		isfighter: true,
        AA: 12
    },
    54: {
        name: 'Saiun',
        type: CARRIERSCOUT,
		noRedT: true,
        LOS: 9,
		ACC: 2
    },
    55: {
        name: 'Shiden Kai 2',
        type: FIGHTER,
		isfighter: true,
        AA: 9
    },
    56: {
        name: 'Shinden Kai',
        type: FIGHTER,
		isfighter: true,
        AA: 15
    },
    57: {
        name: 'Suisei Model 12A',
        type: DIVEBOMBER,
		isdivebomber: true,
        ASW: 3,
        LOS: 1,
        DIVEBOMB: 10
    },
    58: {
        name: '61cm Quintuple (Oxygen) Torpedo',
        type: TORPEDO,
		btype: B_TORPEDO,
		improveType: 1,
        TP: 12,
        RNG: 1,
		ACC: 1
    },
    59: {
        name: 'Type 0 Observation Seaplane',
        type: SEAPLANE,
		btype: B_RECON,
        AA: 2,
        ASW: 4,
        LOS: 6,
        DIVEBOMB: 1,
		ACC: 2
    },
    60: {
        name: 'Type 62 Zero Fighter-Bomber',
        type: DIVEBOMBER,
		isfighter: true,
		isdivebomber: true,
        AA: 4,
        ASW: 3,
        DIVEBOMB: 4
    },
    61: {
        name: 'Type 2 Recon Plane',
        type: CARRIERSCOUT,
        AA: 1,
        LOS: 7,
		ACC: 3
    },
    62: {
        name: 'Prototype Seiran',
        type: SEAPLANEBOMBER,
		btype: B_RECON,
		isfighter: true,
		isdivebomber: true,
        ASW: 6,
        LOS: 6,
        DIVEBOMB: 11,
		ACC: 1
    },
    63: {
        name: '12.7cm Twin Cannon B',
        type: MAINGUNS,
		btype: B_MAINGUN,
		atype: A_GUN,
		improveType: 1,
		FP: 3,
        AA: 2,
        RNG: 1
    },
    64: {
        name: 'Ju 87C Kai',
        type: DIVEBOMBER,
		isdivebomber: true,
        ASW: 5,
        DIVEBOMB: 9,
		ACC: 1
    },
    65: {
        name: '15.2cm Twin Cannon',
        type: MAINGUNM,
		btype: B_MAINGUN,
		atype: A_GUN,
		improveType: 1,
		FP: 4,
        AA: 3,
        RNG: 2,
		ACC: 3
    },
    66: {
        name: '8cm High-Angle Cannon',
        type: SECGUN,
		btype: B_SECGUN,
        atype: A_GUN,
		FP: 1,
        AA: 6,
        RNG: 1,
		ACC: 2
    },
    67: {
        name: '53cm Hull-mount (Oxygen) Torpedo',
        type: TORPEDO,
		btype: B_TORPEDO,
        TP: 15,
        RNG: 1,
		ACC: 2
    },
    68: {
        name: 'Daihatsu-Class Landing Craft',
        type: LANDINGCRAFT
    },
    69: {
        name: 'Type Ka Liaison Aircraft',
        type: AUTOGYRO,
        ASW: 9,
		ACC: 1
    },
    70: {
        name: 'Type 3 Liaison Aircraft',
        type: ASWPLANE,
        ASW: 7,
        LOS: 1,
		ACC: 2
    },
    71: {
        name: '10cm Twin High-Angle Cannon(Late Model)',
        type: MAINGUNS,
		btype: B_MAINGUN,
		atype: A_HAGUN,
        FP: 1,
        AA: 7,
        RNG: 1,
		ACC: 1
    },
    72: {
        name: 'Anti-Torpedo Bulge (M)',
        type: BULGEM,
        AR: 7,
        EV: -2
    },
    73: {
        name: 'Anti-Torpedo Bulge (L)',
        type: BULGEL,
        AR: 9,
        EV: -3
    },
    74: {
        name: 'Searchlight',
        type: SEARCHLIGHTS,
		improveType: 1,
        LOS: 2
    },
    75: {
        name: 'Drum (Transport)',
        type: DRUM
    },
    76: {
        name: '38cm Twin Gun Mount',
        type: MAINGUNL,
		btype: B_MAINGUN,
		atype: A_GUN,
		improveType: 1,
		FP: 16,
        AA: 1,
        RNG: 3,
		ACC: 1
    },
    77: {
        name: '15cm Twin Gun Mount',
        type: SECGUN,
		btype: B_SECGUN,
        atype: A_GUN,
		FP: 4,
        AA: 2,
        RNG: 2,
		ACC: 2
    },
    78: {
        name: '12.7cm Naval Gun',
        type: MAINGUNS,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 2,
        RNG: 1,
		ACC: 1
    },
    79: {
        name: 'Zuiun(634)',
        type: SEAPLANEBOMBER,
		btype: B_RECON,
		isfighter: true,
		isdivebomber: true,
		improveType: 2,
        AA: 2,
        ASW: 5,
        LOS: 6,
        DIVEBOMB: 6,
		ACC: 1
    },
    80: {
        name: 'Zuiun Model 12',
        type: SEAPLANEBOMBER,
		btype: B_RECON,
		isfighter: true,
		isdivebomber: true,
		improveType: 2,
        AA: 3,
        ASW: 5,
        LOS: 6,
        DIVEBOMB: 7,
		ACC: 1
    },
    81: {
        name: 'Zuiun Model 12(634)',
        type: SEAPLANEBOMBER,
		btype: B_RECON,
		isfighter: true,
		isdivebomber: true,
        AA: 3,
        ASW: 6,
        LOS: 7,
        DIVEBOMB: 9,
		ACC: 1
    },
    82: {
        name: 'Type 97 Torpedo Bomber(931)',
        type: TORPBOMBER,
		istorpbomber: true,
        TP: 6,
        ASW: 7,
        LOS: 2
    },
    83: {
        name: 'Tenzan(931)',
        type: TORPBOMBER,
		istorpbomber: true,
        TP: 9,
        ASW: 8,
        LOS: 2
    },
    84: {
        name: '2cm Flakvierling 38',
        type: AAGUN,
		atype: A_AAGUN,
        AA: 7,
		ACC: 1
    },
    85: {
        name: '3.7cm FlaK M42',
        type: AAGUN,
		atype: A_AAGUN,
        FP: 1,
        AA: 8,
		ACC: 1
    },
    86: {
        name: 'Ship Repair Facility',
        type: SRF
    },
    87: {
        name: 'New High Pressure-Temperature Steam Boiler',
        type: ENGINE,
        EV: 13
    },
    88: {
        name: 'Type 22 Surface RADAR Kai 4',
        type: RADARS,
		btype: B_RADAR,
		improveType: 1,
        ASW: 2,
        LOS: 5,
		ACC: 8
    },
    89: {
        name: 'Type 21 Air RADAR Kai',
		type: RADARL,
		btype: B_RADAR,
		atype: A_AIRRADAR,
		improveType: 1,
        AA: 5,
        LOS: 6,
        EV: 1,
		ACC: 3
    },
    90: {
        name: '20.3cm(no.2) Twin Gun Mount',
        type: MAINGUNM,
		btype: B_MAINGUN,
		atype: A_GUN,
		improveType: 1,
		FP: 9,
        AA: 3,
        RNG: 2,
		ACC: 1
    },
    91: {
        name: '12.7cm Twin High-Angle Mount (Late Model)',
        type: MAINGUNS,
		btype: B_MAINGUN,
		atype: A_HAGUN,
        FP: 2,
        AA: 5,
        ASW: 1,
        EV: 1,
        RNG: 1,
		ACC: 1
    },
    92: {
        name: 'HI-type 40mm Twin Machine Gun',
        type: AAGUN,
		atype: A_AAGUN,
        AA: 6,
        EV: 1
    },
    93: {
        name: 'Type 97 Torpedo Bomber(Tomonaga)',
        type: TORPBOMBER,
		isfighter: true,
		istorpbomber: true,
        TP: 11,
        AA: 1,
        ASW: 5,
        LOS: 4,
		ACC: 3
    },
    94: {
        name: 'Tenzan Model 12(Tomonaga)',
        type: TORPBOMBER,
		isfighter: true,
		istorpbomber: true,
        TP: 14,
        AA: 1,
        ASW: 6,
        LOS: 5,
		ACC: 3
    },
    95: {
        name: '53cm Submarine Bow Torpedo Mount (8 tubes)',
        type: TORPEDOSS,
		btype: B_TORPEDO,
        TP: 16,
        RNG: 1,
		ACC: 3
    },
    96: {
        name: 'Type 21 Zero Fighter (Skilled)',
        type: FIGHTER,
		isfighter: true,
        AA: 8,
        LOS: 1,
        EV: 2,
		ACC: 2
    },
    97: {
        name: 'Type 99 Bomber(Skilled)',
        type: DIVEBOMBER,
		isfighter: true,
		isdivebomber: true,
        AA: 1,
        ASW: 4,
        LOS: 2,
        DIVEBOMB: 7,
		ACC: 2
    },
    98: {
        name: 'Type 97 Torpedo Bomber(Skilled)',
        type: TORPBOMBER,
		istorpbomber: true,
        TP: 8,
        ASW: 5,
        LOS: 2,
		ACC: 2
    },
    99: {
        name: 'Type 99 Bomber(Egusa)',
        type: DIVEBOMBER,
		isdivebomber: true,
        ASW: 5,
        LOS: 3,
        DIVEBOMB: 10,
		ACC: 4
    },
    100: {
        name: 'Suisei(Egusa)',
        type: DIVEBOMBER,
		isfighter: true,
		isdivebomber: true,
        AA: 1,
        ASW: 5,
        LOS: 4,
        DIVEBOMB: 13,
		ACC: 4
    },
    101: {
        name: 'Star Shell',
        type: STARSHELL
    },
    102: {
        name: 'Type 98 Recon Seaplane (Night Scout)',
        type: NIGHTSCOUT,
		isnightscout: true,
        ASW: 1,
        LOS: 3,
		ACC: 1
    },
    103: {
        name: 'Prototype 35.6cm Triple Gun Mount',
        type: MAINGUNL,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 18,
        AA: 5,
        RNG: 3,
		ACC: 2
    },
    104: {
        name: '35.6cm Twin Gun Mount (Dazzle Camouflage)',
        type: MAINGUNL,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 15,
        AA: 5,
        EV: 1,
        RNG: 3,
		ACC: 1
    },
    105: {
        name: 'Prototype 41cm Triple Cannon',
        type: MAINGUNL,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 22,
        AA: 5,
        RNG: 3,
		ACC: 2
    },
    106: {
        name: 'Type 13 Air RADAR Kai',
        type: RADARS,
		btype: B_RADAR,
		atype: A_AIRRADAR,
		improveType: 1,
        AA: 4,
        LOS: 4,
        EV: 1,
		ACC: 2
    },
    107: {
        name: 'Fleet Command Facility',
        type: FCF,
        AA: 1,
        LOS: 1,
        EV: 1,
		ACC: 1
    },
    108: {
        name: 'Skilled Carrier-based Aircraft Maintenance Personnel',
        type: SCAMP,
        FP: 10,
        AA: 1,
        LOS: 1,
        RNG: 3,
		ACC: 1
    },
    109: {
        name: 'Zero Fighter Type 52 Type C (601 Air Group)',
        type: FIGHTER,
		isfighter: true,
        AA: 9,
        EV: 1,
		ACC: 1
    },
    110: {
        name: 'Reppuu(601)',
        type: FIGHTER,
		isfighter: true,
        AA: 11,
        EV: 2,
		ACC: 1
    },
    111: {
        name: 'Suisei (601 Air Group)',
        type: DIVEBOMBER,
		isdivebomber: true,
        ASW: 4,
        LOS: 1,
        DIVEBOMB: 11,
		ACC: 1
    },
    112: {
        name: 'Tenzan(601)',
        type: TORPBOMBER,
		istorpbomber: true,
        TP: 10,
        ASW: 4,
        LOS: 2,
		ACC: 1
    },
    113: {
        name: 'Ryuusei(601)',
        type: TORPBOMBER,
		istorpbomber: true,
        TP: 13,
        ASW: 5,
        LOS: 3,
		ACC: 1
    },
    114: {
        name: '38cm Twin Gun Mount Kai',
        type: MAINGUNL,
		btype: B_MAINGUN,
		atype: A_GUN,
		improveType: 1,
		FP: 17,
        AA: 2,
        RNG: 3,
		ACC: 3
    },
    115: {
        name: 'Ar196 Kai',
        type: SEAPLANE,
		btype: B_RECON,
        AA: 1,
        ASW: 5,
        LOS: 5,
        DIVEBOMB: 1,
		ACC: 2
    },
    116: {
        name: 'Type 1 AP Shell',
        type: APSHELL,
		btype: B_APSHELL,
		improveType: 1,
        FP: 9,
		ACC: 2
    },
    117: {
        name: 'Prototype 46cm Twin Gun Mount',
        type: MAINGUNL,
		btype: B_MAINGUN,
		atype: A_GUN,
		improveType: 1,
		FP: 23,
        AA: 4,
        RNG: 4,
		ACC: 1
    },
    118: {
        name: 'Shiun',
        type: SEAPLANE,
		btype: B_RECON,
        ASW: 2,
        LOS: 8,
        DIVEBOMB: 1,
		ACC: 1
    },
    119: {
        name: '14cm Twin Gun Mount',
        type: MAINGUNM,
		btype: B_MAINGUN,
		atype: A_GUN,
		improveType: 1,
		FP: 3,
        RNG: 2,
		ACC: 2
    },
    120: {
        name: 'Type 91 Anti-Aircraft Fire Director',
        type: AAFD,
		atype: A_AAFD,
		improveType: 1,
        AA: 2,
        EV: 1
    },
    121: {
        name: 'Type 94 Anti-Aircraft Fire Director',
        type: AAFD,
		atype: A_AAFD,
		improveType: 1,
        AA: 3,
        EV: 1
    },
    122: {
        name: '10cm Twin High-Angle Cannon+FD',
        type: MAINGUNS,
		btype: B_MAINGUN,
		atype: A_HAFD,
		improveType: 1,
        FP: 3,
        AA: 10,
        EV: 1,
        RNG: 1,
		ACC: 1
    },
    123: {
        name: 'SKC34 20.3cm Twin Cannon',
        type: MAINGUNM,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 10,
        AA: 2,
        RNG: 2,
		ACC: 3
    },
    124: {
        name: 'FuMO25 Radar',
        type: RADARL,
		btype: B_RADAR,
		atype: A_AIRRADAR,
        FP: 3,
        AA: 7,
        LOS: 9,
		ACC: 10
    },
    125: {
        name: '61cm Triple (Oxygen) Torpedo Mount',
        type: TORPEDO,
		btype: B_TORPEDO,
		improveType: 1,
        TP: 8,
        AR: 1,
        EV: 1,
        RNG: 1
    },
    126: {
        name: 'WG42 (Wurfgerat 42)',
        type: WG42,
        FP: 1,
        AR: -1,
        RNG: 1
    },
    127: {
        name: 'Prototype FaT Type 95 Oxygen Torpedo Kai',
        type: TORPEDOSS,
		btype: B_TORPEDO,
        TP: 14,
        EV: 2,
        RNG: 1,
		ACC: 7
    },
    128: {
        name: 'Prototype 51cm Twin Cannon',
        type: MAINGUNXL,
		btype: B_MAINGUN,
		atype: A_GUN,
		improveType: 1,
		FP: 30,
        AA: 5,
        EV: -1,
        RNG: 4,
		ACC: 1
    },
    129: {
        name: 'Skilled Lookouts',
        type: PICKET,
        AA: 1,
        LOS: 2,
        EV: 3,
		ACC: 2,
		LUK: 20
    },
    130: {
        name: '12.7cm Twin High-angle Mount + Type 94 Anti-Aircraft Fire Director',
        type: SECGUN,
		btype: B_SECGUN,
		atype: A_HAFD,
        FP: 1,
        AA: 8,
        EV: 1,
        RNG: 1,
		ACC: 1
    },
    131: {
        name: '25mm Triple Autocannon Mount (Concentrated Deployment)',
        type: AAGUN,
		atype: A_AAGUN,
		isconcentrated: true,
        AA: 9,
        EV: 1
    },
    132: {
        name: 'Type 0 Passive Sonar',
        type: SONARL,
		btype: B_SONAR,
        ASW: 11,
        LOS: 1,
        EV: 1,
		ACC: 1
    },
    133: {
        name: '381mm / 50 Triple Gun Mount',
        type: MAINGUNL,
		btype: B_MAINGUN,
		atype: A_GUN,
		improveType: 1,
		FP: 20,
        AA: 2,
        EV: -1,
        RNG: 4,
		ACC: -3
    },
    134: {
        name: 'OTO 152mm Triple Rapid Fire Gun Mount',
        type: SECGUN,
		btype: B_SECGUN,
        atype: A_GUN,
		improveType: 1,
		FP: 8,
        AA: 2,
        AR: 1,
        RNG: 2,
		ACC: 1
    },
    135: {
        name: '90mm Single High-angle Gun Mount',
        type: SECGUN,
		btype: B_SECGUN,
		atype: A_HAFD,
		improveType: 1,
        FP: 1,
        AA: 8,
        RNG: 1,
		ACC: 1
    },
    136: {
        name: 'Pugliese Underwater Protection Bulkhead',
        type: BULGEL,
        AR: 7,
        EV: -1
    },
    137: {
        name: '381mm/50 Triple Gun Mount Kai',
        type: MAINGUNL,
		btype: B_MAINGUN,
		atype: A_GUN,
		improveType: 1,
		FP: 21,
        AA: 4,
        EV: -1,
        RNG: 4,
		ACC: -1
    },
    138: {
        name: 'Type 2 Large-sized Flying Boat',
        type: FLYINGBOAT,
		btype: B_RECON,
        ASW: 1,
        LOS: 12,
		ACC: 1
    },
    139: {
        name: '15.2cm Twin Cannon Kai',
        type: MAINGUNM,
		btype: B_MAINGUN,
		atype: A_GUN,
		improveType: 1,
		FP: 5,
        AA: 3,
        RNG: 2,
		ACC: 4
    },
    140: {
        name: 'Type 96 150cm Searchlight',
        type: SEARCHLIGHTL,
		improveType: 1,
        AA: 1,
        LOS: 3
    },
    141: {
        name: 'Type 32 Surface RADAR Kai',
        type: RADARL,
		btype: B_RADAR,
		improveType: 1,
        LOS: 11,
		ACC: 9
    },
    142: {
        name: '15m Duplex Rangefinder + Type 21 Air Radar Kai2',
        type: RADARXL,
		btype: B_RADAR,
        FP: 1,
        AA: 8,
        AR: 1,
        LOS: 7,
        EV: 1,
		ACC: 9
    },
    143: {
        name: 'Type 97 Torpedo Bomber(Murata)',
        type: TORPBOMBER,
		isfighter: true,
		istorpbomber: true,
        TP: 12,
        AA: 1,
        ASW: 5,
        LOS: 4,
		ACC: 2
    },
    144: {
        name: 'Tenzan Model 12(Murata)',
        type: TORPBOMBER,
		isfighter: true,
		istorpbomber: true,
        TP: 15,
        AA: 1,
        ASW: 6,
        LOS: 4,
		ACC: 2
    },
    145: {
        name: 'Combat Provisions',
        type: OTHER
    },
    146: {
        name: 'Underway Replenishment',
        type: OTHER,
        AR: -2
    },
    147: {
        name: '120mm Twin Gun Mount',
        type: MAINGUNS,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 3,
        AA: 2,
        RNG: 1,
		ACC: 1
    },
    148: {
        name: 'Prototype Nanzan',
        type: DIVEBOMBER,
		isfighter: true,
		isdivebomber: true,
        AA: 1,
        ASW: 4,
        LOS: 2,
        DIVEBOMB: 11
    },
    149: {
        name: 'Type 4 Passive Sonar',
        type: SONARS,
		btype: B_SONAR,
		improveType: 1,
        ASW: 12,
		ACC: 1
    },
	150: {
		name: 'Canned Saury',
		type: OTHER
	},
	151: {
		name: 'Prototype Keiun',
		type: CARRIERSCOUT,
		FP: 2,
		ACC: 2,
		LOS: 11
	},
	152: {
		name: 'Type 52 Zero Fighter (Skilled)',
		type: FIGHTER,
		isfighter: true,
		AA: 9,
		ACC: 1,
		EV: 2,
		LOS: 1
	},
	153: {
		name: 'Type 52 Model C (Iwai Squadron)',
		type: FIGHTER,
		isfighter: true,
		AA: 10,
		ACC: 1,
		EV: 2,
		LOS: 1
	},
	154: {
		name: 'Type 62 Zero Fighter-Bomber (Iwai Corps)',
		type: DIVEBOMBER,
		isfighter: true,
		isdivebomber: true,
		DIVEBOMB: 4,
		AA: 7,
		ACC: 1,
		EV: 2,
		LOS: 1
	},
	155: {
		name: 'Type 21 Zero Fighter (Iwamoto Squadron)',
		type: FIGHTER,
		isfighter: true,
		AA: 9,
		ACC: 1,
		EV: 3,
		LOS: 1
	},
	156: {
		name: 'Type 52 Model A (Iwamoto Squadron)',
		type: FIGHTER,
		isfighter: true,
		AA: 11,
		ACC: 1,
		EV: 3,
		LOS: 1
	},
	157: {
		name: 'Type 53 Zero Fighter (Iwamoto Corps)',
		type: FIGHTER,
		isfighter: true,
		AA: 12,
		ACC: 2,
		EV: 4,
		LOS: 3
	},
	158: {
		name: 'Bf 109T Kai',
		type: FIGHTER,
		isfighter: true,
		AA: 8,
		FP: 1,
		EV: 4
	},
	159: {
		name: 'Fw 190T Kai',
		type: FIGHTER,
		isfighter: true,
		AA: 10,
		FP: 2,
		EV: 2
	},
	160: {
		name: '10.5cm Twin Gun Mount',
		type: SECGUN,
		atype: A_HAGUN,
		FP: 3,
		AA: 6,
		ACC: 2,
		EV: 1,
		RNG: 1
	},
	501: {
		name: '5inch Single Cannon',
		type: MAINGUNS,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 1,
		RNG: 1,
	},
	502: {
		name: '5inch Twin Cannon',
		type: MAINGUNS,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 2,
		RNG: 1,
	},
	503: {
		name: '3inch Single High-Angle Mount',
		type: MAINGUNS,
		btype: B_MAINGUN,
		atype: A_HAGUN,
		FP: 1,
		AA: 1,
		RNG: 1,
	},
	504: {
		name: '5inch Single AA Cannon',
		type: MAINGUNM,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 2,
		AA: 2,
		RNG: 2,
	},
	505: {
		name: '8inch Triple Cannon',
		type: MAINGUNM,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 8,
		AA: 2,
		RNG: 2,
	},
	506: {
		name: '6inch Twin Rapid-fire Cannon',
		type: MAINGUNM,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 3,
		AA: 3,
		RNG: 2,
	},
	507: {
		name: '14inch Twin Cannon',
		type: MAINGUNL,
		btype: B_MAINGUN,
		FP: 10,
		AA: 4,
		RNG: 3,
	},
	508: {
		name: '16inch Twin Cannon',
		type: MAINGUNL,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 15,
		AA: 4,
		RNG: 3,
	},
	509: {
		name: '16inch Triple Cannon',
		type: MAINGUNL,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 20,
		AA: 5,
		RNG: 3,
	},
	510: {
		name: '5inch High-Angle Mount (Secondary)',
		type: SECGUN,
		btype: B_SECGUN,
		atype: A_HAGUN,
		FP: 1,
		AA: 2,
		RNG: 1,
	},
	511: {
		name: '6inch Single Cannon',
		type: SECGUN,
		btype: B_SECGUN,
		atype: A_GUN,
		FP: 1,
		RNG: 2,
	},
	512: {
		name: '12.5inch Twin Secondary Cannon',
		type: SECGUN,
		btype: B_SECGUN,
		atype: A_GUN,
		FP: 7,
		AA: 3,
		RNG: 2,
	},
	513: {
		name: '21inch Torpedo Mk.I',
		type: TORPEDO,
		btype: B_TORPEDO,
		TP: 2,
		RNG: 1,
	},
	514: {
		name: '21inch Torpedo Mk.II',
		type: TORPEDO,
		btype: B_TORPEDO,
		TP: 5,
		RNG: 1,
	},
	515: {
		name: 'High-speed Abyssal Torpedo',
		type: TORPEDO,
		btype: B_TORPEDO,
		TP: 10,
		RNG: 1,
	},
	516: {
		name: 'Abyssal Torpedo Bomber Mk.I',
		b_image: 3,
		type: TORPBOMBER,
		istorpbomber: true,
		TP: 4,
		ASW: 2,
		LOS: 5,
	},
	517: {
		name: 'Abyssal Torpedo Bomber Mk.II',
		b_image: 4,
		type: TORPBOMBER,
		istorpbomber: true,
		TP: 6,
		ASW: 4,
		LOS: 5,
	},
	518: {
		name: 'Abyssal Torpedo Bomber Mk.III',
		b_image: 5,
		type: TORPBOMBER,
		istorpbomber: true,
		TP: 11,
		AA: 4,
		ASW: 7,
		LOS: 5,
	},
	519: {
		name: 'Abyssal Fighter',
		b_image: 3,
		type: FIGHTER,
		isfighter: true,
		AA: 2,
	},
	520: {
		name: 'Abyssal Fighter Mk.II',
		b_image: 4,
		type: FIGHTER,
		isfighter: true,
		AA: 5,
	},
	521: {
		name: 'Abyssal Fighter Mk.III',
		b_image: 5,
		type: FIGHTER,
		isfighter: true,
		AA: 9,
	},
	522: {
		name: 'Flying-fish Fighter',
		b_image: 5,
		type: FIGHTER,
		isfighter: true,
		AA: 13,
	},
	523: {
		name: 'Abyssal Dive Bomber Mk.I',
		b_image: 3,
		type: DIVEBOMBER,
		isdivebomber: true,
		DIVEBOMB: 3,
		ASW: 1,
	},
	524: {
		name: 'Abyssal Dive Bomber Mk.II',
		b_image: 4,
		type: DIVEBOMBER,
		isdivebomber: true,
		DIVEBOMB: 6,
		ASW: 2,
	},
	525: {
		name: 'Abyssal Recon Plane',
		type: SEAPLANE,
		btype: B_RECON,
		AA: 1,
		ASW: 1,
		LOS: 5,
	},
	526: {
		name: 'Flying-fish Recon Plane',
		type: SEAPLANE,
		btype: B_RECON,
		AA: 2,
		ASW: 2,
		LOS: 10,
	},
	527: {
		name: 'Air Radar Mark.I',
		type: RADARS,
		btype: B_RADAR,
		atype: A_AIRRADAR,
		AA: 5,
		LOS: 5,
		ACC: 5,
	},
	528: {
		name: 'Surface Radar Mark.I',
		type: RADARS,
		btype: B_RADAR,
		LOS: 5,
		ACC: 10,
	},
	529: {
		name: 'Surface Radar Mark.II',
		type: RADARS,
		btype: B_RADAR,
		LOS: 10,
		ACC: 15,
	},
	530: {
		name: 'Air Radar Mark.II',
		type: RADARS,
		btype: B_RADAR,
		atype: A_AIRRADAR,
		AA: 10,
		LOS: 10,
		ACC: 5,
	},
	531: {
		name: 'Abyssal Surface Radar',
		type: RADARS,
		btype: B_RADAR,
		AA: 5,
		EV: 3,
		ASW: 5,
		LOS: 16,
		ACC: 24,
	},
	532: {
		name: 'Abyssal Air Radar',
		type: RADARS,
		btype: B_RADAR,
		atype: A_AIRRADAR,
		AA: 18,
		EV: 2,
		ASW: 5,
		LOS: 12,
		ACC: 16,
	},
	533: {
		name: 'Improved Abyssal Turbine',
		type: ENGINE,
		EV: 10,
	},
	534: {
		name: 'Enhanced Abyssal Engine',
		type: ENGINE,
		EV: 15,
	},
	535: {
		name: 'Abyssal AA Dispersal Shell',
		type: TYPE3SHELL,
		AA: 10,
	},
	536: {
		name: 'Depleted AP Shell',
		type: APSHELL,
		btype: B_APSHELL,
		FP: 15,
		ACC: 5,
	},
	537: {
		name: '12.7mm Abyssal Gun',
		type: AAGUN,
		atype: A_AAGUN,
		AA: 2,
	},
	538: {
		name: '20mm Abyssal Gun',
		type: AAGUN,
		atype: A_AAGUN,
		AA: 4,
	},
	539: {
		name: '40mm Abyssal Twin Autocannon',
		type: AAGUN,
		atype: A_AAGUN,
		AA: 8,
	},
	540: {
		name: '40mm Abyssal Quad Autocannon',
		type: AAGUN,
		atype: A_AAGUN,
		AA: 12,
	},
	541: {
		name: 'Abyssal Cuttlefish Torpedo',
		type: MIDGETSUB,
		TP: 18,
		ACC: 5,
	},
	542: {
		name: 'Abyssal Depth Charge',
		type: DEPTHCHARGE,
		btype: B_DEPTHCHARGE,
		ASW: 7,
	},
	543: {
		name: 'Abyssal Sonar',
		type: SONARS,
		btype: B_SONAR,
		ASW: 9,
	},
	544: {
		name: 'Abyssal Depth Charge Mk.II',
		type: DEPTHCHARGE,
		btype: B_DEPTHCHARGE,
		ASW: 13,
	},
	545: {
		name: 'Abyssal Sonar Mk.II',
		type: SONARS,
		btype: B_SONAR,
		ASW: 16,
	},
	546: {
		name: 'Flying-fish Dive Bomber',
		b_image: 5,
		type: DIVEBOMBER,
		isdivebomber: true,
		DIVEBOMB: 10,
		AA: 8,
		ASW: 7,
	},
	547: {
		name: 'Abyssal Cat Fighter',
		b_image: 6,
		type: FIGHTER,
		isfighter: true,
		AA: 10,
		ACC: 1,
	},
	548: {
		name: 'Abyssal Hell Diver',
		b_image: 7,
		type: DIVEBOMBER,
		isdivebomber: true,
		DIVEBOMB: 11,
		ASW: 4,
		LOS: 3,
		ACC: 3,
	},
	549: {
		name: 'Avenger Torpedo Bomber',
		b_image: 8,
		type: TORPBOMBER,
		istorpbomber: true,
		TP: 13,
		AA: 4,
		ASW: 5,
		LOS: 5,
		ACC: 2,
	},
	550: {
		name: '5inch Twin Dual-Purpose Cannon',
		type: MAINGUNM,
		btype: B_MAINGUN,
		atype: A_HAFD,
		FP: 2,
		AA: 9,
		RNG: 2,
		ACC: 3,
	},
	551: {
		name: '20inch Twin Cannon',
		type: MAINGUNL,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 27,
		AA: 4,
		RNG: 3,
		ACC: 3,
	},
	552: {
		name: '15inch Fortress Gun',
		type: MAINGUNL,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 13,
		AR: 3,
		RNG: 3,
		ACC: 4,
	},
	553: {
		name: '4inch Dual-Purpose+CIC',
		type: MAINGUNM,
		btype: B_MAINGUN,
		atype: A_HAFD,
		FP: 5,
		AA: 15,
		RNG: 2,
		ACC: 5,
	},
	554: {
		name: 'Abyssal Attack Seaplane',
		b_image: 7,
		type: SEAPLANEBOMBER,
		btype: B_RECON,
		isfighter: true,
		isdivebomber: true,
		DIVEBOMB: 8,
		AA: 4,
		ASW: 8,
		LOS: 6,
		ACC: 1,
	},
	555: {
		name: 'Abyssal Attack Seaplane Kai',
		b_image: 7,
		type: SEAPLANEBOMBER,
		btype: B_RECON,
		isfighter: true,
		isdivebomber: true,
		DIVEBOMB: 13,
		AA: 9,
		ASW: 10,
		LOS: 7,
		ACC: 3,
	},
	556: {
		name: 'Abyssal Cat Fighter Kai',
		b_image: 6,
		type: FIGHTER,
		isfighter: true,
		AA: 12,
		EV: 2,
		ACC: 2,
	},
	557: {
		name: 'Abyssal Hell Diver Kai',
		b_image: 7,
		type: DIVEBOMBER,
		isdivebomber: true,
		DIVEBOMB: 15,
		ASW: 8,
		LOS: 5,
		ACC: 4,
	},
	558: {
		name: 'Avenger Torpedo Bomber Kai',
		b_image: 8,
		type: TORPBOMBER,
		istorpbomber: true,
		TP: 16,
		AA: 5,
		ASW: 9,
		LOS: 6,
		ACC: 3,
	},
	559: {
		name: 'Abyssal FCS + CIC',
		type: SONARS,
		btype: B_SONAR,
		AA: 6,
		ASW: 20,
		EV: 3,
		LOS: 3,
		ACC: 5
	},
	560: {
		name: 'Abyssal Searchlight',
		type: SEARCHLIGHTS,
		FP: 2,
		LOS: 2
	}
};