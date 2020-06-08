<template>
  <ul v-if="nodes.length > 0">
    <li  :key="node.name" v-for="node in nodes" @mouseover="hover = true" @mouseleave="hover = false">
      <span>{{ node.name }}</span>: 
      <input type="text" v-model="node.formula">
      <button v-show="hover">+</button>
      <button v-show="hover">x</button>
      <node :nodes="node.nodes" v-if="nodes.length > 0"></node>
    </li>
  </ul>
  
</template>

<script>
export default {
  name: "node",
  props: {
    nodes: Array,
  },
  data: function(){
    return {
      hover: false,
    }
  }
}
</script>

<style>

</style>