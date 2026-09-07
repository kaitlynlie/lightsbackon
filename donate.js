const GL_WIDGET_ID = "#html2";
import wixWindow from 'wix-window';
$w.onReady(function () {
  const glWidget = $w(GL_WIDGET_ID);
  glWidget.postMessage("is_wix");
  glWidget.onMessage((event) => {
      if (event.data === "is_wix") {
          glWidget.postMessage("is_wix");
      } else {
          const matches = event.data.match(/^wix:open_modal:(.*)$/);
          if (matches) {
              wixWindow.openModal(`${matches[1]}&show_close_button=false`, {
                  "width": 500,
                  "height": 650
              });
          }
      }
  });
});