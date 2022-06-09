var TEXTDATA_EN = {
	"SORTIE_TITLE": {
		"text": "Sortie #<0> - Battle at <1>",
		"values": {}
	},
	"PVP_TITLE": {
		"text": "PVP #<0> - Fleet Practice",
		"values": {}
	},

	"SORTIE_START": {
		"text": "Sortied to <0>-<1> on <2>.",
		"values": {}
	},
	"PVP_START": {
		"text": "Beginning Fleet Practice.",
		"values": {}
	},
	"NODE_START": {
		"text": "-- Fleet Approching <b>Node <0></b> --",
		"values": {}
	},
	"FLEET_COMPOSITION": {
		"text": "Sortieing fleet consisting of:<br><b><0></b>",
		"values": {}
	},
	"COMBINED_FLEET_COMPOSITION": {
		"text": "Sortieing combined fleet consisting of <0> in the Main fleet and <1> in the Escort fleet.",
		"values": {}
	},
	"SUPPORT_FLEET_COMPOSITION": {
		"text": "<0> are on standby with <b><1></b> Support.",
		"values": {
			1: {
				1: "Node",
				2: "Boss"
			}
		}
	},
	"FORMATION_SELECT": {
		"text": "Fleet engaging enemy in <b><0></b> formation.",
		"values": {
			0: {
				1: "Line Ahead",
				2: "Double Line",
				3: "Diamond",
				4: "Echelon",
				5: "Line Abreast",
				6: "Vanguard",
				11: "Cruising Formation 1",
				12: "Cruising Formation 2",
				13: "Cruising Formation 3",
				14: "Cruising Formation 4",
			}
		}
	},
	"BATTLE_START": {
		"text": "Abyssal Fleet found at <b>Node <0></b>.",
		"values": {}
	},
	"DETECTION_F": {
		"text": "<0>.",
		"values": {
			0: {
				1: "Your plane <b><span style='color:green'>successfully detected</span></b> the enemy fleet",
				2: "Your plane <b><span style='color:green'>successfully detected</span></b> the enemy fleet but was <b><span style='color:red'>shot down</span></b>",
				3: "Your plane <b><span style='color:red'>failed to detect</span></b> the enemy fleet and was <b><span style='color:red'>shot down</span></b>",
				4: "Your plane <b><span style='color:red'>failed to detect</span></b> the enemy fleet",
				5: "Your fleet <b><span style='color:green'>successfully detected</span></b> the enemy fleet",
				6: "Your fleet <b><span style='color:red'>failed to detect</span></b> the enemy fleet",
			}
		}
	},
	"DETECTION_E": {
		"text": "<0>.",
		"values": {
			0: {
				1: "The enemy's plane <b><span style='color:green'>successfully detected</span></b> your fleet",
				2: "The enemy's plane <b><span style='color:green'>successfully detected</span></b> your fleet but was <b><span style='color:red'>shot down</span></b>",
				3: "The enemy's plane <b><span style='color:red'>failed to detect</span></b> your fleet and was <b><span style='color:red'>shot down</span></b>",
				4: "The enemy's plane <b><span style='color:red'>failed to detect</span></b> your fleet",
				5: "The enemy fleet <b><span style='color:green'>successfully detected</span></b> your fleet",
				6: "The enemy fleet <b><span style='color:red'>failed to detect</span></b> your fleet",
			}
		}
	},
	"ENEMY_FORMATION": {
		"text": "The enemy fleet is a <b><0></b> fleet in <b><1></b>.",
		"values": {
			0: {
				0: "single",
				1: "combined",
			},
			1: {
				1: "Line Ahead",
				2: "Double Line",
				3: "Diamond",
				4: "Echelon",
				5: "Line Abreast",
				11: "Cruising Formation 1",
				12: "Cruising Formation 2",
				13: "Cruising Formation 3",
				14: "Cruising Formation 4",
			}
		}
	},
	"ENEMY_COMPOSITION": {
		"text": "The enemy fleet consists of:<br><b><0><b>",
		"values": {}
	},
	"AIR_NONE": {
		"text" : "No Air Battle",
		"values": {}
	},
	"AIR_START": {
		"text" : "<b><0></b> sent <b><1></b> fighters and <b><2></b> bombers to battle.",
		"values": {}
	},

	"AIR_STAGE1_LOSS": {
		"text" : "<0> fleet lost <b><1></b> planes in the dogfight.",
		"values": {
			0: {
				0: "Ally",
				1: "Enemy"
			}
		}
	},
	"AIR_SUPERIORITY": {
		"text": "Fleet has gained <b><0></b> against the enemy.",
		"values": {
			0: {
				0: "Air Parity (AP)",
				1: "<span style='color:green'>Air Supremacy (AS+)</span>",
				2: "<span style='color:green'>Air Superiority (AS)</span>",
				3: "<span style='color:red'>Air Denial (AD)</span>",
				4: "<span style='color:red'>Air Incapability (AI)</span>"
			}
		}
	},
	"AIR_CONTACT_F": {
		"text": "Ally <b><0></b> has made <b>contact</b> with the enemy.",
		"values": {}
	},
	"AIR_CONTACT_E": {
		"text": "Enemy <b><0></b> has made <b>contact</b> with the fleet.",
		"values": {}
	},
	"AIR_AACI": {
		"text": "<b><0></b> uses type <b><1></b> AACI.",
		"values": {
			1: {
				1: "1 (H.H.R.)",
				2: "2 (H.R.)",
				3: "3 (H.H.)",
				4: "4 (M.S.A.R.)",
				5: "5 (B.B.R.)",
				6: "6 (M.S.A.)",
				7: "7 (H.A.R.)",
				8: "8 (B.R.)",
				9: "9 (H.A.)",
				10:	"10 (H.C.R.)",
				11:	"11 (H.C.)",
				12:	"12 (C.G.R.)",
				14:	"14 (H.G.R.)",
				15:	"15 (H.G.)",
				16:	"16 (H.G.R.)",
				17:	"17 (H.G.)",
				18:	"18 (C.)",
				19:	"19 (H.C.)",
				20:	"20 (C.)"
			}
		}
	},
	"AIR_STAGE2_LOSS": {
		"text" : "<0> fleet shot down <b><1></b> <2> bombers.",
		"values": {
			0: {
				0: "Allied",
				1: "Enemy"
			},
			2: {
				0: "allied",
				1: "enemy"
			}
		}
	},		
	"AIR_DAMAGE": {
		"text": "<0> <b><1>hit</b> <b><2></b> dealing <b><3></b> damage.",
		"values": {
			0: {
				0: "Dive Bombers",
				1: "Torpedo Bombers"
			},
			1: {
				0: "",
				1: "<span style='color:#D5AD13'>critically</span> "
			}
		}
	},
	"AIR_BASE_RESCUE": {
		"text": "<b>Catalina rescue:</b> level <b><0></b>",
		"values": {}
	},
	"SUPPORT_START": {
		"text": "The <0> support fleet has arrived with <b><1></b>.",
		"values": {
			0 : {
				0: "Node",
				1: "Boss"
			},
			1: {
				1: "Aerial Support",
				2: "Support Shelling", 
				3:"Long Range Torpedo Attack"
			}
		}
	},
	"SUPPORT_DAMAGE": {

	},
	"OPTORP_ATTACK": {
		"text": "<b><0></b> launch a pre-emptive torpedo strike.",
		"values": {

		}
	},
	"OPTORP_DAMAGE": {
		"text": "<b><0></b> launch a pre-emptive torpedo strike.",
		"values": {

		}
	},
	"ENGAGEMENT": {
		"text": "Fleet has a <b><0></b> against the enemy.",
		"values": {
			0:{
				1: "Parallel Engagement",
				2: "Head-on Engagement",
				3: "T Advantage",
				4:"T Disadvantage"
			}
		}
	},
	"SHELL_START": {
		"text": "Beginning <0> Shelling Phase.",
		"values": {
			0:{
				1: "First",
				2: "Second",
				3: "Escort"
			}
		}
	},
	"SHELL_DAMAGE": {
		"text": "<b><0></b> is hit with a <b><1></b> dealing <b><2></b> damage.",
		"values": {
			1: {
				1: "Normal Attack",
				2: "<span style='color:#D5AD13'>Critical</span> Attack"
			}
		}
	},
	"SHELL_MISS": {
		"text": "<b><0></b> avoided the attack.",
		"values": {}
	},
	"SHELL_DAMAGE_DOUBLE": {
		"text": "<b><0></b> is hit with a <b><1></b> dealing <b><2></b> damage and a <b><3></b> dealing <b><4></b> damage.",
		"values": {
			1: {
				1: "Normal Attack",
				2: "<span style='color:#D5AD13'>Critical</span> Attack"
			},
			3: {
				1: "Normal Attack",
				2: "<span style='color:#D5AD13'>Critical</span> Attack"
			}
		}
	},
	"SHELL_TARGET": {
		"text": "<b><0></b> <1>attacks <b><2></b>.",
		"values": {
			1: {
				0: "",
				1: "laser ",
				2: "double ", 
				3: "cut-in ",
				4: "radar cut-in ",
				5: "AP cut-in ",
				6: "gun cut-in ",
				7: "carrier cut-in ",
				100: "Nelson Touch ",
				101: "Nagato Special ",
				102: "Mutsu Special ",
				103: "Colorado Special ",
				104: "Kongou Special ",
				200: "Zuiun cut-in ",
				201: "Suisei cut-in ",
				300: "Submarine Fleet Special ",
				301: "Submarine Fleet Special ",
				302: "Submarine Fleet Special ",
				400: "Yamato Special (3 ship) ",
				401: "Yamato Special (2 ship) ",
			}
		}
	},
	"TORP_ATTACK": {
		"text": "<b><0></b> launch torpedoes.",
		"values": {

		}
	},
	"TORP_DAMAGE": {
		"text": "<b><0></b>'s torpedoes <3>hit <b><1></b> dealing <b><2></b> damage.",
		"values": {
			3: {
				1: "",
				2: "<span style='color:#D5AD13'><b>critically</b> </span>"
			}
		}
	},
	"PROTECT_DAMAGE": {
		"text": "<b><0></b> protects flagship from a <b><1></b> taking <b><2></b> damage.",
		"values": {
			1: {
				1: "Normal Attack",
				2: "<span style='color:#D5AD13'>Critical</span> Attack"
			}
		}
	},
	"PROTECT_DAMAGE_DOUBLE": {
		"text": "<b><0></b> protects flagship from a <b><1></b> dealing <b><2></b> damage and a <b><3></b> dealing <b><4></b> damage.",
		"values": {
			1: {
				1: "Normal Attack",
				2: "<span style='color:#D5AD13'>Critical</span> Attack"
			},
			3: {
				1: "Normal Attack",
				2: "<span style='color:#D5AD13'>Critical</span> Attack"
			}
		}
	},
	"PROTECT_MISS": {
		"text": "<b><0></b> protects flagship from an attack which misses.",
		"values": {
			
		}
	},
	"DAY_END": {

	},
	"NIGHT_START": {
		"text": "Entering Night Battle.",
		"values": {}
	},
	"NIGHT_COMBINED_START": {
		"text": "Escort fleet entering night battle against enemy <b><0> fleet</b>.",
		"values": {
			0: {
				0: "Main",
				1: "Escort"
			}
		}
	},
	"NIGHT_TARGET": {
		"text": "<b><0></b> attacks <b><1></b> with a <b><2></b>.",
		"values": {
			2: {
				0: "normal attack",
				1: "double attack",
				2: "mixed cut-in", 
				3: "torpedo cut-in",
				4: "gun cut-in (secondary)",
				5: "gun cut-in (main)",
				6: "carrier cut-in",
				7: "gun-torpedo-radar cut-in",
				8: "torpedo-radar-lookout cut-in",
				9: "torpedo-lookout-torpedo cut-in",
				10: "torpedo-lookout-drum cut-in",
				11: "gun-torpedo-radar cut-in",
				12: "torpedo-radar-lookout cut-in",
				13: "torpedo-lookout-torpedo cut-in",
				14: "torpedo-lookout-drum cut-in",
				100: "Nelson Touch",
				101: "Nagato Special",
				102: "Mutsu Special",
				103: "Colorado Special",
				104: "Kongou Special",
				300: "Submarine Fleet Special",
				301: "Submarine Fleet Special",
				302: "Submarine Fleet Special",
				400: "Yamato Special (3 ship)",
				401: "Yamato Special (2 ship)",
			}
		}
	},
	"SHIP_END": {
		"text": "<b><0></b> <1>.",
		"values": {
			1: {
				0: "has been <b><span style='color:blue'>sunk</span></b>",
				1: "is no longer able to continue fighting"
			}
		}
	},
	"SHIP_REPAIR": {
		"text": "<b><0></b> <1>recovered using a <b><span style='color:green'><2></span></b>.",
		"values": {
			1: {
				0: "",
				1: "completely "
			},
			2: {
				0: "Repair Team",
				1: "Repair Goddess "
			}
		}
	},
	"BATTLE_END": {
		"text": "Battle Ending. Fleet has achieved <b><0></b> against the enemy.",
		"values": {
			0: {
				"S+": "<span style='color:green'>Total Victory (S)</span>",
				"S": "<span style='color:green'>Victory (S)</span>",
				"A": "<span style='color:green'>Victory (A)</span>",
				"B": "<span style='color:green'>Tactical Victory (B)</span>",
				"C": "<span style='color:red'>Tactical Defeat (C)</span>",
				"D": "<span style='color:red'>Defeat (D)</span>",
				"E": "<span style='color:red'>Complete Defeat (E)</span>"
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