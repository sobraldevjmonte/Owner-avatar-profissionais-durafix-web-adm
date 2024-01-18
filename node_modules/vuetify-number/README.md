# vuetify-number

If you use Vuejs with Vuetify 2.x and you need a component to work with numbers (integer, money, decimal and percent), maybe this can help you.

input:
Numbers (integer, money, decimal and percent)

## Links
<p><a href="https://82wp9.csb.app/">See DEMO here</a></p>
<p><a href="https://github.com/juareznasato/vuetify-number" target="_blank">GitHub</a></p>
<p><a href="https://www.npmjs.com/package/vuetify-number" target="_blank">npm</a></p>

## Install:
```
$ npm install vuetify-number --save

Register component:

1- Create a src/plugins/vuetify-number.js file with:
import Vue from "vue";
import VuetifyNumber from "vuetify-number";
Vue.use(VuetifyNumber);
export default VuetifyNumber;

2- Add to src/mains.js file:
import "./plugins/vuetify-number.js";

Parent component:
<template>
  <div>
    <vuetify-number
      v-model="value"
      v-bind:label="label"
      v-bind:readonly="readonly"
      v-bind:disabled="disabled"
      v-bind:outlined="outlined"
      v-bind:clearable="clearable"
      v-bind:valueWhenIsEmpty="valueWhenIsEmpty"      // "0" or "" or null
      v-bind:options="options"
    />
    Parent v-model: {{ value }}
  </div>
</template>
<script>
export default {
  data: () => ({
    value: "1234567.89",
    label: "Value",
    readonly: false,
    disabled: false,
    outlined: true,
    clearable: true,
    valueWhenIsEmpty: ""
    options: {
      locale: "pt-BR",
      prefix: "R$",
      suffix: "",
      length: 9,
      precision: 2
    }
  })
};
</script>

