import { Component, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/services';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {
  @Output()
  toggleSidebar = new EventEmitter<void>();

  public showSearch = false;

  constructor(private authenticationService: AuthenticationService) {}

  logout(){
    this.authenticationService.logout();
  }
}
