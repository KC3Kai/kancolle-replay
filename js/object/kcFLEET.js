const SHIP = function(data, hp, max) {
	this.mid;
	this.name;
	this.curHP = hp;
	this.MaxHP = max;
	this.damecoms = [];

	if(data.mst_id) {
		this.mid = data.mst_id;

		for(var i = 0; i < data.equip.length; i++) {
			if(data.equip[i] === 0)
				break;
			if(EQDATA[data.equip[i]].type === REPAIR) {
				this.damecoms.push(data.equip[i]);
			}
		}
	} else {
		this.mid = data;
	}
	
	this.name = getShipName(this.mid);
}

Object.assign(SHIP.prototype, {
    constructor: SHIP,

    damage: function(dam) {
        this.curHP -= Math.floor(dam);
    },

    isSunk: function() {
        return this.curHP <= 0;
    },

	hasDameCom: function() {
		return this.damecoms.length > 0;
	},

	useDameCom: function() {
		damecom = this.damecoms.shift();

		if(damecom) {
			if(damecom === 42)
				this.curHP = this.MaxHP/4;
			else if(damecom === 43)
				this.curHP = this.MaxHP; 
		} 
		return damecom - 42;
	}

});

const FLEET = function() {
	this.mainFleet;
	this.escortFleet;
	this.supportNode;
	this.supportBoss;
};

Object.assign(FLEET.prototype, {
	constructor: FLEET,

	addFleet: function(fleet, hp, hpMax) {
		this.mainFleet = [];
		for (var i = 0; i < fleet.length; i++) {
			if ((fleet[i].mst_id && fleet[i].mst_id == -1) || fleet[i] == -1)
				continue;
			this.mainFleet.push(new SHIP(fleet[i], hp[i], hpMax[i]));
		}
	},

	addCombinedFleet: function(main, escort, hp, hpMax, ehp, ehpMax, combinedType) {
		this.mainFleet = [], this.escortFleet = [];;
		this.combined = combinedType;
		for (var i = 0; i < main.length; i++) {
			this.mainFleet.push(new SHIP(main[i], hp[i], hpMax[i]));
			this.escortFleet.push(new SHIP(escort[i], ehp[i], ehpMax[i]));
		}
	},
	
	addSupport: function(fleet, boss) {
		if (boss) {
			this.supportBoss = [];
			for (var i = 0; i < fleet.length; i++) {
				this.supportBoss.push(new SHIP((fleet[i].mst_id) ? fleet[i].mst_id : fleet[i]));
			}
		} else {
			this.supportNode = [];
			for (var i = 0; i < fleet.length; i++) {
				this.supportNode.push(new SHIP((fleet[i].mst_id) ? fleet[i].mst_id : fleet[i]));
			}
		}
	},
	
	formatFleet: function(fleet) {
		var ships = "";
		if (fleet.length == 1)
			return fleet[0].name;
	
		for (var i = 0; i < fleet.length; i++) {
			if (i == (fleet.length - 1)) {
				ships = ships.concat("and ", fleet[i].name);
				continue;
			}
			ships = ships.concat(fleet[i].name, ", ");
		}
		return ships;
	},
	
	isCombined: function(){
		return (this.escortFleet);
	},
	
	toString: function(delimiter) {
		if (delimiter === undefined) delimiter = "<br>";
		
		var ships = "";
		if (this.mainFleet.length == 1)
			return this.mainFleet[0].name;
	
		for (var i = 0; i < this.mainFleet.length; i++) {
			// if (i == (this.mainFleet.length - 1)) {
				// ships = ships.concat("and ", this.mainFleet[i].name);
				// continue;
			// }
			ships = ships.concat(this.mainFleet[i].name + ' (' + this.mainFleet[i].mid + ')');
			if (i < this.mainFleet.length - 1) ships = ships.concat(delimiter);
		}
		return ships;
	}
});

const Squadron = function(mid, numPlanes) {
	this.mid = mid;
	this.name = "";
	this.planes = numPlanes;
};

Object.assign(Squadron.prototype, {
	constructor: Squadron
});

const LandBase = function() {

}

const LBAS = function(lbas) {
	this.landBases = [
		new LandBase(),
		new LandBase(),
		new LandBase()
	]
}

//export {SHIP, FLEET};