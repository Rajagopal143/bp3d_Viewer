var blueprint3d = null;
var aGlobal = null;
var anItem = null;
var aWall = null;
var aFloor = null;
var aCameraRange = null;
var gui = null;
var globalPropFolder = null;
var itemPropFolder = null;
var wallPropFolder = null;
var floorPropFolder = null;
var cameraPropFolder = null;
var selectionsFolder = null;

var myhome =
  '{"floorplan":{"corners":{"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2":{"x":0,"y":0,"elevation":2.5},"f90da5e3-9e0e-eba7-173d-eb0b071e838e":{"x":0,"y":5,"elevation":2.5},"da026c08-d76a-a944-8e7b-096b752da9ed":{"x":5,"y":5,"elevation":2.5},"4e3d65cb-54c0-0681-28bf-bddcc7bdb571":{"x":5,"y":0,"elevation":2.5}},"walls":[{"corner1":"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2","corner2":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","corner2":"da026c08-d76a-a944-8e7b-096b752da9ed","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"da026c08-d76a-a944-8e7b-096b752da9ed","corner2":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","corner2":"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}}],"rooms":{"f90da5e3-9e0e-eba7-173d-eb0b071e838e,71d4f128-ae80-3d58-9bd2-711c6ce6cdf2,4e3d65cb-54c0-0681-28bf-bddcc7bdb571,da026c08-d76a-a944-8e7b-096b752da9ed":{"name":"A New Room"}},"wallTextures":[],"floorTextures":{},"newFloorTextures":{},"carbonSheet":{"url":"","transparency":1,"x":0,"y":0,"anchorX":0,"anchorY":0,"width":0.01,"height":0.01}},"items":[]}';

  $(document).load(async () => {
   
  });
var ViewerFloorplanner = function (blueprint3d) {
  var canvasWrapper = "#floorplanner";
  // buttons
  var move = "#move";
  var remove = "#delete";
  var draw = "#draw";

  var activeStlye = "btn-primary disabled";
  this.floorplanner = blueprint3d.floorplanner;
  var scope = this;
 
 
  function init() {
    scope.floorplanner.addEventListener(
      BP3DJS.EVENT_MODE_RESET,
      function (mode) {
        $(draw).removeClass(activeStlye);
        $(remove).removeClass(activeStlye);
        $(move).removeClass(activeStlye);
        if (mode == BP3DJS.floorplannerModes.MOVE) {
          $(move).addClass(activeStlye);
        } else if (mode == BP3DJS.floorplannerModes.DRAW) {
          $(draw).addClass(activeStlye);
        } else if (mode == BP3DJS.floorplannerModes.DELETE) {
          $(remove).addClass(activeStlye);
        }

        if (mode == BP3DJS.floorplannerModes.DRAW) {
          $("#draw-walls-hint").show();
          scope.handleWindowResize();
        } else {
          $("#draw-walls-hint").hide();
        }
      }
    );

    $(move).click(function () {
      scope.floorplanner.setMode(BP3DJS.floorplannerModes.MOVE);
    });

    $(draw).click(function () {
      scope.floorplanner.setMode(BP3DJS.floorplannerModes.DRAW);
    });

    $(remove).click(function () {
      scope.floorplanner.setMode(BP3DJS.floorplannerModes.DELETE);
    });

     $(doors).click(function () {
       scope.floorplanner.setMode(BP3DJS.floorplannerModes.DOOR);
     });
    $("#wallthickness").on('change', function () {
      const wallthickness = $(this).val();
      BP3DJS.Configuration.setValue("wallThickness", wallthickness);
    });
  }

  this.updateFloorplanView = function () {
    scope.floorplanner.reset();
  };

  this.handleWindowResize = function () {
    $(canvasWrapper).height(window.innerHeight - $(canvasWrapper).offset().top);
    scope.floorplanner.resizeView();
  };

  init();
};
 
var mainControls = function (blueprint3d) {
  var blueprint3d = blueprint3d;

  function newDesign() {
    blueprint3d.model.loadSerialized(myhome);
  }

  function loadDesign() {
    files = $("#loadFile").get(0).files;
    if (files.length == 0) {
      files = $("#loadFile2d").get(0).files;
    }
    var reader = new FileReader();
    reader.onload = function (event) {
      var data = event.target.result;
      blueprint3d.model.loadSerialized(data);
    };
    reader.readAsText(files[0]);
  }
   

  function saveDesign() {
    var data = blueprint3d.model.exportSerialized();
    const edgedata = blueprint3d.three.getvertices().edges;
    const chunkedArray = [];
    data = JSON.parse(data);
    console.log(data["floorplan"]);
    for (let i = 0; i < data["floorplan"]["walls"].length; i += 1) {
      const [chunk] = edgedata[i].getBottomPhase();
      data["floorplan"]["walls"][i]["vertices"] = chunk;
      console.log(data["floorplan"]["walls"][i]);
      chunkedArray.push(chunk);
    }
    data["vertices"] = chunkedArray;
    data["InteriorVertices"] = getInteriorVertices();
    data = JSON.stringify(data);
    var a = window.document.createElement("a");
    var blob = new Blob([data], { type: "text" });
    a.href = window.URL.createObjectURL(blob);
    a.download = "design.blueprint3d";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function getInteriorVertices() {
    const interiorPoints = [];
    const edgedata = blueprint3d.three.getvertices().edges;
    for (let i = 0; i < edgedata.length; i += 1) { 
      const [chunk] = edgedata[i].getBottomPhase();
      addObjectToArray(interiorPoints,chunk[0])
      addObjectToArray(interiorPoints,chunk[1])
    }
    return interiorPoints;
  }
  function addObjectToArray(array, object) {
    // Check if the object with the same x and y values already exists in the array
    const exists = array.some(
      (item) => item.x === object.x && item.y === object.y
    );

    // If the object does not exist, add it to the array
    if (!exists) {
      array.push(object);
    }
  }
  function updateJson(event) {
    console.log("hi");
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          const json = JSON.parse(e.target.result);
          setMyHome(json);
        } catch (ex) {
          console.log(ex.message);
        }
      };
      reader.readAsText(file);
    } else {
    }
  }
  function setMyHome(data) {
    const myroom = JSON.parse(myhome);
    const floorplan = myroom.floorplan;
    const firstKey = Object.keys(floorplan.rooms)[0];
    floorplan.rooms[firstKey].name = data[0].name;
    myroom.floorplan = floorplan;
    myhome = JSON.stringify(myroom);
    // console.log(home);
    console.log(myhome);
    blueprint3d.model.loadSerialized(myhome);
    console.log(data);
  }

  function saveGLTF() {
    blueprint3d.three.exportForBlender();
  }

  function saveGLTFCallback(o) {
    var data = o.gltf;
    var a = window.document.createElement("a");
    var blob = new Blob([data], { type: "text" });
    a.href = window.URL.createObjectURL(blob);
    a.download = "design.gltf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function saveMesh() {
    var data = blueprint3d.model.exportMeshAsObj();
    var a = window.document.createElement("a");
    var blob = new Blob([data], { type: "text" });
    a.href = window.URL.createObjectURL(blob);
    a.download = "design.obj";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function init() {
    $("#new").click(newDesign);
    $("#new2d").click(newDesign);
    $("#loadFile").change(loadDesign);
    $("#saveFile").click(saveDesign);

    $("#loadFile2d").change(loadDesign);
    $("#saveFile2d").click(saveDesign);

    $("#saveMesh").click(saveMesh);
    $("#saveGLTF").click(saveGLTF);
    blueprint3d.three.addEventListener(
      BP3DJS.EVENT_GLTF_READY,
      saveGLTFCallback
    );
    $("#updatejson").change(updateJson);
  }
  $("#floorplanner-canvas").on("wheel", function (event) {
    const scale = BP3DJS.Configuration.getData().scale;
    const scaleStep = 0.2; // Use smaller increments for smoother scaling

    // Prevent the default scroll behavior
    event.preventDefault();

    // Decrease scale on scrolling down, but do not go below 0.5
    if (event.originalEvent.deltaY < 0 && scale > 0.5) {
      BP3DJS.Configuration.setValue("scale", Math.max(0.5, scale - scaleStep));
    }
    // Increase scale on scrolling up, but do not go above 5
    else if (event.originalEvent.deltaY > 0 && scale < 5) {
      BP3DJS.Configuration.setValue("scale", Math.min(5, scale + scaleStep));
    }
    // Redraw the floorplan view
    blueprint3d.floorplanner.view.draw();
  });

  init();
};

var GlobalProperties = function () {
  this.name = "Global";
  //a - feet and inches, b = inches, c - cms, d - millimeters, e - meters
  this.units = { a: false, b: false, c: false, d: false, e: true };
  this.unitslabel = {
    a: BP3DJS.dimFeetAndInch,
    b: BP3DJS.dimInch,
    c: BP3DJS.dimCentiMeter,
    d: BP3DJS.dimMilliMeter,
    e: BP3DJS.dimMeter,
  };
  this.guiControllers = null;

  this.setUnit = function (unit) {
    for (let param in this.units) {
      this.units[param] = false;
    }
    this.units[unit] = true;

    BP3DJS.Configuration.setValue(BP3DJS.configDimUnit, this.unitslabel[unit]);

    console.log(
      this.units,
      this.unitslabel[unit],
      BP3DJS.Configuration.getStringValue(BP3DJS.configDimUnit)
    );

    //		globalPropFolder = getGlobalPropertiesFolder(gui, aGlobal, floorplanner);
    var view2df = construct2dInterfaceFolder(
      globalPropFolder,
      aGlobal,
      blueprint3d.floorplanner
    );
    blueprint3d.floorplanner.view.draw();
    for (var i in this.guiControllers) {
      // Iterate over gui controllers to update the values
      this.guiControllers[i].updateDisplay();
    }
  };

  this.setGUIControllers = function (guiControls) {
    this.guiControllers = guiControls;
  };
};

var CameraProperties = function () {
  this.ratio = 1;
  this.ratio2 = 1;
  this.locked = false;
  this.three = null;

  this.change = function () {
    if (this.three) {
      this.three.changeClippingPlanes(this.ratio, this.ratio2);
    }
  };

  this.changeLock = function () {
    if (this.three) {
      this.three.lockView(!this.locked);
    }
  };

  this.reset = function () {
    if (this.three) {
      this.three.resetClipping();
    }
  };
};

var CornerProperties = function (corner, gui) {
  var scope = this;
  this.x = BP3DJS.Dimensioning.cmToMeasureRaw(corner.x);
  this.y = BP3DJS.Dimensioning.cmToMeasureRaw(corner.y);
  this.elevation = BP3DJS.Dimensioning.cmToMeasureRaw(corner.elevation);
  this.gui = gui;
  this.corner = corner;

  function onEvent() {
    scope.x = BP3DJS.Dimensioning.cmToMeasureRaw(scope.corner.x);
    scope.y = BP3DJS.Dimensioning.cmToMeasureRaw(scope.corner.y);
    scope.elevation = BP3DJS.Dimensioning.cmToMeasureRaw(
      scope.corner.elevation
    );
    scope.xcontrol.updateDisplay();
    scope.ycontrol.updateDisplay();
    scope.elevationcontrol.updateDisplay();
  }

  function onChangeX() {
    scope.corner.x = BP3DJS.Dimensioning.cmFromMeasureRaw(scope.x);
  }
  function onChangeY() {
    scope.corner.y = BP3DJS.Dimensioning.cmFromMeasureRaw(scope.y);
  }
  function onChangeElevation() {
    scope.corner.elevation = BP3DJS.Dimensioning.cmFromMeasureRaw(
      scope.elevation
    );
  }

  this.corner.addEventListener(BP3DJS.EVENT_CORNER_ATTRIBUTES_CHANGED, onEvent);
  //	this.corner.addEventListener(BP3DJS.EVENT_MOVED, onEvent);

  this.f = gui.addFolder("Current Corner");
  this.xcontrol = f
    .add(this, "x")
    .name(`x(${BP3DJS.Configuration.getStringValue(BP3DJS.configDimUnit)})`)
    .step(0.01)
    .onChange(() => {
      onChangeX();
    });
  this.ycontrol = f
    .add(this, "y")
    .name(`y(${BP3DJS.Configuration.getStringValue(BP3DJS.configDimUnit)})`)
    .step(0.01)
    .onChange(() => {
      onChangeY();
    });
  this.elevationcontrol = f
    .add(this, "elevation")
    .name(
      `Elevation(${BP3DJS.Configuration.getStringValue(BP3DJS.configDimUnit)})`
    )
    .min(0)
    .step(0.01)
    .onChange(() => {
      onChangeElevation();
    });

  return this.f;
};

const addRoomDiv = () => {
  const INhtml = ` <div class="productlist">
       <img src=${img} alt="">
	   <span>${brand}</span>
	   <h3>${name}</h3>
	    <span>${price}</span>
	</div>`;



}
const getproducts = () => {
  const url = "http://localhost:3000/getProducts";
  
}


var RoomProperties = function (room, gui) {
  var scope = this;
  this.gui = gui;
  this.room = room;
  this.name = room.name;
  this.f = gui.addFolder("CurrentRoom");
  this.data = {};

  $("#roomarea").val(BP3DJS.Dimensioning.cmToMeasure(this.room.area, 2));
  $(".container").show();
  $("#roomname").on("change", function () {
    const value = $(this).val();
    setName(value);
  });

  $("#roomname").val(this.room.name);
  // this.namecontrol = this.f.add(this.room, 'name').name("Name");
  renderFormFields(this.room.roomDetails);
  $("#addButton").click(() => {
    $("#getkeyValue").show();
    $(document).on("click", "#setKeyValue", function () {
      const key = $("#key").val();
      const value = $("#value").val();
      addkeyValue(key, value);
    });
    $(document).on("click", "#remove-button", function () {
      removeData(this);
    });
  });
  function setName(value) {
    this.room.name = value;
  }
  function addkeyValue(key, value) {
    if (key == "" && value == "") {
      $("#getkeyValue").hide();
      return;
    }
    $("#getkeyValue").hide();
    this.room.setRoomDetails(key, value);
    renderFormFields(this.room.roomDetails);
    $("#key").val("");
    $("#value").val("");
  }

  function renderFormFields(data) {
    $("#formFields").empty(); // Clear existing fields
    for (let key in data) {
      $("#formFields").append(`
                <div class="key-value-pair form-group">
                    <label for="${key}">${key}</label>
                    <input type="text" id="${key}" name="${key}" value="${data[key]}" data-key="${key}" />
                    <span class="colon">:</span>
                    <button type="button" id="remove-button" data-key="${key}">Del</button>
                </div>
            `);
    }
  }

  function removeData(data) {
    const key = $(data).data("key");
    this.room.deleteRoomDetails(key);
    renderFormFields(this.room.roomDetails);
  }
  $("#jsonForm").submit((e) => {
    submitfrom(e);
  });
  function submitfrom(e) {
    e.preventDefault();
    const jsonData = {};
    const formData = $("#jsonForm").serializeArray();
    // formData.forEach((item) => {
    //   addkeyValue(item.name, item.value);
    // });
    this.room.setAllroomDetails(formData);
    $(".container").hide();
    $("#getkeyValue").hide();
  }
  // this.detailsFolder = this.f.addFolder("Room Details");

  // // Function to update room details in the GUI
  // this.updateRoomDetails = function () {
  //   // Remove all previous controllers
  // 	clearFolder(this.detailsFolder);

  //   // Add controllers for each key in roomDetails
  //   for (const key in room.roomDetails) {
  //     if (room.roomDetails.hasOwnProperty(key)) {
  //       this.detailsFolder.add(room.roomDetails, key).name(key);
  //     }
  //   }
  // 	this.detailsFolder.open(); // Open the details folder
  //     this.namecontrol.initialValue = this.namecontrol.initialValue + "";

  // };

  // // Initial population of room details
  // this.updateRoomDetails();
  // // Add a button to prompt user for key-value input
  // var addKeyValueButton = {
  //   addKeyValue: function () {
  //     $(".roomDetails").show();
  //     $("#formsubmit")
  //       .on("click", function () {
  //         var key = $(".keyInput").val();
  //         if (key === null || key.trim() === "") return; // User canceled or entered invalid key

  //         // Add key-value pair to roomDetails
  // 		room.roomDetails[key] = '';

  // 		$(".roomDetails").hide();
  // 		scope.updateRoomDetails();
  // 	});
  // 	$(".keyInput").val('')
  // 	  room.name = room.name;
  //   },

  // };
  // function clearFolder(folder) {
  //   // Remove all controllers in the folder
  //   folder.__controllers.forEach((controller) => {
  //     folder.remove(controller);
  //   });

  //   // Remove all folders within the folder
  //   Object.keys(folder.__folders).forEach((key) => {
  //     folder.removeFolder(folder.__folders[key]);
  //   });
  // }

  // this.f
  //   .add(addKeyValueButton, "addKeyValue")
  //   .name("Add Key-Value");

  return this.f;
};

var Wall2DProperties = function (wall2d, gui) {
  var scope = this;
  this.gui = gui;
  this.wall2d = wall2d;
  this.walltype = "Straight";
  this.walllength = BP3DJS.Dimensioning.cmToMeasureRaw(wall2d.wallSize);
  $(".wallDetails").show();
  $("#wallLength").val(this.walllength);
  $("#wallLength").on("change", function () {
    setWallLength($(this).val());
  });
  $("#walltype").val("Straight");
  $("#walltype").on("change", function () {
    setWallType($(this).val());
  });
  // $("#wallthikness").val(
  //   BP3DJS.Configuration.getStringValue(BP3DJS.configWallThickness)
  // );
  $("#wallthikness").on("change", function () {
    BP3DJS.Configuration.setValue(BP3DJS.configWallThickness, $(this).val());
  });

  function setWallType(value) {
    const select = value;
    scope.walltype = select;
    if (scope.walltype == "Straight") {
      scope.wall2d.wallType = BP3DJS.WallTypes.STRAIGHT;
    } else if (scope.walltype == "Curved") {
      scope.wall2d.wallType = BP3DJS.WallTypes.CURVED;
    }
    blueprint3d.floorplanner.view.draw();
  }

  function setWallLength(value) {
    scope.wall2d.wallSize = BP3DJS.Dimensioning.cmFromMeasureRaw(Number(value));
    blueprint3d.floorplanner.view.draw();
  }

  function onChangeWallType() {
    if (scope.walltype == "Straight") {
      scope.wall2d.wallType = BP3DJS.WallTypes.STRAIGHT;
    } else if (scope.walltype == "Curved") {
      scope.wall2d.wallType = BP3DJS.WallTypes.CURVED;
    }
    blueprint3d.floorplanner.view.draw();
  }

  function onChangeWallLength() {
    scope.wall2d.wallSize = BP3DJS.Dimensioning.cmFromMeasureRaw(
      scope.walllength
    );
    blueprint3d.floorplanner.view.draw();
  }

  this.options = ["Straight", "Curved"];
  if (this.wall2d.wallType == BP3DJS.WallTypes.CURVED) {
    this.walltype = "Curved";
  }
  this.f = gui.addFolder("Current Wall 2D");
  this.typecontrol = f
    .add(this, "walltype", this.options)
    .name("Wall Type")
    .onChange(() => {
      onChangeWallType();
    });
  if (this.wall2d.wallType == BP3DJS.WallTypes.STRAIGHT) {
    this.lengthcontrol = f
      .add(this, "walllength")
      .name("Wall Length")
      .onChange(() => {
        onChangeWallLength();
      });
  }
  return this.f;
};

var ItemProperties = function (gui) {
  this.name = "an item";
  this.width = 10;
  this.height = 10;
  this.depth = 10;
  this.fixed = false;
  this.currentItem = null;
  this.guiControllers = null;
  this.gui = gui;
  this.materialsfolder = null;
  this.materials = {};
  this.totalmaterials = -1;
  this.proportionalsize = false;
  this.changingdimension = "w";

  this.setGUIControllers = function (guiControls) {
    this.guiControllers = guiControls;
  };

  this.setItem = function (item) {
    this.currentItem = item;
    if (this.materialsfolder) {
      this.gui.removeFolder(this.materialsfolder.name);
    }
    if (item) {
      var scope = this;
      var material = item.material;
      this.name = item.metadata.itemName;
      this.width = BP3DJS.Dimensioning.cmToMeasureRaw(item.getWidth());
      this.height = BP3DJS.Dimensioning.cmToMeasureRaw(item.getHeight());
      this.depth = BP3DJS.Dimensioning.cmToMeasureRaw(item.getDepth());
      this.fixed = item.fixed;
      this.proportionalsize = item.getProportionalResize();

      for (var i in this.guiControllers) {
        // Iterate over gui controllers to update the values
        this.guiControllers[i].updateDisplay();
      }

      this.materialsfolder = this.gui.addFolder("Materials");
      this.materials = {};
      if (material.length) {
        this.totalmaterials = material.length;
        for (var i = 0; i < material.length; i++) {
          this.materials["mat_" + i] = "#" + material[i].color.getHexString();
          var matname = material[i].name
            ? material[i].name
            : "Material " + (i + 1);
          var ccontrol = this.materialsfolder
            .addColor(this.materials, "mat_" + i)
            .name(matname)
            .onChange(() => {
              scope.dimensionsChanged();
            });
        }
        return;
      }
      this.totalmaterials = 1;
      var matname = material.name ? material.name : "Material 1";
      this.materials["mat_0"] = "#" + material.color.getHexString();
      var ccontrol = this.materialsfolder
        .addColor(this.materials, "mat_0")
        .name(matname)
        .onChange(() => {
          scope.dimensionsChanged();
        });
      return;
    }
    this.name = "None";
    return;
  };

  this.dimensionsChanged = function () {
    if (this.currentItem) {
      var item = this.currentItem;

      var ow = BP3DJS.Dimensioning.cmToMeasureRaw(item.getWidth());
      var oh = BP3DJS.Dimensioning.cmToMeasureRaw(item.getHeight());
      var od = BP3DJS.Dimensioning.cmToMeasureRaw(item.getDepth());

      var h = BP3DJS.Dimensioning.cmFromMeasureRaw(this.height);
      var w = BP3DJS.Dimensioning.cmFromMeasureRaw(this.width);
      var d = BP3DJS.Dimensioning.cmFromMeasureRaw(this.depth);

      this.currentItem.resize(h, w, d);

      if (w != ow) {
        this.height = BP3DJS.Dimensioning.cmToMeasureRaw(item.getHeight());
        this.depth = BP3DJS.Dimensioning.cmToMeasureRaw(item.getDepth());
      }

      if (h != oh) {
        this.width = BP3DJS.Dimensioning.cmToMeasureRaw(item.getWidth());
        this.depth = BP3DJS.Dimensioning.cmToMeasureRaw(item.getDepth());
      }

      if (d != od) {
        this.width = BP3DJS.Dimensioning.cmToMeasureRaw(item.getWidth());
        this.height = BP3DJS.Dimensioning.cmToMeasureRaw(item.getHeight());
      }
      for (var i = 0; i < this.totalmaterials; i++) {
        this.currentItem.setMaterialColor(this.materials["mat_" + i], i);
      }

      this.guiControllers.forEach((control) => {
        control.updateDisplay();
      }); // Iterate over gui controllers to update the values
    }
  };

  this.proportionFlagChange = function () {
    if (this.currentItem) {
      this.currentItem.setProportionalResize(this.proportionalsize);
    }
  };

  this.lockFlagChanged = function () {
    if (this.currentItem) {
      this.currentItem.setFixed(this.fixed);
    }
  };

  this.deleteItem = function () {
    if (this.currentItem) {
      this.currentItem.remove();
      this.setItem(null);
    }
  };
};

var WallProperties = function () {
  this.textures = [
    ["rooms/textures/wallmap.png", true, 1],
    ["rooms/textures/wallmap_yellow.png", true, 1],
    ["rooms/textures/light_brick.jpg", false, 50],
    ["rooms/textures/marbletiles.jpg", true, 300],
    ["rooms/textures/light_brick.jpg", false, 100],
    ["rooms/textures/light_fine_wood.jpg", false, 300],
    ["rooms/textures/hardwood.png", false, 300],
  ];

  this.floormaterialname = 0;
  this.wallmaterialname = 0;

  this.forAllWalls = false;

  this.currentWall = null;
  this.currentFloor = null;

  this.wchanged = function () {
    if (this.currentWall) {
      this.currentWall.setTexture(
        this.textures[this.wallmaterialname][0],
        this.textures[this.wallmaterialname][1],
        this.textures[this.wallmaterialname][2]
      );
    }
    // if (this.currentFloor && this.forAllWalls) {
    //   this.currentFloor.setRoomWallsTexture(
    //     this.textures[this.wallmaterialname][0],
    //     this.textures[this.wallmaterialname][1],
    //     this.textures[this.wallmaterialname][2]
    //   );
    // }
  };

  this.fchanged = function () {
    if (this.currentFloor) {
      this.currentFloor.setTexture(
        this.textures[this.floormaterialname][0],
        this.textures[this.floormaterialname][1],
        this.textures[this.floormaterialname][2]
      );
    }
  };

  this.setWall = function (wall) {
    this.currentWall = wall;
  };

  this.setFloor = function (floor) {
    this.currentFloor = floor;
    console.log(this.currentFloor);
  };
  this.setWallMatriealName = function (val) {
    this.wallmaterialname = val;
  };
  this.setfloormaterialname = function (val) {
    this.floormaterialname = val;
  };
};

function addBlueprintListeners(blueprint3d) {
  var three = blueprint3d.three;
  var currentFolder = undefined;

  function closeCurrent3DSelectionFolders() {
    if (itemPropFolder && itemPropFolder != null) {
      itemPropFolder.close();
      selectionsFolder.removeFolder(itemPropFolder.name);
    }
    if (wallPropFolder && wallPropFolder != null) {
      wallPropFolder.close();
      selectionsFolder.removeFolder(wallPropFolder.name);
    }
  }
  function wallClicked(wall) {
    closeCurrent3DSelectionFolders();

    aWall = new WallProperties();
    aWall.setWall(wall);
    aWall.setFloor(null);
    wallPropFolder = getWallAndFloorPropertiesFolder(selectionsFolder, aWall);
    //		selectionsFolder.addFolder(wallPropFolder);

    wallPropFolder.open();
    selectionsFolder.open();
  }

  function floorClicked(floor) {
    closeCurrent3DSelectionFolders();

    aWall = new WallProperties();
    aWall.setFloor(floor);
    aWall.setWall(null);

    wallPropFolder = getWallAndFloorPropertiesFolder(selectionsFolder, aWall);
    //		selectionsFolder.addFolder(wallPropFolder);

    wallPropFolder.open();
    selectionsFolder.open();
  }

  function itemSelected(item) {
    closeCurrent3DSelectionFolders();

    anItem = new ItemProperties(selectionsFolder, item);
    //		anItem.setItem(item);

    itemPropFolder = getItemPropertiesFolder(selectionsFolder, anItem);
    //		selectionsFolder.addFolder(itemPropFolder);

    itemPropFolder.open();
    selectionsFolder.open();
  }
  function itemUnselected() {
    closeCurrent3DSelectionFolders();
    if (anItem != null) {
      anItem.setItem(undefined);
    }
  }

  three.addEventListener(BP3DJS.EVENT_ITEM_SELECTED, function (o) {
    itemSelected(o.item);
  });
  three.addEventListener(BP3DJS.EVENT_ITEM_UNSELECTED, function (o) {
    itemUnselected();
  });
  three.addEventListener(BP3DJS.EVENT_WALL_CLICKED, (o) => {
    wallClicked(o.item);
  });
  three.addEventListener(BP3DJS.EVENT_FLOOR_CLICKED, (o) => {
    floorClicked(o.item);
  });
  three.addEventListener(BP3DJS.EVENT_FPS_EXIT, () => {
    $("#showDesign").trigger("click");
  });

  function echoEvents(o) {
    // //(o.type, o.item);
  }

  function addGUIFolder(o) {
    //    	//(o.type, o.item);
    if (currentFolder) {
      selectionsFolder.removeFolder(currentFolder.name);
    }
    if (o.type == BP3DJS.EVENT_CORNER_2D_CLICKED) {
      $(".container").hide();
      $("#getkeyValue").hide();
      $(".wallDetails").hide();
      $("#carbonsheet").hide();

      currentFolder = CornerProperties(o.item, selectionsFolder); //getCornerPropertiesFolder(gui, o.item);
      //(o);
    } else if (o.type == BP3DJS.EVENT_ROOM_2D_CLICKED) {
      $(".container").show();
      $(".wallDetails").hide();
      $("#carbonsheet").hide();

      //(o);
      currentFolder = RoomProperties(o.item, selectionsFolder); //getRoomPropertiesFolder(gui, );
    } else if (o.type == BP3DJS.EVENT_WALL_2D_CLICKED) {
      $(".wallDetails").show();
      $(".container").hide();
      $("#getkeyValue").hide();
      $("#carbonsheet").hide();

      currentFolder = Wall2DProperties(o.item, selectionsFolder);
    } else {
      $(".container").hide();
      $("#getkeyValue").hide();
      $(".wallDetails").hide();
      // $("#carbonsheet").show();
    }
    if (currentFolder) {
      currentFolder.open();
      selectionsFolder.open();
    }
  }

  var model_floorplan = blueprint3d.model.floorplan;
  model_floorplan.addEventListener(
    BP3DJS.EVENT_CORNER_2D_DOUBLE_CLICKED,
    echoEvents
  );
  model_floorplan.addEventListener(
    BP3DJS.EVENT_WALL_2D_DOUBLE_CLICKED,
    echoEvents
  );
  model_floorplan.addEventListener(
    BP3DJS.EVENT_ROOM_2D_DOUBLE_CLICKED,
    echoEvents
  );
  model_floorplan.addEventListener("scroll", echoEvents);

  model_floorplan.addEventListener(BP3DJS.EVENT_NOTHING_CLICKED, addGUIFolder);
  model_floorplan.addEventListener(
    BP3DJS.EVENT_CORNER_2D_CLICKED,
    addGUIFolder
  );
  model_floorplan.addEventListener(BP3DJS.EVENT_WALL_2D_CLICKED, addGUIFolder);
  model_floorplan.addEventListener(BP3DJS.EVENT_ROOM_2D_CLICKED, addGUIFolder);
  model_floorplan.addEventListener(BP3DJS.EVENT_CORNER_2D_HOVER, echoEvents);
  model_floorplan.addEventListener(BP3DJS.EVENT_WALL_2D_HOVER, echoEvents);
  model_floorplan.addEventListener(BP3DJS.EVENT_ROOM_2D_HOVER, echoEvents);

  model_floorplan.addEventListener(
    BP3DJS.EVENT_CORNER_ATTRIBUTES_CHANGED,
    echoEvents
  );
  model_floorplan.addEventListener(
    BP3DJS.EVENT_WALL_ATTRIBUTES_CHANGED,
    echoEvents
  );
  model_floorplan.addEventListener(
    BP3DJS.EVENT_ROOM_ATTRIBUTES_CHANGED,
    echoEvents
  );

  function deleteEvent(evt) {
    //("DELETED ", evt);
  }

  model_floorplan.addEventListener(BP3DJS.EVENT_DELETED, deleteEvent);

  BP3DJS.Configuration.setValue(BP3DJS.configSystemUI, false);

  // three.skybox.toggleEnvironment(this.checked);
  // currentTarget.setTexture(textureUrl, textureStretch, textureScale);
  // three.skybox.setEnvironmentMap(textureUrl);
}

function getCornerPropertiesFolder(gui, corner) {
  var f = gui.addFolder("Current Corner");
  var xcontrol = f.add(corner, "x").name("x").step(0.01);
  var ycontrol = f.add(corner, "y").name("y").step(0.01);
  var elevationctonrol = f
    .add(corner, "elevation")
    .name("Elevation")
    .step(0.01);
  return f;
}

// function getRoomPropertiesFolder(gui, room) {
//   var f = gui.addFolder("Current Room");
//   var namecontrol = f.add(corner, "name").name("Name");
//   return f;
// }

function getCameraRangePropertiesFolder(gui, camerarange) {
  var f = gui.addFolder("Camera Limits");
  var ficontrol = f
    .add(camerarange, "ratio", -1, 1)
    .name("Range")
    .step(0.01)
    .onChange(function () {
      camerarange.change();
    });
  var ficontrol2 = f
    .add(camerarange, "ratio2", -1, 1)
    .name("Range 2")
    .step(0.01)
    .onChange(function () {
      camerarange.change();
    });
  var flockcontrol = f
    .add(camerarange, "locked")
    .name("Lock View")
    .onChange(function () {
      camerarange.changeLock();
    });
  var resetControl = f.add(camerarange, "reset").name("Reset");
  return f;
}

function construct2dInterfaceFolder(f, global, floorplanner) {
  function onChangeSnapResolution() {
    BP3DJS.Configuration.setValue(
      BP3DJS.snapTolerance,
      BP3DJS.Dimensioning.cmFromMeasureRaw(view2dindirect.snapValue)
    );
  }

  function onChangeGridResolution() {
    BP3DJS.Configuration.setValue(
      BP3DJS.gridSpacing,
      BP3DJS.Dimensioning.cmFromMeasureRaw(view2dindirect.gridResValue)
    );
    blueprint3d.floorplanner.view.draw();
  }

  var units = BP3DJS.Configuration.getStringValue(BP3DJS.configDimUnit);
  var view2dindirect = {
    snapValue: BP3DJS.Dimensioning.cmToMeasureRaw(
      BP3DJS.Configuration.getNumericValue(BP3DJS.snapTolerance)
    ),
    gridResValue: BP3DJS.Dimensioning.cmToMeasureRaw(
      BP3DJS.Configuration.getNumericValue(BP3DJS.gridSpacing)
    ),
  };

  f.removeFolder("2D Editor");

  var view2df = f.addFolder("2D Editor");
  view2df.add(BP3DJS.config, "snapToGrid").name("Snap To Grid");
  view2df
    .add(view2dindirect, "snapValue", 0.1)
    .name(`Snap Every(${units})`)
    .onChange(onChangeSnapResolution);
  view2df
    .add(view2dindirect, "gridResValue", 0.1)
    .name(`Grid Resolution(${units})`)
    .onChange(onChangeGridResolution);
  view2df
    .add(BP3DJS.config, "scale", 0.25, 5)
    .step(0.25)
    .onChange(() => {
      //	view2df.add(BP3DJS.config, 'scale', 1.0, 10, ).step(0.25).onChange(()=>{
      blueprint3d.floorplanner.zoom();
      //		blueprint3d.floorplanner.view.zoom();
      blueprint3d.floorplanner.view.draw();
    });

  var wallf = view2df.addFolder("Wall Measurements");
  wallf.add(BP3DJS.wallInformation, "exterior").name("Exterior");
  wallf.add(BP3DJS.wallInformation, "interior").name("Interior");
  wallf.add(BP3DJS.wallInformation, "midline").name("Midline");
  wallf.add(BP3DJS.wallInformation, "labels").name("Labels");
  wallf.add(BP3DJS.wallInformation, "exteriorlabel").name("Label for Exterior");
  wallf.add(BP3DJS.wallInformation, "interiorlabel").name("Label for Interior");
  wallf.add(BP3DJS.wallInformation, "midlinelabel").name("Label for Midline");

  var carbonPropsFolder = getCarbonSheetPropertiesFolder(
    view2df,
    floorplanner.carbonSheet,
    global
  );

  view2df.open();
  return view2df;
}

function getGlobalPropertiesFolder(gui, global, floorplanner) {
  var f = gui.addFolder("Interface & Configuration");

  var unitsf = f.addFolder("Units");
  var ficontrol = unitsf
    .add(global.units, "a")
    .name("Feets'' Inches'")
    .onChange(function () {
      global.setUnit("a");
    });
  var icontrol = unitsf
    .add(global.units, "b")
    .name("Inches'")
    .onChange(function () {
      global.setUnit("b");
    });
  var ccontrol = unitsf
    .add(global.units, "c")
    .name("Cm")
    .onChange(function () {
      global.setUnit("c");
    });
  var mmcontrol = unitsf
    .add(global.units, "d")
    .name("mm")
    .onChange(function () {
      global.setUnit("d");
    });
  var mcontrol = unitsf
    .add(global.units, "e")
    .name("m")
    .onChange(function () {
      global.setUnit("e");
    });
  global.setGUIControllers([
    ficontrol,
    icontrol,
    ccontrol,
    mmcontrol,
    mcontrol,
  ]);

  //	BP3DJS.Dimensioning.cmFromMeasureRaw(scope.x);
  //	BP3DJS.Dimensioning.cmToMeasureRaw(scope.x);

  f.open();
  return f;
}
 function getQueryParam(param) {
   const urlParams = new URLSearchParams(window.location.search);
   return urlParams.get(param);
 }
function getCarbonSheetPropertiesFolder(gui, carbonsheet, globalproperties) {
  // $("#carbonsheet").show();
  console.log(carbonsheet);
  $(".widthValue").text(carbonsheet.width);
  $("#ImageWidth").on("input", function () {
    $(".widthValue").text(carbonsheet.width);
    carbonsheet.width = Number($("#ImageWidth").val());
  });
  $(".HeightValue").text(carbonsheet.height);
  $("#Imageheight").on("input", function () {
    $(".HeightValue").text(carbonsheet.height);
    carbonsheet.height = Number($("#Imageheight").val());
  });
  if (carbonsheet.maintainProportion) {
    $("#maintain").attr("checked", "checked");
  } else {
    $("#maintain").attr("checked", "unchecked");
  }
  $("#maintain").on("change", function () {
    if ($(this).is(":checked")) {
      carbonsheet.maintainProportion = false;
      $("#textInput").prop("disabled", false);
    } else {
      carbonsheet.maintainProportion = true;
      $("#textInput").prop("disabled", true);
    }
  });
     
  const urlNumber =Number(getQueryParam("image"));

  console.log(urlNumber)
  switch (urlNumber) {
  case 0:
    carbonsheet.url = 'https://dl.dropboxusercontent.com/scl/fi/4hkkk7ruy4soveiupep7h/14.03.2024-EPSON-BLR-GODREJ-CENTER-OPTION-2-1.jpg?rlkey=4893wp1jppq33f5601k1e65xm&st=y0dnru5b&dl=0';
    break;
  case 1:
    carbonsheet.url = 'https://dl.dropboxusercontent.com/scl/fi/vnvtv09064nrvmpz5i50l/fp-comparison.webp?rlkey=6fwamo1x6n6yagacb6jyvw6hu&st=iol79hby&dl=0';
    break;
  case 2:
    carbonsheet.url = 'https://dl.dropboxusercontent.com/';
    break;
  case 3:
    carbonsheet.url = 'https://dl.dropboxusercontent.com/';
    break;
  case 4:
    carbonsheet.url = 'https://dl.dropboxusercontent.com/';
    break;
  case 5:
    carbonsheet.url = 'https://dl.dropboxusercontent.com/';
    break;
  case 6:
    carbonsheet.url = 'https://dl.dropboxusercontent.com/';
    break;
  default:
    carbonsheet.url = '';
}

  
  var f = gui.addFolder("Carbon Sheet");
  var url = f.add(carbonsheet, "url").name("Url");
  var width = f
    .add(carbonsheet, "width")
    .name("Real Width")
    .max(1000.0)
    .step(0.01);
  var height = f
    .add(carbonsheet, "height")
    .name("Real Height")
    .max(1000.0)
    .step(0.01);
  var proportion = f
    .add(carbonsheet, "maintainProportion")
    .name("Maintain Proportion");
  var x = f.add(carbonsheet, "x").name("Move in X");
  var y = f.add(carbonsheet, "y").name("Move in Y");

  var ax = f.add(carbonsheet, "anchorX").name("Anchor X");
  var ay = f.add(carbonsheet, "anchorY").name("Anchor Y");
  var transparency = f
    .add(carbonsheet, "transparency")
    .name("Transparency")
    .min(0)
    .max(1.0)
    .step(0.05);
  carbonsheet.addEventListener(BP3DJS.EVENT_UPDATED, function () {
    url.updateDisplay();
    width.updateDisplay();
    height.updateDisplay();
    x.updateDisplay();
    y.updateDisplay();
    ax.updateDisplay();
    ay.updateDisplay();
    transparency.updateDisplay(width);
  });

  globalproperties.guiControllers.push(width);
  globalproperties.guiControllers.push(height);
  return f;
}

function getItemPropertiesFolder(gui, anItem) {
  var f = gui.addFolder("Current Item (3D)");
  var inamecontrol = f.add(anItem, "name");
  var wcontrol = f.add(anItem, "width", 0.1, 1000.1).step(0.1);
  var hcontrol = f.add(anItem, "height", 0.1, 1000.1).step(0.1);
  var dcontrol = f.add(anItem, "depth", 0.1, 1000.1).step(0.1);
  var pcontrol = f.add(anItem, "proportionalsize").name("Maintain Size Ratio");
  var lockcontrol = f.add(anItem, "fixed").name("Locked in place");
  var deleteItemControl = f.add(anItem, "deleteItem").name("Delete Item");

  function changed() {
    anItem.dimensionsChanged();
  }

  function lockChanged() {
    anItem.lockFlagChanged();
  }

  function proportionFlagChanged() {
    anItem.proportionFlagChange();
  }

  wcontrol.onChange(changed);
  hcontrol.onChange(changed);
  dcontrol.onChange(changed);
  pcontrol.onChange(proportionFlagChanged);
  lockcontrol.onChange(lockChanged);

  anItem.setGUIControllers([
    inamecontrol,
    wcontrol,
    hcontrol,
    dcontrol,
    pcontrol,
    lockcontrol,
    deleteItemControl,
  ]);

  return f;
}

function getWallAndFloorPropertiesFolder(gui, aWall) {
  $("#threeDwallControls").show();
  $("#wall").on("change", () => {
    aWall.setWallMatriealName($("#wall").val());
    console.log(aWall);
    aWall.wchanged();
  });
  $("#wall").val("0");
  $("#floor").on("change", () => {
    aWall.floormaterialname = Number($("#floor").val());
    aWall.fchanged();
  });
  $("#wall").val("0");
  var f = gui.addFolder("Wall and Floor (3D)");
  var wcontrol = f
    .add(aWall, "wallmaterialname", {
      Grey: 0,
      Yellow: 1,
      Checker: 2,
      Marble: 3,
      Bricks: 4,
    })
    .name("Wall");
  var fcontrol = f
    .add(aWall, "floormaterialname", { "Fine Wood": 5, "Hard Wood": 6 })
    .name("Floor");
  var multicontrol = f.add(aWall, "forAllWalls").name("All Walls In Room");
  function wchanged() {
    aWall.wchanged();
  }

  function fchanged() {
    aWall.fchanged();
  }

  wcontrol.onChange(wchanged);
  fcontrol.onChange(fchanged);
  return f;
}

function datGUI(three, floorplanner) {
  gui = new dat.GUI();
  aCameraRange = new CameraProperties();
  aCameraRange.three = three;
  aGlobal = new GlobalProperties();
  globalPropFolder = getGlobalPropertiesFolder(gui, aGlobal, floorplanner);

  f3d = globalPropFolder.addFolder("3D Editor");
  cameraPropFolder = getCameraRangePropertiesFolder(f3d, aCameraRange);

  var view2df = construct2dInterfaceFolder(
    globalPropFolder,
    aGlobal,
    floorplanner
  );
  view2df.open();

  selectionsFolder = gui.addFolder("Selections");
}
async function setFloorPlan() {
   const urlSearchParams = new URLSearchParams(window.location.search);
    if (urlSearchParams.has("fp")) {
      // Do something with the value
      const value = urlSearchParams.get("fp");
      const data = await getFileData(value);
      blueprint3d.model.loadSerialized(data);
    }
}
 const getFileData = async (url) => {
   try {
     const response = await fetch(url);
     if (!response.ok) {
       throw new Error(`Error fetching file: ${response.status}`);
     }
     const data = await response.text(); // Adjust for data type (JSON, etc.)
     return data;
   } catch (error) {
     console.error("Error:", error);
   }
 };
$(document).ready( function () {
   console.log("hi ");
  // setFloorPlan();
  dat.GUI.prototype.removeFolder = function (name) {
    var folder = this.__folders[name];
    if (!folder) {
      return;
    }
    folder.close();
    this.__ul.removeChild(folder.domElement.parentNode);
    delete this.__folders[name];
    this.onResize();
  };
  // main setup
  var opts = {
    floorplannerElement: "floorplanner-canvas",
    threeElement: "#viewer",
    threeCanvasElement: "three-canvas",
    textureDir: "models/textures/",
    widget: false,
  };
  blueprint3d = new BP3DJS.BlueprintJS(opts);
  var viewerFloorplanner = new ViewerFloorplanner(blueprint3d);

  blueprint3d.model.addEventListener(BP3DJS.EVENT_LOADED, function () {
    //("LOAD SERIALIZED JSON ::: ");
  });

  mainControls(blueprint3d);
  blueprint3d.model.loadSerialized(myhome);

  addBlueprintListeners(blueprint3d);
  datGUI(blueprint3d.three, blueprint3d.floorplanner);
  blueprint3d.three.stopSpin();
  //	gui.closed = true;

  $("#showAddItems").hide();
  $("#viewcontrols").hide();

  $(".card").flip({ trigger: "manual", axis: "x" });
  $("#showFloorPlan").click(function () {
    $(".card").flip(false);
    $(this).addClass("active");
    $("#showDesign").removeClass("active");
    $("#showFirstPerson").removeClass("active");
    $("#showAddItems").hide();
    $("#viewcontrols").hide();
    //		gui.closed = true;
    blueprint3d.three.pauseTheRendering(true);
    blueprint3d.three.getController().setSelectedObject(null);
  });

  $("#showDesign").click(function () {
    blueprint3d.model.floorplan.update();
    $(".card").flip(true);
    //		gui.closed = false;
    $(this).addClass("active");
    $("#showFloorPlan").removeClass("active");
    $("#showFirstPerson").removeClass("active");

    $("#showAddItems").show();
    $("#viewcontrols").show();

    blueprint3d.three.pauseTheRendering(false);
    blueprint3d.three.switchFPSMode(false);
    $(".container").hide();
    $("#getkeyValue").hide();
    $(".wallDetails").hide();
    $("#carbonsheet").hide();
  });
  $("#showFirstPerson").click(function () {
    blueprint3d.model.floorplan.update();
    $(".card").flip(true);
    //		gui.closed = true;
    $(this).addClass("active");
    $("#showFloorPlan").removeClass("active");
    $("#showDesign").removeClass("active");

    $("#showAddItems").hide();
    $("#viewcontrols").hide();

    blueprint3d.three.pauseTheRendering(false);
    blueprint3d.three.switchFPSMode(true);
  });

  $("#showSwitchCameraMode").click(function () {
    $(this).toggleClass("active");
    blueprint3d.three.switchOrthographicMode($(this).hasClass("active"));
  });

  $("#showSwitchWireframeMode").click(function () {
    $(this).toggleClass("wireframe-active");
    blueprint3d.three.switchWireframe($(this).hasClass("wireframe-active"));
  });

  $("#topview, #isometryview, #frontview, #leftview, #rightview").click(
    function () {
      blueprint3d.three.switchView($(this).attr("id"));
    }
  );

  $("#add-items")
    .find(".add-item")
    .mousedown(function (e) {
      var modelUrl = $(this).attr("model-url");
      var itemType = parseInt($(this).attr("model-type"));
      var itemFormat = $(this).attr("model-format");
      var metadata = {
        itemName: $(this).attr("model-name"),
        resizable: true,
        modelUrl: modelUrl,
        itemType: itemType,
        format: itemFormat,
      };
      //("ITEM TYPE ::: ", itemType);
      if ([2, 3, 7, 9].indexOf(metadata.itemType) != -1 && aWall.currentWall) {
        var placeAt = aWall.currentWall.center.clone();
        blueprint3d.model.scene.addItem(
          itemType,
          modelUrl,
          metadata,
          null,
          null,
          null,
          false,
          { position: placeAt, edge: aWall.currentWall }
        );
      } else if (aWall.currentFloor) {
        var placeAt = aWall.currentFloor.center.clone();
        blueprint3d.model.scene.addItem(
          itemType,
          modelUrl,
          metadata,
          null,
          null,
          null,
          false,
          { position: placeAt }
        );
      } else {
        blueprint3d.model.scene.addItem(itemType, modelUrl, metadata);
      }
    });

  $("#getVertices").click(async () => {
    const edgedata = blueprint3d.three.getvertices().edges;
    const chunkedArray = [];
    for (let i = 0; i < edgedata.length; i += 1) {
      const [chunk] = edgedata[i].getBottomPhase();
      //(chunk);
      chunkedArray.push(chunk);
    }
    console.log(chunkedArray);
    const jsonString = JSON.stringify(chunkedArray, null, 2);

    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: "application/json" });

    // Create a temporary anchor element
    const a = document.createElement("a");

    // Create a URL for the Blob and set it as the href attribute
    const url = URL.createObjectURL(blob);
    a.href = url;

    // Set the download attribute with the desired file name
    a.download = "vertices.json";

    // Programmatically click the anchor to trigger the download
    a.click();

    // Clean up by revoking the object URL
    URL.revokeObjectURL(url);
  });
  $("#uploadToGraph").click(async () => {
    const floorplan = blueprint3d.model.exportSerialized();
    const edgedata = blueprint3d.three.getvertices().edges;
    const chunkedArray = [];
    for (let i = 0; i < edgedata.length; i += 1) {
      const [chunk] = edgedata[i].getBottomPhase();
      chunkedArray.push(chunk);
    }
    const data = JSON.parse(floorplan);
    //(data);
    data.carbonSheet = "";
    data.floorplan.carbonSheet = "";
    data["vertices"] = chunkedArray;
    //(data);
    try {
      const response = await fetch("http://localhost:3000/api/architect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      //(json);
    } catch (err) {
      //(err);
      return;
    }
  });

  // 	function jsonToCsv(jsonData) {
  //     // Extract column headers from the first object
  //     const headers = Object.keys(jsonData[0]);

  //     // Create CSV content
  //     let csvContent = headers.join(",") + "\n";
  //     jsonData.forEach((row) => {
  //       const values = headers.map((header) => {
  //         const escapedValue = ("" + row[header]).replace(/"/g, '\\"');
  //         return `"${escapedValue}"`;
  //       });
  //       csvContent += values.join(",") + "\n";
  //     });

  //     return csvContent;
  //   }
  function setEdgeVertices(data) {
    const floorplan = data;
    const edgedata = blueprint3d.three.getvertices().edges;
    if (edgedata % 4 == 0) {
      const chunkedArray = [];
      for (let i = 0; i < edgedata.length; i += 1) {
        const chunk = edgedata[i];
        chunkedArray.push(chunk);
      }
      floorplan["vertices"] = chunkedArray;
    }
    //(floorplan);
    return floorplan;
  }
  $("#downloadReport").click(async () => {
    // API endpoint URL
    const apiUrl = "http://localhost:3000/api/getgraph";
    // Make a fetch request to the API
    fetch(apiUrl)
      .then((response) => {
        // Check if the request was successful
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Return response data as JSON
        return response.json();
      })
      .then((data) => {
        //(data);
        // Once data is received, convert it to CSV format
        // const csvData = jsonToCsv(data);
        // const blob = new Blob([csvData], { type: "text/csv" });
        const jsonData = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "graphReport.json";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("Error fetching data:", error);
      });
  });

  function jsonToCsv(data) {
    // Function to flatten nested objects
    function flattenObject(obj, parentKey = "") {
      return Object.keys(obj).reduce((acc, key) => {
        const fullKey = parentKey ? `${parentKey}_${key}` : key;
        if (
          typeof obj[key] === "object" &&
          obj[key] !== null &&
          !Array.isArray(obj[key])
        ) {
          Object.assign(acc, flattenObject(obj[key], fullKey));
        } else if (Array.isArray(obj[key])) {
          obj[key].forEach((item, index) => {
            Object.assign(acc, flattenObject(item, `${fullKey}_${index + 1}`));
          });
        } else {
          acc[fullKey] = obj[key];
        }
        return acc;
      }, {});
    }

    // Flatten each object in the data array
    const flattenedData = data.map((obj) => flattenObject(obj));

    // Extract headers from the first object
    const headers = Object.keys(flattenedData[0]);

    // Create CSV content
    let csvContent = headers.join(",") + "\n";

    // Convert each object to a CSV row
    flattenedData.forEach((obj) => {
      const row = headers.map((header) => {
        // Escape commas in values and wrap in double quotes
        let value = obj[header];
        if (typeof value === "string" && value.includes(",")) {
          value = `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      });
      csvContent += row.join(",") + "\n";
    });
    //(csvContent);
    return csvContent;
  }
});
