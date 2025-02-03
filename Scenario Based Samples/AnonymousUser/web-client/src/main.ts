import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {AppModule } from './app/app.module';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NMaF5cXmtCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWX5ed3RSRGJfWUBwXEs=');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
