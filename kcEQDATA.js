//equip type (can equip)
const MAINGUNS = 1;
const MAINGUNSAA = 51;
const MAINGUNM = 2;
const MAINGUNL = 3;
const MAINGUNXL = 4;
const SECGUN = 5;
const SECGUNAA = 55;
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
const REPAIR = 42;
const RATION = 43;
const OTHER = 99;

var EQNAMES = {}; EQNAMES[MAINGUNS]='Main Gun (S)';EQNAMES[MAINGUNSAA]='Main Gun (S)';EQNAMES[MAINGUNM]='Main Gun (M)';EQNAMES[MAINGUNL]='Main Gun (L)';EQNAMES[MAINGUNXL]='Main Gun (L+)';EQNAMES[SECGUN]='Secondary Gun';EQNAMES[SECGUNAA]='Secondary Gun';EQNAMES[AAGUN]='Anti-Air Gun';EQNAMES[AAFD]='Fire Director';EQNAMES[TORPEDO]='Torpedo';EQNAMES[TORPEDOSS]='Torpedo';EQNAMES[MIDGETSUB]='Midget Sub';EQNAMES[FIGHTER]='Fighter';EQNAMES[TORPBOMBER]='Torpedo Bomber';EQNAMES[DIVEBOMBER]='Dive Bomber';EQNAMES[SEAPLANE]='Recon Seaplane';EQNAMES[SEAPLANEBOMBER]='Seaplane Bomber';EQNAMES[CARRIERSCOUT]='Scout Plane';EQNAMES[AUTOGYRO]='Anti-Sub Plane';EQNAMES[ASWPLANE]='Anti-Sub Plane';EQNAMES[RADARS]='Radar (S)';EQNAMES[RADARL]='Radar (L)';EQNAMES[RADARXL]='Radar (L+)';EQNAMES[SONARS]='Sonar';EQNAMES[SONARL]='Sonar';EQNAMES[DEPTHCHARGE]='Depth Charge';EQNAMES[ENGINE]='Engine';EQNAMES[APSHELL]='AP Shell';EQNAMES[TYPE3SHELL]='Anti-Air Shell';EQNAMES[BULGEM]='Torpedo Bulge';EQNAMES[BULGEL]='Torpedo Bulge';EQNAMES[SEARCHLIGHTS]='Night Equip';EQNAMES[SEARCHLIGHTL]='Night Equip';EQNAMES[STARSHELL]='Night Equip';EQNAMES[PICKET]='Night Equip';EQNAMES[FLYINGBOAT]='Recon Seaplane';EQNAMES[NIGHTSCOUT]='Recon Seaplane';EQNAMES[LANDINGCRAFT]='Misc';EQNAMES[WG42]='Misc';EQNAMES[SCAMP]='Misc';EQNAMES[FCF]='Misc';EQNAMES[SRF]='Misc';EQNAMES[DRUM]='Misc';EQNAMES[OTHER]='Misc';
var EQIMAGES = {}; EQIMAGES[MAINGUNS]=1;EQIMAGES[MAINGUNM]=2;EQIMAGES[MAINGUNL]=3;EQIMAGES[MAINGUNXL]=3;EQIMAGES[SECGUN]=4;EQIMAGES[AAGUN]=15;EQIMAGES[AAFD]=30;EQIMAGES[TORPEDO]=5;EQIMAGES[TORPEDOSS]=5;EQIMAGES[MIDGETSUB]=5;EQIMAGES[FIGHTER]=6;EQIMAGES[TORPBOMBER]=8;EQIMAGES[DIVEBOMBER]=7;EQIMAGES[SEAPLANE]=10;EQIMAGES[SEAPLANEBOMBER]=10;EQIMAGES[CARRIERSCOUT]=9;EQIMAGES[AUTOGYRO]=21;EQIMAGES[ASWPLANE]=22;EQIMAGES[RADARS]=11;EQIMAGES[RADARL]=11;EQIMAGES[RADARXL]=11;EQIMAGES[SONARS]=18;EQIMAGES[SONARL]=18;EQIMAGES[DEPTHCHARGE]=17;EQIMAGES[ENGINE]=19;EQIMAGES[APSHELL]=13;EQIMAGES[TYPE3SHELL]=12;EQIMAGES[BULGEM]=23;EQIMAGES[BULGEL]=23;EQIMAGES[SEARCHLIGHTS]=24;EQIMAGES[SEARCHLIGHTL]=24;EQIMAGES[STARSHELL]=27;EQIMAGES[PICKET]=32;EQIMAGES[FLYINGBOAT]=33;EQIMAGES[NIGHTSCOUT]=10;EQIMAGES[LANDINGCRAFT]=20;EQIMAGES[WG42]=31;EQIMAGES[SCAMP]=29;EQIMAGES[FCF]=28;EQIMAGES[SRF]=26;EQIMAGES[DRUM]=25;EQIMAGES[OTHER]=14;EQIMAGES[SECGUNAA]=16;EQIMAGES[MAINGUNSAA]=16;
var IMPROVEDATA = {};
IMPROVEDATA[MAINGUNS] = {FPD:1,FPN:1,ACC:1.5};
IMPROVEDATA[MAINGUNSAA] = {FPD:1,FPN:1,ACC:1.5,AA:.7};
IMPROVEDATA[MAINGUNM] = {FPD:1,FPN:1,ACC:1.5};
IMPROVEDATA[MAINGUNL] = {FPD:1.5,FPN:1,ACC:1.5};
IMPROVEDATA[SECGUN] = {FPD:1,FPN:1,ACC:1.5};
IMPROVEDATA[APSHELL] = {FPD:1,FPN:1,ACC:1.5};
IMPROVEDATA[TORPEDO] = {TPD:1.2,TPN:1,ACC:1.5};
IMPROVEDATA[AAGUN] = {FPD:1,TPD:1.2,AA:4.2};
IMPROVEDATA[SONARS] = {FPD:.75,ASW:2/3};
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

var EQDATA = {
    0: {
        name: ''
    },
    1: {
		name: '12cm Single Cannon',
		nameJP: '12cm単装砲',
		type: MAINGUNS,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 1,
		AA: 1,
		RNG: 1
	},
	2: {
		name: '12.7cm Twin Cannon',
		nameJP: '12.7cm連装砲',
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
		nameJP: '10cm連装高角砲',
		type: MAINGUNSAA,
		btype: B_MAINGUN,
		atype: A_HAGUN,
		FP: 2,
		AA: 7,
		RNG: 1
	},
	4: {
		name: '14cm Single Cannon',
		nameJP: '14cm単装砲',
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
		nameJP: '15.5cm三連装砲',
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
		nameJP: '20.3cm連装砲',
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
		nameJP: '35.6cm連装砲',
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
		nameJP: '41cm連装砲',
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
		nameJP: '46cm三連装砲',
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
		nameJP: '12.7cm連装高角砲',
		type: SECGUNAA,
		btype: B_SECGUN,
		atype: A_HAGUN,
		FP: 2,
		AA: 4,
		RNG: 1,
		ACC: 1
	},
	11: {
		name: '15.2cm Single Cannon',
		nameJP: '15.2cm単装砲',
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
		nameJP: '15.5cm三連装副砲',
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
		nameJP: '61cm三連装魚雷',
		type: TORPEDO,
		btype: B_TORPEDO,
		improveType: 1,
		TP: 5,
		RNG: 1
	},
	14: {
		name: '61cm Quad Torpedo',
		nameJP: '61cm四連装魚雷',
		type: TORPEDO,
		btype: B_TORPEDO,
		improveType: 1,
		TP: 7,
		RNG: 1
	},
	15: {
		name: '61cm Quad (Oxygen) Torpedo',
		nameJP: '61cm四連装(酸素)魚雷',
		type: TORPEDO,
		btype: B_TORPEDO,
		improveType: 1,
		TP: 10,
		RNG: 1
	},
	16: {
		name: 'Type 97 Torpedo Bomber',
		nameJP: '九七式艦攻',
		type: TORPBOMBER,
		istorpbomber: true,
		improveType: 2,
		TP: 5,
		ASW: 4,
		LOS: 1
	},
	17: {
		name: 'Tenzan',
		nameJP: '天山',
		type: TORPBOMBER,
		istorpbomber: true,
		improveType: 2,
		TP: 7,
		ASW: 3,
		LOS: 1
	},
	18: {
		name: 'Ryuusei',
		nameJP: '流星',
		type: TORPBOMBER,
		istorpbomber: true,
		improveType: 2,
		TP: 10,
		ASW: 4,
		LOS: 1
	},
	19: {
		name: 'Type 96 Fighter',
		nameJP: '九六式艦戦',
		type: FIGHTER,
		isfighter: true,
		improveType: 2,
		AA: 2
	},
	20: {
		name: 'Type 21 Zero Fighter',
		nameJP: '零式艦戦21型',
		type: FIGHTER,
		isfighter: true,
		improveType: 2,
		AA: 5
	},
	21: {
		name: 'Type 52 Zero Fighter',
		nameJP: '零式艦戦52型',
		type: FIGHTER,
		isfighter: true,
		improveType: 2,
		AA: 6
	},
	22: {
		name: 'Reppuu',
		nameJP: '烈風',
		type: FIGHTER,
		isfighter: true,
		improveType: 2,
		AA: 10
	},
	23: {
		name: 'Type 99 Bomber',
		nameJP: '九九式艦爆',
		type: DIVEBOMBER,
		isdivebomber: true,
		improveType: 2,
		ASW: 3,
		DIVEBOMB: 5
	},
	24: {
		name: 'Suisei',
		nameJP: '彗星',
		type: DIVEBOMBER,
		isdivebomber: true,
		improveType: 2,
		ASW: 3,
		DIVEBOMB: 8
	},
	25: {
		name: 'Type 0 Recon Seaplane',
		nameJP: '零式水上偵察機',
		type: SEAPLANE,
		btype: B_RECON,
		improveType: 2,
		AA: 1,
		ASW: 2,
		LOS: 5,
		DIVEBOMB: 1,
		ACC: 1
	},
	26: {
		name: 'Zuiun',
		nameJP: '瑞雲',
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
		nameJP: '13号対空電探',
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
		nameJP: '22号対水上電探',
		type: RADARS,
		btype: B_RADAR,
		improveType: 1,
		LOS: 5,
		ACC: 3
	},
	29: {
		name: 'Type 33 Surface RADAR',
		nameJP: '33号対水上電探',
		type: RADARS,
		btype: B_RADAR,
		LOS: 7,
		ACC: 5
	},
	30: {
		name: 'Type 21 Air RADAR',
		nameJP: '21号対空電探',
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
		nameJP: '32号対水上電探',
		type: RADARL,
		btype: B_RADAR,
		improveType: 1,
		LOS: 10,
		ACC: 8
	},
	32: {
		name: 'Type 14 Air RADAR',
		nameJP: '14号対空電探',
		type: RADARL,
		btype: B_RADAR,
		atype: A_AIRRADAR,
		AA: 6,
		LOS: 5,
		ACC: 4
	},
	33: {
		name: 'Improved Steam Turbine',
		nameJP: '改良型艦本式タービン',
		type: ENGINE,
		EV: 6
	},
	34: {
		name: 'Enhanced Steam Turbine',
		nameJP: '強化型艦本式缶',
		type: ENGINE,
		EV: 10
	},
	35: {
		name: 'Type 3 Shell',
		nameJP: '三式弾',
		type: TYPE3SHELL,
		btype: B_TYPE3SHELL,
		atype: A_TYPE3SHELL,
		AA: 5
	},
	36: {
		name: 'Type 91 AP Shell',
		nameJP: '九一式徹甲弾',
		type: APSHELL,
		btype: B_APSHELL,
		improveType: 1,
		FP: 8,
		ACC: 1
	},
	37: {
		name: '7.7mm Gun',
		nameJP: '7.7mm機銃',
		type: AAGUN,
		atype: A_AAGUN,
		AA: 2,
		EV: 1
	},
	38: {
		name: '12.7mm Gun',
		nameJP: '12.7mm単装機銃',
		type: AAGUN,
		atype: A_AAGUN,
		AA: 3,
		EV: 1
	},
	39: {
		name: '25mm Dual Gun',
		nameJP: '25mm連装機銃',
		type: AAGUN,
		atype: A_AAGUN,
		improveType: 1,
		AA: 5,
		EV: 1
	},
	40: {
		name: '25mm Triple Gun',
		nameJP: '25mm三連装機銃',
		type: AAGUN,
		atype: A_AAGUN,
		improveType: 1,
		AA: 6,
		EV: 1
	},
	41: {
		name: 'Type A Ko-hyoteki',
		nameJP: '甲標的',
		type: MIDGETSUB,
		TP: 12
	},
	42: {
		name: 'Repair Team',
		nameJP: '応急修理要員',
		type: OTHER
	},
	43: {
		name: 'Repair Goddess',
		nameJP: '応急修理女神',
		type: OTHER
	},
	44: {
		name: 'Type 94 Depth Charge',
		nameJP: '九四式爆雷投射機',
		type: DEPTHCHARGE,
		btype: B_DEPTHCHARGE,
		improveType: 1,
		ASW: 5
	},
	45: {
		name: 'Type 3 Depth Charge',
		nameJP: '三式爆雷投射機',
		type: DEPTHCHARGE,
		btype: B_DEPTHCHARGE,
		improveType: 1,
		ASW: 8
	},
	46: {
		name: 'Type 93 SONAR',
		nameJP: '九三式水中聴音機',
		type: SONARS,
		btype: B_SONAR,
		improveType: 1,
		ASW: 6,
		ACC: 1
	},
	47: {
		name: 'Type 3 SONAR',
		nameJP: '三式水中探信儀',
		type: SONARS,
		btype: B_SONAR,
		improveType: 1,
		ASW: 10,
		ACC: 2
	},
	48: {
		name: '12.7 cm Single High-Angle Cannon',
		nameJP: '12.7cm単装高角砲',
		type: SECGUNAA,
		btype: B_SECGUN,
		atype: A_HAGUN,
		FP: 1,
		AA: 3,
		RNG: 1
	},
	49: {
		name: '25mm Single Gun',
		nameJP: '25mm単装機銃',
		type: AAGUN,
		atype: A_AAGUN,
		AA: 4,
		EV: 1
	},
	50: {
		name: '20.3cm(no.3) Dual Cannon',
		nameJP: '20.3cm(3号)連装砲',
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
		nameJP: '12cm30連装噴進砲',
		type: AAGUN,
		atype: A_AAGUN,
		AA: 8
	},
	52: {
		name: 'Ryuusei Kai',
		nameJP: '流星改',
		type: TORPBOMBER,
		istorpbomber: true,
		improveType: 2,
		TP: 13,
		ASW: 3,
		LOS: 2
	},
	53: {
		name: 'Reppuu Kai',
		nameJP: '烈風改',
		type: FIGHTER,
		isfighter: true,
		improveType: 2,
		AA: 12
	},
	54: {
		name: 'Saiun',
		nameJP: '彩雲',
		type: CARRIERSCOUT,
		improveType: 2,
		noRedT: true,
		LOS: 9,
		ACC: 2
	},
	55: {
		name: 'Shiden Kai 2',
		nameJP: '紫電改二',
		type: FIGHTER,
		isfighter: true,
		improveType: 2,
		AA: 9,
		EV: 3
	},
	56: {
		name: 'Shinden Kai',
		nameJP: '震電改',
		type: FIGHTER,
		isfighter: true,
		improveType: 2,
		AA: 15
	},
	57: {
		name: 'Suisei Model 12A',
		nameJP: '彗星一二型甲',
		type: DIVEBOMBER,
		isdivebomber: true,
		improveType: 2,
		ASW: 3,
		LOS: 1,
		DIVEBOMB: 10
	},
	58: {
		name: '61cm Quintuple (Oxygen) Torpedo',
		nameJP: '61cm五連装(酸素)魚雷',
		type: TORPEDO,
		btype: B_TORPEDO,
		improveType: 1,
		TP: 12,
		RNG: 1,
		ACC: 1
	},
	59: {
		name: 'Type 0 Observation Seaplane',
		nameJP: '零式水上観測機',
		type: SEAPLANE,
		btype: B_RECON,
		improveType: 2,
		AA: 2,
		ASW: 4,
		LOS: 6,
		DIVEBOMB: 1,
		ACC: 2
	},
	60: {
		name: 'Type 62 Zero Fighter-Bomber',
		nameJP: '零式艦戦62型(爆戦)',
		type: DIVEBOMBER,
		isfighter: true,
		isdivebomber: true,
		improveType: 2,
		AA: 4,
		ASW: 3,
		DIVEBOMB: 4
	},
	61: {
		name: 'Type 2 Recon Plane',
		nameJP: '二式艦上偵察機',
		type: CARRIERSCOUT,
		improveType: 2,
		AA: 1,
		LOS: 7,
		ACC: 3
	},
	62: {
		name: 'Prototype Seiran',
		nameJP: '試製晴嵐',
		type: SEAPLANEBOMBER,
		btype: B_RECON,
		isfighter: true,
		isdivebomber: true,
		improveType: 2,
		ASW: 6,
		LOS: 6,
		DIVEBOMB: 11,
		ACC: 1
	},
	63: {
		name: '12.7cm Twin Cannon B',
		nameJP: '12.7cm連装砲B型改二',
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
		nameJP: 'Ju87C改',
		type: DIVEBOMBER,
		isdivebomber: true,
		improveType: 2,
		ASW: 5,
		DIVEBOMB: 9,
		ACC: 1
	},
	65: {
		name: '15.2cm Twin Cannon',
		nameJP: '15.2cm連装砲',
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
		nameJP: '8cm高角砲',
		type: SECGUNAA,
		btype: B_SECGUN,
		atype: A_HAGUN,
		FP: 1,
		AA: 6,
		RNG: 1,
		ACC: 2
	},
	67: {
		name: '53cm Hull-mount (Oxygen) Torpedo',
		nameJP: '53cm艦首(酸素)魚雷',
		type: TORPEDO,
		btype: B_TORPEDO,
		TP: 15,
		RNG: 1,
		ACC: 2
	},
	68: {
		name: 'Daihatsu-Class Landing Craft',
		nameJP: '大発動艇',
		type: LANDINGCRAFT
	},
	69: {
		name: 'Type Ka Liaison Aircraft',
		nameJP: 'カ号観測機',
		type: AUTOGYRO,
		ASW: 9,
		ACC: 1
	},
	70: {
		name: 'Type 3 Liaison Aircraft',
		nameJP: '三式指揮連絡機(対潜)',
		type: ASWPLANE,
		ASW: 7,
		LOS: 1,
		ACC: 2
	},
	71: {
		name: '10cm Twin High-Angle Cannon(Late Model)',
		nameJP: '10cm連装高角砲(砲架)',
		type: MAINGUNSAA,
		btype: B_MAINGUN,
		atype: A_HAGUN,
		FP: 1,
		AA: 7,
		RNG: 1,
		ACC: 1
	},
	72: {
		name: 'Anti-Torpedo Bulge (M)',
		nameJP: '増設バルジ(中型艦)',
		type: BULGEM,
		AR: 7,
		EV: -2
	},
	73: {
		name: 'Anti-Torpedo Bulge (L)',
		nameJP: '増設バルジ(大型艦)',
		type: BULGEL,
		AR: 9,
		EV: -3
	},
	74: {
		name: 'Searchlight',
		nameJP: '探照灯',
		type: SEARCHLIGHTS,
		improveType: 1,
		LOS: 2
	},
	75: {
		name: 'Drum (Transport)',
		nameJP: 'ドラム缶(輸送用)',
		type: DRUM
	},
	76: {
		name: '38cm Twin Gun Mount',
		nameJP: '38cm連装砲',
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
		nameJP: '15cm連装副砲',
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
		nameJP: '12.7cm単装砲',
		type: MAINGUNS,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 2,
		RNG: 1,
		ACC: 1
	},
	79: {
		name: 'Zuiun(634)',
		nameJP: '瑞雲(六三四空)',
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
		nameJP: '瑞雲12型',
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
		nameJP: '瑞雲12型(六三四空)',
		type: SEAPLANEBOMBER,
		btype: B_RECON,
		isfighter: true,
		isdivebomber: true,
		improveType: 2,
		AA: 3,
		ASW: 6,
		LOS: 7,
		DIVEBOMB: 9,
		ACC: 1
	},
	82: {
		name: 'Type 97 Torpedo Bomber(931)',
		nameJP: '九七式艦攻(九三一空)',
		type: TORPBOMBER,
		istorpbomber: true,
		improveType: 2,
		TP: 6,
		ASW: 7,
		LOS: 2
	},
	83: {
		name: 'Tenzan(931)',
		nameJP: '天山(九三一空)',
		type: TORPBOMBER,
		istorpbomber: true,
		improveType: 2,
		TP: 9,
		ASW: 8,
		LOS: 2
	},
	84: {
		name: '2cm Flakvierling 38',
		nameJP: '2cm 四連装FlaK 38',
		type: AAGUN,
		atype: A_AAGUN,
		AA: 7,
		ACC: 1
	},
	85: {
		name: '3.7cm FlaK M42',
		nameJP: '3.7cm FlaK M42',
		type: AAGUN,
		atype: A_AAGUN,
		FP: 1,
		AA: 8,
		ACC: 1
	},
	86: {
		name: 'Ship Repair Facility',
		nameJP: '艦艇修理施設',
		type: SRF
	},
	87: {
		name: 'New High Pressure-Temperature Steam Boiler',
		nameJP: '新型高温高圧缶',
		type: ENGINE,
		EV: 13
	},
	88: {
		name: 'Type 22 Surface RADAR Kai 4',
		nameJP: '22号対水上電探改四',
		type: RADARS,
		btype: B_RADAR,
		improveType: 1,
		ASW: 2,
		LOS: 5,
		ACC: 8
	},
	89: {
		name: 'Type 21 Air RADAR Kai',
		nameJP: '21号対空電探改',
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
		nameJP: '20.3cm(2号)連装砲',
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
		nameJP: '12.7cm連装高角砲(後期型)',
		type: MAINGUNSAA,
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
		nameJP: '毘式40mm連装機銃',
		type: AAGUN,
		atype: A_AAGUN,
		AA: 6,
		EV: 1
	},
	93: {
		name: 'Type 97 Torpedo Bomber(Tomonaga)',
		nameJP: '九七式艦攻(友永隊)',
		type: TORPBOMBER,
		isfighter: true,
		istorpbomber: true,
		improveType: 2,
		TP: 11,
		AA: 1,
		ASW: 5,
		LOS: 4,
		ACC: 3
	},
	94: {
		name: 'Tenzan Model 12(Tomonaga)',
		nameJP: '天山一二型(友永隊)',
		type: TORPBOMBER,
		isfighter: true,
		istorpbomber: true,
		improveType: 2,
		TP: 14,
		AA: 1,
		ASW: 6,
		LOS: 5,
		ACC: 3
	},
	95: {
		name: '53cm Submarine Bow Torpedo Mount (8 tubes)',
		nameJP: '潜水艦53cm艦首魚雷(8門)',
		type: TORPEDOSS,
		btype: B_TORPEDO,
		TP: 16,
		RNG: 1,
		ACC: 3
	},
	96: {
		name: 'Type 21 Zero Fighter (Skilled)',
		nameJP: '零式艦戦21型(熟練)',
		type: FIGHTER,
		isfighter: true,
		AA: 8,
		LOS: 1,
		EV: 2,
		ACC: 2
	},
	97: {
		name: 'Type 99 Bomber(Skilled)',
		nameJP: '九九式艦爆(熟練)',
		type: DIVEBOMBER,
		isfighter: true,
		isdivebomber: true,
		improveType: 2,
		AA: 1,
		ASW: 4,
		LOS: 2,
		DIVEBOMB: 7,
		ACC: 2
	},
	98: {
		name: 'Type 97 Torpedo Bomber(Skilled)',
		nameJP: '九七式艦攻(熟練)',
		type: TORPBOMBER,
		istorpbomber: true,
		improveType: 2,
		TP: 8,
		ASW: 5,
		LOS: 2,
		ACC: 2
	},
	99: {
		name: 'Type 99 Bomber(Egusa)',
		nameJP: '九九式艦爆(江草隊)',
		type: DIVEBOMBER,
		isdivebomber: true,
		improveType: 2,
		ASW: 5,
		LOS: 3,
		DIVEBOMB: 10,
		ACC: 4
	},
	100: {
		name: 'Suisei(Egusa)',
		nameJP: '彗星(江草隊)',
		type: DIVEBOMBER,
		isfighter: true,
		isdivebomber: true,
		improveType: 2,
		AA: 1,
		ASW: 5,
		LOS: 4,
		DIVEBOMB: 13,
		ACC: 4
	},
	101: {
		name: 'Star Shell',
		nameJP: '照明弾',
		type: STARSHELL
	},
	102: {
		name: 'Type 98 Recon Seaplane (Night Scout)',
		nameJP: '九八式水上偵察機(夜偵)',
		type: NIGHTSCOUT,
		isnightscout: true,
		improveType: 2,
		ASW: 1,
		LOS: 3,
		ACC: 1
	},
	103: {
		name: 'Prototype 35.6cm Triple Gun Mount',
		nameJP: '試製35.6cm三連装砲',
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
		nameJP: '35.6cm連装砲(ダズル迷彩)',
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
		nameJP: '試製41cm三連装砲',
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
		nameJP: '13号対空電探改',
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
		nameJP: '艦隊司令部施設',
		type: FCF,
		AA: 1,
		LOS: 1,
		EV: 1,
		ACC: 1
	},
	108: {
		name: 'Skilled Carrier-based Aircraft Maintenance Personnel',
		nameJP: '熟練艦載機整備員',
		type: SCAMP,
		FP: 10,
		AA: 1,
		LOS: 1,
		RNG: 3,
		ACC: 1
	},
	109: {
		name: 'Zero Fighter Type 52 Type C (601 Air Group)',
		nameJP: '零戦52型丙(六〇一空)',
		type: FIGHTER,
		isfighter: true,
		improveType: 2,
		AA: 9,
		EV: 1,
		ACC: 1
	},
	110: {
		name: 'Reppuu(601)',
		nameJP: '烈風(六〇一空)',
		type: FIGHTER,
		isfighter: true,
		improveType: 2,
		AA: 11,
		EV: 2,
		ACC: 1
	},
	111: {
		name: 'Suisei (601 Air Group)',
		nameJP: '彗星(六〇一空)',
		type: DIVEBOMBER,
		isdivebomber: true,
		improveType: 2,
		ASW: 4,
		LOS: 1,
		DIVEBOMB: 11,
		ACC: 1
	},
	112: {
		name: 'Tenzan(601)',
		nameJP: '天山(六〇一空)',
		type: TORPBOMBER,
		istorpbomber: true,
		improveType: 2,
		TP: 10,
		ASW: 4,
		LOS: 2,
		ACC: 1
	},
	113: {
		name: 'Ryuusei(601)',
		nameJP: '流星(六〇一空)',
		type: TORPBOMBER,
		istorpbomber: true,
		improveType: 2,
		TP: 13,
		ASW: 5,
		LOS: 3,
		ACC: 1
	},
	114: {
		name: '38cm Twin Gun Mount Kai',
		nameJP: '38cm連装砲改',
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
		nameJP: 'Ar196改',
		type: SEAPLANE,
		btype: B_RECON,
		improveType: 2,
		AA: 1,
		ASW: 5,
		LOS: 5,
		DIVEBOMB: 1,
		ACC: 2
	},
	116: {
		name: 'Type 1 AP Shell',
		nameJP: '一式徹甲弾',
		type: APSHELL,
		btype: B_APSHELL,
		improveType: 1,
		FP: 9,
		ACC: 2
	},
	117: {
		name: 'Prototype 46cm Twin Gun Mount',
		nameJP: '試製46cm連装砲',
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
		nameJP: '紫雲',
		type: SEAPLANE,
		btype: B_RECON,
		improveType: 2,
		ASW: 2,
		LOS: 8,
		DIVEBOMB: 1,
		ACC: 1
	},
	119: {
		name: '14cm Twin Gun Mount',
		nameJP: '14cm連装砲',
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
		nameJP: '91式高射装置',
		type: AAFD,
		atype: A_AAFD,
		improveType: 1,
		AA: 2,
		EV: 1
	},
	121: {
		name: 'Type 94 Anti-Aircraft Fire Director',
		nameJP: '94式高射装置',
		type: AAFD,
		atype: A_AAFD,
		improveType: 1,
		AA: 3,
		EV: 1
	},
	122: {
		name: '10cm Twin High-Angle Cannon+FD',
		nameJP: '10cm連装高角砲+高射装置',
		type: MAINGUNSAA,
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
		nameJP: 'SKC34 20.3cm連装砲',
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
		nameJP: 'FuMO25 レーダー',
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
		nameJP: '61cm三連装(酸素)魚雷',
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
		nameJP: 'WG42 (Wurfgerät 42)',
		type: WG42,
		FP: 1,
		AR: -1,
		RNG: 1
	},
	127: {
		name: 'Prototype FaT Type 95 Oxygen Torpedo Kai',
		nameJP: '試製FaT仕様九五式酸素魚雷改',
		type: TORPEDOSS,
		btype: B_TORPEDO,
		TP: 14,
		EV: 2,
		RNG: 1,
		ACC: 7
	},
	128: {
		name: 'Prototype 51cm Twin Cannon',
		nameJP: '試製51cm連装砲',
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
		nameJP: '熟練見張員',
		type: PICKET,
		AA: 1,
		LOS: 2,
		EV: 3,
		ACC: 2,
		LUK: 20
	},
	130: {
		name: '12.7cm Twin High-angle Mount + Type 94 Anti-Aircraft Fire Director',
		nameJP: '12.7cm高角砲+高射装置',
		type: SECGUNAA,
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
		nameJP: '25mm三連装機銃 集中配備',
		type: AAGUN,
		atype: A_AAGUN,
		isconcentrated: true,
		AA: 9,
		EV: 1
	},
	132: {
		name: 'Type 0 Passive Sonar',
		nameJP: '零式水中聴音機',
		type: SONARL,
		btype: B_SONAR,
		ASW: 11,
		LOS: 1,
		EV: 1,
		ACC: 1
	},
	133: {
		name: '381mm / 50 Triple Gun Mount',
		nameJP: '381mm/50 三連装砲',
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
		nameJP: 'OTO 152mm三連装速射砲',
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
		nameJP: '90mm単装高角砲',
		type: SECGUNAA,
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
		nameJP: 'プリエーゼ式水中防御隔壁',
		type: BULGEL,
		AR: 7,
		EV: -1
	},
	137: {
		name: '381mm/50 Triple Gun Mount Kai',
		nameJP: '381mm/50 三連装砲改',
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
		nameJP: '二式大艇',
		type: FLYINGBOAT,
		btype: B_RECON,
		improveType: 2,
		ASW: 1,
		LOS: 12,
		ACC: 1
	},
	139: {
		name: '15.2cm Twin Cannon Kai',
		nameJP: '15.2cm連装砲改',
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
		nameJP: '96式150cm探照灯',
		type: SEARCHLIGHTL,
		improveType: 1,
		AA: 1,
		LOS: 3
	},
	141: {
		name: 'Type 32 Surface RADAR Kai',
		nameJP: '32号対水上電探改',
		type: RADARL,
		btype: B_RADAR,
		improveType: 1,
		LOS: 11,
		ACC: 9
	},
	142: {
		name: '15m Duplex Rangefinder + Type 21 Air Radar Kai2',
		nameJP: '15m二重測距儀+21号電探改二',
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
		nameJP: '九七式艦攻(村田隊)',
		type: TORPBOMBER,
		isfighter: true,
		istorpbomber: true,
		improveType: 2,
		TP: 12,
		AA: 1,
		ASW: 5,
		LOS: 4,
		ACC: 2
	},
	144: {
		name: 'Tenzan Model 12(Murata)',
		nameJP: '天山一二型(村田隊)',
		type: TORPBOMBER,
		isfighter: true,
		istorpbomber: true,
		improveType: 2,
		TP: 15,
		AA: 1,
		ASW: 6,
		LOS: 4,
		ACC: 2
	},
	145: {
		name: 'Combat Provisions',
		nameJP: '戦闘糧食',
		type: OTHER
	},
	146: {
		name: 'Underway Replenishment',
		nameJP: '洋上補給',
		type: OTHER,
		AR: -2
	},
	147: {
		name: '120mm Twin Gun Mount',
		nameJP: '120mm連装砲',
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
		nameJP: '試製南山',
		type: DIVEBOMBER,
		isfighter: true,
		isdivebomber: true,
		improveType: 2,
		AA: 1,
		ASW: 4,
		LOS: 2,
		DIVEBOMB: 11
	},
	149: {
		name: 'Type 4 Passive Sonar',
		nameJP: '四式水中聴音機',
		type: SONARS,
		btype: B_SONAR,
		improveType: 1,
		ASW: 12,
		ACC: 1
	},
	150: {
		name: 'Canned Saury',
		nameJP: '秋刀魚の缶詰',
		type: OTHER
	},
	151: {
		name: 'Prototype Keiun',
		nameJP: '試製景雲(艦偵型)',
		type: CARRIERSCOUT,
		FP: 2,
		ACC: 2,
		LOS: 11
	},
	152: {
		name: 'Type 52 Zero Fighter (Skilled)',
		nameJP: '零式艦戦52型(熟練)',
		type: FIGHTER,
		isfighter: true,
		improveType: 2,
		AA: 9,
		ACC: 1,
		EV: 2,
		LOS: 1
	},
	153: {
		name: 'Type 52 Model C (Iwai Squadron)',
		nameJP: '零戦52型丙(付岩井小隊)',
		type: FIGHTER,
		isfighter: true,
		improveType: 2,
		AA: 10,
		ACC: 1,
		EV: 2,
		LOS: 1
	},
	154: {
		name: 'Type 62 Zero Fighter-Bomber (Iwai Corps)',
		nameJP: '零戦62型(爆戦/岩井隊)',
		type: DIVEBOMBER,
		isfighter: true,
		isdivebomber: true,
		improveType: 2,
		DIVEBOMB: 4,
		AA: 7,
		ACC: 1,
		EV: 2,
		LOS: 1
	},
	155: {
		name: 'Type 21 Zero Fighter (Iwamoto Squadron)',
		nameJP: '零戦21型(付岩本小隊)',
		type: FIGHTER,
		isfighter: true,
		improveType: 2,
		AA: 9,
		ACC: 1,
		EV: 3,
		LOS: 1
	},
	156: {
		name: 'Type 52 Model A (Iwamoto Squadron)',
		nameJP: '零戦52型甲(付岩本小隊)',
		type: FIGHTER,
		isfighter: true,
		improveType: 2,
		AA: 11,
		ACC: 1,
		EV: 3,
		LOS: 1
	},
	157: {
		name: 'Type 53 Zero Fighter (Iwamoto Corps)',
		nameJP: '零式艦戦53型(岩本隊)',
		type: FIGHTER,
		isfighter: true,
		improveType: 2,
		AA: 12,
		ACC: 2,
		EV: 4,
		LOS: 3
	},
	158: {
		name: 'Bf 109T Kai',
		nameJP: 'Bf109T改',
		type: FIGHTER,
		isfighter: true,
		improveType: 2,
		AA: 8,
		FP: 1,
		EV: 4
	},
	159: {
		name: 'Fw 190T Kai',
		nameJP: 'Fw190T改',
		type: FIGHTER,
		isfighter: true,
		improveType: 2,
		AA: 10,
		FP: 2,
		EV: 2
	},
	160: {
		name: '10.5cm Twin Gun Mount',
		nameJP: '10.5cm連装砲',
		type: SECGUN,
		atype: A_HAGUN,
		FP: 3,
		AA: 6,
		ACC: 2,
		EV: 1,
		RNG: 1
	},
	161: {
		name: '16inch Triple Gun Mount Mk.7',
		nameJP: '16inch三連装砲 Mk.7',
		type: MAINGUNL,
		atype: A_GUN,
		FP: 24,
		AA: 3,
		AR: 1,
		ACC: 4,
		RNG: 3
	},
	162: {
		name: '203mm/53 Twin Gun Mount',
		nameJP: '203mm/53 連装砲',
		type: MAINGUNM,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 9,
		AA: 1,
		ACC: -2,
		RNG: 3
	},
	163: {
		name: 'Ro.43 Recon Seaplane',
		nameJP: 'Ro.43水偵',
		type: SEAPLANE,
		btype: B_RECON,
		FP: 1,
		AA: 1,
		ASW: 2,
		ACC: 2,
		EV: 1,
		LOS: 4
	},
	501: {
		name: '5inch Single Cannon',
		nameJP: '5inch単装砲',
		type: MAINGUNS,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 1,
		RNG: 1,
	},
	502: {
		name: '5inch Twin Cannon',
		nameJP: '5inch連装砲',
		type: MAINGUNS,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 2,
		RNG: 1,
	},
	503: {
		name: '3inch Single High-Angle Mount',
		nameJP: '3inch単装高角砲',
		type: MAINGUNSAA,
		btype: B_MAINGUN,
		atype: A_HAGUN,
		FP: 1,
		AA: 1,
		RNG: 1,
	},
	504: {
		name: '5inch Single AA Cannon',
		nameJP: '5inch単装高射砲',
		type: MAINGUNM,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 2,
		AA: 2,
		RNG: 2,
	},
	505: {
		name: '8inch Triple Cannon',
		nameJP: '8inch三連装砲',
		type: MAINGUNM,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 8,
		AA: 2,
		RNG: 2,
	},
	506: {
		name: '6inch Twin Rapid-fire Cannon',
		nameJP: '6inch連装速射砲',
		type: MAINGUNM,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 3,
		AA: 3,
		RNG: 2,
	},
	507: {
		name: '14inch Twin Cannon',
		nameJP: '14inch連装砲',
		type: MAINGUNL,
		btype: B_MAINGUN,
		FP: 10,
		AA: 4,
		RNG: 3,
	},
	508: {
		name: '16inch Twin Cannon',
		nameJP: '16inch連装砲',
		type: MAINGUNL,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 15,
		AA: 4,
		RNG: 3,
	},
	509: {
		name: '16inch Triple Cannon',
		nameJP: '16inch三連装砲',
		type: MAINGUNL,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 20,
		AA: 5,
		RNG: 3,
	},
	510: {
		name: '5inch High-Angle Mount (Secondary)',
		nameJP: '5inch単装高射砲',
		type: SECGUNAA,
		btype: B_SECGUN,
		atype: A_HAGUN,
		FP: 1,
		AA: 2,
		RNG: 1,
	},
	511: {
		name: '6inch Single Cannon',
		nameJP: '6inch単装砲',
		type: SECGUN,
		btype: B_SECGUN,
		atype: A_GUN,
		FP: 1,
		RNG: 2,
	},
	512: {
		name: '12.5inch Twin Secondary Cannon',
		nameJP: '12.5inch連装副砲',
		type: SECGUN,
		btype: B_SECGUN,
		atype: A_GUN,
		FP: 7,
		AA: 3,
		RNG: 2,
	},
	513: {
		name: '21inch Torpedo Mk.I',
		nameJP: '21inch魚雷前期型',
		type: TORPEDO,
		btype: B_TORPEDO,
		TP: 2,
		RNG: 1,
	},
	514: {
		name: '21inch Torpedo Mk.II',
		nameJP: '21inch魚雷後期型',
		type: TORPEDO,
		btype: B_TORPEDO,
		TP: 5,
		RNG: 1,
	},
	515: {
		name: 'High-speed Abyssal Torpedo',
		nameJP: '高速深海魚雷',
		type: TORPEDO,
		btype: B_TORPEDO,
		TP: 10,
		RNG: 1,
	},
	516: {
		name: 'Abyssal Torpedo Bomber Mk.I',
		nameJP: '深海棲艦攻',
		b_image: 3,
		type: TORPBOMBER,
		istorpbomber: true,
		TP: 4,
		ASW: 2,
		LOS: 5,
	},
	517: {
		name: 'Abyssal Torpedo Bomber Mk.II',
		nameJP: '深海棲艦攻 Mark.II',
		b_image: 4,
		type: TORPBOMBER,
		istorpbomber: true,
		TP: 6,
		ASW: 4,
		LOS: 5,
	},
	518: {
		name: 'Abyssal Torpedo Bomber Mk.III',
		nameJP: '深海棲艦攻 Mark.III',
		b_image: 5,
		type: TORPBOMBER,
		isfighter: true,
		istorpbomber: true,
		TP: 11,
		AA: 4,
		ASW: 7,
		LOS: 5,
	},
	519: {
		name: 'Abyssal Fighter',
		nameJP: '深海棲艦戦',
		b_image: 3,
		type: FIGHTER,
		isfighter: true,
		AA: 2,
	},
	520: {
		name: 'Abyssal Fighter Mk.II',
		nameJP: '深海棲艦戦 Mark.II',
		b_image: 4,
		type: FIGHTER,
		isfighter: true,
		AA: 5,
	},
	521: {
		name: 'Abyssal Fighter Mk.III',
		nameJP: '深海棲艦戦 Mark.III',
		b_image: 5,
		type: FIGHTER,
		isfighter: true,
		AA: 9,
	},
	522: {
		name: 'Flying-fish Fighter',
		nameJP: '飛び魚艦戦',
		b_image: 5,
		type: FIGHTER,
		isfighter: true,
		AA: 13,
	},
	523: {
		name: 'Abyssal Dive Bomber Mk.I',
		nameJP: '深海棲艦爆',
		b_image: 3,
		type: DIVEBOMBER,
		isdivebomber: true,
		DIVEBOMB: 3,
		ASW: 1,
	},
	524: {
		name: 'Abyssal Dive Bomber Mk.II',
		nameJP: '深海棲艦爆 Mark.II',
		b_image: 4,
		type: DIVEBOMBER,
		isdivebomber: true,
		DIVEBOMB: 6,
		ASW: 2,
	},
	525: {
		name: 'Abyssal Recon Plane',
		nameJP: '深海棲艦偵察機',
		type: SEAPLANE,
		btype: B_RECON,
		AA: 1,
		ASW: 1,
		LOS: 5,
	},
	526: {
		name: 'Flying-fish Recon Plane',
		nameJP: '飛び魚偵察機',
		type: SEAPLANE,
		btype: B_RECON,
		AA: 2,
		ASW: 2,
		LOS: 10,
	},
	527: {
		name: 'Air Radar Mark.I',
		nameJP: '対空レーダ― Mark.I',
		type: RADARS,
		btype: B_RADAR,
		atype: A_AIRRADAR,
		AA: 5,
		LOS: 5,
		ACC: 5,
	},
	528: {
		name: 'Surface Radar Mark.I',
		nameJP: '水上レーダ― Mark.I',
		type: RADARS,
		btype: B_RADAR,
		LOS: 5,
		ACC: 10,
	},
	529: {
		name: 'Surface Radar Mark.II',
		nameJP: '水上レーダ― Mark.II',
		type: RADARS,
		btype: B_RADAR,
		LOS: 10,
		ACC: 15,
	},
	530: {
		name: 'Air Radar Mark.II',
		nameJP: '対空レーダ― Mark.II',
		type: RADARS,
		btype: B_RADAR,
		atype: A_AIRRADAR,
		AA: 10,
		LOS: 10,
		ACC: 5,
	},
	531: {
		name: 'Abyssal Surface Radar',
		nameJP: '深海水上レーダー',
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
		nameJP: '深海対空レーダ―',
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
		nameJP: '改良型深海タービン',
		type: ENGINE,
		EV: 10,
	},
	534: {
		name: 'Enhanced Abyssal Engine',
		nameJP: '強化型深海缶',
		type: ENGINE,
		EV: 15,
	},
	535: {
		name: 'Abyssal AA Dispersal Shell',
		nameJP: '対空散弾',
		type: TYPE3SHELL,
		AA: 10,
	},
	536: {
		name: 'Depleted AP Shell',
		nameJP: '劣化徹甲弾',
		type: APSHELL,
		btype: B_APSHELL,
		FP: 15,
		ACC: 5,
	},
	537: {
		name: '12.7mm Abyssal Gun',
		nameJP: '12.7mm機銃',
		type: AAGUN,
		atype: A_AAGUN,
		AA: 2,
	},
	538: {
		name: '20mm Abyssal Gun',
		nameJP: '20mm機銃',
		type: AAGUN,
		atype: A_AAGUN,
		AA: 4,
	},
	539: {
		name: '40mm Abyssal Twin Autocannon',
		nameJP: '40mm二連装機関砲',
		type: AAGUN,
		atype: A_AAGUN,
		AA: 8,
	},
	540: {
		name: '40mm Abyssal Quad Autocannon',
		nameJP: '40mm四連装機関砲',
		type: AAGUN,
		atype: A_AAGUN,
		AA: 12,
	},
	541: {
		name: 'Abyssal Cuttlefish Torpedo',
		nameJP: '深海烏賊魚雷',
		type: MIDGETSUB,
		TP: 18,
		ACC: 5,
	},
	542: {
		name: 'Abyssal Depth Charge',
		nameJP: '深海爆雷投射機',
		type: DEPTHCHARGE,
		btype: B_DEPTHCHARGE,
		ASW: 7,
	},
	543: {
		name: 'Abyssal Sonar',
		nameJP: '深海ソナー',
		type: SONARS,
		btype: B_SONAR,
		ASW: 9,
	},
	544: {
		name: 'Abyssal Depth Charge Mk.II',
		nameJP: '深海爆雷投射機 Mk.II',
		type: DEPTHCHARGE,
		btype: B_DEPTHCHARGE,
		ASW: 13,
	},
	545: {
		name: 'Abyssal Sonar Mk.II',
		nameJP: '深海ソナー Mk.II',
		type: SONARS,
		btype: B_SONAR,
		ASW: 16,
	},
	546: {
		name: 'Flying-fish Dive Bomber',
		nameJP: '飛び魚艦爆',
		b_image: 5,
		type: DIVEBOMBER,
		isfighter: true,
		isdivebomber: true,
		DIVEBOMB: 10,
		AA: 8,
		ASW: 7,
	},
	547: {
		name: 'Abyssal Cat Fighter',
		nameJP: '深海猫艦戦',
		b_image: 6,
		type: FIGHTER,
		isfighter: true,
		AA: 10,
		ACC: 1,
	},
	548: {
		name: 'Abyssal Hell Diver',
		nameJP: '深海地獄艦爆',
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
		nameJP: '深海復讐艦攻',
		b_image: 8,
		type: TORPBOMBER,
		isfighter: true,
		istorpbomber: true,
		TP: 13,
		AA: 4,
		ASW: 5,
		LOS: 5,
		ACC: 2,
	},
	550: {
		name: '5inch Twin Dual-Purpose Cannon',
		nameJP: '5inch連装両用莢砲',
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
		nameJP: '20inch連装砲',
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
		nameJP: '15inch要塞砲',
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
		nameJP: '4inch連装両用砲+CIC',
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
		nameJP: '深海水上攻撃機',
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
		nameJP: '深海水上攻撃機改',
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
		nameJP: '深海猫艦戦改',
		b_image: 6,
		type: FIGHTER,
		isfighter: true,
		AA: 12,
		EV: 2,
		ACC: 2,
	},
	557: {
		name: 'Abyssal Hell Diver Kai',
		nameJP: '深海地獄艦爆改',
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
		nameJP: '深海復讐艦攻改',
		b_image: 8,
		type: TORPBOMBER,
		istorpbomber: true,
		isfighter: true,
		TP: 16,
		AA: 5,
		ASW: 9,
		LOS: 6,
		ACC: 3,
	},
	559: {
		name: 'Abyssal FCS + CIC',
		nameJP: '深海FCS+CIC',
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
		nameJP: '深海探照灯',
		type: SEARCHLIGHTS,
		FP: 2,
		LOS: 2
	},
	561: {
		name: 'Abyssal Liberation Land-based Dive Bomber',
		nameJP: '深海解放陸爆',
		b_image: 9,
		type: DIVEBOMBER,
		isdivebomber: true,
		isfighter: true,
		DIVEBOMB: 11,
		AA: 3,
		ASW: 5,
		ACC: 1,
		LOS: 3
	},
	562: {
		name: 'Abyssal Liberation Land-based Dive Bomber Ace',
		nameJP: '深海解放陸爆Ace',
		b_image: 10,
		type: DIVEBOMBER,
		isdivebomber: true,
		isfighter: true,
		DIVEBOMB: 16,
		AA: 5,
		ASW: 7,
		ACC: 2,
		LOS: 4
	},
	563: {
		name: '8inch Long Range Twin Gun Mount',
		nameJP: '8inch長射程連装砲',
		type: MAINGUNM,
		btype: B_MAINGUN,
		atype: A_GUN,
		FP: 8,
		AA: 1,
		ACC: -1,
		RNG: 3
	},
	564: {
		name: 'Abyssal Reconnaissance Observation Seaplane',
		nameJP: '深海水上偵察観測機',
		type: SEAPLANE,
		btype: B_RECON,
		AA: 2,
		ASW: 2,
		ACC: 5,
		LOS: 5
	}
};