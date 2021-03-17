import {
  define,
} from 'vl-ui-core';

import {LitElement} from 'lit-element';
import {html} from 'lit-html';
import 'vl-ui-template';
import 'vl-ui-checkbox';
import 'vl-ui-map';
import './vl-map-layer-tile-wms';
import {unsafeHTML} from "lit-html/directives/unsafe-html";


class VlMapIssueApp extends LitElement {
  constructor() {
    super();
    this.config = {
      overlayLayers: [{
        title: 'Brussel leefmilieu',
        layer: 'bruenvi_inventaire_sol_sensitivity_class',
        url: 'https://wms.environnement.brussels/lb_wms',
      }]
    }
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <vl-map>
        <vl-map-baselayer-grb></vl-map-baselayer-grb>
        <!--${this.config.overlayLayers.map(ol => this._renderWms(ol))}-->
        ${this.config.overlayLayers.map(ol => this._renderWmsWebc(ol))}
        
        <vl-map-layer-switcher>
          ${this.config.overlayLayers.map((c) => this.renderOverlayLayerCheckbox(c))}
        </vl-map-layer-switcher>
      </vl-map>
    `;
  }

  renderOverlayLayerCheckbox(config) {
    return html`
          <vl-checkbox
            id="${config.layer}"
            data-vl-label="${config.title}"
            data-vl-layer="${config.title}">
          </vl-checkbox>`;
  }

  _renderWms(config) {
    return html`
        <vl-map-layer-tile-wms
          data-vl-opacity="0.7"
          data-vl-url="${config.url}"
          data-vl-name="${config.title}"
          data-vl-layers="${config.layer}">
        </vl-map-layer-tile-wms>`;
  }

  _renderWmsWebc(config) {
    return html`${unsafeHTML(`
        <vl-map-tiled-wms-layer
          data-vl-opacity="0.7"
          data-vl-url="${config.url}"
          data-vl-name="${config.title}"
          data-vl-layers="${config.layer}">
        </vl-map-tiled-wms-layer>`)}`;
  }
}

define('vl-map-issue-app', VlMapIssueApp);
