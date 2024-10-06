## 一、介绍
### 什么是cherry-pick ？
  - 字面意思：择优挑选。
  - 在git中git cherry-pick指从历史的其他分支中挑选一些你需要的commit迁移到当前分支上。
- 为什么要用git cherry-pick？
  - 程序比人可靠
  - 保留各自的提交信息
## 二、常用命令
    git cherry-pick -n aaaa # --no-commit 只更新工作区和暂存区，不产生新的提交
    git cherry-pick -x aaaa #自动添加原始提交的commit信息：(cherry picked from commit ...)
    git cherry-pick -s aaaa #自动添加提交者的签名信息

### 迁移多次提交
    git cherry-pick aaaaa bbbbb ccccc ddddd

### 迁移连续提交
    git cherry-pick aaaaa..ddddd # aaaaa 到 ddddd 的所有commit，但不包含aaaaa
    git cherry-pick aaaaa^..ddddd # aaaaa 到 ddddd 的所有commit，^表示包含aaaaa

### 迁移分支
    git cherry-pick feature-JY-2228 # 把feature-JY-2228的最近一次commit迁移到当前分支
## 三、冲突处理
出现冲突：1. 本地处理冲突；2. git add . 把冲突暂存

    git add. # 暂存
    git cherry-pick --continue # 继续cherry-pick
    git cherry-pick --abort #放弃合并，回到操作前的样子（多个提交迁移时，已迁移的撤回）
    git cherry-pick --quit #退出cherry pick，但不回到操作前的样子（多个提交迁移时，已迁移的保留，未迁移的不动）
## 四、注意事项
1. cherry-pick连续提交时，前面的要比后面的先提交
2. cherry-pick 合并分支的提交时，需要使用-m且设置使用哪一个分支，分支以1开始索引
