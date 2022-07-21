import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'min2hr'
})
export class Min2hrPipe implements PipeTransform {

  transform(minutes: number | number[]): string {

    let secondsAr: number[] = [];
    let formattedTime: string[] = [];

    if (typeof minutes === 'number') {
      secondsAr.push(minutes); 
    } else {
      secondsAr = minutes;
    }

    secondsAr.forEach(min => {
      // seconds
      let seconds = min * 60;
      let secondsLeft = seconds;

      // hours
      const hours = Math.floor(secondsLeft / 3600);
      secondsLeft = secondsLeft % 3600;

      // mins
      const mins = Math.floor(secondsLeft / 60);
      secondsLeft = secondsLeft % 60;

      const calTime = `${hours ? hours + 'h' : ''} ${mins}min`;
      
      formattedTime.push(calTime);
    });

    return formattedTime.join(',');
  }

}
