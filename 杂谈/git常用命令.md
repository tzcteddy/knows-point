
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

### 删除tag

1. 删除本地
      git tag -d v20220101

2. 删除远程
      git push origin :refs/tags/v20220101

### git stash
场景：某一天你正在 feature 分支开发新需求，突然产品经理跑过来说线上有bug，必须马上修复。而此时你的功能开发到一半，于是你急忙想切到 master 分支。然后会看到如下错误

      error: Your local changes to following files would be overwritten by checkout...
更多用法：
     
      # 保存当前未commit的代码
      git stash

      # 保存当前未commit的代码并添加备注
      git stash save "备注的内容"

      # 列出stash的所有记录
      git stash list

      # 删除stash的所有记录
      git stash clear

      # 应用最近一次的stash
      git stash apply
      git stash apply stash@{1}

      # 应用最近一次的stash，随后删除该记录
      git stash pop

      # 删除最近的一次stash
      git stash drop


更多教程（https://www.bookstack.cn/read/git-tutorial/README.md）