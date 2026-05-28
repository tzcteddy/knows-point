# MAC配置

## homebrew 配置
### 安装
官网: [https://brew.sh/](https://brew.sh/)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 配置国内镜像源
清华镜像源[https://mirrors.tuna.tsinghua.edu.cn/](https://mirrors.tuna.tsinghua.edu.cn/)

```bash
# 指定 Homebrew 的元数据 API 接口域名。Homebrew 执行 brew search、brew info、brew install 等命令时，会先从这个地址获取所有软件包（公式 formula 和图形应用 cask）的名称、版本、依赖、下载地址等核心元数据。
export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"

# 指定 Homebrew 预编译二进制包（Bottle）的下载域名。Homebrew 优先下载预编译好的二进制包而非源码编译，能极大提升安装速度，这个地址就是所有二进制包的根下载路径。
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"

# 指定 Homebrew 主程序本身的 Git 仓库地址。执行 brew update 时，会从这个 Git 仓库拉取 Homebrew 主程序的最新代码
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"

# 指定 Homebrew 核心公式仓库（homebrew-core）的 Git 地址。homebrew-core 是 Homebrew 官方维护的最大软件仓库，包含绝大多数命令行工具的安装脚本，brew update 也会同步这个仓库的最新内容。
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git"
```

## python 配置

```bash
# 指定通过 Homebrew 安装的 pip 工具的默认软件源地址。当你使用 brew install python 安装的 Python 自带的 pip 下载包时，会优先从这个清华 PyPI 镜像拉取，而非官方的 pypi.org
export HOMEBREW_PIP_INDEX_URL="https://pypi.tuna.tsinghua.edu.cn/simple"

# 指定新一代 Python 包管理器 uv 的默认软件源地址。uv 是 pip 的高性能替代品（速度比 pip 快 10-100 倍），这个配置让 uv 默认使用清华 PyPI 镜像加速所有包的下载、安装和解析操作。
export UV_DEFAULT_INDEX="https://pypi.tuna.tsinghua.edu.cn/simple"
```

## docker 配置
```json
{
    "registry-mirrors": [
        "https://mirror.ccs.tencentyun.com",
        "https://docker.mirrors.ustc.edu.cn",
        "https://dockerproxy.net",
        "https://docker.1ms.run",
        "https://mirror.ccs.tencentyun.com"
    ]
}
```


