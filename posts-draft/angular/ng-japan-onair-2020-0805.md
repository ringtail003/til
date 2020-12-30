https://www.youtube.com/watch?v=ybx0keDvVb4

allowedCommonJsDependencies
v10からrequire使うと怒られるのでそれを許可する

optimization/buildOptimizer
両方ないと最適なoptimizeにならない
buildOptimizerはaotビルドを最適化（ts -> ts）trueにするとaotビルドの時間が伸びる
optimizationはビルド成果物の最適化（js -> ts）minifyとか、デバッグ用の情報が削除される

commonChunk
true: lazy loadingの時、モジュールAとBが共通で利用しているモジュールCをchunkとして吐き出す
false: モジュールA,Bの両方にCを含める

extractLicenses
3rdpartylisenseを吐き出すかどうか

angular.jsonならこうできる
"index": {
  "input": "src/index.staging.html",
  "output": "dist/index.html"
}

poll
リビルドの間隔、ファイルシステムが重たい時とか伸ばすのに使う

preserveSymlinks
npm linkを有効にするか

"sourceMap": {
  "scripts": "true", // ソースマップ作るけどデバッグウインドウ開いた時には出さない
  "styles": "hidden"
}

statsJson
true: バンドルサイズ調べる時とかに使う

subresourceIntegrity
ハッシュと一致しなかったらリソースの読み込みを中止
改ざんを防ぐ
（サブリソース完全性）
