import { Pipe, PipeTransform } from '@angular/core';

import { LANGUAGES } from '../constants/languages';


@Pipe({
  name: 'fulllanguage'
})
export class FullLanguagePipe implements PipeTransform {

  transform(iso: string): string {
    const fullLang = LANGUAGES.find(lang => lang.iso_639_1 === iso);

    if (fullLang) {
      return fullLang.english_name;
    }
  
    return iso;
  }

}