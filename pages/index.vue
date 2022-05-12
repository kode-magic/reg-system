<template>
  <div class="h-screen flex overflow-hidden">
    <div class="flex-1 relative z-0 flex overflow-hidden">
      <Menu />
      <div class="flex-1 flex flex-col relative overflow-hidden">
        <div class="flex">
          <!-- <Search /> -->
        </div>
        <div class="flex-1 relative">
          <nuxt />
        </div>
      </div>
    </div>
    <add-academic />
    <AddFamily />
    <add-module />
    <AddTravel />
    <add-course />
    <add-faculty />
    <add-user />
  </div>
</template>

<script>
import AddAcademic from '~/components/AddAcademic.vue';
import AddCourse from '~/components/AddCourse.vue';
import AddFaculty from '~/components/AddFaculty.vue';
import AddModule from '~/components/AddModule.vue';
import AddUser from '../components/AddUser.vue';
export default {
  title: "Human Resource",
  computed: {},
  components: {AddFaculty, AddCourse, AddModule, AddUser},
};
</script>,
    AddAcademic