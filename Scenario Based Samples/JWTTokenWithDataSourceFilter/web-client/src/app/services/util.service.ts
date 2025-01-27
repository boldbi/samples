import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Util {

  private cssFiles = [
    "boldbi.theme.definition.min.css",
    "font-server.min.css",
    "ej1.web.all.min.css",
    "ej2.partone.web.all.min.css",
    "ej2.parttwo.web.all.min.css",
    "ej.designerwidgets.all.min.css",
    "ej.dashboarddesigner.min.css"
  ];

  constructor() { }

  disableCssFiles() {
    this.cssFiles.forEach(file => {
      this.disableCssFile(file);
    });
  }

  private disableCssFile(baseUrl: string) {
    const linkElements = document.querySelectorAll(`link[rel="stylesheet"]`);
    linkElements.forEach(linkElement => {
      const link = linkElement as HTMLLinkElement;
      if (link.href.includes(baseUrl)) {
        link.disabled = true; // Disable the specific stylesheet link
      }
    });
  }

  enableCssFiles() {
    this.cssFiles.forEach(file => {
      this.enableCssFile(file);
    });
  }

  private enableCssFile(href: string) {
    const linkElements = document.querySelectorAll(`link[rel="stylesheet"]`);
    linkElements.forEach(linkElement => {
      const link = linkElement as HTMLLinkElement;
      if (link.href.includes(href)) {
        link.disabled = false; // Re-enable the specific stylesheet link
      }
    });
  }
}
