var COMMON = {
	_const: {
		CTF: 1,
		STF: 2,
		TCF: 3,
		SF: 7,
		
		NODE_NORMAL: 1,
		NODE_NIGHT: 2,
		NODE_AIR: 4,
		NODE_RAID: 6,
		
		formationSingleDefault: 1,
		formationCombinedDefault: 14,
		
		simSaveKey: 'kancolle_sortie_simulator',
	},
	global: {},
	
	shipTypeHullToId: { 'DE':1, 'DD':2, 'CL':3, 'CLT':4, 'CA':5, 'CAV':6, 'CVL':7, 'FBB':8, 'BB':9, 'BBV':10, 'CV':11, 'SS':13, 'SSV':14, 'AT':15, 'AV':16, 'LHA':17, 'CVB':18, 'AR':19, 'AS':20, 'CT':21, 'AO':22 },
	
	BARRAGE_BALLOON_NODES: ['3-5-H','4-3-N','4-5-T','57-5-L1','57-5-L2','57-5-O','57-6-C2','57-6-Q','57-7-A5','57-7-H','57-7-P','57-7-U','57-7-Z','59-1-I','59-1-M','59-2-M','59-2-U','59-3-V1','59-3-X','60-1-O','60-2-W','60-3-R','60-3-U','60-5-Q','60-5-Z'],
	ATOLL_NODES: ['58-2-Y','58-3-Z','58-4-S'],
	
	ID_GEN: {
		_ids: {},
		nextId: function(key) {
			return ++this._ids[key] || (this._ids[key] = 1);
		},
		setInit: function(key,val) {
			this._ids[key] = val;
		},
	},
	
	getConst(obj) {
		for (let key in this._const) {
			if (obj[key] == null) obj[key] = this._const[key];
		}
		return obj;
	},
	
	getHP: function(hpBase,hpMax,level) {
		if (level >= 100) {
			return Math.min(hpMax, hpBase + ([4,4,4,5,6,7,7,8,8,9][Math.floor(hpBase/10)] || 9));
		}
		return hpBase;
	},
	getScaledStat: function(statBase,statMax,level) {
		return statBase + Math.floor((statMax - statBase)*level/99);
	},
	getLBASSlotDefault: function(type) {
		if ([SEAPLANE,CARRIERSCOUT,CARRIERSCOUT2,FLYINGBOAT,LANDSCOUT].includes(type)) return 4;
		if ([LANDBOMBERL].includes(type)) return 9;
		return 18;
	},
	
	isShipIdPlayable: function(shipid) {
		shipid = +shipid;
		return (shipid < 1500 || (shipid >= 9001 && shipid <= 9003));
	},
	isShipIdKanmusu: function(id) {
		return +id < 1500;
	},
	isShipIdAbyssal: function(id) {
		return +id > 1500 && +id < 3000;
	},
	isShipIdArpeggio: function(id) {
		return +id > 9000;
	},
	isShipIdCustom: function(id) {
		return +id > 3000 && +id < 4000;
	},
	isEquipIdAbyssal: function(id) {
		return +id > 1500;
	},
	
	_specialAttackUIEnable: [
		{ attackSpecial: 100, formations: [2,12] },
		{ attackSpecial: 101, formations: [4,12] },
		{ attackSpecial: 102, formations: [4,12] },
		{ attackSpecial: 103, formations: [4,12] },
		{ attackSpecial: 105, formations: [2,12] },
		{ attackSpecial: 106, formations: [4,12] },
		{ ids: [546,911,916], formations: [4,12] },
		{ types: ['AS'], formations: [4,5] },
	],
	checkSpecialAttackUI: function(uiMain,formation) {
		if (!uiMain) return false;
		let shipFlag = uiMain.fleetFMain.ships[0];
		if (FLEET_MODEL.shipIsEmpty(shipFlag)) return false;
		for (let item of this._specialAttackUIEnable) {
			if (!item.formations.includes(+formation)) continue;
			if ((item.attackSpecial && item.attackSpecial == SHIPDATA[shipFlag.mstId].attackSpecial) || (item.ids && item.ids.includes(shipFlag.mstId)) || (item.types && item.types.includes(SHIPDATA[shipFlag.mstId].type))) return true;
		}
		return false;
	},
	
	friendFleetImproveSpecial: {
		'59-4': [
			{ "ships": [{ "id": 411, "improvement": [10,10,10] }, { "id": 319, "improvement": [10,10,0,10] }, { "id": 194, "improvement": [10,10,0,10] }, { "id": 564, "improvement": [8,10,10] }, { "id": 327, "improvement": [10,10,10] }], "rate": 25 },
			{ "ships": [{ "id": 411, "improvement": [10,10,10] }, { "id": 319, "improvement": [10,10,0,10] }, { "id": 194, "improvement": [10,10,0,10] }, { "id": 564, "improvement": [8,10,10] }, { "id": 327, "improvement": [10,10,10] }, { "id": 328, "improvement": [10,10,10] }], "rate": 25 },
			{ "ships": [{ "id": 156, "improvement": [4] }, { "id": 411, "improvement": [10,10,0,10] }, { "id": 412, "improvement": [10,10,10] }, { "id": 501, "improvement": [10,10,10] }, { "id": 968, "improvement": [10,10,10] }], "rate": 30 },
			{ "ships": [{ "id": 156, "improvement": [4] }, { "id": 411, "improvement": [10,10,0,10] }, { "id": 412, "improvement": [10,10,10] }, { "id": 501, "improvement": [10,10,10] }, { "id": 968, "improvement": [10,10,10] }, { "id": 329, "improvement": [10,10,10] }], "rate": 30 },
			{ "ships": [{ "id": 734, "improvement": [8,8] }, { "id": 659, "improvement": [0,0,10] }, { "id": 697, "improvement": [] }, { "id": 928, "improvement": [9,9] }, { "id": 689, "improvement": [] }, { "id": 726, "improvement": [4] }], "rate": 50 },
			{ "ships": [{ "id": 319, "improvement": [10,10,10,10] }, { "id": 194, "improvement": [10,10] }, { "id": 246, "improvement": [9,10,10] }, { "id": 497, "improvement": [10,10,10] }, { "id": 961, "improvement": [10,10,10] }], "rate": 70 },
			{ "ships": [{ "id": 319, "improvement": [10,10,10,10] }, { "id": 194, "improvement": [10,10] }, { "id": 487, "improvement": [10,10] }, { "id": 246, "improvement": [9,10,10] }, { "id": 497, "improvement": [10,10,10] }, { "id": 961, "improvement": [10,10,10] }], "rate": 70 },
			{ "ships": [{ "id": 264, "improvement": [10,10,0,10] }, { "id": 487, "improvement": [10,10] }, { "id": 647, "improvement": [10,10,10] }, { "id": 627, "improvement": [10,10,10] }], "rate": 99 },
			{ "ships": [{ "id": 264, "improvement": [10,10,0,10] }, { "id": 487, "improvement": [10,10] }, { "id": 647, "improvement": [10,10,10] }, { "id": 627, "improvement": [10,10,10] }, { "id": 961, "improvement": [10,10,10] }], "rate": 99 },
			{ "ships": [{ "id": 411, "improvement": [10,10,10] }, { "id": 564, "improvement": [8,10,10] }, { "id": 327, "improvement": [10,10,10] }], "rate": 20 },
			{ "ships": [{ "id": 487, "improvement": [10,10] }, { "id": 647, "improvement": [10,10,10] }, { "id": 627, "improvement": [10,10,10] }], "rate": 25 },
			{ "ships": [{ "id": 928, "improvement": [9,9] }, { "id": 726, "improvement": [] }, { "id": 689, "improvement": [4] }], "rate": 33.333 },
			{ "ships": [{ "id": 647, "improvement": [10,10,10] }, { "id": 627, "improvement": [10,10,10] }], "rate": 50 },
			{ "ships": [{ "id": 564, "improvement": [8,10,10] }, { "id": 327, "improvement": [10,10,10] }], "rate": 100 }
		],
		'59-5': [
			{ "ships": [{ "id": 591, "improvement": [0,0,10,10,10] }, { "id": 954, "improvement": [10,10,10,10,10] }, { "id": 626, "improvement": [10,6,6,8] }, { "id": 144, "improvement": [8,8,8] }, { "id": 975, "improvement": [10,10,6] }], "rate": 30 },
			{ "ships": [{ "id": 592, "improvement": [0,0,10,10,10] }, { "id": 152, "improvement": [10,10,10,10,10] }, { "id": 725, "improvement": [10,10,6] }, { "id": 703, "improvement": [8,6,6] }, { "id": 498, "improvement": [0,6] }], "rate": 40 },
			{ "ships": [{ "id": 592, "improvement": [0,0,10,10,10] }, { "id": 586, "improvement": [10,10,10,8] }, { "id": 144, "improvement": [8,8,8] }, { "id": 975, "improvement": [10,10,6] }, { "id": 498, "improvement": [0,6] }], "rate": 50 },
			{ "ships": [{ "id": 591, "improvement": [0,0,10,10,10] }, { "id": 954, "improvement": [10,10,10,10,10] }, { "id": 144, "improvement": [8,8,8] }, { "id": 975, "improvement": [10,10,6] }], "rate": 90 },
			{ "ships": [{ "id": 697, "improvement": [0,0,0,0,8] }, { "id": 152, "improvement": [10,10,10,10,10] }, { "id": 144, "improvement": [8,8,8] }, { "id": 975, "improvement": [10,10,6] }], "rate": 99 },
			{ "ships": [{ "id": 626, "improvement": [10,6,6,8] }, { "id": 725, "improvement": [10,10,6] }, { "id": 703, "improvement": [8,6,6] }], "rate": 20 },
			{ "ships": [{ "id": 586, "improvement": [10,10,10,8] }, { "id": 354, "improvement": [10,10,10] }, { "id": 557, "improvement": [10,10] }], "rate": 25 },
			{ "ships": [{ "id": 592, "improvement": [0,0,10,10,10] }, { "id": 144, "improvement": [8,8,8] }, { "id": 975, "improvement": [10,10,6] }], "rate": 33.333 },
			{ "ships": [{ "id": 725, "improvement": [10,10,6] }, { "id": 703, "improvement": [8,6,6] }], "rate": 50 },
			{ "ships": [{ "id": 703, "improvement": [10,8,6] }, { "id": 260, "improvement": [0,0,6] }], "rate": 100 },
			
			{ "ships": [{ "id": 916, "improvement": [10,10,10,0,10] }, { "id": 553, "improvement": [10,10,0,10,10,10] }, { "id": 554, "improvement": [10,10,0,10,10,10] }, { "id": 321, "improvement": [10,10,10,10] }, { "id": 330, "improvement": [10,10] }, { "id": 968, "improvement": [10,10,10] }], "rate": 25 },
			{ "ships": [{ "id": 916, "improvement": [10,10,10,0,10] }, { "id": 894, "improvement": [6,6] }, { "id": 501, "improvement": [10,10,0,0,10] }, { "id": 662, "improvement": [10,10] }, { "id": 703, "improvement": [10,10,10] }, { "id": 725, "improvement": [10,10,10] }], "rate": 35 },
			{ "ships": [{ "id": 704, "improvement": [] }, { "id": 697, "improvement": [] }, { "id": 659, "improvement": [0,0,10] }, { "id": 734, "improvement": [8,8] }, { "id": 726, "improvement": [] }, { "id": 628, "improvement": [4] }], "rate": 60 },
			{ "ships": [{ "id": 196, "improvement": [6,6] }, { "id": 197, "improvement": [6,6] }, { "id": 954, "improvement": [10,10,10,10] }, { "id": 648, "improvement": [10,10] }, { "id": 564, "improvement": [8,8,8] }, { "id": 398, "improvement": [10,10,4] }], "rate": 65 },
			{ "ships": [{ "id": 639, "improvement": [10,10] }, { "id": 977, "improvement": [10,10,4] }, { "id": 976, "improvement": [10,10,5] }, { "id": 399, "improvement": [10,10,5] }, { "id": 647, "improvement": [8,10] }, { "id": 627, "improvement": [10,10,10] }], "rate": 99 },
			{ "ships": [{ "id": 697, "improvement": [] }, { "id": 659, "improvement": [0,0,10] }, { "id": 726, "improvement": [] }, { "id": 689, "improvement": [4] }], "rate": 25 },
			{ "ships": [{ "id": 197, "improvement": [6,6] }, { "id": 196, "improvement": [6,6] }, { "id": 564, "improvement": [10,10] }, { "id": 648, "improvement": [8,8,8] }], "rate": 33.333 },
			{ "ships": [{ "id": 282, "improvement": [6,6] }, { "id": 622, "improvement": [10,10,10] }, { "id": 142, "improvement": [10,10,10,10] }, { "id": 232, "improvement": [10,10,10] }], "rate": 50 },
			{ "ships": [{ "id": 639, "improvement": [10,10] }, { "id": 976, "improvement": [10,10,5] }, { "id": 977, "improvement": [10,10,4] }], "rate": 100 }
		]
	},
	
	getHash: function(str) {
		var hash = 0, i, chr;
		if (str.length === 0) return hash;
		for (i = 0; i < str.length; i++) {
			chr = str.charCodeAt(i);
			hash = ((hash << 5) - hash) + chr;
			hash |= 0;
		}
		return hash;
	},
	
	arrayBufferToBase64: function(buffer) {
		let binary = '';
		let bytes = new Uint8Array(buffer);
		let len = bytes.byteLength;
		for (let i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return window.btoa(binary);
	},
	base64ToArrayBuffer: function(base64) {
		let binary_string = window.atob(base64);
		let len = binary_string.length;
		let bytes = new Uint8Array(len);
		for (let i = 0; i < len; i++) {
			bytes[i] = binary_string.charCodeAt(i);
		}
		return bytes;
	},
	
	_init: function() {
		//https://github.com/tc39/proposal-relative-indexing-method#polyfill
		function at(n) {
			// ToInteger() abstract op
			n = Math.trunc(n) || 0;
			// Allow negative indexing from the end
			if (n < 0) n += this.length;
			// OOB access is guaranteed to return undefined
			if (n < 0 || n >= this.length) return undefined;
			// Otherwise, this is just normal property access
			return this[n];
		}

		const TypedArray = Reflect.getPrototypeOf(Int8Array);
		for (const C of [Array, String, TypedArray]) {
			if (C.prototype.hasOwnProperty('at')) continue;
			Object.defineProperty(C.prototype, "at",
								  { value: at,
									writable: true,
									enumerable: false,
									configurable: true });
		}
	},
};

COMMON._init();