<?php

Url:https://onesignal.com/api/v1/notifications
Mehtod:Post

Jika Menggunakan Postman

Tambahkan Baris Di Bawah Ke Bagian Headers:
Authorization:Basic YWMxNTJhNmYtMjBhOC00ZTU1LTllMjQtZDkzZWU5OWVhY2U0,   //Rest Api Key Yang Terdapat Pada OneSignal Web
Content-Type:application/json

Pilih Tab Body, Pilih Yang Raw, Dan Masukkan Kode Di Bawah Ke Textarea
{
    "app_id":"aa7a5f05-1b54-40fc-87fd-80c0f1d99ab7",  //OneSignal ID Yang Terdapat Pada OneSignal Web
    "contents":{ "en":"Bingung"},
    "include_player_ids":["ce30da18-37db-4f7e-ba14-72ec8ba4d318"] //Specific User ID Yang Terdapat Pada User
    //Jika Untuk Semua User, Hapus Baris Yang Di Atas Dan Ganti Dengan Kode Yang Dibawah
    // "included_segments":["Active Users", "Inactive Users"]
}