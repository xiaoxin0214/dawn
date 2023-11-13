import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "lib/dawn.esm.js",
      format: "es"
    }
  ],
  plugins: [typescript()]
};
