var TEXTDATA = {
	"SORTIE_TITLE": {
			"text": "Battle at <0> on <1>",
			"values": {}
		},
		"PVP_TITLE": {
			"text": "Fleet Practice",
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
		"FLEET_COMPOSITION": {
			"text": "Sortieing fleet consisting of <0>",
			"values": {}
		},
		"COMBINDED_FLEET_COMPOSITION": {
			"text": "Sortieing combined fleet consisting of <0> in the fleet.MAIN_FLEET fleet and <1> in the fleet.ESCORT_FLEET fleet.",
			"values": {}
		},
		"SUPPORT_FLEET_COMPOSITION": {
			"text": "<0> are on standby with <1> Support.",
			"values": {
				1: {
					1: "Node",
					2: "Boss"
				}
			}
		},
		"FORMATION_SELECT": {
			"text": "Fleet engaging enemy in <0> formation.",
			"values": {
				0: {
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
		"BATTLE_START": {
			"text": "Abyssal Fleet found at Node <0>.",
			"values": {}
		},
		"DETECTION_F": {
			"text": "<0>.",
			"values": {
				0: {
					1: "Your plane successfully detected the enemy fleet",
					2: "Your plane successfully detected the enemy fleet but was shot down",
					3: "Your plane failed to detect the enemy fleet and was shot down",
					4: "Your plane failed to detect the enemy fleet",
					5: "Your fleet successfully detected the enemy fleet",
					6: "Your fleet failed to detect the enemy fleet",
				}
			}
		},
		"DETECTION_E": {
			"text": "<0>.",
			"values": {
				0: {
					1: "The enemy's plane successfully detected your fleet",
					2: "The enemy's plane successfully detected your fleet but was shot down",
					3: "The enemy's plane failed to detect your fleet and was shot down",
					4: "The enemy's plane failed to detect your fleet",
					5: "The enemy fleet successfully detected your fleet",
					6: "The enemy fleet failed to detect your fleet",
				}
			}
		},
		"ENEMY_FORMATION": {
			"text": "The enemy fleet is a <0> fleet in <1>.",
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
			"text": "The enemy fleet consists of <0>.",
			"values": {}
		},
		"AIR_NONE": {
			"text" : "No Air Battle",
			"values": {}
		},
		"AIR_START": {
			"text" : "<0> send <1> figthers and <2> bombers to battle.",
			"values": {}
		},

		"AIR_STAGE1_LOSS": {
			"text" : "<0> fleet lost <1> fighters in the dogfight.",
			"values": {
				0: {
					0: "Ally",
					1: "Enemy"
				}
			}
		},
		"AIR_SUPERIORITY": {
			"text": "Fleet has gained <0> against the enemy.",
			"values": {
				0: {
					0: "Air Parity (AP)",
					1: "Air Supremacy (AS+)",
					2: "Air Superiority (AS)",
					3: "Air Denial (AD)",
					4: "Air Incapability (AI)"
				}
			}
		},
		"AIR_CONTACT_F": {
			"text": "Ally <0> has made contact with the enemy.",
			"values": {}
		},
		"AIR_CONTACT_E": {
			"text": "Enemy <0> has made contact with the fleet.",
			"values": {}
		},
		"AIR_AACI": {
			"text": "<0> uses <1> type AACI.",
			"values": {
				1: {
					1: "H.H.R.",
					2: "H.R.",
					3: "H.H.",
					4:	"M.S.A.R.",
					5:	"B.B.R.",
					6:	"M.S.A.",
					7:	"H.A.R.",
					8:	"B.R.",
					9:	"H.A.",
					10:	"H.C.R.",
					11:	"H.C.",
					12:	"C.G.R.",
					14:	"H.G.R.",
					15:	"H.G.",
					16:	"H.G.R.",
					17:	"H.G.",
					18:	"C.",
					19:	"H.C.",
					20:	"C."
				}
			}
		},
		"AIR_STAGE2_LOSS": {
			"text" : "<0> fleet shot down <1> <2> bombers.",
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
			"text": "<0> <1>hit <2> dealing <3> damage.",
			"values": {
				0: {
					0: "Dive Bombers",
					1: "Torpedo Bombers"
				},
				1: {
					0: "",
					1: "critically "
				}
			}
		},
		"SUPPORT_START": {
			"text": "The <0> support fleet has arrived with <1>",
			"values": {
				0 : {
					1: "Node",
					2: "Boss"
				},
				1: {
					1: "Aerial Support",
					2: "Long Range Torpedo Attack", 
					3:"Support Shelling"
				}
			}
		},
		"SUPPORT_DAMAGE": {

		},
		"OPTORP_ATTACK": {
			"text": "<0> launch a pre-emptive torpedo strike.",
			"values": {

			}
		},
		"OPTORP_DAMAGE": {
			"text": "<0> launch a pre-emptive torpedo strike.",
			"values": {

			}
		},
		"ENGAGEMENT": {
			"text": "Fleet has a <0> against the enemy",
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
			"text": "Beginning <0> Shelling Phase",
			"values": {
				0:{
					1: "Main (Range)",
					2: "Main (Line-up)",
					3: "Escort"
				}
			}
		},
		"SHELL_DAMAGE": {
			"text": "<0> is hit with a <1> dealing <2> damage",
			"values": {
				1: {
					1: "Normal Attack",
					2: "Critical Attack"
				}
			}
		},
		"SHELL_MISS": {
			"text": "<0> avoided the attack",
			"values": {}
		},
		"SHELL_DAMAGE_DOUBLE": {
			"text": "<0> is hit with a <1> dealing <2> damage and a <3> dealing <4> damage",
			"values": {
				1: {
					1: "Normal Attack",
					2: "Critical Attack"
				},
				3: {
					1: "Normal Attack",
					2: "Critical Attack"
				}
			}
		},
		"SHELL_TARGET": {
			"text": "<0> <1>attacks <2>",
			"values": {
				1: {
					0: "",
					1: "laser ",
					2: "double ", 
					3: "cut-in ",
					4: "radar cut-in ",
					5: "AP cut-in ",
					6: "gun cut-in "
				}
			}
		},
		"TORP_ATTACK": {
			"text": "<0> luanches torpedos",
			"values": {

			}
		},
		"TORP_DAMAGE": {
			"text": "<0>'s torpedoes hit <1> dealing <2> damage",
			"values": {

			}
		},
		"PROTECT_DAMAGE": {
			"text": "<0> protects <1> from a <2> taking <3> damage",
			"values": {
				2: {
					1: "Normal Attack",
					2: "Critical Attack"
				}
			}
		},
		"PROTECT_MISS": {
			"text": "<0> gets <1> out of the line of fire",
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
			"text": "Escort fleet Entering night battle agasinst enemy {0} fleet.",
			"values": {
				0: {
					0: "Main",
					1: "Escort"
				}
			}
		},
		"NIGHT_TARGET": {
			"text": "<0> attacks <1> with a <2>.",
			"values": {
				2: {
					0: "normal attack",
					1: "double attack",
					2: "mixed cut-in", 
					3: "topedo cut-in",
					4: "gun cut-in (secondary)",
					5: "gun cut-in (main)"
				}
			}
		},
		"SHIP_END": {
			"text": "<0> <1>.",
			"values": {
				1: {
					0: "has been sunk",
					1: "is no longer able to continue fighting"
				}
			}
		},
		"BATTLE_END": {
			"text": "Battle Ending. Fleet has achieved <0> against the enemy.",
			"values": {
				0: {
					"S+": "Total Victory",
					"S": "Victory (S)",
					"A": "Victory (A)",
					"B": "Tactical Victory",
					"C": "Tactical Defeat",
					"D": "Defeat",
					"E": "Complete Defeat"
				}
			}
		}
};