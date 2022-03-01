import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit,AfterViewInit {
  currentActive = 1;
  prevBtnDisable= false;
  nextBtnDisable= false;
 @ViewChildren('circles') circles!:QueryList<ElementRef> ;
 @ViewChildren('form') form!:QueryList<ElementRef> ;
 @ViewChild('progress') progress!:ElementRef;
  constructor(private fb:FormBuilder) { }

  registerForm!:FormGroup;
  loginForm!:FormGroup;
  confirmForm!:FormGroup;
  ngOnInit(): void {
    this.registerForm =  this.fb.group({
      name : ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    });

    this.loginForm =  this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    });

    this.confirmForm =  this.fb.group({
      agree:[false,[Validators.required]]
    });

  }

  ngAfterViewInit(): void {
    //(<ElementRef>this.circles.get(0)).nativeElement.classList.add('active');
    //(<ElementRef>this.form.get(0)).nativeElement.classList.add('activeForm');
  }

  next(){
    this.currentActive++;
    if(this.currentActive > this.circles.length) {
        this.currentActive = this.circles.length
    }
    this.update();
  }

  prev(){
    this.currentActive--;
    if(this.currentActive < 1) {
        this.currentActive = 1
    }
    this.update()
  }

  update(){
    this.circles.forEach((circle, idx) => {
      if(idx < this.currentActive) {
          circle.nativeElement.classList.add('active');
      } else {
          circle.nativeElement.classList.remove('active');
      }
    });

    this.form.forEach((form, idx) => {
      form.nativeElement.classList.remove('activeForm')
    });

    this.form.forEach((form, idx) => {
      if(idx+1 === this.currentActive ){
        form.nativeElement.classList.add('activeForm');
      }
    });

    const actives = document.querySelectorAll('.active');
    this.progress.nativeElement.style.width = (actives.length - 1) / (this.circles.length - 1) * 100 + '%';

    if(this.currentActive === 1) {
        this.prevBtnDisable = true;
    } else if(this.currentActive === this.circles.length) {
        this.nextBtnDisable = true;
    } else {
      this.prevBtnDisable = false;
      this.nextBtnDisable = false;
    }

  }

}
