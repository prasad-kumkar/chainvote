<template>
  <div class="about">
    <h1>Settings</h1>
    <h2>Your Information</h2>
    <ul>
      <li>Name: {{this.$store.state.userProfile.name}}</li>
      <li>Phone: {{this.$store.state.userProfile.phone}}</li>
      <li>ID: {{this.$store.state.userProfile.email}}</li>
    </ul>
  </div>
</template>
<style>
.about{
  margin: 100px 50px 50px 50px;
  padding: 20px;
  background-color: white;
}
</style>