import LabelClass from "@arcgis/core/layers/support/LabelClass"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"

/**
 * land layer
 * @service  feature services
 * @pattern Singleton
 */
export class Land {
  constructor() { }
  /**
   * Arcgis service url
   */
  private static url = "https://mcgbm.taichung.gov.tw/arcgis/rest/services/cmd_tccgugMap_rm2/FeatureServer/0"
  /**
   * label setting
   */
  private static labelClass = new LabelClass({
    labelExpressionInfo: {
      expression: "$feature.landmemo"
    },
    symbol: {
      type: "text", // autocasts as new TextSymbol()
      color: "black",
      haloSize: 1,
      haloColor: "white"
    },
    labelPlacement: "always-horizontal"
  })

  /** 
   * renderer properties
   */
  private static rendererProperties: __esri.RendererProperties = {
    type: "simple",
    symbol: {
      color: "#BA55D3",
      type: "simple-line",
      style: "solid"
    },
  } as __esri.RendererProperties

  /**
   * main layer
   * @use add this prop to map
   */
  public static layer = new FeatureLayer({
    url: this.url,
    labelingInfo: [this.labelClass],
    renderer: this.rendererProperties
  });
}