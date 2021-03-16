import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  listReservations: any[] = [
  ];
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _ReservacionService: ReservationService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      numberRes: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
      dateBooking: ['', Validators.required],
      rating: ['', [Validators.required, Validators.maxLength(1), Validators.minLength(1)]],
    })
  }

  ngOnInit(): void {
    this.obtainReservations();
  }

  obtainReservations() {
    this._ReservacionService.ListAllReservations().subscribe(data => {
      console.log(data);
      this.listReservations = data;

    },
      error => {
        console.log(error);
      }
    )
  }


  addReservation() {
    console.log(this.form);

    const reservationAux: any = {
      title: this.form.get('title')?.value,
      numberRes: this.form.get('numberRes')?.value,
      dateBooking: this.form.get('dateBooking')?.value,
      rating: this.form.get('rating')?.value,

    }
    this._ReservacionService.saveReservations(reservationAux).subscribe(data => {
      console.log(data);
      this.toastr.success('The reservation was created', 'Sucess creation');
      this.obtainReservations();
      this.form.reset();
    },
      error => {
        console.log(error);
        this.toastr.error('creation failed!', 'create reservation');
      }
    )
    /*this.listReservations.push(reservationAux);
    this.toastr.success('The registracion was successfull!', 'Sucessful Registration');
   /* console.log(reservationAux); */
    /*this.form.reset();*/
  }


  deleteReservation(index: number) {
    console.log(index);
    /*this.listReservations.splice(index,1);*/
    this._ReservacionService.deleteReservations(index).subscribe(data => {
      console.log(data);
      this.toastr.success('The reservation was deleted', 'Sucessfully deleted');
      //this.listReservations = data;  
    },
      error => {
        console.log(error);
        this.toastr.error('delete reservation failed', 'delete reservation');
      }
    );

  }




}
