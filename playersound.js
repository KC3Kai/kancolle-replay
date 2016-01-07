function SoundManager() {
	this._mute = false;
	this._volume = 1;
	Howler.volume(.6);
	this._bgm = null;
	this.BGMnum = 0;
	this._sounds = {};
	for (name in SOUNDNAMES) {
		var vol = (SOUNDNAMES[name].voldef)? SOUNDNAMES[name].voldef : .4;
		this._sounds[name] = new Howl({urls:[SOUNDNAMES[name].path],volume:vol*this._volume});
	}
}
var SOUNDNAMES = {
	'crit': { path: 'assets/sounds/49_res.sounds.battle.SE_battle_bomb3.mp3',voldef:.35 },
	'hit': { path: 'assets/sounds/50_res.sounds.battle.SE_battle_bomb2.mp3',voldef:.35 },
	'fire': { path: 'assets/sounds/51_res.sounds.battle.SE_battle_bomb1.mp3',voldef:.35 },
	'torpedo': { path: 'assets/sounds/41_res.sounds.battle.SE_battle_gyorai.mp3' },
	'planelaunch': { path: 'assets/sounds/38_res.sounds.battle.SE_battle_plane1.mp3',voldef:.35 },
	'planeatk': { path: 'assets/sounds/36_res.sounds.battle.SE_battle_shoot.mp3',voldef:1 },
	'shutters': { path: 'assets/sounds/29_res.sounds.SE_frame_close.mp3' },
	'enter': { path: 'assets/sounds/48_res.sounds.battle.SE_battle_card.mp3',voldef:.3 },
	'airphase': { path: 'assets/sounds/42_res.sounds.battle.SE_battle_fannelCutIn.mp3',voldef:.35 },
	'aaci': { path: 'assets/sounds/52_res.sounds.battle.SE_Bam.mp3' },
}
SoundManager.prototype = {
	play: function(name,vol,loop) {
		//if (this._mute) return undefined;
		this._sounds[name].play();
		return this._sounds[name];
	},
	playBGM: function(num,vol) {
		if (!vol) vol = (BGMLIST[num].voldef)? BGMLIST[num].voldef : .4,
		this._bgm = new Howl({
			urls:[BGMLIST[num].url],
			volume:vol*this._volume,
			loop:true
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
	}
}

var BGMLIST = {
	1: {url:'http://vignette2.wikia.nocookie.net/kancolle/images/d/dd/Sound_b_bgm_1.ogg',voldef:.7},
	2: {url:'http://vignette4.wikia.nocookie.net/kancolle/images/f/fd/Sound_b_bgm_2.ogg'},
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
	19: {url:'http://vignette4.wikia.nocookie.net/kancolle/images/e/ec/Sound_b_bgm_19.ogg'},
	20: {url:'http://vignette1.wikia.nocookie.net/kancolle/images/2/2a/Sound_b_bgm_20.ogg'},
	22: {url:'http://vignette4.wikia.nocookie.net/kancolle/images/b/bb/Sound_b_bgm_22.ogg'},
	29: {url:'http://vignette1.wikia.nocookie.net/kancolle/images/c/c8/Sound_b_bgm_29.ogg'},
	30: {url:'http://vignette1.wikia.nocookie.net/kancolle/images/9/94/Sound_b_bgm_30.ogg'},
	37: {url:'http://vignette2.wikia.nocookie.net/kancolle/images/0/00/Sound_b_bgm_37.ogg',voldef:.4},
	38: {url:'http://vignette4.wikia.nocookie.net/kancolle/images/f/fd/Sound_b_bgm_38.ogg'},
	39: {url:'http://vignette2.wikia.nocookie.net/kancolle/images/c/c0/Sound_b_bgm_39.ogg'},
	40: {url:'http://vignette3.wikia.nocookie.net/kancolle/images/d/da/Sound_b_bgm_40.ogg'},
	46: {url:'http://vignette1.wikia.nocookie.net/kancolle/images/8/89/Sound_b_bgm_46.ogg'},
	47: {url:'http://vignette4.wikia.nocookie.net/kancolle/images/5/55/Sound_b_bgm_47.ogg'},
	49: {url:'http://vignette4.wikia.nocookie.net/kancolle/images/4/4f/Sound_b_bgm_49.ogg'},
	50: {url:'http://vignette2.wikia.nocookie.net/kancolle/images/4/42/Sound_b_bgm_50.ogg'},
	52: {url:'http://vignette1.wikia.nocookie.net/kancolle/images/7/7b/Sound_b_bgm_52.ogg'},
	53: {url:'http://vignette3.wikia.nocookie.net/kancolle/images/0/0e/Sound_b_bgm_53.ogg'},
	55: {url:'http://vignette4.wikia.nocookie.net/kancolle/images/6/61/Sound_b_bgm_55.ogg'},
	999: {url:'https://dl.dropboxusercontent.com/u/79056688/Orel%20Cruising%20%26%20LSC%20Song%20%5BENG%20Sub%5D.mp3',voldef:.3},
};