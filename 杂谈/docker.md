## docker

### 一、Dockerfile 概述
Dockerfile 是用来定义 Docker 镜像里的内容和构建步骤的文本文件。通过编写 Dockerfile，可以定制化镜像的构建过程，包括基础镜像选择、软件安装、环境变量设置等操作。通过编写 Dockerfile，用户可以自定义和构建自己的 Docker 镜像，实现应用程序的快速部署和跨环境运行。

### 二、Dockerfile 优点

1. 容器化趋势: 容器化技术正在成为软件开发和部署的主流趋势。Docker 是当前最流行的容器化平台之一，而 Dockerfile 是定-义 Docker 镜像的关键工具，掌握 Dockerfile 可以帮助开发人员更好地理解和应用容器化技术。

2. 快速部署与交付: 使用 Dockerfile 可以定义应用程序的环境和依赖，将其打包成镜像，使得应用程序能够在不同环境中快速部署和交付。这种标准化的部署方式大大简化了部署流程，提高了开发团队的工作效率。

3. 环境一致性: 通过 Dockerfile 构建的镜像可以确保应用程序在不同环境中的一致性运行，避免了因环境差异导致的问题，从而提高了应用程序的可移植性和稳定性。

4. 资源隔离与安全性: Docker 容器提供了资源隔离和安全性，使用 Dockerfile 可以定义容器的运行环境和权限，确保应用程序在容器中的安全运行。

5. 持续集成与持续部署: Dockerfile 可以作为持续集成和持续部署流程的一部分，帮助构建自动化的部署流程。

### 三、Dockerfile 编写规则
Dockerfile 是一个文本文件，其中包含用于构建 Docker 镜像的指令。每个指令都会创建一层，并且可以基于之前的层构建。

1. 文件名以 Dockerfile命名。

2. Dockerfile 中引用的所有文件都应该与 Dockerfile 文件处于相同的目录层级，在 Dockerfile 中引用文件时，默认路径是相对于 Dockerfile 所在的目录。

3. Dockerfile 中非注释行的第一行必须是 FROM 指令，用于指定基础镜像。

4. 注释：以井号(#)开头，用于注释 Dockerfile 中的内容。

5. 通常为了提高可读性和一致性，建议按照惯例以大写形式书写 Dockerfile 指令，例如：

```yml
# Nginx基础镜像，并指定了使用最新版本
FROM nginx:latest
# 将本地的 nginx.conf 文件复制到容器中的 /etc/nginx 目录下
COPY nginx.conf /etc/nginx/nginx.conf
# 暴露 Nginx 的默认 HTTP 端口
EXPOSE 80
INSTRUCTION：指令，是关键字，告诉 Docker 如何处理后续的命令。
arguments：指令的参数，具体取决于指令的类型。
```
6. 编写 Dockerfile 时，可以在同一目录下创建一个名为 .dockerignore 的文件，并根据需要列出需要排除的文件和目录。这样可以确保在构建 Docker 镜像时，只包含必要的文件，避免不必要的文件被添加到镜像中，减小镜像大小并提高构建效率。

以下是一些示例 .dockerignore 文件的用法：

        # 忽略所有 .git 目录
        .git
        # 忽略所有 .DS_Store 文件
        .DS_Store
        # 忽略 log 目录及其下所有内容
        log/
        # 忽略 Dockerfile 中引用的一些文件
        config.json
        secrets/
### 四、Dockerfile 中常用的指令
| 指令 | 含义 |
|:--|:--|
|FROM 镜像|	指定基础镜像，用于构建新镜像的起点。|
|MAINTAINER 名字|	说明镜像的维护人信。已在Docker中弃用，建议使用LABEL代替|
|RUN 命令|	在镜像中执行命令，用于安装软件包、设置环境等操作。|
|CMD [ " 要运行的程序"，" 参数1"," 参数2"]|	指定容器启动时默认要运行的命令。|
|EXPOSE 端口号	|声明容器运行时监听的端口，但并不会自动映射到宿主机的端口。|
|ENV 环境变量 变量值|	设置环境变量。|
|ADD 源文件/目录 目标文件/目录|	将文件或目录复制到容器中。|
|COPY 源文件/目录 目标文件/目录	|类似于 ADD，将文件或目录复制到容器中，但更推荐使用 COPY。|
|VOLUME ["目录 "]	|声明持久化目录，用于存储数据或与其他容器共享数据。|
|USER 用户名/UID	|指定运行容器的用户。|
|WORKDIR 路径	|设置工作目录，指定容器中命令执行的默认路径。|
|ONBUILD 命令|	定义触发器指令，在子镜像中执行。指定所生成的镜像作为一个基础镜像时所要运行的命令|
|HEALTHCHECK	|用于指定容器的健康检查命令，可以检查容器内应用程序的状态。|

以下是 Dockerfile 中常用的指令及其详细解释：

1. FROM
- 作用：指定基础镜像，用于构建新镜像的起点。
- 语法：FROM 镜像名称:标签 [AS <name>]
- 示例1：FROM python:3.9-slim
- 示例2：FROM ubuntu:20.04标签（可选）：指定基础镜像的标签，表示特定版本。

[AS <name>]（可选）：为基础镜像设置一个别名，用于多阶段构建。

2. LABEL
- 作用：为镜像添加元数据,通常用于提供关于镜像的描述信息。
- 语法：LABEL <key>=<value> <key>=<value> ...
- 示例1：LABEL maintainer="John Doe" description="My custom image"
- 示例2：LABEL version="1.0" description="This is a sample Docker image"

3. RUN
- 作用：在镜像中执行命令，用于安装软件包、设置环境等操作。
- 语法：RUN <command>
- 示例1：RUN apt-get update && apt-get install -y python3
- 示例2：RUN npm install express

4. CMD
- 作用：容器启动时要运行的命令。
- 语法：
    - Exec 格式：CMD ["executable","param1","param2"]
    - Shell 格式：CMD command param1 param2
- 示例：
    - Exec 格式：CMD ["nginx", "-g", "daemon off;"]
    - Shell 格式：CMD nginx -g 'daemon off;'示例1：CMD ["python", "app.py"]
- 示例2：CMD ["npm", "start"]

5. ENTRYPOINT

> ENTRYPOINT 指令用于设置容器启动时执行的默认命令。与 CMD 不同，ENTRYPOINT 指定的命令不会被 docker run 命令中指定的命令参数覆盖，而是作为容器启动时执行的固定命令。

ENTRYPOINT 可以在 Dockerfile 中以两种方式指定：Shell 格式和 Exec 格式。

Shell 格式示例：

        ENTRYPOINT echo "Hello, World"
        这条命令将作为 shell 命令执行，输出 “Hello, World” 并结束容器运行。

Exec 格式示例：

        ENTRYPOINT ["/bin/bash", "-c", "echo Hello, World"]
        这条命令以执行格式指定了一个可执行文件 “/bin/bash” 以及参数 “-c”，并最终执行了 “echo Hello, World” 命令。

在实际使用中，ENTRYPOINT 经常与 CMD 结合使用，以便提供灵活性和定制化。如果在 Dockerfile 中同时使用了 ENTRYPOINT 和 CMD，CMD 的内容会被当作 ENTRYPOINT 的参数。

- 作用：设置容器启动时要运行的命令。
- 语法：ENTRYPOINT ["executable", "param1", "param2"]
- 示例：ENTRYPOINT ["nginx", "-g", "daemon off;"]

6. COPY
- 作用：复制文件或目录到镜像中。
- 语法：COPY <src> <dest>
- 示例1：COPY app.py /app/
- 示例2：COPY index.html /var/www/html/index.html

7. ADD
- 作用：复制文件或目录到镜像中（类似于 COPY，但功能更多）。
- 语法：ADD <src> <dest>
- 示例1：ADD file.txt /app/
- 示例2：ADD jdk.tar.gz /usr/local/  #将 JDK 压缩包添加到镜像中

在 Dockerfile 中，ADD 和 COPY 都用于将文件从构建上下文复制到容器中，但它们之间有一些关键区别：

        COPY：
        COPY 只能复制本地文件或目录到容器中，不支持 URL。
        COPY 只进行简单的文件复制操作，不会对文件进行解压缩或其他处理。

总的来说，COPY 更加明确和简单，而 ADD 则具有更多功能。 在大多数情况下，如果只需要简单的文件复制操作，推荐使用 COPY。如果需要额外功能或复杂的复制需求，可以考虑使用 ADD。

8. WORKDIR
- 作用：设置工作目录，指定容器中命令执行的默认路径。
- 语法：WORKDIR /path/to/workdir
- 示例1：WORKDIR /usr/src/app
- 示例2：WORKDIR /home/node/app

9. ENV
- 作用：设置环境变量。
- 语法：ENV <key> <value>
- 示例1：ENV APP_ENV=production
- 示例2：ENV PORT=3000

10. EXPOSE
- 作用：声明容器监听的端口。
- 语法：EXPOSE <port>
- 示例1：EXPOSE 80
- 示例2：EXPOSE 8000

11. VOLUME
- 作用：声明持久化目录，用于存储数据或与其他容器共享数据。
- 语法：VOLUME /myvolume
- 示例1：VOLUME /data
- 示例2：VOLUME ["/data"]
- 示例3：VOLUME ["/var/log/app"]

12. USER
- 作用：指定运行容器时的用户。
- 语法：USER <username>
- 示例：USER appuser

13. 注释
- 作用：在 Dockerfile 中添加注释。
- 示例：# This is a comment

14. ONBUILD 命令
- 作用：定义触发器指令，在子镜像中执行。
- 语法：ONBUILD 命令
- 示例1：ONBUILD COPY . /app
- 示例2：ONBUILD RUN bundle install

15. HEALTHCHECK
- 作用：用于指定容器的健康检查命令，可以检查容器内应用程序的状态。
- 语法：HEALTHCHECK [选项] CMD 命令
- 示例1：HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost/ || exit 1
- 示例2：HEALTHCHECK --interval=5s --timeout=2s CMD wget -qO- http://localhost:8080/ || exit 1

### 五、Dockerfile构建镜像
1. 创建Dockerfile 使用的文件 index.html

```html
<html>
<body><h1>hello,运维魔法师！</h1><p>2024.03.11</p></body>
</html>
```
2. 编写 Dockerfile

        [root@zyl-server ~]# mkdir mynginx-app
        [root@zyl-server ~]# cd mynginx-app/
        [root@zyl-server mynginx-app]# 
        [root@zyl-server mynginx-app]# 
        [root@zyl-server mynginx-app]# vi Dockerfile
        [root@zyl-server mynginx-app]# 
以下是一个简单的示例 Dockerfile，用于构建一个基于 Nginx 的镜像：

```yml
#使用官方的 Nginx 镜像作为基础镜像
FROM nginx:latest
#将本地的 nginx.conf 文件复制到容器中的 /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
#将本地的 index.html 文件复制到容器中的 /usr/share/nginx/html/index.html
COPY index.html /usr/share/nginx/html/index.html
#暴露 Nginx 默认的 HTTP 端口 80
EXPOSE 80
#在容器启动时自动启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]
```

3. 执行构建镜像：

        docker build -t my-nginx-image .

4. 查看当前系统中的 Docker 镜像列表

        docker images
5. 运行镜像

        docker run -d -p 8080:80 my-nginx-image
这将会在端口 8080 上启动一个基于该镜像的 Nginx 服务器。你可以通过访问 http://localhost:8080 来查看 Nginx 默认页面。



