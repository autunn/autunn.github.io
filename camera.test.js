const fs = require("fs");
const vm = require("vm");
const assert = require("assert");

const cameraCode = fs.readFileSync("camera.js", "utf8");
const context = { window: {} };
vm.runInNewContext(cameraCode, context);

const { PONDERING_CAMERA } = context.window;
const plain = value => JSON.parse(JSON.stringify(value));

assert.ok(PONDERING_CAMERA, "camera settings should be exposed for the scene");
assert.deepStrictEqual(
  plain(PONDERING_CAMERA.initialPosition),
  { x: 0.35, y: 1.35, z: 6.15 },
  "initial camera position should start near the final viewing angle"
);
assert.deepStrictEqual(
  plain(PONDERING_CAMERA.finalPosition),
  { x: 0.35, y: 1.18, z: 5.35 },
  "final camera position should match the calmer reference angle"
);
assert.deepStrictEqual(
  plain(PONDERING_CAMERA.lookAt),
  { x: 0.3, y: -0.25, z: -3.6 },
  "camera should keep the same focal point before and after loading"
);
assert.ok(
  PONDERING_CAMERA.loadingDrift.z < 0,
  "loading motion should push gently toward the final angle"
);

console.log("camera settings ok");
