// add items to the "Add Items" tab

$(document).ready(function() {
  var items = [
    {
      name: "Closed Door",
      image:
        "models/thumbnails/thumbnail_Screen_Shot_2014-10-27_at_8.04.12_PM.png",
      model: "models/js/closed-door28x80_baked.js",
      type: "7",
    },
    {
      name: "Open Door",
      image:
        "models/thumbnails/thumbnail_Screen_Shot_2014-10-27_at_8.22.46_PM.png",
      model: "models/js/open_door.js",
      type: "7",
    },
    {
      name: "Window",
      image: "models/thumbnails/thumbnail_window.png",
      model: "models/js/whitewindow.js",
      type: "3",
    },
    {
      name: "Chair",
      image: "models/thumbnails/thumbnail_Church-Chair-oak-white_1024x1024.jpg",
      model: "models/js/gus-churchchair-whiteoak.js",
      type: "1",
    },
    {
      name: "Red Chair",
      image: "models/thumbnails/thumbnail_tn-orange.png",
      model: "models/js/ik-ekero-orange_baked.js",
      type: "1",
    },
    {
      name: "Blue Chair",
      image: "models/thumbnails/thumbnail_ekero-blue3.png",
      model: "models/js/ik-ekero-blue_baked.js",
      type: "1",
    },
    {
      name: "Dresser - Dark Wood",
      image: "models/thumbnails/thumbnail_matera_dresser_5.png",
      model: "models/js/DWR_MATERA_DRESSER2.js",
      type: "1",
    },
    {
      name: "Dresser - White",
      image: "models/thumbnails/thumbnail_img25o.jpg",
      model: "models/js/we-narrow6white_baked.js",
      type: "1",
    },
    {
      name: "Bedside table - Shale",
      image: "models/thumbnails/thumbnail_Blu-Dot-Shale-Bedside-Table.jpg",
      model: "models/js/bd-shalebedside-smoke_baked.js",
      type: "1",
    },
    {
      name: "Bedside table - White",
      image: "models/thumbnails/thumbnail_arch-white-oval-nightstand.jpg",
      model: "models/js/cb-archnight-white_baked.js",
      type: "1",
    },
    {
      name: "Wardrobe - White",
      image: "models/thumbnails/thumbnail_TN-ikea-kvikine.png",
      model: "models/js/ik-kivine_baked.js",
      type: "1",
    },
    {
      name: "Full Bed",
      image:
        "models/thumbnails/thumbnail_nordli-bed-frame__0159270_PE315708_S4.JPG",
      model: "models/js/ik_nordli_full.js",
      type: "1",
    },
    {
      name: "Bookshelf",
      image: "models/thumbnails/thumbnail_kendall-walnut-bookcase.jpg",
      model: "models/js/cb-kendallbookcasewalnut_baked.js",
      type: "1",
    },
    {
      name: "Media Console - White",
      image:
        "models/thumbnails/thumbnail_clapboard-white-60-media-console-1.jpg",
      model: "models/js/cb-clapboard_baked.js",
      type: "9",
    },
    {
      name: "Media Console - Black",
      image: "models/thumbnails/thumbnail_moore-60-media-console-1.jpg",
      model: "models/js/cb-moore_baked.js",
      type: "9",
    },
    {
      name: "Sectional - Olive",
      image: "models/thumbnails/thumbnail_img21o.jpg",
      model: "models/js/we-crosby2piece-greenbaked.js",
      type: "1",
    },
    {
      name: "Sofa - Grey",
      image: "models/thumbnails/thumbnail_rochelle-sofa-3.jpg",
      model: "models/js/cb-rochelle-gray_baked.js",
      type: "1",
    },
    {
      name: "Wooden Trunk",
      image: "models/thumbnails/thumbnail_teca-storage-trunk.jpg",
      model: "models/js/cb-tecs_baked.js",
      type: "1",
    },
    {
      name: "Floor Lamp",
      image: "models/thumbnails/thumbnail_ore-white.png",
      model: "models/js/ore-3legged-white_baked.js",
      type: "1",
    },
    {
      name: "Coffee Table - Wood",
      image:
        "models/thumbnails/thumbnail_stockholm-coffee-table__0181245_PE332924_S4.JPG",
      model: "models/js/ik-stockholmcoffee-brown.js",
      type: "1",
    },
    {
      name: "Side Table",
      image:
        "models/thumbnails/thumbnail_Screen_Shot_2014-02-21_at_1.24.58_PM.png",
      model: "models/js/GUSossingtonendtable.js",
      type: "1",
    },
    {
      name: "Dining Table",
      image: "models/thumbnails/thumbnail_scholar-dining-table.jpg",
      model: "models/js/cb-scholartable_baked.js",
      type: "1",
    },
    {
      name: "Dining table",
      image:
        "models/thumbnails/thumbnail_Screen_Shot_2014-01-28_at_6.49.33_PM.png",
      model: "models/js/BlakeAvenuejoshuatreecheftable.js",
      type: "1",
    },
    {
      name: "Blue Rug",
      image: "models/thumbnails/thumbnail_cb-blue-block60x96.png",
      model: "models/js/cb-blue-block-60x96.js",
      type: "8",
    },
    {
      name: "NYC Poster",
      image: "models/thumbnails/thumbnail_nyc2.jpg",
      model: "models/js/nyc-poster2.js",
      type: "2",
    },
    {
      name: "Simple Cabinet",
      image: "models/thumbnails/thumbnail_cabinet.png",
      model: "models/js/cabinet.json",
      type: "1",
    },
    {
      name: "Duck",
      image: "models/thumbnails/thumbnail_duck.png",
      model: "models/js/Duck.gltf",
      type: "1",
      format: "gltf",
    },
    {
      name: "9139 MG BianCO White Marble 8 ft x 4 ft Maxx Gloss Marble Finish Laminate - 0.8 mm",
      image:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpiha1rjcObt21qlOP510RbaEeu_J3dvePLmMk7zE5Lr-cineYwTnP7Oi1oUr-1Xe-88sBN0jGJ7i6fQJhHRsXD5pHqxfKg2G0MA=w1366-h635",
      model: "models/js/wallItems/9139.js",
      type: "2",
      with: "4ft",
      length: "8ft",
    },
    {
      name: "42004 MT White Marble 8 ft x 4 ft Pattern Finish Merino Cal Plus Laminate - 0.8 mm",
      image:
        "https://dl.dropboxusercontent.com/scl/fi/eqj5413g29zd25h0kuw2t/42004-MT-White-Marble-8-ft-x-4-ft-Pattern-Finish-Merino-Cal-Plus-Laminate-0.8-mm-1.webp?rlkey=ao79h7z171gmktdsrw3exdbt3&st=xc9ipohb&dl=0",
      model: "models/js/wallItems/42004.js",
      type: "2",
      with: "4ft",
      length: "8ft",
    },
    {
      name: "	9138 MG Marine Black Marble 8 ft x 4 ft Maxx Gloss Marble Finish Laminate - 0.8 mm",
      image:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihZTL_BY08M6JpvZKpVmAWyGMRHVPJKXmi0r30UkKdIogao0WFLdf1RTUfWrMHSuYpiHyVgL-HLn1f2nAPLE6grUGK6dcmFcUH8=w1366-h635",
      model: "models/js/wallItems/9138.js",
      type: "2",
      with: "4ft",
      length: "8ft",
    },
    {
      name: "	PT 224 PR Ultra Marble Craft 8 ft x 4 ft Marble Finish Acrylic Laminate - 1.5 mm",
      image:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihYi56_8X2SCYPesJUXO2yaOYv_-SlxXl74TADAaQl7sIOXh3P1VdRWRyPjrLUMw6KOj52AHiuWE6Oq9DFrDuOoiaOyDfg28D0A=w1366-h635",
      model: "models/js/wallItems/pt224.js",
      type: "2",
      with: "4ft",
      length: "8ft",
    },
    {
      name: "2923 Cloudy Stone 8 ft x 4 ft Gloss Of Marble Finish PVC Laminate - 1.25 mm",
      image:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihadwECS5QS3JPTSiUmylBra3Dv6jSb3PEf-CCUfo5QQk31u3kzXkVFl8lQXbQkvIV_HjeDG8VEiGqaUgWmESjZ1DnqynjoFVhs=w1366-h635-rw-v1",
      model: "models/js/wallItems/2923.js",
      type: "2",
      with: "4ft",
      length: "8ft",
    },
    {
      name: "991 SHG 3 Mica Hanger Misty White 8 ft x 4 ft Superlative High Gloss UV+ Finish Laminate - 1 mm",
      image:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbAgVNZupZ1xX6cOrK0qJimDw7BBJh2iTMjtkYGEPJzIfwyEoSc27E0LqoQW-LH216IMLKkJhqcngeLCD9HKA6VqIoycvCH9g=w1366-h635",
      model: "models/js/wallItems/991.js",
      type: "2",
      with: "4ft",
      length: "8ft",
    },
    {
      name: "WHITE MARBLE-3846 SI 8 ft x 4 ft Silk Tuff Finish 1mm Laminate",
      image:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbZboKNYDUnAYVgCGW1_jepS24Yc3CoDIV2rxvH9G36B1CVo9OeyZbfFPm-m28wE85_U35we43h07Ooi8-HywgtLWvqmnW-yqw=w1366-h635-rw-v1",
      model: "models/js/wallItems/3846.js",
      type: "2",
      with: "4ft",
      length: "8ft",
    },
    {
      name: "SD 4018 HG 8 ft x 4 ft Superio Finish Colour Core PVC Laminate - 1.25 mm",
      image:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihYrhf-P6TmMX7TfcVVtIC7It-lHkic8AoI-9F8Rk1_Q6bpWMmARwsqF8oqoaXCru4AvqPycnfBpKKhYmqC7FDtZrg-qzi7F0VY=w1366-h635",
      model: "models/js/wallItems/4018.js",
      type: "2",
      with: "4ft",
      length: "8ft",
    },
    {
      name: "UL 6125 Eco Marble 8 ft x 4 ft Ultra Matt Finish The One MM Laminate - 1 mm",
      image:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihb3Jbmku6cEQjHNzwRZn0xGA7c9PkxhSjqIpoi-nCRsygOPYTFzgOH_7ZTIC0UNL1efDm92MbMeOQAbdh8fymRtctn4qNbmnJ0=w1366-h635",
      model: "models/js/wallItems/6125.js",
      type: "2",
      with: "4ft",
      length: "8ft",
    },
    {
      name: "	2935 Arabescato Stone 8 ft x 4 ft Gloss Of Marble Finish PVC Laminate - 1.25 mm",
      image:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihZmdTfhAC7JCA-ZooSmo92i2s6Va7qjzrydbkD1Lj9ZSfMJg0cV1RLMlEUQEuIF-62N2hAPafQ9-3AEfIoHPYz-52kUYoFT4Ps=w1366-h635",
      model: "models/js/wallItems/2935.js",
      type: "2",
      with: "4ft",
      length: "8ft",
    },
    {
      name: "5749 GL Italian Marble Natural 8 ft x 4 ft Abstract Gloss Finish Laminate - 0.8 mm",
      image:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihZehmR9zJeh_XOs3BDlvDScl4v7jvVQ2amQP0wKeuYLtqf2gfazcqhZ-_o9JAXFy9Q0jqfH8gbskndd2l9eU4N1JDYc4IORbKc=w1366-h635",
      model: "models/js/wallItems/5749.js",
      type: "2",
      with: "4ft",
      length: "8ft",
    },
    {
      name: "	2939 Gold Caspio Stone 8 ft x 4 ft Gloss Of Marble Finish PVC Laminate - 1.25 mm",
      image:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihaukl194PQ8C74z4UyQ9d5C_m1duUkHKz2LQIZ255gKKFsGfijsw1ashBQHW2yzRgD8qsgpPaqjQRiG_x3nUH0aW5ZRC8FFpGY=w1366-h635",
      model: "models/js/wallItems/2939.js",
      type: "2",
      with: "4ft",
      length: "8ft",
    },
    {
      name: "	40013 New Riviea Marble 8 ft x 4 ft Hi Gloss Finish Laminate - 1 mm",
      image:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbcULYezg7usOPG02NgDZcq_WkfCB0cuL9S-xucmmYM8HX4cA7n8dmSOXr5lOC55MAy4Ys2ii0C0TuwwikES68s6G_qcyf9K0I=w1366-h635-rw-v1",
      model: "models/js/wallItems/40013.js",
      type: "2",
      with: "4ft",
      length: "8ft",
    },
    {
      name: "40003 Merinolam New Eon Shire Marble 8 ft x 4 ft Suede Finish Laminate - 1 mm",
      image:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihZEIZ71foK9lBwqGcrHUxcPi7NNL0OyxNWrYX9x5ukv4QLjdkUzpWDAg4qgUPGg2X5UQMkbSYKLhJ7AZC9ntyt2j7dastlQmJI=w1366-h635-rw-v1",
      model: "models/js/wallItems/40003.js",
      type: "2",
      with: "4ft",
      length: "8ft",
    },
    {
      name: "5750 GL Italian Marble Brown 8 ft x 4 ft Abstract Gloss Finish Laminate - 0.8 mm",
      image:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihZMpCHH2RfnhSg00kjIQfJ3hA8OxMW1thTIwwgFNJWjP0SjwTJBKOH_HLUiYE2Sk99xjY1OY-VPX2O90pcdFnOLmlYyAoRP2zU=w1366-h635",
      model: "models/js/wallItems/5750.js",
      type: "2",
      with: "4ft",
      length: "8ft",
    },
    {
      name: "2924 Statuario Venato 8 ft x 4 ft Gloss Of Marble Finish PVC Laminate - 1.25 mm",
      image:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihaSaGd76lVQC_saCO8PH2bfyfXnmQSXN-BnOiJqFCpfvk7sIvKXbxUs1Gse5j7Gq8J7JPy2XrNV4AKoSkhNShog19qZ4NVCHz4=w1366-h635",
      model: "models/js/wallItems/2924.js",
      type: "2",
      with: "4ft",
      length: "8ft",
    },
    {
      name: "ELM 661 50 cm x 50 cm Carpet Tile 5 mm",
      image:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihaVBNvWD3H3q7en8RcMNiLCRDyG5NwZTlsTtEXkJcVwpoGPrUxFqbC0ggXFWQJ3O2K0xfWHGfwUNt4zzTp44Cwlp8El0YKnkg=w1366-h635",
      model: "models/js/onFloorItems/661.js",
      type: "8",
    },
    {
      name: "DT 605 Black Orchid 500x500 mm Carpet Tile",
      image:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbJ9ZYVxgGE4eGa4b2trNzkZ9Pk0ladhdiqfO6xRJT8NHqpF4vFSzLx161Dh_vr0su4Vamn5GqF31SVe3QiNRD2tj78Rja4qA=w1366-h635",
      model: "models/js/onFloorItems/605.js",
      type: "8",
    },
    {
      name: "FL013 Prima Earthern Apple 1202x192 mm Laminate Wood Floor - 8 mm",
      image:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihYIE5oN9pAmdsSLxyaNSj0ozsNLcpUwEQ_gunRhvKALeJpWIMbXoO-31H9ZD7khxvckXPsK6sEXqaqgldoSrD5Hz_Nnc23Qyw=w1366-h635",
      model: "models/js/onFloorItems/fl013.js",
      type: "8",
    },
    {
      name: "SOL Laminate 1019 1218x198 mm Laminate Wood Floor - 8 mm",
      image:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihZug-Otx5FIYLv98b4DrULrlXquheZidAwBGjcRryWsWKvC50ctnvgHRYvTV8fBT6nrOIcfrgrli9UoukgsRz1Zv6WfHNZy3UU=w1366-h635-rw-v1",
      model: "models/js/onFloorItems/1019.js",
      type: "8",
    },
    /*     
   {
      "name" : "",
      "image" : "",
      "model" : "",
      "type" : "1"
    }, 
    */
  ];


  var modelTypesNum = ["1","2","3","7","8","9"];
  var modelTypesIds = ["floor-items", "wall-items", "in-wall-items", "in-wall-floor-items", "on-floor-items", "wall-floor-items"];
  var itemsDiv = $("#items-wrapper");
  for (var i = 0; i < items.length; i++) 
  {
	var item = items[i];
    itemsDiv = $("#"+modelTypesIds[modelTypesNum.indexOf(item.type)]+"-wrapper");
	var modelformat = (item.format) ?' model-format="'+item.format+'"' : "";
    var html = '<div class="col-sm-4">' + '<a class="thumbnail add-item"' +' model-name="'+ item.name +'"' +' model-url="' +item.model+'"' +' model-type="' +item.type+'"' + modelformat+'>'+'<img src="'+item.image +'" alt="Add Item"  data-dismiss="modal"> '+item.name +'</a></div>';
    itemsDiv.append(html);
  }
});
