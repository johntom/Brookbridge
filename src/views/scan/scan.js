import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApplicationService } from '../../services/application-service';
@inject(Router, ApiService, UtilService, ApplicationService)
export class Scan {
  heading = 'Search Results HEADER...';
  footer = 'Search Results FOOTER...';
  recordId = '';
  title = '';
  invcode = '';
  queryParams = '';
  message = 'Scan!';


  datasource = new kendo.data.DataSource({
    transport: {
      read: (options) => {
        //  this.loadData(this.capColor, this.prevtown)
        this.loadData()
          .then((scans) => {
            console.log(' inv datasource ', scans[0]);
            options.success(scans);
          });
      },
      update: (options) => {
        let updatedItem = options.data;
        console.log('   updatedItem ', updatedItem)
        this.updateData(updatedItem)
          .then((scans) => {
            options.success(scans)
            // this.dataSource.read()
          })
        options.success()
      },
      // destroy: {
      //         url: crudServiceBaseUrl + '/Products/Destroy',
      //         dataType: 'jsonp'
      //       },
      // create: {
      //   url: crudServiceBaseUrl + '/Products/Create',
      //   dataType: 'jsonp'
      // },
      // parameterMap: function(options, operation) {
      //   if (operation !== 'read' && options.models) {
      //     return {models: kendo.stringify(options.models)};
      //   }
      // }

      // batch: true,

      /////
    },

    // sort: [{
    //   field: 'createdAt',
    //   dir: 'desc'
    // }],
    schema: {
      model: {
        id: "id", // if useing native then change id to _id        
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

        }
      }
    },
    pageSize: 12,

    // aggregate: [{ field: "type", aggregate: "count" },
    //   { field: "template", aggregate: "count" }
    // ]
  })



  constructor(router, api, utilService, appService) {
    this.router = router;
    this.api = api;
    this.utilService = utilService;
    this.appService = appService;

  }
  categoryDropDownEditor(container, options) {
    $('<input required data-text-field="CategoryName" data-value-field="CategoryID" data-bind="value:' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: false,
        dataSource: {
          type: 'odata',
          transport: {
            read: '//demos.telerik.com/kendo-ui/service/Northwind.svc/Categories'
          }
        }
      });
  }


  async updateData(e) {
    console.log('updateData ', e)
   return this.api.updatecase(e, this.user)
      .then((jsonRes) => {
        console.log('this.scans ', jsonRes)
        return jsonRes
      })
  }


  activate(params, routeConfig) {
    //http://74.114.164.24/api/v1/inventorycontent?artistl=s%26artistf=c 

    this.queryParams = this.utilService.parseQueryStringUrl();
    console.log('queryParams', this.queryParams);
    this.datasource.read()
  }

 
  company_memoEditor(container, options) {
    // $('<textarea name="' + options.field + '" cols="50"  rows="6" required/>').appendTo(container);
    $('<textarea name="' + options.field + '" cols="50"  rows="6" />').appendTo(container);
  }


  loadGrid() {
    let options = localStorage["kendo-grid-mail"];
    if (options) {
      this.grid.setOptions(JSON.parse(options));
    }
  }
  async addtodo() {
    // this.currentItem = {}
    // this.currentItem.id = 'create'
    let rt2 = `#/todo/data/create`
    this.router.navigate(rt2);
  }

  async onEdit(e) {
    let grid = e.sender;
    var targetRow = $(e.container);
    grid.select(targetRow)
  }

  async loadData() {
    console.log('this.loadData ')
    let s2 = '1-1-2016';
    let s3 = '10-21-2016';
    let inv;
    ///api/v1/inventory/getall
      return await this.api.findcaseall()
      .then((jsonRes) => {
        this.scans = jsonRes
        console.log('scans ', this.scans)
        return this.scans
      })
  }





  rowSelected(e) {
    console.log('e ' + e.sender)
    let grid = e.sender;
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
 
  }

  details(e) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    this.appService.todo = dataItem
    let qs = this.utilService.generateQueryString(dataItem.id);
    let path = dataItem.id// `${dataItem.id}&tabname=Todo${this.utilService.counter++}`;
    // let rt2 = `#/todo/data/${path}`
    // this.router.navigate(rt2);

  }

}