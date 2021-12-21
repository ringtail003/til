---
title: 2021-10-20
description: null
tags: tips command
updatedAt: 2021-10-20
published: true
---

### Composerでまだマージされていないブランチを取り込む

```shell
composer require org/package:dev-{branch}
```

### 特定ポートをリッスンしているプロセスを調べる

```shell
lsof -i:{port}
```

```shell
lsof -i:80
```
