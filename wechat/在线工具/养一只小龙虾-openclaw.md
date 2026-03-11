# 养一只自己的小龙虾-OpenClaw安装
![](https://foruda.gitee.com/images/1773128115953331543/ebc5c11d_8031453.jpeg)

[1. OpenClaw是什么？](🦞OpenClaw是什么？)<br/>
[2. 安装部署(MAC为例)](安装部署(MAC为例))<br/>
[3. 技能配置](安装部署(MAC为例))<br/>
[4. OpenClaw 命令行使用说明](OpenClaw命令行使用说明)<br/>
[5. 风险与防护](风险与防护)<br/>
[6. 国产替代](国产替代)<br/>
## 1. OpenClaw是什么？
> 官方解释：OpenClaw是一款个人AI助手，可在您自己的设备上运行。该服务支持您常用的各类通讯渠道（WhatsApp、Telegram、Google Chat、iMessage、BlueBubbles、Microsoft Teams、Matrix、Feishu...）。该设备支持macOS/iOS/Android系统的语音输入与听觉反馈功能，还能实时渲染用户操控的画布界面。网关仅是控制平面，而产品则是智能助手。<br/>
> 中文官网：[https://docs.openclaw.ai/zh-CN](https://docs.openclaw.ai/zh-CN)<br/>
> 源码地址：[https://github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)<br/>

说白话就是：**真正会干活的私人AI助理**；与其他AI平台的区别就是，他会操作你的系统，不只通过聊天给你反馈信息。

![](https://foruda.gitee.com/images/1773035864377863188/a388d7d7_8031453.jpeg)

## 2 安装部署(MAC为例)
### 2.1 环境搭建：
#### 2.1.1 安装Node
![](https://foruda.gitee.com/images/1773046372288195335/b05d2704_8031453.jpeg)
下载地址：[https://nodejs.org/en/download](https://nodejs.org/en/download)<br/> 验证安装是否成功，终端输入`node -v`，⚠️：windows需要配置环境变量
```bash
toolkit@admin ~ % node -v
v24.14.0 
```
#### 2.1.2 飞书应用(其他平台请自行搜索，找开放平台流程类似)
![](https://foruda.gitee.com/images/1773048545080068314/f5f64835_8031453.jpeg)
- openclaw官方文档：[https://docs.openclaw.ai/zh-CN/channels/feishu](https://docs.openclaw.ai/zh-CN/channels/feishu)
- 飞书开放平台：[https://open.feishu.cn/app](https://open.feishu.cn/app)
- 创建应用：`飞书开放平台`-`应用`-`创建应用`
- 准备好：`App Secret`、`App ID`
- 免审权限：一键导入
```json
{
  "scopes": {
    "tenant": [
      "contact:contact.base:readonly",
      "contact:user.employee_id:readonly",
      "docs:document.content:read",
      "event:ip_list",
      "im:chat",
      "im:message",
      "im:message.p2p_msg:readonly",
      "im:message:readonly",
      "im:message:send_as_bot",
      "wiki:wiki:readonly"
    ],
    "user": []
  }
}
```
- 关键步骤：发布到线上


### 2.2 安装OpenClaw
```bash
toolkit@admin ~ % npm install -g openclaw
```
### 2.3 运行配置向导
```bash
toolkit@admin ~ % openclaw onboard
```
### 2.4 配置模型
第一步：选择基本信息
![](https://foruda.gitee.com/images/1773047697993813105/27b0f045_8031453.jpeg)
第二步：快速启动
![](https://foruda.gitee.com/images/1773047714570907005/6756b2ba_8031453.jpeg)
第三步：设置新值
![](https://foruda.gitee.com/images/1773047730795542741/1f495bf9_8031453.jpeg)
第四步：选择模型 内置提供商+自定义(deepseek)
![](https://foruda.gitee.com/images/1773047747072307491/146e9eb8_8031453.jpeg)
第五步：模型类型(OpenAI/Anthropic)
![](https://foruda.gitee.com/images/1773047762341676787/f5e92773_8031453.jpeg)
第六步：配置模型
![](https://foruda.gitee.com/images/1773047777593475519/b945f27e_8031453.jpeg)

### 2.5 配置通信方式(Feishu)
第七步：选择通信引擎 Feishu 新版已经内置了插件
![](https://foruda.gitee.com/images/1773050487453205282/5fe384fe_8031453.jpeg)
第八步：填写飞书 APP Secret和APP ID
![](https://foruda.gitee.com/images/1773050688152062358/6e4dfdd0_8031453.jpeg)
第九步：选择连接方式
![](https://foruda.gitee.com/images/1773050703668209225/d9516d5e_8031453.jpeg)
第十步：选择主域(域名，国内feishu,国际lark)
![](https://foruda.gitee.com/images/1773050719658762920/335bbdcb_8031453.jpeg)
第十一步：飞书机器人沟通策略
![](https://foruda.gitee.com/images/1773050735071177084/08219ed7_8031453.jpeg)
第十二步：跳过(skip)就行
![](https://foruda.gitee.com/images/1773050751646055060/826b6548_8031453.jpeg)
第十三步：配置技能，推荐选择(clawhub),后面可以添加技能可以暂时跳过
![](https://foruda.gitee.com/images/1773050766480549211/14502729_8031453.jpeg)
![](https://foruda.gitee.com/images/1773050782292895911/a7ff8977_8031453.jpeg)
![](https://foruda.gitee.com/images/1773050797536876331/c507ab26_8031453.jpeg)
第十四步：启动网管服务
![](https://foruda.gitee.com/images/1773050813007166592/f973e244_8031453.jpeg)
第十五步：选择交互方式，命令行或者页面
![](https://foruda.gitee.com/images/1773050827231910392/ab6252d2_8031453.jpeg)
第十六步：测试聊天 
![](https://foruda.gitee.com/images/1773050842548293808/13f647d0_8031453.jpeg)
![](https://foruda.gitee.com/images/1773105974648167205/1143f3f8_8031453.jpeg)
还可以运行命令：`openclaw dashboard` 打开页面UI
![](https://foruda.gitee.com/images/1773108035951337337/e22721c8_8031453.jpeg)

### 2.6 常见问题
- **飞书机器人不回复**
    +  查看是否发布
    +  im:message 权限是否开启；
    +  事件与回调：订阅方式-长链接；配置事件：`im.message.receive_v1`
- **不知道配对码**
    +  找到飞书机器人随便发送消息如：‘你好’
    +  使用`openclaw pairing list feishu` 命令查看配对码

**重启网关：**`openclaw gateway restart`

**最终效果：**
![](https://foruda.gitee.com/images/1773124869017631669/152b40ab_8031453.jpeg)


## 3. 技能配置
1. 身份录入，给你的助手起个名字，让他知道他能做什么
```
    我是一个运营人员，日常需要你帮我[整理资料、撰写初稿、管理日程]。我习惯简洁直接的回复，每天上午9点向我汇报待办事项。以上内容请永久记住。
```
2. 安装技能, 推荐选择(clawhub) 
clawhub([https://clawhub.ai/](https://clawhub.ai/))是一个技能中心服务，所有 Skills 都是公开的、开放的，所有人都可以查看、共享和复用

3. 安装clawhub
```bash
npm i -g clawhub
```
推荐安装的技能：
- Capability Evolver / Self-Improving Agent：让龙虾能自我优化和复盘，越用越聪明。
- Agent Browser：让龙虾可以操作浏览器，自动查询信息、填写表格。
- Summarize：快速总结PDF、网页、长文档的核心内容。
- Find Skills：当你需要新功能时，可以让它自己去找合适的技能。

## 4. OpenClaw 命令行使用说明

### 4.1 用法
```bash
openclaw [选项] [命令]
```

### 4.2 选项

|选项|说明|
|:---|:---|
|--dev|	开发配置文件：将状态隔离在 ~/.openclaw-dev 目录下，默认网关端口为 19001，并偏移派生端口（浏览器 / 画布）|
|-h, --help|显示命令帮助信息|
|--log-level <level>	|全局日志级别覆盖（文件 + 控制台），可选值：silent（静默）、fatal（致命）、error（错误）、warn（警告）、info（信息）、debug（调试）、trace（追踪）|
|--no-color|	禁用 ANSI 颜色输出|
|--profile <name>|	使用命名配置文件（将 OPENCLAW_STATE_DIR/OPENCLAW_CONFIG_PATH 隔离在 ~/.openclaw-<name> 目录下）|
|-V, --version|	输出版本号|

### 4.3 命令
> 提示：后缀带 * 的命令包含子命令。运行 <command> --help 查看详细信息

|命令|说明|
|:---|:---|
|acp *	|代理控制协议（Agent Control Protocol）工具|
|agent	|通过网关运行一次代理交互|
|agents *	|管理隔离的代理（工作区、授权、路由）|
|approvals *	|管理执行审批（网关或节点主机）|
|browser *	|管理 OpenClaw 专用浏览器（Chrome/Chromium）|
|channels *	|管理已连接的聊天渠道（Telegram、Discord 等）|
|clawbot *	|传统 clawbot 命令别名|
|completion	|生成 shell 自动补全脚本|
|config *	|非交互式配置助手（获取 / 设置 / 取消设置 / 文件 / 验证）。默认：启动设置向导|
|configure	|交互式设置向导，用于配置凭据、渠道、网关和代理默认值|
|cron *	|通过网关调度器管理定时任务|
|daemon *	|网关服务（传统别名）|
|dashboard	|使用当前令牌打开控制界面（Control UI）|
|devices *	|设备配对 + 令牌管理|
|directory *	|查找支持的聊天渠道的联系人和群组 ID（自身、对等方、群组）|
|dns *	|DNS 助手，用于广域发现（Tailscale + CoreDNS）|
|docs	|搜索 OpenClaw 在线文档|
|doctor	|健康检查 + 网关和渠道的快速修复|
|gateway *	|运行、检查和查询 WebSocket 网关|
|health	|从运行中的网关获取健康状态|
|help	|显示命令帮助信息|
|hooks *	|管理内部代理钩子|
|logs	|通过 RPC 跟踪网关文件日志|
|memory *	|搜索并重新索引内存文件|
|message *	|发送、读取和管理消息|
|models *	|发现、扫描和配置模型|
|node *	|运行和管理无头节点主机服务|
|nodes *	|管理网关所属的节点配对和节点命令|
|onboard	|网关、工作区和技能的交互式入职向导|
|pairing *	|安全的私信配对（批准入站请求）|
|plugins *	|管理 OpenClaw 插件和扩展|
|qr	|生成 iOS 配对二维码 / 设置码|
|reset	|重置本地配置 / 状态（保留已安装的 CLI）|
|sandbox *	|管理用于代理隔离的沙箱容器|
|secrets *	|密钥运行时重新加载控制|
|security *	|安全工具和本地配置审计|
|sessions *	|列出已存储的对话会话|
|setup	|初始化本地配置和代理工作区|
|skills *	|列出并检查可用技能|
|status	|显示渠道健康状态和最近的会话接收方|
|system *	|系统事件、心跳和在线状态|
|tui	|打开连接到网关的终端界面|
|uninstall	|卸载网关服务 + 本地数据（CLI 保留）|
|update *	|更新 OpenClaw 并检查更新渠道状态|
|webhooks *	|Webhook 助手和集成|

## 5. 风险与防护
 
> 🚨**工信部已明确警示**：OpenClaw 默认配置存在高危安全隐患，尤其强调公网暴露、权限混乱和凭证管理问题。<br/>
全球超1800个实例暴露在公网，其中部分无需认证即可访问，已被用于窃取 API 密钥。
企业用户需自查：核查公网端口、权限配置、凭证管理情况，关闭非必要远程访问

![](https://foruda.gitee.com/images/1773104792533531664/5a671847_8031453.jpeg)

### 5.1 风险

#### 5.1.1 数据安全风险（最高优先级）
OpenClaw 作为飞书/钉钉等办公软件的网关工具，会处理你的聊天消息、文档、云盘文件等敏感数据，本地部署的核心风险点：
- **本地数据泄露**：
  - 风险：OpenClaw 的日志（`openclaw logs`）会明文记录接收的消息、会话 ID、用户 ID 等数据，若本地电脑被入侵/共享使用，这些敏感信息会被窃取；
  - 典型场景：日志文件默认存储在 `~/.openclaw/logs`，未加密的话，他人可直接查看你的飞书聊天内容。

- **凭证泄露**：
  - 风险：OpenClaw 配置文件（`~/.openclaw/config.yaml`）中存储飞书 App ID/Secret、机器人配对信息等，若配置文件被读取，攻击者可冒充你的机器人收发消息。
- **无数据脱敏**：
  - 风险：默认情况下，OpenClaw 不会对消息中的手机号、邮箱、文档链接等敏感信息做脱敏处理，本地存储的日志/缓存会留存完整敏感数据。

#### 5.1.2 权限管控风险
- **过度授权**：
  - 风险：为了让机器人正常工作，你可能会给飞书应用开通 `im:message`（消息读写）、`drive:file`（云盘文件）、`doc:document`（文档编辑）等高危权限，若 OpenClaw 存在漏洞或配置错误，攻击者可通过机器人获取你的飞书全量数据；
  - 典型场景：误开 `contact:user`（通讯录读取）权限，导致组织内员工信息泄露。
- **无权限审计**：
  - 风险：本地部署无统一的权限审计日志，无法监控谁通过 OpenClaw 访问了哪些数据，权限被滥用后难以追溯。

#### 5.1.3 稳定性与运维风险
- **本地环境依赖**：
  - 风险：OpenClaw 依赖 Node.js、WebSocket 长连接，若本地电脑关机、网络断开，机器人会立即失效；且 macOS/Windows 系统的端口占用、进程冲突可能导致网关崩溃。
- **版本更新风险**：
  - 风险：个人部署时容易忽略 OpenClaw 版本更新，旧版本可能存在已知漏洞（如 WebSocket 连接劫持），且无法及时修复。
- **无容灾备份**：
  - 风险：本地配置文件、配对数据无备份，若电脑重装系统，需重新配置飞书应用、重新配对，耗时且易丢失配置。
- **系统权限**


#### 5.1.4 网络 & 服务安全
- **OpenClaw 部署后暴露公网**
  - 风险：公开暴露 OpenClaw 网关后 可能被扫描攻击
- **通信过程中数据被抓包篡改**
  - 风险：若未配置 HTTPS，攻击者可通过中间人攻击（MITM）窃取通信数据（如飞书 App ID/Secret），导致数据泄露。

#### 5.1.5 合规性风险
- **违反飞书服务协议**：
  - 风险：飞书开放平台规定，应用需用于「合理的办公场景」，若本地部署的机器人用于爬取组织数据、自动群发广告等，可能导致应用被封禁，甚至账号受限。
- **数据合规问题**：
  - 风险：若你所在组织有数据安全制度（如禁止本地存储办公数据），本地部署 OpenClaw 留存飞书数据会违反内部规定，引发合规追责。


### 5.2 🛡️防护方案
以下是为**个人用户本地部署 OpenClaw**量身定制的、可直接落地执行的 **风险规避措施清单**。每项措施均附带具体操作步骤，确保安全可控。


#### 5.2.1 环境隔离（物理或虚拟化）

| 措施 | 具体操作 |
|------|----------|
| **1. 使用独立设备部署** | 在一台无重要数据的旧电脑、虚拟机（如 VirtualBox）或 Docker 容器中运行 OpenClaw。避免使用主力机。 |
| **2. Docker 容器化部署（推荐）** | 使用官方镜像 `openclaw/openclaw` 启动容器：`docker run -d --name openclaw -p 18789:18789 -v /path/to/workspace:/workspace -u 1000:1000 openclaw/openclaw`（其中 `-u 1000:1000` 表示非 root 用户运行） |

#### 5.2.2 网络与访问控制

| 措施 | 具体操作 |
|------|----------|
| **3. 修改默认端口** | 编辑配置文件（如 `config.yaml`），将监听端口从 `18789` 改为自定义端口（如 `34567`）。重启服务后，仅通过新端口访问。 |
| **4. 限制监听地址为本地回环** | 在配置文件中设置 `host: 127.0.0.1` 或 `localhost`，禁止监听 `0.0.0.0`。 |
| **5. 禁用公网暴露** | 不启用任何内网穿透（如 frp、ngrok）、远程桌面或 SSH 转发到 OpenClaw 所在机器。 |

#### 5.2.3 权限最小化管理

| 措施 | 具体操作 |
|------|----------|
| **6. 创建专用低权限用户** | 在 Linux 上创建普通用户（如 `clawuser`），并以该用户身份运行 OpenClaw。`sudo useradd -m clawuser && sudo passwd clawuser`登录该账户后再启动服务。 |
| **7. 限制工作目录范围** | 在配置文件中设置 `workspace: /home/clawuser/claw-workspace`，不要给它 `/` 根目录权限。 |
| **8. 禁用危险命令** | 在 `.env` 文件中添加：`CLAWS_ALLOW_DESTRUCTIVE_COMMANDS=false`或重写 `rm` 命令为 `mv` 到回收站：`alias rm='mv -t ~/.trash'`（需提前创建 `.trash` 目录） |

#### 5.2.4 数据与凭证安全

| 措施 | 具体操作 |
|------|----------|
| **9. 加密存储密钥** | 不在 OpenClaw 配置文件中明文保存 API 密钥。改用环境变量：`export OPENAI_API_KEY=your_key`，并在启动脚本中加载。 |
| **10. 使用密码管理器** | 将所有密钥存入 Bitwarden、KeePassXC 等密码管理工具，通过 CLI 插件调用，不直接暴露给 AI。 |
| **11. 定期清理记忆文件** | 手动删除或备份 `~/.openclaw/memory.md` 和 `soul.md`，防止长期积累敏感信息。 |

#### 5.2.5 技能与插件安全

| 措施 | 具体操作 |
|------|----------|
| **12. 仅安装官方技能** | 只从 [OpenClaw GitHub](https://github.com/openclaw/openclaw) 或 [ClawHub](https://clawhub.ai/) 下载技能包。 |
| **13. 手动审查代码** | 安装前检查技能代码中的 `exec`, `curl`, `wget`, `system()` 等高危指令。 |
| **14. 启用沙箱模式（如支持）** | 若技能支持沙箱运行，务必开启；否则禁用该技能。 |

#### 5.2.6 行为监控与审计

| 措施 | 具体操作 |
|------|----------|
| **15. 开启操作日志记录** | 在配置文件中启用 `log_level: debug`，并定期查看日志文件（通常位于 `logs/` 目录）。 |
| **16. 设置人工二次确认** | 对于“删除文件”、“发送邮件”、“执行命令”等操作，在 UI 中开启“手动批准”模式。 |
| **17. 监控资源消耗** | 使用 `htop` 或任务管理器监控 CPU/内存占用，防止 AI 死循环耗尽资源。 |

#### 5.2.7 紧急应对预案

| 措施 | 具体操作 |
|------|----------|
| **18. 定期备份关键数据** | 每周备份 `workspace` 和 `memory.md` 到外部硬盘或加密云盘。 |
| **19. 设立恢复机制** | 准备一份干净系统镜像，一旦发生误删或崩溃，可快速恢复。 |
| **20. 关闭服务即刻断网** | 若发现异常行为（如自动打开浏览器、大量外联），立即关闭 OpenClaw 并断开网络。 |


## 6. 国产替代

国内可替代 OpenClaw 的方案，按「大厂开箱即用」「开源可自托管」「轻量/特色」三类整理，优先覆盖中文生态、本地隐私与零部署门槛，适配个人开发、办公自动化与企业协作场景。

| 产品/项目 | 出品方 | 部署方式 | 核心优势 | 最佳适配 |
| :--- | :--- | :--- | :--- | :--- |
| 有道 LobsterAI | 网易有道 | 一键安装/本地 | 开源(MIT)、全GUI、本地优先、打通WPS/钉钉/飞书 | 个人开发者/家庭办公，重视隐私 |
| CoPaw | 阿里通义实验室 | 云端/企业部署 | 深度集成钉钉/飞书，企业级安全与长期记忆 | 企业团队，钉钉生态重度用户 |
| Kimi Claw | 月之暗面 | 云端托管 | 零部署、长文本处理强、预装海量技能 | 小白用户，追求极致便利 |
| MaxClaw | MiniMax | 云端/移动端 | 积分制免费可用，移动端适配好 | 学生/个人，预算有限 |
| 腾讯 WorkBuddy | 腾讯 | 桌面/云端 | 接入OpenClaw技能，无缝企微/QQ | 腾讯生态企业/个人 |
| 字节 扣子(Coze) | 字节跳动 | 低代码平台 | 可视化配置、沙箱保护、隐私可控 | 开发者快速定制智能体 |
| ZeroClaw | 社区 | 本地二进制 | Rust重写，3.4MB，内存<5MB，启动极快 | 低配硬件/边缘设备，极致性能 |










