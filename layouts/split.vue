<template>
    <div class="split">
        <div class="left-sidebar">
            <slot name="left" />
        </div>
        <div class="right-sidebar">
            <slot name="right" />
        </div>
    </div>
  </template>
  
  <style scoped>
  .split {
    display: flex;
    height: inherit;
  }

  .split .left-sidebar {
    box-sizing: border-box;
    background: rgba(248, 250, 252, 1);
    width: 260px;
    height: 100%;
    border: 1px solid rgba(229, 231, 235, 1);
    padding: 20px 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .split .right-sidebar {
    box-sizing: border-box;
    width: 1021px;
    height: 100%;
    border: 1px solid rgba(229, 231, 235, 1);
    padding-top: 24px;
  }
  </style>