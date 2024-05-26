var binder;
export function _MOUSECLICK(event) {
    event.preventDefault();
  //**************************************************************************
  //**************        DOOR/WINDOW MODE   *********************************
  //**************************************************************************

  if (mode == 'door_mode') {

    snap = calcul_snap(event, grid_snap);
    if (wallSelect = editor.nearWall(snap)) {
      var wall = wallSelect.wall;
      if (wall.type != 'separate') {
        if (typeof (binder) == 'undefined') {
          // family, classe, type, pos, angle, angleSign, size, hinge, thick
          binder = new editor.obj2D("inWall", "doorWindow", modeOption, wallSelect, 0, 0, 60, "normal", wall.thick);
          var angleWall = qSVG.angleDeg(wall.start.x, wall.start.y, wall.end.x, wall.end.y);
          var v1 = qSVG.vectorXY({ x: wall.start.x, y: wall.start.y }, { x: wall.end.x, y: wall.end.y });
          var v2 = qSVG.vectorXY({ x: wall.end.x, y: wall.end.y }, snap);
          var newAngle = qSVG.vectorDeter(v1, v2);
          if (Math.sign(newAngle) == 1) {
            angleWall += 180;
            binder.angleSign = 1;
          }
          var startCoords = qSVG.middle(wall.start.x, wall.start.y, wall.end.x, wall.end.y);
          binder.x = startCoords.x;
          binder.y = startCoords.y;
          binder.angle = angleWall;
          binder.update();
          $('#boxbind').append(binder.graph);
        }
        else {
          var angleWall = qSVG.angleDeg(wall.start.x, wall.start.y, wall.end.x, wall.end.y);
          var v1 = qSVG.vectorXY({ x: wall.start.x, y: wall.start.y }, { x: wall.end.x, y: wall.end.y });
          var v2 = qSVG.vectorXY({ x: wall.end.x, y: wall.end.y }, snap);
          var newAngle = qSVG.vectorDeter(v1, v2);
          binder.angleSign = 0;
          if (Math.sign(newAngle) == 1) {
            binder.angleSign = 1;
            angleWall += 180;
          }

          var limits = limitObj(wall.equations.base, binder.size, wallSelect);
          if (qSVG.btwn(limits[0].x, wall.start.x, wall.end.x) && qSVG.btwn(limits[0].y, wall.start.y, wall.end.y) && qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) && qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)) {
            binder.x = wallSelect.x;
            binder.y = wallSelect.y;
            binder.angle = angleWall;
            binder.thick = wall.thick;
            binder.limit = limits;
            binder.update();
          }

          if ((wallSelect.x == wall.start.x && wallSelect.y == wall.start.y) || (wallSelect.x == wall.end.x && wallSelect.y == wall.end.y)) {
            if (qSVG.btwn(limits[0].x, wall.start.x, wall.end.x) && qSVG.btwn(limits[0].y, wall.start.y, wall.end.y)) {
              binder.x = limits[0].x;
              binder.y = limits[0].y;
            }
            if (qSVG.btwn(limits[1].x, wall.start.x, wall.end.x) && qSVG.btwn(limits[1].y, wall.start.y, wall.end.y)) {
              binder.x = limits[1].x;
              binder.y = limits[1].y;
            }
            binder.limit = limits;
            binder.angle = angleWall;
            binder.thick = wall.thick;
            binder.update();
          }
        }
      }
    }
    else {
      if (typeof (binder) != 'undefined') {
        binder.graph.remove();
        //delete binder;
      }
    }
  } // END DOOR MODE
}


export function calcul_snap(event, state) {
    if (event.touches) {
        let touches = event.changedTouches;
        console.log("toto")
        eX = touches[0].pageX;
        eY = touches[0].pageY;
        tactile = true;
    } else {
        eX = event.pageX;
        eY = event.pageY;
    }
    x_mouse = (eX * factor) - (offset.left * factor) + originX_viewbox;
    y_mouse = (eY * factor) - (offset.top * factor) + originY_viewbox;

    if (state === 'on') {
        x_grid = Math.round(x_mouse / grid) * grid;
        y_grid = Math.round(y_mouse / grid) * grid;
    }
    if (state === 'off') {
        x_grid = x_mouse;
        y_grid = y_mouse;
    }
    return {
        x: x_grid,
        y: y_grid,
        xMouse: x_mouse,
        yMouse: y_mouse
    };
}