
### 查看配置

      git config --list

### 生成密钥

      git config --global user.name 'name'
      git config --global user.email 'user@qq.com'

      ssh-keygen -t rsa -C 'user@qq.com'

### 查看远程仓库地址

      git remote -v

### 修改远程仓库地址

      git remote rm origin
      git remote add origin url

### 创建新分支
当前master

      git checkout -b new_branch
      git push origin new_branch
      git branch --set-upstream-to=origin/new_branch

### 查看状态

      git status

### 对比

      git diff /src/page/index.js

### 删除分支

1. 删除本地
      git branch -d new_branch

2. 删除远程分支
      git push origin --delete new_branch
