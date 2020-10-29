import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomModel } from 'src/app/model/userModel';
import { GeneralService } from 'src/app/services/general.service';
import { RoomService } from 'src/app/services/room.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  @ViewChild('barChart') barChart;
  bars: any;
  colorArray: any;
  allRooms: RoomModel[];
  checkedRoom: RoomModel[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roomService: RoomService,
    private generalService: GeneralService,
  ) {
    this.roomService.getAllRooms().then(res => {
      this.allRooms = res;
      const dateToday = new Date();
      this.checkedRoom = this.allRooms.filter(room => room.userId !== '')
        .filter(room => new Date(room.startDate).getMonth() === dateToday.getMonth());
    });
  }

  ionViewDidEnter() {
    this.roomService.getAllRooms().then(res => {
      this.allRooms = res;
      const dateToday = new Date();
      this.checkedRoom = this.allRooms.filter(room => room.userId !== '')
        .filter(room => new Date(room.startDate).getMonth() === dateToday.getMonth());
      this.createBarChart();
    });
  }
  createBarChart() {
    const labelArray = [];
    const roomNumber = [];
    for (let i = 1; i <= 12; i++) {
      const found = this.allRooms.filter(element => new Date(element.startDate).getMonth() === i).length;
      roomNumber.push(found);
      labelArray.push(i);
    }
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: labelArray,
        datasets: [{
          label: 'Rooms Booked in a month',
          data: roomNumber,
          backgroundColor: '#ff8b00', // array should have same number of elements as number of dataset
          borderColor:  '#ff8b00',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  ngOnInit() {
  }

  getReport() {
    const dateToday = new Date();
    console.log(dateToday.getMonth());
    console.log(new Date(this.allRooms[0].startDate).getMonth());
    const checkedRoom = this.allRooms.filter(room => room.userId !== '')
      .filter(room => new Date(room.startDate).getMonth() === dateToday.getMonth());
    console.log(checkedRoom);
    console.log(this.allRooms);
  }

}
