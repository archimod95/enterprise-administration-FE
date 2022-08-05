import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

//Servicios
import { EmployeesService } from 'src/app/core/services/employees.service';
import { ApiEmployeeByEmail, Employee} from 'src/app/core/models/employee.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //Forms
  loginForm!: FormGroup;

  //Etiquetas
  lbl_login = 'Sign In';
  lbl_email = 'Email';
  lbl_userObligatory = 'The email is required';
  lo_langs = [];

  openNav = false;
  btn_disabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toast:ToastrService,
    private authService:EmployeesService,
    private cookieService: CookieService,
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
    localStorage.clear();
    this.cookieService.deleteAll();
  }
  /**
   * Create from
   */
   buildForm() {
    this.loginForm = this.formBuilder.group({
      txt_email!: ['', Validators.required],
    });
  }
  /**
   * Get from controllers
   */
   get txt_email() {
    return this.loginForm?.get('txt_email');
  }
  /**
   * Login
   */
  login(){
    if (this.loginForm?.valid) {
      this.btn_disabled = true;
      var apiEmployeeByEmail: ApiEmployeeByEmail;
      apiEmployeeByEmail = new ApiEmployeeByEmail();
      apiEmployeeByEmail.Email=this.loginForm.value.txt_email;
      this.authService.getEmployeeByEmail(apiEmployeeByEmail).subscribe(
        (objeto) => {
          this.setUserLogin(objeto)
        },
        (error) => this.controlError(error)
      );
    }
    else{
      this.toast.warning('You must enter a valid Email', 'Alert');
    }
  }
  /**
   * Valida que la petición fue correcta
   * @param ObjetoLogin valor que devuelve login
   */
  setUserLogin(ObjetoLogin:Employee) {
    console.log(ObjetoLogin);
    if (ObjetoLogin.id! == 0) {
      this.controlError(ObjetoLogin);
    } else {
      this.saveData(ObjetoLogin);
    }
  }

    /**
   * Función para controlar los errores
   * @param error valor que devuelve setUserLogin
   */

     controlError(error:Employee) {
      switch (error.id) {
        case null:
          this.toast.warning('Wrong Email User.', 'Alert');
          break;
      
        default:
          this.toast.error('Error has occured', 'Error');
          break;
      }
    }

      /**
   * Obtiene al usuario y redirecciona al dashboard
   * @param usuario valor que devuelve setUserLogin
   */
  saveData(user:Employee) {
    this.btn_disabled = false; 
    localStorage.setItem('id',user.id!.toString());
    localStorage.setItem('email',user.email!);
    localStorage.setItem('name',user.name!);
    localStorage.setItem('surname',user.surname!);

    
    this.router.navigate(['dashboard']);
    this.toast.success(`Welcome ${user.name} ${user.surname}`, 'Confirm');
  }
}
