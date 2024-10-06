## GitHub/GitLab 多账号
如何给托管平台 GitHub/GitLab 配置多账号。我们已经知道代码托管平台实际上是通过 ~/.ssh/id_rsa.pub 来认证用户的，所以只要多生成几个密钥对就相当于生成了多个托管平台的账号了！注意，生成密钥对之后，记得添加到 GitHub 或 GitLab 账户的 SSH Key 里面。
但是生成密钥对的时候不要覆盖之前的密钥对，因为默认会保存到同样的位置，即 ~/.ssh/id_rsa，如果没备份的话，千万不要覆盖，不然就找不到了！（真覆盖了话，也不是什么大事，把原 SSH Key 从托管平台里面删了即可），例如你可以先保存到当前目录下，然后移动到其他位置，例如 ~/.ssh/keliq/ 目录：

```bash
$ ssh-keygen -t rsa -C "xxx"
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/keliq/.ssh/id_rsa): ./id_rsa
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in ./id_rsa.
Your public key has been saved in ./id_rsa.pub
```

到这里，你就拥有多个 SSH Key 了，于是可以通过下面的命令切换身份：

```bash
# 默认就是用的 ~/.ssh/id_rsa，所以加不加一个效果
GIT_SSH_COMMAND="ssh -i ~/.ssh/id_rsa" git clone xxxx
# 使用另外一个私钥
GIT_SSH_COMMAND="ssh -i  ~/.ssh/keliq/id_rsa" git push
# 使用 gitlab 的私钥，当然你得把对应的公钥添加到 gitlab 的 SSH Key 里面才行
GIT_SSH_COMMAND="ssh -i  ~/.ssh/gitlab/id_rsa" git push

```

这种方式虽然灵活，但是不够智能，例如我想要的效果就是：某个平台的所有仓库都使用某个私钥进行认证，这种需求很常见，打开 ~/git/config 文件配置如下：

```bash
Host github.com
    User git
    Hostname github.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/github/id_rsa
Host gitlab.com
    Hostname gitlab.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/gitlab/id_rsa
```

到这里，多账号的配置基本上已经完成了，但是还有一个不足的地方就是虽然私钥根据域名自动选择了，但是提交的配置还是共享 .gitconfig 中的配置，例如 user.name 和 user.email，能不能根据仓库所在的不同位置选择不同的全局配置文件呢？ 答案是可以的，打开 ~/.gitconfig 文件，在末尾添加下面的配置：
```bash
[includeIf "gitdir:~/work/gitlab/"]
    path = .gitconfig-gitlab
```

然后再建一个 ~/.gitconfig-gitlab 文件，里面写全局配置，例如：

```bash
[user]
    name = keliq
    email = keliq
```

那么只要仓库被放到了 ~/work/gitlab 目录下面，默认就会使用这个配置了！