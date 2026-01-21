## docker常用命令

### 启动容器命令
docker run -itd --rm --name npmhub-container  -p 4873:4873 my-npmhub-image

- docker run -i -t    运行交互式的容器
- docker run -d  后台模式。返回容器id
- -i（interactive）：保持容器的标准输入（stdin）打开，即使没有附加的终端。
- -t（tty）：为容器分配一个伪终端（TTY），使得容器可以像一个交互式终端一样运行。
- -d（detach）：让容器在后台运行，而不是前台运行。执行后会立即返回容器 ID，而不会阻塞终端。
- --rm 容器停止后自动删除容器，一次性运行
- -p  映射端口,格式为 主机端口:容器端口,将宿主机的 4873 端口映射到容器的 4873 端口。这样，你就可以通过访问宿主机的 4873 端口来访问容器内的服务

### 进入容器命令
docker exec -it  npmhub /bin/sh  

### 查看运行容器命令
docker ps

- CONTAINER ID(容器ID):
- IMAGE(使用的镜像)
- COMMAND(启动容器时运行的命令)
- CREATED(创建时间)
- STATUS(状态)

        状态有7种：
        created（已创建）
        restarting（重启中）
        running 或 Up（运行中）
        removing（迁移中）
        paused（暂停）
        exited（停止）
        dead（死亡）
- PORTS(容器的端口信息和使用的连接类型（tcp\udp）)
- NAMES(自动分配的容器名称)


### 退出/停止/清理容器

docker logs {containerid}  宿主主机查看容器内标准输出

**退出容器：** exit 

**停止容器：** docker stop {containerid} 

**删除容器：** docker rm -f 1e560fca3906  

**清理掉所有处于终止状态的容器：** docker container prune  


### 导出/导入容器快照
导出容器 1e560fca3906 快照到本地文件 ubuntu.tar

        docker export 1e560fca3906 > ubuntu.tar   


导入容器快照

        cat docker/ubuntu.tar | docker import - test/ubuntu:v1
        docker import http://example.com/exampleimage.tgz example/imagerepo


### 查看日志
docker logs -f bf08b7f2cd89


容器链接

*                 -P：是容器内部端口随机映射到主机的端口。

*                 -p：是容器内部端口绑定到指定的主机端口。



### 数据卷
查看数据卷在宿主机的位置

        docker volume inspect my-volume  

复制容器数据卷到本地

        docker cp 容器名称/ID:/path/to/mydata 宿主机目录

        示例：

        docker cp my-container:/app/data /host/data

        //说明：若不知道 mydata 卷在容器内的挂载路径，可通过 docker inspect 容器名称/ID 查看 Mounts 字段中的 Destination 值。

创建关联宿主机的新卷（长期同步）

1. 先停止目标容器（避免数据写入冲突）：docker stop 容器名称/ID。
2. 创建宿主机目录并关联新卷

        docker volume create --driver local --opt type=none --opt device=宿主机目录 --opt o=bind mydata-new

        docker volume create \
            --driver local \          # 指定卷驱动为本地（默认就是 local，可省略）
            --opt type=none \         # 卷类型为“无特殊类型”（因为是绑定宿主机目录，无需 Docker 管理存储）
            --opt device=宿主机目录 \ # 关键：指定宿主机上的实际目录路径（例如 /home/user/data）
            --opt o=bind \            # 挂载选项：以“绑定挂载”模式关联（将宿主机目录直接映射到卷）
            mydata-new                # 新卷的名称（容器挂载时使用这个名称）


3. 备份原容器数据到新卷（可选，若需保留历史数据）：启动临时容器挂载原卷和新卷，执行复制

        docker run --rm -v mydata:/source -v mydata-new:/dest alpine cp -r /source/* /dest/

        docker run \
            --rm \                  # 容器退出后自动删除（临时容器，用完即弃）
            -v mydata:/source \     # 将原卷 `mydata` 挂载到容器内的 `/source` 目录
            -v mydata-new:/dest \   # 将新卷 `mydata-new` 挂载到容器内的 `/dest` 目录
            alpine \                # 使用轻量的 alpine 镜像（仅提供基础 Linux 命令）
            cp -r /source/* /dest/  # 在容器内执行复制命令：将 `/source` 下的所有内容递归复制到 `/dest`

4. 重新启动原容器，替换挂载卷为 mydata-new：修改容器启动命令，将 -v mydata:/path/to/mydata 改为 -v mydata-new:/path/to/mydata，再启动容器。

        # 用新的挂载方式启动（替换为你的实际启动参数）
        docker run -d --name new_container -v /path/on/host/ollama-data:/root/.ollama [其他参数] 镜像名称


#### 常见问题：Mac使用docker时，卷默认挂载路径/var/lib/docker/volumes不存在问题
在 Mac 系统中使用 Docker 时，/var/lib/docker/volumes路径不存在是正常现象。
因为 Mac 系统中的 Docker 是通过虚拟化技术运行的，Docker 守护进程运行在一个轻量级 Linux 虚拟机中，所以默认的卷挂载路径/var/lib/docker/volumes位于虚拟机内部，而不是 Mac 主机的文件系统中。
如果想要访问虚拟机内部的/var/lib/docker/volumes路径，可以通过以下命令进入虚拟机的命名空间来实现：

        docker run -it --privileged --pid=host debian nsenter -t 1 -m -u -n -i sh

        docker run \
            -it \                  # 交互式运行容器（-i 保持输入打开，-t 分配伪终端）
            --privileged \         # 赋予容器“特权模式”：允许容器访问宿主机的所有设备和权限（突破默认隔离）
            --pid=host \           # 让容器共享宿主机的进程命名空间：容器内可以看到宿主机的所有进程（而非仅容器内进程）
            debian \               # 使用 debian 镜像作为基础环境（提供基础 Linux 工具）
            nsenter -t 1 -m -u -n -i sh  # 在容器内执行的命令：进入宿主机的命名空间并启动 shell

核心工具 nsenter 解析
nsenter 是 Linux 自带的命名空间进入工具，作用是 “进入指定进程的命名空间”，这里通过它进入宿主机的核心命名空间：
- -t 1：指定目标进程 ID 为 1（宿主机的 init 进程，是所有进程的父进程，属于宿主机命名空间）。
- -m：进入宿主机的挂载命名空间（可操作宿主机的文件系统挂载）。
- -u：进入宿主机的 UTS 命名空间（可修改宿主机的主机名等）。
- -n：进入宿主机的网络命名空间（可操作宿主机的网络接口、路由等）。
- -i：进入宿主机的 IPC 命名空间（可与宿主机进程进行 IPC 通信）。
- sh：进入命名空间后启动一个 shell 交互环境。

**最终效果**

执行后，你会进入一个 sh 终端，这个终端看似在容器内，实际拥有宿主机的完整操作权限：

- 可以直接查看 / 修改宿主机的文件系统（如 /etc、/var 等）。
- 可以管理宿主机的进程（如 ps aux 看到的是宿主机所有进程）。
- 可以操作宿主机的网络（如 ip addr 看到的是宿主机网卡）。

**注意事项**
**风险极高：** --privileged 和 nsenter 组合会完全突破 Docker 的隔离性，赋予容器控制宿主机的能力，仅在信任的环境中使用。

**常用于应急场景：** 例如宿主机 SSH 服务故障时，通过容器临时进入宿主机修复。

简单说，这段命令的本质是 “借容器的壳，直接操作宿主机”。


