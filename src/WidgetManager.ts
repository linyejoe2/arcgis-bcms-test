import MapView from "@arcgis/core/views/MapView"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
import { UIPosition } from "./types"

// 小工具
import Widget from "@arcgis/core/widgets/Widget"
import Editor from "@arcgis/core/widgets/Editor" // 編輯器
import Sketch from "@arcgis/core/widgets/Sketch" // 參考圖層
import Fullscreen from "@arcgis/core/widgets/Fullscreen" // 全螢幕

interface widget {
  /**
   * 看不看的到
   */
  display: boolean,
  /**
   * 位置
   */
  position: UIPosition
  /**
   * 要用的小工具
   */
  widget: Widget,
}

/**
 * widget manager
 */
export class WidgetManager {

  constructor(view: MapView) {
    this.sketch = {
      display: true,
      position: "top-right",
      widget: new Sketch({
        view: view,
        layer: view.map.layers.getItemAt(
          view.map.layers.findIndex(
            (item) => { return item.title == 'referLayer' }))
      })
    }
    this._widgets.push(this.sketch)

    this.editor = {
      display: true,
      position: "top-right",
      widget: new Editor({
        view: view
      })
    }
    this._widgets.push(this.editor)

    this.fullscreen = {
      display: true,
      position: "top-left",
      widget: new Fullscreen({
        view: view
      })
    }
    this._widgets.push(this.fullscreen)


  }

  /**
   * 所有的小工具會在實例化時存在這
   */
  private _widgets: widget[] = []

  public editor: widget
  public sketch: widget
  public fullscreen: widget
  // public editor: widget

  public setWidgets(view: MapView) {
    for (let widget of this._widgets) {
      view.ui.remove(widget.widget)
      if (widget.display) view.ui.add(widget.widget, widget.position)
    }
  }

  public cleanWidgets(view: MapView) {
    for (let widget of this._widgets) {
      view.ui.remove(widget.widget)
      // if (widget.display) view.ui.add(widget.widget, widget.position)
    }
  }
}