//https://gist.run/?id=3c1a0aab9ef1a0aaf037518b5d61c803
// import { version } from 'aurelia-kendoui-bridge';
// import $ from 'jquery';
// import moment from 'moment';
// import { ListViewModel } from '../list-view-model';
// import { AuthServiceGTZ, ServiceAPI } from '../services';
// import { AuthServiceGTZ } from '../services';
// import { AuthServiceGTZ, ServiceAPI } from '../services';
// import { api } from '../Utils/api'


// import superJson from 'super-json';
// import { activationStrategy } from 'aurelia-router';
// import lodash from 'lodash';
import {  bindable} from 'aurelia-framework';
import {  AuthServiceGTZ} from '../services'
import {  inject} from 'aurelia-dependency-injection';
import {  AppRouter} from 'aurelia-router';
import {  ApiService} from 'utils/servicesApi';
import {  MdToastService,  MdModal} from "aurelia-materialize-bridge";
@inject(MdToastService, AppRouter, AuthServiceGTZ, ApiService)
// export class Aboutktemp extends ListViewModel {

// http://demos.telerik.com/kendo-ui/grid/custom-command
export class Mail {
  @bindable search;
  pageable = {
    refresh: true,
    pageSizes: true,
    buttonCount: 10
  };
  // data = [{
  //     text: 'All',
  //     value: '-1'
  // }, {
  //     text: 'TYPE1',
  //     value: '1'
  // }, {
  //     text: 'TYPE2',
  //     value: '2'
  // }];
  // dataI = [{
  //     text: 'Hackendsak',
  //     value: '1'
  // }, {
  //     text: 'Paramus',
  //     value: '2'
  // }, {
  //     text: 'Bcua',
  //     value: '3'
  // }, {
  //     text: 'Bergen',
  //     value: '4'
  // }, {
  //     text: 'Passaic',
  //     value: '5'
  // }, {
  //     text: 'Sober',
  //     value: '6'
  // }, {
  //     text: 'Clifton',
  //     value: '7'
  // }, {
  //     text: 'NJWW',
  //     value: '8'
  // }, {
  //     text: 'Maverick',
  //     value: '9'
  // }];


  originalScans = [];

  // staffTemplate = '${assignto ? assignto.StaffName : ""}';
  //toast,
  constructor(toast, router, auth, api) {

    //  if (auth.user.Admin === undefined) {
    //       // window.history.go(1)// -1);
    //      //   this.router.navigate("login")
    //      let rt2 = 'redirect'
    //      router.navigate(rt2 + '?route=login');
    //      }
    // this.roles = this.auth.roles
    // this.token = this.auth.token
    // this.user = this.auth.user;
    // if (this.user.Admin) {
    //     this.displayoption = 'show'
    // } else {
    //     this.displayoption = 'none'
    // }
    this.router = router;
    // this.version = version;
    this.ss1;
    this.ss2;
    this.capColor = 1
    this.toggleStaff = 'Unassigned'
    this.auth = auth
    this.competed = 'all' // false

    this.metacars = ['template', 'type', 'filename', 'contents', 'assignto', 'StaffName']
    this.api = api
    this.modal = MdModal;
    this.toast = toast
  }
  // startDatePicker = new Date('1-1-2016');
  // endDatePicker = new Date();
  excelExport(e) {
    //   var rows = e.workbook.sheets[0].rows;
    //  var sheet = e.workbook.sheets[0];
    //  var savedTemplate = kendo.template(this.columns[8].template);
    //  var data = this.dataSource.view();

    var sheet = e.workbook.sheets[0];
    var template = kendo.template(this.columns[8].template);

    for (var i = 1; i < sheet.rows.length; i++) {
      var row = sheet.rows[i];
      // row.push[]
      // var dataItem = {
      //    UnitPrice: row.cells[1].value
      // };
      let diff = row.cells[6].value - row.cells[7].value
      row.cells.push({
        'value': diff
      })
    }
  }
  dataSource = new kendo.data.DataSource({
    transport: {
      read: (options) => {
        //  this.loadData(this.capColor, this.prevtown)
        this.loadData()
          .then((scans) => {
            console.log('transport   scans ', scans[0])
            options.success(scans)

          })

      },

      destroy: (options) => {

        let updatedItem = options.data;
        console.log('   updatedItem ', updatedItem)
        // this.deleteData(updatedItem)
        //   .then((scans) => {
        //     options.success(scans)
        //     this.dataSource.read()
        //   })
        // options.success()
      },
      update: (options) => {
        console.log('updateDataoptions ')
        // let updatedItem = options.data;
        // console.log('   updatedItem ', updatedItem)
        // this.updateData(updatedItem)
        //   .then((scans) => {
        //     options.success(scans)
        //     if (scans.data === 'alreadyComplete') {
        //       alert('record was completed no updates allowed...')
        //       //   this.toast.show('record was completed no updates allowed!', 4000);
        //     }
        //     this.dataSource.read()
        //   })
        // options.success()
      }
    },
    // filter: {
    //   field: "completed",
    //   operator: "eq",
    //   value: false
    // },


    schema: {
      model: {
        //        id: "id", // Must assign id for update to work
        id: "_id", // if useing native then change id to _id        
        fields: {

          // template: {
          //     type: "string",
          //     readonly: true
          // }, //[name="firstName"]').attr("readonly", true); scan template ,IsNotEditable: true
          type: {
            type: "string"
          }, // barcode insured
          InvNumber: {
            type: "string"
          },
          DOBNum: {
            type: "string"
          },
          CheckNum: {
            type: "string"
          },

          BCSNumber: {
            type: "string"
          },
          filename: {
            type: "number"
          },
          contents: {
            type: "string"
          },
          createdAt: {
            type: "date"
          },
          assignto: {
            type: "string"
          },
          completed: {
            type: 'boolean'
          },
          // StaffName: {
          //     type: "string",
          //     editable: false
          // },
          // workername2: function () {
          //     return 'jrt'//this.workeraddr + " " + this.workercity;
          // },
          // // Calculated field
          // savedamt: function () {
          //     // (item) return (this.get("billedamt") - this.get("payamt"))
          //     return (this.billedamt - this.payamt)
          //     //   type: "number",
          //     //return 100 //(100-50)
          // },
        }
      }
    },
    pageSize: 15,
    sort: {
      field: 'filename',
      dir: 'asc'
    },
    // aggregate: [{ field: "type", aggregate: "count" },
    //   { field: "template", aggregate: "count" }
    // ]
  })
  activate(params, queryString, routeConfig) {

    // if (this.auth.user.Admin === undefined) {
    //    let rt2 = 'redirect'
    //   this.router.navigate(rt2 + '?route=login');
    // }


    // $(document).ready(function () {
    //   $(this).scrollTop(0);
    // });
    this.dataSource.read();
  }


  determineActivationStrategy() {
    return activationStrategy.replace; //replace the viewmodel with a new instance
    // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    // or activationStrategy.noChange to explicitly use the default behavior
  }

  filterStaff() {
    // if (this.toggleStaff === 'Unassigned') {
    //   this.toggleStaff = 'All' // both assigned and unassigned'
    //   this.applyFilter("assigntoStaffName", 'isnull')
    // } else {
    //   this.toggleStaff = 'Unassigned'
    //   this.applyFilter("assigntoStaffName", '0', 'isnotnull') //isnotnull  
    // }


  }
  // this.grid.dataSource.filter({});
  filterqFax() {
    //   this.applyFilter("template", 'WC-QF')

  }
  filterFROI() {
    //  this.applyFilter("template", 'WC-FROI')

  }
  // applyFilter function accepts the Field Name and the new value to use for filter.
  applyFilter(filterField, filterValue, operator) {

    // var gridData = this.grid

    // var currFilterObj = gridData.dataSource.filter();

    // // get current set of filters, which is supposed to be array.
    // // if the oject we obtained above is null/undefined, set this to an empty array
    // var currentFilters = currFilterObj ? currFilterObj.filters : [];

    // // iterate over current filters array. if a filter for "filterField" is already
    // // defined, remove it from the array
    // // once an entry is removed, we stop looking at the rest of the array.
    // if (currentFilters && currentFilters.length > 0) {
    //   for (var i = 0; i < currentFilters.length; i++) {
    //     if (currentFilters[i].field == filterField) {
    //       currentFilters.splice(i, 1);
    //       break;
    //     }
    //   }
    // }

    // // if "filterValue" is "0", meaning "-- select --" option is selected, we don't 
    // // do any further processing. That will be equivalent of removing the filter.
    // // if a filterValue is selected, we add a new object to the currentFilters array.
    // if (filterValue === "isnull") {
    //   currentFilters.push({
    //     field: filterField,
    //     operator: "isnull",
    //     value: filterValue
    //   });
    // } else if (filterValue === "isnotnull") {
    //   // currentFilters.push({
    //   //     field: filterField,
    //   //     operator: "isnotnull",
    //   //     value: filterValue
    //   // });
    // } else {
    //   if (filterValue != "0") {
    //     currentFilters.push({
    //       field: filterField,
    //       operator: "eq",
    //       value: filterValue
    //     });
    //   }
    // }

    // // finally, the currentFilters array is applied back to the Grid, using "and" logic.
    // gridData.dataSource.filter({
    //   logic: "and",
    //   filters: currentFilters
    // });

  }


  rowSelected(e) {
    console.log('e ' + e.sender)
    let grid = e.sender;
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    //   alert(dataItem.assignto);
  }

  findcontents() {
    this.api.findcontents(this.contentsearch, this.competed)
      .then((jsonRes) => {
        this.scans = this.originalScans = jsonRes
        console.log('this.scans ', this.scans)
        // return scans
      })
    this.dataSource.read()
  }
  townChanged() {
    // $(this.town)
    //   .toggleClass('town-1', this.capColor === '1')
    //   .toggleClass('town-2 ', this.capColor === '2')
    //   .toggleClass('town-10', this.capColor === '-1')
  }

  refreshGrid() {
    //   let rt2 = 'redirect'
    //   this.router.navigate(rt2 + '?route=mail');
    this.dataSource.read();

    // //Selecting existing grid

  }

  changeData() {
    this.dataSource.read();
  }

  onDataBound(e) {
    // alert('hi onDataBound')
    let grid = e.sender;
    kendo.jQuery('a[href*=\'#\']', grid.tbody).removeAttr('href');
  }

  details(e) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    let fn = dataItem.fileName.split('.')
    let fn1 = fn[0]
    let fn2 = fn[1]
    console.log('fn', fn1, fn2)

    let rt2 = 'https://backend.brookbridgeinc.com/api/v1/onepdf/' + dataItem.BCSNumber + '/' + dataItem.doctype + '/' + fn1 + '.pdf'
    //  alert('rt2 '+rt2)
    window.open(rt2, '_blank');
  }

  detailsdownload(e) {
    let grid = this.grid;

    var targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    let rt2 = 'http://jif.bergenrisk.com:8080/api/v1/downloadonepdf/' + dataItem.template + '/' + dataItem.filename + '.pdf'
    //  alert('rt2 '+rt2)
    window.open(rt2);
  }

  showSelection() {
    var rows = this.grid.select();
    var record;
    let sels = [];
    var maxRows = rows.length / 2
    console.log('rows', maxRows, rows)

    rows.each(function (idx, row) {
      let val = row.cells[0].innerText;
      if (idx < maxRows) {
        console.log('rowinnerText ', val);
        // this.selectedids
        sels.push({
          'data': val
        });
      }


    });
    this.selectedids = sels;
  }
  onEdit(e) {
    let grid = e.sender;
    var targetRow = $(e.container);
    grid.select(targetRow)
  }

  nonEditor(container, options) {
    container.text(options.model[options.field]);


  }
  nonEditorLength(container, options) {
    container.text(options.field.substring(0, 25));
    //   console.log('in nonEditorLength', options.field)
  }
  nonEditorDate(container, options) {
    let fn = options.field
    //   container.text(moment(options.model[fn]).format('MM-DD-YYYY'))
  }
  editorCheck(container, options) {
    if (options.model.completed) {
      let fn = options.field
      container.text(options.model[fn])
    } else {
      $('<input />')
        .appendTo(container)
    }

  }
  editorCheckbox(container, options) {
    if (options.model.completed) {
      let fn = options.field
      container.text(options.model[fn])
    } else {
      $('<input type="checkbox" />')
        .appendTo(container)

    }

  }

  // staffDropDownEditor(container, options) {
  //   $('<input required data-text-field="StaffName" data-value-field="staffid" data-bind="value:' + options.field + '"/>')
  //     .appendTo(container)
  //     .kendoDropDownList({
  //       autoBind: false,
  //       type: 'json',
  //       dataSource: {
  //         transport: {
  //           //read: "http://10.1.115.215:8080/api/v1/staff/find/"
  //           read: "http://jif.bergenrisk.com:8080/api/v1/staff/find/"
  //         }
  //       }
  //     });
  // }

  resetGrid() {
    localStorage.removeItem("kendo-grid-mail");

  }

  hideCol() {
    this.grid.hideColumn(2) //grid.columns[0].columns[1]);

  }
  saveGrid() {

    var dateSerializer = {
      serialize: function (date) {
        return [date.getTime()];
      },
      deserialize: function (time) {
        return new Date(time);
      },
      isInstance: function (obj) {
        return obj instanceof Date;
      },
      name: 'Date'
    }
    var myJson = superJson.create(); // The above options are defaults.

    let gopts = this.grid.options // getOptions()
    console.log(gopts)

    let obj2a = myJson.stringify(gopts)
    localStorage["kendo-grid-mail"] = obj2a

    let obj2b = myJson.parse(myJson.stringify(obj2a))
    this.grid.setOptions(obj2b)
    // console.log(obj2a, obj2b)//



  }
  loadGrid() {

    // var options = localStorage["kendo-grid-mail"];
    // if (options) {
    //    console.log(options)
    //   let obj2b = myJson.parse(myJson.stringify(options))

    //   this.grid.setOptions(obj2b)
    // }
  }
  async loadData() {
    // alert('loca')s
    let s2 = '1-1-2016';
    let s3 = '10-21-2016';
    let scans
    //return api.findcaseall()
    // if (this.user.Admin) {
    // return this.api.findcontents(this.contentsearch, this.competed)
    //     .then((jsonRes) => {
    //         //3  scans = jsonRes
    //         this.scans = this.originalScans = jsonRes
    //         // console.log('this.scans ', this.scans)
    //         return this.scans
    //     })
    // }
    // if (!this.user.Admin) {
    // return this.api.findcase(this.roles, this.auth)
    // return this.api.findcase(0, 0)
    return await this.api.findcaseall()
      .then((jsonRes) => {
        this.scans = jsonRes
        console.log('scans ', this.scans)
        return this.scans
      })
    // }
  }

  updateData(e) {
    console.log('updateData ', e)
    // if they only press edit
    // let grid = this.grid;
    // let selectedCell = grid.select();
    // let selected = selectedCell.text();
    // let cc = selected.substr(0, 41);
    // var targetRow = selectedCell.parent();
    // targetRow.addClass("k-state-selected");

    return this.api.updatecase(e, this.user)
      .then((jsonRes) => {
        console.log('this.scans ', jsonRes)
        return jsonRes
      })
  }
  deleteData(e) {
    console.log('deleteData ', e)
    if (this.user.Admin) {
      return this.api.deletecase(e, this.token)
        .then((jsonRes) => {
          this.scans = jsonRes
          console.log('this.scans ', this.scans)
          return this.scans
        })


    } else {
      alert('not authorized for delete')
      return false
    }
  }
  searchChanged(value) {

    // this.cars = this.origialCars.filter((item) => {
    this.scans = this.originalScans.filter((item) => {
      //     for (var i = 0, len = this.metacars.length; i < len; i++) {
      for (let i in this.metacars) {
        let md = this.metacars[i]
        // console.log('key  ',md, item[md]) md = make or model
        // only return match true cause it wont loop if it does either true or false
        //  console.log( 'item ',item , md, item[md] )
        console.log('item ', item[md]) //.toLowerCase() )
        // console.log( 'item ',item[md].toLowerCase(),item[md].toLowerCase().search(value.toLowerCase())  )
        if (item[md] !== undefined) {
          if (md === 'filename') {
            //  if (item[md].search(value.toLowerCase()) != -1) return true
          } else
            // if (item[md].toLowerCase().search(value.toLowerCase()) != -1) return true
            if (item[md].search(value) != -1) return true
        }
      }
    });
    console.log('item originalScans', this.scans.length, this.originalScans.length)
  }

}
