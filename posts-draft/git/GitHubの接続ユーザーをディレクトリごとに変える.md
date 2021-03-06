# ローカル設定（2回目はスキップ）

## SSHの鍵を作る

```bash
$ cd ~/.ssh
$ ssh-keygen 
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/matsuoka/.ssh/id_rsa): user2.github
Enter passphrase (empty for no passphrase): {任意のパスワード入力}
Enter same passphrase again: {任意のパスワード入力}
Your identification has been saved in user2.github.
Your public key has been saved in user2.github.pub.
...
```

## ローカルのSSHの設定を追加

```bash
$ vi config
```

```
Host user2-github.com
  User git
  HostName github.com
  IdentityFile ~/.ssh/{user2.github}
  AddKeysToAgent yes
  UseKeychain yes
```

```bash
$ ssh-add user2.github
```

## GitHub側の設定を追加

```
$ pbcopy < user2.github.pub
```

このページで追加する。
https://github.com/settings/keys

# 作業ディレクトリごとの設定

```
$ cd {任意の作業フォルダ}
$ git config --local user.name {user2}
$ git config --local user.email {user2@gmail.com}
```

## GitHubに接続できる事を確認

```bash
$ ssh -T git@user2-github.com
Hi {user2}! You've successfully authenticated, but GitHub does not provide shell access.
```

## コミットユーザーが誰になっているか確認

```bash
$ cd {任意の作業フォルダ}
$ git config --local user.name
{user2}
$ git config --local user.email
{user2@gmail.com}
```
