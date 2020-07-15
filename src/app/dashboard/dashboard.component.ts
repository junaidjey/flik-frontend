import { Component, AfterViewInit, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models';
import { DashboardService } from '../services/dashboard.service';
import { AuthenticationService } from '../services';
declare var require: any;
@Component({
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements AfterViewInit, OnInit {
  subtitle: string;
  private chart: any;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  movies= [];
  constructor(private dashboardService: DashboardService, private authenticationService: AuthenticationService) {
    this.subtitle = 'This is some text within a card block.';
   // this.dashboardService.abc().subscribe(response => { this.lineChartData = response; });
  }
  
  
  ngOnInit() {
    this.dashboardService.topSellingProducts(1,30).subscribe((res)=>{
      this.movies= res.content;
    });  
  }
  public lineChartData: Array<any> = [];

  public lineChartLabels: Array<any> = [
    '1',
    '2',
    '3',
    '4',
    '5',
  ];
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors: Array<any> = [];
  public lineChartLegend = false;
  public lineChartType = 'line';

  ngAfterViewInit() { }
}