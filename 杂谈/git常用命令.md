
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
