// src/jsvectormap.d.ts
declare module 'jsvectormap' {
    interface JSVectorMapOptions {
      map?: any;
      selector?: string;
      [key: string]: any;
    }
  
    class JSVectorMap {
      constructor(options: JSVectorMapOptions);
    }
  
    export default JSVectorMap;
  }
  
  declare module 'jsvectormap/dist/maps/world' {
    const WorldMap: any;
    export default WorldMap;
  }
  