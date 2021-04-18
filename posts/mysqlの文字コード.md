---
title: mysqlの文字コード
description: デフォルト文字コードのセットをmy.cnfで指定する
published: false
tags: mysql
updatedAt: 2021-04-04
---

# mysqlの文字コード

```
// my.cnf

[mysqld]
character-set-server=utf8mb4

[client]
default-character-set=utf8mb4
```

## character set

mysqlで使用できる文字コードは下記のようにリストアップする。

```sql
mysql> show character set;
+----------+---------------------------------+---------------------+--------+
| Charset  | Description                     | Default collation   | Maxlen |
+----------+---------------------------------+---------------------+--------+
| big5     | Big5 Traditional Chinese        | big5_chinese_ci     |      2 |
| dec8     | DEC West European               | dec8_swedish_ci     |      1 |
| cp850    | DOS West European               | cp850_general_ci    |      1 |
| hp8      | HP West European                | hp8_english_ci      |      1 |
| koi8r    | KOI8-R Relcom Russian           | koi8r_general_ci    |      1 |
| latin1   | cp1252 West European            | latin1_swedish_ci   |      1 |
| latin2   | ISO 8859-2 Central European     | latin2_general_ci   |      1 |
```

- `utf8` 文字を3バイトで格納
- `utf8mb4` 文字を4バイトで格納

この2つの差は例えば絵文字を挿入した時に現れる。 

```sql
INSERT INTO {table} values ("🍣");`

> utf8: エラー
> utf8mb4: 挿入できる
```

utf8mb4を使ったほうが安全そう。
https://www.playfulit.net/articles/2018/09/13/UZwV7yw2pqhYCpiXdwZdWKEo/

## character-set-server

mysqlのデフォルトの文字コード。データベース作成時のデフォルト文字コード。
mysqlの起動時のオプションのよう。
マニュアルを参考にmy.cnfの `[mysqld]` グループに書いた。

https://dev.mysql.com/doc/refman/5.6/ja/charset-applications.html

## default-character-set

クライアント側で使用する文字コード。
my.cnf の `[mysql]` または `[client]` グループで指定する。
https://dev.mysql.com/doc/refman/5.6/ja/mysql-command-options.html

# ローカルDBのテーブル構造とデータを書き出す

```sh
mysqldump -uroot -p {db_name} > {db_name}.sql

# テーブル構造のみの場合は --no-data オプション付ける

> mysqldump: Couldn't execute 'SHOW VARIABLES LIKE 'gtid\_mode'': Table 'performance_schema.session_variables' doesn't exist (1146)
```

mysqlが古いらしいのでアップデート。

```sh
mysql_upgrade -u root -p

> Upgrade process completed successfully.
Could not create the upgrade info file '/usr/local/var/mysql/mysql_upgrade_info' in the MySQL Servers datadir, errno: 13
```

mysql_upgrade が処理の最後に mysql_upgrade_info というファイルに書き込もうとした時のエラーらしい。
`/usr/local/var/mysql` は homebrew でインストールした mysql のデータ格納場所。
ユーザー _mysql か root でないと権限がなく、コマンド実行者（ログインユーザー）は書き込めないらしい。
対処が分からないので無視。

```sh
```
