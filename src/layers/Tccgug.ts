import LabelClass from "@arcgis/core/layers/support/LabelClass"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"

/**
 * 地籍圖層，單例模式
 * feature layer
 */
export class Tccgug {
  /**
   * Arcgis service url
   */
  private _url: string;

  /**
   * popup setting
   */
  private _popupTrailheads = {
    "title": "內部標記管制事項",
    "content": "<b>rmid:</b> {rmid}<br><b>ttrdnm:</b> {ttrdnm}"
  }

  /**
   * label setting
   */
  private _labelClass: LabelClass = new LabelClass({
    labelExpressionInfo: {
      expression: "$feature.ttrdnm"
    },
    symbol: {
      type: "text",
      color: "black",
      haloColor: "white",
      haloSize: 1
    },
    labelPlacement: "center-center",
    allowOverrun: false,
    deconflictionStrategy: "none"
  })

  constructor(url: string,) {
    this._url = url
    this.layer = new FeatureLayer({
      url: this._url,
      labelingInfo: [this._labelClass],
      popupTemplate: this._popupTrailheads,
    });
  }

  /**
   * main layer
   * @use add this prop to map
   */
  public layer: FeatureLayer
}