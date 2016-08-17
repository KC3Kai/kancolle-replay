function SoundManager() {
	this._mute = false;
	this._volume = 1;
	Howler.volume(.6);
	this._bgm = null;
	this.BGMnum = 0;
	this._sounds = {};
	this._voices = [null,null,null,null,null,null,null,null,null,null,null,null];
	this._voiceON = true;
	for (name in SOUNDNAMES) {
		var vol = (SOUNDNAMES[name].voldef)? SOUNDNAMES[name].voldef : .6;
		this._sounds[name] = new Howl({urls:[SOUNDNAMES[name].path],volume:vol*this._volume});
	}
}
var SOUNDNAMES = {
	'crit': { path: 'assets/sounds/49_res.sounds.battle.SE_battle_bomb3.mp3',voldef:.5 },
	'hit': { path: 'assets/sounds/50_res.sounds.battle.SE_battle_bomb2.mp3',voldef:.5 },
	'fire': { path: 'assets/sounds/51_res.sounds.battle.SE_battle_bomb1.mp3',voldef:.5 },
	'torpedo': { path: 'assets/sounds/41_res.sounds.battle.SE_battle_gyorai.mp3' },
	'planelaunch': { path: 'assets/sounds/38_res.sounds.battle.SE_battle_plane1.mp3',voldef:.5 },
	'planeatk': { path: 'assets/sounds/36_res.sounds.battle.SE_battle_shoot.mp3',voldef:1 },
	'shutters': { path: 'assets/sounds/29_res.sounds.SE_frame_close.mp3' },
	'enter': { path: 'assets/sounds/48_res.sounds.battle.SE_battle_card.mp3',voldef:.45 },
	'airphase': { path: 'assets/sounds/42_res.sounds.battle.SE_battle_fannelCutIn.mp3',voldef:.5 },
	'aaci': { path: 'assets/sounds/52_res.sounds.battle.SE_Bam.mp3' },
	'text': { path: 'assets/sounds/44_res.sounds.battle.SE_battle_don.mp3' },
	'mapradar': {  path: 'assets/sounds/3_res.sounds.SE_sally_ping.mp3',voldef:.5 },
	'mapcompass': { path: 'assets/sounds/4_res.sounds.SE_sally_compass.mp3',voldef:.5 },
	'click': { path: 'assets/sounds/47_res.sounds.SE_battle_click.mp3',voldef: .5 },
}
SoundManager.prototype = {
	play: function(name,vol,loop) {
		//if (this._mute) return undefined;
		this._sounds[name].play();
		return this._sounds[name];
	},
	playBGM: function(num,vol) {
		if (!vol) vol = (BGMLIST[num].voldef)? BGMLIST[num].voldef : .3,
		this._bgm = new Howl({
			urls:[BGMLIST[num].url],
			volume:vol*this._volume,
			loop:true,
			buffer:true
		});
		this._bgm.play();
		this.BGMnum = num;
	},
	stopBGM: function() {
		if (!this._bgm) return;
		this._bgm.stop();
		this.BGMnum = 0;
	},
	fadeBGM: function(dur) {
		if (!this._bgm) return;
		if (!dur) dur = 2000;
		this._bgm.fade(this._bgm.volume(),0,dur);
		this.BGMnum = 0;
	},
	playVoice: function(shipid,type,slot) {
		if (!this._voiceON) return;
		if (!VOICES[shipid]) return;
		// if (slot > 10) return; //want non boss voices?
		if (type=='nbattack' && !VOICES[shipid].nbattack) type = 'attack';
		if (!VOICES[shipid][type]) return;
		if (!this._sounds['V'+type+shipid]) this._sounds['V'+type+shipid] = new Howl({
			urls:[VOICES[shipid][type]],
			volume:.4*this._volume,
			buffer:true
			});
		if (this._voices[slot] && isPlayable(shipid)) {
			this._voices[slot].stop();
		}
		this._voices[slot] = this._sounds['V'+type+shipid];
		this._sounds['V'+type+shipid].play();
	},
	turnOffVoice: function() {
		this._voiceON = false;
		for (var snd in this._sounds) {
			if (snd[0] == 'V') this._sounds[snd].stop();
		}
	},
	turnOnVoice: function() {
		this._voiceON = true;
	}
}

var BGMLIST = {
	1: {url:'http://vignette2.wikia.nocookie.net/kancolle/images/d/dd/Sound_b_bgm_1.ogg',voldef:.7},
	2: {url:'http://vignette4.wikia.nocookie.net/kancolle/images/f/fd/Sound_b_bgm_2.ogg'},
	1002: {url:'http://vignette4.wikia.nocookie.net/kancolle/images/6/66/Sound_bgm_iron02.ogg'},
	3: {url:'http://vignette3.wikia.nocookie.net/kancolle/images/3/3a/Sound_b_bgm_3.ogg'},
	4: {url:'http://vignette3.wikia.nocookie.net/kancolle/images/2/29/Sound_b_bgm_4.ogg'},
	5: {url:'http://vignette2.wikia.nocookie.net/kancolle/images/4/40/Sound_b_bgm_5.ogg'},
	6: {url:'http://vignette1.wikia.nocookie.net/kancolle/images/b/b8/Sound_b_bgm_6.ogg'},
	7: {url:'http://vignette4.wikia.nocookie.net/kancolle/images/6/69/Sound_b_bgm_7.ogg',voldef:.5},
	8: {url:'http://vignette3.wikia.nocookie.net/kancolle/images/9/93/Sound_b_bgm_8.ogg'},
	9: {url:'http://vignette2.wikia.nocookie.net/kancolle/images/0/08/Sound_b_bgm_9.ogg'},
	10: {url:'http://vignette2.wikia.nocookie.net/kancolle/images/8/8d/Sound_b_bgm_10.ogg'},
	11: {url:'http://vignette4.wikia.nocookie.net/kancolle/images/4/43/Sound_b_bgm_11.ogg'},
	12: {url:'http://vignette3.wikia.nocookie.net/kancolle/images/e/ea/Sound_b_bgm_12.ogg'},
	13: {url:'http://vignette1.wikia.nocookie.net/kancolle/images/d/d8/Sound_b_bgm_13.ogg',voldef:.45},
	14: {url:'http://vignette2.wikia.nocookie.net/kancolle/images/8/8e/Sound_b_bgm_14.ogg'},
	15: {url:'http://vignette3.wikia.nocookie.net/kancolle/images/5/52/Sound_b_bgm_15.ogg'},
	16: {url:'http://vignette1.wikia.nocookie.net/kancolle/images/a/a1/Sound_b_bgm_16.ogg'},
	17: {url:'http://vignette3.wikia.nocookie.net/kancolle/images/b/bf/Sound_b_bgm_17.ogg'},
	19: {url:'http://vignette4.wikia.nocookie.net/kancolle/images/e/ec/Sound_b_bgm_19.ogg'},
	20: {url:'http://vignette1.wikia.nocookie.net/kancolle/images/2/2a/Sound_b_bgm_20.ogg'},
	22: {url:'http://vignette4.wikia.nocookie.net/kancolle/images/b/bb/Sound_b_bgm_22.ogg'},
	25: {url:'http://vignette4.wikia.nocookie.net/kancolle/images/d/d8/Sound_b_bgm_25.ogg'},
	26: {url:'http://vignette2.wikia.nocookie.net/kancolle/images/a/ab/Sound_b_bgm_26.ogg'},
	27: {url:'http://vignette1.wikia.nocookie.net/kancolle/images/b/b6/Sound_b_bgm_27.ogg'},
	28: {url:'http://vignette2.wikia.nocookie.net/kancolle/images/7/7b/Sound_b_bgm_28.ogg'},
	29: {url:'http://vignette1.wikia.nocookie.net/kancolle/images/c/c8/Sound_b_bgm_29.ogg'},
	30: {url:'http://vignette1.wikia.nocookie.net/kancolle/images/9/94/Sound_b_bgm_30.ogg'},
	31: {url:'http://vignette1.wikia.nocookie.net/kancolle/images/9/9c/Sound_b_bgm_31.ogg'},
	37: {url:'http://vignette2.wikia.nocookie.net/kancolle/images/0/00/Sound_b_bgm_37.ogg',voldef:.4},
	38: {url:'http://vignette4.wikia.nocookie.net/kancolle/images/f/fd/Sound_b_bgm_38.ogg'},
	39: {url:'http://vignette2.wikia.nocookie.net/kancolle/images/c/c0/Sound_b_bgm_39.ogg'},
	40: {url:'http://vignette3.wikia.nocookie.net/kancolle/images/d/da/Sound_b_bgm_40.ogg'},
	41: {url:'http://vignette3.wikia.nocookie.net/kancolle/images/1/1a/Sound_b_bgm_41.ogg'},
	46: {url:'http://vignette1.wikia.nocookie.net/kancolle/images/8/89/Sound_b_bgm_46.ogg'},
	47: {url:'http://vignette4.wikia.nocookie.net/kancolle/images/5/55/Sound_b_bgm_47.ogg'},
	49: {url:'http://vignette4.wikia.nocookie.net/kancolle/images/4/4f/Sound_b_bgm_49.ogg'},
	50: {url:'http://vignette2.wikia.nocookie.net/kancolle/images/4/42/Sound_b_bgm_50.ogg'},
	52: {url:'http://vignette1.wikia.nocookie.net/kancolle/images/7/7b/Sound_b_bgm_52.ogg'},
	53: {url:'http://vignette3.wikia.nocookie.net/kancolle/images/0/0e/Sound_b_bgm_53.ogg'},
	55: {url:'http://vignette4.wikia.nocookie.net/kancolle/images/6/61/Sound_b_bgm_55.ogg'},
	58: {url:'http://vignette1.wikia.nocookie.net/kancolle/images/3/38/Sound_b_bgm_58.ogg'},
	59: {url:'http://vignette2.wikia.nocookie.net/kancolle/images/4/44/Sound_b_bgm_59.ogg'},
	60: {url:'http://vignette3.wikia.nocookie.net/kancolle/images/d/d0/Sound_b_bgm_60.ogg'},
	61: {url:'http://vignette4.wikia.nocookie.net/kancolle/images/b/b7/Sound_b_bgm_61.ogg'},
	62: {url:'http://vignette2.wikia.nocookie.net/kancolle/images/2/2f/Sound_b_bgm_62.ogg'},
	63: {url:'http://vignette1.wikia.nocookie.net/kancolle/images/3/31/Sound_b_bgm_63.ogg'},
	64: {url:'http://vignette4.wikia.nocookie.net/kancolle/images/3/3c/Sound_b_bgm_64.ogg'},
	67: {url:'http://vignette1.wikia.nocookie.net/kancolle/images/2/20/Sound_b_bgm_67.ogg'},
	68: {url:'http://vignette1.wikia.nocookie.net/kancolle/images/e/e1/Sound_b_bgm_68.ogg'},
	70: {url:'http://vignette1.wikia.nocookie.net/kancolle/images/4/41/Sound_b_bgm_70.ogg'},
	71: {url:'http://vignette1.wikia.nocookie.net/kancolle/images/5/56/Sound_b_bgm_71.ogg'},
	72: {url:'http://vignette1.wikia.nocookie.net/kancolle/images/f/f0/Sound_b_bgm_72.ogg'},
	73: {url:'http://vignette3.wikia.nocookie.net/kancolle/images/7/7a/Sound_b_bgm_73.ogg'},
	107: {url:'http://vignette1.wikia.nocookie.net/kancolle/images/b/b2/107b.ogg'},
	998: {url:'https://dl.dropboxusercontent.com/u/79056688/savior%20of%20song.mp3'},
	999: {url:'https://dl.dropboxusercontent.com/u/79056688/Orel%20Cruising%20%26%20LSC%20Song%20%5BENG%20Sub%5D.mp3',voldef:.3},
	1001: {url:'http://vignette2.wikia.nocookie.net/kancolle/images/2/2f/103v.ogg'},
	2027: {url:'http://vignette4.wikia.nocookie.net/kancolle/images/0/06/Sound_bgm_almi.ogg'},
	2031: {url:'http://vignette4.wikia.nocookie.net/kancolle/images/b/b8/903y.ogg'},
};

