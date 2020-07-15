import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AuthenticationService } from 'src/app/services';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

class Person {
  id: number;
  name: string;
  genre: string[];
  imageUrl: string;
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  persons: Person[];

  constructor(private dashboardService: DashboardService, private authenticationService: AuthenticationService, private http: HttpClient) {}

  ngOnInit(): void {
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [ [10, 50, 100], [10, 50, 100] ],
      serverSide: true,
      processing: true,
      searching: true,
    
      ajax: (dataTablesParameters: any, callback) => {
        const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
        const size = dataTablesParameters.length;
        that.dashboardService.topSellingProducts(page,size).subscribe(resp => {
            that.persons = resp.content;
            callback({
              // recordsTotal: resp.totalElements,
              // recordsFiltered: resp.recordsFiltered,
              recordsTotal: resp.totalElements,
             // recordsFiltered: (resp.page+1)*resp.size,
              recordsFiltered:  resp.totalElements,
              data: []
            });
          });
      }
      ,
      columns: [{ data: 'id' }, { data: 'name' }, { data: 'genre' }, { data: 'imageUrl'}]
    };
  }
}