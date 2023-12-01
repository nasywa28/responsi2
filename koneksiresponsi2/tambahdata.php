<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input,true);
//terima data dari mobile
$nama_barang=trim($data['nama_barang']);
$keterangan=trim($data['keterangan']);
http_response_code(201);
if($nama_barang!='' and $keterangan!=''){
 $query = mysqli_query($koneksi,"insert into peminjaman(nama_barang,keterangan) values('$nama_barang','$keterangan')");
 $pesan = true;
}else{
 $pesan = false;
}