const config = require("./config.js")
const pre = require("./pre.js")
module.exports = async (kernel) => {
  let script = {
    run: [{
      method: "shell.run",
      params: {
        message: [
          "git clone https://huggingface.co/spaces/cocktailpeanut/face-to-all-2 app",
        ]
      }
    }, {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "pip install {{gpu === 'nvidia' ? 'onnxruntime-gpu' : 'onnxruntime'}}",
          "pip install mediapipe",
          "pip install -r requirements.txt",
        ],
      }
    }, {
      method: "shell.run",
      params: {
        path: "app/data",
        message: "mkdir models",
      }
    }, {
      method: "shell.run",
      params: {
        path: "app/data/models",
        message: [
          "git lfs install",
          "git clone --depth 1 https://huggingface.co/cocktailpeanut/antelopev2"
        ]
      }
//    }, {
//      method: "fs.share",
//      params: {
//        venv: "app/env"
//      }
    }, {
      method: "notify",
      params: {
        html: "Click the 'start' tab to get started!"
      }
    }]
  }
  let pre_command = pre(config, kernel)
  if (pre_command) {
    script.run[1].params.message = [pre_command].concat(script.run[1].params.message)
  }
  return script
}
