# ng-japan OnAir 

- https://www.youtube.com/watch?v=I69MxjArIIg
- https://connpass.com/event/178718

## RouterModule

第２引数 `config` にいろいろあるけど使ってる？

handleErrorでアプリケーションのエラーをハンドルする事がよくある。
`errorHandler` を使うとルーターのエラーだけハンドルできる。

`urlUpdateStrategy` 
-  `eager` URLが変わる前にイベントが発火する
-  `deferred` URLが変わった後にイベントが発火する

## Route

`data` 静的に解決するメタデータ `resolve` が動的。
`runGuardsAndResolvers` 毎回ガードが動くのが冗長な時にガードを動かすタイミングをハンドルできる。

## RouterOutlet

`(activate)` `(deactivate)` というイベントがある。
後述のeventを使う事が多いのであまり使う事がない。

## Router

`isActive` ルーティングにマッチするか調べる。`exact:true` を渡すと完全一致。

matrixParmeter
URLはn分木になっている。
`/team/33/(user/victor//support:help)` は `/team/33` の下に `user/victor` と `help` のツリーが分岐している。（outlet名が `support`）
W3Cで定められたURLの仕様で、Angularがそれをサポートしている。

`router.navigate([('team', 33])` の `33`をオブジェクトにするとAngularがMatrixParameterとして解釈する。

`NavigationExtras` この辺でアプリ全体で同じクエリパラメータを使い回すとか、新しいクエリパラメータをマージするのかリプレイスなのか、とかのハンドルができる。

`queryParamsHandling` ナビゲーション
`skipLocationChange` 遷移先をルーティングの履歴に積まない。
`replaceUrl` 遷移元をルーティングの履歴に積まない。エラーページの遷移に使えそう。
