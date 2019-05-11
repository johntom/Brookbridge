
// import { AuthServiceGTZ } from '../services';
// inject(MdToastService, AppRouter,ApiService)//,  AuthServiceGTZ, ApiService)

// constructor(toast,router, api) {

//   this.scansprocessed = 0
//   this.router = router;
//   this.modal = MdModal;
//   this.toast = toast
//   this.api = api
//   // if (auth.user === '') {
//   //   this.router.navigate("login")

//   // }
//   // this.auth = auth
//   // this.user = this.auth.user;
//   // this.competed = 'all'// false
//   // if (this.user.Admin) {
//   //   this.displayoption = true
//   // } else {
//   //   this.displayoption = false
//   // }

// }

//import {computedFrom} from 'aurelia-framework';
// import materialize from 'materialize-css';
// import { autoinject } from "aurelia-framework";
import { MdToastService, MdModal } from "aurelia-materialize-bridge";
import { AppRouter } from 'aurelia-router';
import { inject, bindable } from 'aurelia-framework';
import { ApiService } from 'utils/servicesApi';


@inject(MdToastService, AppRouter, ApiService)//,  AuthServiceGTZ, ApiService)

export class Scanprocess {
  heading = 'Welcome to the Aurelia Navigation-Kendo-Systemjs-Cli App!';
  


  constructor(toast, router, api) {
    this.modal = MdModal;
    this.toast = toast
    this.api = api
    // this.message = 'Hello World!--';
  

  }
  async processScans() {
    // alert('in ')
   let scanapth = 'DOBRECEIPTS'
  //  let scanapth2 = 'WORK_ORDER'//INVOICES'
  this.scansinvprocessed=0;
  this.scanswoprocessed=0;
   await this.api.walkdir(scanapth)
      .then((jsonRes) => {
        let dobs = jsonRes
        console.log('dobs added ', dobs)
        this.scansdobsprocessed = dobs.data
      });
       scanapth = 'WORK_ORDER' 
      await this.api.walkdir(scanapth)
         .then((jsonRes) => {
           let invs = jsonRes
           console.log('dobs added ', invs)
           this.scanswoprocessed = invs.data
         });
         this.toast.show(`You Processed all scans  dob:${this.scansdobsprocessed} invocies:${this.scanswoprocessed}!`, 4000);
  }
  agree(e) {
    this.toast.show("You agreed!", 4000);
  }

  disagree(e) {
    this.toast.show("You disagreed!", 4000);
  }

  openModal() {
    this.modal.open();
  }


  testToast() {
    // Materialize.toast('record saved!', 4000) // 4000 is the duration of the toast
    this.toast.show("You disagreed!", 4000);

  }
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  submit() {
    this.previousValue = this.fullName;
    // eslint-disable-next-line no-alert
    alert(`Welcome, ${this.fullName}!`);
  }

  canDeactivate() {
    // if (this.fullName !== this.previousValue) {
    //   // eslint-disable-next-line no-alert
    //   return confirm('Are you sure you want to leave?');
    // }
  }
}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}
