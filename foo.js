
import { setTimeout } from "timers/promises";

const foo = await setTimeout(2000, "foo");
console.log(foo);
