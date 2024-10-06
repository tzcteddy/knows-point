
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



### 修改已经提交的commit信息
      1.修改最近一次提交commit message
      直接使用命令 
      git commit --amend 
      进入 vi编辑模式，按i进入编辑模式，直接修改commit信息， 按esc再:wq保存退出

      git push 到远程仓库


      2.修改历史commit message
      先使用
      git log 
      查出你所需要修改的commit位置，比如倒数第三条
      git rebase -i HEAD~3

      其中git log中倒数第n条就显示在该编辑页面的最新第1条

      按i进入编辑模式，将需要更改的commit的pick改成e/edit， 按esc再:wq保存退出

      如遇到：(dev|REBASE 1/3)，则只需在需要修改的rebase序号(此处就是1)是执行
      git commit --amend
      进入VI编辑页面，修改commit信息， 按esc再:wq保存退出

      然后执行
      git rebase --skip
      跳过不需要修改的rebase分支，执行成功。

      最后执行
      git rebase --continue
      命令完成rebase修改

      最终push 到远程，至此，修改完成。

      若进行到(dev|REBASE 1/3),中的一个阶段想退出此流程，执行命令
      git rebase --abort
      退出rebase 到主分支

      push 到远端时，若执行git push, 则只会在之前的commit记录后追加一条记录，但不会更新之前的commit信息
      若执行git push -f ，强制推送，则会更新之前的旧commit信息，进行覆盖

## 图解Git



更多教程（https://www.bookstack.cn/read/git-tutorial/README.md）