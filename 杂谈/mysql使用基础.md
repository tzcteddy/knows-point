## mysql使用基础

### 安装mysql
[mysql下载地址](https://dev.mysql.com/downloads/mysql/)

`如果是压缩包记得配置环境变量`,进到C:\mysql\bin

查看版本：
> mysqladmin --version

初始化：
> mysqld --initialize

Mysql安装成功后，默认的root用户密码为空，你可以使用以下命令来创建root用户的密码：
> mysqladmin -u root password "new_password";


### 登录mysql
> mysql -h 主机名 -u 用户名 -p

+ -h : 指定客户端所要登录的 MySQL 主机名, 登录本机(localhost 或 127.0.0.1)该参数可以省略;
+ -u : 登录的用户名;
+ -p : 告诉服务器将会使用一个密码来登录, 如果所要登录的用户名密码为空, 可以忽略此选项。

如果我们要登录本机的 MySQL 数据库，只需要输入以下命令即可：

> mysql -u root -p <br>
Enter password:*******

### 退出登录
> exit

> \q
### 启动和关闭

启动：
> mysqld --console

关闭：
>mysqladmin -uroot shutdown

### 管理命令

#### use 数据库名
选择要操作的Mysql数据库，使用该命令后所有Mysql命令都只针对该数据库
> use user;

#### show databases;
列出 MySQL 数据库管理系统的数据库列表。

#### show tables;
显示指定数据库的所有表，使用该命令前需要使用 use 命令来选择要操作的数据库。

#### show columns from 数据表
显示数据表的属性，属性类型，主键信息 ，是否为 NULL，默认值等其他信息。
> show columns from user;

#### show index from 数据表
显示数据表的详细索引信息，包括PRIMARY KEY（主键）。
> show index from user;

#### SHOW TABLE STATUS [FROM db_name] [LIKE 'pattern'] \G:
该命令将输出Mysql数据库管理系统的性能及统计信息。
> SHOW TABLE STATUS  FROM RUNOOB;   # 显示数据库 RUNOOB 中所有表的信息<br>
  SHOW TABLE STATUS from RUNOOB LIKE 'runoob%';     # 表名以runoob开头的表的信息<br>
  SHOW TABLE STATUS from RUNOOB LIKE 'runoob%'\G;   # 加上 \G，查询结果按列打印

### 创建数据库
> CREATE DATABASE 数据库名;

### 删除数据库
> DROP DATABASE 数据库名;

### 创建数据表

> CREATE TABLE table_name (column_name column_type);

    CREATE TABLE IF NOT EXISTS `cai_goods`(
      `cai_id` INT UNSIGNED AUTO_INCREMENT,
      `cai_name` VARCHAR(100) NOT NULL,
      PRIMARY KEY ( `cai_id` )
    )ENGINE=InnoDB DEFAULT CHARSET=utf8;

+ 如果你不想字段为 NULL 可以设置字段的属性为 NOT NULL， 在操作数据库时如果输入该字段的数据为NULL ，就会报错。
+ AUTO_INCREMENT定义列为自增的属性，一般用于主键，数值会自动加1。
+ PRIMARY KEY关键字用于定义列为主键。 您可以使用多列来定义主键，列间以逗号分隔。
+ ENGINE 设置存储引擎，CHARSET 设置编码。

[数值类型](https://www.runoob.com/mysql/mysql-data-types.html)

### 删除数据表
> DROP TABLE 表名 ;

### 插入数据
以下为向MySQL数据表插入数据通用的 INSERT INTO SQL语法：

    INSERT INTO table_name (field1,field2,...fieldN)
                            VALUES
                            (value1,value2,...valueN);

如果数据是字符型，必须使用单引号或者双引号，如："value"。

### 查询数据
以下为在MySQL数据库中查询数据通用的 SELECT 语法：

    SELECT column_name,column_name
    FROM table_name
    [WHERE Clause]
    [LIMIT N][ OFFSET M]

+ 查询语句中你可以使用一个或者多个表，表之间使用逗号(,)分割，并使用WHERE语句来设定查询条件。
+ SELECT 命令可以读取一条或者多条记录。
+ 你可以使用星号（*）来代替其他字段，SELECT语句会返回表的所有字段数据
+ 你可以使用 WHERE 语句来包含任何条件。
+ 你可以使用 LIMIT 属性来设定返回的记录数。
+ 你可以通过OFFSET指定SELECT语句开始查询的数据偏移量。默认情况下偏移量为0。

### WHERE 子句
下是 SQL SELECT 语句使用 WHERE 子句从数据表中读取数据的通用语法：

    SELECT field1, field2,...fieldN FROM table_name1, table_name2...
    [WHERE condition1 [AND [OR]] condition2.....

+ 查询语句中你可以使用一个或者多个表，表之间使用逗号, 分割，并使用WHERE语句来设定查询条件。
+ 你可以在 WHERE 子句中指定任何条件。
+ 你可以使用 AND 或者 OR 指定一个或多个条件。
+ WHERE 子句也可以运用于 SQL 的 DELETE 或者 UPDATE 命令。
+ WHERE 子句类似于程序语言中的 if 条件，根据 MySQL 表中的字段值来读取指定的数据

下表中实例假定 A 为 10, B 为 20

|操作符|描述|实例|
|:--|:--|:--|
|=|等号，检测两个值是否相等，如果相等返回true|(A = B) 返回false。|
|<>,!=|不等于，检测两个值是否相等，如果不相等返回true|(A != B) 返回 true。|
|>|大于号，检测左边的值是否大于右边的值, 如果左边的值大于右边的值返回true|(A > B) 返回false。|
|<|小于号，检测左边的值是否小于右边的值, 如果左边的值小于右边的值返回true|(A < B) 返回 true。|
|>=|大于等于号，检测左边的值是否大于或等于右边的值, 如果左边的值大于或等于右边的值返回true|(A >= B) 返回false。|
|<>=|小于等于号，检测左边的值是否小于或等于右边的值, 如果左边的值小于或等于右边的值返回true|(A <= B) 返回 true。|

### UPDATE 更新
以下是 UPDATE 命令修改 MySQL 数据表数据的通用 SQL 语法

    UPDATE table_name SET field1=new-value1, field2=new-value2
    [WHERE Clause]

+ 你可以同时更新一个或多个字段。
+ 你可以在 WHERE 子句中指定任何条件。
+ 你可以在一个单独表中同时更新数据。

当你需要更新数据表中指定行的数据时 WHERE 子句是非常有用的。

### DELETE 删除
以下是 SQL DELETE 语句从 MySQL 数据表中删除数据的通用语法：

    DELETE FROM table_name [WHERE Clause]

+ 如果没有指定 WHERE 子句，MySQL 表中的所有记录将被删除。
+ 你可以在 WHERE 子句中指定任何条件
+ 您可以在单个表中一次性删除记录。

当你想删除数据表中指定的记录时 WHERE 子句是非常有用的。


### 忘记密码

#### 8.0一下

1. 进入mysql的bin目录

2. net stop mysql 管理员模式

3. mysqld --skip-grant-tables   8.0上使用 mysqld --console --skip-grant-tables --shared-memory

    输入：mysqld --skip-grant-tables 回车

    （--skip-grant-tables 的意思是启动 MySQL 服务的时候跳过权限表认证）

    注意：这时候，刚刚打开的 cmd 窗口已经不能使用了。重新再 bin 目录下打开一个新的 cmd 窗口进行下面的操作

4. 重新打开一个cmd窗口，输入 mysql 回车。

5. 连接权限数据库：use mysql

    use mysql

6. 修改数据库连接密码

　  update user set password=password("123456") where user="root";

    注意这里最后的分号一定不能丢

7. 刷新权限（必须步骤）

      flush privileges;（注意分号）

8. 退出mysql

      quit（这里没有分号）

9. 修改root 密码后，需要执行下面的语句和新修改的密码。不然开启 mysql 时会出错。

      mysqladmin -u root -p shutdow   根据提示输入刚刚修改的密码

10. 重启 mysql

      net start mysql

#### 8.0
1.打开命令窗口cmd，输入命令：net stop mysql，停止MySQL服务，

2.开启跳过密码验证登录的MySQL服务

        输入命令  

        mysqld --console --skip-grant-tables --shared-memory 

3.再打开一个新的cmd，无密码登录MySQL，输入登录命令：mysql -u root -p

 

4. 密码置为空，命令如下：

    use mysql

    update user set authentication_string='' where user='root';

5. 退出mysql，执行命令：

    quit

6. 关闭以-console --skip-grant-tables --shared-memory 启动的MySQL服务，

7. 打开命令框，输入：net start mysql  启动MySQL服务。

8. 步骤4密码已经置空，所以无密码状态登录MySQL，输入登录命令：mysql -u root -p

9. 利用上一篇博客中更改密码的命令，成功修改密码，如下图：

    //ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';

    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '111111';

10.验证更改后密码正确登录

    输入quit，退出当前登录，输入登录命令：mysql -u root -p

    输入密码，成功登录，到此，重置密码结束。

### net start mysql 服务名无效问题

1. 环境变量配置过，并且在对应目录下执行命令

  如： C:\mysql-5.6.50\bin>

2. 在命令行中输入mysqld --install

    出现Service successfully install代表你已经安装成功

    不成功： Install/Remove of the Service Denied!  解决：使用管理员身份运行

3. 再次执行 net start mysql

    MySQL 服务正在启动

    MySQL 服务无法启动

    并无报错 删除mysql下的data文件， 重新执行 mysqld --initialize 就可以在当前路径下生成data文件夹，再执行net start mysql 就可以启动mysql