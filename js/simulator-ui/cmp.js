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
				if (COMMON.modalCount++ <= 0) document.body.style.overflow = 'hidden';
			} else {
				if (--COMMON.modalCount <= 0) document.body.style.overflow = '';
			}
		},
	},
	template: document.getElementById('tmpModal')
};
COMMON.modalCount = 0;

COMMON.CMP_LOADING = {
	props: [],
	emits: [],
	data: () => ({
		txtLoading: '',
		active: false,
	}),
	methods: {
		_update: function() {
			setTimeout(function() {
				if (!this.txtLoading) {
					this.active = false;
					return;
				}
				this.txtLoading += ' •';
				if (this.txtLoading.length > 6) this.txtLoading = ' •';
				this._update();
			}.bind(this),500);
		},
		start: function() {
			if (this.txtLoading) return;
			this.txtLoading = ' •';
			if (!this.active) this._update();
		},
		stop: function() {
			this.txtLoading = '';
		},
	},
	template: document.getElementById('tmpLoading')
};

let messages = {
	en: {
		
	},
	ja: {
		
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
async function init() {
	let datas = await Promise.all([
		fetch('js/data/strings_en.json').then(resp => resp.json()),
		fetch('js/data/strings_ja.json').then(resp => resp.json())
	]);
	let stringsEN = datas[0];
	let stringsJA = datas[1];
	for (let key in stringsEN) {
		messages.en[key] = stringsEN[key];
	}
	for (let key in stringsJA) {
		messages.ja[key] = stringsJA[key];
	}
	
	//note: using dev because prod behaves different? (component locale not reactive on $t)
	COMMON.i18n = VueI18n.createI18n({
		locale: 'en',
		fallbackLocale: 'en',
		messages,
	});
}
COMMON.promiseI18n = init();

})();