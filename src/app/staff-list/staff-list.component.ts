import { Component, OnInit } from '@angular/core';
import { LoginUserComponent } from '../login-user/login-user.component';
import { BranchService } from '../Services/branch.service';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css'],
})
export class StaffListComponent implements OnInit {
  allstaff: any;
  value: any;
  errorMsg: any;
  searchString: string = '';

  constructor(
    private branchlist: BranchService,
    private router: Router,
    private user: UserService
  ) {}

  checkadmin = this.user.isAdmin();

  ngOnInit(): void {
    if (this.user.getRole() == 'admin' || this.user.getRole() == 'bm') {
      this.value = localStorage.getItem('branch');

      this.user.getAllStaff().subscribe((data) => {
        this.allstaff = data;
      });
    } else if (this.user.getRole() == 'staff') {
      window.alert('Only for Admin and Branch Managers');
      this.router.navigate(['orders']);
    }
  }

  staffList(form: NgForm) {
    this.value = form.value.id;
  }

  //delete staff by id
  deleteStaff(id: any) {
    this.user.deleteUser(id).subscribe((res) => {
      window.alert('Staff Member deleted sucessfully');
      this.user.getAllStaff().subscribe((data) => {
        this.allstaff = data;
      });
    });
  }
}
