let docHeight;
let closest, ab;
let LastClickedLink;

$(() => {
  window["theme"] = "dark";
  $("body")[0].style.setProperty("--theme", window["theme"]);

  $("body").append(
    (window["desktop"] = new Desktop({
      icons: [

        new DesktopIcon({
          id: "trade",
          icon: `https://img.icons8.com/?size=48&id=xOOc020WXZGP&format=png`,
          url: "dropmefiles.com/",
          text: "free bachelor courses",
          action: `Window.spawnWindow('msedge')`,
        }),
   
        new DesktopIcon({
          id: "aitutor",
          icon: `https://img.icons8.com/?size=100&id=uZrQP6cYos2I&format=png&color=000000`,
          url: "aitutorpro.ca",
          text: "free GPT5 for students",
          action: `Window.spawnWindow('msedge')`,
        }),

            new DesktopIcon({
          id: "documator",
          icon: `https://icons8.com/icon/d2H6kHCiPSIg/pdf`,
          url: "documator.cc/",
          text: "PDF summary",
          action: `Window.spawnWindow('msedge')`,
        }),

              new DesktopIcon({
          id: "pdflex",
          icon: `https://img.icons8.com/?size=100&id=undefined&format=png&color=000000`,
          url: "pdfflex.com/ai-chat-with-pdf?",
          text: "PDF tools",
          action: `Window.spawnWindow('msedge')`,
        }),


        
        new DesktopIcon({
          id: "learn",
          icon: `https://img.icons8.com/?size=100&id=t27Bnqu2AiMe&format=png&color=000000`,
          url: "feyn.ai/learn",
          text: "Ask + Learn + Quiz",
          action: `Window.spawnWindow('msedge')`,
        }),


        new DesktopIcon({
          id: "quran",
          icon: `https://img.icons8.com/?size=100&id=ndMl0oC05W8G&format=png&color=000000`,
          url: "askmuslim.app",
          text: "Holy Quran",
          action: `Window.spawnWindow('msedge')`,
        }),
       
      ],
    }))
  );

  desktop.append(
    (window["taskbar"] = new Taskbar({
      id: "taskbar",
      center_buttons: [
        new TaskbarButton({ id: 0, btn_type: "start", w_title: "Start" }),
      
        new TaskbarButton({
          id: 3,
          btn_type: "button",
          pinned: true,
          w_title: "Notepad",
          icon: App_Notepad.app_settings.icon_tiny,
          app: "notepad",
        }),
      ],
      system_tray: new SystemTray(),
    }))
  );

  reinitDraggables();
  reinit_tooltips();

  docHeight = $(window).height();
});

$(window).on("resize", function () {
  docHeight = $(window).height();
});

$(document).on("keydown", function (e) {
  if (e.altKey) {
    if (window["theme"] == "dark") {
      window["theme"] = "light";
    } else {
      window["theme"] = "dark";
    }
    toggleTheme();
  }
});

const transparent = () => {
  return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
};

const reinit_tooltips = () => {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
      delay: { show: 1000, hide: 10 },
    });
  });
};

const closeToolTips = () => {
  $(".tooltip").tooltip("hide");
};

const pauseToolTips = (type) => {
  setTimeout(() => {
    let tts = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tts.map((tt) => {
      if (tt.length) {
        if (type == true) {
          bootstrap.Tooltip.getInstance(tt).hide();
          bootstrap.Tooltip.getInstance(tt).disable();
          closeToolTips();
        } else {
          bootstrap.Tooltip.getInstance(tt).enable();
        }
      }
    });
  }, 10);
};

const ucwords = (str) => {
  return (str + "").replace(/^([a-z])|\s+([a-z])/g, function ($1) {
    return $1.toUpperCase();
  });
};

const concat = (arr) => {
  let res = "";
  arr.forEach((e) => {
    res += e;
  });
  return res;
  //return res.replace("undefined", "")
};

const hasParents = (e, p) => {
  return $(e.target).parents(p).length;
};

const wid = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

async function screenshotElement(el) {
  return await new Promise((resolve) => {
    html2canvas($(el), {
      onrendered: function (canvas) {
        resolve(canvas.toDataURL());
      },
    });
  });
}

const zeroPad = (num, places) => String(num).padStart(places, "0");

function strstr($haystack, $needle, $bool) {
  var $pos = 0;
  $haystack += "";
  $pos = $haystack.indexOf($needle);
  if ($pos == -1) {
    return false;
  } else {
    if ($bool) {
      return $haystack.substr(0, $pos);
    } else {
      return $haystack.slice($pos);
    }
  }
}

// For middle clicking
$(document).on("mousedown", function (e1) {
  if (e1.which === 2) {
    $(document).one("mouseup", function (e2) {
      if (e1.target === e2.target) {
        var e3 = $.event.fix(e2);
        e3.type = "middleclick";
        $(e2.target).trigger(e3);
      }
    });
  }
});
// Code to see if two elements are touching
const elementsTouch = (a, b) => {
  if (a && b) {
    let rect1 = a.getBoundingClientRect();
    let rect2 = b.getBoundingClientRect();
    return !(
      rect1.top + rect1.height < rect2.top ||
      rect1.top > rect2.top + rect2.height ||
      rect1.left + rect1.width < rect2.left ||
      rect1.left > rect2.left + rect2.width
    );
  }
};

// Allows elements to be dragged
const reinitDraggables = (element) => {
  $(element).each((i, el) => {
    let pos = {};
    let handle = $(el).find(".handle");

    $(el)
      .find(handle)
      .on("mousedown touchstart", function (e) {
        pos = {
          x: e.clientX,
          y: e.clientY,
        };

        $(document).on("mousemove touchmove", $(el), mouseMoveHandler);
        $(document).on("mouseup touchend", $(el), mouseUpHandler);
      });

    const mouseMoveHandler = (e) => {
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      $(el)
        .not(".maximized")
        .css({
          top: `${el.offsetTop + dy}px`,
          left: `${el.offsetLeft + dx}px`,
        });

      pos = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const mouseUpHandler = () => {
      $(document).off("mousemove touchmove", mouseMoveHandler);
      $(document).off("mouseup touchend", mouseUpHandler);
    };
  });
};

// Allows element to be resized from all sides and corners
const reinitResizables = (element, min_size = 20) => {
  $(element).each((i, el) => {
    $(el).html(
      $(el).html() +
        `
      <div class="resizer resizer-l"></div>
      <div class="resizer resizer-r"></div>
      <div class="resizer resizer-t"></div>
      <div class="resizer resizer-b"></div>
      
      <div class="resizer resizer-tl"></div>
      <div class="resizer resizer-tr"></div>
      <div class="resizer resizer-bl"></div>
      <div class="resizer resizer-br"></div>
    `
    );

    let resizer = $(el).find(".resizer");
    let currentResizer;
    let orig = {};

    $(resizer).on("mousedown touchstart", function (e) {
      currentResizer = e.target;

      const styles = window.getComputedStyle(el);
      orig = {
        w: parseInt(styles.width, 10),
        h: parseInt(styles.height, 10),
        x: parseInt(styles.left, 10),
        y: parseInt(styles.top, 10),
        mx: e.pageX,
        my: e.pageY,
      };

      $(document).on("mousemove touchmove", mouseMoveHandler);
      $(document).on("mouseup touchend", mouseUpHandler);
    });

    const mouseMoveHandler = (e) => {
      let cr = currentResizer.classList;
      if (
        cr.contains("resizer-r") ||
        cr.contains("resizer-tr") ||
        cr.contains("resizer-br")
      ) {
        const newW = orig.w + (e.pageX - orig.mx);
        if (newW > min_size) {
          $(el).css({ width: `${newW}px` });
        }
      }

      if (
        cr.contains("resizer-l") ||
        cr.contains("resizer-tl") ||
        cr.contains("resizer-bl")
      ) {
        const newW = orig.w - (e.pageX - orig.mx);
        if (newW > min_size) {
          $(el).css({
            width: `${newW}px`,
            left: `${orig.x + (e.pageX - orig.mx)}px`,
          });
        }
      }

      if (
        cr.contains("resizer-b") ||
        cr.contains("resizer-bl") ||
        cr.contains("resizer-br")
      ) {
        const newH = orig.h + (e.pageY - orig.my);
        if (newH > min_size) {
          $(el).css({ height: `${newH}px` });
        }
      }

      if (
        cr.contains("resizer-t") ||
        cr.contains("resizer-tl") ||
        cr.contains("resizer-tr")
      ) {
        const newH = orig.h - (e.pageY - orig.my);
        if (newH > min_size) {
          $(el).css({
            height: `${newH}px`,
            top: `${orig.y + (e.pageY - orig.my)}px`,
          });
        }
      }
    };

    const mouseUpHandler = () => {
      $(document).off("mousemove touchmove", mouseMoveHandler);
      $(document).off("mouseup touchend", mouseUpHandler);
    };
  });
};

class Desktop extends HTMLElement {
  constructor(args) {
    super();
    this.icons = args.icons;

    this.addDesktopIcons();
    this.applyTheme();
  }

  connectedCallback() {
    this.eventHandlers();
  }

  addDesktopIcons() {
    $(this).append(this.icons);
  }

  applyTheme() {
    $(this)[0].style.setProperty("--theme", window["theme"]);
    let wallpaper =
      window["theme"] == "light" ? wallpaper_light : wallpaper_dark;
    $(this).css({ "background-image": `url(${wallpaper})` });
  }

  eventHandlers() {
    let _this = this;
    let shiftPressed = false;
    let initFocused, currentlyFocused;

    $(this).on("mousedown", function (e) {
      if (!e.ctrlKey && !e.shiftKey) $("w-desktop-icon").removeClass("active");
      //e.preventDefault()
    });

    $(this).on("keyup", function (e) {
      shiftPressed = false;
    });

    $(this).on("keydown", function (e) {
      //38 = Up | 40 = Down
      // CTRL + A (Select All)
      if (e.ctrlKey && e.keyCode == 65) {
        $("w-desktop-icon").addClass("active");
        $("w-desktop-icon.active:last-of-type").focus(); // Focus on the last element selected
      }

      // Keep track of shift press only once
      if (!shiftPressed && e.keyCode == 16) {
        shiftPressed = true;
        initFocused = $("w-desktop-icon:focus").index();
        if ($("w-desktop-icon:focus").length) {
          initFocused = $("w-desktop-icon:focus").index();
        }
      }

      // Standard icon nav without shift key
      if (!e.shiftKey) {
        if (e.keyCode == 38) {
          $("w-desktop-icon:focus").prev().focus();
          $("w-desktop-icon").removeClass("active");
        }
        if (e.keyCode == 40) {
          $("w-desktop-icon:focus").next().focus();
          $("w-desktop-icon").removeClass("active");
        }
      } else {
        if (e.keyCode == 38) {
          $("w-desktop-icon:focus")
            .addClass("active")
            .prev()
            .addClass("active")
            .focus();

          if (currentlyFocused > initFocused) {
            $("w-desktop-icon:focus").nextAll().removeClass("active");
          }
        }

        if (e.keyCode == 40) {
          $("w-desktop-icon:focus")
            .addClass("active")
            .next()
            .addClass("active")
            .focus();

          if (currentlyFocused < initFocused) {
            $("w-desktop-icon:focus").prevAll().removeClass("active");
          }
        }
        currentlyFocused = $("w-desktop-icon:focus").index();
      }
    });

    // Right click context
    $(this).on("contextmenu", function (e) {
      if (e.target.nodeName == "W-DESKTOP") {
        window[`cxt_desktop`] = new ContextMenu({
          id: `cxt_desktop`,
          pos: {
            x: e.pageX,
            y: e.pageY,
          },
          taskbar_context: false,
          buttons: [
            {
              icon: base64_view_tiny,
              text: "View",
            },
            {
              icon: base64_sortby_tiny,
              text: "Sort By",
            },
            {
              icon: base64_refresh_tiny,
              text: "Refresh",
            },
            { text: "---" },
            {
              icon: base64_undo_tiny,
              text: "Undo",
            },
            {
              icon: base64_new_tiny,
              text: "New",
              more_buttons: [{ text: "Text Document" }],
            },
            { text: "---" },
            {
              icon: base64_displaysettings_tiny,
              text: "Display Settings",
            },
            {
              icon: base64_personalise_tiny,
              text: "Personalise",
            },
            { text: "---" },
            {
              icon: base64_showmoreoptions_tiny,
              text: "Show more options",
            },
          ],
        });
        $("w-desktop").append(window[`cxt_desktop`]);
      }

      e.preventDefault();
      //e.stopImmediatePropagation()
    });

    const desktopDrag = () => {
      let pos = {};

      $(document).on("mousedown touchstart", "w-desktop", function (e) {
        if (e.target.nodeName == "W-DESKTOP") {
          pos = {
            x: e.clientX,
            y: e.clientY,
          };

          $("w-desktop").append(`<div class="desktop-drag"></div>`);
          $(".desktop-drag").css({
            top: pos.y,
            left: pos.x,
          });

          $(document).on(
            "mousemove touchmove",
            "w-desktop",
            desktopMouseMoveHandler
          );
          $(document).on(
            "mouseup touchend",
            "w-desktop",
            desktopMouseUpHandler
          );
        }
      });

      const desktopMouseMoveHandler = (e) => {
        if (e.clientX > pos.x) {
          $(".desktop-drag").css({
            left: pos.x,
            width: e.clientX - pos.x,
          });
        }

        if (e.clientY > pos.y) {
          $(".desktop-drag").css({
            top: pos.y,
            height: e.clientY - pos.y,
          });
        }

        if (e.clientX < pos.x) {
          $(".desktop-drag").css({
            left: e.clientX,
            width: pos.x - e.clientX,
          });
        }

        if (e.clientY < pos.y) {
          $(".desktop-drag").css({
            top: e.clientY,
            height: pos.y - e.clientY,
          });
        }

        $("w-desktop-icon").each((i, e) => {
          if (elementsTouch(e, $(".desktop-drag")[0])) $(e).addClass("active");
          if (!elementsTouch(e, $(".desktop-drag")[0]))
            $(e).removeClass("active");
        });
      };

      const desktopMouseUpHandler = () => {
        $(".desktop-drag").remove();
        $("w-desktop-icon:last-of-type").focus(); // Focus on the last element selected
        $(document).off(
          "mousemove touchmove",
          "w-desktop",
          desktopMouseMoveHandler
        );
        $(document).off("mouseup touchend", "w-desktop", desktopMouseUpHandler);
      };
    };
    desktopDrag();
  }
}
customElements.define("w-desktop", Desktop);

class DesktopIcon extends HTMLElement {
  constructor(args) {
    super();
    this.id = args ? args.id : $(this).attr("data-id");
    this.icon = args ? args.icon : $(this).attr("data-icon");
    this.text = args ? args.text : $(this).attr("data-text");
    this.url = args ? args.url : $(this).attr("data-url");
    this.action = (args ? args.action : $(this).attr("data-action")) ?? "";
    $(this).html(this.html());
    $(this).attr("tabindex", 0);
    $(this).attr("draggable", true);
    $(this).attr(`data-url`, this.url);
  }

  html() {
    return `
      <img src="${this.icon}" draggable="false">
      <span>${this.text}</span>
    `;
  }

  connectedCallback() {
    this.eventHandlers();
  }

  eventHandlers() {
    let _this = this;
    let activeEl;

    $(this).on("mousedown touchstart", function (e) {
      activeEl = $(document.activeElement).index();
      //e.preventDefault()
    });

    $(this).on("dblclick touchstart", function (e) {
      if (e.type === "touchstart" && e.touches.length > 1) {
        // Ignore multi-touch events
        return;
      }
      console.log(_this.action);
      window.LastClickedLink = _this.url;
      eval(_this.action);
      e.preventDefault();
    });

    $(this).on("dragstart", function (e) {
      $(this).addClass("dragging");
    });

    $(this).on("dragover", function (e) {
      closest = $(this).closest("w-desktop-icon:not(.dragging)");

      $("w-desktop-icon").removeClass("dragHovered above below");

      if (closest.length) {
        // Is ghost above or below item?
        let closestCoords = $(closest)[0].getBoundingClientRect();
        if (e.clientY < closestCoords.y + closestCoords.height / 2) {
          $(closest).addClass("dragHovered above");
          ab = "above";
        } else {
          $(closest).addClass("dragHovered below");
          ab = "below";
        }
      }
      e.preventDefault();
    });

    $(this).on("dragend", function (e) {
      $("w-desktop-icon").removeClass("dragHovered dragging above below");
      if (ab == "above") {
        $(closest).before($(this));
      } else {
        $(closest).after($(this));
      } //$(closest).swapWith($(this))
    });

    /*
    $(this).draggable({
      containment: "parent", grid: [ 100,100 ], opacity: 0.7
    })
    */
  }
}
customElements.define("w-desktop-icon", DesktopIcon);
class StartMenu extends HTMLElement {
  constructor(args) {
    super();
    $(this).html(this.html());
    this.applyTheme();
    this.init();
  }

  applyTheme() {
    $(this)[0].style.setProperty("--theme", window["theme"]);
  }

  init() {
    setTimeout(() => {
      // Add Pinned Icons
      this.addIcons("w-startmenu .pinned-apps:not(.recommended)", [
        new StartMenuIcon({
          icon: base64_getstarted_small,
          title: "Get Started",
          app: "getstarted",
        }),
        new StartMenuIcon({
          icon: "https://i.postimg.cc/zGWXVLpd/fileexplorer.png",
          title: "File Explorer",
          app: "explorer",
          action: {
            titlebar: "Documents",
            icon: base64_icon_documents,
            path: "documents",
          },
        }),
        new StartMenuIcon({
          icon: "https://i.postimg.cc/90RsJn8c/notepad.png",
          title: "Notepad",
          app: "notepad",
        }),
        new StartMenuIcon({
          icon: "https://i.postimg.cc/NFb6WsKt/microsoftstore.png",
          title: "Microsoft Store",
        }),
      ]);

      // Add Recommended Icons
      this.addIcons("w-startmenu .pinned-apps.recommended", [
        new StartMenuIcon({
          icon: base64_icon_settings,
          title: "Settings",
          subtitle: "For you",
          app: "settings",
        }),
        new StartMenuIcon({
          icon: base64_icon_help,
          title: "About",
          subtitle: "By x2i",
          action: "alert('By Dan Wheeler 2023')",
        }),
      ]);

      // Add All Apps Icons
      this.addIcons("w-startmenu .all-apps", [
        "<div class='header'>C</div>",
        new StartMenuAllIcon({
          icon: base64_cmd,
          title: "Command Prompt",
          app: "cmd",
        }),
        "<div class='header'>E</div>",
        new StartMenuAllIcon({
          icon: base64_icon_explorer,
          title: "Explorer",
          app: "explorer",
        }),
        "<div class='header'>G</div>",
        new StartMenuAllIcon({
          icon: base64_getstarted_small,
          title: "Get Started",
          app: "getstarted",
        }),
        "<div class='header'>G</div>",
        new StartMenuAllIcon({
          icon: base64_icon_notepad,
          title: "Notepad",
          app: "notepad",
        }),
        "<div class='header'>S</div>",
        new StartMenuAllIcon({
          icon: base64_icon_settings,
          title: "Settings",
          app: "settings",
        }),
        "<div class='header'>T</div>",
        new StartMenuAllIcon({
          icon: base64_icon_taskmgr,
          title: "Task Manager",
          app: "taskmanager",
        }),
      ]);

      // Fix positioning
      $(this).css({
        top: `${$(document).height() - $(window["taskbar"]).height()}`,
        left: `${$(window).width() / 2 - this.clientWidth / 2}px`,
        animation: "slideUp .2s forwards",
      });
    }, 1);
    setTimeout(() => {
      closeToolTips();
      reinit_tooltips();
    }, 200);
  }

  connectedCallback() {
    this.eventHandlers();
  }

  addIcons(section, icons) {
    $(section).append(icons);
  }

  closeStartMenu() {
    let _this = this;
    $(window["start_menu"]).css({ animation: "slideFadeDown .3s forwards" });
    setTimeout(() => {
      closeToolTips();
      _this.remove();
    }, 200);
    delete window["start_menu"];
  }

  eventHandlers() {
    let _this = this;

    $(window).on("resize", function (e) {
      $(_this).css({
        left: `${
          $(window).width() / 2 - $(window["start_menu"]).width() / 2
        }px`,
      });
      /*
            "top": `${_this.pos.y}`,
            "scale": `${($(window).height() / ($(window).height() * 2.05))}` 
            */
    });

    $(this).on("click", ".all_apps", function (e) {
      $(_this).find(".left").css({ transform: "translate(-100%)" });
      $(_this).find(".right").css({ transform: "translate(-100%)" });
    });
    $(this).on("click", ".all_apps_back", function (e) {
      $(_this).find(".left").css({ transform: "translate(0%)" });
      $(_this).find(".right").css({ transform: "translate(0%)" });
    });

    // Click outside of context
    $("*").on("click contextmenu", function (e) {
      if (
        $(window["start_menu"]).length &&
        !hasParents(e, "w-startmenu") &&
        !hasParents(e, ".start")
      ) {
        _this.closeStartMenu();
        $(this).off();
      }
      e.preventDefault();
    });

    $(this).on("contextmenu", function (e) {
      if (hasParents(e, "w-startmenu")) {
        if ($("w-context-menu").length) {
          $("w-context-menu")[0].closeContext();
        }
        window["startmenu_context"] = new ContextMenu({
          id: "startmenu_context",
          pos: {
            x: e.pageX,
            y: e.pageY,
          },
          taskbar_context: false,
          buttons: [
            {
              icon: taskman_settings,
              text: "Start settings",
            },
          ],
        });
        $(window["desktop"]).append(window["startmenu_context"]);
      }
      e.stopImmediatePropagation();
      e.preventDefault();
    });
  }
}
customElements.define("w-startmenu", StartMenu);

class StartMenuIcon extends HTMLElement {
  constructor(args) {
    super();
    this.icon = args.icon;
    this.title = args.title;
    this.app = args.app;
    this.action = args.action;
    this.subtitle = args.subtitle;
    $(this).html(this.html());
  }

  html() {
    return `
            <img src="${this.icon}">
            <span>
                ${this.title}
                <small>${this.subtitle ?? ""}</small>
            </span>
        `;
  }

  connectedCallback() {
    this.eventHandlers();
  }

  eventHandlers() {
    let _this = this;

    $(this).on("click", function (e) {
      if (this.app) {
        Window.spawnWindow(_this.app, _this.action);
        window["start_menu"].closeStartMenu();
      } else {
        eval(this.action);
      }
    });
  }
}
customElements.define("w-startmenu-icon", StartMenuIcon);

class StartMenuAllIcon extends HTMLElement {
  constructor(args) {
    super();
    this.icon = args.icon;
    this.title = args.title;
    this.app = args.app;
    this.action = args.action;
    $(this).html(this.html());
  }

  html() {
    return `
            <img src="${this.icon}">
            <span>
                ${this.title}
            </span>
        `;
  }

  connectedCallback() {
    this.eventHandlers();
  }

  eventHandlers() {
    let _this = this;

    $(this).on("click", function (e) {
      if (this.app) {
        Window.spawnWindow(_this.app, _this.action);
        window["start_menu"].closeStartMenu();
      } else {
        eval(this.action);
      }
    });
  }
}
customElements.define("w-startmenuall-icon", StartMenuAllIcon);
class Taskbar extends HTMLElement {
  constructor(args) {
    super();
    this.id = args.id;
    this.center_buttons = args.center_buttons;
    this.system_tray = args.system_tray;

    $(this).html(this.html());
    this.applyTheme();
    this.drawSections();
  }

  applyTheme() {
    $(this)[0].style.setProperty("--theme", window["theme"]);
  }

  html() {
    return `
            <div class="left"></div>
            <div class="center"></div>
            <div class="right"></div>
        `;
  }

  drawSections() {
    $(this).find(".center").append(this.center_buttons);
    setTimeout(() => {
      // Pull center part to the right to compensate for the sys tray
      $(this)
        .find(".center")
        .css({ "margin-right": `-${$(this).find(".center").width() / 2}px` });
    });
    $(this).find(".right").append(this.system_tray);
  }

  connectedCallback() {
    this.eventHandlers();
  }

  eventHandlers() {
    let _this = this;

    $(this).on("contextmenu", function (e) {
      if (e.target.nodeName == "W-TASKBAR") {
        if ($("w-context-menu").length) {
          $("w-context-menu")[0].closeContext();
        }
        window["taskbar_context"] = new ContextMenu({
          id: "taskbar_context",
          pos: {
            x: e.pageX,
            y: $(window["taskbar"]).position().top,
          },
          taskbar_context: true,
          buttons: [
            {
              icon: base64_taskmanager,
              text: "Task Manager",
              action: `Window.spawnWindow('taskmanager')`,
            },
            {
              icon: base64_taskbarsettings,
              text: "Taskbar settings",
              action: `Window.spawnWindow('settings')`,
            },
          ],
        });
        $(window["desktop"]).append(window["taskbar_context"]);
      }
      e.preventDefault();
      e.stopImmediatePropagation();
    });
  }
}
customElements.define("w-taskbar", Taskbar);

class TaskbarButton extends HTMLElement {
  constructor(args) {
    super();
    this.id = args.id;
    this.btn_type = args.btn_type;
    this.w_title = args.w_title;
    this.icon = args.icon;
    this.pinned = args.pinned;
    this.app = args.app;
    this.applyTheme();
    this.applyAttrs();
  }

  html() {
    return `
                  <span class="icon-img" style="background-image: url(${this.icon});"></span>
            `;
  }

  applyTheme() {
    $(this)[0].style.setProperty("--theme", window["theme"]);
    if (this.btn_type == "start")
      this.icon =
        window["theme"] == "dark" ? base64_startbtn_dark : base64_startbtn;
    $(this).html(this.html());
  }

  applyAttrs() {
    $(this).attr("id", `tskbtn_${this.id}`);
    $(this).attr("tabindex", 0);
    $(this).attr("data-bs-toggle", "tooltip");
    $(this).attr("data-bs-placement", "top");
    $(this).attr("title", this.w_title);
    $(this).attr("data-context-id", `ctx_${this.id}`);

    if (this.btn_type == "start") {
      $(this).attr("class", "button start");
    } else {
      $(this).attr("class", "button");
      $(this).attr("data-tskbtn-id", this.id);
      $(this).attr("data-pinned", this.pinned);
      $(this).attr("data-app", this.app);
      $(this).attr("data-app-title", this.w_title);
      $(this).attr("data-app-icon", this.icon);
    }
  }

  connectedCallback() {
    this.eventHandlers();
  }

  createContext() {
    if (this.btn_type == "start") {
      return [
        { text: "Installed apps" },
        { text: "Mobility Centre" },
        { text: "Power Options" },
        { text: "Event Viewer" },
        { text: "System" },
        { text: "Device Manager" },
        { text: "Network Connections" },
        { text: "Disk Management" },
        { text: "Computer Management" },
        { text: "Terminal" },
        { text: "Terminal (Admin)" },
        { text: "---" },
        { text: "Task Manager" },
        { text: "Settings" },
        { text: "File Explorer" },
        { text: "Search" },
        { text: "Run" },
        { text: "---" },
        { text: "Shut down or sign out" },
        { text: "Desktop" },
      ];
    } else {
      let cxt, wndCnt;

      wndCnt = $(`w-window[data-app=${this.app}]`).length;

      cxt = [
        {
          icon: this.icon,
          text: $(this).attr("data-app-title"),
          action: `Window.spawnWindow('${$(this).attr("data-app")}')`,
        },
      ];

      // Add close Window if any windows of this button exist
      if (wndCnt) {
        cxt.push({
          icon: base64_closewindow,
          text:
            wndCnt == 1 ? "Close Window" : "Close all windows on this display",
          action: `$(\`w-window[data-app=${this.app}]\`).map(function(e, i) {
                                    i.closeWindow()
                              })`,
        });
      }

      return cxt;
    }
  }

  eventHandlers() {
    let _this = this;

    // Context menu
    $(this).on("contextmenu", function (e) {
      parent = e.currentTarget.offsetParent;
      window[$(this).attr("data-context-id")] = new ContextMenu({
        id: $(this).attr("data-context-id"),
        pos: {
          x: this.offsetLeft * 1.04,
          y: parent.offsetTop,
        },
        taskbar_context: true,
        buttons: this.createContext(),
      });
      $("w-desktop").append(window[$(this).attr("data-context-id")]);
      $(this).focus();
      pauseToolTips(true);
      e.preventDefault();
      e.stopImmediatePropagation();
    });

    $(this).on("click", function (e) {
      if (this.btn_type == "start") {
        // Start menu
        if (window["start_menu"]) {
          window["start_menu"].closeStartMenu();
        } else {
          window["start_menu"] = new StartMenu();
          $("w-desktop").append(window["start_menu"]);
        }
      } else {
        // Is app already open - one instance?
        let wlen = $(`w-window[data-app=${this.app}]`).length;
        if (wlen) {
          if (wlen == 1) {
            let wid = $(`w-window[data-app=${this.app}]`).attr("id");
            if (window[wid].state == 0) {
              window[wid].unminimizeWindow();
            }
            window[wid].focusWindow();
          } else if (wlen > 1) {
            return;
          }
        } else {
          if ($(this).attr("data-app") == "explorer") {
            Window.spawnWindow($(this).attr("data-app"), {
              titlebar: "Documents",
              icon: base64_icon_documents,
              path: "documents",
            });
          } else {
            Window.spawnWindow($(this).attr("data-app"));
          }
        }
      }
      $(this).focus();
      e.stopImmediatePropagation();
    });

    $(this).on("middleclick dblclick", function (e) {
      if (_this.btn_type != "start") {
        if ($(this).attr("data-app") == "explorer") {
          Window.spawnWindow($(this).attr("data-app"), {
            titlebar: "Documents",
            icon: base64_icon_documents,
            path: "documents",
          });
        } else {
          Window.spawnWindow($(this).attr("data-app"));
        }
      }
    });

    $(this).on("mouseover", function (e) {
      if (!$("w-context-menu").length) {
        if (window["taskbar_thumbs"]) window["taskbar_thumbs"].close();
        if ($(`w-window[data-app=${this.app}]`).length) {
          _this.createThumbnailPreviews(e);
        }
      } else {
        pauseToolTips(true);
        if ($("w-taskbar-thumbnails").length)
          $("w-taskbar-thumbnails")[0].close();
      }
    });
  }

  createThumbnailPreviews(e) {
    if (!window["taskbar_thumbs"]) {
      $("w-desktop").append(
        (window["taskbar_thumbs"] = new TaskbarThumbnails({
          apps: this.app,
          pos: {
            x: e.pageX,
            y: 0,
          },
        }))
      );
    }
  }
}
customElements.define("w-taskbar-button", TaskbarButton);
class TaskbarThumbnails extends HTMLElement {
  constructor(args) {
    super();
    this.apps = args.apps;
    this.pos = args.pos;

    this.fillThumbs().then((e) => {
      $(this).html(e).attr("style", `--theme: ${window["theme"]}`);
    });
  }

  async fillThumbs(e) {
    let ico = false;
    $("w-taskbar-thumbnails").html("");
    return await new Promise((resolve) => {
      $(`w-window[data-app=${this.apps}]`).each(function () {
        screenshotElement($(this)).then((e) => {
          if ($(this).attr("state") == 0) {
            e = $(this).attr("data-app-icon");
            ico = true;
          }
          $("w-taskbar-thumbnails").append(`
                                    <div class="thumb" data-wid="${$(this).attr(
                                      "id"
                                    )}">
                                          <span>
                                                <img src="${$(this).attr(
                                                  "data-app-icon"
                                                )}">
                                                <p>${$(this).attr(
                                                  "data-app-title"
                                                )}</p>
                                                <i class="fa fa-times"></i>
                                          </span>
                                          <img class="thumbimg ${
                                            ico ? "icon" : ""
                                          }" src="${e}">
                                    </div>
                              `);
        });
      });
      this.init();
      resolve();
    });
  }

  init() {
    setTimeout(() => {
      this.reposition();
      $(this)
        .css({
          opacity: 1,
        })
        .fadeIn(100);
    }, 100);
    closeToolTips();
    pauseToolTips(true);
  }

  connectedCallback() {
    this.eventHandlers();
  }

  reposition() {
    setTimeout(() => {
      $(this).css({
        top: $(window["taskbar"]).position().top - $(this).height() - 10,
        left: this.pos.x - $(this).width() / 2,
      });
    }, 100);
  }

  eventHandlers() {
    let _this = this;
    let previouslyFocused;
    let previousState;

    $(this).on("click", ".thumb", function (e) {
      $("w-window").show();
      if (window[$(this).attr("data-wid")].state == 0)
        window[$(this).attr("data-wid")].unminimizeWindow(false);
      setTimeout(() => {
        window[$(this).attr("data-wid")].focusWindow();
      }, 100);
      _this.close();
      $(this).off();
    });

    $(this).on("click", ".thumb .fa-times", function (e) {
      let wid = $(this).parent().parent().attr("data-wid");
      window[wid].closeWindow();
      _this.close();
      $(this).off();
    });

    $(this).on({
      mouseleave: function () {
        _this.close();
      },
    });

    $(this).on(
      {
        mouseenter: function () {
          previouslyFocused = $("w-window[focused=true]").attr("id");
          previousState = window[$(this).attr("data-wid")].state;

          // Opaque all other windows except this
          $(`w-window:not(#${$(this).attr("data-wid")})`).hide();

          // If window minimized, then restore/maximize to show
          if (previousState == 0) {
            if (window[$(this).attr("data-wid")].oldstate == 1)
              window[$(this).attr("data-wid")].restoreWindow();
            if (window[$(this).attr("data-wid")].oldstate == 2)
              window[$(this).attr("data-wid")].maximizeWindow(false);
          }
          window[$(this).attr("data-wid")].focusWindow(false);
        },
        mouseleave: function () {
          $("w-window").show();
          if (previousState == 0) {
            window[$(this).attr("data-wid")].minimizeWindow(false);
          } else {
            window[previouslyFocused].focusWindow();
          }
        },
      },
      ".thumb"
    );
  }

  close() {
    pauseToolTips(false);
    $("w-window *").css({ opacity: "1" });
    $(this).remove();
    delete window["taskbar_thumbs"];
  }
}
customElements.define("w-taskbar-thumbnails", TaskbarThumbnails);
class Window extends HTMLElement {
  constructor(args) {
    super();
    this.wid = args.wid;
    this.app = args.app.toLowerCase();
    this.icon = args.icon;
    this.w_title = args.w_title;

    this.secondary_args = args.secondary_args ?? false;

    this.pos = args.pos;
    this.oldpos = this.pos;
    this.colorScheme = args.colorScheme ?? { r: 231, g: 236, b: 249, a: 0.9 };
    this.state = args.state ?? 1; //0=minimized, 1=default, 2=maximized
    this.oldstate = this.state;
    this.draggable = args.draggable ?? true;

    this.icons = args.icons ?? { min: true, max: true, close: true };
    this.minimizeIcon = svg_minimize;
    this.maximizeIcon = svg_maximize;
    this.closeIcon = svg_close;

    $(this).html(this.html());
    this.applyTheme();
    this.init();
  }

  applyTheme() {
    $(this)[0].style.setProperty("--theme", window["theme"]);
  }

  html() {
    return (
      `
                  <div class="header">
                        <span class="icon handle" style="background-image: url(${
                          this.icon
                        })"></span>
                        <span class="title handle">${this.w_title}</span>
                        <spacer>
                        <div class="icons">
                              ${
                                this.icons.min
                                  ? `<span class='button button-min' data-bs-toggle='tooltip' title='Minimize'>${this.minimizeIcon}</span>`
                                  : ""
                              }
                              ${
                                this.icons.max
                                  ? `<span class='button button-max'' data-bs-toggle='tooltip' title='Maximize'>${this.maximizeIcon}</span>`
                                  : ""
                              }
                              ${
                                this.icons.close
                                  ? `<span class='button button-close' data-bs-toggle='tooltip' title='Close'>${this.closeIcon}</span>`
                                  : ""
                              }
                        </div>
                  </div>` +
      eval(
        `new App_${ucwords(this.app)}({ wid: '${this.wid}', path: '${
          this.secondary_args.path
        }' })`
      ).outerHTML
    );
  }

  init() {
    $(`w-window`).attr("focused", false); // unfocus all other windows

    $(this).attr("id", this.wid);
    $(this).attr("draggable", false);
    $(this).attr("data-draggable", this.draggable ? true : false);
    $(this).attr("focused", true);
    $(this).attr("data-app", this.app);
    $(this).attr("data-app-title", this.w_title);
    $(this).attr("data-app-icon", this.icon);

    this.redrawWindow();
    this.focusWindow();

    setTimeout(() => {
      if ($("w-taskmanager").length && window["tasklist"])
        $("w-taskmanager .app-list").after(window["tasklist"].draw()); // Update taskmanager
    });
  }

  connectedCallback() {
    this.eventHandlers();
    reinit_tooltips();
  }

  redrawWindow(animate = true) {
    let _this = this;

    if (animate) $(this).css({ animation: "windowFadeIn .2s forwards" });

    $(this)
      .css({
        top: this.pos.y,
        left: this.pos.x,
        height: this.pos.h,
        width: this.pos.w,
      })
      .attr("state", this.state);

    setTimeout(() => {
      $(_this).removeClass("transition");
      this.taskbarUpdate();
      closeToolTips();
    });
  }

  eventHandlers() {
    let _this = this;

    // Minimize Button
    $(this).on("click", `.button-min`, function () {
      _this.minimizeWindow();
    });

    // Maximize Button
    $(this).on("click", `.button-max`, function () {
      _this.maximizeWindow();
    });

    // Maximize on titlebar doubleclick
    $(this).on("dblclick", `.handle`, function () {
      if (_this.state == 2) {
        _this.restoreWindow();
      } else {
        _this.maximizeWindow();
      }
    });

    // Restore Button
    $(this).on("click", `.button-restore`, function () {
      _this.restoreWindow();
    });

    // Close button
    $(this).on("click", `.button-close`, function () {
      _this.closeWindow();
    });

    // Focus Window
    $(this).on("focus click mousedown", function () {
      _this.focusWindow();
    });

    // TODO: Update location variables
    $(this).on("mouseup", function (e) {
      _this.pos = {
        x: $(this).position().left,
        y: $(this).position().top,
        h: $(this).height(),
        w: $(this).width(),
      };
    });

    // Prevent right click on titlebar buttons
    $(this).on("contextmenu", ".icons", function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
    });

    // Right click title bar context
    $(this).on("contextmenu", ".handle", function (e) {
      window[`cxt_${_this.id}`] = new ContextMenu({
        id: `cxt_${_this.id}`,
        pos: {
          x: e.pageX,
          y: e.pageY,
        },
        compact: true,
        taskbar_context: false,
        buttons: [
          {
            icon: base64_restore_tiny,
            text: "Restore",
            disabled: true,
          },
          {
            icon: base64_transparent,
            text: "Move",
            disabled: true,
          },
          {
            icon: base64_transparent,
            text: "Size",
            disabled: true,
          },
          {
            icon: base64_maximize_tiny,
            text: "Maximize",
          },
          {
            icon: base64_minimize_tiny,
            text: "Minimize",
          },
          { text: "---" },
          {
            icon: base64_close_tiny,
            text: "<b>Close</b>",
          },
        ],
      });
      $("w-desktop").append(window[`cxt_${_this.id}`]);

      e.preventDefault();
      e.stopImmediatePropagation();
    });

    reinitResizables(this);
    reinitDraggables(this);
  }

  minimizeWindow(animate = false) {
    this.oldstate = this.state;
    this.state = 0;
    $(this)
      .css({
        bottom: 0,
        animation: `windowZoomDown ${animate ? ".2s" : "0s"} forwards`,
      })
      .attr("state", this.state);
    setTimeout(() => {}, 190);
  }

  maximizeWindow(storeOldState = true) {
    this.state = 2;
    if (storeOldState) this.oldpos = this.pos;
    $(this).addClass("maximized transition").attr("state", this.state);

    // Get taskbar height so not to make 100% height all the way
    let taskbar_height = $("w-taskbar").height();
    this.pos = {
      h: `calc(100% - ${taskbar_height}px - 8px)`,
      w: "100%",
      x: 0,
      y: 0,
    };

    $(`#${this.wid} .button-max`)
      .removeClass("button-max")
      .addClass("button-restore")
      .attr("w_title", "Restore");
    reinit_tooltips();
    this.redrawWindow();
  }

  unminimizeWindow(animate = true) {
    if (this.state == 0) {
      $(this).css({
        animation: `windowZoomUp ${animate ? ".2s" : "0s"} forwards`,
      });
    }
    this.state = this.oldstate;
    $(this).attr("state", this.state);
    setTimeout(() => {
      this.focusWindow();
    }, 190);
  }

  restoreWindow() {
    this.state = 1;
    $(this)
      .addClass("transition")
      .removeClass("maximized")
      .attr("state", this.state);
    this.pos = this.oldpos;

    $(`#${this.wid} .button-restore`)
      .removeClass("button-restore")
      .addClass("button-max");

    this.redrawWindow();
  }

  toggleMaximize() {
    if (this.state == 0 || this.state == 2) {
      this.restoreWindow();
    } else {
      this.maximizeWindow();
    }
  }

  focusWindow() {
    $(`w-window`).css({ "z-index": 0 }).attr("focused", false); // unfocus all other windows
    $(this)
      .css({
        "z-index": 1,
        opacity: 1,
      })
      .attr("focused", true);

    this.taskbarUpdate();
  }

  closeWindow() {
    closeToolTips();
    $(this).css({
      animation: "windowFadeOut .2s forwards",
    });

    setTimeout(() => {
      $(this).remove();
      this.taskbarUpdate();
      $(document).find("w-window").click(); //  make nearest window focused instead

      if ($("w-taskmanager").length && window["tasklist"])
        $("w-taskmanager .app-list").after(window["tasklist"].draw()); // Update taskmanager
    }, 190);

    // Remove icon from taskbar if not already pinned
    $("w-taskbar")
      .find(`w-taskbar-button[data-app=${this.app}]:not([data-pinned])`)
      .remove();

    this.remove;
  }

  taskbarUpdate() {
    // Show icon as being active
    if ($(`w-window[data-app=${this.app}]`).length) {
      $(`w-taskbar-button[data-app=${this.app}]`).addClass("open");
    } else {
      $(`w-taskbar-button[data-app=${this.app}]`).removeClass("open");
    }

    // Show icon as having multiple instances
    if ($(`w-window[data-app=${this.app}]`).length > 1) {
      $(`w-taskbar-button[data-app=${this.app}]`).addClass("multiple");
    } else {
      $(`w-taskbar-button[data-app=${this.app}]`).removeClass("multiple");
    }

    // Show taskbar icon large blob if app is focused
    if ($(`w-window[data-app=${this.app}][focused=true]`).length) {
      $(`w-taskbar-button`).removeClass("focused");
      $(`w-taskbar-button[data-app=${this.app}]`).addClass("focused");
    }
  }

  static spawnWindow(app, args = {}) {
    let uApp = ucwords(app);
    let windowid = `w_${wid()}`;
    let defPos = "50px";

    // Check if window is only allowed one instance
    if (eval(`App_${uApp}`).app_settings.max_instances == 1) {
      if ($(`w-window[data-app=${app}]`).length >= 1) {
        // Focus the window and close tooltips and thumbnails
        $(`w-window[data-app=${app}]`)[0].focusWindow();
        if (window["taskbar_thumbs"]) window["taskbar_thumbs"].close();
        closeToolTips();
        return;
      }
    }

    let newX = $("w-window:last-of-type").length
      ? $("w-window:last-of-type")[0].offsetLeft + 50
      : defPos;
    let newY = $("w-window:last-of-type").length
      ? $("w-window:last-of-type")[0].offsetTop + 50
      : defPos;

    // Spawn window if all is good
    window[windowid] = new Window({
      wid: windowid,
      app: app,
      icon: args.icon ?? eval(`App_${uApp}`).app_settings.icon_tiny,
      w_title: args.titlebar ?? eval(`App_${uApp}`).app_settings.w_title,
      pos: {
        x: newX < $(document).width() / 4 ? newX : defPos,
        y: newY < $(document).height() / 4 ? newY : defPos,
        h: eval(`App_${uApp}`).app_settings.h,
        w: eval(`App_${uApp}`).app_settings.w,
      },
      secondary_args: args,
    });
    $("w-desktop").append(window[windowid]);

    // Add icon to taskbar if not already there
    if (!$(`w-taskbar-button[data-app=${app}]`).length) {
      $("w-taskbar .center").append(
        new TaskbarButton({
          id: 2,
          btn_type: "button",
          title: eval(`App_${uApp}`).app_settings.w_title,
          icon: eval(`App_${uApp}`).app_settings.icon,
          app: app,
        })
      );
    }

    // Close any context menus open
    if ($("w-context-menu").length) $("w-context-menu")[0].closeContext();

    setTimeout(() => {
      if (window["taskbar_thumbs"]) window["taskbar_thumbs"].fillThumbs(); // Add thumbnails
    }, 100);

    closeToolTips();
  }
}
customElements.define("w-window", Window);
class SystemTray extends HTMLElement {
  constructor(args) {
    super();
    $(this).html(this.html());
  }

  html() {
    return `
             
                  <div class="time"></div>
            `;
  }

  connectedCallback() {
    this.eventHandlers();
  }

  updateTime() {
    const d = new Date();
    return `${zeroPad(d.getHours(), 2)}:${zeroPad(d.getMinutes(), 2)}`;
  }
  updateDate() {
    const d = new Date();
    return `${zeroPad(d.getDate(), 2)}/${zeroPad(
      d.getMonth() + 1,
      2
    )}/${d.getFullYear()}`;
  }

  eventHandlers() {
    setInterval(() => {
      $(".time").html(`${this.updateTime()}<br>${this.updateDate()}`);
    }, 100);

    $(this).on("click", ".tray", function (e) {
      if (window["systray_menu"]) {
        window["systray_menu"].closeMenu();
      } else {
        window["systray_menu"] = new SystemTrayMenu({
          pos: { y: 0, x: $(this).offset().left },
        });
        $("w-desktop").append(window["systray_menu"]);
        closeToolTips();
      }
      e.stopImmediatePropagation();
    });

    $(this).on("click", ".time", function (e) {
      if (window["notifications_menu"]) {
        window["notifications_menu"].closeMenu();
      } else {
        window["notifications_menu"] = new NotificationsBar({
          pos: { y: 0, x: 0 },
        });
        $("w-desktop").append(window["notifications_menu"]);
        closeToolTips();
      }
      e.stopImmediatePropagation();
    });
  }
}
customElements.define("w-system-tray", SystemTray);

class App_Notepad extends HTMLElement {
  static get app_settings() {
    return {
      w_title: "Notepad",
      icon: base64_icon_notepad,
      icon_tiny: base64_icon_notepad_tiny,
      h: $(window).height() / 1.8,
      w: "45%",
    };
  }

  constructor(args) {
    super();
    $(this).html(this.html());
    this.applyTheme();
  }

  applyTheme() {
    $(this)[0].style.setProperty("--theme", window["theme"]);
  }

  html() {
    return `
                  <div class="menu_bar">
                        <span>File</span>
                        <span>Edit</span>
                        <span>Format</span>
                        <span>View</span>
                        <span>Help</span>
                  </div>

                  <textarea></textarea>

                  <div class="status_bar">
                        <span>100%</span>
                        <span>Windows (CRLF)</span>
                        <span>UTF-8</span>
                  </div>
            `;
  }
}
customElements.define("w-notepad", App_Notepad);
class App_Explorer extends HTMLElement {
  static get app_settings() {
    return {
      w_title: "Explorer",
      icon: base64_icon_fileexplorer,
      icon_tiny: base64_icon_explorer_tiny,
      h: $(window).height() / 1.5,
      w: "60%",
    };
  }

  constructor(args) {
    super();
    this.wid = args ? args.wid : 97;
    this.path = args ? args.path : "";
    if (!this.path) return;

    $(this).html(this.html());
    this.applyTheme();

    setTimeout(() => {
      initResizer("w-explorer");
    }, 100);
  }

  applyTheme() {
    $(this)[0].style.setProperty("--theme", window["theme"]);
  }

  html() {
    return `
                  <div class="menu_bar">
                        <div class="item" data-bs-toggle="tooltip" title="Create a new item in the current location.">
                              <img src="${base64_new}"> New
                        </div>

                        <span class="seperator"></span>

                        <div class="item" data-bs-toggle="tooltip" title="Cut" disabled>
                              <img src="${base64_cut}">
                        </div>

                        <div class="item" data-bs-toggle="tooltip" title="Copy" disabled>
                              <img src="${base64_copy}">
                        </div>

                        <div class="item" data-bs-toggle="tooltip" title="Paste" disabled>
                              <img src="${base64_paste}">
                        </div>

                        <div class="item" data-bs-toggle="tooltip" title="Rename" disabled>
                              <img src="${base64_rename}">
                        </div>

                        <div class="item" data-bs-toggle="tooltip" title="Share" disabled>
                              <img src="${base64_share}">
                        </div>
                        
                        <div class="item" data-bs-toggle="tooltip" title="Delete" disabled>
                              <img src="${base64_delete}">
                        </div>

                        <span class="seperator"></span>

                        <div class="item" data-bs-toggle="tooltip" title="Sort and group options.">
                              <img src="${base64_sort}"> Sort
                        </div>

                        <div class="item" data-bs-toggle="tooltip" title="Layout and view options.">
                              <img src="${base64_view}"> View
                        </div>

                        <span class="seperator"></span>

                        <div class="item" data-bs-toggle="tooltip" title="See more">
                              <img src="${base64_ellipses}">
                        </div>
                        
                        <div class="item float-right" data-bs-toggle="tooltip" title="Cloud storage information.">
                              <img src="${base64_onedrive}">
                        </div>
                  </div>

            

                  <div class="body">
                        <div class="p-resizer"></div>
                        <div class="explorer_body">
                              <small class="toggle"><span class="dropdown">&#x203A;</span> Quick Access</small>
                              <w-explorer-pane path="${this.path}"></w-explorer-pane>
                        </div>
                  </div>

                  <div class="status_bar">
                        <span class="item_cnt">6 items</span>
                  </div>
            `;
  }
}

class ExplorerIcon extends HTMLElement {
  constructor(args) {
    super();
    this.icon = args ? args.icon : $(this).attr("data-icon");
    this.action = args ? args.action : $(this).attr("data-action");
    this.url = args ? args.url : $(this).attr("data-url");
    this.text = args ? args.text : $(this).attr("data-text");
    this.progress = args ? args.progress : false;
    this.percent = args ? args.percent : 30;
    this.subtext = args ? args.subtext : $(this).attr("data-subtext");
    this.cxt = args ? args.cxt : {};
    $(this).html(this.html());
    $(this).attr("tabindex", 0);
  }

  html() {
    return `
                  <img src="${base64_transparent}" style="background-image: url(${
      this.icon
    })">
                  <span>
                        ${this.text}
                        ${
                          this.progress
                            ? `<div class='progress'><div style='width:${this.percent}px'></div></div>`
                            : ""
                        }
                        ${this.subtext ? `<small>${this.subtext}</small>` : ""}
                  </span>
            `;
  }

  connectedCallback() {
    this.eventHandlers();
  }

  eventHandlers() {
    let _this = this;

    $(this).on("dblclick", function (e) {
      console.log(_this.action);
      window.LastClickedLink = _this.url;
      eval(_this.action);
      e.preventDefault();
    });
  }
}
customElements.define("w-explorer-icon", ExplorerIcon);
class App_Msedge extends HTMLElement {
  static get app_settings() {
    return {
      w_title: "Microsoft Edge",
      icon: base64_icon_edge,
      icon_tiny: base64_icon_edge_tiny,
      h: $(window).height() / 1.8,
      w: "45%",
    };
  }

  constructor(args) {
    super();
    this.wid = args ? args.wid : 98;
    $(this).html(this.html());
    this.init();
    this.applyTheme();
    console.log(this);
  }

  applyTheme() {
    $(this)[0].style.setProperty("--theme", window["theme"]);
    setTimeout(() => {
      $(".msedge_tabs")[0].style.setProperty("--theme", window["theme"]);
    }, 2);
  }

  html() {
    return `
                  <w-edge-toolbar>
                        <div class="item" data-bs-toggle="tooltip" title="Back">
                              <img src="${base64_back}">
                        </div>
                        <div class="item" data-bs-toggle="tooltip" title="Forward" disabled>
                              <img src="${base64_forward}">
                        </div>
                        <div class="item refresh" data-bs-toggle="tooltip" title="Refresh">
                              <img src="${base64_refresh_tiny}">
                        </div>
                        <div class="item home" data-bs-toggle="tooltip" title="Home">
                              <img src="${icon_home_tiny}">
                        </div>

                        <div class="search">
                              <img src="${base64_search}">
                              <input type="text" value="${window.LastClickedLink}" onfocus="$(this).select()">
                        </div>

                        <span class="seperator"></span>
                        
                        <div class="item profile" data-bs-toggle="tooltip" title="Profile 1">
                              <img src="https://img.icons8.com/?size=100&id=4prjBhjIN59x&format=png&color=000000">
                        </div>

                        <div class="item" data-bs-toggle="tooltip" title="See more">
                              <img src="${base64_ellipses}">
                        </div>
                  </w-edge-toolbar>

                  <iframe class="browser" src="https://${window.LastClickedLink}" allow-scripts allow-same-origin></iframe>
            `;
  }

  connectedCallback() {
    this.eventHandlers();
  }

  init() {
    let _this = this;

    setTimeout(() => {
      $(_this).parent().css({
        background: "rgba(24,52,92,0.9)",
        color: "#FFF",
      });
      $(`#${this.wid}`).find(".icon").css({ visibility: "hidden" });
      $(`#${this.wid}`).find(".title").html(`<div class="msedge_tabs"></div>`);

      $(`#${this.wid}`).find(".icons").css({
        "margin-top": `-1em`,
      });

      $(`#${this.wid}`)
        .find(".msedge_tabs")
        .append(
          `<w-edge-tab data-text="${
            window.LastClickedLink.split(".")[0]
          }" data-icon="${base64_search}"></w-edge-tab>`
        );
    }, 1);
  }

  eventHandlers() {
    let _this = this;

    $(document).on("click", `#${_this.wid} .home`, function (e) {
      $(`#${_this.wid} .browser`).attr("src", "https://bing.com");
    });

    $(document).on("click", `#${_this.wid} .refresh`, function (e) {
      $(`#${_this.wid} .browser`).attr("src", function (i, val) {
        return val;
      });
    });

    $(document).on("keyup", `#${_this.wid} .search input`, function (e) {
      if (e.which === 13) {
        let url = $(this).val();
        if (strstr(url, "http://") || strstr(url, "https://")) {
          $(`#${_this.wid} .browser`).attr("src", url);
        } else {
          $(`#${_this.wid} .browser`).attr(
            "src",
            `https://www.bing.com/search?q=${url}`
          );
        }
      }
    });
  }
}
customElements.define("w-msedge", App_Msedge);

class EdgeTab extends HTMLElement {
  constructor(args) {
    super();
    this.icon = args ? args.icon : $(this).attr("data-icon");
    this.text = args ? args.text : $(this).attr("data-text");
    $(this).html(this.html());
  }

  html() {
    return `
                  <div>
                        <img src="${this.icon}">
                        ${this.text}
                  </div>
                  <div class="close_tab"><img src="${base64_closewindow}"></div>
            `;
  }

  connectedCallback() {
    //this.eventHandlers()
  }

  eventHandlers() {
    let _this = this;
  }
}
customElements.define("w-edge-tab", EdgeTab);

let base64_transparent = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAANSURBVBhXY2BgYGAAAAAFAAGKM+MAAAAAAElFTkSuQmCC`;

let wallpaper_dark = `https://i.ibb.co/TMZCp8L/study-desk.png`;

let base64_startbtn = `https://i.ibb.co/xDYnzLK/halimo-logo.png`;
let base64_startbtn_dark = `https://img.icons8.com/?size=100&id=wNZ3FTgUzSQX&format=png&color=000000`;

let base64_ellipses = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAMAAADX9CSSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURZ6goywsLRoaGoKDhgAAABl4tukAAAAFdFJOU/////8A+7YOUwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAC9JREFUKFNjYMEORoI4GpuRiQnMZILTjGBxIJ8ZyGUA0iAdzGB5POqxgqEtzsICAKRQB/27K4B6AAAAAElFTkSuQmCC`;

let base64_back = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAARCAYAAADQWvz5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACJSURBVDhPYxhawNzS6r+0tPR/KBcvYILSGABkyJNHDxncfQKgImQAmEuS0rOJcg1WMPgMiYhJIMsQRhDh7uX7/8rFc2ABUoGugTHDjq2bGFlAHBV1DQaYQQrKqgxCQsJgNjHA2NwKZBCUBwSgcAF5DeRFqBD5YNQw0kFqdv5/BQUFyg0iHjAwAAAO+EeFhoR9sQAAAABJRU5ErkJggg==`;

let base64_forward = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAARCAYAAADQWvz5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACLSURBVDhPYxiaQFpa+r+5pdV/KBcrYILSeIG7TwDDk0cPGQgZRhRISs/+T4zLiAKD17CImAQMwxhBhIe33//LF86CBUgFOvpGDDu3bWZkAXEsbOwZWFlZwRLEgHfv3jI8uHsbzFZR1wAZBGaTDEBeAnkNFF5QIdLBqCHYgYKCwv/U7HzKDCEOMDAAALfISfXi8HxcAAAAAElFTkSuQmCC`;

let base64_up = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAASCAMAAACKJ8VmAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAnUExURUdKTWtxdTc5OhsbG2Jna1hcYDs+QE1QU2VrbyAgIEhLToCHjQAAABnUEiQAAAANdFJOU////////////////wA96CKGAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAT0lEQVQoU8XMyRHAIAxDUWJlg7j/eiNbhkMaiC7+85ih+XdL2jajrgG7qoQwSWI4cJooJRpXHkkWRUHRUwjzDkmQuPX6mZNwv8h4KpbU3F923wxL+bPtAQAAAABJRU5ErkJggg==`;


let svg_minimize = `<svg class="min-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="10"><path fill="currentColor" d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z"></path></svg>`;

let svg_maximize = `<svg class="max-icon" aria-hidden="true" focusable="false" data-prefix="far" data-icon="square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="13"><path fill="currentColor" d="M384 31.1H64c-35.35 0-64 28.65-64 63.1v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64v-320C448 60.65 419.3 31.1 384 31.1zM400 416c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V96c0-8.822 7.178-16 16-16h320c8.822 0 16 7.178 16 16V416z"></path></svg>`;

let svg_close = `<svg class="close-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="14"><path fill="currentColor" d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"></path></svg>`;

let base64_start_search = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA2UExURZGQkENDQyAgIDAwMF1dXTo6OgAAABgYGAkJCX19fRAQEGtrazo6OU9PT2xsaygoKF1dXAAAACheTmEAAAASdFJOU///////////////////////AOK/vxIAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABxSURBVChTXc7hEoQgCARgREXyqrt9/5dN1rqpGGcHPn+A4FUESZoLxwnVmqq1P1Rfomv9BLEPO3iKFKT5A6xsBKocgcUiBfWCzSMFhR+jNEeOLW0uzDZvGq973Tc1423U1M2/8qMQziohd6A8AOUNAA5NfQ3pREpA0QAAAABJRU5ErkJggg==`;

let base64_search1_r = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAbUExURYuLi3t7e5eXl3h4eImJiYqKioiIiI+PjwAAABZYjb4AAAAJdFJOU///////////AFNPeBIAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABOSURBVChTXY7REgAgBASJ4v+/OJok9sG4neYE2kgBePYQg5yRgtgG0xNgq0EzBF6B/QVnx7KxskPOkbwiJOUfngMXf3ZRsouSb+lHE6obn1IHBKRajr8AAAAASUVORK5CYII=`;

let base64_search = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAYAAABG1c6oAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIhSURBVDhPY6A2YITSGKCuvuH/7Zs3Ge7eu83AzMzCoCCvwKCppctQV1eNUw8IYEhOmTr9/9bNGxg+ffrE8PfvXwZePj6G7z9+MHwB8/8xyMjJMfgHBDNkpCXjNRgMcnKy/9vb2fz38vT8DxVCARMmTvqvra31X1VV9X91TR1WNXAwf/7C/44Odv/TUlPwKwQCY2OT/1ra2v9XrlqHW62ri9P/6KhIgoaBwIKFi//Ly8v/t7KyxlDPBCKWLlv5/8+fPww2dg5gQUIgIT6W0cjYmOHp0ydQEQQAG/jwwT2Gf//+MWRmpBMOaCgwNjYF03PnL0JxJdjAu3duAQ0kyrdwoKCgAKbv37sLpmEAbKCUtCzD//+kGfjixQswLS4hCaZhAGygnJwC2MuLFi8h2tRrV6+A6dzsDJRgAhuYmprECHLhkcMHwYLEgEuXLjFwcXNDeQgANhAEvHz8Gc6dO8dQX1dP0JXu7h7/X79+xZCZmQMVwQGiY2L+Gxro/y8uLsFq6KrVa/+HhIaB06CZuTlWNRjJJCQ45P+Nm9fB+VhRUYlBUUmZ4cf37wxXrlwBRsRzsBoeHh6GL1++MBgZmzCsX7cWxQys6a5vwqT/G9evZXj27BnYYBAGAVVVNYaEpGSG69evMyxZtAAs5ucfyDB50gSi0y9OUFlVC/Y6CBcUFpOW5nCB1LQMuKGlZRXUNdTFxZU6BoLAqjXrqWcYKmBgAABLANiF7ZrMMQAAAABJRU5ErkJggg==`;


let base64_closewindow = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADeSURBVDhPrZPLEYIwEIapI9YAXZFOAOtgsIDokQRvoA3w0AtWspLHOkMgkGH8bsnsfPzZXYK/0fcvqOsHmKMXjN3m9U3zBEIIcF55idI0gzAMYRw/83oh7pPotCvSggiG4b1eV1VS5E6ECeTzzdU6nAslksnMlSJJUiVwJrBBESbSggi6bvATICiilPo9wUUcUyXK8+KYIMvOKkFRXCbR/tQWYBOxB1KgRcJPhAK7BygqS74twj1wjREX0h7/DxS0bb/5JZ2IgFxMc6Vh7LqZwAZFi/rFz7TD4b1ZJwi+r2LJUdGyCHcAAAAASUVORK5CYII=`;


let base64_sortby_tiny = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAASCAMAAABo+94fAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACZUExURZKTleDi55/J7YmKi1VVVWdoaOXn67XV8AB41ImJi1xdXW5ub+Tm6rjX8s3P0r/BxOPl6rXU71xcXcrLz+bo7G5vb+Lk6Y6Pkc/Q1JSVl8rM0IuMjrfW8bbW8Njn9lel4dzp9rjW8G+w5iaL2rnX8At+1svN0CaM2wt91lCh4N3q96TL7ByH2E+g4Nrn9cTFyNLj9Was4wAAAOJ0OTgAAAAzdFJOU///////////////////////////////////////////////////////////////////AHGevY4AAAAJcEhZcwAADsMAAA7DAcdvqGQAAACmSURBVChTbc/ZEoIwDAVQkIKFKrjiLtWCouKW//840wa0jOTl3jmTSacOdE7NjksJPQpij/mBKX1ugjiMmC8Gug0t9qKYJUKMsI5/HE5iYNOZmKf2kUW0BGQIhLB5FWOwNUC6cdtPEuvZdvPuj/eZrG8fjva2UtJwXmRfPgFIdZbIeXlp374qdeN5gWpv6/2Kl3fdGsYv4TwqbrThJwW83pQ1twfgAyGtPuH1+P8tAAAAAElFTkSuQmCC`;

let base64_refresh_tiny = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADzUExURc/R1aanqX19fmhpaXBwcZOUlsrM0LW2uZCRk93e43Z2d1paWo2OkKiprL7Aw8LDx7CxtIuMjn1+f6SlqLi5vFxdXZiZm+Tm6ufp7ZeYmlVVVa2usausr1hYWLq8v8jJzVxcXYGBg319f9nb383O0ldXV3V1dnd3eIyMjoaHicvN0ODh5szN0aKjpoKChKmqramqrGtrbLa3ur6/wmFhYn5/gLO0t39/gI6OkJqbnePl6ru9wJWWmKKjpdLU2MDCxdDR1a6usc3N0aCgo5aWmOXn7Ojq7rGxtMTFyIeHiMzN0GdnZ8rLzmhoaWlpac3P0gAAAGom1nUAAABRdFJOU///////////////////////////////////////////////////////////////////////////////////////////////////////////AGjsqMEAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADqSURBVChTbc/ZVsIwFIXhULACgYoyV4oVlKGgiGIdkEFFxQn3+z8Nyekpqyz5L5KcLxdNBXYWsogZ8YSxZ6rjfjLkVFpmstZB7lAemcgbzIViqUzXqFTt45BrTj1A3Yl72iBuSouJOjtvEbc7DEDd1nU1e26PUeV5/b5+jcDFZSBbCbQHfIwmICPPCKpcKR5e87TpZqT41udp0+BOcfLfJ+8fFJvOI49cWY4Vo/HEMzdJ019O7TEDNXPmxHh2I/7ivqpVM3LO4k3vwHtVfuidGMuE/PStL78z+v4hCBiYZ37jq+Hij8eQtwLWdKJ/Z2zyfIQAAAAASUVORK5CYII=`;



let base64_icon_explorer = `https://img.icons8.com/?size=48&id=GPw1qokXpOJP&format=png`;

let base64_icon_fileexplorer = `https://img.icons8.com/?size=48&id=3bRpRccpLitD&format=png`;

let base64_icon_explorer_tiny = `https://img.icons8.com/?size=48&id=GPw1qokXpOJP&format=png`;

let base64_icon_notepad = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAqCAYAAADS4VmSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATvSURBVFhHzVZNaFxVFD4zybyZ1E4msYKCG/GPLkRQ8KckoVHbtFgJuGhRqq2IEEQXKiIuimA3dVEXbhS78KcQqSgUpLQuurHgQrARsirYRclCosSYaUzSJnae53znnnfvffMj1Ff0vLlz7vfd7/y8e9+bhP6XNjP3a3rXu5+l59k7CiZY+Jm53yJe7HpixErOR3bL2x+nzSvr1KgltPDeVKbpxotdT4xYRhy5uJpeaaWUpikd+ehTxxK9NXWQOSJeoaPHjjuW6PWXngOPFfYffDINXuzVF55FHln+8PMTSrJNPb8P2oE+oqMP3IraZfmS4mvXWtTiVRnVJBEaJhjJwFccy2UdZzFJsKYxqkkq7TErGy164/w82kcDq1zcFmU8M7kLTeweH2HMCfleeHNo75MTaGLn2DZg1at/evcTaOLxkUeArfHJicfQxPZtDzk9D75W/mpJaT2CQxeWhWdzCQOPD4LUQ9UDK6VeWCfJNEKY9tijt5ewAxrot9OwcbicD7fX1n0M89CoB87WdIR6MTTgE5jIAtULhoZ3TbEl8bp8jnB4fcxlDchczll8zyBoeDjfKWk4B7aYrEnftJg/Ar7NLCgY3bHG+RjDvkCErWn2liNrAIR1mgl8ok7Yxxjvh+pjnHHckXFieAvenF1UKAK4lE58c4YWFpeE/dc2PNSgPTvHJT2bNIBvOj52R/e3oKjiYn8sNdtryNmwdXkLUtoyPARBETbcGGyvgb12R/DaTwtCy75gaxhkHjPBCuBl1hPzVFilDOc07L8Yv9MdAUTB9nQafGHNafnTplds+dT7t8JrbC6mR+CezFikgT6Bw/xjFCYRPtRD43yIQ85w1gDTTKgXPgwOA4ChYex8qMnjtpgst3oxPAOv/DgPbKT4k2fO0iI/vUVYgx/CHdv5LyvPwxpf7bg3fg3lQtd8FVVcrNm8HO2QHbmYew2tCfWCb+Yfj6KsMVh3+V0N3Kiu4QimfviF14Rmcz7CLkg8ZsCqASMa4yON+hDrR/HJXVtzR8Cj/WHyAeIFR9vpBn+Ug0a9acLh9RzA5o5ACGuk82sFjquHnM074pxW1+MaWQMQ5Tr2QQFnGuexO+F6Nmeer2j3onUdYngGXvx+DtjEMjt99jta4qe3CBus12l05GHkRnEh2Z/ac58+A1GnfAkuqrjY5eXleHf4S2qI+SMwAa+IH+Ifj6KsXt+MwqiBG1UvhiM4cO6SUtKdLDgPDJ1f64n5S6H6bli8TL6dvN+OgBeEcz7CfAnOdig3j7Bcgp0P1+MYrsEasfYjcKM9KB66Fjed6d1fTDxb4KyGYR1RAyoIkkSDNXwhAe7OEub1bvegUZ/PF8ZkDSSlkhNYYmsqd2cy58VOSTti1hr2Gs1dLePx0wb2DTS5Cbs7H2TzCDuNP2ffdBgDDI3l9es1rnpw859oAG3Mzs6mzab+59qSf3kCE66ThXxe02utXC5TX18f9ff30+joKO8926WfL6Tl6qaoeLckvZL3WjOTBkpy5BtrdPdW90s4/c5+Kl1bp1qtRtVqFSM/N9xt/k9rMpIkoUqlwrWu0teHD6Ah7MD7EwPp2oZ0De6Gmux5P992o1qil0+v6hF8uf+29OqK/F5Dc0NNHn4Z1U112js9rw38fnEmPXf4KVpfLe4PUDeTgslNgzR26BRtuedB1P8PjehvL6od5/4tIjsAAAAASUVORK5CYII=`;

let base64_icon_edge = `https://img.icons8.com/?size=100&id=73HXWFbel07V&format=png&color=000000`;

let base64_icon_edge_tiny = `https://img.icons8.com/?size=100&id=73HXWFbel07V&format=png&color=000000`;


let base64_icon_notepad_tiny = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAL7SURBVEhLxVbLaxNhEJ8kJG22NE89FREEi4gi3ixafNGCD0TEiwfx0ItgoQq2igr+CXqr2IsexBdY7aGieFFR8IWiUEUhIj5QlBbSptW02c+Z77HZTXaabqj1V35838w338zOY7cJCSHgfyCs1wWHb8ahUEjv5gd+MWpmnO3rF9lj/c7NKhn3pNNilcyBDXzly5Q4/b4g8sUZyP+ZgZNv8+LESN6R+96MiaOvRwXtSXfk1S/R8/KnIx96/kMMfBhjH4ANPFIogW3b0BCLSdq2gJIgOSppY/mIMdwTS2hLNrEoyki6+2JsSnurBtvjU+/GBTmmcyL6dPZKplXp5J7+KnXI8+tafGOwGZsMyiRZ6UrasY0VoCrQ6rZTd5WOAxvYCSadm0Cq3Mapl/62HNhS9+LwmJJduH4LxicK+nR2NFkW7NnRIUtOdy+2Lw1W6nLJBGRTSVicTUsuyniZzaQgmy4zlUg42dLKgc34ML4edGaI8Z29kmlFnR4qJZt92fbSpmXBMzb9K8lV9dDbR7Khyii7atvqgAZsxt34ATDZXL45DBOFSX06OywrDts7NuvMBVzbujxgxnRRZ5BOJjx9zDhMQgb7n3Yx0dzsqQIHNuODT77pD0jtPnrkCtsbnSvqyFiydh9Vz7VcYcuBzbjr8Wc8oqcGGBy+C4VJ/rvrRjzeCFs2btCZAwxtW1lfxvQ+WvhRcPeRmMK+u5nUjDfG1V1ZmTq+XAcefpIZk5P8+ARMT0/jnvpNKPeR0iIdycRwJAJWnIJLK7i9c7V/DF8lBt5//yPmqsplghjnfjrO9s6uNcFKLQdGDggNixoaMzA0RM5/JbRz23rskBzYwKtiWFoZRDuh1QRyOa58KPeEr23iA7OlzuVyolgsynIR5roahMNh/GUSg9bW1mA9fjZ4Tixp2y1lznmlvnL9+nQI2vZ2Bwt8ttMSo79pZIKDfhxH0EdDFOD4valggR+c6RLfH13VmvrQ0r4P1vcMBAs8n5hz4IUA+zr9WwD8Bb7vqn4q++ppAAAAAElFTkSuQmCC`;



let icon_settings_storage = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAOCAMAAAB5Au6AAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAkUExURa2tr4aGh1lZWUlJSRsbG3d3eMbGx2dnaJOTlLq6vDk5OgAAAHjKkzMAAAAMdFJOU///////////////ABLfzs4AAAAJcEhZcwAADsIAAA7CARUoSoAAAABVSURBVChTjZA5FsAgCAUVP1HD/e8b0HQRyBRQMI+tSIIJpdKRuooiDS7NBAZdDgRWAVizjmjNE6hb9IUBTE1Bh1v3C4XNP4HR36s+7DPTR+WvjhB5AGbeDcEe8vm7AAAAAElFTkSuQmCC`;


let icon_settings_fonts = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAkUExURRobG2doaJKTlDk5OlhZWa2ur3d4eCkqKqChooWGh0lJSQAAAI++r88AAAAMdFJOU///////////////ABLfzs4AAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEJSURBVDhPhZPbEoQwCENT673//7+bBqrgurPnwaGYlkAV7Q+X4Jdy5AuKRw+GAPhxhKcnVEwWPnBBRUO18IELMLf5vYZlC5a2YFUs9Y0JsPGx+RFr8qt4x8Hngb0vKIx+JaBFxbK5YI5+9Qqn4lOLguS3h6sq9BrdJrcvl18TsKhDr/Iz/BJGLDoZ/Wj5Wdm2w6WVFvRiftwV4cs0Y9/rfREwZe0bXt0m00E01P24f81WQTviNXMII3CbcTu5/YwvLAt2nN7xNG4sC6oPTJj3LED1/cSrJUEY4DW/JHjr+CU12DSKKLiGYFjBmEuXQnRjt4Atbun3O9lqCYLe+riADkcFnpHLftHaB1ZIJHH003BnAAAAAElFTkSuQmCC`;

let icon_home_tiny = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAMAAABxCz6aAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAkUExURa+vryoqKhsbG6Kiory8vFpaWoeHh5SUlGlpaTo6OsjIyAAAALeCzWUAAAAMdFJOU///////////////ABLfzs4AAAAJcEhZcwAADsIAAA7CARUoSoAAAAB0SURBVChTlZBZDsAgCERxQazc/74FxKVL0nSiMPP8AYFfNCGEsPzoMaU4gzcFViz12uOglzAfl1V1K3djHoDzzpRmgVg8ugoqJE8u+oIVsZrZIB0k5w6Rl/sFbc4FbU4IhYhQIYop8te6KaoaczNjuz/EfAJqWQ5ZfHUghQAAAABJRU5ErkJggg==`;









//load proto

// document.addEventListener("DOMContentLoaded", function() {
 
//create tooltip to 

  const content = `
  <div class="glass-box">
  <span class="flame-emoji">🔥</span>
  <div class="gradient-text">test score</div>
  <div class="score">112</div>
  <div class="study-more">study more</div>
</div>


  <div class="container">

  <div class="t1 tile" rain='["https://img.icons8.com/?size=100&id=D5jqabDUzubh&format=png&color=000000"]'
  onclick="window.window.LastClickedLink = 'felo.ai'; Window.spawnWindow('msedge');">
  
  <i><img class="tile-icon" src="https://img.icons8.com/?size=100&id=D5jqabDUzubh&format=png&color=000000"></i>
  <span class="tile-text">GPT Teacher</span>
</div>



<div class="t2 tile" rain='["https://img.icons8.com/?size=100&id=QQwcfqZkWqUL&format=png&color=000000"]'
onclick="window.window.LastClickedLink = 'mathway.com/Chemistry'; Window.spawnWindow('msedge');">

<i><img class="tile-icon" src="https://img.icons8.com/?size=100&id=QQwcfqZkWqUL&format=png&color=000000"></i>
<span class="tile-text">Study Chemistry</span>
</div>

<div class="t3 tile" rain='["https://img.icons8.com/?size=100&id=RPHZmB5ERyjp&format=png&color=000000"]'
onclick="window.window.LastClickedLink = 'calculatorsoup.com/calculators/physics/index.php'; Window.spawnWindow('msedge');">

<i><img class="tile-icon" src="https://img.icons8.com/?size=100&id=20LK9yCTjajw&format=png&color=000000"></i>
<span class="tile-text">Study Physics</span>
</div>


<div class="t4 tile" rain='["⌚"]'>
<div class="timer" id="timer">25:00</div>
<div class="buttons">
    <button id="startStudy">Start Studying</button>
    <button id="startRest">Rest</button>
</div>
</div>

<div class="t5 tile" rain='["https://img.icons8.com/?size=100&id=10lwQw8Al1lP&format=png&color=000000"]'
onclick="window.window.LastClickedLink = 'merriam-webster.com/word-of-the-day'; Window.spawnWindow('msedge');">

<i><img class="tile-icon" src="https://img.icons8.com/?size=100&id=10lwQw8Al1lP&format=png&color=000000"></i>
<span class="tile-text">Study English</span>
</div>


  <div class="t9 tile">
    <input type="text" class="search-box" placeholder="tutorial code = 🎁">

    <span class="tile-text">tutorial codes</span>
  </div>

  <div class="t10 tile">
  <div class="zoom-container">
  <img src="https://www.chemistrysteps.com/wp-content/uploads/2018/07/Acids-and-bases-Free-Cheat-Sheet-Study-Guides.png" class="zoom-image" id="zoomImage">
</div>     
</div>

<div class="t11 tile" rain='["https://img.icons8.com/?size=100&id=lIjOYS10WPHg&format=png&color=000000"]'
onclick="window.window.LastClickedLink = 'learn.genetics.utah.edu/'; Window.spawnWindow('msedge');">

<i><img class="tile-icon" src="https://img.icons8.com/?size=100&id=lIjOYS10WPHg&format=png&color=000000"
style="width:50%;
height:50%;
top:20%;
"
></i>
<span class="tile-text">Study Biology</span>
</div>

<div class="t12 tile" rain='["📔","📕","📗","📘","📙"]'>

<div class="todo-list">
    <input type="text" id="todoInput" placeholder="Add a new todo" class="glassmorph">
    <button onclick="addTodo()" class="glassmorph">Add</button>
    <div id="todoList"></div>
  </div>

</div>



<div class="t13 tile" rain='["https://img.icons8.com/?size=100&id=4prjBhjIN59x&format=png&color=000000"]'
onclick="LetsMap()">

<i><img class="tile-icon" src="https://img.icons8.com/?size=100&id=6nMo9TOIX9UC&format=png&color=000000"></i>
<span class="tile-text">Summarize</span>
</div>

<div class="t14 tile" rain='["https://img.icons8.com/?size=100&id=tSsoqhIYwMTk&format=png&color=000000"]'
onclick="window.window.LastClickedLink = 'chatpdf.com/'; Window.spawnWindow('msedge');">

<i><img class="tile-icon" src="https://img.icons8.com/?size=100&id=BQlLHKSAC1Yu&format=png&color=000000"></i>
<span class="tile-text">Simplify your Books</span>
</div>

<div class="t15 tile" rain='["https://img.icons8.com/?size=100&id=f3o1AGoVZ2Un&format=png&color=000000"]'
onclick="window.window.LastClickedLink = 'ai.tryinteract.com/create'; Window.spawnWindow('msedge');">

<i><img class="tile-icon" src="https://img.icons8.com/?size=100&id=f3o1AGoVZ2Un&format=png&color=000000"></i>
<span class="tile-text">Quizs & Exams</span>
</div>



  </div>
</div>


  `;

  const div = document.createElement('div');
  div.classList.add('fade-in');
  div.innerHTML = content;
  document.body.appendChild(div);

  // Trigger the fade-in effect
  setTimeout(() => {
      div.classList.add('visible');
  }, 100); // Delay to ensure the initial styles are applied
// });


document.addEventListener("DOMContentLoaded", function() {
  const tiles = document.querySelectorAll('.tile');
  
  tiles.forEach((tile, index) => {
    tile.style.animationDelay = `${index * 0.2}s`;
    
  });
});



//random me quote 


document.addEventListener('pointerdown', (event) => {
  // Check if the clicked element is a child of an element with the 'tile' class
  const tileElement = event.target.closest('.tile');
  if (tileElement) {
      const rainAttribute = tileElement.getAttribute('rain');
      createRain(event.clientX, event.clientY, rainAttribute);
  }
});

function createRain(x, y, rainAttribute) {
  let rainItems;

  if (rainAttribute) {
      try {
          rainItems = JSON.parse(rainAttribute);
      } catch (e) {
          console.error('Invalid rain attribute. Using default emojis.');
          rainItems = ['🌟', '💖', '🎉', '🌈', '🍕', '🚀', '🎈', '🌺'];
      }
  } else {
      rainItems = ['🌟', '💖', '🎉', '🌈', '🍕', '🚀', '🎈', '🌺'];
  }

  const maxElements = 10; // Reduced number of elements for better performance

  for (let i = 0; i < maxElements; i++) {
      const rainElement = document.createElement('div');
      rainElement.classList.add('rain-item');
      rainElement.style.position = 'fixed';
      rainElement.style.left = `${x}px`;
      rainElement.style.top = `${y}px`;
      rainElement.style.pointerEvents = 'none';
      rainElement.style.zIndex = '1000'; // Ensure the element is on top of all other elements

      const item = rainItems[Math.floor(Math.random() * rainItems.length)];

      if (item.startsWith('http')) {
          const img = document.createElement('img');
          img.src = item;
          img.style.width = '24px';
          img.style.height = '24px';
          img.style.objectFit = 'contain';
          rainElement.appendChild(img);
      } else {
          rainElement.textContent = item;
          rainElement.style.fontSize = '24px';
      }

      const angle = Math.random() * Math.PI * 2;
      const velocity = 2 + Math.random() * 2;
      const rotationSpeed = Math.random() * 360 - 180;

      document.body.appendChild(rainElement);

      let time = 0;
      function animate() {
          time += 1 / 60;
          const newX = x + Math.cos(angle) * velocity * time * 20;
          const newY = y + Math.sin(angle) * velocity * time * 20 + 0.5 * 98 * time * time;
          rainElement.style.transform = `translate(${newX - x}px, ${newY - y}px) rotate(${rotationSpeed * time}deg)`;
          rainElement.style.opacity = 1 - time / 2;

          if (time < 2) {
              requestAnimationFrame(animate);
          } else {
              rainElement.remove();
          }
      }
      requestAnimationFrame(animate);
  }
}



//codes
document.querySelector('.search-box').addEventListener('input', function() {
  const inputValue = this.value.trim();

  if (inputValue === 'tele') {
      window.LastClickedLink = 'web.tel.onl/';
      Window.spawnWindow('msedge');
      this.value = ''; // Clear the input field
  } else if (inputValue === 'y99') {
      window.LastClickedLink = 'y99.in/rw/1813243';
      Window.spawnWindow('msedge');
      this.value = ''; // Clear the input field
  } else if (inputValue === 'canvas') {
      window.LastClickedLink = 'middlespot.com/gix';
      Window.spawnWindow('msedge');
      this.value = ''; // Clear the input field
  } else if (inputValue === 'gather') {
      window.LastClickedLink = 'app.gather.town/app/PZXqNDAAW2QQJOyU/Virtus';
      Window.spawnWindow('msedge');
      this.value = ''; // Clear the input field
  }
});




        //timer

        let timerInterval;
        let timeLeft = 1500; // 25 minutes in seconds

        function updateTimer() {
            const minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            document.getElementById('timer').textContent = `${minutes}:${seconds}`;
            timeLeft--;

            if (timeLeft < 0) {
                clearInterval(timerInterval);
                alert('Time is up!');
            }
        }

        document.getElementById('startStudy').addEventListener('click', () => {
            clearInterval(timerInterval);
            timeLeft = 1500;
            updateTimer();
            timerInterval = setInterval(updateTimer, 1000);
        });

        document.getElementById('startRest').addEventListener('click', () => {
            clearInterval(timerInterval);
            timeLeft = 300; // 5 minutes in seconds
            updateTimer();
            timerInterval = setInterval(updateTimer, 1000);
        });


        //zoom

        const zoomImage = document.getElementById('zoomImage');
        const container = document.querySelector('.zoom-container');
    
        let zoomLevel = 1;
        const zoomStep = 0.5; // Adjust this value to control the zoom sensitivity
    
        container.addEventListener('mousemove', (e) => {
          const rect = container.getBoundingClientRect();
          const offsetX = e.clientX - rect.left;
          const offsetY = e.clientY - rect.top;
    
          const xPercent = offsetX / rect.width;
          const yPercent = offsetY / rect.height;
    
          zoomImage.style.transformOrigin = `${xPercent * 100}% ${yPercent * 100}%`;
          zoomImage.style.transform = `scale(${zoomLevel})`;
        });
    
        container.addEventListener('mouseleave', () => {
          zoomImage.style.transformOrigin = 'center center';
          zoomImage.style.transform = 'scale(1)';
        });
    
        container.addEventListener('wheel', (e) => {
          e.preventDefault();
          if (e.deltaY < 0) {
            // Scrolling up
            zoomLevel += zoomStep;
          } else {
            // Scrolling down
            zoomLevel -= zoomStep;
          }
          zoomLevel = Math.max(1, zoomLevel); // Ensure the zoom level does not go below 1
          zoomImage.style.transform = `scale(${zoomLevel})`;
        });




        //todo list
        const todoList = document.getElementById('todoList');
        const todoInput = document.getElementById('todoInput');
    
        // Load todos from cache
        function loadTodos() {
          const todos = JSON.parse(localStorage.getItem('todos')) || [];
          todos.forEach(todo => {
            addTodoToList(todo.text, todo.completed);
          });
        }
    
        // Save todos to cache
        function saveTodos() {
          const todos = Array.from(todoList.children).map(item => ({
            text: item.querySelector('span').textContent,
            completed: item.classList.contains('completed')
          }));
          localStorage.setItem('todos', JSON.stringify(todos));
        }
    
        // Add a new todo to the list
        function addTodo() {
          const newTodo = todoInput.value.trim();
          if (newTodo) {
            addTodoToList(newTodo, false);
            saveTodos();
            todoInput.value = '';
          }
        }
    
        // Add a todo to the list element
        function addTodoToList(todoText, completed) {
          const div = document.createElement('div');
          div.className = `todo-item ${completed ? 'completed' : ''}`;
    
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.checked = completed;
          checkbox.onchange = function() {
            div.classList.toggle('completed', checkbox.checked);
            saveTodos();
          };
    
          const span = document.createElement('span');
          span.textContent = todoText;
          span.className = 'gradient-text';
    
          const removeBtn = document.createElement('span');
          removeBtn.className = 'remove-btn';
          removeBtn.textContent = 'X';
          removeBtn.onclick = function() {
            div.remove();
            saveTodos();
          };
    
          div.appendChild(checkbox);
          div.appendChild(span);
          div.appendChild(removeBtn);
          todoList.appendChild(div);
        }
    
        // Load todos when the page loads
        window.onload = loadTodos;







        //mindmap iframe
        function LetsMap(url) {
          const iframeContainer = document.createElement('div');
          iframeContainer.id = 'iframe-container';
          
          // Create the iframe controls
          const iframeControls = document.createElement('div');
          iframeControls.id = 'iframe-controls';
          
          // Create the close button
          const closeBtn = document.createElement('button');
          closeBtn.id = 'close-btn';
          closeBtn.textContent = 'X';
          
          // Append the buttons to the controls
          iframeControls.appendChild(closeBtn);
          
          // Create the iframe
          const myIframe = document.createElement('iframe');
          myIframe.id = 'my-iframe';
          myIframe.src = 'https://coggle.it/diagram/ZtRKbsrvLIwlzhs2/t/-';
          myIframe.frameBorder = '0';
          
          // Append the controls and iframe to the container
          iframeContainer.appendChild(iframeControls);
          iframeContainer.appendChild(myIframe);
          
          // Append the container to the document body
          document.body.appendChild(iframeContainer);
        
          closeBtn.addEventListener('click', () => {
            iframeContainer.style.display = 'none';
            window.LastClickedLink = 'coggle.it/diagram/ZtRKbsrvLIwlzhs2/t/-';
            Window.spawnWindow('msedge');
          });
        
          // Resize functionality
          let isResizing = false;
          let resizeDirection = '';
          let lastX, lastY;
        
          const resizeHandles = ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'];
        
          resizeHandles.forEach(handle => {
            const resizeHandle = document.createElement('div');
            resizeHandle.className = `resize-handle ${handle}`;
            iframeContainer.appendChild(resizeHandle);
          });
        
          iframeContainer.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('resize-handle')) {
              isResizing = true;
              resizeDirection = e.target.classList[1];
              lastX = e.clientX;
              lastY = e.clientY;
            }
          });
        
          window.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
        
            switch (resizeDirection) {
              case 'top':
              case 'top-left':
              case 'top-right':
                iframeContainer.style.height = `${iframeContainer.offsetHeight - dy}px`;
                iframeContainer.style.top = `${iframeContainer.offsetTop + dy}px`;
                break;
              case 'bottom':
              case 'bottom-left':
              case 'bottom-right':
                iframeContainer.style.height = `${iframeContainer.offsetHeight + dy}px`;
                break;
              case 'left':
              case 'top-left':
              case 'bottom-left':
                iframeContainer.style.width = `${iframeContainer.offsetWidth - dx}px`;
                iframeContainer.style.left = `${iframeContainer.offsetLeft + dx}px`;
                break;
              case 'right':
              case 'top-right':
              case 'bottom-right':
                iframeContainer.style.width = `${iframeContainer.offsetWidth + dx}px`;
                break;
            }
        
            lastX = e.clientX;
            lastY = e.clientY;
          });
        
          window.addEventListener('mouseup', () => {
            isResizing = false;
          });
        }



        //sweet alert2 

        document.addEventListener('DOMContentLoaded', function() {
          Swal.fire({
            title: '<span class="shaking-text">No need to waste money 💸 on courses,</span><br><span class="shaking-text">let AI help you understand everything</span><br><span class="shaking-text">and get A+</span>',
            showConfirmButton: true,
            confirmButtonText: 'Close',
            allowOutsideClick: true,
            allowEscapeKey: true,
            backdrop: false,
            html: '<div class="raining-emojis"></div>',
            didOpen: () => {
              const rainingEmojis = document.querySelector('.raining-emojis');
              const emojis = ['🌟', '💡', '🎓', '📚', '🤖'];
              setInterval(() => {
                const emoji = document.createElement('div');
                emoji.className = 'emoji';
                emoji.style.left = `${Math.random() * 100}vw`;
                emoji.style.animationDuration = `${Math.random() * 2 + 2}s`;
                emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                rainingEmojis.appendChild(emoji);
                setTimeout(() => {
                  emoji.remove();
                }, 4000);
              }, 200);
            }
          });
        });
