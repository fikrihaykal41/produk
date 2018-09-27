$(document).ready(function(){
	var Obj = []; //array penampung
	// mengambil data pada file JSON dan menyimpannya ke variable Obj
	$.getJSON("./assets/json/dataPeserta.json", function(data) {
		$.each(data, function() {
			$.each(this, function(index, data) {
				Obj.push({
					"nama":data.nama,
					"nim":data.nim,
					"tglLahir":data.tglLahir,
					"jurusan":data.jurusan,
					"angkatan":data.angkatan,
					"noHp":data.noHp,
					"alasan":data.alasan,
					"komitmen":data.komitmen
				});
			});
		});
	});
	console.log(Obj);

	//fungsi pushToObj
	//IS : Obj belum bertambah
	//FS : Menambahkan data dari form ke variable Obj
	function pushToObj(Obj){
		Obj.push({
			"nama":$("#nama").val(),
			"nim":$("#nim").val(),
			"tglLahir":$("#tglLahir").val(),
			"jurusan":$("#jurusan").val(),
			"angkatan":$("#angkatan").val(),
			"noHp":$("#noHp").val(),
			"alasan":$("#alasan").val(),
			"komitmen":$("#komitmen").val()
		});
		console.log(Obj);
		// alert("Selamat, data berhasil disimpan :)");
	};

	//VALIDASI INPUT//
	  //==========//
	     //====// 
	      //V//
	var $form = $("form"); //variable untuk pengecekan
	//validasi karakter, hanya karakter a-z/A-z dan spasi
	$.validator.addMethod("letters", function(value, element) {
		return this.optional(element) || value == value.match(/^[a-zA-Z\s]*$/);
	});
	$form.validate({
		//aturan input
		rules: {
		    nama: {
		    	required: true,
		    	minlength: 3, //minimal 3 karakter
		    	letters: true
	    	},
	    	nim: {
	    		required: true,
	    		minlength: 10,
	    		maxlength:10
	    	},
	    	tglLahir: {
	    		required: true
	    	},
	    	jurusan: {
	    		required: true
	    	},
	    	angkatan: {
	    		required: true
	    	},
	    	noHp: {
	    		required: true
	    	},
	    	alasan: {
	    		required: true
	    	},
	    	komitmen: {
	    		required: true
	    	}
		},
		//pesan error ketika kondisi rules tidak terpenuhi
		messages: {
	   		nama: "Mohon masukkan nama lengkap dengan benar (Hanya huruf dan spasi yang diperbolehkan)",
	   		nim: "NIM harus 10 digit",
	   		tglLahir: "Tanggal lahir harus diisi",
	   		jurusan: "Jurusan harus diisi",
	   		angkatan: "Angkatan harus diisi",
	   		noHp: "Nomor Handphone harus diisi",
	   		alasan: "Alasan harus diisi",
	   		komitmen: "Komitmen harus diisi"
		},
		//penanganan ketika submit
		submitHandler: function() {
		    pushToObj(Obj); //pemanggilan fungsi pushToObj
		}

		
	});
});