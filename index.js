/*[[0,4],[0.2,0.3],[16,1234,256,223,300,1.3,0,1,100,0.3,1,300,23,"hello worl"],[0.1,0.3,0.1],[1,2,3,4,5,1.055,0.2]]*/
/*
	//definations
	00 : true/false
	01 : 8 bit
	11 : 32 bit
	10 : 64 bit
*/
const pack = {
	encode : function(array){
		return this.arrayToBinary(array).length;
	},
	decode : function(string){
		return string;
	},
	detect : function(data){
		if(!isNaN(parseFloat(data)) && isFinite(data)){
			if(data == 0 || data == 1){
				return { length : 1, header : '00' };
			}else if(data < 256){
				return { length : 8, header : '01' };
			}else if(data < 32768){
				return { length : 32, header : '11' };
			}else if(pack.isFloat(data)){
				return { length : 64, header : '10' };
			}
		}
	},
	arrayToBinary : function(array){
		var length = 0;
		var output = [];

		for(item in array){
			item = array[item];
			type = pack.detect(item);

			output.push({ type : type.length, byte : item, header : type.header });
			length+=type.length/8;
		}

		return this.binary(length, output);		
	},
	binary : function(length, array){
		var header = pack.header(array);
		var length = length;
		var writer = new Buffer(length);
		var count  = 0;

		console.log(array);

		for(item in array){
			item = array[item];

			switch(item.type) {
			    case 8:
			        writer.writeUInt8(item.byte, count);
					count+=item.type/8;
			        break;
			    case 32:
			        writer.writeInt32LE(item.byte, count);
					count+=item.type/8;
			        break;
			    case 64:
			        writer.writeFloatLE(item.byte, count);
					count+=4;
			        break;
			}
		}

		return writer;
	},

	header : function(array){
		var map = array.map(function(object){
			return object.header;
		});

		return map.join('');
	},

	isFloat : function(n){
	    return Number(n) === n && n % 1 !== 0;
	}
};

console.log(pack.encode([1000, 1233, 3233, 33, 3.1, 23, 1,2,3,4,5, 100, 12, 322, 312]));