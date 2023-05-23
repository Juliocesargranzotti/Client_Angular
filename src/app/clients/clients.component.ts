import { ClientService } from './../client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit  {

  clients: Client[] = [];
  isEditing : boolean = false;
  formGroupClient : FormGroup;
  submitted: boolean = false;


  constructor (private ClientService: ClientService,
                private formBuilder: FormBuilder
    )
     {
       this.formGroupClient = formBuilder.group({

        id  : [''],
        name : ['',[Validators.required]],
        email : ['',[Validators.required,Validators.email]]
       });

      }

  ngOnInit(): void {
    this.loadClient();


  }
  loadClient() {
    this.ClientService.getClients().subscribe(
      {
        next : data => this.clients = data
      }
    );
  }

  save(){
    this.submitted = true;

    if(this.formGroupClient.valid){
      if(this.isEditing){
        this.ClientService.update(this.formGroupClient.value).subscribe(
          {
            next: () => {
            this.loadClient();
            this.formGroupClient.reset();
            this.isEditing = false;
            this.submitted =false;
          }
        }
        )
      }
      else{
        this.ClientService.save(this.formGroupClient.value).subscribe(
          {
            next: data => {
             this.clients.push(data);
             this.formGroupClient.reset();
             this.submitted = false;
            }
          }
        );
        }
    }
    }



  clean(){
    this.formGroupClient.reset();
    this.isEditing = false;
    this.submitted = false;
  }

  edit(client: Client): void {
    this.formGroupClient.setValue(client);
    this.isEditing = true;
  }

  remove(client: Client): void {
    this.ClientService.remove(client).subscribe({
      next : () => this.loadClient()
    })

  }

get name() : any {
  return this.formGroupClient.get("name");
}

get email() : any{
  return this.formGroupClient.get("email");
}





}
