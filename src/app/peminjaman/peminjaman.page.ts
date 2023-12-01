import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-peminjaman',
  templateUrl: './peminjaman.page.html',
  styleUrls: ['./peminjaman.page.scss'],
})
export class PeminjamanPage implements OnInit {
  dataPeminjaman: any = [];
  id: number | null = null;
  nama_barang: string = '';
  keterangan: string = '';
  modal_tambah: boolean = false;
  modal_edit: boolean = false;

  constructor(
    private _apiService: ApiService,
    private modal: ModalController
  ) {}

  ngOnInit() {
    this.getPeminjaman();
  }

  getPeminjaman() {
    this._apiService.tampil('tampildata.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataPeminjaman = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  reset_model() {
    this.id = null;
    this.nama_barang = '';
    this.keterangan = '';
  }

  cancel() {
    this.modal.dismiss();
    this.modal_tambah = false;
    this.reset_model();
  }

  open_modal_tambah(isOpen: boolean) {
    this.modal_tambah = isOpen;
    this.reset_model();
    this.modal_tambah = true;
    this.modal_edit = false;
  }

  open_modal_edit(isOpen: boolean, idget: any) {
    this.modal_edit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilPeminjaman(this.id);
    this.modal_tambah = false;
    this.modal_edit = true;
  }

  tambahPeminjaman() {
    if (this.nama_barang != '' && this.keterangan != '') {
      let data = {
        nama_barang: this.nama_barang,
        keterangan: this.keterangan,
      };
      this._apiService.tambah(data, '/tambahdata.php').subscribe({
        next: (hasil: any) => {
          this.reset_model();
          console.log('berhasil tambah data peminjaman');
          this.getPeminjaman();
          this.modal_tambah = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal tambah data peminjaman');
        },
      });
    } else {
      console.log('gagal tambah data peminjaman karena masih ada data yg kosong');
    }
  }

  hapusPeminjaman(id: any) {
    this._apiService.hapus(id, '/hapusdata.php?id=').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.getPeminjaman();
        console.log('berhasil hapus data');
      },
      error: (error: any) => {
        console.log('gagal');
      },
    });
  }

  ambilPeminjaman(id: any) {
    this._apiService.lihat(id, '/lihatdata.php?id=').subscribe({
      next: (hasil: any) => {
        console.log('sukses', hasil);
        let peminjaman = hasil;
        this.id = peminjaman.id;
        this.nama_barang = peminjaman.nama_barang;
        this.keterangan = peminjaman.keterangan;
      },
      error: (error: any) => {
        console.log('gagal ambil data');
      },
    });
  }

  editPeminjaman() {
    let data = {
      id: this.id,
      nama_barang: this.nama_barang,
      keterangan: this.keterangan,
    };
    this._apiService.edit(data, '/editdata.php').subscribe({
      next: (hasil: any) => {
        console.log(hasil);
        this.reset_model();
        this.getPeminjaman();
        console.log('berhasil edit data Peminjaman');
        this.modal_edit = false;
        this.modal.dismiss();
      },
      error: (err: any) => {
        console.log('gagal edit data Peminjaman');
      },
    });
  }
}
