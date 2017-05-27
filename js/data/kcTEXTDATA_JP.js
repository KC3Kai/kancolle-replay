var TEXTDATA_JP = {
	"SORTIE_TITLE": {
		"text": "出撃 #<0> - 海域：<1>",
		"values": {}
	},
	"PVP_TITLE": {
		"text": "PVP #<0> - 艦隊演習",
		"values": {}
	},

	"SORTIE_START": {
		"text": "ルート <2>: <0>-<1> ",
		"values": {}
	},
	"PVP_START": {
		"text": "演習開始",
		"values": {}
	},
	"NODE_START": {
		"text": "-- 艦隊到着 <b><0></b> マス--",
		"values": {}
	},
	"FLEET_COMPOSITION": {
		"text": "出撃艦隊編成：<br><b><0></b>",
		"values": {}
	},
	"COMBINED_FLEET_COMPOSITION": {
		"text": "聯合艦隊編成： 第1艦隊：<0> 第2艦隊： <1> ",
		"values": {}
	},
	"SUPPORT_FLEET_COMPOSITION": {
		"text": "<b><1></b>支援編成：<0> ",
		"values": {
			1: {
				1: "前衛",
				2: "決戦"
			}
		}
	},
	"FORMATION_SELECT": {
		"text": "<span style='color:green'>我方</span>陣形：<b><0></b> .",
		"values": {
			0: {
				1: "単縦陣",
				2: "複縦陣",
				3: "輪形陣",
				4: "梯形陣",
				5: "単横陣",
				11: "第一警戒航行序列(対潜警戒)",
				12: "第二警戒航行序列(前方警戒)",
				13: "第三警戒航行序列(輪形陣)　",
				14: "第四警戒航行序列(戦闘隊形)",
			}
		}
	},
	"BATTLE_START": {
		"text": "戦闘マス：<b><0></b>.",
		"values": {}
	},
	"DETECTION_F": {
		"text": "<span style='color:green'>我方</span> <0>.",
		"values": {
			0: {
				1: "艦載機<b><span style='color:green'>索敵成功</span></b> ",
				2: "艦載機<b><span style='color:green'>索敵成功</span></b>，<b><span style='color:red'>艦載機未帰還</span></b>",
				3: "艦載機<b><span style='color:red'>索敵失敗</span></b> <b><span style='color:red'>艦載機未帰還</span></b>",
				4: "艦載機<b><span style='color:red'>索敵失敗</span></b> ",
				5: "艦隊<b><span style='color:green'>索敵成功</span></b> ",
				6: "艦隊<b><span style='color:red'>索敵失敗</span></b> ",
			}
		}
	},
	"DETECTION_E": {
		"text": "<span style='color:red'>敵方</span> <0>.",
		"values": {
			0: {
				1: "艦載機<b><span style='color:green'>索敵成功</span></b> ",
				2: "艦載機<b><span style='color:green'>索敵成功</span></b>，<b><span style='color:red'>艦載機未帰還</span></b>",
				3: "艦載機<b><span style='color:red'>索敵失敗</span></b> <b><span style='color:red'>艦載機未帰還</span></b>",
				4: "艦載機<b><span style='color:red'>索敵失敗</span></b> ",
				5: "艦隊<b><span style='color:green'>索敵成功</span></b> ",
				6: "艦隊<b><span style='color:red'>索敵失敗</span></b> ",
			}
		}
	},
	"ENEMY_FORMATION": {
		"text": "<span style='color:red'>敵方</span> <b><0></b> 艦隊陣形：<b><1></b>.",
		"values": {
			0: {
				0: "単",
				1: "聯合",
			},
			1: {
				1: "単縦陣",
				2: "复縦陣",
				3: "轮形陣",
				4: "梯形陣",
				5: "単横陣",
				11: "第一警戒航行序列（反潜陣形）",
				12: "第二警戒航行序列（复縦陣形）",
				13: "第三警戒航行序列（轮形陣）",
				14: "第四警戒航行序列（战斗陣形）",
			}
		}
	},
	"ENEMY_COMPOSITION": {
		"text": "敵方艦隊配置:<br><b><0><b>",
		"values": {}
	},
	"AIR_NONE": {
		"text" : "航空戦未発生",
		"values": {}
	},
	"AIR_START": {
		"text" : "戦闘機合計：<b><1></b> 機， 攻撃機合計： <b><2></b> 機 <br>航空戦に参加した者：<br><b><0></b>",
		"values": {}
	},

	"AIR_STAGE1_LOSS": {
		"text" : "<0> がＳ１で損失 <b><span style='color:red'><1></span></b> 機",
		"values": {
			0: {
				0: "<span style='color:green'>我方</span>",
				1: "<span style='color:red'>敵方</span>"
			}
		}
	},
	"AIR_SUPERIORITY": {
		"text": "制空権：<b><0></b> ",
		"values": {
			0: {
				0: "航空均衡",
				1: "<span style='color:green'>制空権確保</span>",
				2: "<span style='color:green'>航空優勢</span>",
				3: "<span style='color:red'>航空劣勢</span>",
				4: "<span style='color:red'>制空権丧失</span>"
			}
		}
	},
	"AIR_CONTACT_F": {
		"text": "触接発生： 我方の航空機<b><0></b><b><span style='color:green'>触接成功</span></b>",
		"values": {}
	},
	"AIR_CONTACT_E": {
		"text": "触接発生： 敵方の航空機<b><0></b><b><span style='color:red'>触接成功</span></b>",
		"values": {}
	},
	"AIR_AACI": {
		"text": "<b><0></b>の対空カットインが発動成功、種別：<b><1></b>",
		"values": {
			1: {
				1: "(H.H.R.)+7,1.7倍",
				2: "(H.R.)+6,1.7倍",
				3: "(H.H.)+4,1.6倍",
				4: "(M.S.A.R.)+6, 1.5倍",
				5: "(B.B.R.)+4,1.5倍",
				6: "(M.S.A.)+4,1.45倍",
				7: "(H.A.R.)+3,1.35倍",
				8: "(B.R.)+4,1.4倍",
				9: "(H.A.)+2,1.3倍",
				10:	"(H.C.R.)+8,1.65倍",
				11:	"(H.C.)+6,1.5倍",
				12:	"(C.G.R.)+3,1.25倍",
				14:	"(H.G.R.)+4,1.45倍",
				15:	"(H.G.)+3,1.3倍",
				16:	"(H.G.R.)+4,1.4倍",
				17:	"(H.G.)+2,1.25倍",
				18:	"(C.)+2,1.2倍",
				19:	"(H.C.)+5,1.45倍",
				20:	"(C.)+3,1.25倍"
			}
		}
	},
	"AIR_STAGE2_LOSS": {
		"text" : "<0> Ｓ２で艦隊击坠 <b><1></b> <2> 機",
		"values": {
			0: {
				0: "<span style='color:green'>我方</span>",
				1: "<span style='color:red'>敵方</span>"
			},
			2: {
				0: "<span style='color:green'>我方</span>",
				1: "<span style='color:red'>敵方</span>"
			}
		}
	},		
	"AIR_DAMAGE": {
		"text": "<0> から <b><2></b> に <b><3></b> <1> ダメージ与えた.",
		"values": {
			0: {
				0: "<span style='color:red'>舰爆</span>",
				1: "<span style='color:blue'>舰攻</span>"
			},
			1: {
				0: "",
				1: "<b><span style='color:red'></span><b>"
			}
		}
	},
	"SUPPORT_START": {
		"text": "<span style='color:blue'><0> 支援艦隊到着！<b><1></b>開始!</span>",
		"values": {
			0 : {
				0: "前衛",
				1: "決戦"
			},
			1: {
				1: "航空支援",
				2: "炮击支援", 
				3: "雷击支援"
			}
		}
	},
	"SUPPORT_DAMAGE": {

	},
	"OPTORP_ATTACK": {
		"text": "<b><0></b> 发动了開幕雷撃",
		"values": {

		}
	},
	"OPTORP_DAMAGE": {
		"text": "<b><0></b> 发动了開幕雷撃",
		"values": {

		}
	},
	"ENGAGEMENT": {
		"text": "交戦形態：<b><0></b> ",
		"values": {
			0:{
				1: "同航戦",
				2: "反航戦",
				3: "<span style='color:green'>T字戦有利</span>",
				4: "<span style='color:red'>T字戦不利</span>"
			}
		}
	},
	"SHELL_START": {
		"text": "<b><span style='color:blue'> <0> 砲撃戦開始！</span></b>",
		"values": {
			0:{
				1: "第1艦隊第一轮",
				2: "第1艦隊第二轮",
				3: "第2艦隊"
			}
		}
	},
	"SHELL_DAMAGE": {
		"text": "命中 (<b><2></b>)点<b><1></b>ダメージ",
		"values": {
			1: {
				1: "",
				2: "<b><span style='color:red'>クリティカル</span></b>"
			}
		}
	},
	"SHELL_MISS": {
		"text": "<span style='color:green'>MISS</span>",
		"values": {}
	},
	"SHELL_DAMAGE_DOUBLE": {
		"text": "命中（<b><1></b> <b><2></b>，<b><3></b> <b><4></b>）ダメージ",
		"values": {
			1: {
				1: "",
				2: "<b><span style='color:red'>クリティカル</span></b>"
			},
			3: {
				1: "",
				2: "<b><span style='color:red'>クリティカル</span></b>"
			}
		}
	},
	"SHELL_TARGET": {
		"text": "<b><0></b> <b><span style='color:#D5AD13'> <1> </span></b> → <b><2></b>.",
		"values": {
			1: {
				0: "",
				1: "(レーザー) ",
				2: "(連撃) ", 
				3: "(主副CI) ",
				4: "(主電CI) ",
				5: "(主副徹CI) ",
				6: "(主主徹CI) "
			}
		}
	},
	"TORP_ATTACK": {
		"text": "<span style='color:blue'>雷撃戦：<b><0></b> が魚雷攻撃を実行。</span>",
		"values": {

		}
	},
	"TORP_DAMAGE": {
		"text": "<b><0></b> → <b><1></b> 命中 (<b><2></b>) ダメージ",
		"values": {
			3: {
				1: "",
				2: "<b><span style='color:red'></span><b>"
			}
		}
	},
	"PROTECT_DAMAGE": {
		"text": "<b><span style='color:blue'>旗艦をかばう：</span></b> <b><0></b> ==> <b><1></b> 代わりに(<b><3></b>)<b><2></b>ダメージを受けた",
		"values": {
			2: {
				1: "",
				2: "<span style='color:red'>クリティカル<b>"
			}
		}
	},
	"PROTECT_MISS": {
		"text": "<b><span style='color:blue'>旗艦をかばう：</span></b> <b><0></b> ==> <b><1></b> <span style='color:blue'>MISS</span>",
		"values": {
			
		}
	},
	"DAY_END": {

	},
	"NIGHT_START": {
		"text": "<b><span style='color:blue'>夜戦開始</span></b>",
		"values": {}
	},
	"NIGHT_COMBINED_START": {
		"text": "<b><span style='color:blue'>夜戦：</span></b>我方 第2艦隊 对陣 敵方 <b><0></b>.",
		"values": {
			0: {
				0: "第1艦隊",
				1: "第2艦隊"
			}
		}
	},
	"NIGHT_TARGET": {
		"text": "<b><0></b> <b><span style='color:#D5AD13'> <2> </span></b> →  <b><1></b>",
		"values": {
			2: {
				0: "",
				1: "連撃",
				2: "混合CI", //mix cut-in
				3: "雷击CI",
				4: "主副CI",
				5: "砲撃CI"
			}
		}
	},
	"SHIP_END": {
		"text": "<b><0></b> <1>.",
		"values": {
			1: {
				0: "が <b><span style='color:blue'>に撃沈された</span></b>",
				1: "戦闘不能"
			}
		}
	},
	"BATTLE_END": {
		"text": "<span style='color:blue'>戦闘終了，我方 </span><b><0></b>",
		"values": {
			0: {
				"S+": "<span style='color:green'>(SS)完全胜利</span>",
				"S": "<span style='color:green'>(S)胜</span>",
				"A": "<span style='color:green'>(A)胜</span>",
				"B": "<span style='color:#D5AD13'>(B)胜</span>",
				"C": "<span style='color:red'>(C)败</span>",
				"D": "<span style='color:red'>(D)败</span>",
				"E": "<span style='color:red'>(E)彻底失敗</span>"
			}
		}
	},
	
	"TITLE_BATTLE_START": {
		"text": "BATTLE START",
	},
	"TITLE_FORMATION": {
		"text": "FORMATION",
	},
	"TITLE_DETECTION": {
		"text": "DETECTION",
	},
	"TITLE_LAND_BASE_JET_BOMBING": {
		"text": "LAND BASE JET BOMBING",
	},
	"TITLE_JET_BATTLE": {
		"text": "JET BATTLE",
	},
	"TITLE_LAND_BASE_BOMBING": {
		"text": "LAND BASE BOMBING",
	},
	"TITLE_AIR_BATTLE": {
		"text": "AIR BATTLE",
	},
	"TITLE_SUPPORTING_FIRE": {
		"text": "SUPPORTING FIRE",
	},
	"TITLE_OPENING_ASW": {
		"text": "OPENING ASW",
	},
	"TITLE_OPENING_TORPEDO": {
		"text": "OPENING TORPEDOES",
	},
	"TITLE_SHELLING_PHASE": {
		"text": "SHELLING PHASE",
	},
	"TITLE_NIGHT_BATTLE": {
		"text": "NIGHT BATTLE",
	},
};