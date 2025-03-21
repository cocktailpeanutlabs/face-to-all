module.exports = (config, kernel) => {
  const x = {
    "win32": {
      "nvidia": `pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 ${config.xformers ? 'xformers' : ''} --index-url https://download.pytorch.org/whl/cu124`,
      "amd": "pip install torch-directml torchvision numpy==1.26.4",
      "cpu": "pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 --index-url https://download.pytorch.org/whl/cpu"
    },
    "darwin": "pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 --index-url https://download.pytorch.org/whl/cpu",
    "linux": {
      "nvidia": `pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 ${config.xformers ? 'xformers' : ''} --index-url https://download.pytorch.org/whl/cu124`,
      "amd": "pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 --index-url https://download.pytorch.org/whl/rocm6.0",
      "cpu": "pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 --index-url https://download.pytorch.org/whl/cpu"
    }
  }
  if (config.torch) {
    if (kernel.platform === "darwin") {
      return x[kernel.platform]
    } else {
      console.log("kernel.gpu=", kernel.gpu)
      console.log("kernel.gpu_model=", kernel.gpu_model)
      if (kernel.gpu_model) {
        console.log("50 series?", / 50.+/.test(kernel.gpu_model))
      }
      if (kernel.gpu === 'nvidia' && kernel.gpu_model && / 50.+/.test(kernel.gpu_model)) {
        return "pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu128"
      } else {
        return x[kernel.platform][kernel.gpu]
      }
    }
  }
}
