import './style.css'
import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import esriConfig from "@arcgis/core/config"
import * as intl from "@arcgis/core/intl";
import Extent from "@arcgis/core/geometry/Extent"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import MediaLayer from "@arcgis/core/layers/MediaLayer"
import LabelClass from "@arcgis/core/layers/support/LabelClass"
import ImageElement from "@arcgis/core/layers/support/ImageElement"
import ExtentAndRotationGeoreference from "@arcgis/core/layers/support/ExtentAndRotationGeoreference"
import FeatureReductionCluster from "@arcgis/core/layers/support/FeatureReductionCluster";

// layer
import { Land } from './layers/land';
import { Tccgug } from './layers/tccgug';

// 小工具
import { WidgetManager } from './WidgetManager';
import Expand from "@arcgis/core/widgets/Expand" 

// 1. 加入底圖
const map = new Map({
  basemap: "topo-vector",
  // layers: [graphicsLayer]
})

// 2. 加入地籍底圖
map.add(Land.layer);

// 3. 加入需編輯圖層
let tccgug = new Tccgug("https://mcgbm.taichung.gov.tw/arcgis/rest/services/cmd_tccgugMap_rm/FeatureServer/0")
map.add(tccgug.layer);

// 4. 加入參考圖層
const referLayer = new GraphicsLayer({
  title: "referLayer"
})
map.add(referLayer)

// 5. 顯示畫面
const view = new MapView({
  container: "viewDiv",
  map: map,
  zoom: 16,
  center: [120.57889244754534, 24.159856487625685]
});

// 小工具
let widgetManager = new WidgetManager(view)


view.when(() => {
  console.log("Map is loaded");

  // 載入小工具
  widgetManager.setWidgets(view)

  view.ui.add(
    new Expand({
      view: view,
      expanded: true,
      content: document.getElementById("infoDiv") as __esri.WidgetProperties
    }),
    "top-right"
  );
  // document?.getElementById("layerBlending")?.addEventListener("calciteSwitchChange", () => {
  //   layer.blendMode = layer.blendMode === "normal" ? "luminosity" : "normal";
  // });

});

view.on('pointer-down', (ev) => {
  console.log(view.center)
  console.log(ev)
})
