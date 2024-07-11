const path = require('path')
module.exports = {
  version: "1.5",
  title: "face-to-all",
  description: "diffusers InstantID + ControlNet inspired by face-to-many from fofr (https://x.com/fofrAI) - a localized Version of https://huggingface.co/spaces/multimodalart/face-to-all",
  icon: "icon.png",
  menu: async (kernel) => {
    let installing = await kernel.running(__dirname, "install.js")
    let installed = await kernel.exists(__dirname, "app", "env")
    let running = await kernel.running(__dirname, "start.js")
    if (installing) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      if (running) {
        let local = kernel.memory.local[path.resolve(__dirname, "start.js")]
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url,
          }, {
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }, {
            icon: 'fa-solid fa-link',
            text: "CivitAI",
            href: "https://civitai.com",
            popout: true
          }, {
            icon: 'fa-solid fa-link',
            text: "HuggingFace",
            href: "https://huggingface.co",
            popout: true
          }]
        } else {
          return [{
            default: true,
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }, {
            icon: 'fa-solid fa-link',
            text: "CivitAI",
            href: "https://civitai.com",
            popout: true
          }, {
            icon: 'fa-solid fa-link',
            text: "HuggingFace",
            href: "https://huggingface.co",
            popout: true
          }]
        }
      } else {
        return [{
          default: true,
          icon: "fa-solid fa-power-off",
          text: "Start",
          href: "start.js",
        }, {
          icon: 'fa-solid fa-key',
          text: "Set CivitAI API Key",
          href: "civitai.js"
        }, {
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-regular fa-circle-xmark",
          text: "Reset",
          href: "reset.js",
        }]
      }
    } else {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }]
    }
  }
}
