import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AuthenticationService, UserService, AlertService } from 'src/app/services';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';
declare var $: any;

@Component({
  selector: 'app-full-layout',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {
  profileName = '';
  public fileUploads: Observable<string[]>;
	public config: PerfectScrollbarConfigInterface = {};
 
  constructor(public router: Router, private authenticationService: AuthenticationService, private alertService: AlertService, private userService: UserService, private dashboardService: DashboardService) {}
  
  public innerWidth: any;
  public defaultSidebar: any;
  public showMobileMenu = false;
  public expandLogo = false;
  public sidebartype = 'full';

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {
    if (this.router.url === '/') {
      this.router.navigate(['/starter']);
    }
    this.defaultSidebar = this.sidebartype;
    this.handleSidebar();
    this.fileUploads = this.userService.getProfilePic();
    console.log(this.fileUploads);

    this.dashboardService.myProfile().subscribe((res)=>{
      this.profileName  = res.name;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.sidebartype = 'mini-sidebar';
    } else {
      this.sidebartype = this.defaultSidebar;
    }
  }

  toggleSidebarType() {
    switch (this.sidebartype) {
      case 'full':
        this.sidebartype = 'mini-sidebar';
        break;

      case 'mini-sidebar':
        this.sidebartype = 'full';
        break;

      default:
    }
  }

  logout(){
    this.authenticationService.logout();
  }


  
}
