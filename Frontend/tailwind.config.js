/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.tsx",
    "./src/*.tsx",
    "./src/*.ts",
    "./src/components/*.tsx",
    "./src/routes/*.tsx",
    "./src/Routes/Register.tsx",
    "./src/Routes/Home.tsx",
    "./src/Components/AddTaskModel.tsx",
    "./src/Components/ComplatedNoteModel.tsx",
    "./src/Components/SettingModel.tsx",
    "./src/Components/SideBar.tsx",
    "./src/Components/NoteItem.tsx",
    "./src/Components/MiniSliderBar.tsx",
    "./src/Components/Hero.tsx",
    "./src/Components/TopUser.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
