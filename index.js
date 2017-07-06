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
		return this.arrayToBinary(array);
	},
	decode : function(string){
		return this.binaryToArray();
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
		var writer = pack.num2hex(header.length/2) + pack.bin2hex(header);

		for(item in array){
			item = array[item];

			switch(item.type) {
				case 1:
			        writer+=item.byte.toString();
			        break;
			    case 8:
			        writer+=pack.writeUInt8Buffer(item.byte);
			        break;
			    case 32:
			        writer+=pack.writeInt32Buffer(item.byte);
			        break;
			    case 64:
			        writer+=pack.writeFloatBuffer(item.byte);
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
	},
	writeUInt8Buffer : function(num) {
		const buf = new Buffer(1);
		buf.writeUInt8(num, 0);
		return buf.toString('hex');
	},
	writeInt32Buffer : function(num) {
		const buf = new Buffer(4);
		buf.writeInt32LE(num, 0);
		return buf.toString('hex');
	},
	writeFloatBuffer : function(num) {
		const buf = new Buffer(4);
		buf.writeFloatLE(num, 0);
		return buf.toString('hex');
	},
	pad : function(n, width, z){
		z = z || '0';
	  	n = n + '';
	  	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	},

	hex2bin : function(string){
		return string.match(/.{1,2}/g).map(function(part){
			return pack.pad((parseInt(part, 16)).toString(2),8);
		}).join('');
	},

	bin2hex : function(string){
		return string.match(/.{1,8}/g).map(function(part){
			return pack.pad((parseInt(part, 2)).toString(16), 2);
		}).join('');
	},

	num2hex : function(number){
		return pack.pad((number).toString(16), 2);
	}
};

console.log(pack.encode([0,4,0.2,0.3,16,1234,256,223,300,1.3,0,1,100,0.3,1,300,23,0.1,0.3,0.1,1,2,3,4,5,1.055,0.2]));