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
import Editor from "@arcgis/core/widgets/Editor" // 編輯器
import Sketch from "@arcgis/core/widgets/Sketch" // 參考圖層
import Expand from "@arcgis/core/widgets/Expand" // 參考圖層
import Fullscreen from "@arcgis/core/widgets/Fullscreen" // 全螢幕

const graphicsLayer = new GraphicsLayer()
const map = new Map({
  basemap: "topo-vector",
  layers: [graphicsLayer]
})

let tccgug = new Tccgug("https://mcgbm.taichung.gov.tw/arcgis/rest/services/cmd_tccgugMap_rm/FeatureServer/0")
map.add(tccgug.layer);

map.add(Land.layer);

const view = new MapView({
  container: "viewDiv",
  map: map,
  zoom: 16,
  center: [120.57889244754534, 24.159856487625685]
});

view.when(() => {
  console.log("Map is loaded");

  // fullscreen widget
  const fullscreen = new Fullscreen({
    view: view
  });
  view.ui.add(fullscreen, "top-left");

  // sketch widget
  const sketch = new Sketch({
    view,
    layer: graphicsLayer
  });
  view.ui.add(sketch, "top-right")

  // Editor widget
  const editor = new Editor({
    view: view
  });
  // Add widget to the view
  view.ui.add(editor, "top-right");

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
