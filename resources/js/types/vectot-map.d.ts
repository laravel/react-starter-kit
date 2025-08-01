declare module 'jsvectormap' {
  interface Marker {
    coords: [number, number];
    name: string;
  }

  interface JsVectorMapOptions {
    selector: string;
    map: string;
    markers?: Marker[];
  }

  class JsVectorMap {
    static addMap(
      mapName: string,
      mapData: {
        width?: number;
        top?: number;
        height?: number;
        bbox?: Array<{ x: number; y: number }>;
        left?: number;
        projection?: { type: string; centralMeridian: number };
        insets?: Array<{
          width: number;
          top: number;
          height: number;
          bbox: Array<{ x: number; y: number }>;
          left: number;
        }>;
        paths: Record<string, { path: string; name: string }>;
      }
    ) {
      throw new Error('Method not implemented.');
    }
    constructor(options: JsVectorMapOptions);
  }

  interface JsVectorMapOptions {
    zoomOnScroll?: boolean;
    zoomButtons?: boolean;
    showTooltip?: boolean;
    zoom?: {
      min: number;
      max: number;
    };
  }

  export function _(selector: string, options: any): void;
  export default JsVectorMap;
}
