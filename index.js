const w = 1080;
const h = 1920;

///////////////////////////////////setup env///////////////////////////////////
const { JSDOM } = require("jsdom");

window = new JSDOM("<html><body></body></html>", {
   resources: 'usable'
}).window;
window.innerWidth = w;
window.innerHeight = h;
document = window.document;
navigator = window.navigator;
HTMLImageElement = window.HTMLImageElement
HTMLCanvasElement = window.HTMLCanvasElement

// a fake canvas is enough
canvas = new Object();//new (require("canvas"))(w, h);
gl = require('gl')(w, h, { preserveDrawingBuffer: true, antialias: true });
canvas.getContext = function(){ return gl };
canvas.addEventListener = function(a){ return null },
canvas.getExtension = function(a){ return null };
canvas.style = {
  canvas: {
    width: '100%',
    height: '100%'
  }
}
benchMarkTimer = void 0;
///////////////////////////////////setup env///////////////////////////////////

const game = new (require("./build/public/lib/game").default)(null);
const sim = new (require("./build/public/lib/sim").default)(game);

// override since "data: HTMLCanvasElement" should be an array
gl.texImage2D = function(origFn) {
  return function(bind, mip, internalFormat) {
    var width;
    var height;
    var border;
    var format;
    var type;
    var data;
    // console.log(arguments)
    if (arguments.length === 9) {
      // console.log("load texture 9: ", arguments)
     // sig1: bind, mip, internalFormat, width, height, border, format, type, data
     width = arguments[3];
     height = arguments[4];
     border = arguments[5];
     format = arguments[6];
     type = arguments[7];
     data = arguments[8];
    } else if (arguments.length === 6) {
      // console.log("load texture 6: ")
      // sig2: bind, mip, internalFormat, format, type, image
      var img = arguments[5];
      var ctx;
      if (img instanceof HTMLCanvasElement) {
        // console.log("load texture 6 canvas: ")
        ctx = img.getContext('2d');
      }
      else if (img instanceof HTMLImageElement) {
        // console.log("load texture 6 image: ")
        // draw on canvas and then export as ImageData
        if (typeof gl.texImage2D.converter_canvas === "undefined")
          gl.texImage2D.converter_canvas = document.createElement("canvas");
        var converter_canvas = gl.texImage2D.converter_canvas;
        ctx = converter_canvas.getContext('2d');
        console.log(img)
        ctx.drawImage(img, 0, 0 );
        img = converter_canvas;
      }
      else
        throw "Bad \"data\" type";
      width = img.width;
      height = img.height;
      data = ctx.getImageData(0, 0, width, height).data;
      border = 0;
      format = arguments[3];
      type = arguments[4];
    } else {
     throw "Bad args to texImage2D";
    }
    origFn(bind, mip, internalFormat, width, height,
                 border, format, type, data);
  };
}(gl.texImage2D);

const HTTP = require('http');
const URL = require('url');
const port = 3000;

// handles request on different op types and parameters
const requestHandler = (req, res) => {
  var q = URL.parse(req.url, true).query;
  console.log(q)
  switch (q.op) {
    case "replay":
      var seed = +q.sd;
      seed = seed === NaN ? Date.now() : seed;
      sim.replay(seed);
      break;
    case "jump":
      var time = +q.jt;
      time = time === NaN ? 0 : time;
      sim.jump(time);
      break;
    case "get":
      break;
    default:
      res.writeHead(404, {"Content-Type": "text/plain"});
      res.write("Bad op!\nUsage: ?op=[replay/jump/get]&[sd/jt/]=[seed/jumpTime/]\n");
      res.end();
      return;
  }
  res.writeHead(200, {'Content-Type': 'application/json'});
  // res.write(JSON.stringify({}));
  //   res.end();
  benchMarkTimer = Date.now();
  console.log("get img start: ", benchMarkTimer);
  // rendering completed, respond game state
  sim.getState((state) => {
    res.write(JSON.stringify(state));
    res.end();
    var tmp = Date.now();
    console.log("sent: ", tmp, tmp - benchMarkTimer), benchMarkTimer = tmp;
  });
}

// setting up an http server
HTTP.createServer(requestHandler).listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
