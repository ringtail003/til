configをjsonで定義した時に値を取り出すためのソースコード。

```typescript
class Json<T> {
    private data: any = null;

    constructor(data: any) {
        this.data = data;
    }
    get(key: keyof T) {
        return this.data[key];
    }
}

interface Config {
    title: number;
    env: string;
};
const json = new Json<Config>(require('./config.json'));
const title = json.get('title');
const env = json.get('env');
```
