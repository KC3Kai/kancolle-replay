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
	
	BARRAGE_BALLOON_NODES: ['3-5-H','4-3-N','4-5-T','57-5-L1','57-5-L2','57-5-O','57-6-C2','57-6-Q','57-7-A5','57-7-H','57-7-P','57-7-U','57-7-Z'],
	
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