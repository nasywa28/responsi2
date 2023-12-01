<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input,true);
//terima data dari mobile
$id=trim($data['id']);
$nama_barang=trim($data['nama_barang']);
$keterangan=trim($data['keterangan']);
http_response_code(201);
if($nama_barang!='' and $keterangan!=''){
 $query = mysqli_query($koneksi,"update peminjaman set nama_barang='$nama_barang',keterangan='$keterangan' where 
id='$id'");
 $pesan = true;
}else{
 $pesan = false;
}
echo json_encode($pesan);
echo mysqli_error($koneksi);
