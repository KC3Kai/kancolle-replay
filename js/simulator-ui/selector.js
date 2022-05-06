(() => {

var CONST = window.COMMON.getConst({
	MAX_RESULTS: 9999,
	STATS_ORDER: ['divebomb','fp','tp','aa','ar','acc','ev','asw','los'],
});

var SHIP_LIST_ORDER = {}, EQUIP_LIST_ORDER = {};
var SHIP_CATEGORIES = {}, EQUIP_CATEGORIES = {};

var METHODS_COMMON = {
	callbackSubmit: null,
	callbackClose: null,
	
	methods: {
		doClose: function() {
			this.active = false;
			this.searchName = '';
			this.searchResults = [];
			this.searchSelected = null;
			this.searchInd = 0;
			this.buttonsChoice = null;
			METHODS_COMMON.callbackClose();
		},
		doSubmit: function(mstId) {
			METHODS_COMMON.callbackSubmit(mstId);
			this.doClose();
		},
		
		addResult: function(id,name,imgName) {
			let ind = name.toLowerCase().indexOf(this.searchName.toLowerCase()), len = ind >= 0 ? this.searchName.length : 0;
			this.searchResults.push({
				id: id,
				namePre: name.slice(0,ind),
				nameUnderline: name.slice(ind,ind+len),
				namePost: name.slice(ind+len),
				ref: 'divSearchRes' + id,
				imgName: imgName,
			});
		},
		oninputSearch: function(OBJ_LIST) {
			this.searchResults = [];
			if (!this.searchName) {
				return;
			}
			let searchNameL = this.searchName.toLowerCase();
			let n = 0;
			let foundSelected = false;
			for (let obj of OBJ_LIST) {
				if (obj.nameL.indexOf(searchNameL) != 0) continue;
				this.addResult(obj.id,obj.name,obj.imgName);
				if (!foundSelected && obj.id == this.searchSelected) {
					foundSelected = true;
					this.searchInd = n;
				}
				if (++n >= CONST.MAX_RESULTS) break;
			}
			if (searchNameL.length > 1 || this.$i18n.locale != 'en') {
				for (let obj of OBJ_LIST) {
					if (obj.nameL.indexOf(searchNameL) == 0) continue;
					if (!obj.nameL.includes(searchNameL)) continue;
					this.addResult(obj.id,obj.name,obj.imgName);
					if (!foundSelected && obj.id == this.searchSelected) {
						foundSelected = true;
						this.searchInd = n;
					}
					if (++n >= CONST.MAX_RESULTS) break;
				}
			}
			if (!foundSelected && this.searchResults.length) {
				this.searchSelected = this.searchResults[this.searchInd = 0].id;
			}
		},
		onkeydownSearch: function() {
			if (!this.searchName.length && event.key == 'Enter') {
				this.doClose();
				return;
			}
			if (event.key == 'Delete') {
				this.doSubmit(0);
				return;
			}
			if (!this.searchResults.length) return;
			if (event.key == 'ArrowUp') {
				event.preventDefault();
				if (this.searchInd <= 0) return;
				let result = this.searchResults[--this.searchInd];
				this.searchSelected = result.id;
				this.$refs[result.ref][0].scrollIntoViewIfNeeded(false);
			}
			if (event.key == 'ArrowDown') {
				event.preventDefault();
				if (this.searchInd >= this.searchResults.length-1) return;
				let result = this.searchResults[++this.searchInd];
				this.searchSelected = result.id;
				this.$refs[result.ref][0].scrollIntoViewIfNeeded(false);
			}
			if (event.key == 'Enter') {
				this.doSubmit(this.searchSelected);
			}
		},
		onmouseoverResult: function(result) {
			this.searchSelected = result.id;
			this.searchInd = this.searchResults.indexOf(result);
		},
		onclickResult: function(result) {
			this.doSubmit(result.id);
		},
		onclickBack: function() {
			this.buttonsChoice = null;
		},
	},
};

var UI_SHIPSELECTOR = Vue.createApp({
	data: () => ({
		active: false,
		searchName: '',
		searchResults: [],
		searchSelected: null,
		searchInd: 0,
		
		buttonsCat1: [
			{ name: 'DD', imgName: SHIPDATA[9].image, category: 'playerDD' },
			{ name: 'CL(T)', imgName: SHIPDATA[54].image, category: 'playerCL' },
			{ name: 'CA(V)', imgName: SHIPDATA[66].image, category: 'playerCA' },
			{ name: 'BB(V)', imgName: SHIPDATA[80].image, category: 'playerBB' },
			{ name: 'CVL', imgName: SHIPDATA[89].image, category: 'playerCVL' },
			{ name: 'CV', imgName: SHIPDATA[83].image, category: 'playerCV' },
			{ name: 'SS(V)', imgName: SHIPDATA[126].image, category: 'playerSS' },
			{ name: 'Other', imgName: SHIPDATA[182].image, category: 'playerOther' },
		],
		buttonsCat2: [
			{ name: 'DD', imgName: SHIPDATA[1501].image, category: 'enemyDD' },
			{ name: 'CL(T)', imgName: SHIPDATA[1505].image, category: 'enemyCL' },
			{ name: 'CA(V)', imgName: SHIPDATA[1509].image, category: 'enemyCA' },
			{ name: 'BB(V)', imgName: SHIPDATA[1511].image, category: 'enemyBB' },
			{ name: 'CV(L)', imgName: SHIPDATA[1512].image, category: 'enemyCV' },
			{ name: 'SS(V)', imgName: SHIPDATA[1530].image, category: 'enemySS' },
			{ name: 'Other', imgName: SHIPDATA[1513].image, category: 'enemyOther' },
			{ name: 'Installation', imgName: SHIPDATA[1556].image, category: 'enemyInstall' },
		],
		buttonsCat3: [
			{ name: 'Arpeggio', imgName: SHIPDATA[9001].image, category: 'arpeggio' },
			{ name: 'Vita', imgName: SHIPDATA[3003].image, category: 'vita' },
			{ name: '???', imgName: null, category: 'secret', secret: true },
		],
		
		buttonsChoice: null,
	}),
	methods: {
		doOpen: function(keyInit) {
			this.active = true;
			if (keyInit && this.$i18n.locale == 'en') {
				this.searchName = keyInit;
				this.oninputSearch();
			}
			this.$nextTick(() => this.$refs.inputShipSelSearch.focus());
		},
		doClose: METHODS_COMMON.methods.doClose,
		doSubmit: METHODS_COMMON.methods.doSubmit,
		
		addResult: METHODS_COMMON.methods.addResult,
		oninputSearch: function() { METHODS_COMMON.methods.oninputSearch.call(this,SHIP_LIST_ORDER[this.$i18n.locale]); },
		onkeydownSearch: METHODS_COMMON.methods.onkeydownSearch,
		onmouseoverResult: METHODS_COMMON.methods.onmouseoverResult,
		onclickResult: METHODS_COMMON.methods.onclickResult,
		
		onclickButtonCat: function(btn) {
			this.buttonsChoice = SHIP_CATEGORIES[this.$i18n.locale][btn.category];
		},
		onclickButtonShip: function(btn) {
			this.doSubmit(btn.id || btn.remodels.at(-1).id);
		},
		onclickButtonShipR: function(remodel) {
			this.doSubmit(remodel.id);
		},
		onclickBack: METHODS_COMMON.methods.onclickBack,
	},
}).component('vmodal',COMMON.CMP_MODAL).use(COMMON.i18n).mount('#divShipSel');


var UI_EQUIPSELECTOR = Vue.createApp({
	data: () => ({
		active: false,
		searchName: '',
		searchResults: [],
		searchSelected: null,
		searchInd: 0,
		
		buttonsCat: [
			{ name: 'Main Gun (S)', imgNames: ['1'], category: '1' },
			{ name: 'Main Gun (M)', imgNames: ['2'], category: '2' },
			{ name: 'Main Gun (L)', imgNames: ['3'], category: '3' },
			{ name: 'Secondary Gun', imgNames: ['4'], category: '4' },
			{ name: 'Torpedo', imgNames: ['5'], category: '5' },
			{ name: 'Midget Sub', imgNames: ['5'], category: '6' },
			{ name: 'Fighter', imgNames: ['6'], category: '7' },
			{ name: 'Dive Bomber', imgNames: ['7'], category: '8' },
			{ name: 'Torpedo Bomber', imgNames: ['8'], category: '9' },
			{ name: 'Other Aircraft', imgNames: ['9','21','22','39'], category: '10' },
			{ name: 'Seaplane', imgNames: ['10','33'], category: '11' },
			{ name: 'Seaplane Bomber', imgNames: ['10'], category: '12' },
			{ name: 'Seaplane Fighter', imgNames: ['43'], category: '13' },
			{ name: 'Radar', imgNames: ['11','42'], category: '14' },
			{ name: 'Sonar', imgNames: ['18'], category: '15' },
			{ name: 'Depth Charge', imgNames: ['17'], category: '16' },
			{ name: 'Engine', imgNames: ['19'], category: '17' },
			{ name: 'Shell', imgNames: ['12','13'], category: '18' },
			{ name: 'Anti-Air Gun', imgNames: ['15'], category: '19' },
			{ name: 'Bulge', imgNames: ['23'], category: '20' },
			{ name: 'Night Gear', imgNames: ['24','27','32'], category: '21' },
			{ name: 'Landing Craft', imgNames: ['20','36'], category: '22' },
			{ name: 'Land-based Bomber', imgNames: ['37','47','49'], category: '23' },
			{ name: 'Interceptor', imgNames: ['38','44'], category: '24' },
			{ name: 'Other', imgNames: ['empty'], category: '25' },
		],
		
		buttonsChoice: null,
	}),
	methods: {
		doOpen: function(keyInit) {
			this.active = true;
			if (keyInit) {
				this.searchName = keyInit;
				this.oninputSearch();
			}
			this.$nextTick(() => this.$refs.inputEquipSelSearch.focus());
		},
		doClose: METHODS_COMMON.methods.doClose,
		doSubmit: METHODS_COMMON.methods.doSubmit,
		
		addResult: METHODS_COMMON.methods.addResult,
		oninputSearch: function() { METHODS_COMMON.methods.oninputSearch.call(this,EQUIP_LIST_ORDER[this.$i18n.locale]); },
		onkeydownSearch: METHODS_COMMON.methods.onkeydownSearch,
		onmouseoverResult: METHODS_COMMON.methods.onmouseoverResult,
		onclickResult: METHODS_COMMON.methods.onclickResult,
		
		onclickButtonCat: function(btn) {
			this.buttonsChoice = EQUIP_CATEGORIES[btn.category];
		},
		onclickButtonEquip: function(btn) {
			this.doSubmit(btn.id);
		},
		onclickBack: METHODS_COMMON.methods.onclickBack,
	},
}).component('vmodal',COMMON.CMP_MODAL).use(COMMON.i18n).mount('#divEquipSel');



function init() {
	//set up here and don't use i18n/$t because performance
	SHIP_LIST_ORDER = { 'en': [], 'ja': [] };
	for (let lang in SHIP_LIST_ORDER) {
		let keyName = lang == 'en' ? 'name' : 'nameJP';
		for (let id in SHIPDATA) {
			if (!COMMON.isShipIdPlayable(id)) continue;
			let name = SHIPDATA[id][keyName] || '';
			SHIP_LIST_ORDER[lang].push({ id: id, name: name, nameL: name.toLowerCase() });
		}
		SHIP_LIST_ORDER[lang].sort((a,b) => a.name < b.name ? -1 : 1);
		for (let id of Object.keys(SHIPDATA).sort((a,b) => +a-+b)) {
			if (COMMON.isShipIdPlayable(id)) continue;
			let name = SHIPDATA[id][keyName] || '';
			SHIP_LIST_ORDER[lang].push({ id: id, name: name, nameL: name.toLowerCase() });
		}
	}
	
	let getCategoryF = function(types,keyName) {
		let lang = keyName == 'name' ? 'en' : 'ja';
		let remodels = {};
		for (let id in SHIPDATA) {
			if (!COMMON.isShipIdKanmusu(id)) continue; 
			let ship = SHIPDATA[id];
			if (!types.includes(ship.type)) continue;
			if (ship.prev && types.includes(SHIPDATA[ship.prev].type)) continue;
			let r = remodels[+id] = [+id];
			while (ship.next && types.includes(SHIPDATA[ship.next].type) && !r.includes(ship.next)) {
				r.push(ship.next);
				ship = SHIPDATA[ship.next];
			}
		}
		let output = [];
		for (let baseId of Object.keys(remodels).sort((a,b)=>+SHIPDATA[a].sclass-+SHIPDATA[b].sclass || +SHIPDATA[a].nid-+SHIPDATA[b].nid)) {
			let shipBase = SHIPDATA[remodels[baseId][0]];
			let shipFinal = SHIPDATA[remodels[baseId].at(-1)];
			let nameTop = nameBase = shipBase[keyName];
			if (!shipFinal[keyName].includes(shipBase[keyName])) {
				for (let i=1; i<remodels[baseId].length; i++) {
					let s = SHIPDATA[remodels[baseId][i]];
					if (shipFinal[keyName].includes(s[keyName])) {
						nameTop = s[keyName];
						if (i < remodels[baseId].length-1) nameBase = s[keyName];
						break;
					}
				}
			}
			let obj = {
				name: nameTop,
				imgName: shipFinal.image,
				remodels: [],
			};
			for (let id of remodels[baseId]) {
				let name = SHIPDATA[id][keyName].replace(nameBase,'').trim() || COMMON.i18n.global.messages[lang].selector.ship_title_Base;
				if (SHIPDATA[id][keyName] == nameBase && nameBase != nameTop) name = nameBase;
				obj.remodels.push({
					id: id,
					name: name,
				});
			}
			output.push(obj);
		}
		return output;
	}
	
	let getCategoryE = function(types,keyName,installOnly) {
		let output = [];
		for (let id of Object.keys(SHIPDATA).sort((a,b)=>+a-+b)) {
			if (!COMMON.isShipIdAbyssal(id)) continue;
			let s = SHIPDATA[id];
			if (types && !types.includes(s.type)) continue;
			if (!!installOnly != !!s.installtype) continue;
			output.push({
				id: id,
				name: s[keyName],
				imgName: s.image,
			});
		}
		return output;
	}
	
	SHIP_CATEGORIES = { 'en': {}, 'ja': {} };
	for (let lang in SHIP_CATEGORIES) {
		let keyName = lang == 'en' ? 'name' : 'nameJP';
	
		SHIP_CATEGORIES[lang].playerDD = getCategoryF(['DD'],keyName);
		SHIP_CATEGORIES[lang].playerCL = getCategoryF(['CL','CLT','CT'],keyName);
		SHIP_CATEGORIES[lang].playerCA = getCategoryF(['CA','CAV'],keyName);
		SHIP_CATEGORIES[lang].playerBB = getCategoryF(['FBB','BB','BBV'],keyName);
		SHIP_CATEGORIES[lang].playerCVL = getCategoryF(['CVL'],keyName);
		SHIP_CATEGORIES[lang].playerCV = getCategoryF(['CV','CVB'],keyName);
		SHIP_CATEGORIES[lang].playerSS = getCategoryF(['SS','SSV'],keyName);
		SHIP_CATEGORIES[lang].playerOther = getCategoryF(['DE','AV','LHA','AR','AS','AO'],keyName);
		
		SHIP_CATEGORIES[lang].enemyDD = getCategoryE(['DD'],keyName);
		SHIP_CATEGORIES[lang].enemyCL = getCategoryE(['CL','CLT','CT'],keyName);
		SHIP_CATEGORIES[lang].enemyCA = getCategoryE(['CA','CAV'],keyName);
		SHIP_CATEGORIES[lang].enemyBB = getCategoryE(['FBB','BB','BBV'],keyName);
		SHIP_CATEGORIES[lang].enemyCV = getCategoryE(['CVL','CV','CVB'],keyName);
		SHIP_CATEGORIES[lang].enemySS = getCategoryE(['SS','SSV'],keyName);
		SHIP_CATEGORIES[lang].enemyOther = getCategoryE(['DE','AV','LHA','AR','AS','AO'],keyName);
		SHIP_CATEGORIES[lang].enemyInstall = getCategoryE(null,keyName,true);
		
		SHIP_CATEGORIES[lang].arpeggio =  [];
		SHIP_CATEGORIES[lang].vita =  [];
		SHIP_CATEGORIES[lang].secret =  [];
	
		for (let id of Object.keys(SHIPDATA).sort((a,b)=>+a-+b)) {
			if (!COMMON.isShipIdArpeggio(id)) continue;
			SHIP_CATEGORIES[lang].arpeggio.push({
				id: id,
				name: SHIPDATA[id][keyName],
				imgName: SHIPDATA[id].image,
			});
		}
		
		for (let id=3003; id<=3008; id++) {
			SHIP_CATEGORIES[lang].vita.push({
				id: id,
				name: SHIPDATA[id][keyName],
				imgName: SHIPDATA[id].image,
			});
		}
		
		for (let id=3001; id<=3002; id++) {
			SHIP_CATEGORIES[lang].secret.push({
				id: id,
				name: SHIPDATA[id][keyName],
				imgName: SHIPDATA[id].image,
			});
		}
	}
	
	EQUIP_LIST_ORDER = { 'en': [], 'ja': [] };
	for (let lang in SHIP_LIST_ORDER) {
		let keyName = lang == 'en' ? 'name' : 'nameJP';
		for (let id of Object.keys(EQDATA).sort((a,b)=>+a-+b)) {
			if (id == 0) continue;
			let name = EQDATA[id][keyName] || '';
			EQUIP_LIST_ORDER[lang].push({ id: id, name: name, nameL: name.toLowerCase(), imgName: EQDATA[id].image || EQTDATA[EQDATA[id].type].image });
		}
	}
	
	let getCategoryEquip = function(types) {
		let output = { 'player': [], 'enemy': [] };
		for (let id of Object.keys(EQDATA).sort((a,b)=>+a-+b)) {
			let eq = EQDATA[id];
			if (!types.includes(eq.type)) continue;
			let key = COMMON.isEquipIdAbyssal(id) ? 'enemy' : 'player';
			let obj = {
				id: id,
				name: eq.name,
				imgName: eq.image || EQTDATA[eq.type].image,
				stats: [],
			};
			for (let stat of CONST.STATS_ORDER) {
				let statU = stat.toUpperCase();
				if (eq[statU]) {
					obj.stats.push({
						name: stat,
						num: eq[statU],
					});
				}
			}
			output[key].push(obj);
		}
		return output;
	}
	
	EQUIP_CATEGORIES['1'] = getCategoryEquip([1]);
	EQUIP_CATEGORIES['2'] = getCategoryEquip([2]);
	EQUIP_CATEGORIES['3'] = getCategoryEquip([3,38]);
	EQUIP_CATEGORIES['4'] = getCategoryEquip([4]);
	EQUIP_CATEGORIES['5'] = getCategoryEquip([5,32]);
	EQUIP_CATEGORIES['6'] = getCategoryEquip([22]);
	EQUIP_CATEGORIES['7'] = getCategoryEquip([6]);
	EQUIP_CATEGORIES['8'] = getCategoryEquip([7]);
	EQUIP_CATEGORIES['9'] = getCategoryEquip([8]);
	EQUIP_CATEGORIES['10'] = getCategoryEquip([9,25,26,57,59,94]);
	EQUIP_CATEGORIES['11'] = getCategoryEquip([10,41]);
	EQUIP_CATEGORIES['12'] = getCategoryEquip([11]);
	EQUIP_CATEGORIES['13'] = getCategoryEquip([45]);
	EQUIP_CATEGORIES['14'] = getCategoryEquip([12,13,51,93]);
	EQUIP_CATEGORIES['15'] = getCategoryEquip([14,40]);
	EQUIP_CATEGORIES['16'] = getCategoryEquip([15]);
	EQUIP_CATEGORIES['17'] = getCategoryEquip([17]);
	EQUIP_CATEGORIES['18'] = getCategoryEquip([18,19]);
	EQUIP_CATEGORIES['19'] = getCategoryEquip([21]);
	EQUIP_CATEGORIES['20'] = getCategoryEquip([27,28]);
	EQUIP_CATEGORIES['21'] = getCategoryEquip([29,33,39,42]);
	EQUIP_CATEGORIES['22'] = getCategoryEquip([24,46]);
	EQUIP_CATEGORIES['23'] = getCategoryEquip([47,53]);
	EQUIP_CATEGORIES['24'] = getCategoryEquip([48]);
	EQUIP_CATEGORIES['25'] = getCategoryEquip([23,30,31,34,35,36,37,43,44,49,50]);
}

init();


COMMON.global.shipSelectorOpen = function(callbackSubmit,callbackClose,keyInit) {
	METHODS_COMMON.callbackSubmit = callbackSubmit;
	METHODS_COMMON.callbackClose = callbackClose;
	UI_SHIPSELECTOR.doOpen(keyInit);
}
COMMON.global.shipSelectorClose = function() {
	UI_SHIPSELECTOR.doClose();
}
COMMON.global.equipSelectorOpen = function(callbackSubmit,callbackClose,keyInit) {
	METHODS_COMMON.callbackSubmit = callbackSubmit;
	METHODS_COMMON.callbackClose = callbackClose;
	UI_EQUIPSELECTOR.doOpen(keyInit);
}
COMMON.global.equipSelectorClose = function() {
	UI_EQUIPSELECTOR.doClose();
}


})();