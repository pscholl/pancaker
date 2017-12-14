/**
 * @file This is the window node module for the advanced queue window
 * that supplies init and binding code for the PancakePainter window API.
 * Exports function returns a window control object that allows triggering on
 * init, show, and hide events.
 * We have full access to globals loaded in the mainWindow as needed, just
 * reference them below.
 **/
 /* globals $, mainWindow */

module.exports = function(context) {
  var queue = {};

  function bindButtons() {
    $('button', context).click(function() {
      switch(this.name) {
        case 'cancel':
          mainWindow.overlay.toggleWindow('queue', false);
          break;
      }
    });
  }

  function bindQueueChange() {
    mainWindow.overlay.windows.export.queueChanged.push(function(q) {
      var table = document.createElement('div');

      for (var i=0; i<q.length; i++) {
        var cell = document.createElement('div'),
            text = document.createElement('div'),
         overlay = document.createElement('div'),
            elem = document.createElement('div'),
          cancel = document.createElement('button'),
             img = q[i].preview;

        $(cancel).click(mainWindow.overlay.windows.export.cancel.bind(i));

        overlay.className = 'overlay';
        cancel.className = 'fancy';
        cell.className = 'container';
        text.className = 'text';
        img.className = 'preview';
        cancel.setAttribute('name', 'cancel');
        cancel.innerHTML = 'cancel';

        text.innerHTML = new String(q[i].length) + " lines";
        overlay.appendChild(cancel)

        elem.appendChild(img);
        elem.appendChild(text);

        cell.appendChild(elem);
        cell.appendChild(overlay);

        table.appendChild(cell);
      }

      var container = $('#queue-container')[0];
      container.replaceChild(table, container.firstElementChild);
    });
  }

  /**
   * Window initialization callback, triggered on window import.
   */
  queue.init = function() {
    bindQueueChange();
    bindButtons();
  };

  /**
   * Window show event callback, triggered on window show.
   */
  queue.show = function() {

  };

  /**
   * Window hide event callback, triggered on window close.
   */
  queue.hide = function() {

  };

  return queue;
};
