import React from 'react';
import WidgetEmbedding from './WidgetEmbedding/WidgetEmbedding';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXlfc3RdRGdZUEJ1Xko=');

class App extends React.Component {
render() {
   return (
     <div>
     <WidgetEmbedding/>
     </div>
     );
    }
}

export default App;