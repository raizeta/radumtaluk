'use strict';
myAppModule.controller("HelpController", ["$rootScope","$scope", "$location","$http","auth","$window", 
function ($rootScope,$scope, $location, $http,auth,$window) 
{   
    $scope.activehelp  = "active";
    $scope.userInfo = auth;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    $scope.oneAtATime = true;
    $scope.status = {isFirstOpen: true,isFirstDisabled: false};

	$scope.myInterval = 5000;
	$scope.noWrapSlides = true;
	$scope.active = 0;
	var slides = $scope.slides = [];
	var currIndex = 0;

	$scope.addSlide = function() 
	{
		slides.push
		(
		    {
		      image: 'asset/help/1.Login.png',
		      text: 'Silahkan Login Dengan Username Dana Password Anda. Untuk Penggantian Atau Lupa Password Hubungi Dept IT',
		      id: currIndex++
		    },
		    {
		      image: 'asset/help/1a.User Login Salah.png',
		      text: 'Pesan Akan Keluar Jika Username Atau Password Salah',
		      id: currIndex++
		    },
		    {
		      image: 'asset/help/1b.User Login Benar.png',
		      text: 'Proses Login Berjalan Normal. Jika Sebelumnya Anda Belum Melakukan Absensi, Maka Anda Akan Diminta Untuk Melakukan Absensi Terlebih Dahulu',
		      id: currIndex++
		    },
		    {
		      image: 'asset/help/2.Absensi Masuk.png',
		      text: 'Silahkan Melakukan Absensi Dengan Menekan Tombol Berwarna Hijau',
		      id: currIndex++
		    },
		    {
		      image: 'asset/help/3.Menu Absensi Masuk.png',
		      text: 'Jika Absensi Sukses,Maka Anda Akan Ditujukan Ke Menu Agenda Today',
		      id: currIndex++
		    },
		    {
		      image: 'asset/help/4.Menu Agenda Today-2.png',
		      text: 'Ini adalah Menu Agenda Today Yang Berisi List Customer Yang Harus Anda Kunjungi Pada Hari Ini, Customer Telah Diurutkan Berdasarkan Jarak Terdekat Dengan Anda',
		      id: currIndex++
		    },
		    {
		      image: 'asset/help/5.Menu Agenda Today-3.png',
		      text: 'Ini adalah Peta Customer Yang Harus Anda Kunjungi',
		      id: currIndex++
		    },
		    {
		      image: 'asset/help/6.Menu Agenda Today-4.png',
		      text: 'Disini Akan Berisi Summary Inventory Stock Dari Setiap Customer Yang Anda Kunjungi.',
		      id: currIndex++
		    },
		    {
		      image: 'asset/help/7.Menu Agenda Today-5.png',
		      text: 'Disini Akan Berisi Daftar Waktu Check-in Dari Setiap Customer Yang Anda Kunjungi.',
		      id: currIndex++
		    },
		    {
		      image: 'asset/help/8.Menu Agenda Today-6.png',
		      text: 'Masih Pada Menu Yang Sama Ini adalah Daftar Waktu Check-out Anda Dari Setiap Customer Yang Anda Kunjungi.',
		      id: currIndex++
		    },
		    {
		      image: 'asset/help/4.Menu Agenda Today-2.png',
		      text: 'Next Step.Pilih Salah Satu Customer Pada List Customer Agenda Today Yang Memiliki Jarak Terdekat. Check-in Ke Customer Dapat Dilakukan Jika Jarak Anda Dengan Customer Tersebut Tidak Lebih Besar Dari 100 meter',
		      id: currIndex++
		    },
		    {
		      image: 'asset/help/9.Menu Detail Kunjungan-1.png',
		      text: 'Jika Check-in Berhasil Anda Akan Masuk Pada Menu Detail Kunjungan. Pada Menu Ini Terdapat Inventory, Map Customer, Summary, Summary Terakhir Kunjungan. Ini Adalah Menu Inventory',
		      id: currIndex++
		    },
		    {
		      image: 'asset/help/9b.In Radius.png',
		      text: 'Ini Adalah Peta Customer Yang Anda Kunjungi. Jika Anda Berada Di Lingkarang Merah, Ini Menandakan Bahwa Anda Di Dalam Radius Dari Customer Tersebut, dan Sebaliknya',
		      id: currIndex++
		    },
		    {
		      image: 'asset/help/9c.Summary Empty.png',
		      text: 'Ini Adalah Menu Detail Inventory Per Customer, Jika Anda Belum Melakukan Inventory Maka Ini Akan Kosong',
		      id: currIndex++
		    },
		    {
		      image: 'asset/help/9.Menu Detail Kunjungan-1.png',
		      text: 'Kembali Ke Menu Inventory. Pada Menu Ini Terdapat Start Picture, Stock Inventory, Sell Out Inventory, Sell In Inventory, Return Inventory, Expired Iventory, Note Kunjungan Dan Check-out Menu. NB: Setiap Action Pada Menu Ini Dapat Dilakukan Jika Anda Berada Pada Radius Yang Tidak Lebih Dari 100 meter',
		      id: currIndex++
		    },
		    {
		      image: 'asset/help/10.Menu Detail Kunjungan-2.png',
		      text: 'Ini Adalah Menu Stock Inventory, Click Pada Salah Satu Gambar Product Yang Terdapat Pada Menu Ini, Kemudian Isikan Jumlah Product Dalam Pcs, Kemudian Klik Ok. Jika Quantity Product Berhasil Di Kirim Ke Server, Maka List Product Stock Inventory Akan Hilang Dari List Stock Inventory Menu',
		      id: currIndex++
		    },
		    {
		      image: 'asset/help/11.Menu Detail Kunjungan-3.png',
		      text: 'Lakukan Langkah Sebelumnya Untuk Melakukan Stock Inventory, Sampai List Product Pada Inventory Stock Ini Habis Semua',
		      id: currIndex++
		    },
		    {
		      image: 'asset/help/12.Menu Detail Kunjungan-4.png',
		      text: 'Jika Anda Telah Melakukan Stock Inventory Sampai Finish, Maka Akan Muncul Notifikasi Bahwa Action Stock Inventory Telah Berhasil Dilakukan, Perhatikan Background Pada Menu Stock Quantity Telah Berganti Menjadi Hijau',
		      id: currIndex++
		    },
		    {
		      image: 'asset/help/13.Menu Detail Kunjungan-5.png',
		      text: 'Next Step, Lakukan Action Menu Sell Out Inventory. Langkah-langkahnya sama dengan melakukan Stock Inventory',
		      id: currIndex++
		    },
		    {
		      image: 'asset/help/14.Menu Detail Kunjungan-6.png',
		      text: 'Langkah-langkahnya sama dengan melakukan Stock Inventory',
		      id: currIndex++
		    },
		    {
		      image: 'asset/help/15.Menu Detail Kunjungan-7.png',
		      text: 'Langkah-langkahnya sama dengan melakukan Stock Inventory',
		      id: currIndex++
		    },
		    {
		      image: 'asset/help/15.Menu Detail Kunjungan-7.png',
		      text: 'Next Step. Lakukan Action Sell In Inventory. Langkah-langkahnya sama dengan melakukan Stock Inventory ',
		      id: currIndex++
		    },
		    {
		      image: 'asset/help/17.Menu Detail Kunjungan-9.png',
		      text: 'Langkah-langkahnya sama dengan melakukan Stock Inventory ',
		      id: currIndex++
		    },
		    {
		      image: 'asset/help/18.Menu Detail Kunjungan-10.png',
		      text: 'Langkah-langkahnya sama dengan melakukan Stock Inventory ',
		      id: currIndex++
		    },
		    {
		      image: 'asset/help/18.Menu Detail Kunjungan-10.png',
		      text: 'Next Step. Lakukan Action Expired Inventory. Click Pada Salah Satu Gambar Product Yang Terdapat Pada Menu Ini Untuk Menampilkan Form Isian Expired Inventory',
		      id: currIndex++
		    }
		);
	};

	$scope.addSlide();



}]);




