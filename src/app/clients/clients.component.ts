import { ClientService } from './../client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from '../client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit  {

  clients: Client[] = [];

  constructor (private ClientService: ClientService){}
  
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

}
