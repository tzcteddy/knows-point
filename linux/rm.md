# rm
> 删除文件和目录

rm 命令用来删除文件和目录：

    rm item...

“item”代表一个或多个文件或目录。

## 选项
|选项|	意义|
|---|---|
|-i, --interactive|	在删除已存在的文件前，提示用户确认信息。 如果不指定这个选项，rm 会默默地删除文件|
|-r, --recursive|	递归地删除文件，这意味着，如果要删除一个目录，而此目录 又包含子目录，那么子目录也会被删除。要删除一个目录，必须指定这个选项。|
|-f, --force|	忽视不存在的文件，不显示提示信息。这选项覆盖了“--interactive”选项。|
|-v, --verbose|	在执行 rm 命令时，显示翔实的操作信息。|

## 实例
|命令|	运行结果|
|---|---|
|rm file1|	默默地删除文件|
|rm -i file1|	除了在删除文件之前，提示用户确认信息之外，和上面的命令作用一样。|
|rm -r file1 dir1|	删除文件 file1, 目录 dir1，及 dir1 中的内容。|
|rm -rf file1 dir1|	同上，除了如果文件 file1，或目录 dir1 不存在的话，rm 仍会继续执行。|