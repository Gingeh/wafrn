import { Injectable } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { Title, Meta } from '@angular/platform-browser';
import * as sanitizeHtml from 'sanitize-html';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private titleService: Title,
    private metaTagService: Meta,

  ) { }


  objectToFormData(obj: any): FormData {
    let res = new FormData();
    Object.keys(obj).forEach((key: string) => {
      res.append(key, obj[key]);
    })
    return res;
  }

  setSEOTags(title: string, description: string, author: string, image: string): void{
    const sanitizedDescription = sanitizeHtml(description, {
      allowedTags: [],
      allowedClasses: { },
      allowedStyles: { }
    });
    this.titleService.setTitle(title);
    this.metaTagService.addTags([
      {name: 'description', content: sanitizedDescription },
      {name: 'author', content: author },
      {name: 'image', content: image},
      {name: 'og:description', content: sanitizedDescription },
      {name: 'og:author', author },
      {name: 'og:image', content: image},
      {name: 'twitter:card', content: 'summary' },
      {name: 'twitter:title', content: title },
      {name: 'twitter:site', content: 'https://app.wafrn.net' },
      {name: 'twitter:description', content: sanitizedDescription },
      {name: 'twitter:image', content: image},
    ]);
    
    
  }
}
