(() => {

COMMON.CMP_MODAL = {
	props: ['active'],
	emits: ['vclose'],
	data: () => ({
		
	}),
	methods: {
		focusContentTop: function() {
			this.$refs.contentTop.focus();
		},
		focusContentBottom: function() {
			this.$refs.contentBottom.focus();
		},
		onkeypressClose: function() {
			if (event.key == 'Escape') {
				this.$emit('vclose');
			}
		},
	},
	watch: {
		active: function() {
			if (this.active) {
				this.$refs.content.style = '';
				this.$nextTick(() => {
					this.focusContentTop();
					let rect = this.$refs.content.getBoundingClientRect();
					let w = Math.ceil(rect.width/2)*2;
					let h = Math.ceil(rect.height/2)*2;
					this.$refs.content.style = 'width:' + w + ';height:' + h;
				});
			}
		},
	},
	template: document.getElementById('tmpModal')
};

let messages = {
	en: {
		'ui_search': 'Search',
		'ui_back': 'Back',
		'ship_name_0': '',
		'equip_name_0': '',
		'selector': {
			'ship_section_Shipgirls': 'Shipgirls',
			'ship_section_Abyssals': 'Abyssals',
			'ship_section_Extra': 'Extra',
			'ship_cat_DD': 'DD',
			'ship_cat_CL(T)': 'CL(T)',
			'ship_cat_CA(V)': 'CA(V)',
			'ship_cat_BB(V)': 'BB(V)',
			'ship_cat_CVL': 'CVL',
			'ship_cat_CV': 'CV',
			'ship_cat_CV(L)': 'CV(L)',
			'ship_cat_SS(V)': 'SS(V)',
			'ship_cat_Other': 'Other',
			'ship_cat_Installation': 'Installation',
			'ship_cat_Arpeggio': 'Arpeggio',
			'ship_cat_Vita': 'Vita',
			'ship_cat_???': '???',
			'ship_title_Base': 'Base',
			'equip_section_Player': 'Player',
			'equip_section_Abyssal': 'Abyssal',
			'equip_cat_Main Gun (S)': 'Main Gun (S)',
			'equip_cat_Main Gun (M)': 'Main Gun (M)',
			'equip_cat_Main Gun (L)': 'Main Gun (L)',
			'equip_cat_Secondary Gun': 'Secondary Gun',
			'equip_cat_Torpedo': 'Torpedo',
			'equip_cat_Midget Sub': 'Midget Sub',
			'equip_cat_Fighter': 'Fighter',
			'equip_cat_Dive Bomber': 'Dive Bomber',
			'equip_cat_Torpedo Bomber': 'Torpedo Bomber',
			'equip_cat_Other Aircraft': 'Other Aircraft',
			'equip_cat_Seaplane': 'Seaplane',
			'equip_cat_Seaplane Bomber': 'Seaplane Bomber',
			'equip_cat_Seaplane Fighter': 'Seaplane Fighter',
			'equip_cat_Radar': 'Radar',
			'equip_cat_Sonar': 'Sonar',
			'equip_cat_Depth Charge': 'Depth Charge',
			'equip_cat_Engine': 'Engine',
			'equip_cat_Shell': 'Shell',
			'equip_cat_Anti-Air Gun': 'Anti-Air Gun',
			'equip_cat_Bulge': 'Bulge',
			'equip_cat_Night Gear': 'Night Gear',
			'equip_cat_Landing Craft': 'Landing Craft',
			'equip_cat_Land-based Bomber': 'Land-based Bomber',
			'equip_cat_Interceptor': 'Interceptor',
			'equip_cat_Other': 'Other',
		},
	},
	ja: {
		'ui_search': '検索',
		'ui_back': '戻る',
		'ship_name_0': '',
		'equip_name_0': '',
		'selector': {
			'ship_section_Shipgirls': '艦娘',
			'ship_section_Abyssals': '深海棲艦',
			'ship_section_Extra': 'EXTRA',
			'ship_cat_DD': '駆逐艦',
			'ship_cat_CL(T)': '軽巡級',
			'ship_cat_CA(V)': '重巡級',
			'ship_cat_BB(V)': '戦艦級',
			'ship_cat_CVL': '軽空母',
			'ship_cat_CV': '正規空母',
			'ship_cat_CV(L)': '航空母艦',
			'ship_cat_SS(V)': '潜水艦',
			'ship_cat_Other': 'その他',
			'ship_cat_Installation': '陸上施設',
			'ship_cat_Arpeggio': 'アルペジオ',
			'ship_cat_Vita': '艦これ改',
			'ship_cat_???': '???',
			'ship_title_Base': '未改',
			'equip_section_Player': '艦娘',
			'equip_section_Abyssal': '深海棲艦',
			'equip_cat_Main Gun (S)': '小口径主砲',
			'equip_cat_Main Gun (M)': '中口径主砲',
			'equip_cat_Main Gun (L)': '大口径主砲',
			'equip_cat_Secondary Gun': '副砲',
			'equip_cat_Torpedo': '魚雷',
			'equip_cat_Midget Sub': '特殊潜航艇',
			'equip_cat_Fighter': '艦上戦闘機',
			'equip_cat_Dive Bomber': '艦上爆撃機',
			'equip_cat_Torpedo Bomber': '艦上攻撃機',
			'equip_cat_Other Aircraft': '他の艦載機',
			'equip_cat_Seaplane': '水上偵察機',
			'equip_cat_Seaplane Bomber': '水上爆撃機',
			'equip_cat_Seaplane Fighter': '水上戦闘機',
			'equip_cat_Radar': '電探',
			'equip_cat_Sonar': 'ソナー',
			'equip_cat_Depth Charge': '爆雷',
			'equip_cat_Engine': '機関部強化',
			'equip_cat_Shell': '強化弾',
			'equip_cat_Anti-Air Gun': '対空機銃',
			'equip_cat_Bulge': '追加装甲',
			'equip_cat_Night Gear': '夜戦',
			'equip_cat_Landing Craft': '上陸用舟艇',
			'equip_cat_Land-based Bomber': '陸上攻撃機',
			'equip_cat_Interceptor': '局地戦闘機',
			'equip_cat_Other': 'その他',
		},
	},
}
for (let id in SHIPDATA) {
	let key = 'ship_name_'+SHIPDATA[id].name;
	messages.en[key] = SHIPDATA[id].name;
	messages.ja[key] = SHIPDATA[id].nameJP;
}
for (let id in EQDATA) {
	let key = 'equip_name_'+EQDATA[id].name;
	messages.en[key] = EQDATA[id].name;
	messages.ja[key] = EQDATA[id].nameJP;
}
//note: using dev because prod behaves different? (component locale not reactive on $t)
COMMON.i18n = VueI18n.createI18n({
	locale: 'en',
	fallbackLocale: 'en',
	messages,
});

})();