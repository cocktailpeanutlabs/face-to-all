module.exports = {
  run: [{
    method: "input",
    params: {
      title: "CivitAI API Key",
      description: "Get your CivitAI API key from the bottom of the account settings page (https://civitai.com/user/account) and paste here",
      type: "modal",
      form: [{
        type: "text",
        key: "key",
        placeholder: "Your CivitAI API Key",
      }]
    }
  }, {
    method: "fs.write",
    params: {
      path: "civitai.txt",
      text: "{{input.key}}"
    }
  }]    
}
