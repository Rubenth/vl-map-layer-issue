import {vlElement} from '/node_modules/vl-ui-core/dist/vl-core-all.src.js';
import TileLayer from '/node_modules/ol/layer/Tile.js';
import TileWMS from '/node_modules/ol/source/TileWMS.js';
import '/node_modules/@ungap/custom-elements/min.js';
//
// import {
//   tileloadend, tileloadstart,
// } from '../common/events';
export class VlMapLayerTileWms extends vlElement(HTMLElement) {
  constructor() {
    super();
    this._source = this.__createSource();
    this._layer = this._createLayer();
  }

  __createSource() {
    const tileWmsSource = new TileWMS({
      url: this.url,
      params: {
        'LAYERS': this.layers,
        'TILED': true,
      },
      serverType: 'geoserver',
      transition: 0,
    });
    // tileWmsSource.on('tileloadend',
    //     () => this.rerender() & this.dispatchEvent(tileloadend()));
    // tileWmsSource.on('tileloadstart',
    //     () => this.dispatchEvent(tileloadstart()));
    return tileWmsSource;
  }

  _createLayer() {
    const layer = new TileLayer({
      title: this._name,
      source: this._source,
      opacity: this._opacity,
      visible: true,
    });
    layer.on('change:visible', () => this.rerender());
    return layer;
  }

  async connectedCallback() {
    if (this.mapElement) {
      await this.mapElement.ready;
      this.mapElement.addLayer(this._layer);
    }
  }

  get url() {
    const url = this.dataset.vlUrl;
    if (!url) {
      throw new Error('URL not defined');
    }
    return url;
  }

  get layers() {
    const layers = this.dataset.vlLayers;
    if (!layers) {
      throw new Error('Layers not defined');
    }
    return layers;
  }

  get _styles() {
    return this.dataset.vlStyles || '';
  }

  get _version() {
    return this.dataset.vlVersion || '1.3.0';
  }

  get _opacity() {
    return Number(this.dataset.vlOpacity || 1);
  }

  set style(style) {
    this._layer.setStyle(style);
  }

  set visible(value) {
    this._layer.setVisible(value);
  }

  get visible() {
    return this._layer.getVisible();
  }

  /**
   * Geeft de OpenLayers kaartlaag.
   *
   * @return {ol.layer.Layer}
   */
  get layer() {
    return this._layer;
  }

  /**
   * Geeft de OpenLayers kaartlaag source.
   *
   * @return {ol.source}
   */
  get source() {
    return this._source;
  }

  /**
   * Geeft de kaartlaag titel terug.
   *
   * @return {String}
   */
  get title() {
    return this.dataset.vlTitle;
  }

  get mapElement() {
    if (this.parentNode && this.parentNode.map) {
      return this.parentNode;
    } else {
      return null;
    }
  }

  get _name() {
    return this.dataset.vlName || 'kaartlaag';
  }

  /**
   * Rendert de kaartlaag opnieuw.
   */
  rerender() {
    if (this.mapElement) {
      this.mapElement.rerender();
    }
  }
}

customElements.define('vl-map-layer-tile-wms', VlMapLayerTileWms);
