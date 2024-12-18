<template>
  <main>
    <CBtn msg="按钮"  @confirm="onclick"/>
    <TheWelcome />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import TheWelcome from '../components/TheWelcome.vue'
import  { CBtn }  from '@qwangry/components';

import { userApi } from '@qwangry/apis';
import { arrayUtil } from '@qwangry/utils';

const callApi=()=>{
  userApi.getUserByUid('20').then((res) => {
    console.log(16, res);
  });
  userApi.getUser(18).then((res) => {
    console.log(18, res);
  });
}

const onclick=(msg:string)=>{
  console.log('click',msg)
}

onMounted(() => {
  // callApi();

  const names=['a','b','c','d'];
  console.log(arrayUtil.findIndex('b', names))
  console.log(arrayUtil.findIndex('e',names))

});

</script>
